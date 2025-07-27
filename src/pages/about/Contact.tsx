"use client"

import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Globe, Clock, Facebook, Twitter, LinkedinIcon as LinkedIn, Instagram } from 'lucide-react';
import AOS from 'aos';
import Testimonials from './testimonial';
import img1 from "../../components/images/s1.avif";
import img2 from "../../components/images/s2.avif";
import img3 from "../../components/images/s3.avif";
export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    AOS.refresh();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitMessage('Thank you for your message. We will get back to you soon!');
    setFormData({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => {
      setSubmitMessage('');
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Society for Cyber Intelligent Systems</h1>
          <div className="w-24 h-1 bg-red-500 mx-auto"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with us for inquiries about cyber intelligence research, membership, and collaboration opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div 
            className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-all duration-300"
            data-aos="fade-right"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Send us a message</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Membership">Membership</option>
                  <option value="Research Collaboration">Research Collaboration</option>
                  <option value="Event Information">Event Information</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter your message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors font-medium disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {submitMessage && (
                <p className="text-green-600 text-center">{submitMessage}</p>
              )}
            </form>
          </div>

          <div className="space-y-8" data-aos="fade-left">
            <div className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-red-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Address</h3>
                    <p className="text-gray-600">
                      Society for Cyber Intelligent Systems<br />
                      #47, 1st floor, Kodisamy Nagar,<br />
                      100 feet road, Mudaliarpet,<br />
                      Puducherry - 605004, India.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-red-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600">+91-9445690101</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-red-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">societycis25@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Globe className="h-6 w-6 text-red-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Website</h3>
                    <p className="text-gray-600">www.societycis.org</p>
                  </div>
                  </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Office Hours</h2>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-red-500" />
                  <p>Monday - Friday: 8:00 AM - 7:00 PM</p>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-red-500" />
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-red-500" />
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-16" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Global Presence</h2>
          <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3884.267084795897!2d79.81240531529697!3d11.93314409095832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a536b16e2a8b7fb%3A0x18b7a9e8539407c!2sPuducherry%2C%20Puducherry%2C%20India!5e0!3m2!1sen!2sus!4v1689980000000"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className="w-full h-full"
    title="Society for Cyber Intelligent Systems, Puducherry, India"
  ></iframe>
</div>
        </div>

        <Testimonials />

        <div className="mt-16" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <FAQSlider />
        </div>
      </div>
    </div>
  );
}

const FAQSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const faqData = [
    {
      title: "How can I become a member?",
      content: "To become a member, please fill out the contact form with the subject 'Membership' or email us directly. We'll provide you with information about our membership options and application process.",
      image:img1, // You'll need to add these images
    },
    {
      title: "Do you offer internship opportunities?",
      content: "Yes, we offer internship opportunities for students and recent graduates. Please contact us with your resume and area of interest, and we'll get back to you with available positions.",
      image: img2,
    },
    {
      title: "How can I collaborate on research projects?",
      content: "We welcome research collaborations. Please reach out to us with details about your research interests and proposed collaboration. Our team will review and get in touch with you to discuss potential opportunities.",
      image: "/images/research.jpg",
    },
    {
      title: "Are there any upcoming events or conferences?",
      content: "We regularly host events and participate in conferences. Check our website or social media channels for the latest updates on upcoming events, or sign up for our newsletter to stay informed.",
      image: img3,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % faqData.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg bg-white">
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {faqData.map((faq, index) => (
          <div 
            key={index}
            className="w-full flex-shrink-0"
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            data-aos-duration="1000"
          >
            <div className="grid md:grid-cols-2 gap-6 p-6">
              <div className="h-64 overflow-hidden rounded-lg">
                <img 
                  src={faq.image} 
                  alt={faq.title}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.title}</h3>
                <p className="text-gray-600">{faq.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {faqData.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              currentSlide === index ? 'bg-red-500' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};
