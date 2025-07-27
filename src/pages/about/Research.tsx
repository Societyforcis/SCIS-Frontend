import React, { useState, useEffect } from 'react';
// import { ChevronDown, ChevronRight, ArrowRight } from 'lucide-react';
import s1 from "../../components/images/s1.avif";
import s2 from "../../components/images/s2.avif";
import s3 from "../../components/images/s3.avif";



const backgroundImages = [
  `url(${s1})`,
  `url(${s2})`,
  `url(${s3})`,
];

interface ResearchPaper {
  id: number;
  category: string;
  title: string;
  description: string;
  author: string;
  date: string;
  isNew: boolean;
}

const ResearchPage: React.FC = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [perPage, setPerPage] = useState('10');
  const [sortBy, setSortBy] = useState('Latest');

  useEffect(() => {
    // Only keep background image slider functionality
    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const papers: ResearchPaper[] = [
    {
      id: 1,
      category: 'Artificial Intelligence',
      title: 'Intelligent System Approaches to Next-Generation Cybersecurity',
      description: 'Significant financial loss and sensitive data exposure continue to be a significant risk for entities that host systems in the cloud. Identifying if attackers prefer attacking systems hosted in one cloud provider over another could assist architects and engineers in selecting a provider.',
      author: 'James Smith',
      date: 'February 17, 2025',
      isNew: true
    },
    {
      id: 2,
      category: 'Cyber Defense',
      title: 'Persistence Busters: High Impact Methods for Adversary and Threat Detection',
      description: 'Adversary persistence is a cornerstone of modern cyberattacks, allowing attackers to maintain covert access to systems and evade detection over extended periods. This research investigates the top persistence techniques targeting Windows systems as documented in the MITRE ATT&CK framework.',
      author: 'Clark Crisp',
      date: 'February 7, 2025',
      isNew: false
    },
    {
      id: 3,
      category: 'Digital Forensics, Incident Response & Threat Hunting',
      title: 'Hunting the Hound of Hades: Kerberos Delegation Attacks, Detections and Defenses',
      description: 'When misconfigured, Kerberos delegation in an Active Directory environment can lead to complete domain compromise. From its initial inclusion in Windows 2000 Server to its current implementation in Windows Server 2023, the Kerberos protocol has undergone refinements and design updates to harden its security.',
      author: 'Ben Boyle',
      date: 'December 23, 2024',
      isNew: false
    },
    {
      id: 4,
      category: 'Cyber Defense, Security Awareness',
      title: 'Revolutionizing Enterprise Security: The Exciting Future of Passkeys Beyond Passwords',
      description: 'As digital threats grow increasingly sophisticated, traditional password-based authentication systems are proving inadequate, leaving enterprises vulnerable to phishing, credential stuffing, and other cyberattacks. In response, passkeys built on public key cryptography are emerging as a robust solution.',
      author: 'Rich Greene',
      date: 'December 23, 2024',
      isNew: false
    },
    {
      id: 5,
      category: 'Artificial Intelligence (AI)',
      title: 'AI-Powered Threat Detection: Leveraging Machine Learning for Advanced Persistent Threat Detection',
      description: 'This research explores the implementation of artificial intelligence and machine learning algorithms in identifying and responding to Advanced Persistent Threats (APTs). The study demonstrates how AI can enhance traditional security measures and provide early warning systems for sophisticated cyber attacks.',
      author: 'Sarah Chen',
      date: 'February 15, 2025',
      isNew: true
    },
    {
      id: 6,
      category: 'Industrial Control Systems Security',
      title: 'Securing Critical Infrastructure: Modern Approaches to ICS/SCADA Security',
      description: 'Industrial Control Systems (ICS) and SCADA environments face unique cybersecurity challenges. This paper presents innovative approaches to securing these critical systems while maintaining operational efficiency and addressing the constraints of legacy infrastructure.',
      author: 'Michael Rodriguez',
      date: 'February 10, 2025',
      isNew: true
    },
    {
      id: 7,
      category: 'Offensive Operations, Pen Testing, and Red Teaming',
      title: 'Advanced Red Team Tactics: Emulating Sophisticated Threat Actors',
      description: 'This research details advanced red team methodologies that effectively emulate current threat actor tactics, techniques, and procedures (TTPs). The paper provides insights into conducting meaningful security assessments that help organizations prepare for real-world attacks.',
      author: 'Alexandra Kim',
      date: 'February 1, 2025',
      isNew: false
    },
    {
      id: 8,
      category: 'Cybersecurity Leadership',
      title: 'Building Resilient Security Programs: A Framework for CISOs',
      description: 'This comprehensive study provides security leaders with a framework for developing and maintaining resilient cybersecurity programs. It addresses challenges in resource allocation, risk management, and security culture development in modern enterprises.',
      author: 'David Thompson',
      date: 'January 28, 2025',
      isNew: false
    },
    {
      id: 9,
      category: 'Cybersecurity and IT Essentials',
      title: 'Zero Trust Architecture: Implementation Strategies and Challenges',
      description: 'As organizations move away from traditional perimeter-based security models, this research examines practical strategies for implementing Zero Trust Architecture. The paper addresses common challenges and provides solutions for various organizational contexts.',
      author: 'Lisa Wong',
      date: 'January 15, 2025',
      isNew: false
    },
    {
      id: 10,
      category: 'Cybersecurity Insights',
      title: 'The Economics of Cybersecurity: Analyzing the Cost-Benefit of Security Controls',
      description: 'This research provides a quantitative analysis of cybersecurity investments and their returns. It helps organizations make data-driven decisions about security spending and resource allocation based on risk assessment and potential impact.',
      author: 'Robert Martinez',
      date: 'January 5, 2025',
      isNew: false
    }
];

  const categories = [
    'Artificial Intelligence (AI)',
    'Cloud Security',
    'Cyber Defense',
    'Cybersecurity and IT Essentials',
    'Cybersecurity Insights',
    'Cybersecurity Leadership',
    'Digital Forensics, Incident Response & Threat Hunting',
    'Industrial Control Systems Security',
    'Offensive Operations, Pen Testing, and Red Teaming',
    'Security Awareness'
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[400px] text-white"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), ${backgroundImages[currentBgIndex]}`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background 1s ease-in-out'
        }}
      >
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-6">Society for Cyber Intelligent Systems Research Papers</h1>
            <p className="text-lg max-w-3xl">
              Advancing the field of intelligent cybersecurity through groundbreaking research in AI, machine learning, and adaptive security systems.
            </p>
            <button 
              className="mt-6 border border-white px-6 py-2 hover:bg-white hover:text-gray-900 transition-colors"
            >
              Learn about the Master's Degree Program
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <h2 className="text-xl font-semibold mb-4">Filters:</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Focus Areas</h3>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <label key={index} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div 
              className="flex justify-end gap-4 mb-6"
            >
              <select
                value={perPage}
                onChange={(e) => setPerPage(e.target.value)}
                className="border rounded px-3 py-1"
              >
                <option>10 per page</option>
                <option>20 per page</option>
                <option>50 per page</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded px-3 py-1"
              >
                <option>Latest</option>
                <option>Oldest</option>
                <option>Most Popular</option>
              </select>
            </div>

            {/* Papers Grid */}
            <div className="space-y-8">
              {papers.map((paper, index) => (
                <div 
                  key={paper.id} 
                  className="border-b pb-8 hover:shadow-lg hover:border-red-500 transition-all duration-300 p-4 rounded-lg"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {paper.isNew && (
                      <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">New</span>
                    )}
                    <span className="text-red-800 text-sm">{paper.category}</span>
                    <span className="text-gray-500 text-sm">• {paper.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{paper.title}</h3>
                  <p className="text-gray-600 mb-4">{paper.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{paper.author}</span>
                    <button className="text-red-800 hover:text-red-600 flex items-center gap-1">
                      Read More <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div 
              className="flex items-center justify-center gap-2 mt-8"
            >
              <button className="px-3 py-1 border rounded hover:bg-gray-50">First</button>
              <button className="px-3 py-1 border rounded bg-red-800 text-white">1</button>
              <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
              <button className="px-3 py-1 border rounded hover:bg-gray-50">3</button>
              <span>...</span>
              <button className="px-3 py-1 border rounded hover:bg-gray-50">Last</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchPage;