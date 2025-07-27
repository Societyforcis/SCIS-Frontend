"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Users,
  MessageCircle,
  Calendar,
  MapPin,
  Star,
  Award,
  Globe,
  Heart,
  Share2,
  ChevronRight,
  Search,
  Plus,
  Eye,
  ThumbsUp,
  Clock,
  UserPlus,
  BookOpen,
  Shield,
  Zap,
  Target,
} from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"

interface CommunityMember {
  id: string
  name: string
  title: string
  company: string
  avatar: string
  expertise: string[]
  contributions: number
  reputation: number
  joinDate: string
  location: string
  verified: boolean
}

interface Discussion {
  id: string
  title: string
  content: string
  author: CommunityMember
  category: string
  replies: number
  views: number
  likes: number
  createdAt: string
  tags: string[]
  solved: boolean
}

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  type: "online" | "offline" | "hybrid"
  attendees: number
  maxAttendees: number
  organizer: string
  image: string
  category: string
}

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"discussions" | "members" | "events" | "groups">("discussions")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    })
  }, [])

  const communityStats = [
    { label: "Active Members", value: "15,000+", icon: Users, color: "text-blue-600" },
    { label: "Discussions", value: "2,500+", icon: MessageCircle, color: "text-green-600" },
    { label: "Events This Year", value: "120+", icon: Calendar, color: "text-purple-600" },
    { label: "Countries", value: "85+", icon: Globe, color: "text-orange-600" },
  ]

  const featuredMembers: CommunityMember[] = [
    {
      id: "1",
      name: "Dr. Sarah Chen",
      title: "Chief Security Officer",
      company: "TechSecure Inc.",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      expertise: ["AI Security", "Threat Detection", "Machine Learning"],
      contributions: 245,
      reputation: 9850,
      joinDate: "2022-01-15",
      location: "San Francisco, CA",
      verified: true,
    },
    {
      id: "2",
      name: "Michael Rodriguez",
      title: "Senior Penetration Tester",
      company: "CyberDefense Labs",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      expertise: ["Penetration Testing", "Red Team", "Vulnerability Assessment"],
      contributions: 189,
      reputation: 7650,
      joinDate: "2021-08-22",
      location: "Austin, TX",
      verified: true,
    },
    {
      id: "3",
      name: "Dr. Aisha Patel",
      title: "Cryptography Researcher",
      company: "MIT",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      expertise: ["Cryptography", "Quantum Security", "Post-Quantum Crypto"],
      contributions: 156,
      reputation: 8920,
      joinDate: "2022-03-10",
      location: "Boston, MA",
      verified: true,
    },
    {
      id: "4",
      name: "James Wilson",
      title: "CISO",
      company: "Global Financial Corp",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      expertise: ["Risk Management", "Compliance", "Security Strategy"],
      contributions: 203,
      reputation: 9120,
      joinDate: "2021-11-05",
      location: "New York, NY",
      verified: true,
    },
  ]

  const discussions: Discussion[] = [
    {
      id: "1",
      title: "Best Practices for Implementing Zero Trust Architecture in Large Enterprises",
      content:
        "Looking for insights on implementing Zero Trust in a 10,000+ employee organization. What are the key challenges and how did you overcome them?",
      author: featuredMembers[0],
      category: "Network Security",
      replies: 23,
      views: 1250,
      likes: 45,
      createdAt: "2024-03-15T10:30:00Z",
      tags: ["Zero Trust", "Enterprise", "Implementation"],
      solved: false,
    },
    {
      id: "2",
      title: "AI-Powered Threat Detection: False Positive Reduction Strategies",
      content:
        "Our ML models are generating too many false positives. What techniques have you used to improve accuracy while maintaining detection rates?",
      author: featuredMembers[1],
      category: "AI Security",
      replies: 18,
      views: 890,
      likes: 32,
      createdAt: "2024-03-14T15:45:00Z",
      tags: ["AI", "Machine Learning", "Threat Detection"],
      solved: true,
    },
    {
      id: "3",
      title: "Post-Quantum Cryptography Migration Timeline",
      content:
        "With NIST standards finalized, when should organizations start planning their migration to post-quantum cryptography?",
      author: featuredMembers[2],
      category: "Cryptography",
      replies: 31,
      views: 1580,
      likes: 67,
      createdAt: "2024-03-13T09:15:00Z",
      tags: ["Post-Quantum", "Cryptography", "Migration"],
      solved: false,
    },
    {
      id: "4",
      title: "Incident Response Automation: Tools and Workflows",
      content:
        "Share your experience with SOAR platforms and automated incident response workflows. What tools work best for different scenarios?",
      author: featuredMembers[3],
      category: "Incident Response",
      replies: 15,
      views: 720,
      likes: 28,
      createdAt: "2024-03-12T14:20:00Z",
      tags: ["SOAR", "Automation", "Incident Response"],
      solved: false,
    },
  ]

  const upcomingEvents: Event[] = [
    {
      id: "1",
      title: "AI in Cybersecurity: Future Trends and Applications",
      description:
        "Join leading experts as they discuss the latest developments in AI-powered cybersecurity solutions and their real-world applications.",
      date: "2024-03-25",
      time: "2:00 PM EST",
      location: "Virtual Event",
      type: "online",
      attendees: 1250,
      maxAttendees: 2000,
      organizer: "Dr. Sarah Chen",
      image:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "AI Security",
    },
    {
      id: "2",
      title: "Hands-on Penetration Testing Workshop",
      description:
        "Interactive workshop covering advanced penetration testing techniques and tools. Bring your laptop and get ready for hands-on learning.",
      date: "2024-03-30",
      time: "10:00 AM PST",
      location: "San Francisco, CA",
      type: "offline",
      attendees: 45,
      maxAttendees: 50,
      organizer: "Michael Rodriguez",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "Penetration Testing",
    },
    {
      id: "3",
      title: "Quantum Computing and Cybersecurity Panel",
      description:
        "Panel discussion on the implications of quantum computing for cybersecurity, featuring researchers and industry experts.",
      date: "2024-04-05",
      time: "3:00 PM EST",
      location: "Hybrid Event",
      type: "hybrid",
      attendees: 890,
      maxAttendees: 1500,
      organizer: "Dr. Aisha Patel",
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "Cryptography",
    },
  ]

  const categories = [
    "all",
    "AI Security",
    "Network Security",
    "Cryptography",
    "Incident Response",
    "Penetration Testing",
    "Compliance",
  ]

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center" data-aos="fade-up">
            <h1 className="text-5xl font-bold mb-6">Cybersecurity Community</h1>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              Connect, learn, and collaborate with cybersecurity professionals from around the world. Share knowledge,
              solve problems, and advance your career together.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {communityStats.map((stat, index) => (
                <div key={index} className="text-center" data-aos="fade-up" data-aos-delay={index * 100}>
                  <stat.icon className="w-8 h-8 mx-auto mb-2 opacity-80" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12" data-aos="fade-up">
          <div className="bg-white rounded-xl p-1 shadow-sm">
            <div className="flex space-x-1">
              {[
                { id: "discussions", label: "Discussions", icon: MessageCircle },
                { id: "members", label: "Members", icon: Users },
                { id: "events", label: "Events", icon: Calendar },
                { id: "groups", label: "Groups", icon: Shield },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-red-500 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8" data-aos="fade-up">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
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
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New {activeTab.slice(0, -1)}
              </button>
            </div>
          </div>
        </div>

        {/* Discussions Tab */}
        {activeTab === "discussions" && (
          <div className="space-y-6" data-aos="fade-up">
            {discussions.map((discussion, index) => (
              <div
                key={discussion.id}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={discussion.author.avatar || "/placeholder.svg"}
                      alt={discussion.author.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-900">{discussion.author.name}</h4>
                        {discussion.author.verified && <Award className="w-4 h-4 text-blue-500" />}
                      </div>
                      <p className="text-sm text-gray-600">{discussion.author.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full">
                      {discussion.category}
                    </span>
                    {discussion.solved && (
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full">Solved</span>
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-red-600 transition-colors cursor-pointer">
                  {discussion.title}
                </h3>
                <p className="text-gray-600 mb-4">{discussion.content}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {discussion.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {discussion.replies} replies
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {discussion.views} views
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      {discussion.likes} likes
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {getTimeAgo(discussion.createdAt)}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors font-medium">
                      Join Discussion
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Members Tab */}
        {activeTab === "members" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up">
            {featuredMembers.map((member, index) => (
              <div
                key={member.id}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="text-center mb-4">
                  <img
                    src={member.avatar || "/placeholder.svg"}
                    alt={member.name}
                    className="w-20 h-20 rounded-full mx-auto mb-3"
                  />
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">{member.name}</h3>
                    {member.verified && <Award className="w-4 h-4 text-blue-500" />}
                  </div>
                  <p className="text-gray-600 text-sm">{member.title}</p>
                  <p className="text-gray-500 text-xs">{member.company}</p>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Reputation</span>
                    <span className="font-medium text-gray-900">{member.reputation.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Contributions</span>
                    <span className="font-medium text-gray-900">{member.contributions}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Location</span>
                    <span className="font-medium text-gray-900">{member.location}</span>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Expertise:</p>
                  <div className="flex flex-wrap gap-1">
                    {member.expertise.map((skill, skillIndex) => (
                      <span key={skillIndex} className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    Connect
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Events Tab */}
        {activeTab === "events" && (
          <div className="space-y-6" data-aos="fade-up">
            {upcomingEvents.map((event, index) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="grid lg:grid-cols-3 gap-0">
                  <div className="relative h-48 lg:h-auto">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          event.type === "online"
                            ? "bg-blue-100 text-blue-600"
                            : event.type === "offline"
                              ? "bg-green-100 text-green-600"
                              : "bg-purple-100 text-purple-600"
                        }`}
                      >
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="lg:col-span-2 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full">{event.category}</span>
                      <div className="text-sm text-gray-600">Organized by {event.organizer}</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {event.date} at {event.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        {event.attendees}/{event.maxAttendees} attendees
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Star className="w-4 h-4" />
                        Featured Event
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-4">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Register
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Groups Tab */}
        {activeTab === "groups" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up">
            {[
              {
                name: "AI Security Researchers",
                description: "Advancing cybersecurity through artificial intelligence and machine learning",
                members: 2500,
                posts: 450,
                icon: Zap,
                color: "bg-blue-500",
                category: "Research",
              },
              {
                name: "Penetration Testing Professionals",
                description: "Ethical hackers and security testers sharing techniques and tools",
                members: 1800,
                posts: 320,
                icon: Target,
                color: "bg-red-500",
                category: "Testing",
              },
              {
                name: "Cryptography Experts",
                description: "Discussing encryption, protocols, and post-quantum cryptography",
                members: 1200,
                posts: 280,
                icon: Shield,
                color: "bg-purple-500",
                category: "Cryptography",
              },
              {
                name: "CISO Network",
                description: "Chief Information Security Officers sharing leadership insights",
                members: 950,
                posts: 180,
                icon: Users,
                color: "bg-green-500",
                category: "Leadership",
              },
              {
                name: "Incident Response Team",
                description: "Rapid response professionals and emergency coordinators",
                members: 1500,
                posts: 390,
                icon: BookOpen,
                color: "bg-orange-500",
                category: "Response",
              },
              {
                name: "Cloud Security Alliance",
                description: "Securing cloud infrastructure and services across platforms",
                members: 2100,
                posts: 520,
                icon: Globe,
                color: "bg-cyan-500",
                category: "Cloud",
              },
            ].map((group, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 ${group.color} rounded-lg flex items-center justify-center`}>
                    <group.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{group.name}</h3>
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">{group.category}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{group.description}</p>
                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {group.members.toLocaleString()} members
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {group.posts} posts
                  </span>
                </div>
                <button className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Join Group
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div
          className="mt-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl text-white p-8 text-center"
          data-aos="fade-up"
        >
          <h3 className="text-3xl font-bold mb-4">Join Our Growing Community</h3>
          <p className="text-red-100 mb-8 max-w-2xl mx-auto text-lg">
            Connect with cybersecurity professionals, share knowledge, and advance your career in a supportive community
            environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-8 py-4 bg-white text-red-600 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg">
              <UserPlus className="w-5 h-5 mr-2" />
              Join Community
            </button>
            <button className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-red-600 transition-colors font-medium text-lg">
              <MessageCircle className="w-5 h-5 mr-2" />
              Start Discussion
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Community
