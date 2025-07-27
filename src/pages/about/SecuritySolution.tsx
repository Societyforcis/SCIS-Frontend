import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, CheckCircle, AlertTriangle, Shield, Lock, Globe, Cloud, Server, Activity } from 'lucide-react';

type SecuritySolutionType = 'zero-day' | 'data' | 'threat' | 'mobile' | 'cloud' | 'monitoring';

interface SecuritySolutionProps {
  type: SecuritySolutionType;
}

interface SolutionContent {
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
  features: Array<{
    title: string;
    description: string;
  }>;
  imageSrc: string;
}

const SecuritySolution: React.FC<SecuritySolutionProps> = ({ type }) => {
  const content: Record<SecuritySolutionType, SolutionContent> = {
    'zero-day': {
      title: 'Zero-Day Exploit Protection',
      description: 'Protect against unknown vulnerabilities and emerging threats that traditional security measures might miss.',
      icon: <AlertTriangle className="w-12 h-12" />,
      benefits: [
        'Advanced threat detection for unknown vulnerabilities',
        'Behavior-based anomaly detection',
        'Proactive defense against emerging threats',
        'Reduces attack surface through system hardening'
      ],
      features: [
        {
          title: 'AI-Powered Detection',
          description: 'Our AI systems analyze behavior patterns to identify potential zero-day exploits before they can be leveraged by attackers.'
        },
        {
          title: 'Virtual Patching',
          description: 'Shield vulnerable systems while official patches are being developed and tested.'
        },
        {
          title: 'Threat Intelligence',
          description: 'Access to our global threat database with real-time updates on emerging vulnerabilities.'
        }
      ],
      imageSrc: '/security-zero-day.jpg'
    },
    'data': {
      title: 'Data Protection',
      description: 'Safeguard sensitive information and maintain compliance with regulations like GDPR, HIPAA, and PCI DSS.',
      icon: <Lock className="w-12 h-12" />,
      benefits: [
        'Comprehensive data encryption at rest and in transit',
        'Fine-grained access controls and permissions',
        'Data loss prevention (DLP) strategies',
        'Regulatory compliance frameworks'
      ],
      features: [
        {
          title: 'End-to-End Encryption',
          description: 'Protect data throughout its lifecycle with strong encryption protocols.'
        },
        {
          title: 'Data Classification',
          description: 'Automatically identify and classify sensitive information to apply appropriate controls.'
        },
        {
          title: 'Access Control Management',
          description: 'Granular control over who can access, modify, or share different types of data.'
        }
      ],
      imageSrc: '/security-data-protection.jpg'
    },
    'threat': {
      title: 'Advanced Threat Detection',
      description: 'Early identification of potential security breaches through comprehensive monitoring and analysis.',
      icon: <Shield className="w-12 h-12" />,
      benefits: [
        'Real-time monitoring of network and system activity',
        'Behavioral analysis to detect anomalous patterns',
        'Rapid incident response capabilities',
        'Continuous threat hunting to uncover hidden threats'
      ],
      features: [
        {
          title: 'SIEM Integration',
          description: 'Centralized security event management with correlation and analysis.'
        },
        {
          title: 'User Behavior Analytics',
          description: 'Identify suspicious user activities that may indicate account compromise.'
        },
        {
          title: 'IOC Monitoring',
          description: 'Track known indicators of compromise across your environment.'
        }
      ],
      imageSrc: '/security-threat-detection.jpg'
    },
    'mobile': {
      title: 'Mobile Security',
      description: 'Comprehensive protection for mobile devices, applications and data across your organization.',
      icon: <Globe className="w-12 h-12" />,
      benefits: [
        'Secure BYOD and corporate mobile device management',
        'Protection against mobile-specific threats and vulnerabilities',
        'Secure corporate data on personal devices',
        'Remote wipe capabilities for lost or stolen devices'
      ],
      features: [
        {
          title: 'Mobile Device Management',
          description: 'Centralized control over organizational mobile devices.'
        },
        {
          title: 'Application Sandboxing',
          description: 'Isolate corporate apps and data from personal use.'
        },
        {
          title: 'Secure Connectivity',
          description: 'VPN and secure communication channels for mobile devices.'
        }
      ],
      imageSrc: '/security-mobile.jpg'
    },
    'cloud': {
      title: 'Cloud Security',
      description: 'Secure cloud infrastructure and applications with specialized tools and configurations.',
      icon: <Cloud className="w-12 h-12" />,
      benefits: [
        'Comprehensive security for multi-cloud environments',
        'Configuration and compliance monitoring',
        'Cloud-native security controls',
        'Identity and access management for cloud resources'
      ],
      features: [
        {
          title: 'CSPM Solutions',
          description: 'Cloud Security Posture Management to identify misconfigurations and compliance issues.'
        },
        {
          title: 'CWPP Integration',
          description: 'Cloud Workload Protection Platforms to secure applications and data.'
        },
        {
          title: 'IAM Governance',
          description: 'Manage identities and access privileges across cloud environments.'
        }
      ],
      imageSrc: '/security-cloud.jpg'
    },
    'monitoring': {
      title: '24/7 Security Monitoring',
      description: 'Continuous security monitoring and incident response to detect and mitigate threats in real-time.',
      icon: <Server className="w-12 h-12" />,
      benefits: [
        'Round-the-clock security operations center (SOC)',
        'Immediate detection and response to security events',
        'Reduced dwell time for potential intruders',
        'Comprehensive visibility across your environment'
      ],
      features: [
        {
          title: 'SOC-as-a-Service',
          description: 'Expert security analysts monitoring your environment 24/7.'
        },
        {
          title: 'Incident Response',
          description: 'Rapid, coordinated response to security incidents as they occur.'
        },
        {
          title: 'Threat Hunting',
          description: 'Proactively search for hidden threats in your environment.'
        }
      ],
      imageSrc: '/security-monitoring.jpg'
    }
  };

  const solution = content[type];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-red-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
              <div className="text-white">
                {solution.icon}
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-4">{solution.title}</h1>
              <p className="text-xl opacity-90 max-w-3xl">
                {solution.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link to="/technology" className="inline-flex items-center gap-2 text-gray-600 hover:text-red-500 mb-8">
          <ChevronLeft className="w-5 h-5" />
          Back to Technology
        </Link>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Key Benefits</h2>
            <ul className="space-y-4 mb-8">
              {solution.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-red-500" />
                  <span className="text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Core Features</h2>
            <ul className="space-y-4 mb-8">
              {solution.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-red-500" />
                  <div>
                    <span className="text-lg font-semibold block">{feature.title}</span>
                    <span className="text-gray-700">{feature.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Image Section */}
        <div className="mb-16">
          <img src={solution.imageSrc} alt={solution.title} className="w-full rounded-lg shadow-lg" />
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Enhance Your Security?</h2>
          <p className="text-lg text-gray-700 mb-8">
            Contact us today to learn more about how our {solution.title} can protect your organization.
          </p>
          <Link to="/contact" className="inline-block bg-red-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-red-700 transition-all">
            Get Started
            <ArrowRight className="w-5 h-5 ml-2 inline" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SecuritySolution;