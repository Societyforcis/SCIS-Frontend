import { store } from '../redux/store';
import { setAuth, logout } from '../redux/slices/authSlice';

/**
 * Restore authentication state from localStorage
 * @returns {boolean} true if auth was restored, false otherwise
 */
export const restoreAuthFromStorage = () => {
  try {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
      return false;
    }
    
    const user = JSON.parse(userStr);
    store.dispatch(setAuth({ token, user }));
    console.log('Auth restored from localStorage');
    return true;
  } catch (error) {
    console.error('Error restoring auth:', error);
    clearAuthFromStorage();
    return false;
  }
};

/**
 * Clear authentication data from localStorage
 */
export const clearAuthFromStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('tokenExpires');
  store.dispatch(logout());
};

/**
 * Check if user is authenticated
 * @returns {boolean} true if authenticated, false otherwise
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

/**
 * Check if user is an admin
 * @returns {boolean} true if admin, false otherwise
 */
export const isAdmin = () => {
  try {
    const userStr = localStorage.getItem('user');
    if (!userStr) return false;
    
    const user = JSON.parse(userStr);
    return !!user.isAdmin;
  } catch {
    return false;
  }
};