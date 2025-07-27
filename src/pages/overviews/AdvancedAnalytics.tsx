"use client"

import { useEffect } from "react"
import { BarChart, TrendingUp, Shield, Brain, Settings, Monitor, Zap, Target } from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"

export default function AdvancedAnalytics() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    })
  }, [])

  const analyticsCapabilities = [
    {
      icon: Brain,
      title: "AI-Powered Threat Detection",
      description: "Machine learning algorithms analyze patterns to identify potential threats before they materialize.",
      features: ["Real-time threat scoring", "Behavioral analysis", "Anomaly detection", "Predictive modeling"]
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "Forecast security risks and vulnerabilities using advanced predictive modeling techniques.",
      features: ["Risk forecasting", "Trend analysis", "Vulnerability prediction", "Attack simulation"]
    },
    {
      icon: BarChart,
      title: "Real-time Dashboards",
      description: "Customizable dashboards provide instant visibility into your security posture and metrics.",
      features: ["Live monitoring", "Custom visualizations", "Interactive charts", "Automated reporting"]
    },
    {
      icon: Settings,
      title: "Advanced Integrations",
      description: "Seamlessly integrate with existing security tools and SIEM platforms for unified analytics.",
      features: ["SIEM integration", "API connectivity", "Data normalization", "Custom workflows"]
    }
  ]

  const analyticsTools = [
    {
      name: "Threat Intelligence Analyzer",
      description: "Advanced threat correlation and analysis platform with real-time intelligence feeds.",
      metrics: { accuracy: "99.2%", speed: "< 1ms", coverage: "500M+ IOCs" },
      capabilities: ["IOC correlation", "Threat actor profiling", "Campaign tracking", "Attribution analysis"]
    },
    {
      name: "Vulnerability Assessment Suite",
      description: "Comprehensive vulnerability scanning and prioritization with risk-based analytics.",
      metrics: { scanned: "10M+ assets", detected: "2M+ vulns", accuracy: "97.8%" },
      capabilities: ["Asset discovery", "Risk scoring", "Remediation planning", "Compliance tracking"]
    },
    {
      name: "Incident Response Dashboard",
      description: "Streamlined incident management with automated workflows and team coordination.",
      metrics: { incidents: "50K+ handled", response: "< 15min", resolution: "85% automated" },
      capabilities: ["Timeline reconstruction", "Evidence collection", "Team coordination", "Automated response"]
    }
  ]

  const performanceMetrics = [
    { metric: "99.7%", label: "Threat Detection Accuracy" },
    { metric: "< 2ms", label: "Average Response Time" },
    { metric: "95%", label: "False Positive Reduction" },
    { metric: "24/7", label: "Continuous Monitoring" }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-500 to-black text-white py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-red-500/50 to-transparent" />
        <div className="container mx-auto px-6 relative" data-aos="fade-up">
          <h1 className="text-5xl font-serif mb-6 leading-tight">Advanced Analytics Platform</h1>
          <p className="text-xl max-w-3xl leading-relaxed mb-8">
            Transform your cybersecurity operations with AI-powered analytics that provide deep insights, 
            predictive intelligence, and automated threat response.
          </p>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 inline-block">
            <p className="text-lg font-medium">Powered by machine learning and real-time data processing</p>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6" data-aos="fade-up">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">{metric.metric}</div>
                <div className="text-gray-600">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Capabilities */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16" data-aos="fade-up">
            Analytics Capabilities
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {analyticsCapabilities.map((capability, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <capability.icon className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{capability.title}</h3>
                    <p className="text-gray-600 mb-4">{capability.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {capability.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Dashboard Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-4xl font-serif mb-4">Real-Time Analytics Dashboard</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Monitor threats, analyze patterns, and respond to incidents with our comprehensive analytics interface.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl p-8" data-aos="fade-up">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-red-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">1,247</div>
                <div className="text-gray-600">Active Threats Detected</div>
              </div>
              <div className="bg-green-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">99.7%</div>
                <div className="text-gray-600">Detection Accuracy</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">2.3s</div>
                <div className="text-gray-600">Average Response Time</div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Threat Trend Analysis</p>
                  <p className="text-sm text-gray-500">Real-time visualization of threat patterns</p>
                </div>
              </div>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Monitor className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Security Posture Monitoring</p>
                  <p className="text-sm text-gray-500">Live status of all security controls</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Tools */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16" data-aos="fade-up">
            Specialized Analytics Tools
          </h2>
          <div className="space-y-8">
            {analyticsTools.map((tool, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  <div className="md:col-span-2">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{tool.name}</h3>
                    <p className="text-gray-600 mb-4">{tool.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      {tool.capabilities.map((capability, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <Target className="w-4 h-4 text-red-500" />
                          {capability}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-bold text-gray-900 mb-4">Performance Metrics</h4>
                    <div className="space-y-3">
                      {Object.entries(tool.metrics).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-gray-600 capitalize">{key}:</span>
                          <span className="font-bold text-red-500">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16" data-aos="fade-up">
            Why Choose Our Analytics Platform
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center" data-aos="fade-up">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-600">Process millions of events per second with sub-millisecond response times</p>
            </div>
            <div className="text-center" data-aos="fade-up" data-aos-delay="100">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered</h3>
              <p className="text-gray-600">Advanced machine learning algorithms continuously improve threat detection</p>
            </div>
            <div className="text-center" data-aos="fade-up" data-aos-delay="200">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Enterprise Ready</h3>
              <p className="text-gray-600">Scalable architecture designed for the most demanding enterprise environments</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-br from-red-500 to-black text-white">
        <div className="container mx-auto px-6 text-center" data-aos="fade-up">
          <h2 className="text-3xl font-serif mb-6">Transform Your Security Operations</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover how our advanced analytics platform can revolutionize your cybersecurity posture.
          </p>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 inline-block">
            <h3 className="text-xl font-bold mb-4">Get Started Today</h3>
            <p className="mb-2">analytics@societycis.org</p>
            <p>+1 (888) 555-ANALYTICS</p>
          </div>
        </div>
      </section>
    </div>
  )
}
