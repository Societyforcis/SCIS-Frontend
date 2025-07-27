"use client"

import { useEffect } from "react"
import { Download, Calendar, User, Tag, Eye, BookOpen } from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"

export default function ResearchPapers() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    })
  }, [])

  const papers = [
    {
      id: 1,
      title: "AI-Driven Threat Detection in Cloud Environments",
      authors: ["Dr. Sarah Chen", "Prof. Michael Rodriguez"],
      abstract: "This paper explores the application of machine learning algorithms for real-time threat detection in cloud computing environments. Our novel approach demonstrates significant improvements in accuracy while reducing false positives by 40%.",
      category: "AI Security",
      year: 2024,
      downloads: 1250,
      views: 3420,
      citations: 47
    },
    {
      id: 2,
      title: "Quantum-Resistant Cryptography for IoT Devices",
      authors: ["Dr. James Wilson", "Dr. Emily Foster"],
      abstract: "An investigation into post-quantum cryptographic methods suitable for resource-constrained IoT devices. We present lightweight algorithms that maintain security while preserving battery life and processing efficiency.",
      category: "Cryptography",
      year: 2024,
      downloads: 980,
      views: 2150,
      citations: 23
    },
    {
      id: 3,
      title: "Behavioral Analysis of Advanced Persistent Threats",
      authors: ["Prof. David Kumar", "Dr. Lisa Anderson"],
      abstract: "This research analyzes behavioral patterns of APTs using advanced machine learning techniques. Our framework successfully identifies previously unknown attack patterns with 94.7% accuracy.",
      category: "Threat Intelligence",
      year: 2023,
      downloads: 1580,
      views: 4890,
      citations: 65
    },
    {
      id: 4,
      title: "Zero-Trust Architecture Implementation in Enterprise Networks",
      authors: ["Dr. Mark Thompson", "Prof. Angela Martinez"],
      abstract: "A comprehensive study on implementing zero-trust security models in large enterprise environments. We provide practical guidelines and lessons learned from real-world deployments.",
      category: "Network Security",
      year: 2024,
      downloads: 890,
      views: 2340,
      citations: 31
    },
    {
      id: 5,
      title: "Machine Learning Approaches to Malware Detection",
      authors: ["Dr. Robert Kim", "Dr. Jennifer Lee"],
      abstract: "This paper presents novel machine learning techniques for malware detection that achieve 99.2% accuracy on previously unseen samples. Our approach combines static and dynamic analysis methods.",
      category: "Malware Analysis",
      year: 2023,
      downloads: 1340,
      views: 3780,
      citations: 52
    }
  ]

  const categories = ["AI Security", "Cryptography", "Threat Intelligence", "Network Security", "Malware Analysis"]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-500 to-black text-white py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-red-500/50 to-transparent" />
        <div className="container mx-auto px-6 relative" data-aos="fade-up">
          <h1 className="text-5xl font-serif mb-6 leading-tight">Research Papers</h1>
          <p className="text-xl max-w-3xl leading-relaxed">
            Access our comprehensive collection of peer-reviewed research papers on cybersecurity, AI, and intelligent systems.
          </p>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6" data-aos="fade-up">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">150+</div>
              <div className="text-gray-600">Published Papers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">50,000+</div>
              <div className="text-gray-600">Total Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">200+</div>
              <div className="text-gray-600">Contributing Authors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">15</div>
              <div className="text-gray-600">Research Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Papers */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16" data-aos="fade-up">
            Featured Research Papers
          </h2>
          <div className="grid gap-8">
            {papers.map((paper, index) => (
              <div
                key={paper.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                        {paper.category}
                      </span>
                      <span className="text-gray-500 text-sm">{paper.year}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{paper.title}</h3>
                    <div className="flex items-center gap-4 text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{paper.authors.join(", ")}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-4">{paper.abstract}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{paper.views.toLocaleString()} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span>{paper.downloads} downloads</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{paper.citations} citations</span>
                    </div>
                  </div>
                  <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16" data-aos="fade-up">
            Research Categories
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center cursor-pointer"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h3 className="font-bold text-gray-900 mb-2">{category}</h3>
                <p className="text-sm text-gray-600">{Math.floor(Math.random() * 20) + 5} papers</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
