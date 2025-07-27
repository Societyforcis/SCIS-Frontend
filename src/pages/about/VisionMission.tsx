import { Target, Brain, Users, BookOpen, Building, Globe, Shield, Share2, Video } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Objectives() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-gray-900 to-black text-white py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b')] opacity-20 bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent" />
        <div className="container mx-auto px-6 relative">
          <h1 className="text-6xl font-serif mb-8 leading-tight text-red-500">Our Vision & Mission</h1>
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-serif mb-4">Vision</h2>
            <p className="text-xl leading-relaxed mb-8">
              The Vision of the society is to be a global leader in advancing cybersecurity and intelligent systems by fostering innovation, research, and collaboration, ensuring a secure and resilient digital future for all.
            </p>
            <h2 className="text-3xl font-serif mb-4">Mission</h2>
            <p className="text-xl leading-relaxed">
              The primary mission is to advance cybersecurity and intelligent systems by promoting cutting-edge technologies like AI and machine learning, fostering research in cyber intelligence, and enhancing threat detection and mitigation strategies. We are committed to organizing training programs, workshops, and awareness campaigns to educate professionals and the public on best practices. Through the publication of research journals, international collaborations, and strategic partnerships with academic institutions, industries, and government agencies, we aim to strengthen the global cybersecurity ecosystem. Upholding ethical AI practices, disseminating practical knowledge, and hosting national and international conferences, we strive to create a secure, innovative, and resilient digital future.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16">Strategic Objectives</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {objectives.map((objective, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2"
              >
                <div className="bg-red-500 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  {objective.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{objective.title}</h3>
                <p className="text-gray-600 leading-relaxed">{objective.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/5 text-black py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-serif mb-8">Join Our Mission</h2>
            <p className="text-xl mb-12 leading-relaxed">
              Be part of a global initiative to shape the future of cybersecurity and intelligent systems. Together, we can build a more secure and resilient digital world.
            </p>
            <Link 
              to="/membership-form" 
              className="bg-white text-gray-900 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors shadow-lg font-medium inline-block"
            >
              Become a Member
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

const objectives = [
  {
    icon: <Target className="w-6 h-6 text-white" />,
    title: "Technology Advancement",
    description: "Promote cutting-edge technologies like AI and machine learning to enhance digital security and intelligence capabilities."
  },
  {
    icon: <Brain className="w-6 h-6 text-white" />,
    title: "Research Excellence",
    description: "Foster groundbreaking research in cyber intelligence, threat detection, and mitigation strategies."
  },
  {
    icon: <Users className="w-6 h-6 text-white" />,
    title: "Professional Development",
    description: "Organize comprehensive training programs, workshops, and awareness campaigns on cybersecurity best practices."
  },
  {
    icon: <BookOpen className="w-6 h-6 text-white" />,
    title: "Knowledge Dissemination",
    description: "Publish research journals and facilitate knowledge sharing in practical applications of cyber intelligence."
  },
  {
    icon: <Building className="w-6 h-6 text-white" />,
    title: "Strategic Partnerships",
    description: "Establish strong collaborations with academic institutions, industries, and government agencies."
  },
  {
    icon: <Globe className="w-6 h-6 text-white" />,
    title: "Global Collaboration",
    description: "Participate in international initiatives to strengthen global cybersecurity frameworks and intelligence sharing."
  },
  {
    icon: <Shield className="w-6 h-6 text-white" />,
    title: "Ethical AI Practice",
    description: "Ensure the responsible and ethical use of AI in cybersecurity to protect privacy and maintain integrity."
  },
  {
    icon: <Share2 className="w-6 h-6 text-white" />,
    title: "Knowledge Exchange",
    description: "Disseminate practical knowledge and insights in cyber intelligence applications."
  },
  {
    icon: <Video className="w-6 h-6 text-white" />,
    title: "Professional Events",
    description: "Host national and international conferences, seminars, and symposiums for cybersecurity experts."
  }
]