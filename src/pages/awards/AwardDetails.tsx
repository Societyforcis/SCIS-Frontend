"use client"

import type React from "react"
import { useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import {
  ChevronLeft,
  Trophy,
  Users,
  Calendar,
  CheckCircle,
  Award,
  Star,
  Clock,
  FileText,
  Mail,
  Download,
  Share2,
  BookOpen,
  Target,
  Lightbulb,
  Globe,
} from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"

interface AwardCategory {
  name: string
  description: string
  criteria: string[]
  eligibility: string
  frequency: string
  pastWinners: {
    name: string
    year: number
    affiliation: string
  }[]
  image: string
  benefits: string[]
  submissionRequirements: string[]
  deadline: string
  applicationProcess: string[]
  contactEmail: string
}

const AwardDetails: React.FC = () => {
  const { category, id } = useParams<{ category: string; id: string }>()
  const navigate = useNavigate()

  useEffect(() => {
    AOS.init({ duration: 1000, once: true })
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  // Sample award details - in a real app, you would fetch these from an API
  const awards: Record<string, AwardCategory[]> = {
    excellence: [
      {
        name: "Intelligent Systems Innovation Award",
        description:
          "Recognizing breakthrough innovations in AI-driven cybersecurity systems and intelligent threat detection.",
        criteria: [
          "Demonstrated technical innovation in the field of intelligent cybersecurity systems",
          "Novel approaches to solving complex security challenges using AI and machine learning",
          "Impact and practical application of the innovation in real-world environments",
          "Advancement of the state-of-the-art in intelligent systems for cybersecurity",
        ],
        eligibility:
          "Open to individuals or small teams who have developed innovative intelligent systems for cybersecurity within the past three years.",
        frequency: "Annual",
        deadline: "March 31, 2024",
        applicationProcess: [
          "Submit online application form",
          "Provide detailed technical documentation",
          "Include demonstration video or live demo",
          "Submit peer review letters (minimum 2)",
          "Present to evaluation committee if shortlisted",
        ],
        contactEmail: "awards@societycis.org",
        pastWinners: [
          { name: "Dr. Sarah Chen", year: 2024, affiliation: "Stanford University" },
          { name: "Dr. James Wilson", year: 2023, affiliation: "CyberAI Research" },
          { name: "Team Sentinel", year: 2022, affiliation: "Defensive Labs" },
        ],
        image:
          "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        benefits: [
          "Recognition plaque and certificate",
          "$2,500 monetary prize",
          "Invitation to present at the annual CIS Conference",
          "Feature in CIS Society publications",
          "One-year complimentary society membership",
          "Access to exclusive networking events",
        ],
        submissionRequirements: [
          "Detailed description of the innovation (max 5000 words)",
          "Evidence of implementation and results",
          "Technical documentation or published papers",
          "Letters of support (optional but recommended)",
          "Video demonstration (max 10 minutes)",
          "Impact assessment report",
        ],
      },
    ],
    innovation: [
      {
        name: "Machine Learning Security Innovation",
        description: "For outstanding applications of machine learning in cybersecurity systems.",
        criteria: [
          "Novel application of machine learning techniques to security challenges",
          "Technical merit and originality of the approach",
          "Demonstrated improvement over existing methods",
          "Practical impact on security operations or threat detection",
        ],
        eligibility:
          "Open to researchers and practitioners who have developed innovative machine learning solutions for cybersecurity challenges.",
        frequency: "Annual",
        deadline: "April 15, 2024",
        applicationProcess: [
          "Complete online nomination form",
          "Submit technical paper or detailed report",
          "Provide experimental validation results",
          "Include code repository or implementation details",
          "Participate in virtual presentation if selected",
        ],
        contactEmail: "innovation@societycis.org",
        pastWinners: [
          { name: "Dr. Emily Johnson", year: 2023, affiliation: "Google Research" },
          { name: "Dr. Alexander Lee", year: 2022, affiliation: "MIT" },
          { name: "Dr. Sophia Rodriguez", year: 2021, affiliation: "University of California" },
        ],
        image:
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        benefits: [
          "Recognition plaque and certificate",
          "$2,000 monetary prize",
          "Publication opportunity in the CIS Journal",
          "Speaking opportunity at CIS events",
          "Research collaboration opportunities",
          "Media coverage and press release",
        ],
        submissionRequirements: [
          "Detailed technical description of the innovation",
          "Experimental results and benchmarks",
          "Implementation details or code repository (if applicable)",
          "Real-world impact assessment",
          "Comparison with existing solutions",
          "Future research directions",
        ],
      },
    ],
    education: [
      {
        name: "Academic Achievement Award",
        description: "Celebrating academic excellence in cyber intelligent systems research.",
        criteria: [
          "Outstanding contributions to education in cybersecurity and intelligent systems",
          "Development of innovative curricula or teaching methods",
          "Mentorship and support for students entering the field",
          "Publication record and research impact",
        ],
        eligibility:
          "Open to educators, professors, and academic researchers who have made significant contributions to cybersecurity education.",
        frequency: "Annual",
        deadline: "May 30, 2024",
        applicationProcess: [
          "Submit nomination by department head or colleague",
          "Provide comprehensive CV and teaching portfolio",
          "Include student testimonials and evaluations",
          "Submit evidence of educational innovation",
          "Participate in interview process if shortlisted",
        ],
        contactEmail: "education@societycis.org",
        pastWinners: [
          { name: "Prof. Maria Garcia", year: 2023, affiliation: "NYU" },
          { name: "Prof. John Smith", year: 2022, affiliation: "Georgia Tech" },
          { name: "Prof. David Kim", year: 2021, affiliation: "Carnegie Mellon University" },
        ],
        image:
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        benefits: [
          "Recognition plaque and certificate",
          "$1,500 monetary prize",
          "Featured profile in CIS Education Newsletter",
          "Invitation to education advisory board",
          "Conference presentation opportunity",
          "Educational resource development funding",
        ],
        submissionRequirements: [
          "Comprehensive teaching portfolio",
          "Evidence of educational innovation",
          "Student testimonials and feedback",
          "List of publications and research contributions",
          "Description of mentorship activities",
          "Letters of recommendation (minimum 3)",
        ],
      },
    ],
    research: [
      {
        name: "Outstanding Research Contribution Award",
        description: "Recognizing exceptional research contributions to the field of cyber intelligent systems.",
        criteria: [
          "Significant advancement in cybersecurity research",
          "High-impact publications in top-tier venues",
          "Innovation in research methodologies",
          "Influence on the broader research community",
        ],
        eligibility:
          "Open to researchers with significant contributions to cybersecurity and intelligent systems research.",
        frequency: "Annual",
        deadline: "June 15, 2024",
        applicationProcess: [
          "Self-nomination or nomination by peers",
          "Submit research portfolio and impact statement",
          "Provide citation metrics and impact analysis",
          "Include representative publications",
          "Present research overview to review panel",
        ],
        contactEmail: "research@societycis.org",
        pastWinners: [
          { name: "Dr. Michael Chen", year: 2023, affiliation: "UC Berkeley" },
          { name: "Dr. Lisa Wang", year: 2022, affiliation: "Microsoft Research" },
          { name: "Dr. Robert Johnson", year: 2021, affiliation: "IBM Research" },
        ],
        image:
          "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        benefits: [
          "Recognition plaque and certificate",
          "$3,000 monetary prize",
          "Keynote speaking opportunity at CIS Conference",
          "Research collaboration funding",
          "Featured researcher profile",
          "Access to exclusive research networks",
        ],
        submissionRequirements: [
          "Research portfolio with impact statement",
          "List of significant publications (last 5 years)",
          "Citation metrics and impact analysis",
          "Evidence of research influence and adoption",
          "Collaborative research examples",
          "Future research vision statement",
        ],
      },
    ],
  }

  // Get the specific award based on category and id
  const categoryAwards = awards[category || ""] || []
  const award = categoryAwards[Number.parseInt(id || "0") || 0]

  if (!award) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Award Not Found</h2>
          <p className="text-gray-600 mb-6">The award you're looking for doesn't exist.</p>
          <Link
            to="/awards"
            className="inline-flex items-center px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Awards
          </Link>
        </div>
      </div>
    )
  }

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "excellence":
        return Trophy
      case "innovation":
        return Lightbulb
      case "education":
        return BookOpen
      case "research":
        return Target
      default:
        return Award
    }
  }

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "excellence":
        return "from-yellow-500 to-orange-600"
      case "innovation":
        return "from-purple-500 to-indigo-600"
      case "education":
        return "from-green-500 to-teal-600"
      case "research":
        return "from-blue-500 to-cyan-600"
      default:
        return "from-red-500 to-red-600"
    }
  }

  const CategoryIcon = getCategoryIcon(category || "")

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className={`bg-gradient-to-r ${getCategoryColor(category || "")} text-white py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6" data-aos="fade-up">
            <Link
              to="/awards"
              className="inline-flex items-center text-white/80 hover:text-white transition-colors mr-4"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back to Awards
            </Link>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-up">
              <div className="flex items-center mb-4">
                <CategoryIcon className="w-12 h-12 mr-4" />
                <span className="text-lg opacity-90 capitalize">{category} Award</span>
              </div>
              <h1 className="text-4xl font-bold mb-6">{award.name}</h1>
              <p className="text-xl opacity-90 mb-8">{award.description}</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center bg-white/20 rounded-lg px-4 py-2">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>Deadline: {award.deadline}</span>
                </div>
                <div className="flex items-center bg-white/20 rounded-lg px-4 py-2">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{award.frequency}</span>
                </div>
              </div>
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <img
                src={award.image || "/placeholder.svg"}
                alt={award.name}
                className="w-full h-80 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Criteria Section */}
            <div className="bg-white rounded-2xl shadow-sm p-8" data-aos="fade-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <CheckCircle className="w-6 h-6 mr-3 text-green-500" />
                Award Criteria
              </h2>
              <ul className="space-y-4">
                {award.criteria.map((criterion, index) => (
                  <li key={index} className="flex items-start">
                    <Star className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{criterion}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Eligibility Section */}
            <div className="bg-white rounded-2xl shadow-sm p-8" data-aos="fade-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="w-6 h-6 mr-3 text-blue-500" />
                Eligibility Requirements
              </h2>
              <p className="text-gray-700 leading-relaxed">{award.eligibility}</p>
            </div>

            {/* Application Process */}
            <div className="bg-white rounded-2xl shadow-sm p-8" data-aos="fade-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FileText className="w-6 h-6 mr-3 text-purple-500" />
                Application Process
              </h2>
              <div className="space-y-4">
                {award.applicationProcess.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold mr-4 mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Submission Requirements */}
            <div className="bg-white rounded-2xl shadow-sm p-8" data-aos="fade-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Download className="w-6 h-6 mr-3 text-red-500" />
                Submission Requirements
              </h2>
              <ul className="space-y-3">
                {award.submissionRequirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Past Winners */}
            <div className="bg-white rounded-2xl shadow-sm p-8" data-aos="fade-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Trophy className="w-6 h-6 mr-3 text-yellow-500" />
                Past Winners
              </h2>
              <div className="space-y-4">
                {award.pastWinners.map((winner, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-900">{winner.name}</h3>
                      <p className="text-gray-600">{winner.affiliation}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-gray-900">{winner.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-2xl shadow-sm p-6" data-aos="fade-up">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Information</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Frequency:</span>
                  <span className="font-medium">{award.frequency}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Deadline:</span>
                  <span className="font-medium text-red-600">{award.deadline}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Contact:</span>
                  <a href={`mailto:${award.contactEmail}`} className="font-medium text-blue-600 hover:underline">
                    Email
                  </a>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-2xl shadow-sm p-6" data-aos="fade-up">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-green-500" />
                Award Benefits
              </h3>
              <ul className="space-y-3">
                {award.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4" data-aos="fade-up">
              <button className="w-full bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center font-medium">
                <FileText className="w-5 h-5 mr-2" />
                Apply Now
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                <Download className="w-5 h-5 mr-2" />
                Download Guidelines
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                <Share2 className="w-5 h-5 mr-2" />
                Share Award
              </button>
            </div>

            {/* Contact Information */}
            <div className="bg-red-50 rounded-2xl p-6 border border-red-200" data-aos="fade-up">
              <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Need Help?
              </h3>
              <p className="text-red-700 text-sm mb-4">
                Have questions about this award? Our team is here to help you with your application.
              </p>
              <a
                href={`mailto:${award.contactEmail}`}
                className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
              >
                <Mail className="w-4 h-4 mr-2" />
                {award.contactEmail}
              </a>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div
          className="mt-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl text-white p-8 text-center"
          data-aos="fade-up"
        >
          <h3 className="text-3xl font-bold mb-4">Ready to Apply?</h3>
          <p className="text-red-100 mb-8 max-w-2xl mx-auto text-lg">
            Join the ranks of distinguished professionals recognized for their outstanding contributions to
            cybersecurity and intelligent systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-8 py-4 bg-white text-red-600 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg">
              <FileText className="w-5 h-5 mr-2" />
              Start Application
            </button>
            <Link
              to="/awards"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-red-600 transition-colors font-medium text-lg"
            >
              <Globe className="w-5 h-5 mr-2" />
              View All Awards
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AwardDetails
