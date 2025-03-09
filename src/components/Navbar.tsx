// src/components/Navbar.tsx
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { currentUser, signOut, isAdmin, isInterviewer, isStudent } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Get current location
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Helper function to determine if a path is active
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img 
                src="https://utkarsh-foundation.com/wp-content/uploads/2023/11/Utkarsh-logo.jpg" 
                alt="Utkarsh Foundation Logo" 
                className="h-10 w-10 rounded-full mr-2"
                onError={(e) => {
                  setLogoError(true);
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <span className={`text-[#1D3677] font-serif font-bold text-xl ${logoError ? 'ml-0' : ''}`}>
                Utkarsh Foundation
              </span>
            </Link>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                to="/" 
                className={`${isActive('/') 
                  ? 'border-indigo-500 text-gray-900' 
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} 
                  inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Home
              </Link>
              
              {currentUser && isStudent() && (
                <>
                  <Link 
                    to="/student" 
                    className={`${isActive('/student') && !isActive('/student/apply')
                      ? 'border-indigo-500 text-gray-900' 
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} 
                      inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/student/apply" 
                    className={`${isActive('/student/apply') 
                      ? 'border-indigo-500 text-gray-900' 
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} 
                      inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    Apply
                  </Link>
                </>
              )}
              
              {currentUser && isAdmin() && (
                <Link 
                  to="/admin" 
                  className={`${isActive('/admin') 
                    ? 'border-indigo-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} 
                    inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Admin Dashboard
                </Link>
              )}
              
              {currentUser && isInterviewer() && (
                <Link 
                  to="/interviewer" 
                  className={`${isActive('/interviewer') 
                    ? 'border-indigo-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} 
                    inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Interviewer Dashboard
                </Link>
              )}
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {currentUser ? (
              <div className="ml-3 relative">
                <div className="flex items-center">
                  {/* Simplified profile picture handling - desktop view */}
                  <div className="h-8 w-8 rounded-full overflow-hidden">
                    <img
                      className="h-full w-full object-cover"
                      src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.displayName || 'User')}&background=1D3677&color=fff`}
                      alt={currentUser.displayName || "User"}
                      onError={(e) => {
                        // If image fails to load, use avatar generator
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.displayName || 'User')}&background=1D3677&color=fff`;
                      }}
                    />
                  </div>
                  <span className="ml-2 text-sm text-gray-700">{currentUser.displayName}</span>
                  <button
                    onClick={handleSignOut}
                    className="ml-4 px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign In
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`${isActive('/') 
              ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
              : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}
              block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          
          {currentUser && isStudent() && (
            <>
              <Link
                to="/student"
                className={`${isActive('/student') && !isActive('/student/apply')
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}
                  block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/student/apply"
                className={`${isActive('/student/apply')
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}
                  block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                onClick={() => setIsMenuOpen(false)}
              >
                Apply
              </Link>
            </>
          )}
          
          {currentUser && isAdmin() && (
            <Link
              to="/admin"
              className={`${isActive('/admin')
                ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}
                block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
              onClick={() => setIsMenuOpen(false)}
            >
              Admin Dashboard
            </Link>
          )}
          
          {currentUser && isInterviewer() && (
            <Link
              to="/interviewer"
              className={`${isActive('/interviewer')
                ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}
                block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
              onClick={() => setIsMenuOpen(false)}
            >
              Interviewer Dashboard
            </Link>
          )}
        </div>
        
        <div className="pt-4 pb-3 border-t border-gray-200">
          {currentUser ? (
            <div className="flex items-center px-4">
              {/* Simplified profile picture handling - mobile view */}
              <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.displayName || 'User')}&background=1D3677&color=fff`}
                  alt={currentUser.displayName || "User"}
                  onError={(e) => {
                    // If image fails to load, use avatar generator
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.displayName || 'User')}&background=1D3677&color=fff`;
                  }}
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{currentUser.displayName}</div>
                <div className="text-sm font-medium text-gray-500">{currentUser.email}</div>
              </div>
              <button
                onClick={handleSignOut}
                className="ml-auto px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="mt-3 space-y-1 px-2">
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;