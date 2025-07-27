import React, { useState } from 'react';
import { Search, Menu, ArrowRight, Shield, Zap, Server, Database, Lock, Globe, Users, Brain, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom'; // Add this import

const InnovationHub: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
     


      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Case 1 */}
            <div className="space-y-4">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-03-09%2017-18-49-RoevNTJBvP2HJTgY2w6QrM3mqeNQmz.png" 
                alt="Digital platform visualization" 
                className="w-full h-48 object-cover rounded-lg"
              />
              <div>
                <div className="uppercase text-sm font-semibold text-gray-500 mb-2">CASE</div>
                <h3 className="text-2xl font-bold mb-2">CyberShield: Threat Intelligence Platform</h3>
                <p className="text-gray-700">
                  In 2023 the cybersecurity company SecureNet, who works within defense, changed their name to CyberShield. Innovation Hub provided a digital solution in order to engage analysts in the change.
                </p>
              </div>
            </div>
            
            {/* Case 2 */}
            <div className="space-y-4">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-03-09%2017-10-39-fzdi27H1VC3w0h4SOP784gafLKg1Ts.png" 
                alt="Mobile app interfaces" 
                className="w-full h-48 object-cover rounded-lg"
              />
              <div>
                <div className="uppercase text-sm font-semibold text-gray-500 mb-2">CASE</div>
                <h3 className="text-2xl font-bold mb-2">SecureNet: Government Security Operations</h3>
                <p className="text-gray-700">
                  Innovation Hub's digital platform, SecureNet, helped the government security operations center gather internal ideas and turn them into real projects.
                </p>
              </div>
            </div>
            
            {/* Case 3 */}
            <div className="space-y-4">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-03-09%2017-10-54-CL28MIfGvnkl0VcYNkYiRQNpaR004S.png" 
                alt="People looking at devices" 
                className="w-full h-48 object-cover rounded-lg"
              />
              <div>
                <div className="uppercase text-sm font-semibold text-gray-500 mb-2">CASE</div>
                <h3 className="text-2xl font-bold mb-2">The Agency for Cyber Defense: Future of threat detection</h3>
                <p className="text-gray-700">
                  Alongside digitalization comes a change in the need for public cybersecurity. Innovation Hub contributed with knowledge and perspectives in regards to the strategy of future threat detection and the initiative.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Want to know more section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Want to know more about Innovation-as-a-service?</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <img 
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-03-09%2017-18-40-Ln9G1YSNqMYlP20xgKkgmPWT1JENHx.png" 
                  alt="Profile" 
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">Alex Morgan</h3>
                <p className="text-gray-600">Partner</p>
                <p className="text-gray-600">+45 61 78 33 91</p>
              </div>
            </div>
            
            <a href="#" className="bg-white border-2 border-red-500 text-red-500 px-6 py-2 rounded-full hover:bg-red-50 transition">
              Send mail
            </a>
          </div>
        </div>
      </section>

      {/* Acceleration Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <a href="#" className="inline-block mb-6">
                <div className="bg-red-500 text-white px-3 py-2 rounded">
                  <span className="text-xs">✦</span> <span className="font-semibold">innovationhub</span>
                </div>
              </a>
              
              <h2 className="text-3xl font-bold mb-6">Acceleration and incubation</h2>
              
              <div className="w-16 h-1 bg-red-500 mb-6"></div>
              
              <p className="text-gray-700 mb-6">
                To the experienced, everything happens faster. To the new, nothing is fast enough. As an experienced organisation, you need to tap into the energy and momentum of the new – and the new need your experience and platform. Innovation Hub has since building incubator facilities for cybersecurity firms in the US graduated to building startup factories and accelerator programs all over the world. From startup weekends to fully decorated incubator spaces, we can take care of establishing and servicing your very own acceleration "ward".
              </p>
            </div>
            
            <div className="md:w-1/2">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-03-09%2017-18-45-EZ0SUkQr6MAy9RU7XD1Zmf3fkDcelo.png" 
                alt="Modern office space" 
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Force Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 max-w-3xl">We can be your available transformation force at a monthly premium.</h2>
          
          <div className="w-16 h-1 bg-red-500 mb-8"></div>
          
          <p className="text-gray-700 mb-12 max-w-4xl">
            We are 45 people spread across sectors, countries, expertise but with one shared trait: We make happen. The good news is that you can tap into us all like a service and reel your very own Innovation Hub in to foster ideas, cultivate them, transform your organization and put follow through to your projects. We can be your available transformation force at a monthly premium and you only pay for what you get. The tools and methods we apply, you are free to used and you can always cut us back out of the equation. What's not to like.
          </p>
          
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-03-09%2017-18-53-0nfq6tbz96gGuOv52CZYgVZbHORBTG.png" 
                alt="Drone hovering over hand" 
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Radar</h2>
              
              <div className="w-16 h-1 bg-red-500 mb-6"></div>
              
              <p className="text-gray-700">
                It is impossible to keep track of relevant developments in the world. You will always lose out on unknown unknowns, insights from other industries and important implementation notes that aren't part of the trend report. We can update your horizon in a 360 view, as we operate globally and practically, adopting and applying methodologies ourselves. We not only tell you what's coming, we show you how to use it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Agile Innovation Programs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-03-09%2017-18-57-lRtV75Nj6LexmtzXQ1RQf3xycuEqE1.png" 
                alt="People looking at whiteboard" 
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Agile Innovation Programs</h2>
              
              <div className="w-16 h-1 bg-red-500 mb-6"></div>
              
              <p className="text-gray-700">
                We have steady work formats with monthly deliverables to be spread out across a full year where focus is on applying and adopting the tools of a new and digitally literate work force. You gain from hackathons, prototypes, sprints and the best of scrum team training to secure that your organization can become the organism it needs to be to attract talent and deliver on the promise of digital transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter and Membership - Updated with proper routing */}
      <section className="py-16 bg-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-200 rounded-full -mr-48 -mt-48 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-200 rounded-full -ml-48 -mb-48 opacity-50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <a href="#" className="inline-block mb-6">
                <div className="bg-red-500 text-white px-3 py-2 rounded">
                  <span className="text-xs">✦</span> <span className="font-semibold">innovationhub</span>
                </div>
              </a>
              
              <h2 className="text-3xl font-bold mb-4">Newsletter</h2>
              <p className="text-gray-700 mb-6">
                Want to know more about innovation, digitalization, and new technologies in cybersecurity?
              </p>
              
              <Link 
                to="/signIn" 
                className="inline-block border-2 border-red-500 text-red-500 px-8 py-2 rounded-full hover:bg-red-50 transition"
              >
                Sign up
              </Link>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-4">Membership</h2>
              <p className="text-gray-700 mb-6">
                Looking for a horizontal overview of tech and innovation in cybersecurity?
              </p>
              
              <Link 
                to="/membership-form" 
                className="inline-block border-2 border-red-500 text-red-500 px-8 py-2 rounded-full hover:bg-red-50 transition"
              >
                Join
              </Link>
            </div>
          </div>
        </div>
      </section>

   
    </div>
  );
};

export default InnovationHub;