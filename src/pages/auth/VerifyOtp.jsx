import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../redux/slices/authSlice';

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Try to recover email from state or query param
    const stateEmail = location.state?.email;
    const queryEmail = new URLSearchParams(location.search).get('email');
    if (stateEmail) {
      setEmail(stateEmail);
    } else if (queryEmail) {
      setEmail(queryEmail);
    }
  }, [location]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.post("http://localhost:5000/api/user/verify-account-otp", {
        email,
        otp
      });
      
      if (response.data.success) {
        const isNewUser = location.state?.newUser;
        
        Swal.fire({
          icon: 'success',
          title: 'Email Verified!',
          text: isNewUser 
            ? 'Your account has been created successfully. Please log in to continue.'
            : 'Your email has been verified successfully.',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          // For new users, always navigate to login
          if (isNewUser) {
            navigate('/login', { 
              state: { 
                email: email,
                message: 'Account created successfully! Please log in with your credentials.'
              }
            });
          } else {
            // For password reset or other flows
            if (location.state?.redirectTo) {
              navigate(location.state.redirectTo);
            } else {
              navigate('/login');
            }
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Verification Failed',
          text: response.data.message || 'Invalid or expired OTP. Please try again.',
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      
      Swal.fire({
        icon: 'error',
        title: 'Verification Failed',
        text: error.response?.data?.message || 'Failed to verify OTP. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setIsLoading(true);
      
      // Check if this is for account verification or password reset
      const isNewUser = location.state?.newUser;
      const endpoint = isNewUser 
        ? 'http://localhost:5000/api/user/resend-verification-otp'
        : 'http://localhost:5000/api/user/resend-otp';
      
      console.log(`Sending request to ${endpoint} for ${email}`);
      
      const response = await axios.post(endpoint, { email });
      
      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'OTP Sent!',
          text: 'A new OTP has been sent to your email.',
          timer: 2000
        });
        setOtp(''); // Clear the OTP input
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to send new OTP. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Verify Your Email</h2>
        <p className="mb-4 text-center text-gray-600">Enter the 6-digit OTP sent to <span className="font-semibold">{email}</span></p>
        <form onSubmit={handleVerify} className="space-y-6">
          <input
            type="text"
            maxLength="6"
            pattern="[0-9]{6}"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full text-center tracking-widest text-xl px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="——— ---"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow disabled:opacity-50"
          >
            {isLoading ? 'Verifying…' : 'Verify'}
          </button>
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={isLoading}
              className="text-red-600 hover:text-red-800 font-medium text-sm"
            >
              {isLoading ? 'Sending...' : 'Resend OTP'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
