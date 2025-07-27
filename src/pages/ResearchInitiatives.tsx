import React, { useState } from 'react';
import { Search, Share2, MessageSquare, ChevronDown, Book, Globe, Database, Shield, Server, Users, Brain, ArrowRight } from 'lucide-react';

const ResearchAndDevelopment: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const researchPrograms = [
    {
      title: "CIPHER (Cyber Intelligence Program for Higher Education Research)",
      description: "A dedicated program exclusively for cybersecurity researchers and academicians with emphasis on international collaboration in advanced threat intelligence and security research.",
      link: "#"
    },
    {
      title: "Information on Advanced Cyber Research Innovation and Technology (iACRIT)",
      description: "A joint programme aimed to address major cybersecurity challenges through innovative research and development in AI-powered threat detection and response.",
      link: "#"
    },
    {
      title: "Cyber Security Technology Award for Research (C-STAR)",
      description: "A prestigious award to recognize and reward outstanding performance in cybersecurity research projects and breakthrough innovations in digital security.",
      link: "#"
    },
    {
      title: "International Cyber Research Exchange Program",
      description: "Program aims to impart high-end research training in frontier areas of Cyber Security and Technology by providing opportunity to visit leading institutions worldwide.",
      link: "#"
    },
    {
      title: "International Cyber Research Exchange Program",
      description: "Program aims to impart high-end research training in frontier areas of Cyber Security and Technology by providing opportunity to visit leading institutions worldwide.",
      link: "#"
    },
    {
      title: "International Cyber Research Exchange Program",
      description: "Program aims to impart high-end research training in frontier areas of Cyber Security and Technology by providing opportunity to visit leading institutions worldwide.",
      link: "#"
    },
    {
      title: "International Cyber Research Exchange Program",
      description: "Program aims to impart high-end research training in frontier areas of Cyber Security and Technology by providing opportunity to visit leading institutions worldwide.",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
    

      {/* Search Section */}
      <div className="bg-red-500">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search - Keyword, Phrase"
                  className="w-full px-4 py-2 rounded-lg border-2 border-transparent focus:border-red-300 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors">
              Search
            </button>
            <button className="flex items-center space-x-1 text-white">
              <span>Advanced Search</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center text-sm text-gray-600">
          <a href="#" className="hover:text-red-500">Home</a>
          <span className="mx-2">›</span>
          <a href="#" className="hover:text-red-500">Research</a>
          <span className="mx-2">›</span>
          <span className="text-gray-900">Research & Development</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Brain className="h-5 w-5 mr-2 text-red-500" />
                Research Areas
              </h2>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-red-500 hover:underline">Artificial Intelligence in Cybersecurity</a>
                </li>
                <li>
                  <a href="#" className="text-red-500 hover:underline">Threat Intelligence & Analysis</a>
                </li>
                <li>
                  <a href="#" className="text-red-500 hover:underline">Network Security Research</a>
                </li>
                <li>
                  <a href="#" className="text-red-500 hover:underline">Cryptography & Privacy</a>
                </li>
                <li>
                  <a href="#" className="text-red-500 hover:underline">Security Education & Training</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <h1 className="text-3xl font-bold mb-6">Research & Development</h1>
            
            <div className="space-y-6">
              {researchPrograms.map((program, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-2 text-red-500">
                    <a href={program.link} className="hover:underline">{program.title}</a>
                  </h2>
                  <p className="text-gray-700 mb-4">{program.description}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500">
                      <MessageSquare className="h-4 w-4" />
                      <span>Comment</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500">
                      <Share2 className="h-4 w-4" />
                      <span>Share This</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-1 rounded bg-red-500 text-white">1</button>
                <button className="px-3 py-1 rounded hover:bg-gray-100">2</button>
                <button className="px-3 py-1 rounded hover:bg-gray-100">3</button>
                <button className="px-3 py-1 rounded hover:bg-gray-100">4</button>
                <button className="px-3 py-1 rounded hover:bg-gray-100">5</button>
                <span>...</span>
                <button className="px-3 py-1 rounded hover:bg-gray-100">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </main>


      
    </div>
  );
};

export default ResearchAndDevelopment;