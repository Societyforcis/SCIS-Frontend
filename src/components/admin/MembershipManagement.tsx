import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { Search, Edit, Trash2, Download, Eye, X, Check, Filter } from 'lucide-react';
import Swal from 'sweetalert2';

interface Membership {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  organisation: string;
  address?: string;
  town: string;
  country: string;
  status: string;
  membershipType: string;
  paymentStatus: string;
  profilePhoto?: string;
  membershipId?: string;
  issueDate?: string;
  expiryDate?: string;
  active: boolean;
  createdAt: string;
  interests?: string[];
}

export default function MembershipManagement() {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAppSelector(state => state.auth);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingMembership, setEditingMembership] = useState<Membership | null>(null);
  const [viewingMembership, setViewingMembership] = useState<Membership | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  
  // Form state for editing
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    organisation: '',
    status: '',
    membershipType: '',
    paymentStatus: '',
    active: true,
    address: '',
    town: '',
    country: ''
  });

  const fetchMemberships = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/memberships`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch memberships');
      }

      const data = await response.json();
      if (data.success) {
        setMemberships(data.memberships);
      }
    } catch (error) {
      console.error('Error fetching memberships:', error);
      Swal.fire('Error', 'Failed to fetch memberships', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberships();
  }, [token]);

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will delete the membership permanently',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      confirmButtonColor: '#d33',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/membership/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            Swal.fire('Deleted!', 'Membership has been deleted.', 'success');
            fetchMemberships();
          } else {
            throw new Error('Failed to delete membership');
          }
        } catch (error) {
          console.error('Error deleting membership:', error);
          Swal.fire('Error', 'Failed to delete membership', 'error');
        }
      }
    });
  };

  const handleEdit = (membership: Membership) => {
    setEditingMembership(membership);
    setEditForm({
      firstName: membership.firstName || '',
      lastName: membership.lastName || '',
      email: membership.email || '',
      mobile: membership.mobile || '',
      organisation: membership.organisation || '',
      status: membership.status || '',
      membershipType: membership.membershipType || '',
      paymentStatus: membership.paymentStatus || '',
      active: membership.active,
      address: membership.address || '',
      town: membership.town || '',
      country: membership.country || ''
    });
  };

  const handleView = (membership: Membership) => {
    setViewingMembership(membership);
  };

  const handleSaveEdit = async () => {
    if (!editingMembership) return;
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/membership/${editingMembership._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });

      if (response.ok) {
        Swal.fire('Updated!', 'Membership has been updated.', 'success');
        setEditingMembership(null);
        fetchMemberships();
      } else {
        throw new Error('Failed to update membership');
      }
    } catch (error) {
      console.error('Error updating membership:', error);
      Swal.fire('Error', 'Failed to update membership', 'error');
    }
  };

  const exportToCSV = () => {
    // Convert the memberships data to CSV format
    const headers = ['ID', 'Name', 'Email', 'Organisation', 'Type', 'Status', 'Payment Status', 'Issue Date', 'Expiry Date'];
    const csvData = memberships.map(membership => [
      membership.membershipId || membership._id,
      `${membership.firstName} ${membership.lastName}`,
      membership.email,
      membership.organisation,
      membership.membershipType,
      membership.status,
      membership.paymentStatus,
      membership.issueDate ? new Date(membership.issueDate).toLocaleDateString() : 'N/A',
      membership.expiryDate ? new Date(membership.expiryDate).toLocaleDateString() : 'N/A'
    ]);
    
    // Add headers
    csvData.unshift(headers);
    
    // Convert to CSV string
    const csvString = csvData.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    
    // Create download link
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `memberships_export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Apply filters
  const filteredMemberships = memberships.filter(membership => {
    // Search term filter
    const searchMatch = 
      membership.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      membership.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      membership.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      membership.organisation.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const statusMatch = statusFilter === 'all' || membership.status === statusFilter;
    
    // Type filter
    const typeMatch = typeFilter === 'all' || membership.membershipType === typeFilter;
    
    return searchMatch && statusMatch && typeMatch;
  });

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Memberships</h2>
        <button 
          onClick={exportToCSV}
          className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search memberships..."
            className="pl-10 pr-4 py-2 w-full border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            className="pl-10 pr-4 py-2 w-full border rounded-lg appearance-none bg-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            className="pl-10 pr-4 py-2 w-full border rounded-lg appearance-none bg-white"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="student">Student</option>
            <option value="professional">Professional</option>
            <option value="corporate">Corporate</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredMemberships.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No memberships found matching your criteria
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMemberships.map(membership => (
                <tr key={membership._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {membership.firstName} {membership.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{membership.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {membership.organisation}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {membership.membershipType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      membership.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {membership.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      membership.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {membership.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleEdit(membership)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(membership._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Membership Modal */}
      {editingMembership && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit Membership</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                className="border rounded-lg px-4 py-2 w-full"
                value={editForm.firstName}
                onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                className="border rounded-lg px-4 py-2 w-full"
                value={editForm.lastName}
                onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="border rounded-lg px-4 py-2 w-full"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile</label>
              <input
                type="text"
                className="border rounded-lg px-4 py-2 w-full"
                value={editForm.mobile}
                onChange={(e) => setEditForm({ ...editForm, mobile: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
              <input
                type="text"
                className="border rounded-lg px-4 py-2 w-full"
                value={editForm.organisation}
                onChange={(e) => setEditForm({ ...editForm, organisation: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                className="border rounded-lg px-4 py-2 w-full"
                value={editForm.status}
                onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Membership Type</label>
              <select
                className="border rounded-lg px-4 py-2 w-full"
                value={editForm.membershipType}
                onChange={(e) => setEditForm({ ...editForm, membershipType: e.target.value })}
              >
                <option value="student">Student</option>
                <option value="professional">Professional</option>
                <option value="corporate">Corporate</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
              <select
                className="border rounded-lg px-4 py-2 w-full"
                value={editForm.paymentStatus}
                onChange={(e) => setEditForm({ ...editForm, paymentStatus: e.target.value })}
              >
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setEditingMembership(null)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Membership Details Modal */}
      {viewingMembership && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Membership Details</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <div className="border rounded-lg px-4 py-2 w-full bg-gray-100">
                {viewingMembership.firstName}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <div className="border rounded-lg px-4 py-2 w-full bg-gray-100">
                {viewingMembership.lastName}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="border rounded-lg px-4 py-2 w-full bg-gray-100">
                {viewingMembership.email}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile</label>
              <div className="border rounded-lg px-4 py-2 w-full bg-gray-100">
                {viewingMembership.mobile}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
              <div className="border rounded-lg px-4 py-2 w-full bg-gray-100">
                {viewingMembership.organisation}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <div className="border rounded-lg px-4 py-2 w-full bg-gray-100">
                {viewingMembership.status}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Membership Type</label>
              <div className="border rounded-lg px-4 py-2 w-full bg-gray-100">
                {viewingMembership.membershipType}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
              <div className="border rounded-lg px-4 py-2 w-full bg-gray-100">
                {viewingMembership.paymentStatus}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Issue Date</label>
              <div className="border rounded-lg px-4 py-2 w-full bg-gray-100">
                {formatDate(viewingMembership.issueDate)}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
              <div className="border rounded-lg px-4 py-2 w-full bg-gray-100">
                {formatDate(viewingMembership.expiryDate)}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setViewingMembership(null)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}