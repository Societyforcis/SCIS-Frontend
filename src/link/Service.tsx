import React, { useEffect } from 'react';
import { ArrowRight, BarChart2, BookOpen, Building, Globe, LightbulbIcon, MessageSquare, Search, Server, Shield, Users } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from '../components/Footer';

const CyberIntelligencePage: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <div className="font-sans bg-gradient-to-b from-gray-50 to-white text-gray-900">
      {/* Main Header Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center" data-aos="fade-up">
          <h1 className="text-4xl md:text-6xl font-bold mb-9 bg-clip-text text-transparent bg-black">
            Empowering Cyber Security Teams
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Unleash the power of advanced cyber intelligence. Equip your team with cutting-edge tools and insights.
          </p>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-3 my-12" data-aos="fade-up" data-aos-delay="100">
          {['Threat Intelligence', 'Professional Services', 'Security Operations', 'Government', 'Media', 'Academia'].map((category, index) => (
            <button 
              key={category}
              className="px-6 py-3 border-2 border-red-500 rounded-lg flex items-center gap-2 hover:bg-red-50 transition-all transform hover:scale-105"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {category} <ArrowRight className="w-4 h-4 text-red-500" />
            </button>
          ))}
        </div>

        {/* Feature Cards - First Row */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {/* Card 1 */}
          <div 
            className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
            data-aos="fade-right"
          >
            <div className="bg-red-100 inline-block p-3 rounded-xl mb-6">
              <BarChart2 className="w-8 h-8 text-red-600" />
            </div>
            <div className="uppercase text-xs font-semibold text-red-600 bg-red-50 inline-block px-3 py-1 rounded-full mb-4">
              THREAT INTELLIGENCE
            </div>
            <h2 className="text-2xl font-bold mb-4">
              Advance security leaders in a fast-moving world
            </h2>
            <p className="text-gray-700 mb-4">
              Boost threat detection strategies with <span className="font-semibold">Cyber Intelligence Systems</span>. Offer 
              security professionals insights they need to outpace threats and 
              expectations. Discounts available for larger group subscriptions.
            </p>
            <div className="flex gap-4 mt-6">
              <button className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
                Contact us
              </button>
              <button className="px-4 py-2 bg-blue-800 text-white rounded-full flex items-center gap-2 hover:bg-blue-900 transition-colors">
                Learn more <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div 
            className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
            data-aos="fade-left"
          >
            <div className="bg-green-100 inline-block p-2 rounded-lg mb-4">
              <LightbulbIcon className="w-8 h-8 text-green-600" />
            </div>
            <div className="uppercase text-xs font-semibold text-green-700 bg-green-50 inline-block px-2 py-1 rounded mb-4">
              PROFESSIONAL SERVICES
            </div>
            <h2 className="text-2xl font-bold mb-4">
              Enable professionals with cutting-edge insights
            </h2>
            <p className="text-gray-700 mb-4">
              Provide teams with the intelligence to lead and solve complex
              challenges with a worldview that translates into measurable
              results. Discounts available for larger group subscriptions.
            </p>
            <div className="flex gap-4 mt-6">
              <button className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
                Contact us
              </button>
              <button className="px-4 py-2 bg-blue-800 text-white rounded-full flex items-center gap-2 hover:bg-blue-900 transition-colors">
                Learn more <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 max-w-7xl mx-auto my-8"></div>

      {/* Unlock Insights Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            data-aos="fade-up"
          >
            Unlock Unlimited <span className="text-red-500">Insights</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature items with animations */}
            <div className="flex flex-col items-start bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" data-aos="fade-up" data-aos-delay="0">
              <div className="bg-teal-100 p-3 rounded-lg mb-4">
                <Globe className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Expand perspectives</h3>
              <p className="text-gray-700">
                Diversify thinking and decision-making with insights from
                around the globe.
              </p>
            </div>

            <div className="flex flex-col items-start bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
              <div className="bg-blue-100 p-3 rounded-lg mb-4">
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Enhance conversations</h3>
              <p className="text-gray-700">
                Fuel meaningful dialogue and connect ideas across your
                organisation.
              </p>
            </div>

            <div className="flex flex-col items-start bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
              <div className="bg-purple-100 p-3 rounded-lg mb-4">
                <Search className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Encourage curious minds</h3>
              <p className="text-gray-700">
                Satisfy a quest for knowledge with in-depth, engaging
                analysis.
              </p>
            </div>

            <div className="flex flex-col items-start bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" data-aos="fade-up" data-aos-delay="300">
              <div className="bg-green-100 p-3 rounded-lg mb-4">
                <Globe className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Gain a world view</h3>
              <p className="text-gray-700">
                Cultivate a comprehensive understanding and outlook on
                global dynamics.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 max-w-7xl mx-auto my-8"></div>

      {/* Feature Cards - Second Row */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 3 */}
          <div 
            className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
            data-aos="fade-right"
          >
            <div className="bg-teal-100 inline-block p-2 rounded-lg mb-4">
              <Server className="w-8 h-8 text-teal-600" />
            </div>
            <div className="uppercase text-xs font-semibold text-teal-700 bg-teal-50 inline-block px-2 py-1 rounded mb-4">
              SECURITY OPERATIONS
            </div>
            <h2 className="text-2xl font-bold mb-4">
              Drive innovation and growth with the latest intelligence
            </h2>
            <p className="text-gray-700 mb-4">
              Give security leaders and innovators the foresight to transform
              and thrive with the latest in emerging tech and its impact at
              home and abroad. Discounts available for larger group
              subscriptions.
            </p>
            <div className="flex gap-4 mt-6">
              <button className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
                Contact us
              </button>
              <button className="px-4 py-2 bg-blue-800 text-white rounded-full flex items-center gap-2 hover:bg-blue-900 transition-colors">
                Learn more <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 4 */}
          <div 
            className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
            data-aos="fade-left"
          >
            <div className="bg-blue-100 inline-block p-2 rounded-lg mb-4">
              <Building className="w-8 h-8 text-blue-600" />
            </div>
            <div className="uppercase text-xs font-semibold text-blue-700 bg-blue-50 inline-block px-2 py-1 rounded mb-4">
              GOVERNMENT
            </div>
            <h2 className="text-2xl font-bold mb-4">
              Empower policymakers and public servants
            </h2>
            <p className="text-gray-700 mb-4">
              Strengthen governance with clarity from <span className="font-semibold">Cyber Intelligence Systems</span>. Equip
              policymakers and civil servants with knowledge to navigate
              global complexities. Discounts available for larger group
              subscriptions.
            </p>
            <div className="flex gap-4 mt-6">
              <button className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
                Contact us
              </button>
              <button className="px-4 py-2 bg-blue-800 text-white rounded-full flex items-center gap-2 hover:bg-blue-900 transition-colors">
                Learn more <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Card 5 */}
          <div 
            className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
            data-aos="fade-right"
          >
            <div className="bg-purple-100 inline-block p-2 rounded-lg mb-4">
              <BookOpen className="w-8 h-8 text-purple-600" />
            </div>
            <div className="uppercase text-xs font-semibold text-purple-700 bg-purple-50 inline-block px-2 py-1 rounded mb-4">
              MEDIA
            </div>
            <h2 className="text-2xl font-bold mb-4">
              Stay connected with compelling stories worldwide
            </h2>
            <p className="text-gray-700 mb-4">
              Find ideas, inspiration and direction with independent, global
              coverage of geopolitics, technology, business and culture.
              Discounts available for larger group subscriptions.
            </p>
            <div className="flex gap-4 mt-6">
              <button className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
                Contact us
              </button>
              <button className="px-4 py-2 bg-blue-800 text-white rounded-full flex items-center gap-2 hover:bg-blue-900 transition-colors">
                Learn more <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 6 */}
          <div 
            className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
            data-aos="fade-left"
          >
            <div className="bg-green-100 inline-block p-2 rounded-lg mb-4">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <div className="uppercase text-xs font-semibold text-green-700 bg-green-50 inline-block px-2 py-1 rounded mb-4">
              ACADEMIA
            </div>
            <h2 className="text-2xl font-bold mb-4">
              Elevate students and faculty in the classroom and beyond
            </h2>
            <p className="text-gray-700 mb-4">
              Supercharge classrooms with inspiration from <span className="font-semibold">Cyber Intelligence Systems</span>.
              Give students and faculty the insights to lead and innovate.
            </p>
            <div className="flex gap-4 mt-6">
              <button className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
                Contact us
              </button>
              <button className="px-4 py-2 bg-blue-800 text-white rounded-full flex items-center gap-2 hover:bg-blue-900 transition-colors">
                Learn more <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 max-w-7xl mx-auto my-8"></div>

      {/* Subscription Management Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="uppercase text-xs font-semibold text-gray-700 bg-gray-100 inline-block px-2 py-1 rounded mb-4">
          SUBSCRIPTION MANAGEMENT TOOL
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Effortlessly manage user access
            </h2>
            <p className="text-lg mb-4">
              Our admin portal lets you seamlessly add or remove users, update account details and monitor
              subscription usage—all from one centralized hub.
            </p>
            <p className="text-lg mb-4">
              Our Subscription Management Tool streamlines your entire experience.
            </p>
          </div>
          <div className="relative">
            <img 
              src="/placeholder.svg?height=400&width=600" 
              alt="Subscription management interface" 
              className="rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white bg-opacity-80 rounded-full p-3 shadow-lg">
                <div className="bg-blue-800 text-white rounded-full w-12 h-12 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 max-w-7xl mx-auto my-8"></div>

      {/* Trusted Brands */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-center text-gray-600 mb-8">Trusted by leading organizations</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="grayscale opacity-70 hover:opacity-100 transition-opacity">
              <div className="h-8 w-24 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CyberIntelligencePage;