import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronLeft, Mail } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const AwardFAQ: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqs: FAQ[] = [
    {
      question: "Who can nominate someone for a CIS Society award?",
      answer: "Anyone can nominate a deserving individual for a CIS Society award, including colleagues, peers, mentors, or even self-nominations. The nominator does not need to be a member of the CIS Society.",
      category: "nomination"
    },
    {
      question: "What information is required for a nomination?",
      answer: "A complete nomination includes the nominee's details, your information as the nominator, a description of the nominee's accomplishments, and an explanation of their impact and significance in the field. Supporting documents may be included but are not required.",
      category: "nomination"
    },
    {
      question: "Can I nominate someone for multiple awards?",
      answer: "Yes, you can nominate the same individual for multiple awards if their work is relevant to different award categories. However, each nomination should be submitted separately with specific information tailored to the criteria of each award.",
      category: "nomination"
    },
    {
      question: "How are award recipients selected?",
      answer: "Award recipients are selected by the CIS Society Awards Committee, which consists of distinguished experts in the field. The selection process involves a thorough review of all nominations against the award criteria, considering the significance, innovation, and impact of the nominee's contributions.",
      category: "selection"
    },
    {
      question: "When are the award winners announced?",
      answer: "Award winners are typically announced in May each year, with the formal recognition taking place at the annual CIS Society Awards Ceremony at the end of May.",
      category: "selection"
    },
    {
      question: "What do award recipients receive?",
      answer: "Award recipients receive a commemorative plaque, recognition at the annual awards ceremony, and publicity through the CIS Society's publications and website. Depending on the specific award, there may also be a monetary prize or grant for continued research.",
      category: "benefits"
    },
    {
      question: "Can previous award winners be nominated again?",
      answer: "Yes, previous award winners can be nominated for different award categories or for the same award after a period of five years, provided they have new significant contributions that merit recognition.",
      category: "eligibility"
    },
    {
      question: "Are international nominations accepted?",
      answer: "Absolutely! The CIS Society encourages nominations from around the world. Our awards recognize excellence in cyber intelligent systems globally, not limited by geographical boundaries.",
      category: "eligibility"
    },
    {
      question: "What is the nomination deadline?",
      answer: "The nomination deadline for the current cycle is February 21, 2025. All nominations must be submitted by 11:59 PM UTC on this date to be considered for the 2025 awards.",
      category: "nomination"
    },
    {
      question: "Who can I contact if I have additional questions?",
      answer: "For any additional questions regarding the awards or nomination process, please contact the CIS Society Awards Committee at awards@societycis.org.",
      category: "other"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'nomination', name: 'Nomination Process' },
    { id: 'eligibility', name: 'Eligibility' },
    { id: 'selection', name: 'Selection Process' },
    { id: 'benefits', name: 'Award Benefits' },
    { id: 'other', name: 'Other Questions' }
  ];
  
  const filteredFAQs = faqs.filter(faq => 
    activeCategory === 'all' || faq.category === activeCategory
  );
  
  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link 
          to="/awards" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-red-500 mb-8"
          data-aos="fade-right"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Awards
        </Link>
        
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Awards FAQ</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Find answers to commonly asked questions about the CIS Society awards and nomination process.
          </p>
        </div>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8" data-aos="fade-up">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* FAQ Accordion */}
        <div className="space-y-4" data-aos="fade-up">
          {filteredFAQs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 focus:outline-none flex justify-between items-center"
              >
                <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedFAQ === index ? 'transform rotate-180' : ''}`} />
              </button>
              
              {expandedFAQ === index && (
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Contact Section */}
        <div className="mt-12 bg-red-50 rounded-lg p-6" data-aos="fade-up">
          <div className="flex items-center gap-4">
            <div className="bg-red-100 rounded-full p-3">
              <Mail className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">Still have questions?</h2>
              <p className="text-gray-600">
                If you couldn't find the answer to your question, please contact our awards team.
              </p>
            </div>
          </div>
          <div className="mt-4 pl-16">
            <a 
              href="mailto:awards@societycis.org"
              className="inline-flex items-center px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Contact Awards Team
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwardFAQ;