"use client"

import { useEffect } from "react"
import { motion } from "framer-motion" 
import { useNavigate } from 'react-router-dom' // Replace useRouter with useNavigate
import AOS from "aos"
import "aos/dist/aos.css"
import { Award, BookOpen, Users, Microscope, Lightbulb, GraduationCap, LucideIcon, Shield, Brain, Search } from "lucide-react"
import medal from "./images/medals.avif";
import ani from "./images/ani.avif"
import research from "./images/research.avif"

interface Card {
  title: string
  description: string
  icon: LucideIcon
  image: string
  route: string
}

interface CardProps {
  card: Card
  index: number
}


const cards: Card[] = [
  {
    title: "Cybersecurity Awards",
    description: "Recognizing excellence in cyber intelligence and security innovations for 2025.",
    icon: Award,
    image: medal,
    route: "/awards"
  },
  {
    title: "AI Summit Day",
    description: "Annual gathering showcasing breakthroughs in artificial intelligence and cyber systems.",
    icon: Users,
    image: ani,
    route: "/anniversary-day"
  },
  {
    title: "Tech Innovation Series",
    description: "Explore cutting-edge knowledge in cyber-physical systems and security architecture.",
    icon: BookOpen,
    image: research,
    route: "/science-book-prize"
  },
  {
    title: "Research & Development",
    description: "Advancing the frontiers of intelligent systems and cybersecurity.",
    icon: Microscope,
    image: research,
    route: "/research-initiatives"
  },
  {
    title: "Innovation Lab",
    description: "Creating next-generation cyber intelligence solutions.",
    icon: Lightbulb,
    image: medal,
    route: "/innovation-hub"
  },
  {
    title: "Training Programs",
    description: "Developing future leaders in cyber intelligence and AI systems.",
    icon: GraduationCap,
    image: ani,
    route: "/education-programs"
  },
]

const services = [
  {
    title: "Cybersecurity Consulting",
    description: "Expert guidance on securing your digital assets and infrastructure.",
    icon: Shield,
    route: "/services/consulting"
  },
  {
    title: "AI & ML Solutions",
    description: "Custom artificial intelligence and machine learning solutions for your business.",
    icon: Brain,
    route: "/services/ai-solutions"
  },
  {
    title: "Security Training",
    description: "Comprehensive training programs for cybersecurity professionals.",
    icon: GraduationCap,
    route: "/services/training"
  },
  {
    title: "Research Collaboration",
    description: "Partner with us on cutting-edge cybersecurity research projects.",
    icon: Microscope,
    route: "/services/research"
  },
  {
    title: "Threat Intelligence",
    description: "Real-time threat monitoring and intelligence reporting.",
    icon: Lightbulb,
    route: "/services/intelligence"
  },
  {
    title: "Digital Forensics",
    description: "Advanced digital forensics and incident response services.",
    icon: Search,
    route: "/services/forensics"
  }
]

export default function FeaturedCards() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    })
  }, [])

  const navigate = useNavigate() // Replace useRouter with useNavigate
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    target.src = "/fallback-image.jpg"
    target.onerror = null
  }

  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-xl md:text-3xl font-bold text-center mb-12 text-gray-900"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Featured Highlights
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((card, index) => (
              <Card key={index} card={card} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* New Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-xl md:text-3xl font-bold text-center mb-12 text-gray-900"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Services
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                <motion.button
                  className="mt-4 text-red-500 font-bold group flex items-center"
                  whileHover={{ x: 5 }}
                  onClick={() => navigate(service.route)}
                >
                  Learn more
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1,
                      ease: "easeInOut" 
                    }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function Card({ card, index }: CardProps) {
  const navigate = useNavigate() // Replace useRouter with useNavigate
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    target.src = "/fallback-image.jpg"
    target.onerror = null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.5,
      }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden"> {/* Fixed height class */}
        <motion.img
          src={card.image}
          alt={card.title}
          onError={handleImageError}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <card.icon className="h-12 w-12 text-white drop-shadow-lg" />
        </motion.div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900">
          {card.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {card.description}
        </p>
        <motion.button
          className="mt-4 text-red-500 font-bold group flex items-center"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
          onClick={() => navigate(card.route)} // Replace router.push with navigate
        >
          Learn more
          <motion.span
            className="ml-2"
            animate={{ x: [0, 3, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 1,
              ease: "easeInOut" 
            }}
          >
            →
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  )
}

// Add to your global CSS file
const styles = `
  .cyber-glitch-text {
    text-shadow: 
      0.05em 0 0 rgba(255,0,0,0.75),
      -0.025em -0.05em 0 rgba(0,255,0,0.75),
      0.025em 0.05em 0 rgba(0,0,255,0.75);
    animation: cyber-glitch 500ms infinite;
  }

  @keyframes cyber-glitch {
    0% {
      text-shadow: 
        0.05em 0 0 rgba(255,0,0,0.75),
        -0.05em -0.025em 0 rgba(0,255,0,0.75),
        -0.025em 0.05em 0 rgba(0,0,255,0.75);
    }
    15% {
      text-shadow: 
        -0.05em -0.025em 0 rgba(255,0,0,0.75),
        0.025em 0.025em 0 rgba(0,255,0,0.75),
        -0.05em -0.05em 0 rgba(0,0,255,0.75);
    }
    50% {
      text-shadow: 
        0.025em 0.05em 0 rgba(255,0,0,0.75),
        0.05em 0 0 rgba(0,255,0,0.75),
        0 -0.05em 0 rgba(0,0,255,0.75);
    }
    100% {
      text-shadow: 
        -0.025em 0 0 rgba(255,0,0,0.75),
        -0.025em -0.025em 0 rgba(0,255,0,0.75),
        -0.025em -0.05em 0 rgba(0,0,255,0.75);
    }
  }
`