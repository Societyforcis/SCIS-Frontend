import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Loader2, Image as ImageIcon, X } from 'lucide-react';

interface FormValues {
  title: string;
  message: string;
  type: 'announcement' | 'event' | 'system' | 'membership' | 'admin';
  priority: 'low' | 'medium' | 'high';
  recipients: 'all' | 'specific';
  specificRecipients?: string;
  link?: string;
  image?: string;
}

const AnnouncementManagement = () => {
  const { user, token, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [toast, setToast] = useState<{show: boolean; title: string; message: string; type: 'success' | 'error'} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      title: '',
      message: '',
      type: 'announcement',
      priority: 'medium',
      recipients: 'all',
      link: '',
    },
  });

  const recipients = watch('recipients');
  const notificationType = watch('type');

  const showToast = (title: string, message: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, title, message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const optimizeImage = async (base64String: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Maximum dimensions
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        
        let width = img.width;
        let height = img.height;
        
        // Calculate new dimensions
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        ctx?.drawImage(img, 0, 0, width, height);
        
      
        const optimizedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        resolve(optimizedBase64);
      };
      img.onerror = reject;
      img.src = base64String;
    });
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.match('image.*')) {
      showToast('Error', 'Please select an image file', 'error');
      return;
    }

    // Check file size (max 5MB for raw file)
    if (file.size > 5 * 1024 * 1024) {
      showToast('Error', 'Image size should be less than 5MB', 'error');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
      
        const optimizedImage = await optimizeImage(base64String);
        setPreviewImage(optimizedImage);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      showToast('Error', 'Failed to process image', 'error');
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = (data: FormValues): { isValid: boolean; message?: string } => {
    if (!data.title.trim()) {
      return { isValid: false, message: 'Title is required' };
    }
    if (!data.message.trim()) {
      return { isValid: false, message: 'Message is required' };
    }
    if (data.link && !isValidUrl(data.link)) {
      return { isValid: false, message: 'Please enter a valid URL' };
    }
    if (data.recipients === 'specific' && !data.specificRecipients?.trim()) {
      return { isValid: false, message: 'Please enter at least one email' };
    }
    return { isValid: true };
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const onSubmit = async (data: FormValues) => {
    const { isValid, message } = validateForm(data);
    if (!isValid) {
      showToast('Validation Error', message || 'Please fill in all required fields', 'error');
      return;
    }

    try {
      setIsSubmitting(true);

      if (!user?._id || !token) {
        showToast('Error', 'Please log in again', 'error');
        navigate('/login');
        return;
      }

      let recipientsList = data.recipients === 'all' ? 'all' : 
        data.specificRecipients?.split(',').map(email => email.trim()).filter(Boolean) || [];

   
      let image = null;
      let imageType = null;
      
      if (previewImage) {
 
        const matches = previewImage.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
        
        if (matches && matches.length === 3) {
          imageType = matches[1]; // The mime type
          image = matches[2];    // The base64 data
        }
      }

 
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? '/api/notifications' 
        : '${import.meta.env.VITE_API_URL}/api/notifications';

      const payload = {
        title: data.title.trim(),
        message: data.message.trim(),
        type: data.type,
        priority: data.priority,
        recipients: recipientsList,
        link: data.link?.trim() || '',
        image,
        imageType
      };

      console.log('Sending notification with image:', !!image);

      const response = await axios.post(
        apiUrl, 
        payload, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          timeout: 30000,
          maxContentLength: 20971520 
        }
      );

      if (response.data.success) {
        showToast('Success', 'Announcement sent successfully!', 'success');
        reset();
        setPreviewImage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (error: any) {
      console.error('Error sending announcement:', error);
      const errorMessage = error.response?.data?.message || 
                          'Failed to send announcement. Please try again.';
      showToast('Error', errorMessage, 'error');
      
      // Handle authentication errors
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Create New Announcement</h2>
          <p className="mt-1 text-sm text-gray-600">
            Send a notification to users. You can include text, links, and images.
          </p>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  className={`block w-full rounded-md border ${
                    errors.title ? 'border-red-300' : 'border-gray-300'
                  } shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2`}
                  {...register('title', { required: 'Title is required' })}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="type"
                  className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                  {...register('type')}
                >
                  <option value="announcement">Announcement</option>
                  <option value="event">Event</option>
                  <option value="system">System</option>
                  <option value="membership">Membership</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                rows={4}
                className={`block w-full rounded-md border ${
                  errors.message ? 'border-red-300' : 'border-gray-300'
                } shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2`}
                {...register('message', { required: 'Message is required' })}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                  Priority
                </label>
                <select
                  id="priority"
                  className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                  {...register('priority')}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="recipients" className="block text-sm font-medium text-gray-700">
                  Recipients
                </label>
                <select
                  id="recipients"
                  className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                  {...register('recipients')}
                >
                  <option value="all">All Users</option>
                  <option value="specific">Specific Users</option>
                </select>
              </div>
            </div>

            {recipients === 'specific' && (
              <div className="space-y-2">
                <label htmlFor="specificRecipients" className="block text-sm font-medium text-gray-700">
                  User Emails
                </label>
                <input
                  id="specificRecipients"
                  type="text"
                  className="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                  placeholder="Enter emails separated by commas"
                  {...register('specificRecipients')}
                />
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                Link (optional)
              </label>
              <input
                id="link"
                type="url"
                className={`block w-full rounded-md border ${
                  errors.link ? 'border-red-300' : 'border-gray-300'
                } shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2`}
                placeholder="https://example.com"
                {...register('link', {
                  validate: {
                    validUrl: value => 
                      !value || isValidUrl(value) || 'Please enter a valid URL'
                  }
                })}
              />
              {errors.link && (
                <p className="mt-1 text-sm text-red-600">{errors.link.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Image (optional)
              </label>
              <div className="flex items-center gap-4">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageIcon className="w-8 h-8 mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">
                      PNG, JPG, GIF (MAX. 2MB)
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              
              {previewImage && (
                <div className="mt-4">
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    className="max-w-full h-auto max-h-64 rounded-lg"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Sending...
                  </span>
                ) : (
                  'Send Announcement'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementManagement;
