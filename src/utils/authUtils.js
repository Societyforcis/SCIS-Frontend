import axios from 'axios';

/**
 * Handle Google authentication for both login and signup
 * @param {boolean} isSignUp - Whether this is a sign up (true) or login (false)
 * @returns {Promise<Object>} - Result object with success status and data
 */
export const handleGoogleAuth = async (isSignUp = false) => {
  try {
    // Mock Google auth data for development - replace with actual Google Auth implementation
    // This is where you would normally integrate with Firebase or Google Auth API
    const googleAuthData = {
      email: "user@example.com",
      googleId: "google-id-12345",
      firstName: "John",
      lastName: "Doe",
      profilePicture: "https://example.com/profile.jpg"
    };
    
    // In production, you would get this data from the Google auth provider
    
    // Call the appropriate backend endpoint
    const endpoint = isSignUp 
      ? `${import.meta.env.VITE_API_URL}/api/user/signin/google` 
      : `${import.meta.env.VITE_API_URL}/api/user/login/google`;
      
    console.log(`Attempting ${isSignUp ? 'sign up' : 'login'} with Google:`, googleAuthData.email);
    
    const response = await axios.post(endpoint, googleAuthData);
    
    console.log(`Google ${isSignUp ? 'sign up' : 'login'} response:`, response.data);
    
    if (response.data.success) {
      return {
        success: true,
        token: response.data.token,
        user: response.data.user
      };
    } else {
      return {
        success: false,
        error: response.data.message
      };
    }
    
  } catch (error) {
    console.error(`Google ${isSignUp ? 'sign up' : 'login'} error:`, error);
    
    // Handle specific error cases
    if (axios.isAxiosError(error)) {
      // Handle existing account error
      if (error.response?.data?.code === 'EXISTING_ACCOUNT') {
        return {
          success: false,
          code: 'EXISTING_ACCOUNT',
          existingEmail: error.response.data.existingEmail,
          error: error.response.data.message
        };
      }
      
      // Handle user not found error
      if (error.response?.data?.code === 'USER_NOT_FOUND') {
        return {
          success: false,
          code: 'USER_NOT_FOUND',
          email: error.response.data.email,
          error: error.response.data.message
        };
      }
      
      // Handle other API errors
      return {
        success: false,
        error: error.response?.data?.message || error.message
      };
    }
    
    // Handle non-axios errors
    return {
      success: false,
      error: error.message
    };
  }
};