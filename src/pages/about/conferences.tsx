import { useState, useCallback, useMemo, useEffect } from 'react';
import { Search, ChevronDown, ChevronRight, X, Calendar, MapPin, Users } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import pic1 from "../../components/images/conf1.png";

interface Conference {
  title: string;
  publisher: string;
  year: number;
  hasHistory: boolean;
  description: string;
  date: string;
  location: string;
  image: string;
  attendees: string;
  registrationUrl?: string;
  featured?: boolean;
  fullDescription?: string;
}


// Removed unused Topic interface


const ConferenceBrowser = () => {
  useEffect(() => {
    AOS.init({
      duration: 300,
      once: true,
    });
  }, []);

  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedHistories, setExpandedHistories] = useState(new Set());
  const [yearRange, setYearRange] = useState({ start: 1936, end: 2025 });
  const [selectedPublishers, setSelectedPublishers] = useState(new Set());
  const [selectedTopics, setSelectedTopics] = useState(new Set());
  const [yearFilterType, setYearFilterType] = useState('range');
  const [singleYear, setSingleYear] = useState(2024);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    year: true,
    publisher: true,
    topic: true
  });
  
  // New state for modal
  const [selectedConference, setSelectedConference] = useState<Conference | null>(null);

  // Sample data
  const publishers = [
    { name: "IEEE", count: 35584 },
    { name: "IET", count: 2796 },
    { name: "VDE", count: 281 },
    { name: "Prometheus GmbH", count: 1 }
  ];

  const topics = [
    { name: "Computing and Processing", count: 24594 },
    { name: "Communication, Networking and Broadcast Technologies", count: 17382 },
    { name: "Components, Circuits, Devices and Systems", count: 15377 },
    { name: "Signal Processing and Analysis", count: 12571 },
    { name: "Robotics and Control Systems", count: 9386 }
  ];

  const conferences = [
    {
      title: "International Conference on Multidisciplinary Breakthroughs and NextGen Technologies (ICMBNT–2025)",
      publisher: "Society for Cyber Intelligent Systems",
      year: 2025,
      hasHistory: false,
      description: "Hybrid Conference (In-person + Virtual) exploring cutting-edge innovations across multiple disciplines. Join experts from around the world to discuss and collaborate on next-generation technologies that are shaping our future.",
      date: "April 26-27, 2025",
      location: "SRM HOTEL - Maraimalai Nagar - CHENNAI - India",
      image: pic1, // Changed to use the local pic1 image instead of the Unsplash URL
      attendees: "Expected 300+",
      registrationUrl: "https://societycisicmbnt2025.vercel.app/",
      featured: true,
      // More detailed information that will be shown in the modal
      fullDescription: `
        <h2>International Conference on Multidisciplinary Breakthroughs and NextGen Technologies (ICMBNT–2025)</h2>
        <p><strong>Date:</strong> April 26 & 27, 2025</p>
        <p><strong>Venue:</strong> SRM HOTEL - Maraimalai Nagar - CHENNAI - India</p>
        <p><strong>Format:</strong> Hybrid Conference (In-person + Virtual)</p>
        <p><strong>Organized by:</strong> Society for Cyber Intelligent Systems, Puducherry – India</p>
        <br>
        <h3>About The Conference</h3>
        <p>ICMBNT-2025 brings together researchers, industry professionals, and academic experts to explore cutting-edge innovations across multiple disciplines. The conference aims to foster collaboration and knowledge exchange on next-generation technologies that are shaping our future.</p>
        <br>
        <h3>Key Topics</h3>
        <ul>
          <li>Artificial Intelligence and Machine Learning</li>
          <li>Cybersecurity and Data Privacy</li>
          <li>Internet of Things (IoT) and Smart Systems</li>
          <li>Cloud Computing and Big Data Analytics</li>
          <li>Blockchain Technology and Applications</li>
          <li>Robotics and Automation</li>
          <li>Digital Transformation</li>
        </ul>
        <br>
        <h3>Important Dates</h3>
        <p><strong>Paper Submission Deadline:</strong> March 25, 2025</p>
        <p><strong>Notification of Acceptance:</strong> April 5, 2025</p>
        <p><strong>Registration Deadline:</strong> April 12, 2025</p>
        <p><strong>Conference Dates:</strong> April 26, 27, 2025</p>
      `
    },

    // ...other conferences remain the same
  ];

  // Handler functions
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Modified toggleHistory function
  const toggleHistory = useCallback((index: number) => {
    setExpandedHistories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  // Modified handleLearnMore function to show the conference in featured style
  const handleLearnMore = useCallback((conference: Conference) => {
    setSelectedConference(conference);
    // Disable body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  }, []);

  // Function to close modal
  const closeModal = useCallback(() => {
    setSelectedConference(null);
    // Re-enable body scrolling when modal is closed
    document.body.style.overflow = 'auto';
  }, []);


  const togglePublisher = useCallback((publisherName: unknown) => {
    setSelectedPublishers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(publisherName)) {
        newSet.delete(publisherName);
      } else {
        newSet.add(publisherName);
      }
      return newSet;
    });
  }, []);

  const toggleTopic = useCallback((topicName: unknown) => {
    setSelectedTopics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(topicName)) {
        newSet.delete(topicName);
      } else {
        newSet.add(topicName);
      }
      return newSet;
    });
  }, []);

  const handleYearRangeChange = useCallback((type: any, value: any) => {
    setYearRange(prev => ({
      ...prev,
      [type]: value
    }));
  }, []);

  const clearYearFilter = useCallback(() => {
    if (yearFilterType === 'range') {
      setYearRange({ start: 1936, end: 2025 });
    } else {
      setSingleYear(2024);
    }
  }, [yearFilterType]);


  const filteredConferences = useMemo(() => {
    return conferences.filter(conference => {
      const matchesSearch = conference.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesYear = yearFilterType === 'range' 
        ? conference.year >= yearRange.start && conference.year <= yearRange.end
        : conference.year === singleYear;
      const matchesPublisher = selectedPublishers.size === 0 || selectedPublishers.has(conference.publisher);
      return matchesSearch && matchesYear && matchesPublisher;
    });
  }, [conferences, searchQuery, yearFilterType, yearRange, singleYear, selectedPublishers]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Cybersecurity Conferences</h1>
          <p className="text-lg opacity-90">
            Explore global cybersecurity conferences, summits, and symposiums
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Only Upcoming Conferences Image - Now Clickable */}
          <div className="col-span-3">
            <div 
              className="bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => window.open("https://societycisicmbnt2025.vercel.app", "_blank", "noopener,noreferrer")}
            >
              {/* Added cursor-pointer to indicate it's clickable */}
              <div className="relative">
                <img
                  src={pic1}
                  alt="Upcoming Conferences"
                  className="w-full h-auto object-cover"
                />
                {/* Added a lighter gradient overlay to make image more visible */}
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/50 to-transparent"></div>
                
                {/* Moved text to an overlay for better contrast */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-red-900 to-transparent">
                  <h3 className="font-bold text-white text-xl">Upcoming Events</h3>
                  <p className="text-white">Register for upcoming  ICMBNT2025 conferences</p>
                </div>
              </div>
              
              {/* Added additional information about the featured conference */}
              <div className="p-4 bg-gradient-to-r from-red-50 to-white">
                <h4 className="font-semibold text-red-800 mb-2">ICMBNT–2025</h4>
                <div className="flex items-center text-sm text-gray-700 mb-1">
                  <Calendar className="w-4 h-4 mr-2 text-red-500" />
                  April 26-27, 2025
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <MapPin className="w-4 h-4 mr-2 text-red-500" />
                  SRM HOTEL, Chennai, India
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-6">
            {/* Search Bar */}
            <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
              <div className="flex gap-4 mb-4">
                <button className="font-medium text-red-500 border-b-2 border-red-500 pb-1">By Title</button>
                <button className="text-gray-600 hover:text-red-500">By Topic</button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search conferences..."
                  className="w-full p-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Conference List */}
            <div className="space-y-4">
              {filteredConferences.map((conference, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-all"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="flex items-start gap-2">
                    <button
                      onClick={() => toggleHistory(index)}
                      className="mt-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      {expandedHistories.has(index) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-gray-900 hover:text-red-500 transition-colors cursor-pointer">
                        {conference.title}
                      </h2>
                      <div className="flex gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-red-500" />
                          {conference.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-red-500" />
                          {conference.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-red-500" />
                          {conference.attendees}
                        </span>
                      </div>
                      {expandedHistories.has(index) && (
                        <div className="mt-3 pl-4 border-l-2 border-red-100">
                          <p className="text-gray-600 mb-3">{conference.description}</p>
                          <button 
                            onClick={() => handleLearnMore(conference)}
                            className="text-red-500 hover:text-red-600 flex items-center gap-1 text-sm font-medium"
                          >
                            Learn more <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Filters */}
          <div className="col-span-3 space-y-6 bg-white p-4 rounded-lg shadow-sm">
            {/* Year Filter */}
            <div className="border-b pb-4">
              <button 
                onClick={() => toggleSection('year')}
                className="w-full font-semibold mb-3 flex items-center justify-between hover:text-[#663399]"
              >
                <span>Year</span>
                {expandedSections.year ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
              {expandedSections.year && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <button 
                      className={`text-sm py-1 px-2 rounded-md ${yearFilterType === 'range' ? 'bg-gray-100 font-medium' : ''}`}
                      onClick={() => setYearFilterType('range')}
                    >
                      Range
                    </button>
                    <button 
                      className={`text-sm py-1 px-2 rounded-md ${yearFilterType === 'single' ? 'bg-gray-100 font-medium' : ''}`}
                      onClick={() => setYearFilterType('single')}
                    >
                      Single year
                    </button>
                    <button 
                      onClick={clearYearFilter}
                      className="text-sm text-red-500 hover:text-red-600"
                    >
                      Clear
                    </button>
                  </div>
                  
                  {yearFilterType === 'range' ? (
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-gray-500">From</label>
                        <input
                          type="number"
                          min="1936"
                          max="2025"
                          className="w-full p-1 border border-gray-300 rounded text-sm"
                          value={yearRange.start}
                          onChange={(e) => handleYearRangeChange('start', parseInt(e.target.value))}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">To</label>
                        <input
                          type="number"
                          min="1936"
                          max="2025"
                          className="w-full p-1 border border-gray-300 rounded text-sm"
                          value={yearRange.end}
                          onChange={(e) => handleYearRangeChange('end', parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="text-xs text-gray-500">Year</label>
                      <input
                        type="number"
                        min="1936"
                        max="2025"
                        className="w-full p-1 border border-gray-300 rounded text-sm"
                        value={singleYear}
                        onChange={(e) => setSingleYear(parseInt(e.target.value))}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Publisher Filter */}
            <div className="border-b pb-4">
              <button 
                onClick={() => toggleSection('publisher')}
                className="w-full font-semibold mb-3 flex items-center justify-between hover:text-[#663399]"
              >
                <span>Publisher</span>
                {expandedSections.publisher ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
              {expandedSections.publisher && (
                <div>
                  <div className="mb-2">
                    <input 
                      type="text" 
                      placeholder="Filter publishers..."
                      className="w-full p-1 text-sm border border-gray-300 rounded"
                    />
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    {publishers.map((publisher, idx) => (
                      <div key={idx} className="flex items-center justify-between mb-1 text-sm">
                        <label className="flex items-center cursor-pointer">
                          <input 
                            type="checkbox"
                            className="mr-2"
                            checked={selectedPublishers.has(publisher.name)}
                            onChange={() => togglePublisher(publisher.name)}
                          />
                          <span>{publisher.name}</span>
                        </label>
                        <span className="text-xs text-gray-500">{publisher.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Topic Filter */}
            <div className="border-b pb-4">
              <button 
                onClick={() => toggleSection('topic')}
                className="w-full font-semibold mb-3 flex items-center justify-between hover:text-[#663399]"
              >
                <span>Topic</span>
                {expandedSections.topic ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
              {expandedSections.topic && (
                <div>
                  <div className="mb-2">
                    <input 
                      type="text" 
                      placeholder="Filter topics..."
                      className="w-full p-1 text-sm border border-gray-300 rounded"
                    />
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    {topics.map((topic, idx) => (
                      <div key={idx} className="flex items-center justify-between mb-1 text-sm">
                        <label className="flex items-center cursor-pointer">
                          <input 
                            type="checkbox"
                            className="mr-2"
                            checked={selectedTopics.has(topic.name)}
                            onChange={() => toggleTopic(topic.name)}
                          />
                          <span>{topic.name}</span>
                        </label>
                        <span className="text-xs text-gray-500">{topic.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Additional Filters (like Location, etc) can be added here */}
          </div>
        </div>
      </div>

      {/* Conference Details Modal - Using Featured Conference Style */}
      {selectedConference && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold">Conference Details</h2>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Modal Content - Using Featured Conference Style */}
            <div className="p-6">
              <div 
                className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg shadow-md p-6 border-l-4 border-red-500"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <img 
                      src={selectedConference.image} 
                      alt={selectedConference.title} 
                      className="w-full h-48 object-cover rounded-lg shadow-sm"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <div className="flex items-center mb-3">
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded mr-2">
                        {selectedConference.featured ? "FEATURED EVENT" : "EVENT"}
                      </span>
                      <span className="text-red-700 font-medium text-sm">
                        {selectedConference.publisher}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {selectedConference.title}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                      <span className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-red-500" />
                        {selectedConference.date}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-red-500" />
                        {selectedConference.location}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      {selectedConference.description}
                    </p>
                    <div className="flex gap-3">
                      <a 
                        href={selectedConference.registrationUrl} 
                        className="bg-red-500 text-white px-4 py-2 rounded font-medium hover:bg-red-600 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        REGISTER NOW
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Additional Conference Details */}
                {selectedConference.fullDescription && (
                  <div className="mt-6 pt-6 border-t border-red-200">
                    <h3 className="text-lg font-semibold mb-4">Conference Details</h3>
                    <div className="prose prose-red max-w-none" 
                         dangerouslySetInnerHTML={{ __html: selectedConference.fullDescription }} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConferenceBrowser;