import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuth } from '../redux/slices/authSlice';

const PersistAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');

        if (token && userStr) {
          const user = JSON.parse(userStr);
          dispatch(setAuth({ user, token }));
          console.log('Auth state restored from localStorage on app load');
        }
      } catch (error) {
        console.error('Error restoring auth state:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    };

    restoreAuth();
  }, [dispatch]);

  return null; // This component doesn't render anything
};

export default PersistAuth;