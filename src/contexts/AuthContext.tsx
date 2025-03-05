// src/contexts/AuthContext.tsx
import { 
  createContext, 
  useContext, 
  useEffect, 
  useState, 
  ReactNode 
} from 'react';
import { User } from 'firebase/auth';
import { 
  signInWithGoogle, 
  signOutUser, 
  onAuthStateChange, 
  getCurrentUserRole,
  getRedirectResultHandler,
  checkExistingAuth,
  UserRole 
} from '../services/authService';

interface AuthContextType {
  currentUser: User | null;
  userRole: UserRole | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: () => boolean;
  isInterviewer: () => boolean;
  isStudent: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {};
    let authCheckComplete = false;
    
    const handleAuthentication = async () => {
      try {
        // First check if we're already authenticated
        const existingAuth = await checkExistingAuth();
        if (existingAuth) {
          setCurrentUser(existingAuth.user);
          setUserRole(existingAuth.role);
          authCheckComplete = true;
          setLoading(false);
          return;
        }
        
        // Then try to handle any redirect result
        const redirectResult = await getRedirectResultHandler();
        
        if (redirectResult) {
          setCurrentUser(redirectResult.user);
          setUserRole(redirectResult.role);
          authCheckComplete = true;
          setLoading(false);
        }
      } catch (error) {
        console.error('Error handling authentication:', error);
      } finally {
        // Set up the auth state listener regardless of redirect result
        unsubscribe = onAuthStateChange(async (user) => {
          setCurrentUser(user);
          
          if (user) {
            const role = await getCurrentUserRole(user.uid);
            setUserRole(role);
          } else {
            setUserRole(null);
          }
          
          // Only set loading to false if we haven't already done so
          if (!authCheckComplete) {
            setLoading(false);
          }
        });
      }
    };
    
    handleAuthentication();
    
    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    try {
      const { user, role } = await signInWithGoogle();
      setCurrentUser(user);
      setUserRole(role);
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await signOutUser();
      setCurrentUser(null);
      setUserRole(null);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  const isAdmin = () => !!userRole?.admin;
  const isInterviewer = () => !!userRole?.interviewer;
  const isStudent = () => !!userRole?.student;

  const value: AuthContextType = {
    currentUser,
    userRole,
    loading,
    signIn,
    signOut,
    isAdmin,
    isInterviewer,
    isStudent,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};