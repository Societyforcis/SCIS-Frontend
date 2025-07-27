import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config/api';
import { 
  Bell, Send, Image as ImageIcon, Link as LinkIcon, Calendar, 
  Info, AlertCircle, X, Upload, Check
} from 'lucide-react';
import Swal from 'sweetalert2';

const AnnouncementForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'announcement', // 'announcement' or 'event'
    link: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Size validation (3MB limit)
    if (file.size > 3 * 1024 * 1024) {
      Swal.fire({
        icon: 'error',
        title: 'File Too Large',
        text: 'Please select an image smaller than 3MB'
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormData({
        ...formData,
        image: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData({
      ...formData,
      image: null
    });
  };

  const validateForm = () => {
    if (!formData.title.trim()) return 'Title is required';
    if (!formData.message.trim()) return 'Message is required';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const error = validateForm();
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: error
      });
      return;
    }

    setLoading(true);
    try {
      // Show confirmation dialog
      const { isConfirmed } = await Swal.fire({
        icon: 'question',
        title: 'Confirm Announcement',
        html: `
          <p>Are you sure you want to send this ${formData.type}?</p>
          <p class="text-sm text-gray-600 mt-2">
            This will notify all users and send emails to those who have enabled email notifications.
          </p>
        `,
        showCancelButton: true,
        confirmButtonText: 'Send',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#c62828'
      });

      if (!isConfirmed) {
        setLoading(false);
        return;
      }
      
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      // Make API request
      const response = await axios.post(
        `${API_URL}/admin/announcements`, 
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: `${formData.type === 'event' ? 'Event' : 'Announcement'} Sent`,
          text: `Your ${formData.type} has been sent successfully!`,
          timer: 2000
        });
        
        // Reset form
        setFormData({
          title: '',
          message: '',
          type: 'announcement',
          link: '',
          image: null
        });
        setImagePreview(null);
      }
    } catch (error) {
      console.error('Error sending announcement:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to send announcement'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Bell className="w-6 h-6 mr-2 text-red-600" />
          Send Announcement
        </h2>
        <p className="text-gray-600">Create and send announcements to all users</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Announcement Type */}
        <div className="flex items-center space-x-4">
          <label className="font-medium text-gray-700">Type:</label>
          <div className="flex space-x-2">
            <button
              type="button"
              className={`px-4 py-2 rounded-md flex items-center ${
                formData.type === 'announcement' 
                  ? 'bg-red-100 text-red-600 border border-red-600' 
                  : 'bg-gray-100 text-gray-600 border border-gray-300'
              }`}
              onClick={() => handleChange({ target: { name: 'type', value: 'announcement' } })}
            >
              <AlertCircle className="w-4 h-4 mr-2" />
              Announcement
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-md flex items-center ${
                formData.type === 'event' 
                  ? 'bg-blue-100 text-blue-600 border border-blue-600' 
                  : 'bg-gray-100 text-gray-600 border border-gray-300'
              }`}
              onClick={() => handleChange({ target: { name: 'type', value: 'event' } })}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Event
            </button>
          </div>
        </div>
        
        {/* Title */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter announcement title"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>
        
        {/* Message */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter announcement message"
            rows="5"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            required
          />
        </div>
        
        {/* Link */}
        <div>
          <label className="block font-medium text-gray-700 mb-2 flex items-center">
            <LinkIcon className="w-4 h-4 mr-2" />
            Link (Optional)
          </label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="https://example.com/event-details"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        
        {/* Image Upload */}
        <div>
          <label className="block font-medium text-gray-700 mb-2 flex items-center">
            <ImageIcon className="w-4 h-4 mr-2" />
            Image (Optional)
          </label>
          
          {!imagePreview ? (
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Upload className="w-12 h-12 text-gray-400 mb-2" />
                <span className="text-gray-600 font-medium">Click to upload</span>
                <span className="text-gray-500 text-sm mt-1">PNG, JPG, GIF up to 3MB</span>
              </label>
            </div>
          ) : (
            <div className="relative">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="max-h-64 rounded-md mx-auto"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 px-6 rounded-md font-medium flex items-center justify-center hover:bg-red-700 transition duration-300"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin mr-2 h-5 w-5 border-t-2 border-white rounded-full" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Send {formData.type === 'event' ? 'Event' : 'Announcement'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AnnouncementForm;