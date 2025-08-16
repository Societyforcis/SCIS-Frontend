import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebase';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/user`;

export const handleGoogleAuth = async (isSignUp = false) => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    if (!result.user || !result.user.email) {
      throw new Error('No user data received from Google');
    }

    const userData = {
      email: result.user.email,
      firstName: result.user.displayName?.split(' ')[0] || '',
      lastName: result.user.displayName?.split(' ').slice(1).join(' ') || '',
      googleId: result.user.uid,
      profilePicture: result.user.photoURL || ''
    };

    const endpoint = isSignUp ? '/signin/google' : '/login/google';
    
    try {
      const response = await axios.post(`${API_URL}${endpoint}`, userData);
      
      if (response.data.success) {
        // Store auth data immediately after successful response
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('tokenExpires', (Date.now() + 24 * 60 * 60 * 1000).toString()); // 24 hours

        return {
          success: true,
          user: response.data.user,
          token: response.data.token
        };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle existing account
        if (error.response?.status === 400 && 
            error.response.data.code === 'EXISTING_ACCOUNT') {
          return {
            success: false,
            code: 'EXISTING_ACCOUNT',
            existingEmail: error.response.data.existingEmail
          };
        }
        // Handle no account found
        if (error.response?.status === 404 && 
            error.response.data.code === 'USER_NOT_FOUND') {
          return {
            success: false,
            code: 'USER_NOT_FOUND',
            email: userData.email
          };
        }
      }
      throw error;
    }
  } catch (error) {
    console.error('Google auth error:', error);
    return {
      success: false,
      error: axios.isAxiosError(error) 
        ? error.response?.data?.message || error.message
        : 'Authentication failed'
    };
  }
};