// src/router/index.tsx
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ReactNode } from 'react';

// Layout and Pages
import MainLayout from '../layouts/MainLayout';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import StudentDashboard from '../pages/student/StudentDashboard';
import ApplicationForm from '../pages/student/ApplicationForm';
import AdminDashboard from '../pages/admin/AdminDashboard';
import InterviewerDashboard from '../pages/interviewer/InterviewerDashboard';
import ApplicationDetails from '../pages/admin/ApplicationDetails';
import InterviewAssignment from '../pages/admin/InterviewAssignment';
import InterviewEvaluation from '../pages/interviewer/InterviewEvaluation';
import NotFoundPage from '../pages/NotFoundPage';

// Program Pages
import UpcomingPrograms from '../pages/programs/UpcomingPrograms';
import PastPrograms from '../pages/programs/PastPrograms';
import TrainingCalendar from '../pages/programs/TrainingCalendar';

// Testimonial Pages
import RecruiterTestimonials from '../pages/testimonials/RecruiterTestimonials';
import StudentTestimonials from '../pages/testimonials/StudentTestimonialsPage';

// About Pages
import Contact from '../pages/about/Contact';
import Trustees from '../pages/about/Trustees';
import Advisors from '../pages/about/Advisors';
import SMEs from '../pages/about/SMEs';
import Supporters from '../pages/about/Supporters';
import Partners from '../pages/about/Partners';

// Protected Route Components
interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole: 'student' | 'admin' | 'interviewer' | 'any';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { currentUser, isAdmin, isInterviewer, isStudent } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (requiredRole === 'any') {
    return <>{children}</>;
  }

  if (requiredRole === 'admin' && !isAdmin()) {
    return <Navigate to="/" />;
  }

  if (requiredRole === 'interviewer' && !isInterviewer()) {
    return <Navigate to="/" />;
  }

  if (requiredRole === 'student' && !isStudent()) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

// Router Provider Component
export const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <LandingPage />,
        },
        {
          path: 'login',
          element: <LoginPage />,
        },
        // Program Routes
        {
          path: 'programs/upcoming',
          element: <UpcomingPrograms />,
        },
        {
          path: 'programs/past',
          element: <PastPrograms />,
        },
        {
          path: 'programs/calendar',
          element: <TrainingCalendar />,
        },
        // Testimonial Routes
        {
          path: 'testimonials/recruiter',
          element: <RecruiterTestimonials />,
        },
        {
          path: 'testimonials/student',
          element: <StudentTestimonials />,
        },
        // About Routes
        {
          path: 'about/contact',
          element: <Contact />,
        },
        {
          path: 'about/trustees',
          element: <Trustees />,
        },
        {
          path: 'about/advisors',
          element: <Advisors />,
        },
        {
          path: 'about/smes',
          element: <SMEs />,
        },
        {
          path: 'about/supporters',
          element: <Supporters />,
        },
        {
          path: 'about/partners',
          element: <Partners />,
        },
        // Student Routes
        {
          path: 'student',
          element: (
            <ProtectedRoute requiredRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: 'student/apply',
          element: (
            <ProtectedRoute requiredRole="student">
              <ApplicationForm />
            </ProtectedRoute>
          ),
        },
        // Admin Routes
        {
          path: 'admin',
          element: (
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: 'admin/application/:id',
          element: (
            <ProtectedRoute requiredRole="admin">
              <ApplicationDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: 'admin/assign/:id',
          element: (
            <ProtectedRoute requiredRole="admin">
              <InterviewAssignment />
            </ProtectedRoute>
          ),
        },
        // Interviewer Routes
        {
          path: 'interviewer',
          element: (
            <ProtectedRoute requiredRole="interviewer">
              <InterviewerDashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: 'interviewer/evaluate/:id',
          element: (
            <ProtectedRoute requiredRole="interviewer">
              <InterviewEvaluation />
            </ProtectedRoute>
          ),
        },
        // 404 Route
        {
          path: '*',
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};