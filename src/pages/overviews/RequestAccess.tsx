"use client"

import { useEffect } from "react"
import { CheckCircle, Mail, Phone, Globe, Users, Award, Building } from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"

export default function RequestAccess() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    })
  }, [])

  const membershipTiers = [
    {
      tier: "Academic",
      price: "Free",
      description: "Perfect for students, faculty, and researchers",
      benefits: [
        "Access to research papers and publications",
        "Academic conference invitations",
        "Student discount programs",
        "Research collaboration opportunities",
        "Educational webinars and workshops",
        "Community forum participation"
      ],
      idealFor: "Students, Faculty, Academic Researchers",
      features: {
        papers: "Full Access",
        conferences: "Academic Only",
        networking: "Academic Community",
        support: "Email Support"
      }
    },
    {
      tier: "Professional", 
      price: "$99/year",
      description: "Designed for cybersecurity professionals",
      benefits: [
        "Professional networking opportunities",
        "Industry reports and whitepapers",
        "Certification and training programs",
        "Expert-led webinars and masterclasses",
        "Priority support and consultation",
        "Advanced threat intelligence feeds"
      ],
      idealFor: "Security Analysts, Consultants, IT Professionals",
      features: {
        papers: "Full Access",
        conferences: "Professional Events",
        networking: "Professional Network",
        support: "Priority Support"
      }
    },
    {
      tier: "Enterprise",
      price: "Custom Pricing",
      description: "Comprehensive solutions for organizations",
      benefits: [
        "Team memberships and bulk licensing",
        "Custom training and workshop programs",
        "Dedicated account management",
        "Enterprise-grade security solutions",
        "API access and integrations",
        "24/7 priority support and consultation"
      ],
      idealFor: "Corporations, Government Agencies, Large Organizations",
      features: {
        papers: "Full Access + Early Access",
        conferences: "All Events + VIP Access",
        networking: "Executive Network",
        support: "24/7 Dedicated Support"
      }
    }
  ]

  const memberBenefits = [
    {
      icon: Users,
      title: "Global Community",
      description: "Connect with 5,000+ cybersecurity professionals worldwide"
    },
    {
      icon: Award,
      title: "Recognition Programs",
      description: "Awards and recognition for contributions to the field"
    },
    {
      icon: Building,
      title: "Industry Partnerships",
      description: "Access to exclusive partnerships with leading organizations"
    }
  ]

  const applicationProcess = [
    {
      step: 1,
      title: "Choose Membership",
      description: "Select the membership tier that best fits your needs and professional goals."
    },
    {
      step: 2,
      title: "Submit Application",
      description: "Complete the membership application with your professional background and interests."
    },
    {
      step: 3,
      title: "Review Process",
      description: "Our team reviews your application and verifies your professional credentials."
    },
    {
      step: 4,
      title: "Welcome Aboard",
      description: "Receive your membership confirmation and access to all benefits and resources."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-500 to-black text-white py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-red-500/50 to-transparent" />
        <div className="container mx-auto px-6 relative" data-aos="fade-up">
          <h1 className="text-5xl font-serif mb-6 leading-tight">Membership Information</h1>
          <p className="text-xl max-w-3xl leading-relaxed mb-8">
            Join our global community of cybersecurity professionals, researchers, and innovators working to secure the digital future.
          </p>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 inline-block">
            <p className="text-lg font-medium">5,000+ members across 50+ countries</p>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16" data-aos="fade-up">
            Membership Tiers
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {membershipTiers.map((membership, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow ${
                  index === 1 ? 'bg-red-50 border-2 border-red-200 scale-105' : 'bg-white'
                }`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{membership.tier}</h3>
                  <div className="text-3xl font-bold text-red-500 mb-2">{membership.price}</div>
                  <p className="text-gray-600">{membership.description}</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3">Key Benefits:</h4>
                  <ul className="space-y-2">
                    {membership.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Ideal For:</h4>
                  <p className="text-sm text-gray-600">{membership.idealFor}</p>
                </div>

                <div className="space-y-2">
                  {Object.entries(membership.features).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="font-medium text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16" data-aos="fade-up">
            Additional Member Benefits
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {memberBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16" data-aos="fade-up">
            Application Process
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {applicationProcess.map((process, index) => (
              <div
                key={index}
                className="text-center"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {process.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{process.title}</h3>
                <p className="text-gray-600 text-sm">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16" data-aos="fade-up">
            Contact Our Membership Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center" data-aos="fade-up">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">membership@societycis.org</p>
              <p className="text-sm text-gray-500 mt-1">Response within 24 hours</p>
            </div>
            <div className="text-center" data-aos="fade-up" data-aos-delay="100">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">+1 (888) 555-0123</p>
              <p className="text-sm text-gray-500 mt-1">Business hours: 9 AM - 6 PM EST</p>
            </div>
            <div className="text-center" data-aos="fade-up" data-aos-delay="200">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Website</h3>
              <p className="text-gray-600">www.societycis.org</p>
              <p className="text-sm text-gray-500 mt-1">Online application portal</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}