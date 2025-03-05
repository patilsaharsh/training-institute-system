// src/services/authService.ts
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
  browserLocalPersistence,
  setPersistence,
  getRedirectResult
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase/config';

// Set persistence to LOCAL to avoid session storage issues on mobile
setPersistence(auth, browserLocalPersistence).catch(error => {
  console.error("Error setting auth persistence:", error);
});

export interface UserRole {
  student?: boolean;
  admin?: boolean;
  interviewer?: boolean;
}

// Helper function to check existing authentication (used by LoginPage and AuthContext)
export const checkExistingAuth = async (): Promise<{user: User, role: UserRole} | null> => {
  const currentUser = auth.currentUser;
  
  if (currentUser) {
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        return { 
          user: currentUser, 
          role: userDoc.data().role as UserRole 
        };
      }
    } catch (error) {
      console.error('Error checking existing auth:', error);
    }
  }
  
  return null;
};

// Sign in with Google
export const signInWithGoogle = async (): Promise<{user: User, role: UserRole}> => {
  try {
    let result;
    
    // Always use popup method which is more reliable on mobile
    result = await signInWithPopup(auth, googleProvider);
    
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

// Handle the redirect result (keeping this function for compatibility)
export const getRedirectResultHandler = async (): Promise<{user: User, role: UserRole} | null> => {
  try {
    const result = await getRedirectResult(auth);
    
    if (result && result.user) {
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
    }
    
    return null;
  } catch (error) {
    console.error('Error handling redirect result:', error);
    throw error;
  }
};

// The rest of your functions remain unchanged
export const signOutUser = (): Promise<void> => {
  return signOut(auth);
};

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

export const setUserRole = async (uid: string, role: UserRole): Promise<void> => {
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, { role }, { merge: true });
  } catch (error) {
    console.error('Error setting user role:', error);
    throw error;
  }
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};