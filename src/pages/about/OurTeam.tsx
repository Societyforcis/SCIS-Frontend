import { useEffect } from 'react';
import AOS from 'aos';

const teamMembers = [
  {
    name: 'Dr. Sarah Johnson',
    role: 'President',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    bio: 'Leading expert in Artificial Intelligence with over 15 years of experience'
  },
  {
    name: 'Prof. Michael Chen',
    role: 'Vice President',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    bio: 'Renowned researcher in Machine Learning and Neural Networks'
  },
  {
    name: 'Dr. Emily Williams',
    role: 'Secretary',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    bio: 'Specialist in Robotics and Automation Systems'
  }
];

export default function OurTeam() {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Meet our dedicated team of experts leading the advancement of intelligent systems
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>

        <div 
          className="mt-16 bg-white rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-all duration-300"
          data-aos="fade-up"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Join Our Team</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
            We're always looking for talented individuals who are passionate about intelligent systems
            and want to make a difference in the field.
          </p>
          <div className="text-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full inline-flex items-center gap-2 transition-colors text-lg font-medium">
              View Open Positions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}