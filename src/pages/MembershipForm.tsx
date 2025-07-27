import { useAppSelector } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Inside your component
const { token } = useAppSelector(state => state.auth);
const navigate = useNavigate();

const handleSubmit = async () => {
  setLoading(true);
  try {
    // Get token from Redux and fallback to localStorage
    const authToken = token || localStorage.getItem('token');
    
    console.log('Submitting membership with auth token present:', !!authToken);

    if (!authToken) {
      alert('Please log in to submit your membership application.');
      navigate('/login');
      return;
    }

    // Add membership fee based on selected type
    const selectedTier = membershipTiers.find(tier => tier.id === formData.membershipType);
    const membershipFee = selectedTier?.price || '';

    const membershipData = {
      ...formData,
      membershipFee,
      paymentStatus: 'completed',
    };

    const response = await axios.post(
      'http://localhost:5000/api/membership', 
      membershipData,
      { 
        headers: { 
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json' 
        }
      }
    );

    // After successful submission, create a notification about the new membership
    if (response.data.success) {
      try {
        // Create notification about the new membership
        await axios.post(
          'http://localhost:5000/api/notifications/ok',
          {
            title: 'New Membership Application',
            message: `${formData.firstName} ${formData.lastName} has applied for a ${formData.membershipType} membership.`,
            type: 'membership',
            priority: 'medium',
            recipients: 'all',
            isForAllUsers: true
          },
          { 
            headers: { 
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json' 
            }
          }
        );
      } catch (notificationError) {
        // Just log the error, don't block the main flow
        console.error('Failed to create notification:', notificationError);
      }

      // Navigate to success page
      navigate('/membership-success', { 
        state: { 
          membershipId: response.data.membershipId,
          firstName: formData.firstName,
          membershipType: formData.membershipType
        } 
      });
    }

  } catch (error: any) {
    setError(error.response?.data?.message || 'Failed to submit membership application');
    setLoading(false);
  }
};