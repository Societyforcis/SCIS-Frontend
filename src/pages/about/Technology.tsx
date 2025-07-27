import type React from "react"
import {
  Shield,
  Database,
  PenTool,
  Cloud,
  ChevronRight,
  CheckCircle,
  Lock,
  Eye,
  Zap,
  Users,
  Globe,
  Server,
  AlertTriangle,
  Target,
  Activity,
  Cpu,
} from "lucide-react"

const Technology: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-black to-red-900/10"></div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(239, 68, 68, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(239, 68, 68, 0.05) 0%, transparent 50%)`,
            }}
          ></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-3 rounded-full backdrop-blur-sm">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold">Advanced Cyber Defense</span>
                </div>

                {/* Main Heading */}
                <div className="space-y-6">
                  <h1 className="text-7xl lg:text-8xl font-black leading-none">
                    <span className="text-white">SECURE</span>
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-red-600">
                      YOUR
                    </span>
                    <br />
                    <span className="text-white">FUTURE</span>
                  </h1>

                  <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>

                  <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                    Next-generation cybersecurity solutions that adapt to evolving threats. Protect your digital
                    infrastructure with military-grade security protocols and AI-powered threat detection.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button className="group relative px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Start Security Assessment
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>

                  <button className="group px-8 py-4 border-2 border-red-500/30 hover:border-red-500 text-white font-bold rounded-lg transition-all duration-300 hover:bg-red-500/5">
                    <div className="flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      View Live Demo
                    </div>
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-800">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-500">99.9%</div>
                    <div className="text-sm text-gray-400 mt-1">Threat Detection</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-500">24/7</div>
                    <div className="text-sm text-gray-400 mt-1">Monitoring</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-500">500+</div>
                    <div className="text-sm text-gray-400 mt-1">Clients Protected</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Security Dashboard */}
            <div className="lg:col-span-5">
              <div className="relative">
                {/* Main Dashboard Card */}
                <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Security Status</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-sm font-medium">SECURE</span>
                    </div>
                  </div>

                  {/* Threat Level Indicator */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-300">Threat Level</span>
                      <span className="text-green-400 font-semibold">LOW</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full"
                        style={{ width: "25%" }}
                      ></div>
                    </div>
                  </div>

                  {/* Security Metrics Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                          <Shield className="w-5 h-5 text-red-400" />
                        </div>
                        <div>
                          <div className="text-white font-semibold">Firewall</div>
                          <div className="text-green-400 text-sm">Active</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                          <Activity className="w-5 h-5 text-red-400" />
                        </div>
                        <div>
                          <div className="text-white font-semibold">Monitoring</div>
                          <div className="text-green-400 text-sm">Online</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                          <Lock className="w-5 h-5 text-red-400" />
                        </div>
                        <div>
                          <div className="text-white font-semibold">Encryption</div>
                          <div className="text-green-400 text-sm">256-bit</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                          <Target className="w-5 h-5 text-red-400" />
                        </div>
                        <div>
                          <div className="text-white font-semibold">Threats</div>
                          <div className="text-green-400 text-sm">0 Detected</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="space-y-3">
                    <h4 className="text-white font-semibold mb-3">Recent Activity</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-300">System scan completed</span>
                        <span className="text-gray-500 ml-auto">2m ago</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-gray-300">Blocked malicious IP</span>
                        <span className="text-gray-500 ml-auto">5m ago</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-gray-300">Security update applied</span>
                        <span className="text-gray-500 ml-auto">1h ago</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-red-500/10 rounded-full border border-red-500/20 flex items-center justify-center backdrop-blur-sm">
                  <Cpu className="w-8 h-8 text-red-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Threat Intelligence Section */}
      <div className="relative py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left - Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-full">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="font-semibold">Threat Intelligence</span>
                </div>

                <h2 className="text-5xl font-black text-white leading-tight">
                  CYBER THREATS
                  <br />
                  <span className="text-red-500">EVOLVING DAILY</span>
                </h2>

                <div className="w-16 h-1 bg-red-500 rounded-full"></div>

                <p className="text-xl text-gray-300 leading-relaxed">
                  Cybercriminals launch over 4,000 attacks every day. Our AI-powered defense systems analyze millions of
                  threat patterns to keep you protected against both known and zero-day exploits.
                </p>
              </div>

              {/* Feature List */}
              <div className="space-y-6">
                {[
                  {
                    icon: <Zap className="w-6 h-6" />,
                    title: "Real-time Threat Detection",
                    desc: "Instant identification and neutralization",
                  },
                  {
                    icon: <Globe className="w-6 h-6" />,
                    title: "Global Threat Intelligence",
                    desc: "Worldwide network monitoring",
                  },
                  {
                    icon: <Cpu className="w-6 h-6" />,
                    title: "AI-Powered Analysis",
                    desc: "Machine learning threat prediction",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center justify-center text-red-400 group-hover:bg-red-500/20 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="group inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                Learn More About Threats
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right - Threat Visualization */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8">
                <h3 className="text-white text-xl font-bold mb-8">Global Threat Map</h3>

                {/* Threat Statistics */}
                <div className="space-y-6">
                  {[
                    { name: "Malware Attacks", value: 87, color: "bg-red-500", count: "2.4M" },
                    { name: "Phishing Attempts", value: 73, color: "bg-orange-500", count: "1.8M" },
                    { name: "Ransomware", value: 61, color: "bg-yellow-500", count: "945K" },
                    { name: "Data Breaches", value: 45, color: "bg-purple-500", count: "623K" },
                    { name: "DDoS Attacks", value: 38, color: "bg-pink-500", count: "412K" },
                  ].map((threat, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 font-medium">{threat.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-white font-bold">{threat.count}</span>
                          <span className="text-red-400 text-sm">{threat.value}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div
                          className={`${threat.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${threat.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Live Updates */}
                <div className="mt-8 pt-6 border-t border-gray-800">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-white font-semibold">Live Threat Feed</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between text-gray-400">
                      <span>Blocked: 127.0.0.1</span>
                      <span>Now</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-400">
                      <span>Malware detected: trojan.exe</span>
                      <span>2s ago</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-400">
                      <span>Phishing attempt blocked</span>
                      <span>5s ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Solutions Grid */}
      <div className="relative py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-full mb-6">
              <Shield className="w-4 h-4" />
              <span className="font-semibold">Security Arsenal</span>
            </div>

            <h2 className="text-5xl font-black text-white mb-6">
              COMPREHENSIVE
              <br />
              <span className="text-red-500">PROTECTION SUITE</span>
            </h2>

            <div className="w-16 h-1 bg-red-500 rounded-full mx-auto mb-6"></div>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Military-grade security solutions designed to protect every aspect of your digital infrastructure
            </p>
          </div>

          {/* Solutions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Network Fortress",
                description:
                  "Advanced firewall protection with deep packet inspection and intrusion prevention systems",
                features: ["Next-gen Firewall", "IPS/IDS", "VPN Gateway"],
                color: "red",
              },
              {
                icon: <Database className="w-8 h-8" />,
                title: "Data Vault",
                description: "Military-grade encryption and secure data storage with compliance management",
                features: ["AES-256 Encryption", "Data Loss Prevention", "Compliance Tools"],
                color: "red",
              },
              {
                icon: <Cloud className="w-8 h-8" />,
                title: "Cloud Shield",
                description: "Comprehensive cloud security with multi-cloud protection and monitoring",
                features: ["Cloud Access Security", "CASB", "Cloud Workload Protection"],
                color: "red",
              },
              {
                icon: <PenTool className="w-8 h-8" />,
                title: "Penetration Testing",
                description: "Ethical hacking and vulnerability assessments by certified security experts",
                features: ["Red Team Exercises", "Vulnerability Scans", "Security Audits"],
                color: "red",
              },
              {
                icon: <Eye className="w-8 h-8" />,
                title: "Threat Hunting",
                description: "24/7 security monitoring with AI-powered threat detection and response",
                features: ["SIEM/SOAR", "Threat Intelligence", "Incident Response"],
                color: "red",
              },
              {
                icon: <Server className="w-8 h-8" />,
                title: "Endpoint Defense",
                description: "Advanced endpoint protection with behavioral analysis and zero-trust architecture",
                features: ["EDR/XDR", "Behavioral Analysis", "Zero Trust"],
                color: "red",
              },
            ].map((service, index) => (
              <div key={index} className="group relative">
                <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-red-500/50 rounded-2xl p-8 h-full transition-all duration-300 hover:transform hover:scale-105">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center text-red-400 mb-6 group-hover:bg-red-500/20 transition-colors">
                    {service.icon}
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-red-400 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-gray-300 leading-relaxed">{service.description}</p>

                    {/* Features */}
                    <div className="space-y-2 pt-4">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                          <span className="text-gray-400 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="pt-4">
                      <button className="group/btn inline-flex items-center gap-2 text-red-400 hover:text-red-300 font-semibold transition-colors">
                        Learn More
                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="relative py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-white mb-6">
              WHY CHOOSE
              <br />
              <span className="text-red-500">OUR DEFENSE</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Industry-leading expertise backed by cutting-edge technology and proven results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="w-12 h-12" />,
                title: "Elite Security Team",
                description: "Certified ethical hackers and security architects with decades of experience",
                stat: "50+ Experts",
                highlight: "CISSP, CEH, OSCP Certified",
              },
              {
                icon: <Target className="w-12 h-12" />,
                title: "Proven Track Record",
                description: "Successfully defended against millions of attacks across global enterprises",
                stat: "99.9% Success",
                highlight: "Zero Successful Breaches",
              },
              {
                icon: <Activity className="w-12 h-12" />,
                title: "24/7 War Room",
                description: "Round-the-clock monitoring by our Security Operations Center",
                stat: "24/7/365",
                highlight: "< 60 Second Response",
              },
              {
                icon: <CheckCircle className="w-12 h-12" />,
                title: "Compliance Ready",
                description: "Meet all major regulatory requirements and industry standards",
                stat: "100% Compliant",
                highlight: "SOC 2, ISO 27001, GDPR",
              },
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 hover:border-red-500/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 text-red-400 group-hover:bg-red-500/20 transition-colors">
                    {item.icon}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-gray-300 mb-4 leading-relaxed">{item.description}</p>

                  <div className="space-y-2">
                    <div className="text-3xl font-black text-red-500">{item.stat}</div>
                    <div className="text-sm text-gray-400">{item.highlight}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-32 bg-gradient-to-r from-red-900 via-red-800 to-red-900">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="space-y-8">
            <h2 className="text-5xl font-black text-white leading-tight">
              READY TO FORTIFY
              <br />
              <span className="text-red-200">YOUR DEFENSES?</span>
            </h2>

            <p className="text-xl text-red-100 max-w-2xl mx-auto">
              Get a comprehensive security assessment and discover vulnerabilities before attackers do. Our experts are
              standing by.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <button className="group px-10 py-5 bg-white text-red-600 font-bold rounded-lg hover:bg-red-50 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <div className="flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  Get Free Security Audit
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button className="group px-10 py-5 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-red-600 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  Talk to Security Expert
                </div>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-8 pt-16 border-t border-red-700/50">
              <div className="text-center">
                <div className="text-4xl font-black text-white mb-2">500+</div>
                <div className="text-red-200">Enterprise Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-white mb-2">10M+</div>
                <div className="text-red-200">Threats Blocked</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-white mb-2">15+</div>
                <div className="text-red-200">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Technology
