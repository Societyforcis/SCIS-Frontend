"use client"

import type React from "react"
import { useState } from "react"
import {
  Shield,
  BookOpen,
  Users,
  Award,
  Globe,
  CheckCircle,
  Gift,
  TrendingUp,
  Calendar,
  FileText,
  Briefcase,
  ChevronRight,
  Crown,
  Gem,
} from "lucide-react"
import { Link } from "react-router-dom"

interface Benefit {
  icon: React.ElementType
  title: string
  description: string
  features: string[]
  color: string
  premium?: boolean
}

interface MembershipTier {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  color: string
  popular?: boolean
  icon: React.ElementType
}

const Benefits: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"benefits" | "tiers" | "partners">("benefits")

  const memberBenefits: Benefit[] = [
    {
      icon: BookOpen,
      title: "Exclusive Educational Content",
      description: "Access premium courses, research papers, and educational materials",
      features: [
        "50+ Professional Development Courses",
        "Latest Research Publications",
        "Interactive Learning Modules",
        "Certification Programs",
        "Expert-Led Workshops",
      ],
      color: "bg-blue-500",
      premium: true,
    },
    {
      icon: Users,
      title: "Professional Network",
      description: "Connect with industry leaders and cybersecurity professionals worldwide",
      features: [
        "Global Community Access",
        "Mentorship Programs",
        "Industry Expert Connections",
        "Regional Chapter Events",
        "Professional Referrals",
      ],
      color: "bg-green-500",
    },
    {
      icon: Calendar,
      title: "Exclusive Events & Webinars",
      description: "Priority access to conferences, seminars, and networking events",
      features: [
        "Free Conference Tickets",
        "VIP Event Access",
        "Live Q&A Sessions",
        "Recording Library Access",
        "Early Bird Registration",
      ],
      color: "bg-purple-500",
      premium: true,
    },
    {
      icon: Award,
      title: "Professional Recognition",
      description: "Industry-recognized certifications and achievement badges",
      features: [
        "Digital Certificates",
        "Professional Badges",
        "LinkedIn Integration",
        "Achievement Portfolio",
        "Industry Recognition",
      ],
      color: "bg-orange-500",
    },
    {
      icon: FileText,
      title: "Research & Publications",
      description: "Access to cutting-edge research and publication opportunities",
      features: [
        "Research Paper Access",
        "Publication Opportunities",
        "Peer Review Process",
        "Citation Database",
        "Research Collaboration",
      ],
      color: "bg-red-500",
      premium: true,
    },
    {
      icon: Briefcase,
      title: "Career Development",
      description: "Tools and resources to advance your cybersecurity career",
      features: [
        "Job Board Access",
        "Career Counseling",
        "Resume Review Service",
        "Interview Preparation",
        "Salary Benchmarking",
      ],
      color: "bg-indigo-500",
    },
    {
      icon: Shield,
      title: "Technical Resources",
      description: "Advanced tools, frameworks, and technical documentation",
      features: [
        "Security Tool Access",
        "Framework Templates",
        "Code Repositories",
        "Technical Whitepapers",
        "Best Practice Guides",
      ],
      color: "bg-cyan-500",
      premium: true,
    },
    {
      icon: Globe,
      title: "Global Partnerships",
      description: "Exclusive discounts and partnerships with leading tech companies",
      features: [
        "Software Discounts (up to 50%)",
        "Training Vouchers",
        "Conference Discounts",
        "Certification Vouchers",
        "Partner Product Access",
      ],
      color: "bg-pink-500",
    },
  ]

  const membershipTiers: MembershipTier[] = [
    {
      name: "Student",
      price: "Free",
      period: "",
      description: "Perfect for students and early-career professionals",
      features: [
        "Basic community access",
        "Monthly webinars",
        "Educational resources",
        "Student networking events",
        "Career guidance",
      ],
      color: "border-gray-300",
      icon: BookOpen,
    },
    {
      name: "Professional",
      price: "$99",
      period: "/year",
      description: "Ideal for working cybersecurity professionals",
      features: [
        "All Student benefits",
        "Premium course access",
        "Industry certifications",
        "Professional networking",
        "Job board access",
        "Research publications",
        "Conference discounts",
      ],
      color: "border-blue-500",
      popular: true,
      icon: Shield,
    },
    {
      name: "Enterprise",
      price: "$299",
      period: "/year",
      description: "Comprehensive benefits for senior professionals and leaders",
      features: [
        "All Professional benefits",
        "Executive networking",
        "Speaking opportunities",
        "Research collaboration",
        "Priority support",
        "Custom training programs",
        "Partnership opportunities",
        "Advisory board access",
      ],
      color: "border-purple-500",
      icon: Crown,
    },
  ]

  const partners = [
    {
      name: "Microsoft",
      logo: "https://img.icons8.com/color/96/microsoft.png",
      discount: "30% off Azure Security Services",
      category: "Cloud Security",
    },
    {
      name: "AWS",
      logo: "https://img.icons8.com/color/96/amazon-web-services.png",
      discount: "25% off Security Training",
      category: "Cloud Platform",
    },
    {
      name: "Cisco",
      logo: "https://img.icons8.com/color/96/cisco.png",
      discount: "40% off Certification Programs",
      category: "Network Security",
    },
    {
      name: "IBM",
      logo: "https://img.icons8.com/color/96/ibm.png",
      discount: "35% off Security Intelligence",
      category: "AI Security",
    },
    {
      name: "Google Cloud",
      logo: "https://img.icons8.com/color/96/google-cloud.png",
      discount: "20% off Security Tools",
      category: "Cloud Security",
    },
    {
      name: "Palo Alto Networks",
      logo: "https://img.icons8.com/color/96/security-checked.png",
      discount: "50% off Training Courses",
      category: "Cybersecurity",
    },
  ]

  const stats = [
    { label: "Active Members", value: "2,500+", icon: Users },
    { label: "Partner Discounts", value: "50+", icon: Gift },
    { label: "Courses Available", value: "100+", icon: BookOpen },
    { label: "Annual Savings", value: "$5,000+", icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Membership Benefits</h1>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              Unlock exclusive opportunities, resources, and connections in the cybersecurity community
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
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
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-xl p-1 shadow-sm">
            <div className="flex space-x-1">
              {[
                { id: "benefits", label: "Member Benefits", icon: Gift },
                { id: "tiers", label: "Membership Tiers", icon: Crown },
                { id: "partners", label: "Partner Discounts", icon: Gem },
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

        {/* Benefits Tab */}
        {activeTab === "benefits" && (
          <div className="grid lg:grid-cols-2 gap-8">
            {memberBenefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-12 h-12 ${benefit.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{benefit.title}</h3>
                      {benefit.premium && (
                        <span className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-medium rounded-full">
                          Premium
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">{benefit.description}</p>
                    <ul className="space-y-2">
                      {benefit.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Membership Tiers Tab */}
        {activeTab === "tiers" && (
          <div className="grid lg:grid-cols-3 gap-8">
            {membershipTiers.map((tier, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-sm border-2 ${tier.color} p-6 relative ${
                  tier.popular ? "transform scale-105" : ""
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <tier.icon className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {tier.price}
                    <span className="text-lg font-normal text-gray-600">{tier.period}</span>
                  </div>
                  <p className="text-gray-600">{tier.description}</p>
                </div>
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    tier.popular
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  {tier.price === "Free" ? "Get Started" : "Choose Plan"}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Partners Tab */}
        {activeTab === "partners" && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Partner Discounts</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Save thousands of dollars annually with exclusive discounts from our industry partners
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((partner, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      className="w-12 h-12 object-contain"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900">{partner.name}</h3>
                      <span className="text-sm text-gray-600">{partner.category}</span>
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-green-800 font-medium">{partner.discount}</span>
                      <Gift className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl text-white p-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h3>
          <p className="text-red-100 mb-8 max-w-2xl mx-auto text-lg">
            Start your journey with the Society for Cyber Intelligent Systems and unlock exclusive benefits, networking
            opportunities, and professional growth resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/membership-form"
              className="inline-flex items-center px-8 py-4 bg-white text-red-600 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg"
            >
              Start Free Membership
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/benefits"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-red-600 transition-colors font-medium text-lg"
            >
              Compare Plans
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Benefits
