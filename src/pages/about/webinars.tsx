"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Calendar,
  Clock,
  Users,
  Play,
  Download,
  Star,
  Search,
  ChevronRight,
  Globe,
  Video,
  BookOpen,
} from "lucide-react"
import { Link } from "react-router-dom"

interface Webinar {
  id: string
  title: string
  description: string
  presenter: string
  presenterTitle: string
  date: string
  time: string
  duration: string
  attendees: number
  rating: number
  category: string
  level: "Beginner" | "Intermediate" | "Advanced"
  status: "upcoming" | "live" | "recorded"
  image: string
  tags: string[]
  registrationLink?: string
  recordingLink?: string
}

const Webinars: React.FC = () => {
  const [webinars, setWebinars] = useState<Webinar[]>([
    {
      id: "1",
      title: "AI-Powered Threat Detection: The Future of Cybersecurity",
      description:
        "Explore how artificial intelligence and machine learning are revolutionizing threat detection and response in modern cybersecurity frameworks.",
      presenter: "Dr. Sarah Chen",
      presenterTitle: "Chief AI Researcher, CyberDefense Labs",
      date: "March 25, 2024",
      time: "2:00 PM EST",
      duration: "90 minutes",
      attendees: 1250,
      rating: 4.8,
      category: "Artificial Intelligence",
      level: "Intermediate",
      status: "upcoming",
      image:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["AI", "Machine Learning", "Threat Detection", "Cybersecurity"],
      registrationLink: "#",
    },
    {
      id: "2",
      title: "Zero Trust Architecture: Implementation Best Practices",
      description:
        "Learn how to design and implement a comprehensive Zero Trust security model for your organization with real-world case studies.",
      presenter: "Michael Rodriguez",
      presenterTitle: "Senior Security Architect, TechSecure Inc.",
      date: "March 20, 2024",
      time: "3:00 PM EST",
      duration: "75 minutes",
      attendees: 890,
      rating: 4.9,
      category: "Network Security",
      level: "Advanced",
      status: "live",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["Zero Trust", "Network Security", "Architecture", "Implementation"],
      registrationLink: "#",
    },
    {
      id: "3",
      title: "Quantum Computing and Cryptography: Preparing for the Future",
      description:
        "Understanding the implications of quantum computing on current cryptographic methods and preparing for post-quantum cryptography.",
      presenter: "Prof. David Kim",
      presenterTitle: "Quantum Computing Researcher, MIT",
      date: "March 15, 2024",
      time: "1:00 PM EST",
      duration: "120 minutes",
      attendees: 2100,
      rating: 4.7,
      category: "Cryptography",
      level: "Advanced",
      status: "recorded",
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["Quantum Computing", "Cryptography", "Post-Quantum", "Future Tech"],
      recordingLink: "#",
    },
    {
      id: "4",
      title: "Cloud Security Fundamentals for Modern Enterprises",
      description:
        "Essential cloud security principles, tools, and strategies for protecting data and applications in multi-cloud environments.",
      presenter: "Jennifer Walsh",
      presenterTitle: "Cloud Security Specialist, AWS",
      date: "March 10, 2024",
      time: "11:00 AM EST",
      duration: "60 minutes",
      attendees: 1580,
      rating: 4.6,
      category: "Cloud Security",
      level: "Beginner",
      status: "recorded",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["Cloud Security", "AWS", "Multi-Cloud", "Enterprise"],
      recordingLink: "#",
    },
    {
      id: "5",
      title: "IoT Security: Protecting Connected Devices at Scale",
      description:
        "Comprehensive strategies for securing Internet of Things devices and networks in industrial and consumer environments.",
      presenter: "Dr. Ahmed Hassan",
      presenterTitle: "IoT Security Expert, SecureIoT Solutions",
      date: "March 30, 2024",
      time: "4:00 PM EST",
      duration: "85 minutes",
      attendees: 750,
      rating: 4.5,
      category: "IoT Security",
      level: "Intermediate",
      status: "upcoming",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["IoT", "Device Security", "Industrial IoT", "Network Protection"],
      registrationLink: "#",
    },
    {
      id: "6",
      title: "Incident Response: From Detection to Recovery",
      description:
        "Master the complete incident response lifecycle with hands-on scenarios and industry-proven methodologies.",
      presenter: "Lisa Thompson",
      presenterTitle: "CISO, Global Financial Services",
      date: "April 5, 2024",
      time: "2:30 PM EST",
      duration: "100 minutes",
      attendees: 920,
      rating: 4.8,
      category: "Incident Response",
      level: "Intermediate",
      status: "upcoming",
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["Incident Response", "CISO", "Recovery", "Methodology"],
      registrationLink: "#",
    },
  ])

  const [filteredWebinars, setFilteredWebinars] = useState<Webinar[]>(webinars)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState<string>("")

  const categories = [
    "all",
    "Artificial Intelligence",
    "Network Security",
    "Cryptography",
    "Cloud Security",
    "IoT Security",
    "Incident Response",
  ]
  const statuses = ["all", "upcoming", "live", "recorded"]

  useEffect(() => {
    let filtered = webinars

    if (selectedCategory !== "all") {
      filtered = filtered.filter((webinar) => webinar.category === selectedCategory)
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter((webinar) => webinar.status === selectedStatus)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (webinar) =>
          webinar.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          webinar.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          webinar.presenter.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredWebinars(filtered)
  }, [selectedCategory, selectedStatus, searchTerm, webinars])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "live":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse"></div>
            Live
          </span>
        )
      case "upcoming":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Calendar className="w-3 h-3 mr-1" />
            Upcoming
          </span>
        )
      case "recorded":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Play className="w-3 h-3 mr-1" />
            Recorded
          </span>
        )
      default:
        return null
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "text-green-600 bg-green-50"
      case "Intermediate":
        return "text-yellow-600 bg-yellow-50"
      case "Advanced":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Professional Webinars</h1>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              Join leading experts in cybersecurity and intelligent systems for cutting-edge insights and practical
              knowledge
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span>5,000+ Participants</span>
              </div>
              <div className="flex items-center">
                <Video className="w-5 h-5 mr-2" />
                <span>50+ Expert Sessions</span>
              </div>
              <div className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                <span>Global Community</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search webinars, presenters, or topics..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Webinars Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredWebinars.map((webinar) => (
            <div
              key={webinar.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="relative">
                <img
                  src={webinar.image || "/placeholder.svg"}
                  alt={webinar.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">{getStatusBadge(webinar.status)}</div>
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(webinar.level)}`}>
                    {webinar.level}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-red-600 font-medium">{webinar.category}</span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    {webinar.rating}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-red-600 transition-colors">
                  {webinar.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2">{webinar.description}</p>

                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{webinar.presenter}</p>
                    <p className="text-sm text-gray-600">{webinar.presenterTitle}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {webinar.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {webinar.time}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {webinar.attendees.toLocaleString()} attendees
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {webinar.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {webinar.status === "recorded" && webinar.recordingLink ? (
                    <button className="flex-1 flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                      <Play className="w-4 h-4 mr-2" />
                      Watch Recording
                    </button>
                  ) : webinar.status === "live" ? (
                    <button className="flex-1 flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                      <Video className="w-4 h-4 mr-2" />
                      Join Live
                    </button>
                  ) : (
                    <button className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      <Calendar className="w-4 h-4 mr-2" />
                      Register Now
                    </button>
                  )}
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredWebinars.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No webinars found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl text-white p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Want to Present a Webinar?</h3>
          <p className="text-red-100 mb-6 max-w-2xl mx-auto">
            Share your expertise with our global community of cybersecurity professionals. We're always looking for
            industry experts to lead engaging sessions.
          </p>
          <Link
            to="/webinar-proposal"
            className="inline-flex items-center px-6 py-3 bg-white text-red-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Submit Proposal
            <ChevronRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Webinars
