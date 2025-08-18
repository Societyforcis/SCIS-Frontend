import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { Search, Edit, Trash2, Check, X, Mail } from 'lucide-react';
import Swal from 'sweetalert2';

interface NewsletterSubscriber {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  interests: string[];
  frequency: string;
  isActive: boolean;
  createdAt: string;
}

export default function NewsletterSubscriberManagement() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAppSelector(state => state.auth);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingSubscriber, setEditingSubscriber] = useState<NewsletterSubscriber | null>(null);
  
  // Form state for editing
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    interests: [] as string[],
    frequency: 'weekly',
    isActive: true
  });

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      // Update the endpoint to match what's defined in your backend routes
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/newsletter`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch subscribers');
      }

      const data = await response.json();
      if (data.success) {
        // Update the property name to match the response format from your API
        setSubscribers(data.subscribers); // Match the response from adminController.js
      }
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      Swal.fire('Error', 'Failed to fetch newsletter subscribers', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, [token]);

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will remove the subscriber from the newsletter',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      confirmButtonColor: '#d33',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/newsletter/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            Swal.fire('Deleted!', 'Subscriber has been removed', 'success');
            fetchSubscribers();
          } else {
            throw new Error('Failed to delete subscriber');
          }
        } catch (error) {
          console.error('Error deleting subscriber:', error);
          Swal.fire('Error', 'Failed to delete subscriber', 'error');
        }
      }
    });
  };

  const handleEdit = (subscriber: NewsletterSubscriber) => {
    setEditingSubscriber(subscriber);
    setEditForm({
      firstName: subscriber.firstName || '',
      lastName: subscriber.lastName || '',
      email: subscriber.email,
      interests: subscriber.interests || [],
      frequency: subscriber.frequency,
      isActive: subscriber.isActive
    });
  };

  const handleSaveEdit = async () => {
    if (!editingSubscriber) return;
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/newsletter/${editingSubscriber._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });

      if (response.ok) {
        Swal.fire('Updated!', 'Subscriber has been updated', 'success');
        setEditingSubscriber(null);
        fetchSubscribers();
      } else {
        throw new Error('Failed to update subscriber');
      }
    } catch (error) {
      console.error('Error updating subscriber:', error);
      Swal.fire('Error', 'Failed to update subscriber', 'error');
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/newsletter/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isActive: !currentStatus })
      });

      if (response.ok) {
        Swal.fire('Updated!', 'Subscriber status has been updated', 'success');
        fetchSubscribers();
      } else {
        throw new Error('Failed to update subscriber status');
      }
    } catch (error) {
      console.error('Error updating subscriber status:', error);
      Swal.fire('Error', 'Failed to update subscriber status', 'error');
    }
  };

  const filteredSubscribers = subscribers.filter(subscriber => 
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (subscriber.firstName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (subscriber.lastName?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const handleInterestChange = (interest: string) => {
    if (editForm.interests.includes(interest)) {
      setEditForm({
        ...editForm,
        interests: editForm.interests.filter(i => i !== interest)
      });
    } else {
      setEditForm({
        ...editForm,
        interests: [...editForm.interests, interest]
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Newsletter Subscribers</h2>
        <button 
          onClick={() => {/* Implement export logic */}}
          className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors"
        >
          <Mail className="w-4 h-4" />
          Send Email
        </button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search subscribers..."
          className="pl-10 pr-4 py-2 w-full border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscriber</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interests</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubscribers.map(subscriber => (
                <tr key={subscriber._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {subscriber.firstName} {subscriber.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{subscriber.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {subscriber.interests && subscriber.interests.length > 0 ? (
                        subscriber.interests.map((interest, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                          >
                            {interest}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500">No interests</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="capitalize">{subscriber.frequency}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => handleToggleStatus(subscriber._id, subscriber.isActive)}
                      className={`px-2 py-1 inline-flex items-center rounded-full text-xs font-medium ${
                        subscriber.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {subscriber.isActive ? 
                        <><Check className="h-3 w-3 mr-1" /> Active</> : 
                        <><X className="h-3 w-3 mr-1" /> Inactive</>
                      }
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                      onClick={() => handleEdit(subscriber)}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(subscriber._id)}
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

      {/* Edit Modal */}
      {editingSubscriber && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Subscriber</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                  disabled
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={editForm.firstName}
                    onChange={(e) => setEditForm({...editForm, firstName: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={editForm.lastName}
                    onChange={(e) => setEditForm({...editForm, lastName: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                <select
                  value={editForm.frequency}
                  onChange={(e) => setEditForm({...editForm, frequency: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Cybersecurity', 'AI', 'Machine Learning', 'IoT', 'Blockchain', 'Data Science'].map(interest => (
                    <div key={interest} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`interest-${interest}`}
                        checked={editForm.interests.includes(interest)}
                        onChange={() => handleInterestChange(interest)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`interest-${interest}`} className="ml-2 text-sm text-gray-700">
                        {interest}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={editForm.isActive}
                  onChange={(e) => setEditForm({...editForm, isActive: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                  Active Subscription
                </label>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setEditingSubscriber(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}