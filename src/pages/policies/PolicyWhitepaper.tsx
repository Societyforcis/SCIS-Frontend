"use client"

import { useEffect } from "react"
import { Download, FileText, CheckCircle, Shield, Lock, Users, Target } from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"

export default function PolicyWhitepaper() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    })
  }, [])

  const whitepaperFeatures = [
    "Comprehensive cybersecurity policy framework",
    "Best practices for policy implementation", 
    "Compliance mapping for major regulations",
    "Risk assessment methodologies",
    "Employee training guidelines",
    "Incident response procedures",
    "Policy template library",
    "Real-world case studies and examples"
  ]

  const chapters = [
    {
      number: 1,
      title: "Introduction to Cybersecurity Policies",
      description: "Understanding the importance and scope of cybersecurity policies in modern organizations"
    },
    {
      number: 2,
      title: "Risk Assessment Framework", 
      description: "Comprehensive methodologies for identifying and evaluating cybersecurity risks"
    },
    {
      number: 3,
      title: "Policy Development Process",
      description: "Step-by-step guide to creating effective cybersecurity policies"
    },
    {
      number: 4,
      title: "Implementation Strategies",
      description: "Practical approaches to deploying policies across your organization"
    },
    {
      number: 5,
      title: "Compliance Requirements",
      description: "Mapping policies to regulatory frameworks like GDPR, HIPAA, SOX"
    },
    {
      number: 6,
      title: "Monitoring and Evaluation",
      description: "Techniques for measuring policy effectiveness and continuous improvement"
    },
    {
      number: 7,
      title: "Case Studies and Examples",
      description: "Real-world implementations and lessons learned from various industries"
    },
    {
      number: 8,
      title: "Templates and Checklists",
      description: "Ready-to-use policy templates and implementation checklists"
    }
  ]

  const benefits = [
    {
      icon: Shield,
      title: "Enhanced Security Posture",
      description: "Strengthen your organization's defenses with proven policy frameworks"
    },
    {
      icon: Lock,
      title: "Regulatory Compliance",
      description: "Ensure compliance with industry standards and government regulations"
    },
    {
      icon: Users,
      title: "Employee Awareness",
      description: "Improve security culture through comprehensive training programs"
    },
    {
      icon: Target,
      title: "Risk Mitigation",
      description: "Reduce security incidents through proactive policy implementation"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-600 to-purple-900 text-white py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-pink-600/50 to-transparent" />
        <div className="container mx-auto px-6 relative">
          <div data-aos="fade-up">
            <div className="flex items-center gap-4 mb-6">
              <FileText className="w-12 h-12" />
              <h1 className="text-5xl font-serif leading-tight">Cybersecurity Policy Whitepaper</h1>
            </div>
            <p className="text-xl max-w-3xl leading-relaxed mb-8">
              Comprehensive guide to building effective cybersecurity policies that protect your organization 
              and ensure regulatory compliance.
            </p>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 inline-block">
              <p className="text-lg font-medium">88 pages of expert insights and practical guidance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Whitepaper Overview */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div data-aos="fade-right">
              <h2 className="text-4xl font-serif mb-8">What's Inside</h2>
              <div className="space-y-4">
                {whitepaperFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-pink-50 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Authors</h3>
                <p className="text-gray-600">Written by leading cybersecurity professionals with over 50 years of combined experience in policy development and implementation.</p>
              </div>
            </div>
            <div data-aos="fade-left">
              <div className="bg-gray-100 rounded-2xl p-8 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c"
                  alt="Whitepaper Preview"
                  className="w-full rounded-lg mb-6"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-4">Document Statistics</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-2xl font-bold text-pink-600">88</div>
                    <div className="text-sm text-gray-600">Pages</div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-2xl font-bold text-pink-600">25+</div>
                    <div className="text-sm text-gray-600">Templates</div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-2xl font-bold text-pink-600">15</div>
                    <div className="text-sm text-gray-600">Case Studies</div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-2xl font-bold text-pink-600">50+</div>
                    <div className="text-sm text-gray-600">Checklists</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter Breakdown */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16" data-aos="fade-up">
            Chapter Breakdown
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {chapters.map((chapter, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold">
                    {chapter.number}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{chapter.title}</h3>
                    <p className="text-gray-600 text-sm">{chapter.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16" data-aos="fade-up">
            Why Download This Whitepaper
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif mb-8" data-aos="fade-up">
            Access the Complete Whitepaper
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto" data-aos="fade-up">
            Contact our policy experts to receive your copy of the complete cybersecurity policy whitepaper and additional resources.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto" data-aos="fade-up">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 mb-2">policies@societycis.org</p>
              <p className="text-sm text-gray-500">Response within 24 hours</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600 mb-2">+1 (888) 555-POLICY</p>
              <p className="text-sm text-gray-500">Business hours: 9 AM - 6 PM EST</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Online</h3>
              <p className="text-gray-600 mb-2">www.societycis.org/policies</p>
              <p className="text-sm text-gray-500">Download portal available 24/7</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
