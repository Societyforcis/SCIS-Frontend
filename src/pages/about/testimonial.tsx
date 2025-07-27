"use client"

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Dr. Emily Chen",
    role: "Chief Information Security Officer",
    company: "TechGuard Solutions",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80",
    quote: "The Cyber Intelligence Community has been an invaluable resource for staying ahead of emerging threats. Their insights have significantly enhanced our security posture.",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Senior Threat Analyst",
    company: "Global Cybersecurity Institute",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    quote: "I've been a member for over five years, and the quality of research and collaboration opportunities provided by the community are unparalleled.",
  },
  {
    id: 3,
    name: "Sarah Thompson",
    role: "Director of Cybersecurity",
    company: "Secure Innovations Inc.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=761&q=80",
    quote: "The networking events and conferences organized by the Cyber Intelligence Community have been instrumental in fostering partnerships and knowledge sharing in our industry.",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="mt-16" data-aos="fade-up">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center tracking-tight">
        What Our <span className="text-red-500">Members</span> Say
      </h2>
      
      <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl p-8 lg:p-12">
        <div className="absolute top-0 left-0 w-20 h-20 transform -translate-x-1/2 -translate-y-1/2">
          <Quote className="w-full h-full text-red-500/20" />
        </div>
        
        <div className="flex items-center justify-center">
          <button
            onClick={prevTestimonial}
            className="absolute left-4 lg:left-8 z-10 p-2 bg-white/80 backdrop-blur rounded-full shadow-lg text-gray-600 hover:text-red-500 hover:scale-110 transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <div className="mx-16 max-w-3xl">
            <div className="text-center space-y-8">
              <div className="relative">
                <div className="w-28 h-28 mx-auto relative">
                  <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse"></div>
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-lg transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              
              <blockquote>
                <p className="text-xl lg:text-2xl text-gray-700 font-medium leading-relaxed font-sans">
                  "{testimonials[currentIndex].quote}"
                </p>
              </blockquote>
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900 font-sans">
                  {testimonials[currentIndex].name}
                </h3>
                <p className="text-red-500 font-semibold">
                  {testimonials[currentIndex].role}
                </p>
                <p className="text-gray-500 font-medium">
                  {testimonials[currentIndex].company}
                </p>
              </div>
            </div>
          </div>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 lg:right-8 z-10 p-2 bg-white/80 backdrop-blur rounded-full shadow-lg text-gray-600 hover:text-red-500 hover:scale-110 transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? 'bg-red-500 w-8' 
                  : 'bg-gray-300 hover:bg-red-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

