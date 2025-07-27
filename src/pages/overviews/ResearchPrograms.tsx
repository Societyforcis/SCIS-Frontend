"use client"

import { useEffect } from "react"
import { Users, Calendar, Clock, CheckCircle, Target, Award } from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"

export default function ResearchPrograms() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    })
  }, [])

  const programs = [
    {
      id: 1,
      title: "AI-Powered Cyber Defense Initiative",
      description: "Developing next-generation AI algorithms for real-time threat detection and response in enterprise environments.",
      duration: "18 months",
      participants: 15,
      status: "Active",
      startDate: "March 2024",
      leader: "Dr. Sarah Chen",
      funding: "$2.5M",
      objectives: [
        "Develop novel AI algorithms for threat detection",
        "Create automated response systems",
        "Publish findings in top-tier conferences",
        "Deploy pilot systems in partner organizations"
      ],
      milestones: [
        { phase: "Phase 1: Algorithm Development", status: "Completed", date: "June 2024" },
        { phase: "Phase 2: System Integration", status: "In Progress", date: "December 2024" },
        { phase: "Phase 3: Field Testing", status: "Upcoming", date: "March 2025" }
      ]
    },
    {
      id: 2,
      title: "Quantum-Safe Cryptography Research",
      description: "Researching and implementing post-quantum cryptographic solutions for next-generation security systems.",
      duration: "24 months",
      participants: 12,
      status: "Active",
      startDate: "June 2024",
      leader: "Prof. Michael Rodriguez",
      funding: "$3.2M",
      objectives: [
        "Develop quantum-resistant algorithms",
        "Test implementation feasibility",
        "Create industry standards",
        "Build prototype systems"
      ],
      milestones: [
        { phase: "Phase 1: Algorithm Research", status: "In Progress", date: "December 2024" },
        { phase: "Phase 2: Performance Testing", status: "Upcoming", date: "June 2025" },
        { phase: "Phase 3: Standardization", status: "Upcoming", date: "December 2025" }
      ]
    },
    {
      id: 3,
      title: "IoT Security Framework Development",
      description: "Building comprehensive security frameworks for Internet of Things devices and networks.",
      duration: "12 months",
      participants: 20,
      status: "Recruiting",
      startDate: "January 2025",
      leader: "Dr. Emily Foster",
      funding: "$1.8M",
      objectives: [
        "Design secure IoT architectures",
        "Develop lightweight security protocols",
        "Create certification standards",
        "Establish testing methodologies"
      ],
      milestones: [
        { phase: "Phase 1: Framework Design", status: "Upcoming", date: "April 2025" },
        { phase: "Phase 2: Protocol Development", status: "Upcoming", date: "August 2025" },
        { phase: "Phase 3: Validation & Testing", status: "Upcoming", date: "December 2025" }
      ]
    }
  ]

  const achievements = [
    { number: "25+", label: "Active Research Programs" },
    { number: "150+", label: "Research Publications" },
    { number: "$15M", label: "Total Research Funding" },
    { number: "300+", label: "Participating Researchers" }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-500 to-black text-white py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-red-500/50 to-transparent" />
        <div className="container mx-auto px-6 relative" data-aos="fade-up">
          <h1 className="text-5xl font-serif mb-6 leading-tight">Research Programs</h1>
          <p className="text-xl max-w-3xl leading-relaxed">
            Explore our cutting-edge research initiatives that are shaping the future of cybersecurity and intelligent systems.
          </p>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6" data-aos="fade-up">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">{achievement.number}</div>
                <div className="text-gray-600">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16" data-aos="fade-up">
            Featured Research Programs
          </h2>
          <div className="space-y-12">
            {programs.map((program, index) => (
              <div
                key={program.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-2xl font-bold text-gray-900">{program.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          program.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {program.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed">{program.description}</p>
                      <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-600 mb-6">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{program.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{program.participants} researchers</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>Started {program.startDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          <span>{program.funding} funding</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Target className="w-5 h-5 text-red-500" />
                        Research Objectives
                      </h4>
                      <ul className="space-y-2">
                        {program.objectives.map((obj, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Project Milestones</h4>
                      <div className="space-y-3">
                        {program.milestones.map((milestone, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className={`w-3 h-3 rounded-full mt-1 ${
                              milestone.status === 'Completed' ? 'bg-green-500' :
                              milestone.status === 'In Progress' ? 'bg-yellow-500' : 'bg-gray-300'
                            }`}></div>
                            <div>
                              <div className="font-medium text-gray-900 text-sm">{milestone.phase}</div>
                              <div className="text-xs text-gray-500">{milestone.date}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-gray-600">Program Leader: </span>
                        <span className="font-medium text-gray-900">{program.leader}</span>
                      </div>
                      <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Impact */}
      <section className="py-16 bg-gradient-to-br from-red-500 to-black text-white">
        <div className="container mx-auto px-6 text-center" data-aos="fade-up">
          <h2 className="text-3xl font-serif mb-6">Research Impact</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our research programs are making significant contributions to the cybersecurity field and protecting organizations worldwide.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-lg">Industry Partnerships</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">200M+</div>
              <div className="text-lg">Systems Protected</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">15</div>
              <div className="text-lg">Patents Filed</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
