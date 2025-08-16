import axios from 'axios';
import { store } from '../redux/store';
import  {logout}  from '../redux/slices/authSlice';

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logout } from '../redux/slices/authSlice';
import axiosInstance from '../utils/axiosConfig';

export default function AuthVerify() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        dispatch(logout());
        return;
      }

      try {
        await axiosInstance.get('/user/verify-token');
      } catch (error) {
        console.error('Token verification failed:', error);
        dispatch(logout());
        navigate('/login', { 
          state: { 
            message: 'Your session has expired. Please login again.' 
          } 
        });
      }
    };

    verifyToken();
    
    // Verify token every 5 minutes
    const interval = setInterval(verifyToken, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [token, dispatch, navigate]);

  return null;
}