import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, AlertTriangle, Users, FileText, Settings, ChevronRight, Download, ExternalLink, Globe, Lock, Mail, Smartphone, BookOpen, Bell, Search, Menu } from 'lucide-react';
import img from "../../components/images/ani.avif";

const Policy = () => {
  return (
    <div className="min-h-screen bg-white">
<div className="relative w-full">
  {/* Full-Screen Background Image */}
  <div 
    className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat" 
    style={{ backgroundImage: `url(${img})` }}
  ></div>

  {/* Content with Transparent Background */}
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <div className="max-w-4xl bg-white bg-opacity-80 backdrop-blur-lg p-8 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Cyber Security Policy - Types of Cybersecurity Policies
      </h1>

      <p className="text-lg text-gray-600 mb-8">
        A cyber security policy provides guidance to an organization's employees on how to act to protect the company's sensitive information. Companies commonly have several security policies that cover various topics.
      </p>

      <div className="flex space-x-4 mb-12">
        <Link to="/policy-whitepaper" className="bg-pink-600 text-white px-6 py-3 rounded-md hover:bg-pink-700 flex items-center">
          <Download className="mr-2 h-5 w-5" />
          Download the White paper
        </Link>
        <Link to="/policy-demo" className="border-2 border-pink-600 text-pink-600 px-6 py-3 rounded-md hover:bg-pink-50 flex items-center">
          <ExternalLink className="mr-2 h-5 w-5" />
          Request a Demo
        </Link>
      </div>
    </div>
  </div>
</div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-[1fr_300px] gap-8">
          <div className="space-y-12">
            {/* Importance Section */}
            <section id="importance">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Why Cyber Security Policies Are Important
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Companies face a range of potential threats to their systems and data. Many cyberattacks take advantage of an organization's employees through phishing or social engineering attacks. The rise of remote work has introduced new threats due to BYOD policies.
              </p>
            </section>

            {/* Types Section */}
            <section id="types" className="bg-gray-50 p-8 rounded-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Types of Security Policies</h2>
              <div className="grid gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start">
                    <Lock className="h-6 w-6 text-pink-600 mt-1" />
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold">IT Security Policy</h3>
                      <p className="text-gray-600 mt-2">
                        Defines rules and procedures for protecting the organization against cyber threats, including acceptable use of corporate assets and incident response plans.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-pink-600 mt-1" />
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold">Email Security Policy</h3>
                      <p className="text-gray-600 mt-2">
                        Defines acceptable use of corporate email systems to protect against spam, phishing, and malware while preventing misuse of corporate email.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start">
                    <Smartphone className="h-6 w-6 text-pink-600 mt-1" />
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold">BYOD Policy</h3>
                      <p className="text-gray-600 mt-2">
                        Defines security requirements for personal devices used for work, including endpoint security and VPN requirements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Steps Section */}
            <section id="create">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Create a Cyber Security Policy</h2>
              <div className="grid gap-4">
                {[
                  "Determine the Threat Surface",
                  "Identify Applicable Requirements",
                  "Draft the Policy",
                  "Solicit Feedback",
                  "Train Employees",
                  "Regularly Update the Policy"
                ].map((step, index) => (
                  <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-pink-600 text-white rounded-full mr-4">
                      {index + 1}
                    </div>
                    <span className="text-gray-700 font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center text-red-700 mb-2">
                <AlertTriangle className="h-5 w-5 mr-2" />
                <h3 className="font-semibold">Under Attack?</h3>
              </div>
              <p className="text-sm text-red-600 mb-3">
                Contact our emergency response team immediately.
              </p>
              <Link to="/emergency-support" className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 block text-center">
                Contact Support
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Policy;