"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { scrollToTop } from '../../utils/scrollUtils'
import { ArrowRight, Search } from 'lucide-react'
import image1 from "../../components/images/13.jpg"
import image2 from "../../components/images/11.jpg"
import image3 from "../../components/images/12.jpg"
import image4 from "../../components/images/TCIA_page-0001.jpg"
import image5 from "../../components/images/JSCCD_page-0001.jpg"
import image6 from "../../components/images/JBFTT_page-0001.jpg"
import image7 from "../../components/images/JMCVS_page-0001.jpg"
import image8 from "../../components/images/JAICRSS_page-0001.jpg"

export default function Journals() {
  const [searchQuery, setSearchQuery] = useState("")

  const journals = [
    {
      id: 1,
      title: "International Journal for Cyber Intelligent Systems (IJCIS)",
      description: "Cyber Security",
  /*  volume: "Vol. 3, No. 2",
      date: "June 2024",  */
      link: "https://ijcis.societycis.org/index.php/ijcis",
      coverImage: image1
    },
    {
      id: 2,
      title: "International Journal of Emerging Trends in Computer and Communication (IJETCC)",
      description: "Computer Applications",
   /* volume: "Vol. 3, No. 1",
      date: "March 2024",  */
      link: "https://ijetcc.societycis.org/index.php/ijetcc",
      coverImage: image2
    },
    {
      id: 3,
      title: "International Journal of AI for Science, Engineering, and Society (IJAISES)",
      description: "Artificial Intelligence",
   /* volume: "Vol. 2, No. 4",
      date: "December 2023",   */
      link: "https://ijaises.societycis.org/index.php/ijaises",
      coverImage: image3
    },
    {
      id: 4,
      title: "Transactions on Cyber Intelligence and Automation (TCIA)",
      description: "Cyber Intelligence and Automation",
      link: "https://tcia.societycis.org/index.php/tcia",
      coverImage: image4
    },
    {
      id: 5,
      title: "Journal of Smart Computing and Cyber Defense (JSCCD)",
      description: "Smart Computing and Cyber Defense",
      link: "https://jsccd.societycis.org/index.php/jsccd",
      coverImage: image5
    },
    {
      id: 6,
      title: "Journal of Blockchain Forensics and Trust Technologies (JBFTT)",
      description: "Blockchain Forensics",
      link: "https://jbftt.societycis.org/index.php/jbftt",
      coverImage: image6
    },
    {
      id: 7,
      title: "Journal of Metaverse Computing and Virtual Society (JMCVS)",
      description: "Metaverse Computing and Virtual Society",
      link: "https://jmcvs.societycis.org/index.php/jmcvs",
      coverImage: image7
    },
    {
      id: 8,
      title: "Journal of Artificial Intelligence for Climate Resilience and Sustainable Systems (JAICRSS)",
      description: "Artificial Intelligence for Climate Resilience and Sustainable Systemsy",
      link: "https://jaicrss.societycis.org/index.php/jaicrss",
      coverImage: image8
    },
  ]

  const filteredJournals = journals.filter(journal =>
    journal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    journal.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-[#2d3436] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Our Journals
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl max-w-2xl mx-auto"
          >
            Explore our collection of peer-reviewed publications in cyber intelligence and related fields.
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Search Box */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search journals..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Journal List */}
        <div className="grid grid-cols-1  gap-8">
          {filteredJournals.map((journal) => (
            <motion.div
              key={journal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col sm:flex-row h-full">
                {/* Image Section */}
                <div className=" w-80 bg-gray-100 p-4 flex items-center justify-center">
                  <img
                    src={journal.coverImage}
                    alt={journal.title}
                    className="w-full h-64 object-contain transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.onerror = null
                      target.src = "/images/journal-placeholder.jpg"
                    }}
                  />
                </div>

                {/* Info Section */}
                <div className=" w-full p-12 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{journal.title}</h3>
                    <p className="text-gray-600 mb-2">{journal.description}</p>
                    <div className="text-sm text-gray-500 mb-4">
                      <span>{journal.volume}</span> <span className="mx-2">{/* • */}</span> <span>{journal.date}</span>
                    </div>
                  </div>
                  <div>
                    <a
                      href={journal.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={scrollToTop}
                      className="mt-2 inline-flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      <ArrowRight className="h-4 w-4 mr-2" />
                      View Journal
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredJournals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No journals found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
