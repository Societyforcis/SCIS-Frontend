import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { selectIsAuthenticated, selectAuthLoading } from '../redux/slices/authSlice';
import FullScreenLoader from './FullScreenLoader';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const AuthGuard = ({ children, requireAdmin = false }: AuthGuardProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const loading = useAppSelector(selectAuthLoading);
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading) return; 

    if (!isAuthenticated) {
      navigate('/login', { 
        state: { 
          from: location.pathname,
          message: 'Please log in to access this page.' 
        },
        replace: true 
      });
      return;
    }

    // If admin access is required but user is not an admin
    if (requireAdmin && !user?.isAdmin) {
      navigate('/unauthorized', { 
        state: { 
          from: location.pathname,
          message: 'You do not have permission to access this page.' 
        },
        replace: true 
      });
    }
  }, [isAuthenticated, loading, navigate, location, requireAdmin, user]);

  // Show loading indicator while checking auth state
  if (loading) {
    return <FullScreenLoader />;
  }

  // Only render children if authenticated and (if required) user is admin
  if (isAuthenticated && (!requireAdmin || user?.isAdmin)) {
    return <>{children}</>;
  }

  // Don't render anything while redirecting
  return null;
};

export default AuthGuard;