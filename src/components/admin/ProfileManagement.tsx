import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { User, Search, Edit, Trash2, AlertCircle, X, Check, Camera } from 'lucide-react';
import Swal from 'sweetalert2';

interface Profile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  bio?: string;
  profilePicture?: string; // base64 image string
  userId: {
    _id: string;
    email: string;
    isAdmin: boolean;
  } | string | null; // Added null as a possible type
  createdAt: string;
  updatedAt: string;
}

interface ProfileImageProps {
  src?: string;
  name: string;
  onClick?: () => void;
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  src,
  name,
  onClick
}) => {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
        <User className="h-6 w-6 text-gray-500" />
      </div>
    );
  }

  // Check if the src is a base64 string or URL
  const isBase64 = src.startsWith('data:image');
  const imageSrc = isBase64 ? src : `data:image/jpeg;base64,${src}`;

  return (
    <img
      src={imageSrc}
      alt={`${name}'s profile`}
      className="h-10 w-10 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
      onError={() => setError(true)}
      onClick={onClick}
    />
  );
};

export default function ProfileManagement() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAppSelector(state => state.auth);
  const [searchTerm, setSearchTerm] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  
  // Form state for editing
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    bio: ''
  });

  const fetchProfiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/admin/profiles', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch profiles');
      }

      const data = await response.json();
      if (data.success) {
        console.log("Fetched profiles:", data.profiles);
        setProfiles(data.profiles);
      } else {
        throw new Error(data.message || 'Failed to fetch profiles');
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, [token]);

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will delete the profile. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      confirmButtonColor: '#d33',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:5000/api/admin/profile/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            Swal.fire('Deleted!', 'Profile has been deleted.', 'success');
            fetchProfiles();
          } else {
            const data = await response.json();
            throw new Error(data.message || 'Failed to delete profile');
          }
        } catch (error) {
          console.error('Error deleting profile:', error);
          Swal.fire('Error', error instanceof Error ? error.message : 'Failed to delete profile', 'error');
        }
      }
    });
  };

  const handleEdit = (profile: Profile) => {
    setEditingProfile(profile);
    setEditForm({
      firstName: profile.firstName || '',
      lastName: profile.lastName || '',
      phone: profile.phone || '',
      address: profile.address || '',
      bio: profile.bio || ''
    });
    setUploadedImage(profile.profilePicture || null);
  };

  const handleSaveEdit = async () => {
    if (!editingProfile) return;
    
    try {
      const updateData = {
        ...editForm,
        profilePicture: uploadedImage
      };

      const response = await fetch(`http://localhost:5000/api/admin/profile/${editingProfile._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      if (response.ok) {
        Swal.fire('Updated!', 'Profile has been updated.', 'success');
        setEditingProfile(null);
        fetchProfiles();
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Swal.fire('Error', error instanceof Error ? error.message : 'Failed to update profile', 'error');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.match('image.*')) {
      Swal.fire('Error', 'Please select an image file', 'error');
      return;
    }

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      Swal.fire('Error', 'Image size should be less than 2MB', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Fixed filtering function to safely handle null userId
  const filteredProfiles = profiles.filter(profile => {
    // First, extract email safely
    let email = '';
    if (profile.userId) {
      if (typeof profile.userId === 'object' && profile.userId !== null) {
        email = profile.userId.email || '';
      } else if (typeof profile.userId === 'string') {
        // If userId is a string (ID), we don't have the email directly
        // Could use profile.email as a fallback if it exists
        email = profile.email || '';
      }
    } else {
      // Use profile's direct email if userId is null/undefined
      email = profile.email || '';
    }
    
    // Then filter based on firstName, lastName, or email
    return (profile.firstName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
           (profile.lastName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
           email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (error) {
    return (
      <div className="bg-red-50 rounded-lg p-4 flex items-center gap-3">
        <AlertCircle className="h-5 w-5 text-red-500" />
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User Profiles</h2>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search profiles..."
          className="pl-10 pr-4 py-2 w-full border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredProfiles.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No profiles found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProfiles.map(profile => {
                // Safely extract user information
                let email = '';
                let isAdmin = false;
                
                if (profile.userId) {
                  if (typeof profile.userId === 'object' && profile.userId !== null) {
                    email = profile.userId.email || '';
                    isAdmin = profile.userId.isAdmin || false;
                  } else if (typeof profile.userId === 'string') {
                    // If userId is a string ID, use the profile's email field if available
                    email = profile.email || '';
                  }
                } else {
                  email = profile.email || '';
                }
                
                return (
                  <tr key={profile._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <ProfileImage 
                            src={profile.profilePicture} 
                            name={`${profile.firstName} ${profile.lastName}`}
                            onClick={() => profile.profilePicture && setPreviewImage(profile.profilePicture)}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {profile.firstName} {profile.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {email || 'No email'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{profile.phone || 'No phone'}</div>
                      <div className="text-sm text-gray-500">{profile.address || 'No address'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        isAdmin ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {isAdmin ? 'Admin' : 'User'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                        onClick={() => handleEdit(profile)}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(profile._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Preview Image Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-2xl max-h-[90vh] overflow-hidden rounded-lg">
            <img
              src={previewImage.startsWith('data:') ? previewImage : `data:image/jpeg;base64,${previewImage}`}
              alt="Profile preview"
              className="object-contain max-h-[90vh]"
            />
            <button
              className="absolute top-2 right-2 bg-white rounded-full p-1 hover:bg-gray-100"
              onClick={() => setPreviewImage(null)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {editingProfile && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Profile</h3>
            
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  {uploadedImage ? (
                    <img 
                      src={uploadedImage.startsWith('data:') ? uploadedImage : `data:image/jpeg;base64,${uploadedImage}`} 
                      alt="Profile" 
                      className="h-24 w-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-12 w-12 text-gray-500" />
                    </div>
                  )}
                  <label className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600">
                    <Camera className="h-4 w-4 text-white" />
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={editForm.address}
                  onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                  rows={3}
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setEditingProfile(null)}
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