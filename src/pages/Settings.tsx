"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Shield,
  Bell,
  Sun,
  Moon,
  Save,
  Loader,
  ArrowLeft,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Mail,
  Eye,
  EyeOff,
  Palette,
  Volume2,
  Globe,
  Zap,
  Heart,
  Flame,
  Gift,
  SettingsIcon,
} from "lucide-react"
import Swal from "sweetalert2"

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [profileVisibility, setProfileVisibility] = useState(true)
  const [loading, setLoading] = useState(false)
  const [initialFetch, setInitialFetch] = useState(true) // Track initial fetch status
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      
      if (!token) {
        console.error("No authentication token found")
        setError("You must be logged in to access settings")
        navigate("/login")
        return
      }
      
      console.log("Fetching user settings with token:", token.substring(0, 10) + "...")
      
      const response = await fetch("http://localhost:5000/api/user/settings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      console.log("Settings API response:", data)

      if (response.ok && data.success) {
        const { settings } = data
        console.log("Retrieved settings:", settings)
        
        // Check that settings object has the expected properties
        if (settings) {
          setDarkMode(settings.darkMode ?? false)
          setEmailNotifications(settings.emailNotifications ?? true)
          setPushNotifications(settings.pushNotifications ?? true)
          setProfileVisibility(settings.profileVisibility ?? true)
        } else {
          console.warn("Settings object is empty or missing properties")
        }
      } else {
        // Handle 401 unauthorized errors
        if (response.status === 401) {
          console.error("Authentication failed when fetching settings")
          localStorage.removeItem("token") // Clear invalid token
          navigate("/login")
          return
        }
        
        throw new Error(data.message || "Failed to fetch settings")
      }
    } catch (error) {
      console.error("Error fetching settings:", error)
      setError("Could not load your settings. Please try again later.")
    } finally {
      setLoading(false)
      setInitialFetch(false)
    }
  }

  const handleSaveSettings = async () => {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: "Save Settings?",
      text: "Are you sure you want to update your preferences?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, save changes",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    })

    if (!result.isConfirmed) return

    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const token = localStorage.getItem("token")
      
      if (!token) {
        throw new Error("No authentication token found")
      }
      
      // Create the payload with the current settings
      const payload = {
        darkMode,
        emailNotifications,
        pushNotifications,
        profileVisibility,
      }
      
      console.log("Sending settings update:", payload)
      
      const response = await fetch("http://localhost:5000/api/user/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      // Always parse the JSON response regardless of status
      let data
      try {
        data = await response.json()
        console.log("Settings update response:", data)
      } catch (e) {
        console.error("Failed to parse response JSON:", e)
        throw new Error("Invalid response from server")
      }

      if (response.ok && data.success) {
        setSuccess("Settings saved successfully!")
        setTimeout(() => setSuccess(""), 5000)

        // Apply the returned settings if available
        if (data.settings) {
          setDarkMode(data.settings.darkMode ?? darkMode)
          setEmailNotifications(data.settings.emailNotifications ?? emailNotifications)
          setPushNotifications(data.settings.pushNotifications ?? pushNotifications)
          setProfileVisibility(data.settings.profileVisibility ?? profileVisibility)
        }

        // Show success alert
        await Swal.fire({
          icon: "success",
          title: "Settings Updated!",
          text: "Your preferences have been successfully saved.",
          confirmButtonColor: "#dc2626",
          timer: 3000,
          timerProgressBar: true,
        })
      } else {
        // Handle 401 unauthorized errors
        if (response.status === 401) {
          localStorage.removeItem("token") // Clear invalid token
          navigate("/login")
          return
        }
        
        throw new Error(data.message || "Failed to save settings")
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to save settings"
      console.error("Settings update error:", errorMessage)
      setError(errorMessage)

      Swal.fire({
        icon: "error",
        title: "Save Failed",
        text: errorMessage,
        confirmButtonColor: "#dc2626",
      })
    } finally {
      setLoading(false)
    }
  }

  const ToggleSwitch = ({ enabled, onChange, label, description, icon: Icon }: any) => (
    <div className="flex items-center justify-between p-8 bg-gradient-to-r from-gray-50/80 to-white/80 backdrop-blur-sm rounded-2xl hover:from-red-50/80 hover:to-rose-50/80 transition-all duration-500 shadow-lg hover:shadow-xl border border-white/20">
      <div className="flex items-center gap-6">
        <div className="p-4 bg-gradient-to-r from-red-100 to-rose-100 rounded-2xl shadow-lg">
          <Icon className="h-6 w-6 text-red-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{label}</h3>
          <p className="text-gray-600 font-medium">{description}</p>
        </div>
      </div>

      <button
        onClick={onChange}
        className={`relative inline-flex h-8 w-16 items-center rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
          enabled ? "bg-gradient-to-r from-red-500 to-rose-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 shadow-lg ${
            enabled ? "translate-x-9" : "translate-x-1"
          }`}
        >
          {enabled && <Zap className="h-3 w-3 text-red-500 m-auto mt-0.5" />}
        </span>
      </button>
    </div>
  )

  // Show loading state during initial fetch
  if (initialFetch && loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-red-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-12 flex flex-col items-center">
          <Loader className="h-12 w-12 text-red-500 animate-spin mb-4" />
          <p className="text-xl font-semibold text-gray-700">Loading your settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-red-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-red-300 to-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-rose-300 to-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-red-200 to-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-500"></div>

        {/* Floating elements */}
        <div className="absolute top-20 left-20 animate-bounce delay-300">
          <Heart className="h-6 w-6 text-red-300 opacity-60" />
        </div>
        <div className="absolute top-40 right-32 animate-bounce delay-700">
          <Flame className="h-8 w-8 text-red-400 opacity-50" />
        </div>
        <div className="absolute bottom-32 left-32 animate-bounce delay-500">
          <Gift className="h-5 w-5 text-rose-300 opacity-70" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="mb-12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 text-gray-600 hover:text-red-600 transition-all duration-300 mb-8 group bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-semibold">Back</span>
          </button>

          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-600 p-6 rounded-3xl shadow-2xl">
                  <SettingsIcon className="h-16 w-16 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-rose-600 rounded-3xl blur opacity-30 animate-pulse"></div>
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 via-rose-600 to-red-600 bg-clip-text text-transparent mb-4">
              Settings
            </h1>
            <p className="text-xl text-gray-600 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-red-500 mr-3 animate-pulse" />
              Customize your experience
            </p>
          </div>
        </div>

        {/* Enhanced Main Settings Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden hover:shadow-3xl transition-all duration-500">
          {/* Status Messages */}
          {error && (
            <div className="bg-red-50/80 backdrop-blur-sm border-l-4 border-red-500 p-6 m-8 rounded-2xl shadow-lg">
              <div className="flex items-center">
                <AlertCircle className="h-6 w-6 text-red-500 mr-4" />
                <p className="text-red-700 font-semibold text-lg">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="bg-green-50/80 backdrop-blur-sm border-l-4 border-green-500 p-6 m-8 rounded-2xl shadow-lg">
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-4" />
                <p className="text-green-700 font-semibold text-lg">{success}</p>
              </div>
            </div>
          )}

          <div className="p-10">
            {/* Settings Sections */}
            <div className="space-y-12">
              {/* Enhanced Appearance Section */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-red-100 to-rose-100 rounded-2xl shadow-lg">
                    <Palette className="h-8 w-8 text-red-600" />
                  </div>
                  Appearance
                </h2>
                <div className="space-y-6">
                  <ToggleSwitch
                    enabled={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                    label="Dark Mode"
                    description="Switch between light and dark themes for better viewing experience"
                    icon={darkMode ? Moon : Sun}
                  />
                </div>
              </div>

              {/* Enhanced Notifications Section */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-red-100 to-rose-100 rounded-2xl shadow-lg">
                    <Volume2 className="h-8 w-8 text-red-600" />
                  </div>
                  Notifications
                </h2>
                <div className="space-y-6">
                  <ToggleSwitch
                    enabled={emailNotifications}
                    onChange={() => setEmailNotifications(!emailNotifications)}
                    label="Email Notifications"
                    description="Receive email updates about your account activities and important announcements"
                    icon={Mail}
                  />
                  <ToggleSwitch
                    enabled={pushNotifications}
                    onChange={() => setPushNotifications(!pushNotifications)}
                    label="Push Notifications"
                    description="Get instant notifications on your device for real-time updates"
                    icon={Bell}
                  />
                </div>
              </div>

              {/* Enhanced Privacy Section */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-red-100 to-rose-100 rounded-2xl shadow-lg">
                    <Globe className="h-8 w-8 text-red-600" />
                  </div>
                  Privacy & Visibility
                </h2>
                <div className="space-y-6">
                  <ToggleSwitch
                    enabled={profileVisibility}
                    onChange={() => setProfileVisibility(!profileVisibility)}
                    label="Public Profile"
                    description="Make your profile visible to other members and enable networking opportunities"
                    icon={profileVisibility ? Eye : EyeOff}
                  />
                </div>
              </div>
            </div>

            {/* Enhanced Save Button */}
            <div className="mt-16 pt-10 border-t border-gray-200">
              <button
                onClick={handleSaveSettings}
                disabled={loading}
                className="w-full flex items-center justify-center py-5 px-8 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white rounded-2xl hover:from-red-700 hover:via-rose-700 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/50 disabled:opacity-50 transition-all duration-300 font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin -ml-1 mr-4 h-8 w-8" />
                    Saving Settings...
                  </>
                ) : (
                  <>
                    <Save className="h-8 w-8 mr-4" />
                    Save Settings
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Security Notice */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-8 py-4 bg-white/60 backdrop-blur-sm rounded-full shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
            <Shield className="h-5 w-5 text-red-500 mr-3" />
            <span className="text-gray-700 font-semibold text-lg">
              Your preferences are securely stored and encrypted
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
