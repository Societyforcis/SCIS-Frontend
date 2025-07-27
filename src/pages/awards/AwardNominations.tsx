import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Upload, Check, AlertCircle, Info, Download } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AwardNominations: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const [formData, setFormData] = useState({
    awardCategory: '',
    nomineeName: '',
    nomineeEmail: '',
    nomineeAffiliation: '',
    nominatorName: '',
    nominatorEmail: '',
    nominatorAffiliation: '',
    relationship: '',
    accomplishments: '',
    impact: '',
    supportingDocuments: null,
    agreeTerms: false
  });

  const [formStep, setFormStep] = useState(1);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const categories = [
    { id: 'technical', name: 'Technical Excellence' },
    { id: 'research', name: 'Research & Development' },
    { id: 'academic', name: 'Academic & Research Excellence' },
    { id: 'industry', name: 'Industry Impact' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when field is changed
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
    setFormData(prev => {
      return {
        ...prev,
        supportingDocuments: e.target.files
      };
    });
    }
  };

  const validateForm = (step: number) => {
    const errors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.awardCategory) errors.awardCategory = 'Please select an award category';
      if (!formData.nomineeName) errors.nomineeName = 'Nominee name is required';
      if (!formData.nomineeEmail) errors.nomineeEmail = 'Nominee email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.nomineeEmail)) errors.nomineeEmail = 'Please enter a valid email';
    }
    
    if (step === 2) {
      if (!formData.nominatorName) errors.nominatorName = 'Your name is required';
      if (!formData.nominatorEmail) errors.nominatorEmail = 'Your email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.nominatorEmail)) errors.nominatorEmail = 'Please enter a valid email';
      if (!formData.relationship) errors.relationship = 'Please describe your relationship to the nominee';
    }
    
    if (step === 3) {
      if (!formData.accomplishments) errors.accomplishments = 'This field is required';
      if (!formData.impact) errors.impact = 'This field is required';
      if (!formData.agreeTerms) errors.agreeTerms = 'You must agree to the terms';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateForm(formStep)) {
      setFormStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setFormStep(prev => Math.max(1, prev - 1));
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(3)) return;
    
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Nomination Submitted!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for your nomination. We've received your submission and will review it carefully. You will receive a confirmation email shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/awards"
                className="px-6 py-3 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-colors"
              >
                Return to Awards
              </Link>
              <Link
                to="/"
                className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors"
              >
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">CIS Society Award Nomination</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Recognize excellence in cyber intelligent systems by nominating deserving individuals for one of our prestigious awards.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden" data-aos="fade-up">
          {/* Progress Steps */}
          <div className="bg-gray-50 px-6 py-4 border-b">
            <div className="flex justify-between">
              <div className={`flex flex-col items-center ${formStep === 1 ? 'text-red-500' : 'text-gray-500'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${formStep === 1 ? 'bg-red-500 text-white' : formStep > 1 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                  {formStep > 1 ? <Check className="w-5 h-5" /> : 1}
                </div>
                <span className="text-sm">Nominee</span>
              </div>
              <div className="flex-1 flex items-center">
                <div className={`h-1 w-full ${formStep > 1 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              </div>
              <div className={`flex flex-col items-center ${formStep === 2 ? 'text-red-500' : 'text-gray-500'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${formStep === 2 ? 'bg-red-500 text-white' : formStep > 2 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                  {formStep > 2 ? <Check className="w-5 h-5" /> : 2}
                </div>
                <span className="text-sm">Nominator</span>
              </div>
              <div className="flex-1 flex items-center">
                <div className={`h-1 w-full ${formStep > 2 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              </div>
              <div className={`flex flex-col items-center ${formStep === 3 ? 'text-red-500' : 'text-gray-500'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${formStep === 3 ? 'bg-red-500 text-white' : formStep > 3 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                  3
                </div>
                <span className="text-sm">Justification</span>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6">
            {/* Step 1: Nominee Information */}
            {formStep === 1 && (
              <div>
                <h2 className="text-xl font-bold mb-6">Nominee Information</h2>
                
                <div className="mb-6">
                  <label htmlFor="awardCategory" className="block text-sm font-medium text-gray-700 mb-1">
                    Award Category *
                  </label>
                  <select
                    id="awardCategory"
                    name="awardCategory"
                    required
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 ${formErrors.awardCategory ? 'border-red-500' : 'border-gray-300'}`}
                    value={formData.awardCategory}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Award Category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                  {formErrors.awardCategory && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.awardCategory}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="nomineeName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nominee's Full Name *
                  </label>
                  <input
                    type="text"
                    id="nomineeName"
                    name="nomineeName"
                    required
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 ${formErrors.nomineeName ? 'border-red-500' : 'border-gray-300'}`}
                    value={formData.nomineeName}
                    onChange={handleInputChange}
                  />
                  {formErrors.nomineeName && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.nomineeName}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="nomineeEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Nominee's Email *
                  </label>
                  <input
                    type="email"
                    id="nomineeEmail"
                    name="nomineeEmail"
                    required
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 ${formErrors.nomineeEmail ? 'border-red-500' : 'border-gray-300'}`}
                    value={formData.nomineeEmail}
                    onChange={handleInputChange}
                  />
                  {formErrors.nomineeEmail && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.nomineeEmail}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="nomineeAffiliation" className="block text-sm font-medium text-gray-700 mb-1">
                    Nominee's Organization/Affiliation *
                  </label>
                  <input
                    type="text"
                    id="nomineeAffiliation"
                    name="nomineeAffiliation"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    value={formData.nomineeAffiliation}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Nominator Information */}
            {formStep === 2 && (
              <div>
                <h2 className="text-xl font-bold mb-6">Nominator Information</h2>
                
                <div className="mb-6">
                  <label htmlFor="nominatorName" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    id="nominatorName"
                    name="nominatorName"
                    required
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 ${formErrors.nominatorName ? 'border-red-500' : 'border-gray-300'}`}
                    value={formData.nominatorName}
                    onChange={handleInputChange}
                  />
                  {formErrors.nominatorName && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.nominatorName}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="nominatorEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="nominatorEmail"
                    name="nominatorEmail"
                    required
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 ${formErrors.nominatorEmail ? 'border-red-500' : 'border-gray-300'}`}
                    value={formData.nominatorEmail}
                    onChange={handleInputChange}
                  />
                  {formErrors.nominatorEmail && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.nominatorEmail}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="nominatorAffiliation" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Organization/Affiliation *
                  </label>
                  <input
                    type="text"
                    id="nominatorAffiliation"
                    name="nominatorAffiliation"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    value={formData.nominatorAffiliation}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="relationship" className="block text-sm font-medium text-gray-700 mb-1">
                    Relationship to Nominee *
                  </label>
                  <textarea
                    id="relationship"
                    name="relationship"
                    rows={3}
                    required
                    placeholder="Describe your relationship to the nominee (e.g., colleague, mentor, supervisor)"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 ${formErrors.relationship ? 'border-red-500' : 'border-gray-300'}`}
                    value={formData.relationship}
                    onChange={handleInputChange}
                  ></textarea>
                  {formErrors.relationship && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.relationship}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Justification */}
            {formStep === 3 && (
              <div>
                <h2 className="text-xl font-bold mb-6">Nomination Justification</h2>
                
                <div className="mb-6">
                  <label htmlFor="accomplishments" className="block text-sm font-medium text-gray-700 mb-1">
                    Key Accomplishments *
                  </label>
                  <textarea
                    id="accomplishments"
                    name="accomplishments"
                    rows={5}
                    required
                    placeholder="Describe the nominee's key accomplishments and contributions that make them deserving of this award"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 ${formErrors.accomplishments ? 'border-red-500' : 'border-gray-300'}`}
                    value={formData.accomplishments}
                    onChange={handleInputChange}
                  ></textarea>
                  {formErrors.accomplishments && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.accomplishments}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="impact" className="block text-sm font-medium text-gray-700 mb-1">
                    Impact and Significance *
                  </label>
                  <textarea
                    id="impact"
                    name="impact"
                    rows={5}
                    required
                    placeholder="Explain the impact and significance of the nominee's work in the field of cyber intelligent systems"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 ${formErrors.impact ? 'border-red-500' : 'border-gray-300'}`}
                    value={formData.impact}
                    onChange={handleInputChange}
                  ></textarea>
                  {formErrors.impact && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.impact}</p>
                  )}
                </div>
                
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Supporting Documents (optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <label htmlFor="file-upload" className="cursor-pointer text-red-500 hover:text-red-600 font-medium">
                        Upload files
                      </label>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        multiple
                        onChange={handleFileChange}
                      />
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      PDF, DOC, or DOCX files up to 10MB each
                    </p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <div className="bg-blue-50 text-blue-800 p-4 rounded-md flex items-start gap-3">
                    <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Nomination Review Process</h4>
                      <p className="text-sm mt-1">
                        All nominations are reviewed by the CIS Society Awards Committee. The review process takes approximately 8-10 weeks, and all nominators will be notified of the outcome.
                      </p>
                      <a 
                        href="/documents/cis-review-process.pdf" 
                        download
                        className="text-sm text-blue-700 hover:text-blue-900 mt-1 inline-flex items-center gap-1"
                      >
                        <Download className="w-4 h-4" /> Download full review process
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      className={`mt-1 ${formErrors.agreeTerms ? 'border-red-500' : ''}`}
                      checked={formData.agreeTerms}
                      onChange={handleInputChange}
                    />
                    <span className="text-sm text-gray-700">
                      I confirm that all information provided in this nomination is accurate and truthful. I understand that the CIS Society may contact me for additional information if needed.
                    </span>
                  </label>
                  {formErrors.agreeTerms && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.agreeTerms}</p>
                  )}
                </div>
                
                {Object.keys(formErrors).length > 0 && (
                  <div className="mb-6 bg-red-50 text-red-800 p-3 rounded-md flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    <p>Please correct the errors above before submitting.</p>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {formStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
              )}
              
              <div className="ml-auto">
                {formStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Nomination'}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AwardNominations;