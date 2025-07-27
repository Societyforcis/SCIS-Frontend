"use client"

import { useEffect } from "react"
import { Shield, Users, Database, AlertTriangle, TrendingUp, Lock, Globe, Network, Eye, Brain } from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"

export default function IntelligenceExchange() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    })
  }, [])

  const platformFeatures = [
    {
      icon: Shield,
      title: "Secure Threat Sharing",
      description: "Share and receive threat intelligence through our encrypted platform with verified community members.",
      details: "End-to-end encrypted threat indicators, IOCs, and vulnerability data"
    },
    {
      icon: Database,
      title: "Comprehensive Database",
      description: "Access extensive vulnerability data with real-time updates and detailed remediation guidance.",
      details: "Over 500,000 threat indicators updated in real-time"
    },
    {
      icon: AlertTriangle,
      title: "Incident Coordination",
      description: "Coordinate incident response efforts with trusted partners and access expert guidance.",
      details: "24/7 incident response coordination with 200+ security teams"
    },
    {
      icon: TrendingUp,
      title: "Advanced Analytics",
      description: "Leverage advanced analytics to identify emerging threats and attack patterns.",
      details: "AI-powered threat analysis and predictive intelligence"
    }
  ]

  const threatCategories = [
    { name: "Malware Signatures", count: "125,000+", updated: "Real-time" },
    { name: "IP Reputation", count: "50M+", updated: "Hourly" },
    { name: "Domain Intelligence", count: "10M+", updated: "Daily" },
    { name: "File Hashes", count: "75M+", updated: "Real-time" },
    { name: "Attack Patterns", count: "25,000+", updated: "Weekly" },
    { name: "Vulnerability Data", count: "200,000+", updated: "Daily" }
  ]

  const communityStats = [
    { metric: "5,000+", label: "Active Members" },
    { metric: "200+", label: "Organizations" },
    { metric: "50+", label: "Countries" },
    { metric: "99.9%", label: "Uptime" }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-500 to-black text-white py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-red-500/50 to-transparent" />
        <div className="container mx-auto px-6 relative" data-aos="fade-up">
          <h1 className="text-5xl font-serif mb-6 leading-tight">Intelligence Exchange Platform</h1>
          <p className="text-xl max-w-3xl leading-relaxed mb-8">
            The world's leading platform for secure threat intelligence sharing among cybersecurity professionals, researchers, and organizations.
          </p>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 inline-block">
            <p className="text-lg font-medium">Trusted by 5,000+ security professionals worldwide</p>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6" data-aos="fade-up">
            {communityStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">{stat.metric}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16" data-aos="fade-up">
            Platform Capabilities
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {platformFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 mb-3">{feature.description}</p>
                    <p className="text-sm text-gray-500">{feature.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Threat Intelligence Database */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16" data-aos="fade-up">
            Threat Intelligence Database
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {threatCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h3 className="font-bold text-gray-900 mb-2">{category.name}</h3>
                <div className="text-2xl font-bold text-red-500 mb-1">{category.count}</div>
                <p className="text-sm text-gray-600">Updated {category.updated}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Privacy */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <h2 className="text-4xl font-serif mb-6">Enterprise-Grade Security</h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Our platform employs military-grade encryption, multi-factor authentication, and zero-trust architecture 
                to ensure your sensitive threat intelligence remains secure and protected.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lock className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">End-to-End Encryption</h3>
                    <p className="text-gray-600 text-sm">AES-256 encryption for all data in transit and at rest</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Multi-Factor Authentication</h3>
                    <p className="text-gray-600 text-sm">Advanced authentication with biometric support</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Eye className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Privacy Controls</h3>
                    <p className="text-gray-600 text-sm">Granular sharing controls and data sovereignty</p>
                  </div>
                </div>
              </div>
            </div>
            <div data-aos="fade-left">
              <img
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3"
                alt="Security Dashboard"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Global Network */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-4xl font-serif mb-6">Global Intelligence Network</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with security professionals and organizations from around the world to share threat intelligence 
              and collaborate on cybersecurity initiatives.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center" data-aos="fade-up">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Global Reach</h3>
              <p className="text-gray-600">Intelligence sharing across 50+ countries worldwide</p>
            </div>
            <div className="text-center" data-aos="fade-up" data-aos-delay="100">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Network className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Trusted Network</h3>
              <p className="text-gray-600">Verified members from leading security organizations</p>
            </div>
            <div className="text-center" data-aos="fade-up" data-aos-delay="200">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">AI-Enhanced</h3>
              <p className="text-gray-600">Machine learning algorithms for threat correlation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-red-500 to-black text-white">
        <div className="container mx-auto px-6 text-center" data-aos="fade-up">
          <h2 className="text-3xl font-serif mb-6">Join the Global Security Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Be part of the world's most trusted cybersecurity intelligence sharing platform.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Contact Information</h3>
              <p>intelligence@societycis.org</p>
              <p>+1 (888) 555-INTEL</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
