"use client"

import { useEffect } from "react"
import { GraduationCap, Users, Clock, Award, BookOpen, Calendar, CheckCircle, Target, Brain, Shield } from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"

export default function MastersDegreeProgram() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    })
  }, [])

  const curriculum = [
    {
      semester: "Semester 1",
      courses: [
        "Advanced Cybersecurity Fundamentals",
        "Artificial Intelligence in Security", 
        "Research Methodology",
        "Mathematical Foundations for AI"
      ]
    },
    {
      semester: "Semester 2",
      courses: [
        "Machine Learning for Threat Detection",
        "Network Security and Analysis",
        "Digital Forensics",
        "Cryptography and Secure Communications"
      ]
    },
    {
      semester: "Semester 3", 
      courses: [
        "Advanced AI Security Systems",
        "Incident Response and Recovery",
        "Thesis Research I",
        "Professional Ethics in Cybersecurity"
      ]
    },
    {
      semester: "Semester 4",
      courses: [
        "Capstone Project",
        "Thesis Research II", 
        "Industry Internship",
        "Emerging Technologies in Security"
      ]
    }
  ]

  const faculty = [
    {
      name: "Dr. Sarah Chen",
      title: "Program Director",
      specialization: "AI Security, Machine Learning",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332e234",
      credentials: "Ph.D. Computer Science, Stanford University",
      experience: "15+ years in AI security research"
    },
    {
      name: "Prof. Michael Rodriguez", 
      title: "Research Supervisor",
      specialization: "Cryptography, Network Security",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      credentials: "Ph.D. Applied Mathematics, MIT",
      experience: "20+ years in cryptographic research"
    },
    {
      name: "Dr. Emily Foster",
      title: "Assistant Professor",
      specialization: "Digital Forensics, IoT Security",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      credentials: "Ph.D. Computer Engineering, Carnegie Mellon",
      experience: "12+ years in digital forensics"
    }
  ]

  const admissionRequirements = [
    "Bachelor's degree in Computer Science, Engineering, or related field",
    "Minimum GPA of 3.0 on a 4.0 scale",
    "GRE scores (minimum 315 combined)",
    "TOEFL/IELTS scores for international students",
    "Two letters of recommendation from academic or professional references",
    "Statement of purpose (500-750 words)",
    "Programming experience in Python, Java, or C++",
    "Basic understanding of cybersecurity concepts and networking"
  ]

  const careerOutcomes = [
    { role: "Cybersecurity Analyst", salary: "$75,000 - $95,000", demand: "High", growth: "31%" },
    { role: "AI Security Engineer", salary: "$90,000 - $120,000", demand: "Very High", growth: "35%" },
    { role: "Security Researcher", salary: "$85,000 - $110,000", demand: "High", growth: "28%" },
    { role: "Incident Response Specialist", salary: "$80,000 - $105,000", demand: "High", growth: "25%" },
    { role: "Security Consultant", salary: "$95,000 - $130,000", demand: "High", growth: "30%" },
    { role: "CISO/Security Director", salary: "$140,000 - $200,000", demand: "Very High", growth: "33%" }
  ]

  const programHighlights = [
    {
      icon: Brain,
      title: "AI-Focused Curriculum",
      description: "Specialized courses in artificial intelligence applications for cybersecurity"
    },
    {
      icon: Shield,
      title: "Hands-On Experience",
      description: "Real-world projects with industry partners and government agencies"
    },
    {
      icon: Users,
      title: "Expert Faculty",
      description: "Learn from leading researchers and industry professionals"
    },
    {
      icon: Target,
      title: "Career Support",
      description: "Dedicated career services and industry networking opportunities"
    }
  ]

  const applicationDeadlines = [
    {
      term: "Fall Semester 2024",
      earlyDecision: "January 15, 2024",
      regularDecision: "March 1, 2024",
      notification: "April 15, 2024"
    },
    {
      term: "Spring Semester 2025", 
      earlyDecision: "September 1, 2024",
      regularDecision: "October 1, 2024",
      notification: "November 15, 2024"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-500 to-black text-white py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9d1')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-red-500/50 to-transparent" />
        <div className="container mx-auto px-6 relative" data-aos="fade-up">
          <div className="flex items-center gap-4 mb-6">
            <GraduationCap className="w-12 h-12" />
            <h1 className="text-5xl font-serif leading-tight">Master's in Cyber Intelligent Systems</h1>
          </div>
          <p className="text-xl max-w-3xl leading-relaxed mb-8">
            Advance your career with our cutting-edge Master's degree program that combines artificial intelligence, 
            cybersecurity, and intelligent systems research.
          </p>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 inline-block">
            <p className="text-lg font-medium">Now accepting applications for Fall 2024 and Spring 2025</p>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h2 className="text-4xl font-serif mb-6">Program Overview</h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Our Master's program is designed to prepare the next generation of cybersecurity professionals 
                who can leverage artificial intelligence to protect against sophisticated cyber threats.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <Clock className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">2 Years</div>
                  <div className="text-gray-600">Full-time Program</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <Users className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">24</div>
                  <div className="text-gray-600">Students per Cohort</div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Program Statistics</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Employment Rate:</span>
                    <span className="text-green-600 ml-2">98%</span>
                  </div>
                  <div>
                    <span className="font-medium">Average Starting Salary:</span>
                    <span className="text-green-600 ml-2">$95,000</span>
                  </div>
                  <div>
                    <span className="font-medium">Industry Partnerships:</span>
                    <span className="text-blue-600 ml-2">50+</span>
                  </div>
                  <div>
                    <span className="font-medium">Research Projects:</span>
                    <span className="text-blue-600 ml-2">25+</span>
                  </div>
                </div>
              </div>
            </div>
            <div data-aos="fade-left">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"
                alt="Students in cybersecurity lab"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Program Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16" data-aos="fade-up">
            Program Highlights
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programHighlights.map((highlight, index) => (
              <div
                key={index}
                className="text-center"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <highlight.icon className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{highlight.title}</h3>
                <p className="text-gray-600">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16" data-aos="fade-up">
            Curriculum Structure
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {curriculum.map((sem, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{sem.semester}</h3>
                <ul className="space-y-3">
                  {sem.courses.map((course, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <BookOpen className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{course}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16" data-aos="fade-up">
            Distinguished Faculty
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {faculty.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-red-500 font-medium mb-2">{member.title}</p>
                <p className="text-gray-600 text-sm mb-3">{member.specialization}</p>
                <div className="border-t pt-3 mt-3">
                  <p className="text-xs text-gray-500 mb-1">{member.credentials}</p>
                  <p className="text-xs text-gray-500">{member.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Requirements */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div data-aos="fade-right">
              <h2 className="text-4xl font-serif mb-8">Admission Requirements</h2>
              <ul className="space-y-4">
                {admissionRequirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div data-aos="fade-left">
              <h2 className="text-4xl font-serif mb-8">Application Deadlines</h2>
              <div className="space-y-6">
                {applicationDeadlines.map((deadline, index) => (
                  <div key={index} className="p-6 bg-white rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{deadline.term}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Early Decision:</span>
                        <span className="font-medium">{deadline.earlyDecision}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Regular Decision:</span>
                        <span className="font-medium">{deadline.regularDecision}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Notification:</span>
                        <span className="font-medium text-green-600">{deadline.notification}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Outcomes */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16" data-aos="fade-up">
            Career Outcomes & Opportunities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerOutcomes.map((career, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{career.role}</h3>
                <p className="text-red-500 font-medium mb-2">{career.salary}</p>
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    career.demand === 'Very High' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {career.demand} Demand
                  </span>
                  <span className="text-sm text-gray-600">+{career.growth} growth</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gradient-to-br from-red-500 to-black text-white">
        <div className="container mx-auto px-6 text-center" data-aos="fade-up">
          <h2 className="text-3xl font-serif mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Take the next step in your cybersecurity career with our Master's program.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Admissions Office</h3>
              <p>admissions@societycis.org</p>
              <p>+1 (888) 555-GRAD</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Program Information</h3>
              <p>program@societycis.org</p>
              <p>+1 (888) 555-INFO</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Financial Aid</h3>
              <p>finaid@societycis.org</p>
              <p>+1 (888) 555-AID</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
