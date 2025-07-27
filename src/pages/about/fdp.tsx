import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, ChevronRight, Calendar, Users, MapPin, Clock } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface Program {
  title: string;
  description: string;
  date: string;
  tags: string[];
  image: string;
  trainer?: string;
  duration?: string;
}

interface Department {
  name: string;
  isExpanded: boolean;
  programs: Program[];
}

interface Seminar {
  title: string;
  department: string;
  date: string;
  description: string;
  tags: string[];
  image: string;
}

const FacultyDevelopmentPrograms: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 100,
      once: true,
    });
  }, []);

  const [departments, setDepartments] = useState<Department[]>([
    {
      name: "Cyber Security Fundamentals",
      isExpanded: true,
      programs: [
        {
          title: "Advanced Penetration Testing Techniques",
          description: "Comprehensive training on modern penetration testing methodologies, tools, and best practices for identifying security vulnerabilities.",
          date: "March 15-20, 2024",
          trainer: "Dr. John Smith, CISSP",
          duration: "6 Days",
          tags: ["Penetration Testing", "Cyber Security", "Hands-on"],
          image: "/images/pen-testing.jpg"
        },
        {
          title: "Incident Response and Threat Hunting",
          description: "Learn advanced techniques for detecting, analyzing, and responding to cyber security incidents and emerging threats.",
          date: "April 5-8, 2024",
          trainer: "Sarah Chen, GCIH",
          duration: "4 Days",
          tags: ["Incident Response", "Threat Hunting", "Security Operations"],
          image: "/images/incident-response.jpg"
        }
      ]
    },
    {
      name: "AI in Cybersecurity",
      isExpanded: false,
      programs: [
        {
          title: "Machine Learning for Threat Detection",
          description: "Implementation of ML algorithms in cybersecurity for automated threat detection and response.",
          date: "May 10-12, 2024",
          trainer: "Dr. Michael Rodriguez",
          duration: "3 Days",
          tags: ["AI/ML", "Security Analytics", "Threat Detection"],
          image: "/images/ml-security.jpg"
        }
      ]
    },
    {
      name: "Cloud Security Programs",
      isExpanded: false,
      programs: []
    },
    {
      name: "Network Security",
      isExpanded: false,
      programs: []
    },
    {
      name: "Application Security",
      isExpanded: false,
      programs: []
    }
  ]);

  const [seminars] = useState<Seminar[]>([
    {
      title: "Faculty Seminar Series - Applied Sciences and Humanities",
      department: "Applied Sciences and Humanities Department",
      date: "June 15-23, 2020",
      description: "Organized the Faculty Seminar Series from 15th to 23rd June, 2020. All faculty members presented topics on various subjects.",
      tags: ["Faculty Seminar Series", "Humanities Seminars & Workshops"],
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-02-21%2020-44-21-PE5dd73mRaGcExjLj0GgBdsM5Haos6.png"
    },
    {
      title: "Faculty Seminar Series 2020 - Information Technology",
      department: "Department of Information Technology",
      date: "June 8-12, 2020",
      description: "Department of Information Technology organized Faculty Seminar Series from 8th to 12th June, 2020. All the faculty members presented topics on emerging technologies.",
      tags: ["IT Seminars & Workshops", "Faculty Seminar Series"],
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-02-21%2020-44-36-VPsfWF1Hn6jmPyRSWod1a2cFroAFkS.png"
    },
    {
        title: "Faculty Seminar Series 2020 - Information Technology",
        department: "Department of Information Technology",
        date: "June 8-12, 2020",
        description: "Department of Information Technology organized Faculty Seminar Series from 8th to 12th June, 2020. All the faculty members presented topics on emerging technologies.",
        tags: ["IT Seminars & Workshops", "Faculty Seminar Series"],
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-02-21%2020-44-36-VPsfWF1Hn6jmPyRSWod1a2cFroAFkS.png"
      },
      {
        title: "Faculty Seminar Series 2020 - Information Technology",
        department: "Department of Information Technology",
        date: "June 8-12, 2020",
        description: "Department of Information Technology organized Faculty Seminar Series from 8th to 12th June, 2020. All the faculty members presented topics on emerging technologies.",
        tags: ["IT Seminars & Workshops", "Faculty Seminar Series"],
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-02-21%2020-44-36-VPsfWF1Hn6jmPyRSWod1a2cFroAFkS.png"
      },
  ]);

  const toggleDepartment = (index: number) => {
    setDepartments(departments.map((dept, i) => ({
      ...dept,
      isExpanded: i === index ? !dept.isExpanded : dept.isExpanded
    })));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4" data-aos="fade-up">
            Professional Development Programs
          </h1>
          <p className="text-lg opacity-90" data-aos="fade-up" data-aos-delay="100">
            Enhance your cybersecurity expertise with our specialized training programs
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Seminar Series Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6" data-aos="fade-up">
            Recent Faculty Seminar Series
          </h2>
          <div className="grid md:grid-cols-2 gap-6" data-aos="fade-up">
            {seminars.map((seminar, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <img
                  src={seminar.image}
                  alt={seminar.title}
                  className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                />
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-red-500" />
                      {seminar.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-red-500" />
                      Faculty
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-red-500 transition-colors">
                    {seminar.title}
                  </h3>

                  <p className="text-gray-600 mb-4 text-sm">
                    {seminar.department}
                  </p>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {seminar.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {seminar.tags.map((tag, tIndex) => (
                      <span
                        key={tIndex}
                        className="text-xs px-3 py-1 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-colors cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a 
                    href={`/seminar-details/${index}`}
                    className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors font-medium"
                  >
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Existing FDP Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6" data-aos="fade-up">
            Faculty Development Programs
          </h2>
          <div className="space-y-4" data-aos="fade-up">
            {departments.map((dept, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all"
              >
                <button
                  onClick={() => toggleDepartment(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-800">{dept.name}</span>
                  {dept.isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-red-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-red-500" />
                  )}
                </button>

                {dept.isExpanded && dept.programs.length > 0 && (
                  <div className="p-6 border-t border-gray-100">
                    <div className="grid md:grid-cols-2 gap-6">
                      {dept.programs.map((program, pIndex) => (
                        <ProgramCard 
                          key={pIndex}
                          program={program}
                          index={pIndex}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* No Programs Message */}
        {departments.every(dept => dept.programs.length === 0) && (
          <div className="text-center py-12" data-aos="fade-up">
            <div className="mb-4 text-gray-600">No programs are currently scheduled.</div>
            <a 
              href="/subscribe" 
              className="text-red-500 hover:text-red-600 font-medium inline-flex items-center gap-2"
            >
              Get notified about new programs
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

// New Program Card Component
const ProgramCard: React.FC<{ program: Program; index: number }> = ({ program, index }) => (
  <div 
    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all"
    data-aos="fade-up"
    data-aos-delay={index * 100}
  >
    <img
      src={program.image}
      alt={program.title}
      className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
    />
    <div className="p-6">
      <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4 text-red-500" />
          {program.date}
        </span>
        {program.duration && (
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-red-500" />
            {program.duration}
          </span>
        )}
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-red-500 transition-colors">
        {program.title}
      </h3>
      
      {program.trainer && (
        <p className="text-gray-600 mb-3 text-sm">
          Trainer: {program.trainer}
        </p>
      )}

      <p className="text-gray-600 mb-4 line-clamp-3">
        {program.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {program.tags.map((tag, tIndex) => (
          <span
            key={tIndex}
            className="text-xs px-3 py-1 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-colors cursor-pointer"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <a 
        href={`/program-registration?title=${encodeURIComponent(program.title)}&date=${encodeURIComponent(program.date)}`} 
        className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors font-medium"
      >
        Register Now
        <ChevronRight className="w-4 h-4" />
      </a>
    </div>
  </div>
);

export default FacultyDevelopmentPrograms;