"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Mail, Phone, MapPin, Calendar, Award, BookOpen, Users, Globe } from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"

interface Education {
  degree: string;
  institution: string;
  year: string;
}

interface Publication {
  title: string;
  journal: string;
  year: string;
  citations: number;
}

interface Student {
  name: string;
  level: string;
  year: string;
}

interface Researcher {
  id: string | undefined;
  name: string;
  title: string;
  department: string;
  university: string;
  image: string;
  email: string;
  phone: string;
  office: string;
  biography: string;
  education: Education[];
  research: string[];
  publications: Publication[];
  awards: string[];
  courses: string[];
  students: Student[];
}

export default function ResearcherProfile() {
  const { id } = useParams()
  const [researcher, setResearcher] = useState<Researcher | null>(null)
  const [activeTab, setActiveTab] = useState('research')

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    })

    // Mock data based on researcher ID/name
    const researcherData: { [key: string]: Researcher } = {
      "james-smith": {
        id: id,
        name: "Dr. James Smith",
        title: "Professor of Cybersecurity",
        department: "Computer Science Department",
        university: "MIT",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
        email: "jsmith@mit.edu",
        phone: "+1 (617) 555-0123",
        office: "Room 32-G815, MIT",
        biography: "Dr. James Smith is a leading researcher in artificial intelligence and cybersecurity. He has published over 75 peer-reviewed papers and holds 15 patents in AI-driven security systems. His research focuses on developing intelligent systems that can adapt to evolving cyber threats and has received funding from NSF, DARPA, and industry partners.",
        education: [
          { degree: "Ph.D. in Computer Science", institution: "Stanford University", year: "2010" },
          { degree: "M.S. in Cybersecurity", institution: "Carnegie Mellon University", year: "2006" },
          { degree: "B.S. in Computer Engineering", institution: "UC Berkeley", year: "2004" }
        ],
        research: [
          "AI-powered threat detection systems",
          "Machine learning for cybersecurity",
          "Adaptive security frameworks",
          "Zero-day attack prediction",
          "Behavioral anomaly detection",
          "Quantum-safe cryptographic systems"
        ],
        publications: [
          {
            title: "Intelligent System Approaches to Next-Generation Cybersecurity",
            journal: "IEEE Transactions on Information Forensics and Security",
            year: "2025",
            citations: 47
          },
          {
            title: "Machine Learning Algorithms for Advanced Threat Detection",
            journal: "ACM Computing Surveys",
            year: "2024",
            citations: 89
          },
          {
            title: "Adaptive Security Frameworks in Cloud Computing",
            journal: "Journal of Network and Computer Applications",
            year: "2024",
            citations: 156
          },
          {
            title: "Neural Networks for Real-time Malware Classification",
            journal: "Computers & Security",
            year: "2023",
            citations: 203
          }
        ],
        awards: [
          "NSF CAREER Award (2023)",
          "IEEE Security & Privacy Rising Star Award (2022)",
          "MIT Teaching Excellence Award (2021)",
          "Best Paper Award - IEEE S&P (2020)",
          "DARPA Young Faculty Award (2019)"
        ],
        courses: [
          "Advanced Cybersecurity (6.857)",
          "Machine Learning for Security (6.867)",
          "Introduction to Computer Security (6.858)",
          "AI Systems Security (6.859)"
        ],
        students: [
          { name: "Alex Johnson", level: "PhD", year: "4th year" },
          { name: "Maria Rodriguez", level: "PhD", year: "3rd year" },
          { name: "David Kim", level: "PhD", year: "2nd year" },
          { name: "Sarah Wilson", level: "MS", year: "2nd year" },
          { name: "Michael Chen", level: "MS", year: "1st year" }
        ]
      },
      "sarah-chen": {
        id: id,
        name: "Dr. Sarah Chen",
        title: "Associate Professor of AI Security",
        department: "Electrical Engineering and Computer Science",
        university: "Stanford University",
        image: "https://images.unsplash.com/photo-1494790108755-2616b332e234",
        email: "schen@stanford.edu",
        phone: "+1 (650) 555-0124",
        office: "Gates Building 4A-426",
        biography: "Dr. Sarah Chen specializes in AI-powered threat detection and autonomous security systems. She leads the Stanford AI Security Lab and has published extensively on machine learning applications in cybersecurity. Her work has been featured in top-tier conferences and has received recognition from both academic and industry communities.",
        education: [
          { degree: "Ph.D. in Computer Science", institution: "MIT", year: "2012" },
          { degree: "M.S. in Artificial Intelligence", institution: "Stanford University", year: "2008" },
          { degree: "B.S. in Computer Science", institution: "Caltech", year: "2006" }
        ],
        research: [
          "Deep learning for threat intelligence",
          "Autonomous incident response systems",
          "Adversarial machine learning in security",
          "Graph neural networks for attack detection",
          "Federated learning for cybersecurity"
        ],
        publications: [
          {
            title: "Deep Learning Approaches to Malware Detection",
            journal: "Nature Machine Intelligence",
            year: "2024",
            citations: 234
          },
          {
            title: "Adversarial Attacks on Security ML Systems",
            journal: "Proceedings of USENIX Security",
            year: "2024",
            citations: 178
          },
          {
            title: "Graph-based Network Intrusion Detection",
            journal: "IEEE Transactions on Dependable and Secure Computing",
            year: "2023",
            citations: 145
          }
        ],
        awards: [
          "Sloan Research Fellowship (2024)",
          "Stanford Teaching Award (2023)",
          "NSF Early Career Award (2022)",
          "Best Paper Award - CCS (2021)"
        ],
        courses: [
          "CS 259: AI for Cybersecurity",
          "CS 329S: Machine Learning Systems Design",
          "CS 155: Computer and Network Security"
        ],
        students: [
          { name: "Emma Thompson", level: "PhD", year: "3rd year" },
          { name: "James Wang", level: "PhD", year: "2nd year" },
          { name: "Priya Patel", level: "MS", year: "2nd year" }
        ]
      }
    }

    const mockResearcher = researcherData[id as string] || researcherData["james-smith"]
    setResearcher(mockResearcher)
  }, [id])

  if (!researcher) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading researcher profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-1" data-aos="fade-right">
              <img
                src={researcher.image}
                alt={researcher.name}
                className="w-full max-w-xs rounded-2xl shadow-lg"
              />
            </div>
            <div className="md:col-span-3" data-aos="fade-left">
              <h1 className="text-4xl font-serif mb-2">{researcher.name}</h1>
              <p className="text-xl text-red-500 mb-2">{researcher.title}</p>
              <p className="text-gray-600 mb-6">{researcher.department}, {researcher.university}</p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{researcher.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{researcher.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{researcher.office}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{researcher.university}</span>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">{researcher.biography}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-6">
          <nav className="flex space-x-8">
            {['research', 'publications', 'teaching', 'awards'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 transition-colors capitalize ${
                  activeTab === tab
                    ? 'border-red-500 text-red-500'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {activeTab === 'research' && (
            <div className="grid md:grid-cols-2 gap-12">
              <div data-aos="fade-up">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Research Interests</h2>
                <ul className="space-y-3">
                  {researcher.research.map((interest: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{interest}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div data-aos="fade-up">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Students</h2>
                <div className="space-y-4">
                  {researcher.students.map((student: Student, index: number) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-gray-900">{student.name}</h3>
                      <p className="text-gray-600">{student.level} - {student.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'publications' && (
            <div data-aos="fade-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Publications</h2>
              <div className="space-y-6">
                {researcher.publications.map((pub: Publication, index: number) => (
                  <div key={index} className="p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{pub.title}</h3>
                    <p className="text-red-500 mb-2">{pub.journal}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {pub.year}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {pub.citations} citations
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'teaching' && (
            <div className="grid md:grid-cols-2 gap-12">
              <div data-aos="fade-up">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Courses</h2>
                <div className="space-y-4">
                  {researcher.courses.map((course: string, index: number) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-gray-900">{course}</h3>
                    </div>
                  ))}
                </div>
              </div>
              <div data-aos="fade-up">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Education</h2>
                <div className="space-y-4">
                  {researcher.education.map((edu: Education, index: number) => (
                    <div key={index} className="p-4 border-l-4 border-red-500 bg-red-50">
                      <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.institution}</p>
                      <p className="text-sm text-gray-500">{edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'awards' && (
            <div data-aos="fade-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Honors & Awards</h2>
              <div className="space-y-4">
                {researcher.awards.map((award: string, index: number) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg hover:shadow-md transition-shadow">
                    <Award className="w-6 h-6 text-yellow-600" />
                    <span className="text-gray-700">{award}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
