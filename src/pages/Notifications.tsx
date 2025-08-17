"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Bell,
  Calendar,
  User,
  CheckCircle,
  ArrowLeft,
  Sparkles,
  Loader,
  Eye,
  LinkIcon,
  Star,
  Zap,
  Filter,
  Heart,
  Flame,
  Gift,
  MessageCircle,
  TrendingUp,
} from "lucide-react"
import { useAppSelector } from "../redux/hooks"
import { toast } from "react-toastify"

interface Notification {
  _id: string
  title: string
  message: string
  type: string
  priority: "low" | "medium" | "high"
  read: boolean
  createdAt: string
  updatedAt: string
  imageUrl?: string
  link?: string
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all")
  const [unreadCount, setUnreadCount] = useState(0)
  const navigate = useNavigate()
  const { token, user } = useAppSelector((state) => state.auth)

  const notifyNavbarOfUpdate = () => {
    window.dispatchEvent(new Event("notifications-updated"))
  }

  useEffect(() => {
    if (token) {
      fetchNotifications()
    } else {
      setLoading(false)
      console.log("No token available, can't fetch notifications")
    }
  }, [token])

  useEffect(() => {
    if (!token) return

    const interval = setInterval(() => {
      checkUnreadNotifications()
    }, 30000)

    return () => clearInterval(interval)
  }, [token])

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      if (!token) {
        toast.error("Authentication required")
        navigate("/login")
        return
      }

      const apiBase = process.env.NODE_ENV === "production" ? "/api" : `${import.meta.env.VITE_API_URL}/api`
      const response = await fetch(`${apiBase}/notifications/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`Error response: ${response.status} - ${errorText}`)
        if (response.status === 401) {
          toast.error("Session expired, please login again")
          navigate("/login")
          return
        }
        throw new Error(`Failed to fetch notifications: ${response.status}`)
      }

      const result = await response.json()
      if (result.success && Array.isArray(result.data)) {
        setNotifications(result.data)
        setUnreadCount(result.data.filter((notif: Notification) => !notif.read).length)
        notifyNavbarOfUpdate()
      } else {
        console.error("Invalid response format:", result)
        throw new Error("Invalid response format")
      }
    } catch (error) {
      console.error("Error fetching notifications:", error)
      toast.error("Failed to fetch notifications")
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      if (!user?._id) {
        console.error("User ID not available")
        toast.error("User information is missing")
        return
      }

      const apiBase = process.env.NODE_ENV === "production" ? "/api" : `${import.meta.env.VITE_API_URL}/api`
      const response = await fetch(`${apiBase}/notifications/${id}/read`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setNotifications((prev) => prev.map((notif) => (notif._id === id ? { ...notif, read: true } : notif)))
        setUnreadCount((prev) => Math.max(0, prev - 1))
        notifyNavbarOfUpdate()

        // Show success toast
        toast.success("Notification marked as read", {
          position: "bottom-right",
          autoClose: 2000,
        })
      } else {
        const error = await response.json()
        toast.error(error.message || "Failed to mark as read")
      }
    } catch (error) {
      console.error("Error marking notification as read:", error)
      toast.error("Failed to mark as read")
    }
  }

  const markAllAsRead = async () => {
    try {
      if (!user?._id) {
        console.error("User ID not available")
        toast.error("User information is missing")
        return
      }

      const apiBase = process.env.NODE_ENV === "production" ? "/api" : `${import.meta.env.VITE_API_URL}/api`
      const response = await fetch(`${apiBase}/notifications/mark-all-read`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
        setUnreadCount(0)
        toast.success("All notifications marked as read")
        notifyNavbarOfUpdate()
      } else {
        const error = await response.json()
        toast.error(error.message || "Failed to mark all as read")
      }
    } catch (error) {
      console.error("Error marking all as read:", error)
      toast.error("Failed to mark all as read")
    }
  }

  const checkUnreadNotifications = async () => {
    if (!token) return

    try {
      const apiBase = process.env.NODE_ENV === "production" ? "/api" : `${import.meta.env.VITE_API_URL}/api`
      const response = await fetch(`${apiBase}/notifications/unread-count`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          const newUnreadCount = result.data.count
          if (newUnreadCount !== unreadCount) {
            setUnreadCount(newUnreadCount)
            if (newUnreadCount > unreadCount) {
              fetchNotifications()
            }
            notifyNavbarOfUpdate()
          }
        }
      }
    } catch (error) {
      console.error("Error checking notifications:", error)
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "event":
        return <Calendar className="h-5 w-5 text-red-500" />
      case "membership":
        return <User className="h-5 w-5 text-red-500" />
      case "profile":
        return <User className="h-5 w-5 text-red-500" />
      case "admin":
        return <User className="h-5 w-5 text-red-500" />
      case "message":
        return <MessageCircle className="h-5 w-5 text-red-500" />
      case "trending":
        return <TrendingUp className="h-5 w-5 text-red-500" />
      default:
        return <Bell className="h-5 w-5 text-red-500" />
    }
  }

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "unread") return !notif.read
    if (filter === "read") return notif.read
    return true
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " at " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const handleLinkClick = (notificationId: string, link: string) => {
    markAsRead(notificationId)
    if (link.startsWith("/")) {
      navigate(link)
    } else {
      window.open(link, "_blank", "noopener,noreferrer")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-red-100 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-red-300 to-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-rose-300 to-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        </div>

        <div className="text-center relative z-10">
          <div className="bg-white/80 backdrop-blur-lg p-12 rounded-3xl shadow-2xl border border-white/20">
            <div className="relative">
              <Loader className="h-16 w-16 animate-spin text-red-600 mx-auto mb-6" />
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600 rounded-full opacity-20 animate-ping"></div>
            </div>
            <p className="text-gray-700 font-semibold text-lg">Loading notifications...</p>
            <div className="mt-4 flex justify-center space-x-1">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    )
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
                  <Bell className="h-16 w-16 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-rose-600 rounded-3xl blur opacity-30 animate-pulse"></div>
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 via-rose-600 to-red-600 bg-clip-text text-transparent mb-4">
              Notifications
            </h1>
            <p className="text-xl text-gray-600 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-red-500 mr-3 animate-pulse" />
              Stay updated with your activities
            </p>
          </div>
        </div>

        {/* Enhanced Filter Controls */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-12 border border-white/20 hover:shadow-3xl transition-all duration-500">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="flex gap-3">
              {["all", "unread", "read"].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType as any)}
                  className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                    filter === filterType
                      ? "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-xl"
                      : "bg-white/60 text-gray-700 hover:bg-red-50 hover:text-red-600 border border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                    {filterType === "unread" && unreadCount > 0 && (
                      <span className="ml-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg animate-pulse">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-3 text-red-600 hover:text-red-700 font-bold transition-all duration-300 bg-white/60 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <CheckCircle className="h-5 w-5" />
                Mark all as read
              </button>
            )}
          </div>
        </div>

        {/* Enhanced Notifications List */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden hover:shadow-3xl transition-all duration-500">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-20">
              <div className="relative inline-block mb-6">
                <Bell className="h-20 w-20 text-gray-300 mx-auto" />
                <div className="absolute -inset-2 bg-gradient-to-r from-red-200 to-rose-200 rounded-full blur opacity-30"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No notifications</h3>
              <p className="text-gray-500 text-lg">
                {filter === "unread" ? "You're all caught up! 🎉" : "No notifications to show"}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`p-8 border-l-4 transition-all duration-300 hover:bg-gradient-to-r hover:from-red-50/50 hover:to-rose-50/50 ${
                    !notification.read
                      ? "bg-gradient-to-r from-blue-50/80 to-red-50/80 border-l-red-500 shadow-lg"
                      : "bg-white/50 border-l-gray-200"
                  }`}
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 pt-1">
                      <div className="p-3 bg-gradient-to-r from-red-100 to-rose-100 rounded-2xl shadow-lg">
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3
                          className={`text-xl font-bold flex items-center gap-3 ${
                            notification.read ? "text-gray-700" : "text-gray-900"
                          }`}
                        >
                          {notification.title}
                          {!notification.read && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg animate-pulse">
                              <Star className="h-3 w-3 mr-1" />
                              New
                            </span>
                          )}
                        </h3>

                        {!notification.read && (
                          <div className="ml-4">
                            <button
                              onClick={() => markAsRead(notification._id)}
                              className="flex items-center text-red-600 hover:text-red-800 font-bold transition-all duration-300 bg-white/60 px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Mark as read
                            </button>
                          </div>
                        )}
                      </div>

                      <p className="text-gray-600 text-lg mb-4 leading-relaxed">{notification.message}</p>

                      {notification.imageUrl && (
                        <div className="mt-6">
                          <img
                            src={notification.imageUrl || "/placeholder.svg"}
                            alt="Notification image"
                            className="rounded-2xl border border-gray-200 shadow-xl max-h-64 object-contain hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                            loading="lazy"
                            onClick={() => {
                              window.open(notification.imageUrl, "_blank")
                            }}
                          />
                        </div>
                      )}

                      {notification.link && (
                        <div className="mt-6">
                          <button
                            onClick={() => handleLinkClick(notification._id, notification.link!)}
                            className="inline-flex items-center px-6 py-3 border border-transparent font-bold rounded-2xl shadow-xl text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 focus:outline-none transition-all duration-300 transform hover:scale-105"
                          >
                            <LinkIcon className="h-5 w-5 mr-3" />
                            Open Link
                          </button>
                        </div>
                      )}

                      <div className="mt-4 flex items-center text-sm text-gray-500 gap-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span className="font-medium">{formatDate(notification.createdAt)}</span>
                        </div>
                        <span className="text-gray-300">•</span>
                        <span
                          className={`capitalize px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                            notification.priority === "high"
                              ? "bg-gradient-to-r from-red-100 to-red-200 text-red-800"
                              : notification.priority === "medium"
                                ? "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800"
                                : "bg-gradient-to-r from-green-100 to-green-200 text-green-800"
                          }`}
                        >
                          <Zap className="h-3 w-3 inline mr-1" />
                          {notification.priority} priority
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Enhanced Security Notice */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-8 py-4 bg-white/60 backdrop-blur-sm rounded-full shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
            <Bell className="h-5 w-5 text-red-500 mr-3" />
            <span className="text-gray-700 font-semibold text-lg">Notifications are delivered securely</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notifications
