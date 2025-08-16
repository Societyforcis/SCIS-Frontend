"use client"

import { UserIcon } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"
import { QRCodeSVG } from "qrcode.react"
import gold from "./images/gold.png"
import styles from "./IDCard.module.css"
import { useParams } from "react-router-dom"

interface MembershipData {
  _id?: string
  firstName?: string
  lastName?: string
  title?: string
  email?: string
  membershipId?: string
  issueDate?: string | Date
  expiryDate?: string | Date
  organisation?: string
  department?: string
  currentPosition?: string
  profilePhoto?: string
  paymentStatus?: string
  createdAt?: string | Date
  updatedAt?: string | Date
}

// Helper function to safely convert to uppercase
const safeToUpper = (str: string | undefined | null, defaultValue: string = ''): string => {
  return (str || defaultValue).toString().toUpperCase()
}

// Format date to a readable string
const formatDate = (dateString?: string | Date): string => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  } catch (e) {
    console.error('Error formatting date:', e);
    return 'N/A';
  }
}

export default function IDCard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [membership, setMembership] = useState<MembershipData | null>(null);
  const { id: urlMembershipId } = useParams<{ id?: string }>();
  
  useEffect(() => {
    const fetchMembershipData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const storedMembershipId = localStorage.getItem('membershipId');
        const email = localStorage.getItem('email');
        
        // Determine which ID to use (URL param has priority)
        const membershipId = urlMembershipId || storedMembershipId;
        
        console.log('Auth data check:', { 
          hasToken: !!token, 
          hasEmail: !!email,
          hasUrlId: !!urlMembershipId,
          hasStoredId: !!storedMembershipId 
        });
        
        let response;
        
        // CASE 1: We have a membership ID (either from URL or localStorage)
        if (membershipId) {
          console.log('🔍 Fetching membership data for ID:', membershipId);
          
          try {
            // Don't include auth headers - this should be a public endpoint
            response = await axios.get(
              `${import.meta.env.VITE_API_URL}/api/membership/id/${membershipId}`
            );
            
            console.log('📥 API Response status:', response.status);
          } catch (idError) {
            console.error('Error fetching by ID:', idError.message);
            
            // If we have auth credentials, try the email endpoint as fallback
            if (token && email) {
              console.log('🔄 ID lookup failed, trying email lookup instead');
              response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/membership/email/${encodeURIComponent(email)}`,
                {
                  headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                  }
                }
              );
            } else {
              throw idError; // Re-throw if we can't use fallback
            }
          }
        }
        // CASE 2: No ID but we have token and email
        else if (token && email) {
          console.log('🔍 Fetching membership data for email:', email);
          
          response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/membership/email/${encodeURIComponent(email)}`,
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );
        }
        // CASE 3: No way to identify the membership
        else {
          throw new Error('No membership ID or login information found.');
        }
        
        // Process the response
        if (response.data.success && response.data.membership) {
          console.log('✅ Membership data found');
          setMembership(response.data.membership);
          
          // Save ID to localStorage if not already there
          if (response.data.membership.membershipId && !localStorage.getItem('membershipId')) {
            localStorage.setItem('membershipId', response.data.membership.membershipId);
          }
        } else {
          console.error('❌ No membership data in response');
          throw new Error(response.data.message || 'No membership data found');
        }
      } catch (error: any) {
        // Error handling
        console.error('❌ Error fetching membership data:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        
        setError(
          error.response?.data?.message || 
          error.message || 
          'Failed to load membership information. Please try again later.'
        );
      } finally {
        setLoading(false);
      }
    };
    
    fetchMembershipData();
  }, [urlMembershipId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }
  
  if (error || !membership) {
    return (
      <div className="text-center py-10 px-4">
        <div className="text-red-500 text-lg mb-2">Error Loading ID Card</div>
        <p className="mb-4">{error || 'Membership information not found'}</p>
        <p className="text-sm text-gray-500 mb-4">
          Please check if the ID is correct or contact support if the issue persists.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Safely format the full name with title
  const fullName = [
    membership.title ? membership.title.trim() : '',
    [membership.firstName, membership.lastName].filter(Boolean).join(' ').trim()
  ].filter(Boolean).join(' ')

  // Ensure we have a valid membership ID or use a fallback
  const displayMembershipId = membership.membershipId || membership._id || 'unknown';
  const cardUrl = `${window.location.origin}/id-card/${displayMembershipId}`
  const formattedIssueDate = formatDate(membership.issueDate || membership.createdAt)
  const formattedExpiryDate = formatDate(membership.expiryDate)

  return (
    <div className="flex justify-center py-10 px-4">
      <div
        className="relative w-[800px] h-[430px] rounded-xl overflow-hidden shadow-2xl border"
        style={{
          backgroundImage: `url(${gold})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex h-full">
          <div className="w-full flex flex-col items-center justify-center">
            <p className="text-2xl font-semibold text-black mt-[250px] ml-[-100px]">
              VALID UNTIL {safeToUpper(formattedExpiryDate, 'N/A')}
            </p>
          </div>

          <div className="w-1/2 flex flex-col justify-between p-2">
            <div className="w-full flex justify-center">
              <div
                className={`w-32 h-32 rounded-lg overflow-hidden flex items-center justify-center mt-[50px] ml-[-230px] ${
                  membership.profilePhoto ? "" : "bg-gray-200"
                }`}
                style={{
                  borderRadius: '8px',
                  ...(membership.profilePhoto ? {
                    backgroundImage: `url(${membership.profilePhoto})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  } : {})
                }}
              >
                {!membership.profilePhoto && (
                  <UserIcon className="w-16 h-16 text-gray-500" />
                )}
              </div>
            </div>

            <div className="text-center mt-2 ml-[-230px]">
              <h2 className={styles.memberName}>
                {fullName ? safeToUpper(fullName) : 'NO NAME PROVIDED'}
              </h2>
              <p className="text-lg font-medium text-black">
                {safeToUpper(membership.currentPosition, 'MEMBER')}
              </p>
              <p className="text-base font-semibold text-red-600">
                ID: {membership.membershipId || 'N/A'}
              </p>
              <p className="text-xs text-black mt-1">
                Issued: {formattedIssueDate}
              </p>
            </div>

            <div className="mx-auto w-70 h-20 ml-[180px] mb-[400px]">
              <QRCodeSVG
                value={cardUrl}
                size={80}
                style={{marginLeft: "-50px",marginTop: "-25px"}}
                bgColor={"transparent"}
                fgColor={"#000000"}
                level={"L"}
                includeMargin={false}
              />
              <p className="text-xs text-center text-gray-700" style={{marginTop: "1px",marginLeft:"-65px"}}>
                Scan for verification
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}