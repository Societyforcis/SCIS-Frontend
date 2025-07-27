"use client"

import type React from "react"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import Footer from "../../components/Footer"

const TermsAndConditions: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const sidebarLinks = [
    { title: "Terms and conditions", href: "/terms-conditions", active: true },
    { title: "Privacy policy", href: "/privacy-policy" },
  ]

  return (
    <div>
      {/* Mobile menu button */}
      <button onClick={() => setIsSidebarOpen(true)} className="fixed top-4 left-4 z-40 lg:hidden bg-white p-2 rounded-md shadow-md">
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Sidebar (only for mobile) */}
      {isSidebarOpen && (
        <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r transition-transform duration-300 ease-in-out lg:hidden`}>
          <div className="h-full overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-red-500">Navigation</h2>
              <button onClick={() => setIsSidebarOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav>
              <ul className="space-y-2">
                {sidebarLinks.map((link) => (
                  <li key={link.title}>
                    <a href={link.href} className={`block px-4 py-2 rounded-md hover:bg-gray-100 ${link.active ? "text-blue-600 font-medium" : "text-gray-600"}`}>
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Desktop layout: Sidebar (left) and main content (right) */}
      <div className="min-h-screen mt-10 bg-white hidden lg:flex lg:justify-center">
        <aside className="w-64 p-6">
          <nav>
            <ul className="space-y-2">
              {sidebarLinks.map((link) => (
                <li key={link.title}>
                  <a href={link.href} className={`block px-4 py-2 rounded-md hover:bg-gray-100 ${link.active ? "text-blue-600 font-medium" : "text-gray-600"}`}>
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-4 max-w-4xl">
          <h1 className="text-3xl font-semibold text-gray-800 mb-8">Terms and conditions</h1>
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-red-500 mb-4">1. Scope of application</h2>
              <p className="text-gray-600 leading-relaxed">
                By using the websites of Springer-Verlag GmbH, Heidelberg, Zweigniederlassung der Springer-Verlag GmbH,
                Berlin, of Europaplatz 3, in D-69115 Heidelberg (hereinafter referred to as "Springer Nature" or "we")
                which are available at springernature.com, you expressly agree to the following terms and conditions of
                use without any further declaration being required. Your use of these websites shall in each case be
                governed by the terms and conditions of use provided online at the time of your use. We do not recognise
                any conflicting or differing terms and conditions – unless we have specifically agreed otherwise in
                writing.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-red-500 mb-4">2. Content, offering, liability</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The websites available at springernature.com offer information and products of Springer Nature itself and
                of third parties. To the extent that these originate from third parties, they are identified as such.
                Springer Nature shall only be liable for losses or damage arising from your reliance on information
                contained in such content/information you obtained by using springernature.com if the damage was caused by
                intent or gross negligence of Springer Nature's legal representatives or vicarious agents
                ["Erfüllungsgehilfen"], or if an obligation was breached due to slight negligence the discharge of which
                you could particularly rely on (a "cardinal obligation").
              </p>
              <p className="text-gray-600 leading-relaxed">
                As far as information and products offered by third-party businesses and individuals are concerned (e.g.
                discussion forums), Springer Nature only provides the technical platform. Such content/offers made
                available to you by third parties are property of their respective creators, authors or distributors and
                not of Springer Nature.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-red-500 mb-4">3. Copyright, right of use, content</h2>
              <p className="text-gray-600 leading-relaxed">
                All copyrights, proprietary rights and other third-party rights which are accessed via springernature.com
                remain the sole property of their respective holders and are protected accordingly. Unless otherwise
                stipulated in an individual case, you only have the statutory right to make a small number of copies of
                parts of the content, provided that such copies may only be made and used for personal purposes and it
                must be ensured that all copyright and other proprietary notices and their content are retained.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-red-500 mb-4">4. Availability</h2>
              <p className="text-gray-600 leading-relaxed">
                The availability of our websites at all times is not guaranteed. In particular, the websites may be
                temporarily unavailable for maintenance or technical reasons without this giving rise to any claims
                against us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-red-500 mb-4">5. Data protection</h2>
              <p className="text-gray-600 leading-relaxed">
                Protecting the security and privacy of your personal data is of great importance to Springer Nature. For
                full information on this, please refer to Springer Nature's current Privacy Policy for springernature.com.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-red-500 mb-4">6. Miscellaneous</h2>
              <p className="text-gray-600 leading-relaxed">
                All legal relationships arising from the use of websites available at springernature.com shall be governed
                by the laws of the Federal Republic of Germany.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-red-500 mb-4">7. Severability</h2>
              <p className="text-gray-600 leading-relaxed">
                If any part of these General Terms and Conditions of Use is or becomes invalid, the validity of the
                remainder shall not be affected. The statutory provisions shall then apply instead of the invalid
                provision. The same shall apply if there is any gap in these General Terms and Conditions of Use.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-red-500 mb-4">Out-of-court settlements</h2>
              <p className="text-gray-600 leading-relaxed">
                We do not engage in out-of-court settlements before consumer arbitration bodies.
              </p>
            </section>
          </div>
        </main>
      </div>

      {/* Mobile fallback layout */}
      <div className="min-h-screen bg-white lg:hidden">
        <main className="p-4 max-w-4xl mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 mb-8">Terms and conditions</h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-red-500 mb-4">1. Scope of application</h2>
              <p className="text-gray-600 leading-relaxed">
                By using the websites of Springer-Verlag GmbH, Heidelberg, Zweigniederlassung der Springer-Verlag GmbH,
                Berlin, of Europaplatz 3, in D-69115 Heidelberg (hereinafter referred to as "Springer Nature" or "we")
                which are available at springernature.com, you expressly agree to the following terms and conditions of
                use without any further declaration being required. Your use of these websites shall in each case be
                governed by the terms and conditions of use provided online at the time of your use. We do not recognise
                any conflicting or differing terms and conditions – unless we have specifically agreed otherwise in
                writing.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-red-500 mb-4">2. Content, offering, liability</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The websites available at springernature.com offer information and products of Springer Nature itself and
                of third parties. To the extent that these originate from third parties, they are identified as such.
                Springer Nature shall only be liable for losses or damage arising from your reliance on information
                contained in such content/information you obtained by using springernature.com if the damage was caused by
                intent or gross negligence of Springer Nature's legal representatives or vicarious agents
                ["Erfüllungsgehilfen"], or if an obligation was breached due to slight negligence the discharge of which
                you could particularly rely on (a "cardinal obligation").
              </p>
              <p className="text-gray-600 leading-relaxed">
                As far as information and products offered by third-party businesses and individuals are concerned (e.g.
                discussion forums), Springer Nature only provides the technical platform. Such content/offers made
                available to you by third parties are property of their respective creators, authors or distributors and
                not of Springer Nature.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-red-500 mb-4">3. Copyright, right of use, content</h2>
              <p className="text-gray-600 leading-relaxed">
                All copyrights, proprietary rights and other third-party rights which are accessed via springernature.com
                remain the sole property of their respective holders and are protected accordingly. Unless otherwise
                stipulated in an individual case, you only have the statutory right to make a small number of copies of
                parts of the content, provided that such copies may only be made and used for personal purposes and it
                must be ensured that all copyright and other proprietary notices and their content are retained.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-red-500 mb-4">4. Availability</h2>
              <p className="text-gray-600 leading-relaxed">
                The availability of our websites at all times is not guaranteed. In particular, the websites may be
                temporarily unavailable for maintenance or technical reasons without this giving rise to any claims
                against us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-red-500 mb-4">5. Data protection</h2>
              <p className="text-gray-600 leading-relaxed">
                Protecting the security and privacy of your personal data is of great importance to Springer Nature. For
                full information on this, please refer to Springer Nature's current Privacy Policy for springernature.com.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-red-500 mb-4">6. Miscellaneous</h2>
              <p className="text-gray-600 leading-relaxed">
                All legal relationships arising from the use of websites available at springernature.com shall be governed
                by the laws of the Federal Republic of Germany.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-red-500 mb-4">7. Severability</h2>
              <p className="text-gray-600 leading-relaxed">
                If any part of these General Terms and Conditions of Use is or becomes invalid, the validity of the
                remainder shall not be affected. The statutory provisions shall then apply instead of the invalid
                provision. The same shall apply if there is any gap in these General Terms and Conditions of Use.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-red-500 mb-4">Out-of-court settlements</h2>
              <p className="text-gray-600 leading-relaxed">
                We do not engage in out-of-court settlements before consumer arbitration bodies.
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

export default TermsAndConditions

