import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { 
  CheckCircle, 
  XCircle, 
  Eye, 
  Clock, 
  DollarSign,
  User,
  Mail,
  Phone,
  Building,
  AlertCircle,
  Download,
  Filter,
  Image as ImageIcon,
  ZoomIn,
  ExternalLink
} from 'lucide-react';

interface BookingMembership {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  organisation: string;
  membershipType: string;
  membershipFee: number;
  paymentMethod: string;
  paymentStatus: string;
  paymentScreenshot?: string;
  transactionId?: string;
  bookingStatus: string;
  createdAt: string;
  updatedAt: string;
}

const BookingManagement = () => {
  const [bookings, setBookings] = useState<BookingMembership[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<BookingMembership | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    paid: 0
  });

  useEffect(() => {
    fetchBookings();
    fetchStats();
  }, [filterStatus]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const url = filterStatus === 'all' 
        ? `${import.meta.env.VITE_API_URL}/api/booking/all`
        : `${import.meta.env.VITE_API_URL}/api/booking/all?status=${filterStatus}`;
      
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setBookings(response.data.bookings);
      }
    } catch (error: any) {
      console.error('Error fetching bookings:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to fetch bookings'
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/booking/stats`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleApprove = async (bookingId: string) => {
    const result = await Swal.fire({
      title: 'Approve Booking?',
      text: 'This will create a membership and send an approval email to the user.',
      icon: 'question',
      input: 'textarea',
      inputLabel: 'Admin Remarks (optional)',
      inputPlaceholder: 'Enter any remarks for this approval...',
      showCancelButton: true,
      confirmButtonText: 'Approve',
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#ef4444'
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/booking/${bookingId}/approve`,
          { adminRemarks: result.value || '' },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          await Swal.fire({
            icon: 'success',
            title: 'Approved!',
            text: `Membership created with ID: ${response.data.membershipId}`,
            confirmButtonColor: '#10b981'
          });
          fetchBookings();
          fetchStats();
        }
      } catch (error: any) {
        Swal.fire({
          icon: 'error',
          title: 'Approval Failed',
          text: error.response?.data?.message || 'Failed to approve booking'
        });
      }
    }
  };

  const handleReject = async (bookingId: string) => {
    const result = await Swal.fire({
      title: 'Reject Booking?',
      text: 'Please provide a reason for rejection.',
      icon: 'warning',
      input: 'textarea',
      inputLabel: 'Rejection Reason',
      inputPlaceholder: 'Enter reason for rejection...',
      inputValidator: (value) => {
        if (!value) {
          return 'You must provide a rejection reason!';
        }
      },
      showCancelButton: true,
      confirmButtonText: 'Reject',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280'
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/booking/${bookingId}/reject`,
          { rejectedReason: result.value },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        await Swal.fire({
          icon: 'success',
          title: 'Rejected!',
          text: 'Booking has been rejected.',
          confirmButtonColor: '#ef4444'
        });
        fetchBookings();
        fetchStats();
      } catch (error: any) {
        Swal.fire({
          icon: 'error',
          title: 'Rejection Failed',
          text: error.response?.data?.message || 'Failed to reject booking'
        });
      }
    }
  };

  const viewDetails = (booking: BookingMembership) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  const viewPaymentImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      approved: 'bg-green-100 text-green-800 border-green-300',
      rejected: 'bg-red-100 text-red-800 border-red-300'
    };
    const icons = {
      pending: <Clock className="h-4 w-4 mr-1" />,
      approved: <CheckCircle className="h-4 w-4 mr-1" />,
      rejected: <XCircle className="h-4 w-4 mr-1" />
    };
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800'}`}>
        {icons[status as keyof typeof icons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPaymentStatusBadge = (status: string) => {
    return status === 'paid' ? (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-300">
        <DollarSign className="h-3 w-3 mr-1" />
        Paid
      </span>
    ) : (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-300">
        <Clock className="h-3 w-3 mr-1" />
        Pending
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Management</h1>
          <p className="text-gray-600">Manage membership booking requests and approvals</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{stats.approved}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{stats.rejected}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Paid</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">{stats.paid}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center gap-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="font-medium text-gray-700">Filter by status:</span>
            <div className="flex gap-2">
              {['all', 'pending', 'approved', 'rejected'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === status
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading bookings...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="p-12 text-center">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No bookings found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      User Info
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Membership
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="bg-red-100 p-2 rounded-full mr-3">
                            <User className="h-5 w-5 text-red-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {booking.firstName} {booking.lastName}
                            </p>
                            <p className="text-sm text-gray-500">{booking.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {booking.membershipType.toUpperCase().replace('-', ' ')}
                          </p>
                          <p className="text-sm text-gray-500">₹{booking.membershipFee}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          {getPaymentStatusBadge(booking.paymentStatus)}
                          <p className="text-xs text-gray-500 mt-1">{booking.paymentMethod}</p>
                          {booking.paymentScreenshot && (
                            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                              <ImageIcon className="h-3 w-3" />
                              <span>Screenshot Available</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(booking.bookingStatus)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => viewDetails(booking)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          {booking.bookingStatus === 'pending' && (
                            <>
                              <button
                                onClick={() => handleApprove(booking._id)}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Approve"
                              >
                                <CheckCircle className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => handleReject(booking._id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Reject"
                              >
                                <XCircle className="h-5 w-5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{selectedBooking.firstName} {selectedBooking.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedBooking.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mobile</p>
                    <p className="font-medium">{selectedBooking.mobile || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Organization</p>
                    <p className="font-medium">{selectedBooking.organisation}</p>
                  </div>
                </div>
              </div>

              {/* Membership Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Membership Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Membership Type</p>
                    <p className="font-medium">{selectedBooking.membershipType.toUpperCase().replace('-', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Fee</p>
                    <p className="font-medium text-green-600">₹{selectedBooking.membershipFee}</p>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <p className="font-medium">{selectedBooking.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Payment Status</p>
                    <div className="mt-1">{getPaymentStatusBadge(selectedBooking.paymentStatus)}</div>
                  </div>
                  {selectedBooking.transactionId && (
                    <div>
                      <p className="text-sm text-gray-500">Transaction ID</p>
                      <p className="font-medium">{selectedBooking.transactionId}</p>
                    </div>
                  )}
                </div>

                {/* Payment Screenshot */}
                {selectedBooking.paymentScreenshot && (
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="bg-blue-600 p-2 rounded-lg">
                        <ImageIcon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">Payment Proof</h4>
                        <p className="text-sm text-gray-600">Screenshot uploaded by user</p>
                      </div>
                    </div>
                    
                    <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg">
                      <div className="relative group">
                        <img 
                          src={selectedBooking.paymentScreenshot} 
                          alt="Payment Screenshot" 
                          className="w-full h-auto max-h-96 object-contain cursor-pointer transition-transform hover:scale-105"
                          onClick={() => viewPaymentImage(selectedBooking.paymentScreenshot!)}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                          <button
                            onClick={() => viewPaymentImage(selectedBooking.paymentScreenshot!)}
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
                        href={selectedBooking.paymentScreenshot}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 font-medium transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Open in New Tab
                      </a>
                      <a
                        href={selectedBooking.paymentScreenshot}
                        download
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 font-medium transition-colors"
                      >
                        <Download className="h-4 w-4" />
                        Download Screenshot
                      </a>
                    </div>
                  </div>
                )}
                
                {!selectedBooking.paymentScreenshot && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-yellow-800">
                      <AlertCircle className="h-5 w-5" />
                      <p className="font-medium">No payment screenshot uploaded</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Booking Status */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Status</h3>
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedBooking.bookingStatus)}
                  <span className="text-sm text-gray-500">
                    Created: {new Date(selectedBooking.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Actions */}
              {selectedBooking.bookingStatus === 'pending' && (
                <div className="flex gap-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      handleApprove(selectedBooking._id);
                    }}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="h-5 w-5" />
                    Approve Booking
                  </button>
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      handleReject(selectedBooking._id);
                    }}
                    className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 font-medium flex items-center justify-center gap-2"
                  >
                    <XCircle className="h-5 w-5" />
                    Reject Booking
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Image Modal */}
      {showImageModal && selectedImage && (
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
                src={selectedImage} 
                alt="Payment Screenshot - Full View" 
                className="max-w-full max-h-[90vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <div className="flex gap-3 justify-center">
                  <a
                    href={selectedImage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open in New Tab
                  </a>
                  <a
                    href={selectedImage}
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

export default BookingManagement;
