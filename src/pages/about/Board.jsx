"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Building, ChevronDown } from "lucide-react"

const boardMembers = [
  {
    name: "Dr. S.V. Manikanthan",
    title: "Founder – Director",
    credentials: "M.E, PhD, B.L.",
    organization: "Society for Cyber Intelligent Systems",
    location: "Puducherry, India - 605004",
    email: "prof.manikanthan@gmail.com",
    phone: "+91-9943371101",
    image: "/src/components/images/manikanthan (1).jpg",
  },
  {
    name: "Dr. Vishnu Kumar Kaliappan",
    title: "Research Professor",
    credentials: "M.Tech., PhD (S.K)",
    organization: "Distributed Multimedia Systems (DMS) Laboratory",
    subOrganization:
      "Konkuk Aerospace Design Airworthiness Institute & School of Computer Science and Engineering, College of Engineering, Konkuk University",
    location: "1, Hwayang-Dong, Gwangjin-Gu, Seoul, Republic of Korea",
    email: ["vishnu@konkuk.ac.kr", "vishnudms@gmail.com"],
    phone: {
      sk: "+82-10-9970-7457",
      ind: "+91-98942-50056",
    },
    image: "/placeholder-profile.jpg",
  },
  {
    name: "Dr. S. Ganesh Kumar",
    title: "Professor",
    credentials: "M.E, PhD",
    organization: "Department of Data Science and Business Systems, School of Computing",
    subOrganization: "SRM Institute of Science and Technology",
    location: "Kattankulathur, 603 203, Tamilnadu, India",
    email: "ganeshk1@srmist.edu.in",
    phone: "+91 9940036090",
    additionalInfo: "Program Coordinator in Blockchain Technology",
    image: "/placeholder-profile.jpg",
  },
  {
    name: "Dr. Swetha Indudhar Goudar",
    title: "Professor / Research Dean",
    credentials: "",
    organization: "Department of MCA",
    subOrganization: "KLS Gogte Institute of Technology",
    location: "Udyambag, Belagavi-590010",
    email: "swetha.goudar@gmail.com",
    phone: "",
    image: "/placeholder-profile.jpg",
  },
  {
    name: "Dr. T. Padmapriya",
    title: "Managing Director",
    credentials: "M.Tech, M.B.A, PhD",
    organization: "Mélange Publications",
    location: "Puducherry, India",
    email: "priyaamelange@gmail.com",
    phone: "+91-9952460159",
    image: "/placeholder-profile.jpg",
  },
  {
    name: "Dr. V. Sakthivel",
    title: "Associate Professor",
    credentials: "",
    organization: "School of Computer Science and Engineering (SCOPE)",
    subOrganization: "Vellore Institute of Technology – Chennai Campus",
    location: "Chennai–600027 Tamil Nadu, India",
    email: ["mvsakthi@gmail.com", "sakthivel.v@vit.ac.in"],
    phone: "",
    image: "/placeholder-profile.jpg",
  },
  {
    name: "Dr. Shanmugam Ramasamy",
    title: "Assistant Professor",
    credentials: "",
    organization: "Computational Insights and Sustainable Research Laboratory (CISRL)",
    subOrganization: "CO2 Research and Green Technologies Centre, Vellore Institute of Technology",
    location: "Vellore, Tamil Nadu 632014, India",
    email: "shanmugam.r@vit.ac.in",
    phone: "",
    image: "/placeholder-profile.jpg",
  },
]

const advisoryBoardMembers = [
  {
    name: "Prof. Ts. Dr. Azham Bin Hussain",
    title: "Dean, School of Computing",
    organization: "School of Computing, Universiti Utara Malaysia",
    location: "06010, UUM Sintok, Kedah, Malaysia",
    phone: "+6012-644 6977",
    email: "azham.h@uum.edu.my",
    image: "/placeholder-profile.jpg",
  },
  {
    name: "Dr. Sam Goundar",
    title: "Senior Lecturer in Information Technology",
    organization: "RMIT University",
    location: "Hanoi, Vietnam",
    phone: "+642109644196",
    email: "sam.goundar@gmail.com",
    image: "/placeholder-profile.jpg",
  },
  {
    name: "Dra. Susana Gómez Martínez",
    title: "",
    organization:
      "Departamento de Filología Inglesa, Facultad de Traducción e Interpretación, Universidad de Valladolid",
    location: "Campus Universitario Duques de Soria, Módulo 3, Dcho. A11, 42004- Soria, Spain",
    image: "/placeholder-profile.jpg",
  },
  {
    name: "Ts. Dr. Tan Kian Lam",
    title: "Associate Professor",
    organization: "Wawasan Open University, Malaysia",
    additionalInfo: [
      "Head of School of Digital Technology, WOU Malaysia",
      "Ambassador of Laboratoire d'Informatique de Grenoble (LIG)",
      "Head of Centre for Research and Innovation, WOU Malaysia",
    ],
    image: "/placeholder-profile.jpg",
  },
  {
    name: "Dugki Min",
    title: "Professor",
    credentials: "Ph.D",
    organization:
      "Distributed Multimedia Systems (DMS) Lab, School of Computer Science and Engineering, College of Engineering, Konkuk University",
    location: "1, Hwayang-Dong, Gwangjin-Gu, Seoul, Republic of Korea",
    email: "dkmin@konkuk.ac.kr",
    image: "/placeholder-profile.jpg",
  },
  {
    name: "Dr. Tuan Anh Nguyen",
    title: "Academic Research Professor (학술연구교수) in Computer Science",
    organization:
      "Konkuk Aerospace Design Airworthiness Institute & School of Computer Science and Engineering, College of Engineering, Konkuk University",
    location: "1, Hwayang-Dong, Gwangjin-Gu, Seoul, Republic of Korea",
    image: "/placeholder-profile.jpg",
  },
  {
    name: "Dr. Agus Budiyono",
    title: "Co-Chairman",
    organization: "Indonesia Center for Technology Empowerment",
    location: "Greater Jakarta Area, Indonesia",
    image: "/placeholder-profile.jpg",
  },
  {
    name: "Dr. Prabhu Ponnandy",
    title: "Research Scientist",
    organization: "University of Michigan",
    location: "Ann Arbor, Michigan, United States",
    image: "/placeholder-profile.jpg",
  },
  {
    name: "Dr Gangadhar Baniekal Hiremath",
    title: "Founder CEO",
    organization: "WASP Autonomous systems",
    location: "Bellari, Karnataka, India",
    image: "/placeholder-profile.jpg",
  },
  {
    name: "Dr. Sujit Jagtap",
    title: "Research Scientist",
    organization: "University of Illinois at Urbana-Champaign",
    location: "Urbana, Illinois, United States",
    image: "/placeholder-profile.jpg",
  },
  {
    name: "Dr. Manish K. Tiwari",
    title: "Senior Scientist with R&D/Process Lead responsibilities",
    organization: "Novonesis",
    location: "Copenhagen, Capital Region of Denmark, Denmark",
    image: "/placeholder-profile.jpg",
  },
  {
    name: "Dr. Sajeesh Kappachery",
    title: "Postdoctoral Fellow",
    organization: "Department of Biology, College of Science, United Arab Emirates University",
    location: "Al Ain, Abu Dhabi, UAE",
    image: "/placeholder-profile.jpg",
  },
  {
    name: "Dr. Madeshwaran Sekkarapatti Ramasamy",
    title: "Research Associate",
    location: "Cambridge, England, United Kingdom",
    image: "/placeholder-profile.jpg",
  },
  {
    name: "Dr. Nitul Kakati",
    title: "Principal Electrochemical Engineer",
    organization: "OCOchem",
    location: "Richland, Washington, United States",
    image: "/placeholder-profile.jpg",
  },
  {
    name: "Dr. Thangadurai Ramu",
    title: "Scientist",
    organization: "Therapure biopharma",
    location: "Mississauga, Ontario, Canada",
    image: "/placeholder-profile.jpg",
  },
  {
    name: "Miradham Kamilov",
    title: "Cloud Engineer",
    organization: "CrowdStrike",
    location: "Vancouver, British Columbia, Canada",
    image: "/placeholder-profile.jpg",
  },
  {
    name: "Dr. Maxim Tyan",
    organization:
      "Konkuk Aerospace Design Airworthiness Institute & School of Computer Science and Engineering, College of Engineering, Konkuk University",
    location: "1, Hwayang-Dong, Gwangjin-Gu, Seoul, Republic of Korea",
    image: "/placeholder-profile.jpg",
  },
  {
    name: "Dr. Rustam Rakhimov",
    title: "Senior Software Engineer",
    organization: "Upgrade, Inc",
    location: "Vancouver, British Columbia, Canada",
    image: "/placeholder-profile.jpg",
  },
  {
    name: "Dr. Mohan Krishna varma",
    title: "Principal Researcher",
    organization: "GS Co., Ltd",
    location: "Yongin, Gyeonggi, South Korea",
    image: "/placeholder-profile.jpg",
  },
  {
    name: "Dr. Sudan Jha",
    title: "Professor",
    organization: "Department of Computer Science and Engineering, Kathmandu University",
    location: "Kavre, Nepal",
    email: ["jhasudan@ieee.org", "sudan.jha@ku.edu.np"],
    image: "/placeholder-profile.jpg",
  },
]

function BoardMembersGrid({ members }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {members.map((member, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="h-48 bg-gray-200 relative overflow-hidden">
            <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-2 left-3 text-white">
              <h3 className="text-lg font-bold leading-tight">{member.name}</h3>
              {member.credentials && <p className="text-xs opacity-90">{member.credentials}</p>}
            </div>
          </div>

          <div className="p-4 space-y-3">
            {member.title && <h4 className="font-bold text-sm text-red-500">{member.title}</h4>}
            {member.organization && (
              <div className="flex items-start gap-2">
                <Building className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                <p className="text-sm text-gray-800">{member.organization}</p>
              </div>
            )}
            {member.location && (
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                <p className="text-xs text-gray-600">{member.location}</p>
              </div>
            )}
            {member.email && (
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                <div>
                  {Array.isArray(member.email) ? (
                    member.email.map((email) => (
                      <a key={email} href={`mailto:${email}`} className="text-xs text-red-500 hover:text-red-600 block">
                        {email}
                      </a>
                    ))
                  ) : (
                    <a href={`mailto:${member.email}`} className="text-xs text-red-500 hover:text-red-600">
                      {member.email}
                    </a>
                  )}
                </div>
              </div>
            )}
            {member.phone && (
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                <div>
                  {typeof member.phone === "object" ? (
                    <>
                      <p className="text-xs text-gray-600">SK: {member.phone.sk}</p>
                      <p className="text-xs text-gray-600">IND: {member.phone.ind}</p>
                    </>
                  ) : (
                    <p className="text-xs text-gray-600">{member.phone}</p>
                  )}
                </div>
              </div>
            )}
            {member.additionalInfo && (
              <div className="text-xs text-gray-600">
                {Array.isArray(member.additionalInfo) ? (
                  member.additionalInfo.map((info, index) => <p key={index}>{info}</p>)
                ) : (
                  <p>{member.additionalInfo}</p>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Board() {
  const [showAllAdvisory, setShowAllAdvisory] = useState(false)
  const displayedAdvisoryMembers = showAllAdvisory ? advisoryBoardMembers : advisoryBoardMembers.slice(0, 6)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Executive Board Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Board of Directors</h1>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet our distinguished board members leading the advancement of cyber intelligent systems
          </p>
        </div>

        <BoardMembersGrid members={boardMembers} />

        {/* Advisory Board Section */}
        <div className="text-center mt-24 mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Advisory Board</h2>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Distinguished professionals providing strategic guidance and expertise
          </p>
        </div>

        <BoardMembersGrid members={displayedAdvisoryMembers} />

        {/* Show More/Less Button */}
        {advisoryBoardMembers.length > 6 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAllAdvisory(!showAllAdvisory)}
              className="inline-flex items-center gap-2 bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-colors"
            >
              {showAllAdvisory ? 'Show Less' : 'Show More Members'}
              <ChevronDown className={`w-5 h-5 transform transition-transform ${showAllAdvisory ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-24 bg-gray-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h3>
          <p className="text-gray-600 mb-6">
            For inquiries about board membership or collaboration opportunities
          </p>
          <a
            href="mailto:info@societycis.org"
            className="inline-flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
          >
            <Mail className="w-5 h-5" />
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}