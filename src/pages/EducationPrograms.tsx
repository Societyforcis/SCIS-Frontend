import React, { useState } from 'react';
import { Calendar, MapPin, ArrowRight, Lock, Brain, Shield, Code, Server, Users, BookOpen, Zap, ChevronRight } from 'lucide-react';

const CyberIntelligenceCommunity: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('professionals');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
    

      {/* Hero Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-03-09%2017-10-33-vjizkHBFvXNzq3oN9MXz22S3XeYtVx.png" 
              alt="Cyber professionals collaborating" 
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">The Trusted Standard</h1>
            <p className="text-lg text-gray-700">
              Focused on methodology, not just tools, the CyberIS Standards are a framework that guides professionals in using technology to create high-impact, sustainable and scalable security solutions for all organizations.
            </p>
            
            <h2 className="text-2xl font-bold mt-8">The CyberIS Standards</h2>
            
            <div className="grid grid-cols-2 gap-3 mt-4">
              <button 
                onClick={() => setActiveTab('professionals')}
                className={`flex items-center space-x-2 px-4 py-2 border rounded-md ${activeTab === 'professionals' ? 'bg-yellow-100 border-yellow-400' : 'bg-white border-gray-300'}`}
              >
                <Users className="h-5 w-5 text-yellow-600" />
                <span>1. Professionals</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('analysts')}
                className={`flex items-center space-x-2 px-4 py-2 border rounded-md ${activeTab === 'analysts' ? 'bg-green-100 border-green-400' : 'bg-white border-gray-300'}`}
              >
                <Brain className="h-5 w-5 text-green-600" />
                <span>2. Analysts</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('leaders')}
                className={`flex items-center space-x-2 px-4 py-2 border rounded-md ${activeTab === 'leaders' ? 'bg-blue-100 border-blue-400' : 'bg-white border-gray-300'}`}
              >
                <Zap className="h-5 w-5 text-blue-600" />
                <span>3. Security Leaders</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('trainers')}
                className={`flex items-center space-x-2 px-4 py-2 border rounded-md ${activeTab === 'trainers' ? 'bg-purple-100 border-purple-400' : 'bg-white border-gray-300'}`}
              >
                <BookOpen className="h-5 w-5 text-purple-600" />
                <span>4. Trainers</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Event Banner */}
      <section className="py-8 bg-gradient-to-r from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl">
            <div className="md:flex">
              <div className="md:w-2/3 p-6 md:p-8 bg-black text-white relative">
                <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-1 rounded-bl-lg font-bold">
                  Register Now!
                </div>
                <h2 className="text-4xl font-bold mb-2">
                  <span className="text-white">Spark</span>
                  <span className="text-red-500 italic"> Innovative</span>
                </h2>
                <h2 className="text-4xl font-bold mb-6">
                  <span className="text-white">Security</span>
                </h2>
                <p className="mb-4 text-gray-300">Co-located events powered by CyberIS+NIST.</p>
                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-yellow-300">Inspiring Bold Innovation</h3>
                  <div className="flex items-center mt-2">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>June 29-July 2</span>
                    <span className="mx-2">|</span>
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>San Antonio, Texas</span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/3 bg-gray-100 p-6">
                <h3 className="text-xl font-bold mb-4">CyberLive 25</h3>
                <div className="flex items-center text-gray-700 mb-2">
                  <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                  <span>June 29, 2025 - July 2, 2025</span>
                </div>
                <div className="flex items-center text-gray-700 mb-4">
                  <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                  <span>San Antonio, TX</span>
                </div>
                <p className="text-gray-700 mb-4">
                  Experience bold security innovation at the cybertech event of the year! Learn during 1,000+ sessions that will prepare you to help organizations thrive in the age of AI. Registration is now open!
                </p>
                <a href="#" className="flex items-center text-red-500 hover:text-red-700 font-medium">
                  Event Details <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Popular Topics</h2>
          <p className="text-center text-gray-700 max-w-4xl mx-auto mb-8">
            CyberIS has a library of thousands of blog posts, podcasts, courses, books, journals, expert webinars and topic guides. Browse by topic or job role to find everything you need.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
              Artificial Intelligence
            </button>
            <button className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
              Threat Intelligence
            </button>
            <button className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
              Security Operations
            </button>
            <button className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
              Diversity, Equity & Inclusion
            </button>
            <button className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
              CyberIS Standards
            </button>
            <button className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
              Digital Forensics
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
              Computer Science & Computational Thinking
            </button>
            <button className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
              Security Gamification
            </button>
            <button className="px-4 py-2 rounded-full border border-red-500 bg-red-500 text-white">
              Professional Development & Well-Being
            </button>
            <button className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
              Training Strategies
            </button>
          </div>
          
          {/* Featured Content */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-03-09%2017-10-54-CL28MIfGvnkl0VcYNkYiRQNpaR004S.png" 
                alt="Professional on laptop" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  ARTIFICIAL INTELLIGENCE
                </div>
                <h3 className="text-xl font-bold mb-2">Authentic Engagement: Using AI and Meaningful Assessments to Reenergize Security</h3>
                <p className="text-gray-700 mb-4">
                  Does AI inevitably lead to a rise in cheating? Security experts think there are other possibilities.
                </p>
                <a href="#" className="flex items-center text-red-500 hover:text-red-700 font-medium">
                  Read the Article <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative">
                <img 
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-03-09%2017-10-39-fzdi27H1VC3w0h4SOP784gafLKg1Ts.png" 
                  alt="Webinar thumbnail" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-black text-white px-3 py-1 rounded-md flex items-center text-sm">
                  <Lock className="h-4 w-4 mr-1" />
                  MEMBERS ONLY
                </div>
              </div>
              <div className="p-4">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  CURRICULUM DESIGN
                </div>
                <h3 className="text-xl font-bold mb-2">Empowering Security Through Learning Design: A Conversation with Patrick Hausammann</h3>
                <div className="flex items-center text-gray-700 mb-4">
                  <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                  <span>April 25, 2024</span>
                </div>
                <p className="text-gray-700 mb-4">
                  Join NIST Emerging Leader Patrick Hausammann to discover how to leverage tech to design engaging, meaningful security training experiences.
                </p>
                <a href="#" className="flex items-center text-red-500 hover:text-red-700 font-medium">
                  Log In to Watch Now <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative">
                <img 
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-03-09%2017-10-20-UYTOC6UB2UVdjblOIgXeah95xvvGEt.png" 
                  alt="AI course" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 bg-purple-600 p-3 rounded-tr-lg">
                  <Brain className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="p-4">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  ARTIFICIAL INTELLIGENCE
                </div>
                <h3 className="text-xl font-bold mb-2">Artificial Intelligence Explorations for Security Professionals</h3>
                <div className="flex items-center text-gray-700 mb-4">
                  <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                  <span>July 7 - August 31</span>
                </div>
                <p className="text-gray-700 mb-4">
                  Artificial intelligence (AI) is no longer the stuff of the future; today's security professionals can expect to interact with AI in both their personal and professional lives. To prepare teams for success, leaders need to understand how AI technologies can be leveraged to enhance security and solve real-world problems. Scholarships may be available.
                </p>
                <a href="#" className="text-red-500 hover:text-red-700">scholarship application</a> <span className="text-gray-700">and apply.</span>
                <div className="mt-4">
                  <a href="#" className="flex items-center text-red-500 hover:text-red-700 font-medium">
                    Course Details <ArrowRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8">
            <a href="#" className="flex items-center bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-700 transition">
              Explore the full library <ChevronRight className="h-5 w-5 ml-2" />
            </a>
          </div>
        </div>
      </section>
      
     
    </div>
  );
};

export default CyberIntelligenceCommunity;