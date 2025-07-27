import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setAuth } from '../redux/slices/authSlice';

export const useAuthCheck = () => {
  const { token, user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token) {
      const localToken = localStorage.getItem('token');
      const localUser = localStorage.getItem('user');
      
      if (localToken && localUser) {
        try {
          const parsedUser = JSON.parse(localUser);
          dispatch(setAuth({ token: localToken, user: parsedUser }));
        } catch (error) {
          console.error('Failed to restore auth state:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
    }
  }, [token, dispatch]);

  return { isAuthenticated: !!token, token, user };
};