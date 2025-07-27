'use client';

import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Swal from 'sweetalert2';
import { auth } from '../../config/firebase';
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import { Mail, Lock } from 'react-feather';
import { API_URL } from '../../config/api';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../redux/slices/authSlice';
import { handleGoogleAuth } from '../../utils/authUtils.js';

// Add this interceptor setup right after your imports
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && 
        error.response?.data?.code === 'TOKEN_EXPIRED') {
      // Clear existing auth data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect path from URL params or location state
  const params = new URLSearchParams(location.search);
  const redirectPath = params.get('redirect') || location.state?.from || '/';
  
  // After successful login:
  const handleSuccessfulLogin = () => {
    navigate(redirectPath, { replace: true });
  };
  
  const from = location.state?.from || '/';
  const message = location.state?.message;
  const redirectEmail = location.state?.email;
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState({
    email: false,
    google: false,
    github: false
  });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    // If redirected with an email, set it in the form
    if (redirectEmail) {
      setEmail(redirectEmail);
    }

    // If there's a message, show it
    if (message) {
      Swal.fire({
        icon: 'info',
        title: 'Welcome Back',
        text: message,
        timer: 3000,
      });
    }
  }, [redirectEmail, message]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading({ ...isLoading, email: true });

    try {
        console.log("Attempting login for:", email);
        const response = await fetch("http://localhost:5000/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log("Login response:", data);

        if (data.success) {
            // Store user data and token
            const userData = {
                _id: data.user._id,
                email: data.user.email,
                firstName: data.user.firstName,
                lastName: data.user.lastName,
                isAdmin: data.user.isAdmin || false,
            };

            // Set expiration to 24 hours from now
            const expiresAt = new Date().getTime() + (24 * 60 * 60 * 1000);

            // Update Redux store
            dispatch(setAuth({
                user: userData,
                token: data.token
            }));

            // Store in localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('tokenExpires', expiresAt.toString());
            localStorage.setItem('user', JSON.stringify(userData));

            await Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: 'Redirecting you to your dashboard...',
                timer: 1500,
                showConfirmButton: false,
            });

            handleSuccessfulLogin();
        } else if (data.message === "VERIFY_OTP") {
            // Handle OTP verification case
            await Swal.fire({
                icon: 'info',
                title: 'Account Not Verified',
                text: 'Please check your email for the verification code',
                timer: 3000,
            });
            navigate('/verify-otp', { state: { email } });
        } else {
            throw new Error(data.message || "Login failed");
        }
    } catch (error) {
        console.error("Login error:", error);
        Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: getErrorMessage(error),
            timer: 3000,
        });
    } finally {
        setIsLoading({ ...isLoading, email: false });
    }
  };

  // this is demo
  const handleGoogleSignIn = async () => {
    setIsLoading({ ...isLoading, google: true });
    
    try {
      // Use Firebase Google provider
      const provider = new GoogleAuthProvider();
      
      // Add scopes for email and profile
      provider.addScope('https://www.googleapis.com/auth/userinfo.email');
      provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
      
      const result = await signInWithPopup(auth, provider);
      
      console.log('Firebase Google auth successful:', {
        email: result.user.email,
        displayName: result.user.displayName
      });
      
      // Get user info from Google auth
      const { email, uid: googleId, displayName, photoURL } = result.user;
      
      // Extract first and last name (if available)
      let firstName = '';
      let lastName = '';
      if (displayName) {
        const nameParts = displayName.split(' ');
        firstName = nameParts[0] || '';
        lastName = nameParts.slice(1).join(' ') || '';
      }
      
      // Send to your backend
      const response = await axios.post(`http://localhost:5000/api/user/google/auth`, {
        email,
        googleId,
        firstName,
        lastName,
        profilePicture: photoURL || ''
      });
      
      console.log('Backend response:', response.data);
      
      if (response.data.success) {
        // Store user data and token
        const userData = {
          _id: response.data.user._id,
          email: response.data.user.email,
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          isAdmin: response.data.user.isAdmin || false,
        };

        // Set expiration to 24 hours from now
        const expiresAt = new Date().getTime() + (24 * 60 * 60 * 1000);

        // Update Redux store
        dispatch(setAuth({
          user: userData,
          token: response.data.token
        }));

        // Store in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('tokenExpires', expiresAt.toString());
        localStorage.setItem('user', JSON.stringify(userData));

        await Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Redirecting you to your dashboard...',
          timer: 1500,
          showConfirmButton: false,
        });

        handleSuccessfulLogin();
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      
      // Handle specific error for user not found case
      if (axios.isAxiosError(error) && error.response?.data?.code === 'USER_NOT_FOUND') {
        try {
          // Retrieve the current Google auth user
          const googleUser = auth.currentUser;
          
          if (googleUser) {
            const { email, uid: googleId, displayName, photoURL } = googleUser;
            
            // Extract first and last name
            let firstName = '';
            let lastName = '';
            if (displayName) {
              const nameParts = displayName.split(' ');
              firstName = nameParts[0] || '';
              lastName = nameParts.slice(1).join(' ') || '';
            }
            
            await Swal.fire({
              icon: 'info',
              title: 'Account Not Found',
              text: 'Would you like to create a new account with Google?',
              showCancelButton: true,
              confirmButtonText: 'Sign Up',
              cancelButtonText: 'Cancel',
              confirmButtonColor: '#dc2626',
              cancelButtonColor: '#4b5563',
            }).then(async (result) => {
              if (result.isConfirmed) {
                try {
                  // Send signup request to backend
                  const signupResponse = await axios.post(`${API_URL}/user/signin/google`, {
                    email,
                    googleId,
                    firstName,
                    lastName,
                    profilePicture: photoURL || ''
                  });
                  
                  if (signupResponse.data.success) {
                    const userData = {
                      _id: signupResponse.data.user._id,
                      email: signupResponse.data.user.email,
                      firstName: signupResponse.data.user.firstName,
                      lastName: signupResponse.data.user.lastName,
                      isAdmin: signupResponse.data.user.isAdmin || false,
                    };
                    
                    // Set expiration to 24 hours from now
                    const expiresAt = new Date().getTime() + (24 * 60 * 60 * 1000);
                    
                    // Update Redux store
                    dispatch(setAuth({
                      user: userData,
                      token: signupResponse.data.token
                    }));
                    
                    // Store in localStorage
                    localStorage.setItem('token', signupResponse.data.token);
                    localStorage.setItem('tokenExpires', expiresAt.toString());
                    localStorage.setItem('user', JSON.stringify(userData));
                    
                    await Swal.fire({
                      icon: 'success',
                      title: 'Account Created!',
                      text: 'Your account has been created with Google.',
                      timer: 1500,
                      showConfirmButton: false,
                    });
                    
                    handleSuccessfulLogin();
                  }
                } catch (signupError) {
                  console.error('Google signup error:', signupError);
                  Swal.fire({
                    icon: 'error',
                    title: 'Signup Failed',
                    text: getErrorMessage(signupError),
                  });
                }
              }
            });
          }
        } catch (nestedError) {
          console.error('Error handling user not found:', nestedError);
        }
      } else {
        // Show generic error message for other errors
        Swal.fire({
          icon: 'error',
          title: 'Google Sign-In Failed',
          text: getErrorMessage(error),
        });
      }
    } finally {
      setIsLoading({ ...isLoading, google: false });
    }
  };

  const handleGitHubSignIn = async () => {
    setIsLoading((prevState) => ({ ...prevState, github: true }));
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const response = await axios.post(`http://localhost:5000/api/login`, {
        email: result.user.email,
        password: result.user.uid
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      localStorage.setItem('email', result.user.email);
      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Signed in with GitHub!',
          text: `Welcome ${result.user.displayName}`,
          timer: 1500,
        }).then(() => {
          showMembershipConfirmation();
        });
        
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('email', result.user.email); // Use the email from result, not the state
          
          // Dispatch custom event to notify components about authentication change
          window.dispatchEvent(new Event('authStatusChanged'));
        }
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error("GitHub Sign-In Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'GitHub Sign-In Failed',
        text: getErrorMessage(error),
        timer: 3000,
      });
    } finally {
      setIsLoading((prevState) => ({ ...prevState, github: false }));
    }
  };

  const getErrorMessage = (error) => {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error Response:", error.response);
      return `API Error: ${error.response?.data?.message || error.message}`;
    }
    
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Invalid email or password';
      case 'auth/too-many-requests':
        return 'Too many failed login attempts. Please try again later.';
      case 'auth/operation-not-allowed':
        return 'This sign-in method is not enabled. Please contact the administrator.';
      case 'auth/popup-blocked':
        return 'The sign-in popup was blocked by your browser. Please allow popups for this site.';
      case 'auth/popup-closed-by-user':
      case 'auth/cancelled-popup-request':
        return 'The sign-in popup was closed before authentication could complete. Please try again.';
      default:
        return `An unexpected error occurred: ${error.message}. Please try again.`;
    }
  };

  const checkMembershipStatus = async (email) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/api/membership/check/${email}`);
      return response.data;
    } catch (error) {
      console.error('Error checking membership status:', error);
      return { isMember: false };
    }
  };

  const showMembershipConfirmation = async () => {
    // Get the current user's email
    const userEmail = localStorage.getItem('email');
    
    if (!userEmail) {
      navigate('/Home');
      return;
    }
    
    try {
      // Check if user already has valid membership
      const membershipStatus = await checkMembershipStatus(userEmail);
      
      // If user is already a member with active status, go directly to home
      if (membershipStatus.isMember) {
        navigate('/Home');
        return;
      }
      
      // If membership expired or user is not a member, show the popup
      return Swal.fire({
        title: 'Membership Status',
        text: 'Do You Like to become a Member of SCIS?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          // User wants to become a member
          navigate('/membership-form');
        } else {
          // User doesn't want to become a member
          navigate('/Home');
        }
      });
    } catch (error) {
      console.error("Error in membership check:", error);
      // Default to showing the popup if there's an error
      return Swal.fire({
        title: 'Membership Status',
        text: 'Do You Like to become a Member of SCIS?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/membership-form');
        } else {
          navigate('/Home');
        }
      });
    }
  };

  // Add this effect to check token expiration
  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem('token');
      const tokenExpires = localStorage.getItem('tokenExpires');

      if (token && tokenExpires) {
        const now = new Date().getTime();
        if (now >= parseInt(tokenExpires)) {
          // Token has expired
          localStorage.removeItem('token');
          localStorage.removeItem('tokenExpires');
          localStorage.removeItem('user');
          dispatch(setAuth({ user: null, token: null }));
          
          // Redirect to login if not already there
          if (window.location.pathname !== '/login') {
            navigate('/login', { 
              state: { 
                message: 'Your session has expired. Please log in again.' 
              } 
            });
          }
        }
      }
    };

    // Check on component mount and every minute
    checkTokenExpiration();
    const interval = setInterval(checkTokenExpiration, 60000);

    return () => clearInterval(interval);
  }, [navigate, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto" data-aos="fade-up">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          <div className="mb-6">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              disabled={isLoading.email || isLoading.google || isLoading.github}
            >
              {isLoading.google ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                  Sign in with Google
                </>
              )}
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or sign in with email</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-red-600 hover:text-red-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading.email || isLoading.google || isLoading.github}
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              {isLoading.email ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/SignIn" className="font-medium text-red-600 hover:text-red-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
