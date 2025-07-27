"use client"
import type React from "react"
import { useState } from "react"
import { X, User, Camera, MapPin, FileText, Upload } from "lucide-react"

interface ProfileCompletionModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: (profileData: any) => void
  onSkip: () => void
}

const ProfileCompletionModal: React.FC<ProfileCompletionModalProps> = ({ isOpen, onClose, onComplete, onSkip }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    bio: "",
    profilePicture: "",
  })

  const [imagePreview, setImagePreview] = useState<string>("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
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
        setFormData((prev) => ({
          ...prev,
          profilePicture: base64String,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Complete Your Profile</h2>
              <p className="text-red-100 mt-2 text-lg">Help us personalize your experience</p>
            </div>
            <button
              onClick={onClose}
              className="text-red-100 hover:text-white transition-colors p-2 hover:bg-red-600 rounded-full"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-red-700"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Profile Picture */}
          <div className="flex flex-col items-center space-y-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center overflow-hidden border-4 border-red-500 shadow-lg">
                {imagePreview ? (
                  <img src={imagePreview || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="h-16 w-16 text-red-400" />
                )}
              </div>
              <label className="absolute bottom-2 right-2 bg-red-500 text-white p-3 rounded-full cursor-pointer hover:bg-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                <Camera className="h-5 w-5" />
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700">Upload your profile picture</p>
              <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF (max. 5MB)</p>
            </div>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                placeholder="Enter your first name"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-800">
              <MapPin className="h-4 w-4 mr-2 text-red-500" />
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
              placeholder="Enter your address"
            />
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-800">
              <FileText className="h-4 w-4 mr-2 text-red-500" />
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-8 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center space-x-2"
            >
              <Upload className="h-5 w-5" />
              <span>Complete Profile</span>
            </button>
            <button
              type="button"
              onClick={onSkip}
              className="flex-1 bg-gray-100 text-gray-700 py-4 px-8 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold text-lg border-2 border-gray-200 hover:border-gray-300"
            >
              Skip for Now
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileCompletionModal
