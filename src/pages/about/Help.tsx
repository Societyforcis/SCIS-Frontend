import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Shield, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  Share2, 
  Facebook, 
  Linkedin, 
  Mail, 
  Twitter,
  Users,
  Building,
  Building2,
  Landmark
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface ExpandableSection {
  title: string;
  content?: string;
  isExpanded: boolean;
}

const Help: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 200,
      once: true,
    });
  }, []);

  const [sections, setSections] = useState<ExpandableSection[]>([
    { title: 'Defamatory content', isExpanded: false },
    { title: 'Preventing cybercrime', isExpanded: false },
    { title: 'Common cyber threats', isExpanded: false },
    { title: "ASD's ACSC Alert Service", isExpanded: false },
    { title: "ASD's Cyber Security Partner Program", isExpanded: false },
    { title: 'Learn cyber security', isExpanded: false },
    { title: 'Small Business Cyber Security Guide', isExpanded: false },
    { title: 'Essential Eight', isExpanded: false },
    { title: 'Have I been Pwned?', isExpanded: false },
    { title: 'Scams', isExpanded: false },
    { title: 'Spam phone calls, emails or text messages', isExpanded: false },
    { title: 'Have you been hacked?', isExpanded: false },
    { title: 'Cyberbullying and illegal, inappropriate or offensive online content', isExpanded: false },
    { title: 'Child exploitation or grooming', isExpanded: false },
    { title: 'Responding to data breaches and identity theft', isExpanded: false },
    { title: 'Fraudulent or misleading content from an Australian business', isExpanded: false },
    { title: 'Financial misconduct or misconduct of an Australian company', isExpanded: false },
    { title: 'Mishandling of personal details by a government agency or private organisation', isExpanded: false },
    { title: 'Discrimination or human rights concerns', isExpanded: false },
    { title: 'Defamatory content', isExpanded: false }
  ]);

  const toggleSection = (index: number) => {
    setSections(sections.map((section, i) => ({
      ...section,
      isExpanded: i === index ? !section.isExpanded : section.isExpanded
    })));
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center mb-12" data-aos="fade-down">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Cybercrime Support Center</h1>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg">
            Get immediate assistance and resources to protect against cyber threats
          </p>
        </div>

        {/* Metadata */}
        <div className="text-gray-500 mb-8 flex justify-center gap-8" data-aos="fade-up">
          <p className="flex items-center gap-2">
            <span className="text-red-500">•</span> First published: 17 Nov 2021
          </p>
          <p className="flex items-center gap-2">
            <span className="text-red-500">•</span> Last updated: 11 Apr 2023
          </p>
        </div>

        {/* Content Written For Section */}
        <div className="bg-gray-50 rounded-xl p-8 mb-8 shadow-lg" data-aos="fade-up">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Shield className="text-red-500" />
            Content written for
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {audiences.map((audience, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 bg-white p-4 rounded-lg hover:shadow-md transition-all cursor-pointer border border-gray-100"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <audience.icon className="w-6 h-6 text-red-500" />
                <span className="text-gray-700">{audience.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Support Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {emergencyContacts.map((contact, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <contact.icon className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{contact.title}</h3>
              <p className="text-red-500 font-bold text-lg">{contact.number}</p>
              <p className="text-gray-600 mt-2">{contact.description}</p>
            </div>
          ))}
        </div>

        {/* Expandable Sections */}
        <div className="space-y-4" data-aos="fade-up">
          {sections.map((section, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-800 font-medium">{section.title}</span>
                {section.isExpanded ? 
                  <ChevronUp className="text-red-500" /> : 
                  <ChevronDown className="text-red-500" />
                }
              </button>
              {section.isExpanded && (
                <div className="px-6 pb-6 text-gray-600 animate-slideDown bg-gray-50">
                  <p>Detailed information about {section.title} goes here...</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Social Share Section */}
        <div className="mt-12 flex flex-col items-center gap-4" data-aos="fade-up">
          <span className="text-gray-700 font-medium">Share this resource</span>
          <div className="flex gap-4">
            {socialIcons.map((social, index) => (
              <button 
                key={index}
                className="p-3 bg-gray-50 hover:bg-red-500 hover:text-white rounded-full transition-all shadow-sm"
              >
                <social.icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Add these new constant arrays
const audiences = [
  { name: 'Individuals & families', icon: Users },
  { name: 'Small & medium business', icon: Building },
  { name: 'Large organisations', icon: Building2 },
  { name: 'Government', icon: Landmark }
];

const emergencyContacts = [
  {
    icon: Phone,
    title: 'Emergency',
    number: '000',
    description: 'For life-threatening situations'
  },
  {
    icon: Shield,
    title: 'Police Assistance',
    number: '131 444',
    description: 'For non-emergency situations'
  },
  {
    icon: AlertTriangle,
    title: 'Crimestoppers',
    number: '1800 333 000',
    description: 'Anonymous reporting'
  }
];

const socialIcons = [
  { icon: Twitter },
  { icon: Facebook },
  { icon: Linkedin },
  { icon: Mail }
];

export default Help;