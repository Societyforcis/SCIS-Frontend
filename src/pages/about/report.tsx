import { FileText, Download, Eye, Calendar } from 'lucide-react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Reports() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Security Reports & Analysis</h1>
          <div className="w-24 h-1 bg-red-500 mx-auto"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive cybersecurity reports, threat analysis, and incident response documentation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-6" data-aos="fade-up" data-aos-delay="100">
            <div className="flex justify-between items-start mb-4">
              <FileText className="h-8 w-8 text-red-500" />
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Latest</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Q1 2024 Threat Analysis</h3>
            <p className="text-gray-600 mb-4">Comprehensive analysis of emerging cyber threats and mitigation strategies</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Mar 1, 2024
              </span>
              <span className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                1,234 views
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6" data-aos="fade-up" data-aos-delay="200">
            <div className="flex justify-between items-start mb-4">
              <FileText className="h-8 w-8 text-red-500" />
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Report</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Annual Security Review</h3>
            <p className="text-gray-600 mb-4">Year-end summary of security incidents and response effectiveness</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Feb 15, 2024
              </span>
              <span className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                2,156 views
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6" data-aos="fade-up" data-aos-delay="300">
            <div className="flex justify-between items-start mb-4">
              <FileText className="h-8 w-8 text-red-500" />
              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Analysis</span>
            </div>
            <h3 className="text-xl font-bold mb-2">AI Security Impact Study</h3>
            <p className="text-gray-600 mb-4">Analysis of AI implementation in cybersecurity systems and potential risks</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Jan 30, 2024
              </span>
              <span className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                1,789 views
              </span>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="space-y-6" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Download Reports</h2>
          
          {reports.map((report, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow p-6 flex items-center justify-between hover:shadow-md transition-shadow"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex items-center space-x-4">
                <FileText className="h-10 w-10 text-red-500" />
                <div>
                  <h3 className="font-semibold text-gray-900">{report.title}</h3>
                  <p className="text-sm text-gray-500">{report.size} • {report.date}</p>
                </div>
              </div>
              <button className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-colors">
                <Download className="h-5 w-5" />
                <span>Download</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const reports = [
  {
    title: "Annual Cybersecurity Report 2024",
    size: "2.4 MB",
    date: "March 1, 2024"
  },
  {
    title: "Q4 2023 Threat Intelligence Summary",
    size: "1.8 MB",
    date: "January 15, 2024"
  },
  {
    title: "Emerging Threats Analysis - February 2024",
    size: "3.2 MB",
    date: "February 28, 2024"
  },
  {
    title: "Security Metrics and KPIs Report",
    size: "1.5 MB",
    date: "February 10, 2024"
  },
  {
    title: "Incident Response Performance Review",
    size: "2.1 MB",
    date: "January 30, 2024"
  }
];