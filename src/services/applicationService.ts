// src/services/applicationService.ts
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { db, functions } from '../firebase/config';

export interface ApplicationData {
  name: string;
  aadharNumber: string;
  email: string;
  phone: string;
  resumeUrl: string;
  course: string;
  status: 'pending' | 'interview1_scheduled' | 'interview1_passed' | 'interview1_failed' |
          'interview2_scheduled' | 'interview2_passed' | 'interview2_failed' |
          'interview3_scheduled' | 'interview3_passed' | 'interview3_failed' | 
          'selected' | 'rejected';
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  interviews?: {
    interview1?: {
      interviewerId?: string;
      interviewerName?: string;
      meetingLink?: string;
      scheduledDate?: Timestamp;
      feedback?: string;
      status?: 'pending' | 'passed' | 'failed';
    };
    interview2?: {
      interviewerId?: string;
      interviewerName?: string;
      meetingLink?: string;
      scheduledDate?: Timestamp;
      feedback?: string;
      status?: 'pending' | 'passed' | 'failed';
    };
    interview3?: {
      interviewerId?: string;
      interviewerName?: string;
      meetingLink?: string;
      scheduledDate?: Timestamp;
      feedback?: string;
      status?: 'pending' | 'passed' | 'failed';
    };
  };
}

// Submit application
export const submitApplication = async (data: Omit<ApplicationData, 'createdAt' | 'updatedAt' | 'status' | 'userId'> & { userId: string }): Promise<string> => {
  try {
    const appData: Omit<ApplicationData, 'createdAt' | 'updatedAt'> = {
      ...data,
      status: 'pending',
      userId: data.userId,
    };
    
    const docRef = await addDoc(collection(db, 'applications'), {
      ...appData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    // Call Cloud Function to send confirmation email
    const sendEmail = httpsCallable(functions, 'sendApplicationConfirmationEmail');
    await sendEmail({ applicationId: docRef.id, email: data.email, name: data.name });
    
    return docRef.id;
  } catch (error) {
    console.error('Error submitting application:', error);
    throw error;
  }
};

// Get application by ID
export const getApplicationById = async (id: string): Promise<ApplicationData | null> => {
  try {
    const docRef = doc(db, 'applications', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as ApplicationData;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting application:', error);
    return null;
  }
};

// Get applications by user ID
export const getApplicationsByUserId = async (userId: string): Promise<(ApplicationData & { id: string })[]> => {
  try {
    const q = query(
      collection(db, 'applications'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const applications: (ApplicationData & { id: string })[] = [];
    
    querySnapshot.forEach((doc) => {
      applications.push({ ...doc.data() as ApplicationData, id: doc.id });
    });
    
    return applications;
  } catch (error) {
    console.error('Error getting user applications:', error);
    return [];
  }
};

// Get all applications (for admin)
export const getAllApplications = async (courseFilter?: string): Promise<(ApplicationData & { id: string })[]> => {
  try {
    let q;
    if (courseFilter) {
      q = query(
        collection(db, 'applications'),
        where('course', '==', courseFilter),
        orderBy('createdAt', 'desc')
      );
    } else {
      q = query(
        collection(db, 'applications'),
        orderBy('createdAt', 'desc')
      );
    }
    
    const querySnapshot = await getDocs(q);
    const applications: (ApplicationData & { id: string })[] = [];
    
    querySnapshot.forEach((doc) => {
      applications.push({ ...doc.data() as ApplicationData, id: doc.id });
    });
    
    return applications;
  } catch (error) {
    console.error('Error getting all applications:', error);
    return [];
  }
};

// Assign interviewer for an interview
export const assignInterviewer = async (
  applicationId: string,
  interviewNumber: 1 | 2 | 3,
  interviewerId: string,
  interviewerName: string,
  meetingLink: string,
  scheduledDate: Date
): Promise<void> => {
  try {
    const docRef = doc(db, 'applications', applicationId);
    const interviewKey = `interview${interviewNumber}` as const;
    const statusKey = `interview${interviewNumber}_scheduled` as ApplicationData['status'];
    
    // Update the application with interview details
    await updateDoc(docRef, {
      [`interviews.${interviewKey}`]: {
        interviewerId,
        interviewerName,
        meetingLink,
        scheduledDate: Timestamp.fromDate(scheduledDate),
        status: 'pending',
      },
      status: statusKey,
      updatedAt: serverTimestamp(),
    });
    
    // Get application data for email notification
    const appSnapshot = await getDoc(docRef);
    if (appSnapshot.exists()) {
      const appData = appSnapshot.data() as ApplicationData;
      
      // Call Cloud Function to send emails
      const sendInterviewNotification = httpsCallable(functions, 'sendInterviewScheduledNotification');
      await sendInterviewNotification({
        applicationId,
        studentEmail: appData.email,
        studentName: appData.name,
        interviewerEmail: interviewerId, // assuming this is the email
        interviewerName,
        meetingLink,
        scheduledDate,
        interviewNumber
      });
    }
  } catch (error) {
    console.error('Error assigning interviewer:', error);
    throw error;
  }
};

// Update interview result
export const updateInterviewResult = async (
  applicationId: string,
  interviewNumber: 1 | 2 | 3,
  status: 'passed' | 'failed',
  feedback: string
): Promise<void> => {
  try {
    const docRef = doc(db, 'applications', applicationId);
    const interviewKey = `interview${interviewNumber}` as const;
    const statusKey = `interview${interviewNumber}_${status}` as ApplicationData['status'];
    
    // Update the application with interview result
    await updateDoc(docRef, {
      [`interviews.${interviewKey}.status`]: status,
      [`interviews.${interviewKey}.feedback`]: feedback,
      status: statusKey,
      updatedAt: serverTimestamp(),
    });
    
    // Get application data for email notification
    const appSnapshot = await getDoc(docRef);
    if (appSnapshot.exists()) {
      const appData = appSnapshot.data() as ApplicationData;
      
      // Call Cloud Function to send email
      const sendInterviewResultNotification = httpsCallable(functions, 'sendInterviewResultNotification');
      await sendInterviewResultNotification({
        applicationId,
        studentEmail: appData.email,
        studentName: appData.name,
        status,
        feedback,
        interviewNumber
      });
    }
    
    // If this was the final interview and the student passed, update to selected status
    if (interviewNumber === 3 && status === 'passed') {
      await updateDoc(docRef, {
        status: 'selected',
        updatedAt: serverTimestamp(),
      });
      
      // Send selection email
      const sendSelectionNotification = httpsCallable(functions, 'sendSelectionNotification');
      const appSnapshot = await getDoc(docRef);
      if (appSnapshot.exists()) {
        const appData = appSnapshot.data() as ApplicationData;
        await sendSelectionNotification({
          applicationId,
          studentEmail: appData.email,
          studentName: appData.name,
        });
      }
    }
  } catch (error) {
    console.error('Error updating interview result:', error);
    throw error;
  }
};

// Get applications assigned to an interviewer
export const getInterviewerAssignments = async (interviewerId: string): Promise<(ApplicationData & { id: string })[]> => {
  try {
    // Get applications where any of the interviews has this interviewer ID
    const results: (ApplicationData & { id: string })[] = [];
    
    // Check interview1
    const q1 = query(
      collection(db, 'applications'),
      where('interviews.interview1.interviewerId', '==', interviewerId)
    );
    const snap1 = await getDocs(q1);
    snap1.forEach(doc => {
      results.push({ ...doc.data() as ApplicationData, id: doc.id });
    });
    
    // Check interview2
    const q2 = query(
      collection(db, 'applications'),
      where('interviews.interview2.interviewerId', '==', interviewerId)
    );
    const snap2 = await getDocs(q2);
    snap2.forEach(doc => {
      if (!results.some(r => r.id === doc.id)) {
        results.push({ ...doc.data() as ApplicationData, id: doc.id });
      }
    });
    
    // Check interview3
    const q3 = query(
      collection(db, 'applications'),
      where('interviews.interview3.interviewerId', '==', interviewerId)
    );
    const snap3 = await getDocs(q3);
    snap3.forEach(doc => {
      if (!results.some(r => r.id === doc.id)) {
        results.push({ ...doc.data() as ApplicationData, id: doc.id });
      }
    });
    
    return results;
  } catch (error) {
    console.error('Error getting interviewer assignments:', error);
    return [];
  }
};