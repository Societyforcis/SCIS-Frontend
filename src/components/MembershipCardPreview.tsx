import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAppSelector } from '../redux/hooks';
import { CreditCard, ArrowRight, Shield } from 'lucide-react';

const MembershipCardPreview: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [membershipData, setMembershipData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, token: reduxToken } = useAppSelector(state => state.auth);
  
  useEffect(() => {
    const checkMembership = async () => {
      // Try multiple sources to get auth info
      const token = reduxToken || localStorage.getItem('token');
      const email = user?.email || localStorage.getItem('email');
      
      console.log("Auth check:", { hasToken: !!token, hasEmail: !!email });
      
      if (!token || !email) {
        setIsLoading(false);
        setError('Please log in to view membership details');
        return;
      }
      
      // Try to get membership by current user first
      try {
        console.log('Trying to get current membership...');
        const currentResponse = await axios.get(
          'http://localhost:5000/api/membership/current',
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        if (currentResponse.data.success && currentResponse.data.membership) {
          console.log('Membership found via current endpoint');
          setMembershipData(currentResponse.data.membership);
          if (!localStorage.getItem('email')) {
            localStorage.setItem('email', email);
          }
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.log('Current membership endpoint failed, falling back to email lookup');
      }
      
      // Fall back to email lookup
      try {
        console.log(`Fetching membership data for email: ${email}`);
        
        const membershipResponse = await axios.get(
          `http://localhost:5000/api/membership/email/${encodeURIComponent(email)}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        console.log("API response:", membershipResponse.status, membershipResponse.statusText);
        
        if (membershipResponse.data.success && membershipResponse.data.membership) {
          console.log("Membership data found:", membershipResponse.data.membership);
          const membership = membershipResponse.data.membership;
          setMembershipData(membership);
          
          // Save to localStorage
          if (!localStorage.getItem('email')) {
            localStorage.setItem('email', email);
          }
          
          // Also save the membership ID
          if (membership.membershipId) {
            localStorage.setItem('membershipId', membership.membershipId);
          }
        } else {
          console.log("No membership data in response");
          setError('No active membership found');
        }
      } catch (error: any) {
        console.error('Error fetching membership data:', error);
        
        // Special handling for different error types
        if (error.response) {
          // The server responded with an error status
          console.error('Response error:', error.response.status, error.response.data);
          
          if (error.response.status === 401) {
            setError('Your session has expired. Please log in again.');
            // Clear invalid token
            localStorage.removeItem('token');
          } else if (error.response.status === 404) {
            setError('No membership found. Please apply for membership.');
          } else {
            setError(`Server error: ${error.response.data.message || 'Unknown error'}`);
          }
        } else if (error.request) {
          // No response received
          console.error('Request error - no response received');
          setError('Unable to connect to server. Please check your internet connection.');
        } else {
          // Error in setting up the request
          console.error('Request setup error:', error.message);
          setError('An error occurred while fetching your membership information.');
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    checkMembership();
  }, [reduxToken, user?.email]);
  
  // Format date to a readable string
  const formatDate = (dateString?: string | Date): string => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (e) {
      return 'N/A';
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-red-50 to-amber-50 py-12 px-4 border-t border-b border-gray-200">
      <div className="max-w-4xl mx-auto">
        {isLoading ? (
          <div className="w-full flex justify-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
          </div>
        ) : membershipData ? (
          <div className="bg-white rounded-xl shadow-xl p-8 text-center">
            <div className="bg-red-500 inline-flex p-3 rounded-full mb-4">
              <CreditCard className="h-8 w-8 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Your Membership Card</h2>
            
            <div className="space-y-6 max-w-xl mx-auto">
              <p className="text-gray-600">
                As a valued member of the Society for Cyber Intelligent System, you have exclusive 
                access to your digital membership card which serves as your official identification 
                within our community.
              </p>
              
              {/* <div className="bg-amber-50 border-l-4 border-amber-400 p-4 text-left">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Shield className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-amber-800">Member Information</h3>
                    <div className="mt-2 text-sm text-amber-700 space-y-1">
                      <p>Name: <strong>{membershipData.firstName} {membershipData.lastName}</strong></p>
                      <p>Membership ID: <strong>{membershipData.membershipId || membershipData._id}</strong></p>
                      <p>Membership Type: <strong>{membershipData.membershipType || 'Regular'}</strong></p>
                      <p>Valid Until: <strong>
                        {membershipData.expiryDate ? 
                          formatDate(membershipData.expiryDate) : 
                          'N/A'}
                      </strong></p>
                    </div>
                  </div>
                </div>
              </div>
               */}
              {/* <p className="text-gray-600">
                Click the button below to access your full membership card, which can be 
                downloaded, shared, or presented at Society for Cyber Intelligent System events 
                for verification purposes.
              </p>
               */}
              <Link 
                to={membershipData.membershipId ? `/id-card/${membershipData.membershipId}` : "/id-card"}
                className="inline-flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-3 px-8 rounded-lg transition-colors w-full sm:w-auto"
              >
                <span className="mr-2">View Full Membership Card</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <p className="text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
                If you have any questions about your membership or need assistance, 
                please contact our membership support team.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-xl p-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-200 inline-flex p-3 rounded-full mb-4">
                <CreditCard className="h-8 w-8 text-gray-500" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Membership Required</h2>
              
              <p className="text-gray-600 mb-6">
                {error || 'To access your membership card, you need to be a registered member of the Society for Cyber Intelligent System.'}
              </p>
              
              <button
                onClick={() => navigate('/membership-form')}
                className="inline-flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-3 px-8 rounded-lg transition-colors"
              >
                Apply for Membership
              </button>
              
              <p className="text-sm text-gray-500 mt-6">
                Membership gives you access to exclusive content, events, and networking opportunities.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembershipCardPreview;