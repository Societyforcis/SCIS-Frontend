import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Search, Filter, ChevronDown, ArrowDown, ArrowUp, Download, ExternalLink } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface Winner {
  year: number;
  name: string;
  award: string;
  category: string;
  affiliation: string;
  citation: string;
  image?: string;
  profileLink?: string;
}

const AwardWinners: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [expandedWinner, setExpandedWinner] = useState<number | null>(null);
  
  const years = [2024, 2023, 2022, 2021, 2020];
  const categories = [
    'Technical Excellence', 
    'Research & Development', 
    'Academic & Research Excellence',
    'Industry Impact'
  ];
  
  const winners: Winner[] = [
    {
      year: 2024,
      name: "Dr. Sarah Chen",
      award: "Intelligent Systems Innovation Award",
      category: "Technical Excellence",
      affiliation: "Stanford University",
      citation: "For groundbreaking work in developing explainable AI systems for cybersecurity threat detection with minimal false positives.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      profileLink: "https://example.com/sarah-chen"
    },
    {
      year: 2024,
      name: "Dr. Michael Rodriguez",
      award: "Research Leadership Award",
      category: "Academic & Research Excellence",
      affiliation: "MIT",
      citation: "For exceptional leadership in advancing the theoretical foundations of cyber intelligent systems and mentoring the next generation of researchers.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      profileLink: "https://example.com/michael-rodriguez"
    },
    {
      year: 2023,
      name: "Dr. Emily Johnson",
      award: "Machine Learning Security Innovation",
      category: "Research & Development",
      affiliation: "Google Research",
      citation: "For pioneering work in adversarial machine learning defenses that has significantly improved the robustness of AI systems against sophisticated attacks.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      profileLink: "https://example.com/emily-johnson"
    },
    {
      year: 2023,
      name: "Robert Chang",
      award: "Industry Implementation Excellence",
      category: "Industry Impact",
      affiliation: "Secure Systems Inc.",
      citation: "For successfully implementing intelligent security systems that have protected critical infrastructure from over 500 sophisticated cyber attacks.",
      image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      profileLink: "https://example.com/robert-chang"
    },
    {
      year: 2022,
      name: "Dr. Anna Martinez",
      award: "Pioneer in Cyber Intelligence",
      category: "Technical Excellence",
      affiliation: "ETH Zurich",
      citation: "For transformative contributions to the integration of cognitive computing principles in cybersecurity, creating systems that learn and adapt to evolving threats.",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      profileLink: "https://example.com/anna-martinez"
    },
    {
      year: 2021,
      name: "David Wilson",
      award: "Open Innovation Award",
      category: "Industry Impact",
      affiliation: "OpenSec Foundation",
      citation: "For leading the development of open-source intelligent security tools that have been adopted by thousands of organizations worldwide.",
      image: "https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      profileLink: "https://example.com/david-wilson"
    },
  ];
  
  const filteredWinners = winners.filter(winner => {
    const matchesSearch = winner.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         winner.award.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         winner.affiliation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear = selectedYear === 'all' || winner.year === selectedYear;
    const matchesCategory = selectedCategory === 'all' || winner.category === selectedCategory;
    
    return matchesSearch && matchesYear && matchesCategory;
  });
  
  const sortedWinners = [...filteredWinners].sort((a, b) => {
    if (sortDirection === 'desc') {
      return b.year - a.year;
    } else {
      return a.year - b.year;
    }
  });
  
  const toggleSort = () => {
    setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc');
  };
  
  const toggleExpandWinner = (index: number) => {
    setExpandedWinner(expandedWinner === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <Link 
          to="/awards" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-red-500 mb-8"
          data-aos="fade-right"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Awards
        </Link>
        
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">CIS Society Award Winners Archive</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Celebrating excellence and innovation in cyber intelligent systems. Explore our past award recipients and their contributions.
          </p>
        </div>
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8" data-aos="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="search"
                  type="text"
                  placeholder="Search by name, award, or affiliation"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <select
                id="year"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
              >
                <option value="all">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Award Category
              </label>
              <select
                id="category"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Winners List */}
        {sortedWinners.length > 0 ? (
          <div className="space-y-6" data-aos="fade-up">
            <div className="flex justify-end mb-2">
              <button 
                onClick={toggleSort}
                className="inline-flex items-center text-sm text-gray-600 hover:text-red-500"
              >
                Sort by Year {sortDirection === 'desc' ? <ArrowDown className="w-4 h-4 ml-1" /> : <ArrowUp className="w-4 h-4 ml-1" />}
              </button>
            </div>
            
            {sortedWinners.map((winner, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {winner.image && (
                      <img 
                        src={winner.image} 
                        alt={winner.name} 
                        className="w-20 h-20 object-cover rounded-full border-2 border-gray-200"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">{winner.name}</h2>
                          <p className="text-gray-600">{winner.affiliation}</p>
                        </div>
                        <span className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full">
                          {winner.year}
                        </span>
                      </div>
                      
                      <div className="mt-3">
                        <p className="font-medium">{winner.award}</p>
                        <p className="text-sm text-gray-500">Category: {winner.category}</p>
                      </div>
                      
                      <div className="mt-3">
                        <button 
                          onClick={() => toggleExpandWinner(index)}
                          className="inline-flex items-center text-red-600 hover:text-red-700"
                        >
                          {expandedWinner === index ? "Hide citation" : "View citation"}
                          <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${expandedWinner === index ? 'transform rotate-180' : ''}`} />
                        </button>
                      </div>
                      
                      {expandedWinner === index && (
                        <div className="mt-3 bg-gray-50 p-4 rounded-md">
                          <p className="italic text-gray-700">"{winner.citation}"</p>
                          {winner.profileLink && (
                            <a 
                              href={winner.profileLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-sm text-red-600 hover:text-red-700 mt-2"
                            >
                              View profile <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center" data-aos="fade-up">
            <p className="text-gray-600">No award winners match your search criteria.</p>
          </div>
        )}
        
        {/* Download Section */}
        <div className="mt-12 bg-gray-100 rounded-lg p-6 flex flex-col md:flex-row justify-between items-center" data-aos="fade-up">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Complete Winners Archive</h2>
            <p className="text-gray-600">Download the complete archive of all CIS Society award winners since our founding.</p>
          </div>
          <a
            href="/documents/complete-award-winners.pdf"
            download
            className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            <Download className="w-5 h-5 mr-2" />
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
};

export default AwardWinners;