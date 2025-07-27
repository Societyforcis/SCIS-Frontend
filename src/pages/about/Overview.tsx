"use client"

import { ArrowRight, Download, Facebook, Linkedin, Twitter, Youtube } from "lucide-react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import AOS from "aos"
import "aos/dist/aos.css"

export default function CyberResearch() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    })
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-500 to-black text-white py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-red-500/50 to-transparent" />
        <div className="container mx-auto px-6 relative" data-aos="fade-up">
          <h1 className="text-6xl font-serif mb-8 leading-tight">Society for Cyber Intelligent System</h1>
          <p className="text-xl max-w-3xl mb-6 leading-relaxed">
            Leading the evolution of cybersecurity through artificial intelligence and intelligent systems, creating the next generation of adaptive security solutions.
          </p>
          <p className="text-xl font-medium bg-black/40 inline-block px-6 py-3 rounded-lg backdrop-blur-sm">
            Advancing cybersecurity through intelligent systems research
          </p>
        </div>
      </section>

      {/* Research & Innovation Hub Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
        <img
              src="https://images.unsplash.com/photo-1516321165247-4aa89a48be28"
              alt="AI Security Research"
              className="w-full h-full rounded-lg shadow-lg transform hover:scale-[1.02] transition-transform"
            />
          <div data-aos="fade-left">
            <h2 className="text-4xl font-serif mb-8 leading-tight">Research & Innovation Hub</h2>
            <p className="text-gray-600 mb-10 text-lg leading-relaxed">
              Our society leads groundbreaking research in AI-driven cybersecurity, developing intelligent systems that
              protect against emerging cyber threats while fostering academic collaboration.
            </p>
            <Link to="/research-papers" className="bg-red-500 text-white px-8 py-4 rounded-lg flex items-center gap-3 hover:bg-black transition-all hover:gap-4 shadow-lg w-fit">
              <Download className="w-5 h-5" />
              Access Research Papers
            </Link>
          </div>
        </div>
      </section>

      {/* Society Initiatives Section */}
      <section className="bg-gradient-to-b from-red-50 to-white py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16" data-aos="fade-up">
            Society Initiatives
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {/* Research Programs Card */}
            <div
              className="bg-white rounded-2xl overflow-hidden shadow-xl transform hover:-translate-y-2 transition-all"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="h-48 bg-gradient-to-br from-red-500 to-black">
                <div className="h-full flex items-center justify-center text-white p-8">
                  <h3 className="text-2xl font-bold text-center">Research Programs</h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Participate in cutting-edge research projects focusing on AI-driven security solutions and intelligent
                  system development.
                </p>
                <Link to="/research-programs" className="text-red-500 flex items-center gap-2 hover:gap-4 transition-all font-medium">
                  View Programs
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div
              className="bg-white rounded-2xl overflow-hidden shadow-xl transform hover:-translate-y-2 transition-all"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-8">
                <h3 className="text-2xl font-bold text-white text-center">Intelligence Exchange</h3>
              </div>
              <div className="p-8">
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Access our secure platform for sharing threat indicators, vulnerability reports, and coordinated
                  response strategies with trusted community members.
                </p>
                <Link to="/intelligence-exchange" className="text-gray-900 flex items-center gap-2 hover:gap-4 transition-all font-medium">
                  Learn more
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Advanced Analytics Card */}
            <div
              className="bg-white rounded-2xl overflow-hidden shadow-xl transform hover:-translate-y-2 transition-all"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="h-48 bg-gray-900">
                <img
                  src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f"
                  alt="Advanced Analytics Dashboard"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-4">Advanced Analytics</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Leverage our AI-powered analytics tools to identify patterns, predict threats, and enhance your
                  organization's security posture.
                </p>
                <Link to="/advanced-analytics" className="text-gray-900 flex items-center gap-2 hover:gap-4 transition-all font-medium">
                  Explore analytics
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-gradient-to-br from-red-500 to-black text-white py-24">
        <div className="container mx-auto px-6" data-aos="fade-up">
          <blockquote className="text-3xl text-center max-w-4xl mx-auto leading-relaxed italic">
            "Our society represents the confluence of artificial intelligence and cybersecurity, working to build a
            safer digital future through innovative research and collaboration."
            <footer className="mt-6 text-xl not-italic">- Dr. James Wilson, Society President</footer>
          </blockquote>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gradient-to-b from-red-50 to-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978"
              alt="Intelligence Team Collaboration"
              className="rounded-2xl shadow-2xl"
              data-aos="fade-right"
            />
            <div data-aos="fade-left">
              <h2 className="text-4xl font-serif mb-8">Join Our Network</h2>
              <p className="text-gray-600 mb-4 text-lg">Ready to enhance your cyber intelligence capabilities?</p>
              <p className="text-gray-600 mb-10 text-lg">
                Contact us at info@societycis.org or call +1 (888) 555-0123
              </p>
              <div className="flex gap-6">
                <Link to="/request-access" className="bg-red-500 text-white px-8 py-4 rounded-lg hover:bg-red-600 transition-colors shadow-lg">
                  Request Access
                </Link>
                <Link to="/schedule-demo" className="border-2 border-red-500 text-red-500 px-8 py-4 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
                  Schedule Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
    
    </div>
  )
}

