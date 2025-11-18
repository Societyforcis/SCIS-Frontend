"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  User,
  Mail,
  Phone,
  Building,
  MapPin,
  CreditCard,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Star,
  Award,
  Users,
  Globe,
  Camera,
  Sparkles,
  Loader2 as Loader,
  AlertCircle,
} from "lucide-react"
import axios from "axios"
import Swal from "sweetalert2"
import imageCompression from 'browser-image-compression';
import qr from "../components/images/bank-pyament.png"
interface FormData {
  title: string
  firstName: string
  lastName: string
  email: string
  mobile: string
  currentPosition: string
  institute: string
  department: string
  organisation: string
  address: string
  town: string
  postcode: string
  state: string
  country: string
  status: string
  linkedin: string
  orcid: string
  researchGate: string
  membershipType: string
  interests: string[]
  experience: string
  profilePhoto: string
  paymentMethod: string
  paymentStatus: string
  transactionId: string
  paymentScreenshot: string
}

const MembershipForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const [formData, setFormData] = useState<FormData>({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    currentPosition: "",
    institute: "",
    department: "",
    organisation: "",
    address: "",
    town: "",
    postcode: "",
    state: "",
    country: "",
    status: "",
    linkedin: "",
    orcid: "",
    researchGate: "",
    membershipType: "",
    interests: [],
    experience: "",
    profilePhoto: "",
    paymentMethod: "",
    paymentStatus: "pending",
    transactionId: "",
    paymentScreenshot: "",
  })

  const membershipTiers = [
    {
      id: "student-ug",
      name: "Student UG Membership",
      price: "₹250",
      duration: "1 Year",
      icon: <Users className="h-8 w-8" />,
      features: [
        "Access to research papers",
        "Student networking events",
        "Basic cybersecurity resources",
        "Monthly newsletter",
        "Community forum access",
      ],
      color: "bg-blue-50 border-blue-200 text-blue-700",
    },
    {
      id: "student-pg",
      name: "Student PG Membership",
      price: "₹350",
      duration: "1 Year",
      icon: <Award className="h-8 w-8" />,
      features: [
        "All UG benefits",
        "Advanced research access",
        "Workshop participation",
        "Career mentorship",
        "Industry connections",
      ],
      color: "bg-green-50 border-green-200 text-green-700",
    },
    {
      id: "academic",
      name: "Academic Membership",
      price: "₹500",
      duration: "1 Year",
      icon: <Award className="h-8 w-8" />,
      features: [
        "All student benefits",
        "Professional certification",
        "Research collaboration opportunities",
        "Academic networking events",
        "Priority workshop access",
        "Teaching resources",
      ],
      color: "bg-red-100 border-red-300 text-red-800",
      popular: true,
    },
    {
      id: "industry",
      name: "Industry Membership",
      price: "₹750",
      duration: "1 Year",
      icon: <Building className="h-8 w-8" />,
      features: [
        "All academic benefits",
        "Industry networking events",
        "Corporate training programs",
        "Priority support",
        "Custom research access",
        "Brand visibility opportunities",
      ],
      color: "bg-purple-50 border-purple-200 text-purple-700",
    },
    {
      id: "international",
      name: "International Membership",
      price: "₹600",
      duration: "1 Year",
      icon: <Building className="h-8 w-8" />,
      features: [
        "All academic benefits",
        "Global networking opportunities",
        "International conference access",
        "Cross-border collaboration",
        "Remote participation privileges",
        "Digital resources library",
      ],
      color: "bg-orange-50 border-orange-200 text-orange-700",
    },
  ]

  const interestOptions = [
    "Cybersecurity",
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Cloud Computing",
    "IoT Security",
    "Blockchain",
    "Network Security",
    "Digital Forensics",
    "Risk Management",
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const compressImage = async (imageFile: File) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true
    };
    
    try {
      const compressedFile = await imageCompression(imageFile, options);
      return await convertToBase64(compressedFile);
    } catch (error) {
      console.error('Error compressing image:', error);
      throw error;
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0]
      if (file) {
        // Compress and convert image
        const compressedBase64 = await compressImage(file);
        
        setFormData((prev) => ({
          ...prev,
          profilePhoto: compressedBase64,
        }))
      }
    } catch (error) {
      console.error('File upload error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Upload Failed',
        text: error.message || 'Failed to upload image',
        confirmButtonColor: '#dc2626',
      });
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Get token from Redux or localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        await Swal.fire({
          icon: 'warning',
          title: 'Authentication Required',
          text: 'Please login to submit your membership application',
          confirmButtonColor: '#dc2626',
        });
        navigate('/login');
        return;
      }

      // Validate payment fields
      if (!formData.paymentMethod) {
        await Swal.fire({
          icon: 'warning',
          title: 'Payment Method Required',
          text: 'Please select a payment method',
          confirmButtonColor: '#dc2626',
        });
        return;
      }

      if (!formData.paymentScreenshot) {
        await Swal.fire({
          icon: 'warning',
          title: 'Payment Screenshot Required',
          text: 'Please upload your payment screenshot',
          confirmButtonColor: '#dc2626',
        });
        return;
      }
      
      // Add membership fee based on selected type
      const selectedTier = membershipTiers.find(tier => tier.id === formData.membershipType);
      const membershipFee = selectedTier?.price || '';

      const bookingData = {
        ...formData,
        membershipFee,
      };

      // Submit to booking API instead of direct membership
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/booking/submit`,
        bookingData,
        { 
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
          }
        }
      );

      if (response.data.success) {
        await Swal.fire({
          icon: 'success',
          title: 'Booking Submitted Successfully!',
          html: `
            <div class="text-left space-y-2">
              <p class="font-semibold">Your membership booking has been submitted.</p>
              <p class="text-sm text-gray-600">⏳ <strong>Status:</strong> Waiting for admin approval</p>
              <p class="text-sm text-gray-600 mt-4">
                You will receive an email notification once your membership is approved. 
                After approval, you can view and download your membership card.
              </p>
            </div>
          `,
          confirmButtonColor: '#dc2626',
          confirmButtonText: 'Got it!',
        });
        navigate('/profile');
      } else {
        throw new Error(response.data.message || 'Failed to submit booking');
      }
    } catch (error: any) {
      console.error('Booking submission error:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: error.response?.data?.message || error.message || 'Failed to submit membership booking',
        confirmButtonColor: '#dc2626',
      });
    } finally {
      setLoading(false);
    }
  }

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-2xl shadow-lg">
            <User className="h-12 w-12 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Personal Information</h2>
        <p className="text-lg text-gray-600 flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-red-500 mr-2" />
          Let's start with your basic details
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">Title</label>
          <select
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
          >
            <option value="">Select Title</option>
            <option value="Mr">Mr</option>
            <option value="Ms">Ms</option>
            <option value="Mrs">Mrs</option>
            <option value="Dr">Dr</option>
            <option value="Prof">Prof</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            placeholder="Enter first name"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            placeholder="Enter last name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="flex items-center text-sm font-semibold text-gray-800">
            <Mail className="h-4 w-4 mr-2 text-red-500" />
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            placeholder="Enter email address"
          />
        </div>
        <div className="space-y-2">
          <label className="flex items-center text-sm font-semibold text-gray-800">
            <Phone className="h-4 w-4 mr-2 text-red-500" />
            Mobile Number
          </label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            placeholder="Enter mobile number"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">Current Position</label>
          <input
            type="text"
            name="currentPosition"
            value={formData.currentPosition}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            placeholder="e.g., Software Engineer, Student"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">
            Status <span className="text-red-500">*</span>
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
          >
            <option value="">Select Status</option>
            <option value="Student">Student</option>
            <option value="Professional">Professional</option>
            <option value="Academic">Academic</option>
            <option value="Researcher">Researcher</option>
            <option value="Industry Expert">Industry Expert</option>
          </select>
        </div>
      </div>

      <div className="text-center">
        <div className="relative inline-block">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center overflow-hidden border-4 border-red-500 shadow-lg mb-4">
            {formData.profilePhoto ? (
              <img
                src={formData.profilePhoto || "/placeholder.svg"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="h-16 w-16 text-red-400" />
            )}
          </div>
          <label className="absolute bottom-2 right-2 bg-red-500 text-white p-3 rounded-full cursor-pointer hover:bg-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
            <Camera className="h-5 w-5" />
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        </div>
        <p className="text-sm font-medium text-gray-700 mt-2">Upload Profile Photo</p>
        <p className="text-xs text-gray-500">JPG, PNG or GIF (max. 5MB)</p>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-2xl shadow-lg">
            <Building className="h-12 w-12 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Address & Organization</h2>
        <p className="text-lg text-gray-600 flex items-center justify-center">
          <MapPin className="h-5 w-5 text-red-500 mr-2" />
          Tell us about your location and affiliation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">Institute/University</label>
          <input
            type="text"
            name="institute"
            value={formData.institute}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            placeholder="Enter institute name"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            placeholder="Enter department"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center text-sm font-semibold text-gray-800">
          <Building className="h-4 w-4 mr-2 text-red-500" />
          Organization <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="organisation"
          value={formData.organisation}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
          placeholder="Enter organization name"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center text-sm font-semibold text-gray-800">
          <MapPin className="h-4 w-4 mr-2 text-red-500" />
          Address
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
          placeholder="Enter full address"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">
            Town/City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="town"
            value={formData.town}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            placeholder="Enter city"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">Postcode</label>
          <input
            type="text"
            name="postcode"
            value={formData.postcode}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            placeholder="Enter postcode"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            placeholder="Enter state"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">
            Country <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            placeholder="Enter country"
          />
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-10">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-2xl shadow-lg">
            <CreditCard className="h-12 w-12 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Choose Your Membership</h2>
        <p className="text-lg text-gray-600 flex items-center justify-center">
          <Star className="h-5 w-5 text-red-500 mr-2" />
          Select the plan that best fits your needs
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {membershipTiers.map((tier) => (
          <div
            key={tier.id}
            className={`relative rounded-2xl border-2 p-8 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              formData.membershipType === tier.id
                ? "border-red-500 bg-red-50 shadow-xl"
                : "border-gray-200 hover:border-red-300 hover:shadow-lg"
            } ${tier.color}`}
            onClick={() => setFormData((prev) => ({ ...prev, membershipType: tier.id }))}
          >
            {tier.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                  <Star className="h-4 w-4" />
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg mb-6">
                {tier.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                <span className="text-gray-600 text-lg">/{tier.duration}</span>
              </div>
            </div>

            <ul className="space-y-4 mb-6">
              {tier.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700 font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            {formData.membershipType === tier.id && (
              <div className="absolute inset-0 rounded-2xl border-2 border-red-500 bg-red-500 bg-opacity-10 flex items-center justify-center">
                <div className="bg-red-500 text-white p-3 rounded-full shadow-lg">
                  <CheckCircle className="h-8 w-8" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-2xl shadow-lg">
            <Globe className="h-12 w-12 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Additional Information</h2>
        <p className="text-lg text-gray-600 flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-red-500 mr-2" />
          Help us understand your interests and background
        </p>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <label className="flex items-center text-sm font-semibold text-gray-800">
            <Globe className="h-4 w-4 mr-2 text-red-500" />
            Professional Profiles
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-xs text-gray-500 font-medium">LinkedIn Profile</label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                placeholder="LinkedIn URL"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs text-gray-500 font-medium">ORCID ID</label>
              <input
                type="text"
                name="orcid"
                value={formData.orcid}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                placeholder="ORCID ID"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs text-gray-500 font-medium">ResearchGate</label>
              <input
                type="url"
                name="researchGate"
                value={formData.researchGate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                placeholder="ResearchGate URL"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-800">Areas of Interest</label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {interestOptions.map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() => handleInterestToggle(interest)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  formData.interests.includes(interest)
                    ? "bg-red-500 text-white shadow-lg transform scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 border border-gray-200"
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">Experience Level</label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white"
          >
            <option value="">Select Experience Level</option>
            <option value="Beginner">Beginner (0-2 years)</option>
            <option value="Intermediate">Intermediate (2-5 years)</option>
            <option value="Advanced">Advanced (5-10 years)</option>
            <option value="Expert">Expert (10+ years)</option>
          </select>
        </div>
      </div>
    </div>
  )

  const renderStep5 = () => {
    const selectedTier = membershipTiers.find(tier => tier.id === formData.membershipType);
    
    return (
      <div className="space-y-8">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-2xl shadow-lg">
              <CreditCard className="h-12 w-12 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Payment Details</h2>
          <p className="text-lg text-gray-600">Complete your membership payment</p>
          
          {selectedTier && (
            <div className="mt-6 bg-gradient-to-r from-red-50 to-rose-50 p-6 rounded-2xl inline-block">
              <p className="text-sm text-gray-600 mb-1">Selected Membership</p>
              <p className="text-2xl font-bold text-red-600">{selectedTier.name}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{selectedTier.price}</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* Payment Method Selection */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-800">
              <CreditCard className="inline h-4 w-4 mr-2 text-red-500" />
              Select Payment Method <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'qr-code' }))}
                className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                  formData.paymentMethod === 'qr-code'
                    ? 'border-red-500 bg-red-50 shadow-lg'
                    : 'border-gray-200 hover:border-red-300'
                }`}
              >
                <div className="flex items-center justify-center mb-3">
                  <div className={`p-3 rounded-lg ${formData.paymentMethod === 'qr-code' ? 'bg-red-100' : 'bg-gray-100'}`}>
                    <Globe className="h-8 w-8 text-red-500" />
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-1">UPI QR Code</h3>
                <p className="text-sm text-gray-600">Scan QR code to pay via UPI</p>
              </button>

              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'bank-transfer' }))}
                className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                  formData.paymentMethod === 'bank-transfer'
                    ? 'border-red-500 bg-red-50 shadow-lg'
                    : 'border-gray-200 hover:border-red-300'
                }`}
              >
                <div className="flex items-center justify-center mb-3">
                  <div className={`p-3 rounded-lg ${formData.paymentMethod === 'bank-transfer' ? 'bg-red-100' : 'bg-gray-100'}`}>
                    <Building className="h-8 w-8 text-red-500" />
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-1">Bank Transfer</h3>
                <p className="text-sm text-gray-600">Transfer to bank account</p>
              </button>
            </div>
          </div>

          {/* QR Code Display */}
          {formData.paymentMethod === 'qr-code' && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border-2 border-blue-200">
              <h3 className="text-xl font-bold text-center mb-4">Scan QR Code to Pay</h3>
              <div className="flex justify-center mb-4">
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <img 
                    src={qr} 
                    alt="Payment QR Code" 
                    className="w-64 h-64 object-contain"
                  />
                </div>
              </div>
              <div className="text-center space-y-2">
                <p className="font-semibold text-gray-800">UPI ID: societyforcyber@indianbk</p>
                <p className="text-sm text-gray-600">Scan using any UPI app (PhonePe, Google Pay, Paytm, etc.)</p>
              </div>
            </div>
          )}

          {/* Bank Transfer Details */}
          {formData.paymentMethod === 'bank-transfer' && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border-2 border-green-200">
              <h3 className="text-xl font-bold text-center mb-6">Bank Account Details</h3>
              <div className="space-y-4 max-w-md mx-auto">
                <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                  <span className="font-semibold text-gray-600">Account Name:</span>
                  <span className="font-bold">Society for Cyber</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                  <span className="font-semibold text-gray-600">Account Number:</span>
                  <span className="font-bold">8067349218</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                  <span className="font-semibold text-gray-600">IFSC Code:</span>
                  <span className="font-bold">IDIB000R076</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                  <span className="font-semibold text-gray-600">Bank Name:</span>
                  <span className="font-bold">Indian Bank</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                  <span className="font-semibold text-gray-600">UPI ID:</span>
                  <span className="font-bold">societyforcyber@indianbk</span>
                </div>
              </div>
            </div>
          )}

          {/* Transaction ID */}
          {formData.paymentMethod && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">
                Transaction ID / Reference Number
              </label>
              <input
                type="text"
                name="transactionId"
                value={formData.transactionId}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                placeholder="Enter your transaction ID"
              />
            </div>
          )}

          {/* Payment Screenshot Upload */}
          {formData.paymentMethod && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">
                Upload Payment Screenshot <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-red-400 transition-all duration-200">
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    try {
                      const file = e.target.files?.[0];
                      if (file) {
                        const compressedBase64 = await compressImage(file);
                        setFormData((prev) => ({
                          ...prev,
                          paymentScreenshot: compressedBase64,
                        }));
                      }
                    } catch (error) {
                      console.error('Payment screenshot upload error:', error);
                      Swal.fire({
                        icon: 'error',
                        title: 'Upload Failed',
                        text: 'Failed to upload payment screenshot',
                        confirmButtonColor: '#dc2626',
                      });
                    }
                  }}
                  className="hidden"
                  id="payment-screenshot"
                />
                <label htmlFor="payment-screenshot" className="cursor-pointer">
                  {formData.paymentScreenshot ? (
                    <div className="space-y-2">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                      <p className="text-sm font-semibold text-green-600">Screenshot uploaded successfully!</p>
                      <p className="text-xs text-gray-500">Click to change</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <CreditCard className="h-12 w-12 text-gray-400 mx-auto" />
                      <p className="text-sm font-semibold text-gray-700">Click to upload payment screenshot</p>
                      <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          )}

          {/* Payment Status */}
          {formData.paymentMethod && formData.paymentScreenshot && (
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-800">
                Payment Status <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, paymentStatus: 'paid' }))}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    formData.paymentStatus === 'paid'
                      ? 'border-green-500 bg-green-50 shadow-lg'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <CheckCircle className={`h-8 w-8 mx-auto mb-2 ${formData.paymentStatus === 'paid' ? 'text-green-500' : 'text-gray-400'}`} />
                  <p className="font-bold">Payment Completed</p>
                  <p className="text-xs text-gray-600 mt-1">I have completed the payment</p>
                </button>
                
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, paymentStatus: 'pending' }))}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    formData.paymentStatus === 'pending'
                      ? 'border-yellow-500 bg-yellow-50 shadow-lg'
                      : 'border-gray-200 hover:border-yellow-300'
                  }`}
                >
                  <Loader className={`h-8 w-8 mx-auto mb-2 ${formData.paymentStatus === 'pending' ? 'text-yellow-500' : 'text-gray-400'}`} />
                  <p className="font-bold">Payment Pending</p>
                  <p className="text-xs text-gray-600 mt-1">Payment is in process</p>
                </button>
              </div>
            </div>
          )}

          {/* Important Note */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-yellow-800">Important Note</h4>
                <p className="text-xs text-yellow-700 mt-1">
                  After submitting your membership application, please wait for admin approval. 
                  You will receive an email notification once your membership is approved, 
                  and then you can view your membership card.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const checkExistingMembership = async () => {
      if (!token) {
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/membership/email/${encodeURIComponent(formData.email)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success && response.data.membership) {
          // If membership exists, show message and redirect
          Swal.fire({
            icon: 'info',
            title: 'Membership Exists',
            text: 'You already have an active membership. Redirecting to your membership page.',
            confirmButtonColor: '#dc2626',
          }).then(() => {
            navigate('/membership');
          });
        }
      } catch (error) {
        // If 404, it means no membership found, so we can stay on this page
        if (error.response?.status !== 404) {
          console.error("Error checking membership status:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    checkExistingMembership();
  }, [formData.email, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-red-100 py-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`flex items-center justify-center w-12 h-12 rounded-full font-semibold transition-all duration-300 ${
                  step <= currentStep
                    ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step < currentStep ? <CheckCircle className="h-6 w-6" /> : step}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
            <div
              className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-2xl p-10 border border-gray-100">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-3 px-8 py-4 text-gray-600 border-2 border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold"
            >
              <ArrowLeft className="h-5 w-5" />
              Previous
            </button>

            {currentStep < 5 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Next
                <ArrowRight className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 disabled:opacity-50 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <CreditCard className="h-5 w-5" />
                )}
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MembershipForm
