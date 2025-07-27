import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, Shield, AlertTriangle, Lock, Search, 
  Server, Database, Smartphone, Cloud, ChevronRight, Calendar, Clock, ArrowRight, Users 
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const SecurityAssessment: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const [formData, setFormData] = useState({
    organizationName: '',
    contactName: '',
    email: '',
    phone: '',
    industry: '',
    companySize: '',
    assessmentType: '',
    preferredDate: '',
    comments: '',
    agreement: false
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    setSubmitted(true);
  };

  const assessmentTypes = [
    {
      title: 'Network Vulnerability Assessment',
      description: 'Comprehensive scanning and analysis of your network infrastructure to identify security gaps.',
      icon: Server,
      benefits: [
        'Identify open ports and services',
        'Detect misconfigurations',
        'Analyze firewall effectiveness',
        'Map network topology vulnerabilities'
      ]
    },
    {
      title: 'Application Security Testing',
      description: 'In-depth analysis of web and mobile applications for security flaws and vulnerabilities.',
      icon: Search,
      benefits: [
        'Detect SQL injection vulnerabilities',
        'Identify XSS attack vectors',
        'Assess authentication mechanisms',
        'Review API security'
      ]
    },
    {
      title: 'Cloud Security Assessment',
      description: 'Evaluate your cloud environment against security best practices and compliance requirements.',
      icon: Cloud,
      benefits: [
        'Analyze IAM configurations',
        'Review data protection measures',
        'Assess container security',
        'Evaluate cloud network controls'
      ]
    },
    {
      title: 'Mobile Security Assessment',
      description: 'Evaluate the security posture of your mobile applications and device management policies.',
      icon: Smartphone,
      benefits: [
        'Code security analysis',
        'Runtime behavior monitoring',
        'Data storage security review',
        'API communication testing'
      ]
    },
    {
      title: 'Data Security Assessment',
      description: 'Comprehensive review of data protection measures across your organization.',
      icon: Database,
      benefits: [
        'Data classification review',
        'Encryption implementation analysis',
        'Access control evaluation',
        'Data loss prevention assessment'
      ]
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Initial Consultation',
      description: 'We begin with a detailed discussion to understand your organization, infrastructure, and specific security concerns.'
    },
    {
      number: '02',
      title: 'Scope Definition',
      description: 'Together we define the exact scope of the assessment, including systems, applications, and networks to be evaluated.'
    },
    {
      number: '03',
      title: 'Assessment Execution',
      description: 'Our security experts conduct the assessment using industry-leading tools and methodologies.'
    },
    {
      number: '04',
      title: 'Analysis & Reporting',
      description: 'We analyze findings and prepare a comprehensive report detailing vulnerabilities, risks, and remediation recommendations.'
    },
    {
      number: '05',
      title: 'Results Review',
      description: 'We walk through the findings with your team, answering questions and providing clarification on remediation steps.'
    },
    {
      number: '06',
      title: 'Remediation Support',
      description: 'Optional ongoing support to help implement security improvements and validate fixes.'
    }
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Assessment Request Submitted!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for your interest in our security assessment services. Our team will review your request and contact you within 1-2 business days to discuss next steps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="px-6 py-3 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-colors"
              >
                Return to Home
              </Link>
              <Link
                to="/technology"
                className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors"
              >
                Explore Security Technologies
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-red-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" data-aos="fade-up">Security Assessment</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90" data-aos="fade-up" data-aos-delay="100">
            Identify vulnerabilities, evaluate your security posture, and develop a strategic roadmap to strengthen your defenses against cyber threats.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link to="/technology" className="inline-flex items-center gap-2 text-gray-600 hover:text-red-500 mb-8">
          <ChevronRight className="w-5 h-5" />
          Back to Technology
        </Link>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {assessmentTypes.map((type, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-100"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <div className="text-red-500">
                  <type.icon className="w-8 h-8" />
                </div>
              </div>
              <h2 className="text-xl font-bold mb-3">{type.title}</h2>
              <p className="text-gray-600 mb-4">{type.description}</p>
              
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <Clock className="w-4 h-4 text-red-400" />
                <span>Duration: {type.duration}</span>
              </div>
              
              <h3 className="text-sm font-medium mt-4 mb-2">Deliverables:</h3>
              <ul className="space-y-1">
                {type.benefits.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-12" data-aos="fade-up">
          <h2 className="text-2xl font-bold mb-6">Request a Security Assessment</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 mb-1">
                  Organization Name *
                </label>
                <input
                  type="text"
                  id="organizationName"
                  name="organizationName"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Name *
                </label>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={formData.contactName}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                  Industry *
                </label>
                <select
                  id="industry"
                  name="industry"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={formData.industry}
                  onChange={handleInputChange}
                >
                  <option value="">Select Industry</option>
                  <option value="Finance">Finance & Banking</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Technology">Technology</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Government">Government</option>
                  <option value="Retail">Retail</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Size *
                </label>
                <select
                  id="companySize"
                  name="companySize"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={formData.companySize}
                  onChange={handleInputChange}
                >
                  <option value="">Select Size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501-1000">501-1000 employees</option>
                  <option value="1001+">1001+ employees</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="assessmentType" className="block text-sm font-medium text-gray-700 mb-1">
                  Assessment Type *
                </label>
                <select
                  id="assessmentType"
                  name="assessmentType"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={formData.assessmentType}
                  onChange={handleInputChange}
                >
                  <option value="">Select Assessment Type</option>
                  <option value="Comprehensive">Comprehensive Security Assessment</option>
                  <option value="Penetration">Penetration Testing</option>
                  <option value="Compliance">Compliance Readiness Assessment</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Start Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Information
              </label>
              <textarea
                id="comments"
                name="comments"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Please share any specific concerns or requirements for your security assessment"
                value={formData.comments}
                onChange={handleInputChange}
              ></textarea>
            </div>
            
            <div className="mb-8">
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  name="agreement"
                  className="mt-1"
                  checked={formData.agreement}
                  onChange={handleInputChange}
                  required
                />
                <span className="text-sm text-gray-700">
                  I understand that the security assessment may involve testing systems and applications, and I have the authority to authorize this assessment. I agree to the <Link to="/terms-conditions" className="text-red-600 hover:underline">terms and conditions</Link>.
                </span>
              </label>
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-3 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-colors"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8" data-aos="fade-up">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-red-500" />
            </div>
            <h2 className="text-xl font-bold">Why Choose Our Security Assessment Services?</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-red-500 mt-0.5" />
              <div>
                <h3 className="font-medium mb-1">Experienced Security Team</h3>
                <p className="text-gray-600 text-sm">Our team includes certified security experts with decades of combined experience</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-red-500 mt-0.5" />
              <div>
                <h3 className="font-medium mb-1">Comprehensive Methodology</h3>
                <p className="text-gray-600 text-sm">Our assessments follow industry best practices and standards like NIST, CIS, and ISO</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-red-500 mt-0.5" />
              <div>
                <h3 className="font-medium mb-1">Actionable Recommendations</h3>
                <p className="text-gray-600 text-sm">We provide practical, prioritized remediation steps, not just a list of issues</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-red-500 mt-0.5" />
              <div>
                <h3 className="font-medium mb-1">Ongoing Support</h3>
                <p className="text-gray-600 text-sm">Our team provides guidance during remediation to ensure effective implementation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityAssessment;