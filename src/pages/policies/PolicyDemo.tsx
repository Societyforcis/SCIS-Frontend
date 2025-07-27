"use client"

import { useEffect } from "react"
import { Clock, Users, Shield, Target, Monitor, Settings, CheckCircle } from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"

export default function PolicyDemo() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    })
  }, [])

  const demoTypes = [
    {
      id: 'policy-platform',
      title: 'Policy Management Platform',
      duration: '45 minutes',
      description: 'Comprehensive demonstration of our policy creation, management, and tracking platform.',
      features: ['Policy creation tools', 'Version control system', 'Approval workflows', 'Compliance tracking'],
      audience: 'Policy managers, compliance officers, IT administrators'
    },
    {
      id: 'assessment-tools',
      title: 'Policy Assessment Tools',
      duration: '30 minutes',
      description: 'Interactive demonstration of policy effectiveness assessment and gap analysis tools.',
      features: ['Risk assessment matrices', 'Gap analysis reports', 'Compliance mapping', 'Interactive dashboards'],
      audience: 'Risk managers, security analysts, auditors'
    },
    {
      id: 'implementation',
      title: 'Implementation Consulting',
      duration: '60 minutes',
      description: 'Personalized consultation on policy implementation strategies for your organization.',
      features: ['Custom policy review', 'Implementation roadmap', 'Best practices sharing', 'Training recommendations'],
      audience: 'CISOs, executives, project managers'
    }
  ]

  const demoFeatures = [
    {
      icon: Monitor,
      title: "Live Platform Demo",
      description: "See our policy management tools in action with real-time demonstrations"
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Get insights from cybersecurity policy experts with years of experience"
    },
    {
      icon: Settings,
      title: "Customized Content",
      description: "Demonstrations tailored to your organization's specific needs and challenges"
    },
    {
      icon: Target,
      title: "Actionable Insights",
      description: "Leave with concrete next steps and implementation strategies"
    }
  ]

  const preparation = [
    {
      step: "Identify Your Needs",
      description: "Determine what specific policy challenges you want to address"
    },
    {
      step: "Gather Your Team",
      description: "Include key stakeholders like IT, compliance, and security teams"
    },
    {
      step: "Prepare Questions",
      description: "List specific questions about implementation and integration"
    },
    {
      step: "Review Current State",
      description: "Assess your existing policy framework and identify gaps"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-600 to-purple-900 text-white py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-pink-600/50 to-transparent" />
        <div className="container mx-auto px-6 relative">
          <div data-aos="fade-up">
            <h1 className="text-5xl font-serif mb-6 leading-tight">Policy Demo Information</h1>
            <p className="text-xl max-w-3xl leading-relaxed mb-8">
              Experience our cybersecurity policy tools and get personalized guidance from our experts through comprehensive demonstrations.
            </p>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 inline-block">
              <p className="text-lg font-medium">Available demo formats: Live, virtual, and on-site presentations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Types */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16" data-aos="fade-up">
            Available Demo Types
          </h2>
          <div className="space-y-8">
            {demoTypes.map((demo, index) => (
              <div
                key={demo.id}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{demo.title}</h3>
                      <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {demo.duration}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-6">{demo.description}</p>
                    <div className="mb-4">
                      <h4 className="font-bold text-gray-900 mb-3">Demo Highlights:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {demo.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-bold text-gray-900 mb-4">Target Audience</h4>
                    <p className="text-gray-600 text-sm">{demo.audience}</p>
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-2">Format Options</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Live virtual presentation</li>
                        <li>• Interactive Q&A session</li>
                        <li>• Custom scenario walkthrough</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16" data-aos="fade-up">
            What to Expect
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {demoFeatures.map((feature, index) => (
              <div
                key={index}
                className="text-center"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preparation Guide */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <h2 className="text-4xl font-serif mb-8">How to Prepare for Your Demo</h2>
              <div className="space-y-6">
                {preparation.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.step}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div data-aos="fade-left">
              <img
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786"
                alt="Team Collaboration"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-pink-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif mb-8" data-aos="fade-up">
            Schedule Your Demo Today
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto" data-aos="fade-up">
            Ready to see our policy management tools in action? Contact our team to schedule a personalized demonstration that fits your organization's needs.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto" data-aos="fade-up">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 mb-2">demos@societycis.org</p>
              <p className="text-sm text-gray-500">Schedule within 48 hours</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600 mb-2">+1 (888) 555-DEMO</p>
              <p className="text-sm text-gray-500">Available Mon-Fri, 9 AM - 6 PM EST</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Online</h3>
              <p className="text-gray-600 mb-2">www.societycis.org/demo</p>
              <p className="text-sm text-gray-500">Self-service scheduling portal</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}