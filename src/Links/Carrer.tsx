import React, { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Home, ChevronUp } from 'lucide-react';
import ai from "../components/images/s1.avif";
import Footer from "../components/Footer"
const CyberIntelligencePage: React.FC = () => {
  const [showScrollDown, setShowScrollDown] = useState(true);

  const handleScrollDown = () => {
    window.scrollBy({
      top: 500,
      behavior: 'smooth'
    });
    setShowScrollDown(false);
  };

  return (
    <div className="font-sans text-gray-800">
     
      <div className="relative h-[600px] bg-gray-100">
        <div 
          className="h-[600px] bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${ai})`,
            backgroundPosition: 'center 30%'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          
        
          {/* <div className="relative z-10 pt-8 pl-8 flex items-center text-white">
            <Home className="w-5 h-5" />
            <span className="mx-2">/</span>
            <span>About the Cyber Intelligence Systems Community</span>
          </div> */}
          
         
          <div className="relative z-10 pt-16 pl-8 md:pl-16 ml-[750px]">
            <h1 className="text-5xl font-bold text-white ">Work for us</h1>
          </div>
       
          {showScrollDown && (
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
              <button 
                onClick={handleScrollDown}
                className="bg-white w-12 h-12 rounded flex items-center justify-center shadow-lg"
              >
                <ChevronDown className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          )}
        </div>
      </div>
      
    
      
    
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row">
  
          <div className="md:w-3/4 pr-0 md:pr-12">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">What's it like to work at the Cyber Intelligence Systems Community?</h2>
              <p className="mb-4">
                The Cyber Intelligence Systems Community is the independent intelligence academy focused on cybersecurity. Our aim is to recognize, promote and support excellence in 
                cyber intelligence, and to encourage the development and use of advanced security systems for the benefit of humanity.
              </p>
              <p>
                We have a wide range of roles and are based in one location overlooking a modern tech campus and near major transportation hubs.
              </p>
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Learn</h2>
              <p className="mb-4">
                The Community wants to ensure every member of staff has the right opportunities to learn and develop their knowledge and skills. 
                This can take many forms such as coaching, leadership training, upskilling, and mentoring. Staff can also apply for a financial 
                bursary to pursue a further education course or a professional qualification.
              </p>
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Move forward</h2>
              <p className="mb-4">
                Learning and development are a part of moving forward in your career. If you work at the Community, you'll find the support and 
                encouragement to develop yourself with a view to progressing your career. All career opportunities are openly advertised across 
                the organization and staff from other teams and grades are encouraged to apply.
              </p>
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Recognition and reward</h2>
              <p className="mb-4">
                Our staff are high performing and produce amazing work. Every so often staff go the 'extra mile' perhaps by running or 
                participating in a project, creating or following through an idea, or suggesting new ways to improve our efficiency. To recognize 
                this extra effort and celebrate success, the Community runs a performance based one-off bonus scheme. In addition, a pay review 
                takes place annually and the Community uses a wide variety of benchmarking processes to remain competitive. We work hard to 
                provide a full range of staff benefits and these can be found on the <a href="#" className="text-rose-600">Vacancies page</a>.
              </p>
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Flexibility</h2>
              <p className="mb-4">
                The importance of a balance between work and private life is recognized here and put into action. Staff work within core hours 
                and can have flexible start and finish times. Eligible employees can request and apply for flexible working arrangements. The 
                Community has adopted a hybrid flexible approach to working. This means most staff are contracted to work in the office with the 
                option to work remotely some of the time.
              </p>
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Health</h2>
              <p className="mb-4">
                Staff health and wellbeing are a priority at the Community. Organized by staff, there is yoga and sports on offer while the staff portal 
                offers advice on wellbeing, nutrition, sleep and restoration. Mental health is as equally important as physical health with personal 
                and confidential support such as the Employee Assistance Programme (EAP) and our onsite Mental Health First Aiders.
              </p>
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Fun</h2>
              <p className="mb-4">
                Our staff are a great group of friendly people who organize fun events in the office such as video game sessions, board games, 
                book clubs and movie nights. Everyone is welcome.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-6">Related content</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div className="border rounded-md overflow-hidden shadow-sm">
                  <div className="h-48 bg-gray-200">
                    <img 
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-03-07%2010-56-05-b9LnJ76llNGuFkLsuty55ZoOHF3oh6.png" 
                      alt="Our values" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">Our values</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      These are our values by which we work and treat each other
                    </p>
                    <a href="#" className="text-rose-600 hover:underline">Learn more</a>
                  </div>
                </div>
                
                {/* Card 2 */}
                <div className="border rounded-md overflow-hidden shadow-sm">
                  <div className="h-48 bg-gray-200">
                    <img 
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-03-07%2010-56-05-b9LnJ76llNGuFkLsuty55ZoOHF3oh6.png" 
                      alt="Vacancies" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">Vacancies</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Discover the benefits of working at the Cyber Intelligence Community and use our online application portal to...
                    </p>
                    <a href="#" className="text-rose-600 hover:underline">Learn more</a>
                  </div>
                </div>
                
                {/* Card 3 */}
                <div className="border rounded-md overflow-hidden shadow-sm">
                  <div className="h-48 bg-gray-200">
                    <img 
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-03-07%2010-56-05-b9LnJ76llNGuFkLsuty55ZoOHF3oh6.png" 
                      alt="History" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">History of the Cyber Intelligence Community</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Explore the history of the Cyber Intelligence Community, including our motto and discover our timeline of key...
                    </p>
                    <a href="#" className="text-rose-600 hover:underline">Learn more</a>
                  </div>
                </div>
                
              </div>



              
            </section>
          </div>
          
          {/* Sidebar */}
          <div className="md:w-1/4 mt-8 md:mt-0">
            <div className="border-l pl-6">
              <div className="mb-6">
                <button className="flex items-center justify-between w-full text-left text-rose-600 font-medium">
                  <span>Our values</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <div className="mb-6">
                <button className="flex items-center justify-between w-full text-left text-rose-600 font-medium">
                  <span>Vacancies</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    <Footer/>
    </div>
  );
};

export default CyberIntelligencePage;