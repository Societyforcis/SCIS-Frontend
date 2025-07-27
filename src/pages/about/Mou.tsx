import { FileCheck, FileText, Users } from 'lucide-react';

export default function Mou() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Memorandum of Understanding</h1>
          <div className="w-24 h-1 bg-red-500 mx-auto"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Establishing partnerships and collaboration frameworks for advancing cybersecurity initiatives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8" data-aos="fade-up" data-aos-delay="100">
            <FileCheck className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-xl font-bold mb-4">Partnership Agreement</h3>
            <p className="text-gray-600">Formal documentation of collaboration terms and responsibilities between participating organizations</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8" data-aos="fade-up" data-aos-delay="200">
            <FileText className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-xl font-bold mb-4">Terms & Conditions</h3>
            <p className="text-gray-600">Detailed guidelines and protocols for information sharing and joint initiatives</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8" data-aos="fade-up" data-aos-delay="300">
            <Users className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-xl font-bold mb-4">Stakeholder Roles</h3>
            <p className="text-gray-600">Clear definition of responsibilities and expectations for all participating parties</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-16" data-aos="fade-up">
          <h2 className="text-2xl font-bold mb-6">Key MOU Components</h2>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-lg mb-2">1. Purpose and Scope</h3>
              <p className="text-gray-600">Clearly defined objectives and boundaries of the collaboration</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-lg mb-2">2. Duration and Renewal</h3>
              <p className="text-gray-600">Timeframe of the agreement and conditions for extension</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-lg mb-2">3. Resource Allocation</h3>
              <p className="text-gray-600">Distribution of resources and cost-sharing arrangements</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-lg mb-2">4. Confidentiality</h3>
              <p className="text-gray-600">Protection of sensitive information and intellectual property</p>
            </div>
          </div>
        </div>

        <div className="text-center" data-aos="fade-up">
          <h2 className="text-2xl font-bold mb-6">Current Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <img src="https://source.unsplash.com/200x100/?technology,company" alt="Partner 1" className="rounded-lg" />
            <img src="https://source.unsplash.com/201x100/?technology,company" alt="Partner 2" className="rounded-lg" />
            <img src="https://source.unsplash.com/202x100/?technology,company" alt="Partner 3" className="rounded-lg" />
            <img src="https://source.unsplash.com/203x100/?technology,company" alt="Partner 4" className="rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}