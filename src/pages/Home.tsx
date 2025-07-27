import React, { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ChevronLeft, ChevronRight, Building2, MessageSquare, GraduationCap, ArrowRight, Calendar, MapPin } from 'lucide-react';
import ai from "../components/images/s1.avif";
import ai2 from "../components/images/s2.avif";
import ai3 from "../components/images/s3.avif";
import conf1 from "../components/images/conf1.png"; // Import the conf1.png image
import { Link, useNavigate } from 'react-router-dom';
import MembershipCardPreview from '../components/MembershipCardPreview';
import FeaturedCards from "../components/featured-card";
import EmailSubscribe from "../components/email-from";
import Stats from "../components/Stats"
import { motion } from "framer-motion";
import SEO from '../components/SEO';

// Updated slides array with all images plus the conference image
const slides = [
  {
    image: ai, // Keep original first slide
    subtitle: 'Innovating the Future',
    description: 'Join us in the journey of technological advancements and collaborative research.',
    isConference: false,
    duration: 2000
  },
  {
    image: ai2, // Keep original slide
    subtitle: 'Advancing AI',
    description: 'Leading the way in artificial intelligence and machine learning research.',
    isConference: false,
    duration: 2000
  },
];

// Update the Card component to include navigation
function Card({ 
  title, 
  items, 
  icon: Icon,
  bgImage,
  linkTo // Add this new prop
}: { 
  title: string; 
  items: string[]; 
  icon: React.ElementType;
  bgImage: string;
  linkTo: string; // Add this type
}) {
  const navigate = useNavigate();
  
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '380px',
      minHeight: '400px', 
      borderRadius: '16px',
      padding: '1.5rem',
      background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transition: 'all 0.3s ease',
      overflow: 'hidden',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgImage})`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bgImage})`;
    }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
        }}>
          <Icon style={{ width: '30px', height: '30px', color: '#ff4757' }} />
        </div>
        
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'center',
          marginBottom: '1.5rem',
        }}>
          {title}
        </h2>
        
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          marginBottom: '1.5rem',
          width: '100%',
        }}>
          {items.slice(0, 4).map((item, index) => (
            <li key={index} style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '0.75rem',
              color: 'white',
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: index % 2 === 0 ? 'white' : '#ff4757',
                marginRight: '1rem',
              }}></span>
              <span style={{ fontSize: '1rem' }}>{item}</span>
            </li>
          ))}
        </ul>
        
        <button 
          style={{
            marginTop: 'auto',
            padding: '0.75rem 2rem',
            backgroundColor: '#ff4757',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'transform 0.2s ease',
          }}
          onClick={() => navigate(linkTo)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          View More
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const navigate = useNavigate();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Check if current slide is the conference slide
  const isConferenceSlide = slides[currentSlideIndex]?.isConference;
  
  // Function to handle slide rotation with variable timing
  const rotateSlide = () => {
    setCurrentSlideIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % slides.length;
      return nextIndex;
    });
  };

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true
    });

    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set up slide rotation with variable timing
    const currentSlide = slides[currentSlideIndex];
    // Use the slide's specified duration or default to 4000ms
    const slideDuration = currentSlide.duration || 4000;
    
    timerRef.current = setTimeout(rotateSlide, slideDuration);

    // Cleanup timer on component unmount or slide change
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentSlideIndex]);

  const navigateSlide = (direction: 'prev' | 'next') => {
    // Clear existing timer when manually navigating
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    setCurrentSlideIndex((prevIndex) => {
      if (direction === 'prev') {
        return prevIndex === 0 ? slides.length - 1 : prevIndex - 1;
      } else {
        return (prevIndex + 1) % slides.length;
      }
    });
  };

  // Function to go to conference page
  const goToConference = () => {
    navigate("/conferences");
  };

  // Cards array with conf1.png in the first card
  const cards = [
    {
      title: "Collaborative Research",
      icon: Building2,
      bgImage: conf1, // Using the local conf1.png image here
      items: [
        "Computational Intelligence",
        "Edge Intelligence",
        "Internet of Things",
        "Learning Analytics",
        "Data Science"
      ],
      linkTo: "/research" // Add linkTo for navigation
    },
    {
      title: "Forum for Knowledge Exchange",
      icon: MessageSquare,
      bgImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
      items: [
        "Digital Meet-ups",
        "Conference",
        "Talk Series",
        "FDP",
        "Webinar"
      ],
      linkTo: "/webinars" // Add linkTo for navigation
    },
    {
      title: "Empowerment",
      icon: GraduationCap,
      bgImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
      items: [
        "Industry-Connect",
        "Consultancy",
        "Projects",
        "Training",
        "Placement Assistance"
      ],
      linkTo: "/education-programs" // Add linkTo for navigation
    }
  ];

  return (
    <>
      <SEO 
        title="Society for Cyber Intelligent System"
        description="Advancing the frontiers of cybersecurity and artificial intelligence through research, innovation, and collaboration."
      />
      <main>
        {/* Hero Section with conditional content for conference */}
        <section className="relative h-[600px] overflow-hidden">
          <div
            key={currentSlideIndex}
            className="absolute inset-0 w-full h-full cursor-pointer"
            data-aos="fade-right"
            data-aos-duration="1000"
            onClick={() => isConferenceSlide && goToConference()}
          >
            <img
              src={slides[currentSlideIndex].image}
              className="w-full h-full object-cover"
              alt={`Slide ${currentSlideIndex + 1}`}
              loading="lazy"
            />
          </div>
          <div className={`absolute inset-0 ${isConferenceSlide ? 
            'bg-gradient-to-r from-black/70 to-black/60' : 
            'bg-gradient-to-r from-black/60 to-black/40'}`} />
          
          {/* Navigation Buttons */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 z-20"
            onClick={() => navigateSlide('prev')}
          >
            <ChevronLeft className="h-8 w-8 text-white" />
          </button>
          
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 z-20"
            onClick={() => navigateSlide('next')}
          >
            <ChevronRight className="h-8 w-8 text-white" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlideIndex 
                    ? 'bg-white w-4' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                onClick={() => setCurrentSlideIndex(index)}
              />
            ))}
          </div>

          <div 
            className="relative z-10 container mx-auto px-6 h-full flex items-center"
            data-aos="fade-right"
          >
            <div className="max-w-3xl text-white">
              {isConferenceSlide ? (
                // Conference-specific content with improved visibility
                <div className=" p-6 rounded-lg">
                  <h1 className="text-5xl font-extrabold mb-4 leading-tight text-white drop-shadow-lg">
                    ICMBNT–2025
                  </h1>
                  <p className="text-2xl font-bold mb-3 opacity-100 text-red-400 drop-shadow">
                    International Conference on Multidisciplinary Breakthroughs
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mb p-3 rounded">
                    <div className="flex items-center">
                      <Calendar className="h-6 w-6 mr-2 text-red-400" />
                      <span className="text-lg font-medium text-white">April 26-27, 2025</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-6 w-6 mr-2 text-red-400" />
                      <span className="text-lg font-medium text-white">SRM HOTEL, Chennai</span>
                    </div>
                  </div>
                  <button 
                    onClick={goToConference}
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full inline-flex items-center gap-2 transition-colors text-lg font-bold shadow-lg"
                  >
                    Learn More
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                // Default content for other slides
                <>
                  <h1 className="text-5xl font-bold mb-4 leading-tight">
                    Society for{' '}
                    <span className="text-red-400">Intelligent</span>{' '}
                    <span className="text-red-400">Systems</span>
                  </h1>
                  <p className="text-xl mb-4 opacity-90">{slides[currentSlideIndex].subtitle}</p>
                  <p className="text-lg mb-8 opacity-90">{slides[currentSlideIndex].description}</p>
                  <Link to={"/signin"} className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full inline-flex items-center gap-2 transition-colors text-lg font-medium">
                    Get Started
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>

        <MembershipCardPreview />

        {/* Services Section */}
        <div style={{
          padding: '5rem 1rem',
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
          }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '4rem',
              color: '#2d3436',
            }}>
              Our Services
            </h1>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              justifyItems: 'center',
            }}>
              {cards.map((card, index) => (
                <Card
                  key={index}
                  title={card.title}
                  items={card.items}
                  icon={card.icon}
                  bgImage={card.bgImage}
                  linkTo={card.linkTo} // Add the linkTo prop
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <h3 className="text-4xl font-bold text-red-500 mb-2">500+</h3>
                <p className="text-gray-600">Active Members</p>
              </div>
              <div className="p-6">
                <h3 className="text-4xl font-bold text-red-500 mb-2">100+</h3>
                <p className="text-gray-600">Research Papers</p>
              </div>
              <div className="p-6">
                <h3 className="text-4xl font-bold text-red-500 mb-2">50+</h3>
                <p className="text-gray-600">Annual Events</p>
              </div>
            </div>
          </div>
        </section>

     
        <FeaturedCards />

        {/* Newsletter Subscribe Section */}
        <EmailSubscribe />
        <Stats/>
      </main>
    </>
  );
}