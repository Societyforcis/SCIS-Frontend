import React, { useState, useEffect } from 'react';
import { Bell, Send, Users, ImagePlus, Trash, Info } from 'lucide-react';
import { useAppSelector } from '../../redux/hooks';
import { toast } from 'react-toastify';

const NotificationManager = () => {
  const { token } = useAppSelector(state => state.auth);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'system',
    recipients: 'all',
    priority: 'medium',
    link: '',
  });
  const [image, setImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userList, setUserList] = useState<{_id: string, email: string}[]>([]);
  
  // Fetch users for recipient selection
  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) return;
      
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setUserList(data.users);
          }
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    
    fetchUsers();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Prepare notification data
      const notificationData = {
        ...formData,
        image: image?.split(',')[1] || null,  // Extract base64 data without prefix
        imageType: image?.split(';')[0].split(':')[1] || null  // Extract MIME type
      };

      console.log('Sending notification:', {
        ...notificationData,
        image: notificationData.image ? '[BASE64_STRING]' : null
      });

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notifications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(notificationData)
      });

      const data = await response.json();

      if (response.ok) {
        // Reset form and show success message
        setFormData({
          title: '',
          message: '',
          type: 'system',
          recipients: 'all',
          priority: 'medium',
          link: ''
        });
        setImage(null);
        toast.success('Notification sent successfully!');
      } else {
        throw new Error(data.message || 'Failed to send notification');
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send notification');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size (max 1MB)
    if (file.size > 1024 * 1024) {
      toast.error('Image size should be less than 1MB');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Bell className="h-6 w-6 text-blue-500" />
        Send Notification
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="system">System</option>
              <option value="event">Event</option>
              <option value="membership">Membership</option>
              <option value="admin">Admin</option>
              <option value="announcement">Announcement</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recipients
          </label>
          <select
            value={formData.recipients}
            onChange={(e) => setFormData(prev => ({ ...prev, recipients: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Users</option>
            {userList.map(user => (
              <option key={user._id} value={user._id}>
                {user.email}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Link (Optional)
          </label>
          <input
            type="url"
            value={formData.link}
            onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image (Optional)
          </label>
          <div className="flex items-center space-x-2">
            <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
              <ImagePlus className="h-5 w-5 mr-2" />
              Upload Image
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
            {image && (
              <button 
                type="button"
                onClick={() => setImage(null)} 
                className="p-2 text-red-600 hover:text-red-800"
              >
                <Trash className="h-5 w-5" />
              </button>
            )}
          </div>
          {image && (
            <div className="mt-2 relative">
              <img 
                src={image} 
                alt="Preview" 
                className="h-24 object-contain rounded border border-gray-300" 
              />
            </div>
          )}
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Notifications will be tracked with detailed read receipts. You'll be able to see which users have viewed each notification.
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Send Notification</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default NotificationManager;