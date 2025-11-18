"use client"

import { UserIcon, Download } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { QRCodeSVG } from "qrcode.react"
import html2canvas from "html2canvas"
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
  const [isDownloading, setIsDownloading] = useState(false);
  const [hasPendingBooking, setHasPendingBooking] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<string>('');
  const { id: urlMembershipId } = useParams<{ id?: string }>();
  const cardRef = useRef<HTMLDivElement>(null);
  
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
        
        // First, check if user has a pending booking
        if (token && email && !membershipId) {
          try {
            const bookingResponse = await axios.get(
              `${import.meta.env.VITE_API_URL}/api/booking/status`,
              {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
              }
            );
            
            if (bookingResponse.data.success && bookingResponse.data.booking) {
              const booking = bookingResponse.data.booking;
              setBookingStatus(booking.bookingStatus);
              
              if (booking.bookingStatus === 'pending') {
                setHasPendingBooking(true);
                setLoading(false);
                return; // Don't try to fetch membership if booking is pending
              }
            }
          } catch (bookingError) {
            console.log('No booking found or error checking booking:', bookingError);
            // Continue to membership check
          }
        }
        
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
          } catch (idError: any) {
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

  const downloadCard = async () => {
    if (!cardRef.current || !membership) return;
    
    try {
      setIsDownloading(true);
      
      // Create canvas from the card element
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: cardRef.current.offsetWidth * 2,
        height: cardRef.current.offsetHeight * 2
      });
      
      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob!);
        }, 'image/png', 1.0);
      });
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ID-Card-${membership.membershipId || 'member'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error downloading card:', error);
      alert('Failed to download card. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  // Show pending booking message
  if (hasPendingBooking && bookingStatus === 'pending') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
        <div className="max-w-2xl w-full bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-2xl border-2 border-yellow-200 overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 px-8 py-6 text-white">
            <div className="flex items-center justify-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-t-3 border-b-3 border-white"></div>
              <h2 className="text-2xl font-bold">Verification in Progress</h2>
            </div>
          </div>
          
          <div className="p-8 text-center space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                🎉 Thank You for Submitting Your Membership Application!
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Your application is currently being reviewed by our admin team.
              </p>
            </div>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-6 rounded-r-xl text-left">
              <h4 className="font-semibold text-yellow-900 mb-3 flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                What happens next?
              </h4>
              <ul className="space-y-2 text-yellow-800">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold">•</span>
                  <span>Our admin team will review your application and payment details</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold">•</span>
                  <span>This process typically takes 1-3 business days</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold">•</span>
                  <span>You'll receive an email notification once your membership is approved</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold">•</span>
                  <span>After approval, you can view and download your membership card from this page</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <p className="text-gray-600 mb-4">
                <strong className="text-gray-900">Please wait for admin verification.</strong> 
                <br />
                Once approved, you'll be able to view your membership card here.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-semibold shadow-md hover:shadow-lg"
                >
                  Check Status
                </button>
                <button
                  onClick={() => window.location.href = '/booking-confirmation'}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold shadow-md hover:shadow-lg"
                >
                  View Full Details
                </button>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              <p>Need help? Contact us at <a href="mailto:societyforcis.org@gmail.com" className="text-blue-600 hover:underline font-medium">societyforcis.org@gmail.com</a></p>
            </div>
          </div>
        </div>
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
    <div className="flex flex-col items-center py-10 px-4">
      {/* Download Button */}
      <div className="mb-6">
        <button
          onClick={downloadCard}
          disabled={isDownloading}
          className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Download className="h-5 w-5" />
          {isDownloading ? 'Downloading...' : 'Download ID Card'}
        </button>
      </div>

      {/* ID Card */}
      <div
        ref={cardRef}
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