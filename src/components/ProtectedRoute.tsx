import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '../redux/hooks';
import Swal from 'sweetalert2';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { token, isAuthenticated } = useAppSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    
    if (!token && !localToken) {
      Swal.fire({
        title: 'Authentication Required',
        text: 'Please login to access this page',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = `/login?redirect=${encodeURIComponent(location.pathname)}`;
        } else {
          window.location.href = '/';
        }
      });
    }
  }, [token, location.pathname]);
  
  // Check if there's a token in localStorage even if Redux store doesn't have it yet
  const localToken = localStorage.getItem('token');
  
  if (!token && !localToken) {
    // Instead of immediate navigation, return null to show nothing while the Swal dialog is visible
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;