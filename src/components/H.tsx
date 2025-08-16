"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import {
  User,
  Shield,
  Calendar,
  BookOpen,
  Lightbulb,
  Users,
  Award,
  Bell,
  Settings,
  ChevronRight,
  Globe,
  FileText,
  Video,
  Gift,
} from "lucide-react"
import { useAppSelector } from "../redux/hooks"

const H = () => {
  const [membershipId, setMembershipId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [memberData, setMemberData] = useState<any>(null)
  const navigate = useNavigate()
  
  // Get user data from Redux store
  const { user } = useAppSelector(state => state.auth)

  useEffect(() => {
    const fetchMembershipId = async () => {
      try {
        // Get email either from Redux store or localStorage
        const email = user?.email || localStorage.getItem("email")
        
        if (!email) {
          setError("User not logged in")
          setIsLoading(false)
          return
        }

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/membership/email/${encodeURIComponent(email)}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        
        if (response.data.success && response.data.membership) {
          setMembershipId(response.data.membership.idNumber)
          setMemberData(response.data.membership)
        } else {
          setError("No membership found")
        }
      } catch (error) {
        console.error("Error fetching membership:", error)
        setError("Failed to load membership information")
      } finally {
        setIsLoading(false)
      }
    }

    fetchMembershipId()
  }, [user])

  const quickActions = [
    {
      title: "View ID Card",
      description: "Access your digital membership card",
      icon: User,
      color: "bg-blue-500",
      link: membershipId ? `/id-card/${membershipId}` : "#",
    },
    {
      title: "Upcoming Events",
      description: "Join our latest cybersecurity events",
      icon: Calendar,
      color: "bg-green-500",
      link: "/events",
    },
    {
      title: "Research Hub",
      description: "Explore cutting-edge research",
      icon: BookOpen,
      color: "bg-purple-500",
      link: "/research-initiatives",
    },
    {
      title: "Innovation Lab",
      description: "Discover new technologies",
      icon: Lightbulb,
      color: "bg-orange-500",
      link: "/innovation-hub",
    },
  ]

  const memberServices = [
    {
      title: "Education Programs",
      description: "Professional development courses",
      icon: BookOpen,
      link: "/education-programs",
      badge: "New",
    },
    {
      title: "Webinars",
      description: "Live and recorded sessions",
      icon: Video,
      link: "/webinars",
      badge: "Live",
    },
    {
      title: "Member Benefits",
      description: "Exclusive perks and discounts",
      icon: Gift,
      link: "/benefits",
      badge: "Premium",
    },
    {
      title: "Certification Programs",
      description: "Industry-recognized certifications",
      icon: Award,
      link: "/certifications",
    },
    {
      title: "Community Forum",
      description: "Connect with fellow members",
      icon: Users,
      link: "/community",
    },
    {
      title: "Resource Library",
      description: "Access exclusive content",
      icon: FileText,
      link: "/resources",
    },
  ]

  const stats = [
    { label: "Active Members", value: "2,500+", icon: Users, color: "text-blue-600" },
    { label: "Research Papers", value: "150+", icon: FileText, color: "text-green-600" },
    { label: "Events This Year", value: "45+", icon: Calendar, color: "text-purple-600" },
    { label: "Industry Partners", value: "30+", icon: Globe, color: "text-orange-600" },
  ]

  const recentActivity = [
    {
      title: "New Research Paper Published",
      description: "AI-Driven Threat Detection in IoT Networks",
      time: "2 hours ago",
      type: "research",
    },
    {
      title: "Webinar: Zero Trust Architecture",
      description: "Join us tomorrow at 3 PM EST",
      time: "1 day ago",
      type: "event",
    },
    {
      title: "Member Spotlight",
      description: "Dr. Sarah Chen featured in CyberSec Weekly",
      time: "3 days ago",
      type: "news",
    },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Required</h2>
            <p className="text-red-500 mb-4">{error}</p>
            <p className="text-gray-600 mb-6">Join our community of cybersecurity professionals and researchers.</p>
            <Link
              to="/membership-form"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 font-medium"
            >
              Apply for Membership
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Member Dashboard</h1>
              <p className="text-gray-600">Society for Cyber Intelligent Systems</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/notifications" className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
              </Link>
              <Link to="/settings" className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl text-white p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
              <p className="text-red-100 text-lg">
                {memberData?.name || "Member"} • ID: {membershipId}
              </p>
              <p className="text-red-100 mt-2">
                Advancing cybersecurity through intelligent systems and collaborative research
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all transform hover:scale-105 group"
              >
                <div
                  className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{action.title}</h4>
                <p className="text-gray-600 text-sm">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Member Services */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Member Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {memberServices.map((service, index) => (
                <Link
                  key={index}
                  to={service.link}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-red-50 transition-colors">
                      <service.icon className="w-5 h-5 text-gray-600 group-hover:text-red-500" />
                    </div>
                    {service.badge && (
                      <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full font-medium">
                        {service.badge}
                      </span>
                    )}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
            <div className="bg-white rounded-xl shadow-sm">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className={`p-4 ${index !== recentActivity.length - 1 ? "border-b border-gray-100" : ""}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{activity.title}</h4>
                      <p className="text-gray-600 text-xs mt-1">{activity.description}</p>
                      <p className="text-gray-400 text-xs mt-2">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="p-4">
                <Link to="/activity" className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center">
                  View all activity
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Content */}
        <div className="mt-8 bg-white rounded-2xl p-8 shadow-sm">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Stay Connected</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join our growing community of cybersecurity professionals, researchers, and innovators. Access exclusive
              content, participate in cutting-edge research, and shape the future of cyber intelligence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/community"
                className="inline-flex items-center px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                <Users className="w-4 h-4 mr-2" />
                Join Community
              </Link>
              <Link
                to="/newsletter"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                <Bell className="w-4 h-4 mr-2" />
                Subscribe to Updates
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default H
