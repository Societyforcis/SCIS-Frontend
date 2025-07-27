"use client"

import { useEffect } from "react"
import { AlertTriangle, Phone, Mail, Clock, Shield, MessageSquare, Headphones, Globe } from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"

export default function EmergencySupport() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    })
  }, [])

  const emergencyContacts = [
    { 
      type: 'Critical Incidents', 
      phone: '+1 (800) 555-CRIT', 
      email: 'critical@societycis.org',
      available: '24/7',
      description: 'Immediate response for active breaches and critical security incidents'
    },
    { 
      type: 'General Support', 
      phone: '+1 (800) 555-HELP', 
      email: 'support@societycis.org',
      available: 'Business Hours',
      description: 'Policy guidance, compliance questions, and general cybersecurity support'
    },
    { 
      type: 'Emergency Hotline', 
      phone: '+1 (800) 555-URGENT', 
      email: 'emergency@societycis.org',
      available: '24/7',
      description: 'Rapid response for ongoing cyber attacks and data breaches'
    }
  ]

  const severityLevels = [
    { 
      level: 'Critical', 
      color: 'red', 
      response: '< 15 minutes',
      description: 'Active data breach, system compromise, or ransomware attack',
      examples: ['Ransomware infection', 'Active data exfiltration', 'Complete system compromise']
    },
    { 
      level: 'High', 
      color: 'orange', 
      response: '< 1 hour',
      description: 'Suspicious activity detected, potential security breach',
      examples: ['Unusual network traffic', 'Suspicious user behavior', 'Failed authentication attempts']
    },
    { 
      level: 'Medium', 
      color: 'yellow', 
      response: '< 4 hours',
      description: 'Policy violations, minor security incidents',
      examples: ['Policy compliance issues', 'Minor security misconfigurations', 'User access violations']
    },
    { 
      level: 'Low', 
      color: 'blue', 
      response: '< 24 hours',
      description: 'General inquiries, consultation requests',
      examples: ['Policy questions', 'Training requests', 'General security advice']
    }
  ]

  const responseServices = [
    {
      icon: Shield,
      title: "Incident Response",
      description: "Immediate containment and mitigation of active security threats",
      features: ["Threat containment", "Evidence preservation", "System recovery", "Damage assessment"]
    },
    {
      icon: MessageSquare,
      title: "Expert Consultation",
      description: "24/7 access to cybersecurity experts for guidance and advice",
      features: ["Policy interpretation", "Compliance guidance", "Risk assessment", "Best practices"]
    },
    {
      icon: Headphones,
      title: "Technical Support",
      description: "Hands-on technical assistance for security tool implementation",
      features: ["Tool configuration", "System hardening", "Security monitoring", "Patch management"]
    },
    {
      icon: Globe,
      title: "Coordination Services",
      description: "Liaison with law enforcement, regulators, and third-party vendors",
      features: ["Legal coordination", "Regulatory reporting", "Vendor management", "Communication planning"]
    }
  ]

  const preparationSteps = [
    {
      step: 1,
      title: "Document the Incident",
      description: "Record timeline, affected systems, and initial observations"
    },
    {
      step: 2,
      title: "Preserve Evidence",
      description: "Take screenshots, save logs, and avoid altering affected systems"
    },
    {
      step: 3,
      title: "Contain the Threat",
      description: "Isolate affected systems if safe to do so, but don't power down"
    },
    {
      step: 4,
      title: "Contact Support",
      description: "Call our emergency line with incident details and your contact information"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 to-red-900 text-white py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1563986768609-322da13575f3')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-red-600/50 to-transparent" />
        <div className="container mx-auto px-6 relative">
          <div data-aos="fade-up">
            <div className="flex items-center gap-4 mb-6">
              <AlertTriangle className="w-12 h-12" />
              <h1 className="text-5xl font-serif leading-tight">Emergency Support Services</h1>
            </div>
            <p className="text-xl max-w-3xl leading-relaxed mb-8">
              24/7 emergency cybersecurity support for critical incidents, active threats, and urgent policy guidance.
            </p>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 inline-block">
              <p className="text-lg font-medium">Rapid response team available around the clock</p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16" data-aos="fade-up">
            Emergency Contact Information
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {emergencyContacts.map((contact, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{contact.type}</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="text-lg font-bold text-gray-900">{contact.phone}</p>
                      <p className="text-sm text-gray-500">Available {contact.available}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="text-gray-700">{contact.email}</p>
                      <p className="text-sm text-gray-500">Monitored {contact.available}</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{contact.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Response Times */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16" data-aos="fade-up">
            Response Time Commitments
          </h2>
          <div className="space-y-6">
            {severityLevels.map((level, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="grid md:grid-cols-4 gap-6 items-center">
                  <div className="flex items-center gap-4">
                    <div className={`w-4 h-4 rounded-full bg-${level.color}-500`}></div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{level.level}</h3>
                      <p className="text-sm text-gray-500">Response: {level.response}</p>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-gray-600 mb-2">{level.description}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Examples:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {level.examples.map((example, i) => (
                        <li key={i}>• {example}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Services */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16" data-aos="fade-up">
            Support Services Available
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {responseServices.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <service.icon className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {service.features.map((feature, i) => (
                    <div key={i} className="text-sm text-gray-600">
                      • {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preparation Guide */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <h2 className="text-4xl font-serif mb-8">Before You Call</h2>
              <p className="text-gray-600 mb-8">
                To help us provide the most effective assistance, follow these steps when you discover a security incident:
              </p>
              <div className="space-y-6">
                {preparationSteps.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div data-aos="fade-left">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                alt="Incident Response Team"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-6 text-center" data-aos="fade-up">
          <div className="flex items-center justify-center gap-4 mb-6">
            <AlertTriangle className="w-12 h-12" />
            <h2 className="text-3xl font-serif">Currently Under Attack?</h2>
          </div>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            If you're experiencing an active security incident, don't wait. Contact our emergency response team immediately.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Emergency Hotline</h3>
              <p className="text-2xl font-bold">+1 (800) 555-CRIT</p>
              <p className="text-sm opacity-90">24/7 Immediate Response</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Emergency Email</h3>
              <p className="text-lg">critical@societycis.org</p>
              <p className="text-sm opacity-90">Monitored continuously</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
