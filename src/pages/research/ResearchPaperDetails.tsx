"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Download, Share2, User, Eye, Heart, BookOpen, Calendar, Tag } from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"

interface Author {
  name: string;
  affiliation: string;
  email: string;
}

interface RelatedPaper {
  id: number;
  title: string;
  author: string;
}

interface Paper {
  id: string | undefined;
  title: string;
  authors: Author[];
  category: string;
  date: string;
  abstract: string;
  keywords: string[];
  fullText: string;
  citations: number;
  downloads: number;
  views: number;
  pdfUrl: string;
  relatedPapers: RelatedPaper[];
}

export default function ResearchPaperDetails() {
  const { id } = useParams()
  const [paper, setPaper] = useState<Paper | null>(null)
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    })

    // Mock data based on paper ID
    const paperData: { [key: string]: Paper } = {
      "1": {
        id: id,
        title: "Intelligent System Approaches to Next-Generation Cybersecurity",
        authors: [
          { name: "Dr. James Smith", affiliation: "MIT", email: "jsmith@mit.edu" },
          { name: "Dr. Sarah Chen", affiliation: "Stanford", email: "schen@stanford.edu" }
        ],
        category: "Artificial Intelligence",
        date: "February 17, 2025",
        abstract: "This comprehensive study explores the integration of artificial intelligence and machine learning techniques in developing next-generation cybersecurity systems. The research demonstrates how intelligent systems can adapt to evolving threat landscapes, providing proactive defense mechanisms against sophisticated cyber attacks. Through extensive experimentation and analysis, we present novel approaches that significantly enhance threat detection accuracy and response times.",
        keywords: ["Artificial Intelligence", "Cybersecurity", "Machine Learning", "Threat Detection", "Adaptive Systems"],
        fullText: `
          <h3>1. Introduction</h3>
          <p>The cybersecurity landscape is rapidly evolving, with attackers employing increasingly sophisticated techniques to breach organizational defenses. Traditional security approaches, while effective against known threats, often struggle to identify and respond to novel attack vectors. This research addresses the critical need for adaptive, intelligent security systems that can evolve alongside emerging threats.</p>
          
          <h3>2. Methodology</h3>
          <p>Our research employs a multi-faceted approach combining supervised and unsupervised machine learning techniques. We developed a hybrid model that integrates behavioral analysis, anomaly detection, and predictive analytics to create a comprehensive threat detection system.</p>
          
          <h3>3. Results</h3>
          <p>The experimental results demonstrate significant improvements in threat detection accuracy, with our system achieving a 94.7% detection rate while maintaining a false positive rate below 2.1%. The system showed particular strength in identifying zero-day attacks and advanced persistent threats.</p>
          
          <h3>4. Conclusions</h3>
          <p>This research establishes a foundation for next-generation cybersecurity systems that leverage artificial intelligence to provide adaptive, proactive defense mechanisms. The findings have significant implications for both academic research and practical security implementations.</p>
        `,
        citations: 47,
        downloads: 1250,
        views: 3420,
        pdfUrl: "/papers/intelligent-systems-cybersecurity.pdf",
        relatedPapers: [
          { id: 2, title: "Machine Learning in Threat Detection", author: "Dr. Clark Crisp" },
          { id: 3, title: "Adaptive Security Frameworks", author: "Dr. Ben Boyle" },
          { id: 4, title: "AI-Powered Incident Response", author: "Dr. Rich Greene" }
        ]
      },
      "2": {
        id: id,
        title: "Persistence Busters: High Impact Methods for Adversary and Threat Detection",
        authors: [
          { name: "Dr. Clark Crisp", affiliation: "Carnegie Mellon", email: "ccrisp@cmu.edu" }
        ],
        category: "Cyber Defense",
        date: "February 7, 2025",
        abstract: "Adversary persistence is a cornerstone of modern cyberattacks, allowing attackers to maintain covert access to systems and evade detection over extended periods. This research investigates the top persistence techniques targeting Windows systems as documented in the MITRE ATT&CK framework and presents novel detection methodologies.",
        keywords: ["Persistence", "MITRE ATT&CK", "Windows Security", "Threat Detection", "Adversary Tactics"],
        fullText: `
          <h3>1. Introduction</h3>
          <p>Adversary persistence represents one of the most challenging aspects of modern cybersecurity. Once attackers establish a foothold in a target environment, they employ various techniques to maintain access while avoiding detection.</p>
          
          <h3>2. Persistence Techniques Analysis</h3>
          <p>This study examines the most prevalent persistence techniques used by advanced threat actors, including registry modifications, scheduled tasks, WMI event subscriptions, and service installations.</p>
          
          <h3>3. Detection Methodologies</h3>
          <p>We propose a multi-layered detection approach that combines behavioral analysis, system call monitoring, and machine learning algorithms to identify persistent threats with high accuracy.</p>
          
          <h3>4. Implementation and Results</h3>
          <p>Our detection system was tested against a dataset of known persistence techniques, achieving a 96.3% detection rate with minimal false positives.</p>
        `,
        citations: 23,
        downloads: 890,
        views: 2150,
        pdfUrl: "/papers/persistence-busters.pdf",
        relatedPapers: [
          { id: 1, title: "Intelligent System Approaches to Next-Generation Cybersecurity", author: "Dr. James Smith" },
          { id: 3, title: "Kerberos Delegation Attacks", author: "Dr. Ben Boyle" }
        ]
      }
      // Add more papers as needed
    }

    const mockPaper = paperData[id as string] || paperData["1"]
    setPaper(mockPaper)
  }, [id])

  if (!paper) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading paper details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              {paper.category}
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-600">{paper.date}</span>
          </div>
          <h1 className="text-4xl font-serif mb-6 leading-tight" data-aos="fade-up">
            {paper.title}
          </h1>
          <div className="flex flex-wrap gap-4 mb-6">
            {paper.authors.map((author: Author, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{author.name}</span>
                <span className="text-gray-500 text-sm">({author.affiliation})</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Paper Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Abstract */}
              <div className="bg-blue-50 p-8 rounded-2xl mb-12" data-aos="fade-up">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Abstract</h2>
                <p className="text-gray-700 leading-relaxed">{paper.abstract}</p>
              </div>

              {/* Keywords */}
              <div className="mb-12" data-aos="fade-up">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Keywords</h2>
                <div className="flex flex-wrap gap-2">
                  {paper.keywords.map((keyword: string, index: number) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Full Text */}
              <div className="prose max-w-none" data-aos="fade-up">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Full Text</h2>
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: paper.fullText }}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Actions */}
                <div className="bg-white rounded-2xl p-6 shadow-lg" data-aos="fade-up">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                    <button 
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={`w-full px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                        isBookmarked 
                          ? 'bg-pink-100 text-pink-600 border border-pink-200' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                      {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                    </button>
                    <button className="w-full bg-gray-100 text-gray-600 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </div>

                {/* Statistics */}
                <div className="bg-white rounded-2xl p-6 shadow-lg" data-aos="fade-up">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Paper Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Views</span>
                      </div>
                      <span className="font-medium">{paper.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Download className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Downloads</span>
                      </div>
                      <span className="font-medium">{paper.downloads.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Citations</span>
                      </div>
                      <span className="font-medium">{paper.citations}</span>
                    </div>
                  </div>
                </div>

                {/* Related Papers */}
                <div className="bg-white rounded-2xl p-6 shadow-lg" data-aos="fade-up">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Related Papers</h3>
                  <div className="space-y-3">
                    {paper.relatedPapers.map((relatedPaper: RelatedPaper, index: number) => (
                      <div
                        key={index}
                        className="block p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <h4 className="font-medium text-gray-900 text-sm mb-1">{relatedPaper.title}</h4>
                        <p className="text-gray-600 text-xs">{relatedPaper.author}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
