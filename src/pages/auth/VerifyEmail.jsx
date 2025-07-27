import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const API_URL = 'http://localhost:5000/api/';

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyToken = async () => {
      const token = new URLSearchParams(location.search).get('token');
      if (!token) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Token',
          text: 'No verification token found',
          timer: 2000,
        });
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/verify-email?token=${token}`);
        if (response.data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Email Verified!',
            text: 'Your email has been verified successfully',
            timer: 2000,
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Verification Failed',
          text: error.response?.data?.message || 'Verification failed',
          timer: 2000,
        });
      } finally {
        navigate('/login');
      }
    };

    verifyToken();
  }, [navigate, location]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white text-center">
        <h2>Verifying your email...</h2>
        <p>Please wait while we verify your email address.</p>
      </div>
    </div>
  );
}
