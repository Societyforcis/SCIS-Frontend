"use client"

import React, { useState } from "react"
import { Menu, X } from "lucide-react"
import Footer from "../../components/Footer"

const PrivacyPolicy: React.FC = () => {
  const [showChat, setShowChat] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const sidebarLinks = [
    { title: "Terms and conditions", href: "/terms-conditions" },
    { title: "Privacy policy", href: "/privacy-policy", active: true }
  ]

  return (
    <div>
      {/* Mobile menu button */}
      <button onClick={() => setIsSidebarOpen(true)} className="fixed top-4 left-4 z-40 lg:hidden bg-white p-2 rounded-md shadow-md">
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-y-0 left-0 z-30 w-64 bg-white border-r transition-transform duration-300 ease-in-out lg:hidden">
          <div className="h-full overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-red-500">Navigation</h2>
              <button onClick={() => setIsSidebarOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav>
              <ul className="space-y-2">
                {sidebarLinks.map(link => (
                  <li key={link.title}>
                    <a
                      href={link.href}
                      className={`block px-4 py-2 rounded-md hover:bg-gray-100 ${link.active ? "text-blue-600 font-medium" : "text-gray-600"}`}
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Desktop layout: Sidebar on left and main content on right */}
      <div className="min-h-screen mt-10 bg-white hidden lg:flex lg:justify-center">
        <aside className="w-64 p-6">
          <nav>
            <ul className="space-y-2">
              {sidebarLinks.map(link => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    className={`block px-4 py-2 rounded-md hover:bg-gray-100 ${link.active ? "text-blue-600 font-medium" : "text-gray-600"}`}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-4 max-w-4xl">
          <h1 className="text-3xl font-medium text-center mb-10">PRIVACY POLICY</h1>
          <div className="space-y-6 text-gray-800">
            <p>
              Amar Tea Pvt. Ltd. operates the{" "}
              <a href="#" className="text-red-500 font-medium">
                www.societytea.com
              </a>{" "}
              website, which provides the SERVICEs of selling prints & merchandise.
            </p>

            <p>
              This page is used to inform website visitors regarding our policies with the collection, use, and disclosure
              of Personal Information if anyone decided to use our Service.
            </p>

            <p>
              If you choose to use our Service, then you agree to the collection and use of information in accordance with
              this policy. The Personal Information that we collect are used for providing and improving the Service. We
              will not use or share your information with anyone except as described in this Privacy Policy.
            </p>

            <p>
              The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is
              accessible at, unless otherwise defined in this Privacy Policy.
            </p>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-red-500 mb-2">Information Collection and Use</h2>
              <p>
                In order to provide you with better Service, we may require you to furnish certain personally identifiable
                information, including but not limited to your name, phone number, and postal address. The information that
                we collect will be used to contact or identify you.
              </p>
            </div>

            <div>
              <p>
                We would like to inform you that whenever you visit our Service, we collect information that your browser
                sends to us. This information is called Log Data. The Log Data may include information such as your
                computer's Internet Protocol ("IP") address, browser version, pages of our Service that you visit, the time
                and date of your visit, the time spent on those pages, and other statistics.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-red-500 mb-2">Cookies</h2>
              <p>
                Cookies are files with small amount of data that is commonly used as an anonymous unique identifier. These
                are sent to your browser from the website that you visit and are stored on your computer's hard drive.
              </p>
              <p>
                Our website uses these "cookies" to collect information in order to improve our Service. You have the
                option to either accept or refuse these cookies, and know when a cookie is being sent to your computer.
              </p>
              <p>
                If you choose to refuse our cookies, you may not be able to use some portions of our Service.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-red-500 mb-2">Service Providers</h2>
              <p>We may employ third-party companies and individuals due to the following reasons:</p>
              <ul className="list-disc pl-8 space-y-1">
                <li>To facilitate our Service;</li>
                <li>To provide the Service on our behalf;</li>
                <li>To perform Service-related services; or</li>
                <li>To assist us in analysing how our Service is used.</li>
              </ul>
              <p>
                We would like to inform our Service users that these third parties have access to your Personal Information.
                The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to
                disclose or use the information for any other purpose.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-red-500 mb-2">Links to Other Sites</h2>
              <p>
                Our Service may contain links to other sites. If you click on a third-party link, you will be directed to
                that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to
                review the Privacy Policy of these websites. We have no control over, and assume no responsibility for, the
                content, privacy policies, or practices of any third-party sites or services.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-red-500 mb-2">Children's Privacy</h2>
              <p>
                Our Services do not address anyone under the age of 15. We do not knowingly collect personal identifiable
                information from children under 15. In case we discover that a child under 15 has provided us with personal
                information, we immediately delete said information from our servers. If you are a parent or guardian and
                you are aware that your child has provided us with personal information, please contact us so that we will
                be able to take necessary actions.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-red-500 mb-2">Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for
                such changes. We will notify you of any changes by posting the new Privacy Policy on this page. These
                changes shall be effective immediately, once they are posted on this page.
              </p>
            </div>
          </div>
          {/* WhatsApp Chat Widget */}
          {showChat && (
            <div className="fixed bottom-4 right-4 flex items-center bg-white rounded-lg shadow-lg p-3 pr-4 border border-gray-200">
              <button onClick={() => setShowChat(false)} className="absolute top-1 right-1 text-gray-400 hover:text-gray-600">
                <X size={16} />
              </button>
              <span className="mr-2">Hey, Let's chat!</span>
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile fallback layout */}
      <div className="min-h-screen bg-white lg:hidden">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* ...existing privacy policy content... */}
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy

