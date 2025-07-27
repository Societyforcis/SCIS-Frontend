"use client"

import { Clock, Users, Shield, Monitor, ArrowRight } from "lucide-react"
import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

export default function ScheduleDemo() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    })
  }, [])

  const demoTypes = [
    {
      title: "Platform Overview Demo",
      duration: "30 minutes",
      description: "Comprehensive overview of our cybersecurity intelligence platform and core features.",
      features: ["Dashboard walkthrough", "Key features overview", "Use case examples", "Q&A session"],
    },
    {
      title: "Technical Deep Dive",
      duration: "45 minutes",
      description: "In-depth technical demonstration focusing on integrations and advanced capabilities.",
      features: ["API integrations", "Custom configurations", "Advanced analytics", "Technical architecture"],
    },
    {
      title: "Custom Solution Demo",
      duration: "60 minutes",
      description: "Tailored demonstration based on your specific requirements and use cases.",
      features: ["Customized scenarios", "Industry-specific examples", "ROI analysis", "Implementation planning"],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-500 to-black text-white py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-red-500/50 to-transparent" />
        <div className="container mx-auto px-6 relative" data-aos="fade-up">
          <h1 className="text-5xl font-serif mb-6 leading-tight">Demo Information</h1>
          <p className="text-xl max-w-3xl leading-relaxed">
            Experience our AI-driven cybersecurity solutions through comprehensive demonstrations tailored to your needs.
          </p>
        </div>
      </section>

      {/* Demo Types */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16" data-aos="fade-up">
            Available Demonstrations
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {demoTypes.map((demo, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{demo.title}</h3>
                <div className="flex items-center gap-2 text-red-500 mb-4">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">{demo.duration}</span>
                </div>
                <p className="text-gray-600 mb-6">{demo.description}</p>
                <ul className="space-y-2">
                  {demo.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16" data-aos="fade-up">
            What You'll Learn
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center" data-aos="fade-up">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Security Features</h3>
              <p className="text-gray-600">Advanced threat detection and response capabilities</p>
            </div>
            <div className="text-center" data-aos="fade-up" data-aos-delay="100">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Monitor className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Dashboard Interface</h3>
              <p className="text-gray-600">Intuitive monitoring and management interface</p>
            </div>
            <div className="text-center" data-aos="fade-up" data-aos-delay="200">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Team Collaboration</h3>
              <p className="text-gray-600">Multi-user workflows and team coordination tools</p>
            </div>
            <div className="text-center" data-aos="fade-up" data-aos-delay="300">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Implementation</h3>
              <p className="text-gray-600">Deployment strategies and best practices</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Demo */}
      <section className="py-16 bg-gradient-to-br from-red-500 to-black text-white">
        <div className="container mx-auto px-6 text-center" data-aos="fade-up">
          <h2 className="text-3xl font-serif mb-6">Ready to See Our Platform in Action?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact our team to schedule a personalized demonstration.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div>
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p>demos@societycis.org</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Phone</h3>
              <p>+1 (888) 555-DEMO</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}