import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Search, Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  category: string;
  registrationLink?: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "Advanced Cybersecurity Workshop 2024",
    date: "March 15, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Cyber Defense Center",
    description: "Intensive hands-on workshop covering advanced penetration testing, threat hunting, and incident response techniques. Led by certified ethical hackers and security experts.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    category: "Cybersecurity Training",
    registrationLink: "#"
  },
  {
    id: 2,
    title: "AI in Cybersecurity Summit",
    date: "April 5, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "Virtual Conference Hall",
    description: "Explore the intersection of artificial intelligence and cybersecurity. Learn about ML-powered threat detection, automated response systems, and predictive security analytics.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
    category: "AI & Security",
    registrationLink: "#"
  },
  {
    id: 3,
    title: "Cloud Security Masterclass",
    date: "April 20, 2024",
    time: "11:00 AM - 3:00 PM",
    location: "Security Operations Center",
    description: "Comprehensive training on securing cloud infrastructure, focusing on AWS, Azure, and GCP security best practices and compliance frameworks.",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f",
    category: "Cloud Security",
    registrationLink: "#"
  },
  {
    id: 4,
    title: "Cyber Threat Intelligence Symposium",
    date: "May 10, 2024",
    time: "9:30 AM - 4:30 PM",
    location: "Intelligence Analysis Center",
    description: "Join leading threat analysts and security researchers to discuss emerging cyber threats, attack patterns, and defensive strategies.",
    image: "https://images.unsplash.com/photo-1551808525-51a94da548ce",
    category: "Threat Intelligence",
    registrationLink: "#"
  },
  {
    id: 5,
    title: "Security Operations & Incident Response",
    date: "May 25, 2024",
    time: "10:00 AM - 6:00 PM",
    location: "Incident Response Lab",
    description: "Practical training on managing security operations, incident detection, and coordinated response procedures for security teams.",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f",
    category: "SecOps Training"
  }
];

const departments = [
  {
    name: "Cybersecurity Training Programs",
    icon: "🛡️"
  },
  {
    name: "Threat Intelligence Workshops",
    icon: "🔍"
  },
  {
    name: "Network Security Events",
    icon: "🌐"
  },
  {
    name: "Cloud Security Seminars",
    icon: "☁️"
  },
  {
    name: "Application Security Training",
    icon: "💻"
  },
  {
    name: "Security Operations Workshops",
    icon: "🔐"
  },
  {
    name: "Incident Response Drills",
    icon: "🚨"
  },
  {
    name: "Digital Forensics Labs",
    icon: "🔎"
  },
  {
    name: "Compliance & Governance Sessions",
    icon: "📜"
  }
];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'department'>('all');
  const [expandedDept, setExpandedDept] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    
      <div className="bg-gradient-to-r from-red-500 to-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Upcoming Events</h1>
          <p className="text-gray-100 max-w-2xl">
            Discover upcoming seminars, workshops, and activities across all departments
          </p>
        </div>
      </div>

    
      <div className="max-w-7xl mx-auto px-4 -mt-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs - Updated active state colors */}
        <div className="flex space-x-4 mb-8">
          <TabButton
            active={activeTab === 'all'}
            onClick={() => setActiveTab('all')}
            label="All Events"
          />
          <TabButton
            active={activeTab === 'department'}
            onClick={() => setActiveTab('department')}
            label="Department Events"
          />
        </div>

        {/* Content */}
        {activeTab === 'all' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {departments.map((dept) => (
              <DepartmentCard
                key={dept.name}
                department={dept}
                isExpanded={expandedDept === dept.name}
                onToggle={() => setExpandedDept(expandedDept === dept.name ? null : dept.name)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// Updated TabButton component
const TabButton = ({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 rounded-lg font-medium transition-all ${
      active 
        ? 'bg-red-500 text-white shadow-lg transform scale-105' 
        : 'bg-white text-gray-700 hover:bg-gray-50'
    }`}
  >
    {label}
  </button>
);

// Updated EventCard component
const EventCard = ({ event }: { event: Event }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
    <div className="relative">
      <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-48 object-cover" />
      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
        {event.category}
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{event.title}</h3>
      <div className="space-y-2 mb-4">
        <EventDetail icon={<Calendar className="h-4 w-4" />} text={event.date} />
        <EventDetail icon={<Clock className="h-4 w-4" />} text={event.time} />
        <EventDetail icon={<MapPin className="h-4 w-4" />} text={event.location} />
      </div>
      <p className="text-gray-600 text-sm mb-4">{event.description}</p>
      {event.registrationLink && (
        <a
          href={event.registrationLink}
          className="inline-flex items-center text-red-500 hover:text-red-700"
        >
          Register Now <ExternalLink className="h-4 w-4 ml-1" />
        </a>
      )}
    </div>
  </div>
);

// Component for Event Details
const EventDetail = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center text-gray-600">
    <span className="mr-2">{icon}</span>
    <span className="text-sm">{text}</span>
  </div>
);

// Component for Department Cards
const DepartmentCard = ({ 
  department, 
  isExpanded, 
  onToggle 
}: { 
  department: { name: string; icon: string }; 
  isExpanded: boolean; 
  onToggle: () => void;
}) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
    >
      <div className="flex items-center">
        <span className="text-2xl mr-3">{department.icon}</span>
        <span className="font-medium text-gray-900">{department.name}</span>
      </div>
      {isExpanded ? <ChevronDown className="h-5 w-5 text-gray-400" /> : <ChevronRight className="h-5 w-5 text-gray-400" />}
    </button>
    {isExpanded && (
      <div className="px-6 py-4 bg-gray-50">
        <p className="text-sm text-gray-600">No events scheduled</p>
      </div>
    )}
  </div>
);