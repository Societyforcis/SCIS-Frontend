"use client"

import { useState, useEffect } from "react"
import type React from "react"

export default function EmailSubscribe() {
  const [currentTime, setCurrentTime] = useState<string>('')
  const [location, setLocation] = useState<string>('Loading location...')
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    interests: [] as string[],
    frequency: "weekly"
  })

  const [submitStatus, setSubmitStatus] = useState<{
    loading: boolean;
    message: string;
    error: boolean;
  }>({
    loading: false,
    message: "",
    error: false
  });

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now.toISOString().replace('T', ' ').slice(0, 19))
    }, 1000)

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
            )
            const data = await response.json()
            setLocation(`${data.city}, ${data.countryName}`)
          } catch (error) {
            setLocation('Location unavailable')
          }
        },
        () => {
          setLocation('Location access denied')
        }
      )
    } else {
      setLocation('Geolocation not supported')
    }

    return () => clearInterval(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, message: "", error: false });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          loading: false,
          message: "🎉 Successfully subscribed! Please check your email for confirmation.",
          error: false
        });
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          interests: [],
          frequency: "weekly"
        });
      } else {
        // Handle specific error cases
        const errorMessage = data.message || 'Subscription failed';
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      setSubmitStatus({
        loading: false,
        message: error.message || "Failed to subscribe. Please try again.",
        error: true
      });
    }
  };

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-red-500/90 backdrop-blur-sm text-white px-4 py-2 text-xs md:text-sm text-center" data-aos="fade-down">
        <p>Current UTC Time: {currentTime} | Location: {location}</p>
      </div>

      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Stay Ahead of the Curve
          </h1>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Join our community of forward-thinking professionals and get exclusive insights delivered straight to your inbox.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="w-full lg:w-1/2 space-y-12">
            <div className="space-y-8" data-aos="fade-right">
              <h2 className="text-3xl font-bold text-gray-900">Why Subscribe?</h2>

              <div className="grid gap-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-red-100 rounded-full p-3">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Curated Content Delivery</h3>
                    <p className="text-gray-600">Receive carefully selected articles, research papers, and industry insights every week.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-red-100 rounded-full p-3">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Early Access Benefits</h3>
                    <p className="text-gray-600">Get priority access to webinars, events, and exclusive member-only content.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-red-100 rounded-full p-3">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Personalized Experience</h3>
                    <p className="text-gray-600">Content tailored to your interests and professional needs.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 transform hover:shadow-lg transition-all duration-300" data-aos="fade-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Featured Content</h2>
              <div className="space-y-6">
                <div className="group cursor-pointer">
                  <div className="mb-2 text-sm text-red-500 font-medium">TRENDING</div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-500 transition-colors">
                    The Future of AI in Enterprise Solutions
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Explore how artificial intelligence is reshaping business operations and decision-making processes.
                  </p>
                </div>
                <div className="group cursor-pointer">
                  <div className="mb-2 text-sm text-red-500 font-medium">LATEST GUIDE</div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-500 transition-colors">
                    Complete Guide to Cloud Architecture
                  </h3>
                  <p className="text-gray-600 mt-2">
                    A comprehensive overview of modern cloud architecture patterns and best practices.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Virtual Events</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16 text-center">
                    <div className="text-lg font-bold text-red-500">MAR</div>
                    <div className="text-2xl font-bold text-gray-900">15</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Tech Innovation Summit 2025</h3>
                    <p className="text-gray-600 mt-1">
                      Join industry leaders for a discussion on emerging technologies and future trends.
                    </p>
                    <button className="mt-2 text-red-500 font-medium hover:text-red-600">
                      Learn More →
                    </button>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16 text-center">
                    <div className="text-lg font-bold text-red-500">APR</div>
                    <div className="text-2xl font-bold text-gray-900">02</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">DevOps Best Practices Workshop</h3>
                    <p className="text-gray-600 mt-1">
                      A hands-on workshop covering the latest tools and methodologies in DevOps.
                    </p>
                    <button className="mt-2 text-red-500 font-medium hover:text-red-600">
                      Learn More →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What Our Subscribers Say</h2>
              <div className="space-y-6">
                <blockquote className="border-l-4 border-red-500 pl-4">
                  <p className="text-gray-600 italic">"The weekly newsletters have become an essential part of my professional growth. The content is always relevant and insightful."</p>
                  <footer className="mt-2 text-sm font-medium text-gray-900">- Sarah Chen, Product Manager</footer>
                </blockquote>
                <blockquote className="border-l-4 border-red-500 pl-4">
                  <p className="text-gray-600 italic">"I love how the content is always up-to-date with the latest industry trends. It's like having a personal curator for professional development."</p>
                  <footer className="mt-2 text-sm font-medium text-gray-900">- Michael Roberts, Tech Lead</footer>
                </blockquote>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 sticky top-8" data-aos="fade-left">
            <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 transform hover:shadow-2xl transition-all duration-300">
              <h2 className="text-3xl font-bold mb-2">Society for Cyber Intelligent System Newsletter</h2>
              <p className="text-gray-600 mb-8 font-medium">
                Subscribe to receive updates on innovation, events, articles, and industry insights. Customize your experience below.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topics of Interest
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Technology', 'Business', 'Design', 'Marketing', 'Development', 'Leadership'].map((interest) => (
                      <label key={interest} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                          checked={formData.interests.includes(interest)}
                          onChange={() => handleInterestChange(interest)}
                        />
                        <span className="text-sm text-gray-700">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Frequency
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                  >
                    <option value="daily">Daily Digest</option>
                    <option value="weekly">Weekly Roundup</option>
                    <option value="monthly">Monthly Newsletter</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={submitStatus.loading}
                  className={`w-full px-8 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 
                    transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-bold
                    ${submitStatus.loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {submitStatus.loading ? 'Subscribing...' : 'Subscribe Now'}
                </button>

                {submitStatus.message && (
                  <div 
                    className={`p-4 rounded-md ${
                      submitStatus.error 
                        ? 'bg-red-50 text-red-500 border border-red-200' 
                        : 'bg-green-50 text-green-500 border border-green-200'
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <p className="text-xs text-gray-500 text-center mt-4">
                  By subscribing, you agree to Society for Cyber Intelligent System's Privacy Policy and Terms of Service.
                  You can unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}