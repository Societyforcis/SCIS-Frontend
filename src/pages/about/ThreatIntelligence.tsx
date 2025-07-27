import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Eye, Activity, Search, Globe, ArrowRight, Shield, Zap, AlertTriangle, CheckCircle } from 'lucide-react';

const ThreatIntelligence: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white py-24">
        <div className="absolute inset-0 opacity-20 bg-pattern-grid"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-aos="fade-up">
              Advanced Threat Intelligence
            </h1>
            <p className="text-xl opacity-90 mb-8" data-aos="fade-up" data-aos-delay="100">
              Stay ahead of cyber threats with real-time intelligence, proactive monitoring, and advanced analysis.
            </p>
            <Link 
              to="/security-assessment" 
              className="inline-flex items-center px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Request a Threat Assessment
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link to="/technology" className="inline-flex items-center gap-2 text-gray-600 hover:text-red-500 mb-8">
          <ChevronLeft className="w-5 h-5" />
          Back to Technology
        </Link>

        {/* Intelligence Cycle Section */}
        <div className="mb-20" data-aos="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The Threat Intelligence Cycle</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our comprehensive approach to threat intelligence follows a continuous cycle designed to identify, analyze, and mitigate threats before they impact your organization.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Search className="w-10 h-10" />,
                title: "Collection",
                description: "Gather data from multiple sources including dark web monitoring, threat feeds, and security sensors"
              },
              {
                icon: <Activity className="w-10 h-10" />,
                title: "Processing",
                description: "Convert raw data into structured information that can be analyzed effectively"
              },
              {
                icon: <Eye className="w-10 h-10" />,
                title: "Analysis",
                description: "Transform information into actionable intelligence through expert analysis and correlation"
              },
              {
                icon: <Globe className="w-10 h-10" />,
                title: "Dissemination",
                description: "Deliver tailored intelligence to stakeholders in formats optimized for action"
              }
            ].map((step, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all border-t-4 border-red-500"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <div className="text-red-500">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">{step.title}</h3>
                <p className="text-gray-600 text-center">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features Section */}
        <div className="bg-white rounded-xl shadow-sm p-10 mb-20" data-aos="fade-up">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Features of Our Threat Intelligence</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Real-Time Monitoring",
                description: "Continuous surveillance of your digital assets with immediate alerts for suspicious activities"
              },
              {
                icon: <AlertTriangle className="w-8 h-8" />,
                title: "Proactive Threat Hunting",
                description: "Actively search for hidden threats and anomalies that may evade traditional detection methods"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Customized Intelligence",
                description: "Tailored intelligence based on your industry, infrastructure, and specific threat landscape"
              },
              {
                icon: <Activity className="w-8 h-8" />,
                title: "Behavioral Analytics",
                description: "Advanced analysis of user and system behaviors to identify potential security incidents"
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Global Threat Database",
                description: "Access to extensive threat databases with the latest vulnerabilities and attack methods"
              },
              {
                icon: <Search className="w-8 h-8" />,
                title: "Dark Web Monitoring",
                description: "Surveillance of dark web forums and marketplaces for mentions of your organization or data"
              }
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-4" data-aos="fade-up" data-aos-delay={index * 50}>
                <div className="text-red-500 flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Case Study Section */}
        <div className="grid md:grid-cols-5 gap-8 mb-20" data-aos="fade-up">
          <div className="md:col-span-3 bg-gray-900 text-white p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Case Study: Financial Services</h2>
            <p className="mb-4">
              A major financial services provider was experiencing repeated targeted attacks against their customer-facing applications. Our threat intelligence team identified a persistent threat group specifically targeting the financial sector.
            </p>
            <p className="mb-4">
              By implementing our real-time monitoring and behavioral analytics, we detected attack patterns early, enabling the client to strengthen their defenses against these specific threats.
            </p>
            <div className="space-y-3 mt-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>78% reduction in successful breach attempts</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Early detection of 12 targeted attack campaigns</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>$3.2M estimated savings in potential breach costs</span>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold mb-4">Why Threat Intelligence Matters</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-red-500">1</span>
                </div>
                <p className="text-gray-700">
                  <strong>Reduced Dwell Time:</strong> Detect threats earlier to minimize the time attackers remain undetected in your network
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-red-500">2</span>
                </div>
                <p className="text-gray-700">
                  <strong>Lower Attack Success Rate:</strong> Block attacks before they achieve their objectives
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-red-500">3</span>
                </div>
                <p className="text-gray-700">
                  <strong>Better Resource Allocation:</strong> Focus your security resources on the threats most relevant to your organization
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-red-500">4</span>
                </div>
                <p className="text-gray-700">
                  <strong>Improved Response:</strong> Enable faster, more effective incident response with actionable intelligence
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-900 rounded-xl text-white p-10 text-center" data-aos="fade-up">
          <h2 className="text-3xl font-bold mb-4">Strengthen Your Security Posture Today</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Leverage our advanced threat intelligence capabilities to protect your organization from emerging cyber threats.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/security-assessment" 
              className="px-8 py-3 bg-white text-red-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Request a Consultation
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatIntelligence;