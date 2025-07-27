"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Mail,
  Send,
  CheckCircle,
  Calendar,
  Users,
  Bell,
  Download,
  Eye,
  Share2,
  ArrowRight,
  BookOpen,
  Globe,
  Star,
  Clock,
  Filter,
  Search,
} from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"

interface Newsletter {
  id: string
  title: string
  description: string
  date: string
  category: string
  readTime: string
  subscribers: number
  opens: number
  image: string
  featured: boolean
  tags: string[]
}

interface Subscription {
  email: string
  preferences: string[]
  frequency: string
}

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [subscription, setSubscription] = useState<Subscription>({
    email: "",
    preferences: [],
    frequency: "weekly",
  })

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    })
  }, [])

  const newsletters: Newsletter[] = [
    {
      id: "1",
      title: "Cyber Intelligence Weekly: AI-Powered Threat Detection Breakthrough",
      description:
        "Discover the latest advancements in AI-driven cybersecurity, including new machine learning models that can predict and prevent zero-day attacks with 95% accuracy.",
      date: "March 15, 2024",
      category: "AI Security",
      readTime: "8 min read",
      subscribers: 12500,
      opens: 8750,
      image:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      featured: true,
      tags: ["AI", "Machine Learning", "Threat Detection", "Zero-Day"],
    },
    {
      id: "2",
      title: "Monthly Security Digest: Quantum Computing and Cryptography",
      description:
        "Exploring the implications of quantum computing on current encryption methods and how organizations can prepare for the post-quantum cryptography era.",
      date: "March 10, 2024",
      category: "Cryptography",
      readTime: "12 min read",
      subscribers: 9800,
      opens: 7350,
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      featured: false,
      tags: ["Quantum Computing", "Cryptography", "Post-Quantum", "Encryption"],
    },
    {
      id: "3",
      title: "Industry Insights: Zero Trust Architecture Implementation Guide",
      description:
        "A comprehensive guide to implementing Zero Trust Architecture in enterprise environments, featuring real-world case studies and best practices.",
      date: "March 5, 2024",
      category: "Network Security",
      readTime: "15 min read",
      subscribers: 11200,
      opens: 8960,
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      featured: true,
      tags: ["Zero Trust", "Network Security", "Enterprise", "Implementation"],
    },
    {
      id: "4",
      title: "Research Spotlight: IoT Security in Industrial Environments",
      description:
        "Latest research findings on securing Internet of Things devices in industrial settings, including new protocols and security frameworks.",
      date: "February 28, 2024",
      category: "IoT Security",
      readTime: "10 min read",
      subscribers: 8900,
      opens: 6230,
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      featured: false,
      tags: ["IoT", "Industrial Security", "Protocols", "Research"],
    },
    {
      id: "5",
      title: "Executive Brief: Cybersecurity Investment Trends 2024",
      description:
        "Analysis of cybersecurity investment patterns, emerging technologies, and strategic recommendations for security leaders and executives.",
      date: "February 20, 2024",
      category: "Leadership",
      readTime: "6 min read",
      subscribers: 15600,
      opens: 12480,
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      featured: false,
      tags: ["Investment", "Leadership", "Strategy", "Trends"],
    },
    {
      id: "6",
      title: "Technical Deep Dive: Advanced Persistent Threat Analysis",
      description:
        "In-depth analysis of recent APT campaigns, including attack vectors, indicators of compromise, and defensive strategies.",
      date: "February 15, 2024",
      category: "Threat Intelligence",
      readTime: "20 min read",
      subscribers: 7800,
      opens: 5850,
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      featured: true,
      tags: ["APT", "Threat Intelligence", "Analysis", "Defense"],
    },
  ]

  const categories = [
    "all",
    "AI Security",
    "Cryptography",
    "Network Security",
    "IoT Security",
    "Leadership",
    "Threat Intelligence",
  ]

  const preferences = [
    "Weekly Security Updates",
    "Research Publications",
    "Industry News",
    "Event Announcements",
    "Technical Deep Dives",
    "Executive Briefings",
  ]

  const filteredNewsletters = newsletters.filter((newsletter) => {
    const matchesCategory = selectedCategory === "all" || newsletter.category === selectedCategory
    const matchesSearch =
      newsletter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      newsletter.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 5000)
    }
  }

  const handlePreferenceChange = (preference: string) => {
    setSubscription((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter((p) => p !== preference)
        : [...prev.preferences, preference],
    }))
  }

  const stats = [
    { label: "Active Subscribers", value: "25,000+", icon: Users, color: "text-blue-600" },
    { label: "Average Open Rate", value: "68%", icon: Eye, color: "text-green-600" },
    { label: "Monthly Newsletters", value: "12+", icon: Calendar, color: "text-purple-600" },
    { label: "Satisfaction Rate", value: "94%", icon: Star, color: "text-yellow-600" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center" data-aos="fade-up">
            <h1 className="text-5xl font-bold mb-6">Cyber Intelligence Newsletter</h1>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              Stay ahead of emerging threats with expert insights, research findings, and industry analysis delivered
              directly to your inbox
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
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
        {/* Subscription Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12" data-aos="fade-up">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-gray-600 mb-6">
                Join thousands of cybersecurity professionals who rely on our newsletter for the latest insights,
                research, and industry trends.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="flex gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Subscribe
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <select
                    value={subscription.frequency}
                    onChange={(e) => setSubscription((prev) => ({ ...prev, frequency: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                  <span className="text-sm text-gray-600">delivery frequency</span>
                </div>
              </form>
              {isSubscribed && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-800">Successfully subscribed! Check your email for confirmation.</span>
                </div>
              )}
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Customize Your Preferences</h3>
              <div className="space-y-3">
                {preferences.map((preference, index) => (
                  <label key={index} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subscription.preferences.includes(preference)}
                      onChange={() => handlePreferenceChange(preference)}
                      className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                    />
                    <span className="text-gray-700">{preference}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8" data-aos="fade-up">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search newsletters..."
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
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Featured Newsletter */}
        {filteredNewsletters.find((n) => n.featured) && (
          <div className="mb-12" data-aos="fade-up">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Newsletter</h2>
            {filteredNewsletters
              .filter((newsletter) => newsletter.featured)
              .slice(0, 1)
              .map((newsletter) => (
                <div key={newsletter.id} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="relative h-64 lg:h-auto">
                      <img
                        src={newsletter.image || "/placeholder.svg"}
                        alt={newsletter.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {newsletter.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {newsletter.readTime}
                        </span>
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">
                          {newsletter.category}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{newsletter.title}</h3>
                      <p className="text-gray-600 mb-6">{newsletter.description}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {newsletter.tags.map((tag, index) => (
                          <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {newsletter.subscribers.toLocaleString()} subscribers
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {newsletter.opens.toLocaleString()} opens
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                            <BookOpen className="w-4 h-4" />
                            Read Full Newsletter
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Newsletter Archive */}
        <div data-aos="fade-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Newsletter Archive</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredNewsletters
              .filter((newsletter) => !newsletter.featured)
              .map((newsletter, index) => (
                <div
                  key={newsletter.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="relative h-48">
                    <img
                      src={newsletter.image || "/placeholder.svg"}
                      alt={newsletter.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                        {newsletter.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {newsletter.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {newsletter.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-red-600 transition-colors">
                      {newsletter.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{newsletter.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {newsletter.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span key={tagIndex} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {newsletter.subscribers.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {newsletter.opens.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors font-medium">
                          Read More
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {filteredNewsletters.length === 0 && (
          <div className="text-center py-12" data-aos="fade-up">
            <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No newsletters found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}

        {/* Call to Action */}
        <div
          className="mt-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl text-white p-8 text-center"
          data-aos="fade-up"
        >
          <h3 className="text-3xl font-bold mb-4">Never Miss an Update</h3>
          <p className="text-red-100 mb-8 max-w-2xl mx-auto text-lg">
            Stay informed about the latest cybersecurity trends, research findings, and industry insights with our
            comprehensive newsletter series.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-8 py-4 bg-white text-red-600 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg">
              <Bell className="w-5 h-5 mr-2" />
              Subscribe Now
            </button>
            <button className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-red-600 transition-colors font-medium text-lg">
              <Globe className="w-5 h-5 mr-2" />
              View All Archives
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Newsletter
