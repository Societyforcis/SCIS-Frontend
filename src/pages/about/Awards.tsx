import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Calendar, Trophy, Users, FileText, HelpCircle, ChevronRight, Search, CheckCircle, Clock } from 'lucide-react';
import AOS from 'aos';

interface Award {
  title: string;
  description: string;
  category: string;
}

const Awards: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  // Award categories
  const awardCategories = [
    {
      id: "excellence",
      title: "Excellence Awards",
      description: "Recognizing outstanding achievements in cyber intelligent systems",
      icon: Trophy,
      color: "bg-gradient-to-r from-yellow-500 to-orange-600",
      awards: [
        {
          id: 0,
          name: "Intelligent Systems Innovation Award",
          description: "Recognizing breakthrough innovations in AI-driven cybersecurity systems."
        }
      ]
    },
    {
      id: "innovation",
      title: "Innovation Awards",
      description: "Celebrating innovative solutions and approaches in cybersecurity",
      icon: Award,
      color: "bg-gradient-to-r from-purple-500 to-indigo-600",
      awards: [
        {
          id: 0,
          name: "Machine Learning Security Innovation",
          description: "For outstanding applications of machine learning in cybersecurity systems."
        }
      ]
    },
    {
      id: "education",
      title: "Education Awards",
      description: "Honoring contributions to cyber intelligence education and training",
      icon: Users,
      color: "bg-gradient-to-r from-green-500 to-teal-600",
      awards: [
        {
          id: 0,
          name: "Academic Achievement Award",
          description: "Celebrating academic excellence in cyber intelligent systems research."
        }
      ]
    },
    {
      id: "research",
      title: "Research Awards",
      description: "Acknowledging significant research contributions to the field",
      icon: Search,
      color: "bg-gradient-to-r from-blue-500 to-cyan-600",
      awards: [
        {
          id: 0,
          name: "Outstanding Research Contribution Award",
          description: "Recognizing exceptional research contributions to the field."
        }
      ]
    }
  ];

  // Timeline events for award process
  const timelineEvents = [
    {
      title: "Nominations Open",
      date: "January 15, 2025",
      description: "Submit nominations for deserving individuals across all award categories.",
      icon: Calendar
    },
    {
      title: "Nominations Close",
      date: "March 31, 2025",
      description: "Last date to submit award nominations and supporting materials.",
      icon: Clock
    },
    {
      title: "Review Process",
      date: "April 1 - May 15, 2025",
      description: "Expert panel evaluates nominations and selects winners.",
      icon: FileText
    },
    {
      title: "Winners Announced",
      date: "May 31, 2025",
      description: "Award recipients are announced and notified.",
      icon: Trophy
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto" data-aos="fade-up">
            <h1 className="text-4xl font-bold mb-6">CIS Society Awards</h1>
            <p className="text-xl opacity-90 mb-8">
              Recognizing excellence and innovation in the field of cyber intelligent systems
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/awards/nominate" 
                className="inline-flex items-center px-6 py-3 bg-white text-red-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Nominate Someone
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
              <Link 
                to="/awards/winners" 
                className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                View Past Winners
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Award Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Award Categories</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our awards recognize outstanding contributions and achievements across various domains of cyber intelligent systems
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {awardCategories.map((category, index) => {
            const CategoryIcon = category.icon;
            
            return (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className={`${category.color} h-3`}></div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center`}>
                      <CategoryIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{category.description}</p>
                  
                  {category.awards.map((award, awardIndex) => (
                    <div 
                      key={awardIndex}
                      className="bg-gray-50 rounded-lg p-4 mb-4 hover:bg-gray-100 transition-all"
                    >
                      <h4 className="font-semibold text-gray-900 mb-1">{award.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{award.description}</p>
                      <Link 
                        to={`/awards/details/${category.id}/${award.id}`}
                        className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center"
                      >
                        View Award Details
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  ))}
                  
                  <Link 
                    to={`/awards/nominate`}
                    className="inline-flex items-center mt-2 text-red-500 hover:text-red-600 font-medium"
                  >
                    Nominate for {category.title}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Award Timeline</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              The key dates in our award nomination and selection process
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-0 left-1/2 w-px h-full bg-gray-300 transform -translate-x-1/2 hidden md:block"></div>
            
            <div className="space-y-12 relative">
              {timelineEvents.map((event, index) => {
                const EventIcon = event.icon;
                
                return (
                  <div 
                    key={index} 
                    className={`flex flex-col md:flex-row md:gap-8 items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                  >
                    {/* Timeline dot */}
                    <div className="hidden md:block absolute left-1/2 w-6 h-6 rounded-full bg-red-500 border-4 border-white transform -translate-x-1/2"></div>
                    
                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                      <div className="bg-white rounded-xl shadow-sm p-6 md:mb-0 mb-4">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="md:hidden w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <EventIcon className="w-5 h-5 text-red-500" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg">{event.title}</h3>
                            <p className="text-red-500">{event.date}</p>
                          </div>
                        </div>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                    </div>
                    
                    <div className="md:w-1/2 hidden md:block">
                      {/* Empty div for layout */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ and Resources */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm p-8" data-aos="fade-up">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-purple-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Who can nominate someone for an award?</h3>
                <p className="text-gray-600">Anyone can nominate a deserving individual for a CIS Society award, including colleagues, peers, mentors, or even self-nominations.</p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">What is the selection process?</h3>
                <p className="text-gray-600">All nominations are reviewed by the CIS Society Awards Committee, consisting of experts in the field who evaluate submissions against the award criteria.</p>
              </div>
              
              <div className="pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">When are award winners announced?</h3>
                <p className="text-gray-600">Award winners are typically announced at the end of May each year, with the formal recognition at our annual awards ceremony.</p>
              </div>
            </div>
            
            <Link 
              to="/awards/faq"
              className="inline-flex items-center text-purple-500 hover:text-purple-600 font-medium"
            >
              View all FAQs
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="bg-gray-900 text-white rounded-xl shadow-sm p-8" data-aos="fade-up">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">Award Resources</h2>
            </div>
            
            <ul className="space-y-4 mb-6">
              <li className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                <FileText className="w-5 h-5 text-red-400" />
                <a 
                  href="/documents/nomination-guide.pdf"
                  target="_blank"
                  className="flex-1 font-medium"
                >
                  Award Nomination Guide
                </a>
              </li>
              
              <li className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                <FileText className="w-5 h-5 text-red-400" />
                <a 
                  href="/documents/selection-criteria.pdf"
                  target="_blank"
                  className="flex-1 font-medium"
                >
                  Selection Criteria Documentation
                </a>
              </li>
              
              <li className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                <FileText className="w-5 h-5 text-red-400" />
                <a 
                  href="/documents/past-winners.pdf"
                  target="_blank"
                  className="flex-1 font-medium"
                >
                  Past Winners Archive
                </a>
              </li>
            </ul>
            
            <Link 
              to="/awards/winners"
              className="inline-flex items-center text-red-400 hover:text-red-300 font-medium"
            >
              Explore Past Winners
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-red-600 to-red-900 py-16 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-4">Know Someone Exceptional?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              Help us recognize outstanding achievements in the field of cyber intelligent systems by nominating deserving individuals for our prestigious awards.
            </p>
            <Link 
              to="/awards/nominate"
              className="inline-flex items-center px-8 py-4 bg-white text-red-600 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg"
            >
              Start Nomination
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Awards;