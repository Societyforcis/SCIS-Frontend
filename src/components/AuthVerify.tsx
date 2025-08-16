import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { logout, setAuth } from '../redux/slices/authSlice';
import axios from 'axios';

// Update API_URL constant to ensure correct path
const API_URL = import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL}/api/user`;

export default function AuthVerify() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Update verifyToken function with better error handling
  const verifyToken = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const tokenExpires = localStorage.getItem('tokenExpires');
      
      if (!token || !tokenExpires) {
        console.log('No token or expiry found in localStorage'); // Debug log
        dispatch(logout());
        return;
      }

      console.log('Sending verification request to:', `${API_URL}/verify-token`); // Debug log

      const response = await axios.get(`${API_URL}/verify-token`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        // Update auth state with fresh data
        dispatch(setAuth({
          user: response.data.user,
          token: response.data.token
        }));

        // Update localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('tokenExpires', (Date.now() + 24 * 60 * 60 * 1000).toString());
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      
      // Clear auth state and localStorage
      dispatch(logout());
      localStorage.clear();
      
      // Only redirect if not already on login page
      if (!window.location.pathname.includes('/login')) {
        navigate('/login', { 
          state: { 
            message: 'Please login to continue.',
            from: window.location.pathname
          }
        });
      }
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    // Verify on mount
    verifyToken();
    
    // Set up interval for periodic verification (every 5 minutes)
    const interval = setInterval(verifyToken, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [verifyToken]);

  return null;
}