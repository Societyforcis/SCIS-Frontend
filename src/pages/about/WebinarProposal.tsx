import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Calendar, Clock, CheckCircle } from 'lucide-react';
import AOS from 'aos';

const WebinarProposal: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    title: '',
    description: '',
    expertise: '',
    topicCategory: '',
    preferredDate: '',
    preferredTime: '',
    duration: '',
    additionalInfo: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  const categoryOptions = [
    'Select a category',
    'Artificial Intelligence',
    'Network Security',
    'Cryptography',
    'Cloud Security',
    'IoT Security',
    'Incident Response',
    'Data Privacy',
    'Cyber Threat Intelligence',
    'Application Security',
    'Other',
  ];

  const durationOptions = [
    'Select duration',
    '30 minutes',
    '45 minutes',
    '60 minutes',
    '90 minutes',
    '120 minutes',
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div 
            className="bg-white rounded-xl shadow-lg p-8 text-center" 
            data-aos="fade-up"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Proposal Submitted Successfully!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for your interest in presenting a webinar. Our team will review your proposal and contact you within 5-7 business days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/webinars"
                className="px-6 py-3 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-colors"
              >
                Return to Webinars
              </Link>
              <Link
                to="/"
                className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors"
              >
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link 
          to="/webinars" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-red-500 mb-8"
          data-aos="fade-right"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Webinars
        </Link>
        
        <div className="text-center mb-10" data-aos="fade-up">
          <h1 className="text-3xl font-bold text-gray-900">Submit a Webinar Proposal</h1>
          <div className="w-24 h-1 bg-red-500 mx-auto my-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Share your expertise with our cybersecurity community. Complete the form below to propose a webinar topic.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8" data-aos="fade-up" data-aos-delay="100">
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Presenter Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">Organization/Company *</label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={formData.organization}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="expertise" className="block text-sm font-medium text-gray-700 mb-1">Areas of Expertise *</label>
                <input
                  type="text"
                  id="expertise"
                  name="expertise"
                  required
                  placeholder="e.g., Cybersecurity, Cloud Security, AI"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={formData.expertise}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-6">Webinar Details</h2>
            
            <div className="grid grid-cols-1 gap-6 mb-8">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Proposed Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description/Abstract *</label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="topicCategory" className="block text-sm font-medium text-gray-700 mb-1">Topic Category *</label>
                <select
                  id="topicCategory"
                  name="topicCategory"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={formData.topicCategory}
                  onChange={handleInputChange}
                >
                  {categoryOptions.map((category, index) => (
                    <option key={index} value={category === 'Select a category' ? '' : category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-6">Schedule Preferences</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="time"
                    id="preferredTime"
                    name="preferredTime"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
                <select
                  id="duration"
                  name="duration"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={formData.duration}
                  onChange={handleInputChange}
                >
                  {durationOptions.map((option, index) => (
                    <option key={index} value={option === 'Select duration' ? '' : option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mb-8">
              <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                rows={3}
                placeholder="Any specific requirements or additional details about your webinar"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={formData.additionalInfo}
                onChange={handleInputChange}
              ></textarea>
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-3 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Submit Proposal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WebinarProposal;