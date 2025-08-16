"use client"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useAppSelector } from "../redux/hooks"
import Swal from "sweetalert2"
import {
  Shield,
  Check,
  Star,
  AlertCircle,
  Crown,
  Users,
  Award,
  Building,
  ArrowLeft,
  Sparkles,
  Loader,
  CheckCircle,
  CreditCard,
} from "lucide-react"

interface MembershipPlan {
  id: string
  name: string
  price: number
  duration: string
  features: string[]
  current: boolean
  popular?: boolean
  icon: React.ReactNode
  color: string
}

interface MembershipDetails {
  _id: string
  status: string
  membershipType: string
  issueDate: string
  expiryDate: string
  userId: string
  email: string
}

const Membership = () => {
  const [currentPlan, setCurrentPlan] = useState<MembershipPlan | null>(null)
  const [membershipDetails, setMembershipDetails] = useState<MembershipDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [upgrading, setUpgrading] = useState<string | null>(null)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [isMember, setIsMember] = useState(false)
  const navigate = useNavigate()
  const { user, token } = useAppSelector(state => state.auth)

  const plans: MembershipPlan[] = [
    {
      id: "student",
      name: "Student",
      price: 500,
      duration: "1 Year",
      features: [
        "Access to research papers",
        "Student networking events",
        "Basic cybersecurity resources",
        "Monthly newsletter",
        "Community forum access",
      ],
      current: false,
      icon: <Users className="h-8 w-8" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "professional",
      name: "Professional",
      price: 2000,
      duration: "1 Year",
      features: [
        "All Student benefits",
        "Professional certification",
        "Industry networking events",
        "Advanced research access",
        "Career development resources",
        "Priority support",
      ],
      current: false,
      popular: true,
      icon: <Award className="h-8 w-8" />,
      color: "from-red-500 to-red-600",
    },
    {
      id: "corporate",
      name: "Corporate",
      price: 10000,
      duration: "1 Year",
      features: [
        "All Professional benefits",
        "Corporate training programs",
        "Priority support",
        "Custom research reports",
        "Executive networking",
        "Brand visibility opportunities",
        "Dedicated account manager",
      ],
      current: false,
      icon: <Building className="h-8 w-8" />,
      color: "from-purple-500 to-purple-600",
    },
  ]

  useEffect(() => {
    fetchMembershipStatus()
  }, [token])

  const fetchMembershipStatus = async () => {
    try {
      setLoading(true);
      
      if (!token || !user?.email) {
        setIsMember(false);
        setLoading(false);
        return;
      }

      console.log("Fetching membership for user:", user.email);
      
      // Try first by email directly since that might be more reliable
      let membershipResponse;
      try {
        membershipResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/membership/email/${encodeURIComponent(user.email)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (emailError) {
        console.log("Email endpoint failed, trying current endpoint");
        // If email endpoint fails, try the current endpoint
        membershipResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/membership/current`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      if (membershipResponse.data.success && membershipResponse.data.membership) {
        const membership = membershipResponse.data.membership;
        setMembershipDetails(membership);
        setIsMember(true);
        
        // Map membership type to plan ID (case-insensitive)
        const membershipType = (membership.membershipType || '').toLowerCase();
        let planId = 'student'; // default to student
        
        if (membershipType.includes('professional')) {
          planId = 'professional';
        } else if (membershipType.includes('corporate') || membershipType.includes('enterprise')) {
          planId = 'corporate';
        } else if (membershipType.includes('student')) {
          planId = 'student';
        }
        
        console.log("Membership type:", membershipType, "mapped to plan:", planId);
        
        // Update the plans with the current plan
        const updatedPlans = plans.map(plan => ({
          ...plan,
          current: plan.id === planId
        }));
        
        setCurrentPlan(updatedPlans.find(p => p.current) || null);
      } else {
        setIsMember(false);
        setCurrentPlan(null);
        setMembershipDetails(null);
      }
    } catch (error) {
      console.error("Error in fetchMembershipStatus:", error);
      
      // Special handling for 404 - might mean no membership yet
      if (error.response?.status === 404) {
        console.log("No membership found for this user");
        setIsMember(false);
        setCurrentPlan(null);
        setMembershipDetails(null);
        // Don't set an error for a 404
        
        // Try to fetch by email instead - as a fallback
        try {
          if (user?.email) {
            const emailResponse = await axios.get(
              `${import.meta.env.VITE_API_URL}/api/membership/email/${encodeURIComponent(user.email)}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            
            if (emailResponse.data.success && emailResponse.data.membership) {
              const membership = emailResponse.data.membership;
              setMembershipDetails(membership);
              setIsMember(true);
              
              // Map membership type to plan ID (case-insensitive)
              const membershipType = (membership.membershipType || '').toLowerCase();
              let planId = 'student'; // default to student
              
              if (membershipType.includes('professional')) {
                planId = 'professional';
              } else if (membershipType.includes('corporate') || membershipType.includes('enterprise')) {
                planId = 'corporate';
              } else if (membershipType.includes('student')) {
                planId = 'student';
              }
              
              console.log("Membership type:", membershipType, "mapped to plan:", planId);
              
              // Update the plans with the current plan
              const updatedPlans = plans.map(plan => ({
                ...plan,
                current: plan.id === planId
              }));
              
              setCurrentPlan(updatedPlans.find(p => p.current) || null);
            }
          }
        } catch (emailError) {
          console.log("Fallback email lookup also failed");
        }
      } else {
        setError("Failed to load membership information. Please try again later.");
        setIsMember(false);
        setCurrentPlan(null);
        setMembershipDetails(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (planId: string) => {
    setUpgrading(planId)
    setError("")
    setSuccess("")

    try {
      // Verify the user is logged in
      if (!token) {
        setError("You must be logged in to upgrade your membership");
        return;
      }

      // First verify the current plan from the backend
      const currentMembershipResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/membership/current`, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const currentMembership = currentMembershipResponse.data.membership;
      const currentType = (currentMembership?.membershipType || "").toLowerCase();

      // Validate that this is a valid upgrade path
      if (
        (currentType.includes('corporate') && planId !== 'corporate') ||
        (currentType.includes('professional') && planId === 'student')
      ) {
        setError("You cannot downgrade from your current plan");
        return;
      }

      // Proceed with the upgrade
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/membership/upgrade`, 
        { 
          planId,
          currentMembershipId: currentMembership._id // Include the current membership ID
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setSuccess("Membership upgraded successfully!");
        await fetchMembershipStatus();
        
        await Swal.fire({
          icon: 'success',
          title: 'Upgrade Successful',
          text: 'Your membership has been upgraded successfully!',
          confirmButtonColor: '#dc2626',
        });
      } else {
        setError(response.data.message || "Failed to upgrade membership");
      }
    } catch (error) {
      console.error("Upgrade error:", error);
      setError(error.response?.data?.message || "Network error. Please try again.");
    } finally {
      setUpgrading(null);
    }
  }

  const handlePlanAction = async (planId: string) => {
    if (isMember) {
      // Don't allow downgrading from higher plans to lower plans
      if (
        (currentPlan?.id === 'corporate' && (planId === 'professional' || planId === 'student')) || 
        (currentPlan?.id === 'professional' && planId === 'student')
      ) {
        Swal.fire({
          icon: 'warning',
          title: 'Downgrade Not Allowed',
          text: 'You cannot downgrade from a higher plan to a lower plan.',
          confirmButtonColor: '#dc2626',
        });
        return;
      }
      
      // Don't allow "upgrading" to the same plan
      if (currentPlan?.id === planId) {
        Swal.fire({
          icon: 'info',
          title: 'Already Subscribed',
          text: 'You are already subscribed to this plan.',
          confirmButtonColor: '#dc2626',
        });
        return;
      }
      
      // Confirm upgrade
      const result = await Swal.fire({
        icon: 'question',
        title: 'Confirm Upgrade',
        text: `Are you sure you want to upgrade to the ${planId.charAt(0).toUpperCase() + planId.slice(1)} plan?`,
        showCancelButton: true,
        confirmButtonColor: '#dc2626',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, upgrade!'
      });
      
      if (result.isConfirmed) {
        await handleUpgrade(planId);
      }
    } else {
      // If user is not logged in, redirect to login
      if (!token) {
        Swal.fire({
          icon: 'info',
          title: 'Login Required',
          text: 'Please log in to apply for membership',
          confirmButtonColor: '#dc2626',
        }).then(() => {
          navigate('/login', { state: { from: `/membership-form?plan=${planId}` } });
        });
        return;
      }
      
      // Before navigating to membership form, check if user already has a membership
      try {
        setUpgrading(planId); // Show loading state
        
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/membership/email/${encodeURIComponent(user.email)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        // If user already has a membership, redirect to membership page
        if (response.data.success && response.data.membership) {
          Swal.fire({
            icon: 'info',
            title: 'Membership Exists',
            text: 'You already have a membership. You can upgrade it from the membership page.',
            confirmButtonColor: '#dc2626',
          }).then(() => {
            navigate('/membership');
          });
        } else {
          // If no membership, proceed to membership form
          navigate(`/membership-form?plan=${planId}`);
        }
      } catch (error) {
        console.error("Error checking existing membership:", error);
        
        // If error is 404, it means no membership found, so proceed to form
        if (error.response?.status === 404) {
          navigate(`/membership-form?plan=${planId}`);
        } else {
          // For other errors, show error message but still navigate to form
          console.warn("Couldn't verify membership status, proceeding to form anyway");
          navigate(`/membership-form?plan=${planId}`);
        }
      } finally {
        setUpgrading(null); // Hide loading state
      }
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long',
      day: 'numeric'
    });
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-red-100 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        </div>
        <div className="text-center relative z-10">
          <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <Loader className="h-12 w-12 animate-spin text-red-500 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">Loading membership details...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-red-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors mb-6 group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back</span>
          </button>

          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-2xl shadow-lg">
                <Crown className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Membership Plans</h1>
            <p className="text-xl text-gray-600 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-red-500 mr-2" />
              {isMember ? "Manage your membership plan" : "Choose the perfect plan for your needs"}
            </p>
          </div>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 rounded-lg max-w-4xl mx-auto">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8 rounded-lg max-w-4xl mx-auto">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <p className="text-green-700 font-medium">{success}</p>
            </div>
          </div>
        )}

        {/* Current Plan Status */}
        {currentPlan && membershipDetails && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className={`p-4 bg-gradient-to-r ${currentPlan.color} rounded-2xl shadow-lg`}>
                  {currentPlan.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Current Plan: {currentPlan.name}</h3>
                  <p className="text-gray-600">
                    ₹{currentPlan.price.toLocaleString()} per {currentPlan.duration}
                  </p>
                </div>
              </div>
              <div className="text-left md:text-right">
                <div className="flex flex-col gap-1">
                  <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Active
                  </span>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">ID:</span> {membershipDetails._id}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Valid Until:</span> {formatDate(membershipDetails.expiryDate)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const isCurrentPlan = currentPlan?.id === plan.id;
            const isUpgrading = upgrading === plan.id;
            
            // Determine button text and availability
            let buttonText = 'Apply Now';
            let isButtonDisabled = false;
            
            if (isMember) {
              if (isCurrentPlan) {
                buttonText = 'Current Plan';
                isButtonDisabled = true;
              } else if (plan.id === 'student' && (currentPlan?.id === 'professional' || currentPlan?.id === 'corporate')) {
                buttonText = 'Cannot Downgrade';
                isButtonDisabled = true;
              } else if (plan.id === 'professional' && currentPlan?.id === 'corporate') {
                buttonText = 'Cannot Downgrade';
                isButtonDisabled = true;
              } else {
                buttonText = 'Upgrade Plan';
              }
            }

            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                  plan.popular ? 'ring-2 ring-red-500' : ''
                } ${isCurrentPlan ? 'ring-2 ring-green-500' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    POPULAR
                  </div>
                )}
                {isCurrentPlan && (
                  <div className="absolute top-0 left-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg">
                    CURRENT PLAN
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${plan.color} text-white mr-4`}>
                        {plan.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                        <p className="text-gray-500">{plan.duration}</p>
                      </div>
                    </div>
                    {isCurrentPlan && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <CheckCircle className="h-4 w-4 mr-1" /> Active
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-6">
                    <p className="text-4xl font-extrabold text-gray-900">
                      ₹{plan.price.toLocaleString()}
                      <span className="text-base font-medium text-gray-500">/year</span>
                    </p>
                  </div>
                  
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8">
                    <button
                      onClick={() => handlePlanAction(plan.id)}
                      disabled={isButtonDisabled}
                      className={`w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md font-medium ${
                        isButtonDisabled
                          ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                          : `bg-gradient-to-r ${plan.color} text-white hover:opacity-90`
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors`}
                    >
                      {isUpgrading ? (
                        <>
                          <Loader className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                          Processing...
                        </>
                      ) : (
                        buttonText
                      )}
                    </button>
                    
                    {isCurrentPlan && membershipDetails && (
                      <div className="mt-3 text-center">
                        <p className="text-sm text-green-600">
                          Your membership is active until {formatDate(membershipDetails.expiryDate)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security Notice */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white rounded-full shadow-md border border-gray-100">
            <Shield className="h-5 w-5 text-red-500 mr-3" />
            <span className="text-gray-600 font-medium">Secure payment processing with 256-bit encryption</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Membership
