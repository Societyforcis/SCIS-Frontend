"use client"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setAuth, logout } from '../redux/slices/authSlice'; // Make sure to import setAuth
import axios, { isAxiosError } from 'axios';
// Import Lucide React icons
import { 
  User, 
  ArrowLeft, 
  Sparkles, 
  AlertCircle,
  CheckCircle,
  Camera,
  Mail, 
  Phone, 
  // Phone, 
  MapPin, 
  FileText,
  Save,
  Shield,
  Loader as LoaderIcon, // Rename to avoid potential conflicts
} from 'lucide-react';
import Swal from 'sweetalert2';
import { useAuthCheck } from '../hooks/useAuthCheck';

// Create a fallback Loader component in case the import fails
const Loader = ({ className }: { className?: string }) => {
  try {
    // Try to use the imported LoaderIcon
    return <LoaderIcon className={className} />;
  } catch (error) {
    // Fallback to a simple CSS loader if the import fails
    return (
      <div 
        className={`inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent ${className}`} 
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
};

interface ProfileData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  bio: string
  profilePicture?: string
}

const Profile = () => {
  const dispatch = useAppDispatch();
  // Use the auth check hook to get authentication state
  const { isAuthenticated, token, user } = useAuthCheck();
  const navigate = useNavigate();
  
  // Add this line to define storedEmail
  const storedEmail = user?.email || '';

  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    email: user?.email || "", // Initialize with user email if available
    phone: "",
    address: "",
    bio: "",
    profilePicture: "",
  })
  const [imagePreview, setImagePreview] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Improved authentication check on component mount
  useEffect(() => {
    const checkAuth = async () => {
      // First check if auth is already in Redux store
      if (token) {
        console.log("Auth already in Redux store, proceeding");
        return;
      }

      // Then check localStorage
      const localToken = localStorage.getItem('token');
      const localUser = localStorage.getItem('user');
      
      if (localToken && localUser) {
        try {
          const parsedUser = JSON.parse(localUser);
          
          // Restore auth state from localStorage to Redux
          dispatch(setAuth({
            token: localToken,
            user: parsedUser
          }));
          
          console.log("Restored auth state from localStorage");
          
          // No need to navigate away - we've restored the auth
          return;
        } catch (error) {
          console.error("Failed to parse user from localStorage:", error);
          // Clear corrupted data
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      
      // If we reach here, no valid auth was found
      // Use SweetAlert instead of immediate navigation
      Swal.fire({
        title: 'Authentication Required',
        text: 'Please login to view your profile',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Go to Home',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { 
            state: { 
              from: '/profile',
              message: 'Please login to view your profile' 
            } 
          });
        } else {
          navigate('/');
        }
      });
    };

    checkAuth();
  }, [token, dispatch, navigate]);

  const fetchProfileData = async () => {
    // Don't attempt to fetch if no token is available
    if (!token) {
      console.log("No token available, skipping profile fetch");
      setLoading(false);
      return;
    }
    
    try {
      console.log("Fetching profile with token:", token);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const { data } = response;
      console.log("Profile data received:", data);

      // Ensure we have the email from multiple possible sources
      const userEmail = data.profile?.email || user?.email || storedEmail || "";
      console.log("Using email:", userEmail);

      setProfileData({
        firstName: data.profile?.firstName || "",
        lastName: data.profile?.lastName || "",
        email: userEmail, // Use the determined email
        phone: data.profile?.phone || "",
        address: data.profile?.address || "",
        bio: data.profile?.bio || "",
        profilePicture: data.profile?.profilePicture || "",
      });

      if (data.profile?.profilePicture) {
        setImagePreview(data.profile.profilePicture);
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
      
      // Don't immediately redirect on any error
      // Only redirect for 401 Unauthorized errors
      if (isAxiosError(error)) {
        if (error.response?.status === 401) {
          // Clear localStorage and redux store
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          dispatch(logout());
          
          navigate('/login', { 
            state: { 
              from: '/profile',
              message: 'Session expired, please login again' 
            } 
          });
        } else {
          // For other errors, just show an error message
          setError(
            error.response?.data?.message || 
            'Failed to load profile data. Please try again later.'
          );
        }
      } else {
        setError('Failed to load profile data. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Update fetchProfileData to only run when token is available
  useEffect(() => {
    if (token) {
      fetchProfileData();
    }
  }, [token]);

  // Add this effect at the beginning of your component
  useEffect(() => {
    // Initialize email from Redux store if available
    if (user?.email) {
      setProfileData(prevData => ({
        ...prevData,
        email: user.email
      }));
      console.log("Set initial email from Redux store:", user.email);
    }
  }, [user?.email]); // Only run when the email in the Redux store changes

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setImagePreview(base64String)
        setProfileData((prev) => ({
          ...prev,
          profilePicture: base64String,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...profileData,
          email: storedEmail || profileData.email // Ensure email is included
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      const { profile } = await response.json();

      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'Saved',
        text: 'Your profile has been updated.',
        timer: 2000,
        showConfirmButton: false
      });

      // Update local state with returned data
      setProfileData(prev => ({
        ...prev,
        ...profile,
        email: storedEmail || profile.email
      }));

      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 5000);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to update profile");
      console.error('Profile update error:', error);
    } finally {
      setSaving(false);
    }
  };

  const calculateProfileCompletion = () => {
    const fields = [
      profileData.firstName,
      profileData.lastName,
      profileData.email,
      profileData.phone,
      profileData.address,
      profileData.bio,
      profileData.profilePicture,
    ]
    const completedFields = fields.filter((field) => field && field.trim() !== "").length
    return Math.round((completedFields / fields.length) * 100)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-red-100 flex items-center justify-center relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        </div>

        <div className="text-center relative z-10">
          <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <Loader className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">Loading your profile...</p>
          </div>
        </div>
      </div>
    )
  }

  const completionPercentage = calculateProfileCompletion()

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-red-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors mb-6 group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back</span>
          </button>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-2xl shadow-lg">
                <User className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
            <p className="text-lg text-gray-600 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-red-500 mr-2" />
              Manage your personal information
            </p>
          </div>
        </div>

        {/* Profile Completion Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Profile Completion</h3>
              <p className="text-sm text-gray-600">Complete your profile to unlock all features</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-red-500">{completionPercentage}%</div>
              <div className="text-xs text-gray-500">Complete</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Status Messages */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-6 m-6 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 p-6 m-6 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <p className="text-green-700 font-medium">{success}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Profile Picture Section */}
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center overflow-hidden border-4 border-red-500 shadow-lg">
                  {imagePreview ? (
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-16 w-16 text-red-400" />
                  )}
                </div>
                <label className="absolute bottom-2 right-2 bg-red-500 text-white p-3 rounded-full cursor-pointer hover:bg-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                  <Camera className="h-5 w-5" />
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700">Profile Picture</p>
                <p className="text-xs text-gray-500">JPG, PNG or GIF (max. 5MB)</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800">
                  First Name <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleInputChange}
                    className="pl-12 w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter your first name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleInputChange}
                    className="pl-12 w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  Email Address
                </div>
              </label>
              <input
                type="email"
                name="email"
                value={profileData.email} // Make sure this is using the correct state
                onChange={handleInputChange}
                readOnly // Email should typically be read-only
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">Phone Number</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  className="pl-12 w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">Address</label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                <input
                  type="text"
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                  className="pl-12 w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your address"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">Bio</label>
              <div className="relative group">
                <FileText className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="pl-12 w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                {saving ? (
                  <>
                    <Loader className="animate-spin -ml-1 mr-3 h-5 w-5" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-3" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Security Notice */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-100">
            <Shield className="h-4 w-4 text-red-500 mr-2" />
            <span className="text-sm text-gray-600 font-medium">Your data is secured with 256-bit encryption</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
