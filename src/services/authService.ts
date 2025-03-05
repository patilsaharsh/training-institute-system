// src/services/authService.ts
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase/config';

export interface UserRole {
  student?: boolean;
  admin?: boolean;
  interviewer?: boolean;
}

// Sign in with Google
export const signInWithGoogle = async (): Promise<{user: User, role: UserRole}> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if the user exists in Firestore
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    
    // If they're a new user, add them to the Firestore with default role (student)
    if (!userDoc.exists()) {
      const userData = {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: { student: true } // Default role is student
      };
      
      await setDoc(userRef, userData);
      return { user, role: userData.role };
    }
    
    // Return the user data with their role
    return { user, role: userDoc.data().role as UserRole };
    
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

// Sign out
export const signOutUser = (): Promise<void> => {
  return signOut(auth);
};

// Get current user role
export const getCurrentUserRole = async (uid: string): Promise<UserRole | null> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return userDoc.data().role as UserRole;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user role:', error);
    return null;
  }
};

// Set user role (for admins to assign roles)
export const setUserRole = async (uid: string, role: UserRole): Promise<void> => {
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, { role }, { merge: true });
  } catch (error) {
    console.error('Error setting user role:', error);
    throw error;
  }
};

// Auth state listener
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};