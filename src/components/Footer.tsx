import { useState } from "react"
import { motion } from "framer-motion"
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  ChevronRight,
  Mail,
} from "lucide-react"
import logo from "./images/lo.png"

const footerLinks = {
  Company: [
    { label: "Home", href: "/" },
    { label: "Overview", href: "/overview" },
    { label: "Our Team", href: "/our-team" },
    { label: "Vision & Mission", href: "/vision-mission" },
    { label: "Board", href: "/board" },
  ],
  Services: [
    { label: "Research", href: "/research" },
    { label: "Technology", href: "/technology" },
    { label: "Solutions", href: "/solutions" },
    { label: "Awards", href: "/awards" },
  ],
  Governance: [
    { label: "MOU", href: "/mou" },
    { label: "Policies", href: "/policies" },
    { label: "Reports", href: "/reports" },
  ],
  Support: [
/*     { label: "Help", href: "/help" }, */
    { label: "carrier", href: "/carrier" },
    { label: "Contact", href: "/contact" },
    { label: "Events", href: "/events" },
    { label: "FDP", href: "/fdp" },
    { label: "Subscribe", href: "/subscribe" },
  ],
}

const socialIcons = [
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Youtube, href: "#", label: "YouTube" },
  { Icon: Mail, href: "#", label: "Email Newsletter" },
]

export default function Footer() {
  const [hoveredLink, setHoveredLink] = useState("")
  const currentYear = new Date().getFullYear()

  // Animation variants for consistent animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: custom * 0.1 },
    }),
  }

  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 relative overflow-hidden">
      {/* Background pattern for added visual interest */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0 bg-grid-gray-800/[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ddd 1px, transparent 1px), linear-gradient(to bottom, #ddd 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-12 md:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 xl:gap-12">
          {/* Logo and company description section */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={0}
          >
            <img
              src={logo}
              alt="Society for Cyber Intelligent System Logo"
              className="h-14 sm:h-16 w-auto mb-4 transition-transform duration-300 hover:scale-105"
            />
            <p className="text-gray-600 text-sm leading-relaxed max-w-md">
              Advancing the frontiers of cyber intelligence through research,
              innovation, and collaboration to build a secure digital future.
            </p>

            <div className="pt-4">
              <h4 className="text-sm font-bold text-gray-800 mb-3">
                Follow us
              </h4>
              <div className="flex flex-wrap gap-4">
                {socialIcons.map(({ Icon, href, label }, index) => (
                  <motion.a
                    key={index}
                    href={href}
                    aria-label={label}
                    className="text-gray-500 hover:text-red-500 transition-colors duration-300"
                    whileHover={{
                      scale: 1.15,
                      filter:
                        "drop-shadow(0 0 4px rgba(239, 68, 68, 0.4))",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Footer Links - Responsive grid layout */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              className="lg:col-span-1"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              custom={index + 1}
            >
              <h3 className="text-base font-bold mb-4 text-gray-800 border-b border-gray-200 pb-2">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-gray-600 hover:text-red-500 transition-all duration-200 text-sm group flex items-center"
                      onMouseEnter={() => setHoveredLink(label)}
                      onMouseLeave={() => setHoveredLink("")}
                    >
                      <ChevronRight
                        className={`h-3.5 w-3.5 mr-1.5 transition-all duration-200 ease-in-out ${
                          hoveredLink === label
                            ? "opacity-100 translate-x-0 text-red-500"
                            : "opacity-0 -translate-x-2"
                        }`}
                      />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom section with copyright and additional info */}
        <motion.div
          className="mt-12 pt-6 border-t border-gray-200 text-center sm:text-left"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          custom={6}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            <p className="text-xs sm:text-sm text-gray-600">
              © {new Date().getFullYear()} Society for Cyber Intelligent Systems. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs text-gray-500">
              <a
                href="/privacy-policy"
                className="hover:text-red-500 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-conditions"  // Updated to use the correct route for Terms and Conditions
                className="hover:text-red-500 transition-colors"
              >
                Terms and Conditions
              </a>
              <a
                href="/sitemap"
                className="hover:text-red-500 transition-colors"
              >
                Sitemap
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}