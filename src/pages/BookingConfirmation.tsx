import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Clock, CheckCircle, XCircle, Mail, Phone, CreditCard, Calendar, Image as ImageIcon, ZoomIn, ExternalLink, Download } from 'lucide-react';

interface BookingData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  membershipType: string;
  membershipFee: number;
  paymentMethod: string;
  paymentStatus: string;
  transactionId?: string;
  paymentScreenshot?: string;
  bookingStatus: string;
  adminRemarks?: string;
  rejectedReason?: string;
  createdAt: string;
  updatedAt: string;
}

const BookingConfirmation = () => {
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookingStatus();
  }, []);

  const fetchBookingStatus = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');

      if (!token || !email) {
        setError('Please login to view your booking status');
        setTimeout(() => navigate('/login'), 2000);
        return;
      }

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/booking/status`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success && response.data.booking) {
        setBooking(response.data.booking);
      } else {
        setError('No booking found. Please submit your membership application first.');
      }
    } catch (error: any) {
      console.error('Error fetching booking:', error);
      setError(error.response?.data?.message || 'Failed to fetch booking status');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = () => {
    if (!booking) return null;

    switch (booking.bookingStatus) {
      case 'pending':
        return (
          <div className="inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold bg-yellow-100 text-yellow-800 border-2 border-yellow-300">
            <Clock className="h-6 w-6 mr-2 animate-spin" />
            Verification in Progress
          </div>
        );
      case 'approved':
        return (
          <div className="inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold bg-green-100 text-green-800 border-2 border-green-300">
            <CheckCircle className="h-6 w-6 mr-2" />
            Approved
          </div>
        );
      case 'rejected':
        return (
          <div className="inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold bg-red-100 text-red-800 border-2 border-red-300">
            <XCircle className="h-6 w-6 mr-2" />
            Rejected
          </div>
        );
      default:
        return null;
    }
  };

  const getMembershipTypeLabel = (type: string) => {
    const types: { [key: string]: string } = {
      'student-ug': 'Student (Undergraduate)',
      'student-pg': 'Student (Postgraduate)',
      'academic': 'Academic Professional',
      'industry': 'Industry Professional',
      'international': 'International Member'
    };
    return types[type] || type;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500 mx-auto"></div>
          <p className="text-gray-600 mt-6 text-lg">Loading your booking status...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Booking Found</h2>
          <p className="text-gray-600 mb-6">{error || 'Unable to fetch booking information'}</p>
          <button
            onClick={() => navigate('/membership-form')}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
          >
            Apply for Membership
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Booking Confirmation</h1>
          <p className="text-gray-600">Thank you for submitting your membership application</p>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-red-500 to-red-600 px-8 py-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">Application Status</h2>
                <p className="text-red-100">Booking ID: {booking._id.slice(-8).toUpperCase()}</p>
              </div>
              <div>{getStatusBadge()}</div>
            </div>
          </div>

          <div className="p-8">
            {/* Status Message */}
            {booking.bookingStatus === 'pending' && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6 rounded-r-lg">
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-900 mb-2">Verification in Progress</h3>
                    <p className="text-yellow-800 mb-3">
                      Your membership application is currently under review by our admin team. 
                      This process typically takes 1-3 business days.
                    </p>
                    <p className="text-yellow-700 text-sm font-medium">
                      You will receive an email notification once your membership is approved. 
                      After approval, you'll be able to view and download your membership card.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {booking.bookingStatus === 'approved' && (
              <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-6 rounded-r-lg">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-900 mb-2">Congratulations! 🎉</h3>
                    <p className="text-green-800 mb-3">
                      Your membership has been approved! You can now view your membership card.
                    </p>
                    {booking.adminRemarks && (
                      <p className="text-green-700 text-sm mb-3">
                        <strong>Admin Note:</strong> {booking.adminRemarks}
                      </p>
                    )}
                    <button
                      onClick={() => navigate('/id-card')}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                    >
                      View Membership Card
                    </button>
                  </div>
                </div>
              </div>
            )}

            {booking.bookingStatus === 'rejected' && (
              <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-6 rounded-r-lg">
                <div className="flex items-start">
                  <XCircle className="h-6 w-6 text-red-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-900 mb-2">Application Rejected</h3>
                    <p className="text-red-800 mb-3">
                      Unfortunately, your membership application has been rejected.
                    </p>
                    {booking.rejectedReason && (
                      <div className="bg-red-100 p-4 rounded-lg mb-3">
                        <p className="text-red-900 text-sm">
                          <strong>Reason:</strong> {booking.rejectedReason}
                        </p>
                      </div>
                    )}
                    <p className="text-red-700 text-sm">
                      If you believe this is an error or would like to reapply, please contact our support team.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Booking Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>
                
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-lg mr-3">
                    <Mail className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-semibold text-gray-900">{booking.firstName} {booking.lastName}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-lg mr-3">
                    <Mail className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-gray-900">{booking.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-lg mr-3">
                    <Phone className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Mobile</p>
                    <p className="font-semibold text-gray-900">{booking.mobile}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Membership Details</h3>
                
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-lg mr-3">
                    <CheckCircle className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Membership Type</p>
                    <p className="font-semibold text-gray-900">{getMembershipTypeLabel(booking.membershipType)}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-lg mr-3">
                    <CreditCard className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Membership Fee</p>
                    <p className="font-semibold text-gray-900">₹{booking.membershipFee}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-lg mr-3">
                    <CreditCard className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Method</p>
                    <p className="font-semibold text-gray-900 capitalize">
                      {booking.paymentMethod.replace('-', ' ')}
                    </p>
                  </div>
                </div>

                {booking.transactionId && (
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <CreditCard className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Transaction ID</p>
                      <p className="font-semibold text-gray-900 text-sm break-all">{booking.transactionId}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-lg mr-3">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Submitted On</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(booking.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Screenshot Section */}
            {booking.paymentScreenshot && (
              <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <ImageIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Payment Proof</h4>
                    <p className="text-sm text-gray-600">Your uploaded payment screenshot</p>
                  </div>
                </div>
                
                <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg">
                  <div className="relative group">
                    <img 
                      src={booking.paymentScreenshot} 
                      alt="Payment Screenshot" 
                      className="w-full h-auto max-h-96 object-contain cursor-pointer transition-transform hover:scale-105"
                      onClick={() => setShowImageModal(true)}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                      <button
                        onClick={() => setShowImageModal(true)}
                        className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-lg transition-opacity"
                      >
                        <ZoomIn className="h-4 w-4" />
                        View Full Size
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-4">
                  <a
                    href={booking.paymentScreenshot}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 font-medium transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open in New Tab
                  </a>
                  <a
                    href={booking.paymentScreenshot}
                    download
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 font-medium transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                </div>
              </div>
            )}

            {!booking.paymentScreenshot && (
              <div className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
                <div className="flex items-center gap-3 text-yellow-800">
                  <div className="bg-yellow-200 p-2 rounded-lg">
                    <ImageIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">No Payment Screenshot Uploaded</p>
                    <p className="text-sm text-yellow-700">
                      You did not upload a payment screenshot during registration. 
                      If payment verification is required, please contact support.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate('/profile')}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
          >
            Go to Profile
          </button>
          <button
            onClick={fetchBookingStatus}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
          >
            Refresh Status
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            If you have any questions about your application, please contact our support team.
          </p>
          <a
            href="mailto:societyforcis.org@gmail.com"
            className="text-red-600 hover:text-red-700 font-semibold"
          >
            societyforcis.org@gmail.com
          </a>
        </div>
      </div>

      {/* Full Screen Image Modal */}
      {showImageModal && booking?.paymentScreenshot && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative max-w-7xl w-full h-full flex items-center justify-center">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 shadow-lg z-10"
            >
              <XCircle className="h-6 w-6" />
            </button>
            
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl max-h-full">
              <img 
                src={booking.paymentScreenshot} 
                alt="Payment Screenshot - Full View" 
                className="max-w-full max-h-[90vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <div className="flex gap-3 justify-center">
                  <a
                    href={booking.paymentScreenshot}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open in New Tab
                  </a>
                  <a
                    href={booking.paymentScreenshot}
                    download
                    className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 font-medium flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingConfirmation;
