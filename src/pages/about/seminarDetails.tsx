// New file suggestion: /home/ramji/Desktop/societycis/cis-front/cyber-web/src/pages/SeminarDetails.tsx
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Users, MapPin, Clock, ChevronLeft, FileText, Download } from 'lucide-react';
import AOS from 'aos';

// This would typically come from your data source or API
// For now, we'll just hard-code a sample
const seminarData = {
  title: "Faculty Seminar Series - Applied Sciences and Humanities",
  department: "Applied Sciences and Humanities Department",
  date: "June 15-23, 2020",
  description: "Organized the Faculty Seminar Series from 15th to 23rd June, 2020. All faculty members presented topics on various subjects covering mathematics, physics, chemistry, and humanities. The seminar series aimed to promote interdisciplinary research and collaboration among faculty members.",
  location: "Virtual Event / Main Campus Auditorium",
  organizer: "Department of Applied Sciences and Humanities",
  speakers: [
    "Dr. James Wilson - Mathematics Department",
    "Dr. Sarah Chen - Physics Department",
    "Dr. Michael Rodriguez - Chemistry Department",
    "Prof. Emily Johnson - Humanities Department"
  ],
  agenda: [
    "Day 1: Introduction to Research Methodologies",
    "Day 2: Applied Mathematics in Engineering",
    "Day 3: Physics and Modern Technology",
    "Day 4: Chemical Applications in Industry",
    "Day 5: Humanities and Technical Education"
  ],
  tags: ["Faculty Seminar Series", "Humanities Seminars & Workshops"],
  image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-02-21%2020-44-21-PE5dd73mRaGcExjLj0GgBdsM5Haos6.png",
  resources: [
    { name: "Seminar Schedule", type: "PDF" },
    { name: "Presentation Slides", type: "ZIP" }
  ]
};

const SeminarDetails: React.FC = () => {
  const { id } = useParams();
  
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    // In a real application, you would fetch the seminar details based on the ID
    console.log(`Fetching seminar details for ID: ${id}`);
    
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <Link 
          to="/fdp" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-red-500 mb-8"
          data-aos="fade-right"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Faculty Development Programs
        </Link>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden" data-aos="fade-up">
          <div className="h-64 relative">
            <img 
              src={seminarData.image}
              alt={seminarData.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex flex-wrap gap-3 mb-3">
                {seminarData.tags.map((tag, index) => (
                  <span key={index} className="text-xs bg-red-500 text-white px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl font-bold text-white">{seminarData.title}</h1>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex flex-wrap gap-6 border-b border-gray-200 pb-6 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-red-500" />
                <span>{seminarData.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-500" />
                <span>{seminarData.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-red-500" />
                <span>{seminarData.organizer}</span>
              </div>
            </div>
            
            <div className="mb-8" data-aos="fade-up">
              <h2 className="text-xl font-bold mb-4">About This Seminar</h2>
              <p className="text-gray-700 leading-relaxed">{seminarData.description}</p>
            </div>
            
            <div className="mb-8" data-aos="fade-up">
              <h2 className="text-xl font-bold mb-4">Featured Speakers</h2>
              <ul className="space-y-2">
                {seminarData.speakers.map((speaker, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>{speaker}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-8" data-aos="fade-up">
              <h2 className="text-xl font-bold mb-4">Agenda</h2>
              <ul className="space-y-2">
                {seminarData.agenda.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div data-aos="fade-up">
              <h2 className="text-xl font-bold mb-4">Resources</h2>
              <div className="space-y-3">
                {seminarData.resources.map((resource, index) => (
                  <a 
                    key={index}
                    href="#"
                    className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FileText className="w-5 h-5 text-red-500" />
                    <span className="flex-1">{resource.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">{resource.type}</span>
                      <Download className="w-5 h-5 text-gray-500" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeminarDetails;