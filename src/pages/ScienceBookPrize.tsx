import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, Star, StarHalf, Mail, User, BookOpen, Download, FileText, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface Book {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  publishDate: string;
  publisher: string;
  isbn: string;
}

interface RelatedBook {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  type: string;
}

interface Review {
  id: number;
  userName: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  helpful: number;
  notHelpful: number;
}

interface Format {
  type: string;
  price: string;
  availability: string;
}

const TechBooks: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showMoreContents, setShowMoreContents] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'contents' | 'info'>('contents');
  const [email, setEmail] = useState<string>('');

  const mainBook: Book = {
    id: 1,
    title: 'Essential Cybersecurity Science',
    author: 'Josiah Dykstra',
    coverImage: '/placeholder.svg?height=400&width=300',
    description: "If you're involved in cybersecurity as a software developer, forensic investigator, or network administrator, this practical guide shows you how to apply the scientific method when assessing techniques for protecting your information systems. You'll learn how to conduct scientific experiments on everyday tools and procedures, whether you're evaluating corporate security systems, testing your own security product, or looking for bugs in a mobile game.",
    publishDate: 'December 2015',
    publisher: "O'Reilly Media, Inc.",
    isbn: '9781491921067'
  };

  const relatedBooks: RelatedBook[] = [
    {
      id: 1,
      title: 'Cybersecurity Career Guide',
      author: 'Alyssa Miller',
      coverImage: '/placeholder.svg?height=300&width=200',
      description: 'Kickstart a career in cybersecurity by adapting your existing technical and non-technical skills.',
      type: 'BOOK'
    },
    {
      id: 2,
      title: 'Cyber Security and Digital Forensics',
      author: 'Mangesh M. Ghonge, Sabyasachi Pramanik',
      coverImage: '/placeholder.svg?height=300&width=200',
      description: 'CYBER SECURITY AND DIGITAL FORENSICS Cyber security is an incredibly important issue that is constantly changing.',
      type: 'BOOK'
    },
    {
      id: 3,
      title: 'Cybersecurity: Managing Systems, Conducting Testing, and Investigating Intrusions',
      author: 'Thomas J. Mowbray',
      coverImage: '/placeholder.svg?height=300&width=200',
      description: 'A must-have, hands-on guide for working in the cybersecurity profession.',
      type: 'BOOK'
    },
    {
      id: 4,
      title: 'Practical Industrial Cybersecurity',
      author: 'Charles J. Brooks, Philip A. Craig, Jr.',
      coverImage: '/placeholder.svg?height=300&width=200',
      description: 'A practical roadmap to protecting against cyberattacks in industrial environments.',
      type: 'BOOK'
    }
  ];

  const tableOfContents = [
    'Preface',
    'Who This Book Is For',
    'What This Book Contains',
    'Conventions Used in This Book',
    'Chapter 1: Introduction to Scientific Methodology',
    'Chapter 2: Cryptography Analysis',
    'Chapter 3: Malware Detection',
    'Chapter 4: Network Security',
    'Chapter 5: System Security Engineering',
    'Chapter 6: Case Studies'
  ];

  const bookFeatures = [
    'Learn the steps necessary to conduct scientific experiments in cybersecurity',
    'Explore fuzzing to test how your software handles various inputs',
    'Measure the performance of the Snort intrusion detection system',
    'Locate malicious "needles in a haystack" in your network and IT environment',
    'Evaluate cryptography design and application in IoT products',
    'Conduct an experiment to identify relationships between similar malware binaries',
    'Understand system-level security requirements for enterprise networks and web services'
  ];

  const reviews: Review[] = [
    {
      id: 1,
      userName: 'CyberExpert42',
      rating: 5,
      date: 'January 15, 2023',
      title: 'Essential reading for security professionals',
      content: 'This book provides a solid foundation for applying scientific methods to cybersecurity. The case studies are particularly valuable for practical application. Highly recommended for anyone in the field.',
      helpful: 24,
      notHelpful: 2
    },
    {
      id: 2,
      userName: 'NetworkAdmin',
      rating: 4.5,
      date: 'November 3, 2022',
      title: 'Great methodology, slightly dated examples',
      content: 'The scientific approach outlined in this book is timeless and extremely valuable. Some of the examples are a bit dated now, but the principles still apply perfectly. Would recommend to anyone wanting to bring more rigor to their security testing.',
      helpful: 18,
      notHelpful: 1
    },
    {
      id: 3,
      userName: 'SecurityResearcher',
      rating: 4,
      date: 'August 22, 2022',
      title: 'Good introduction to scientific methods in security',
      content: 'As someone coming from a research background, I appreciated the structured approach to security testing presented in this book. The cryptography and malware analysis chapters were particularly insightful.',
      helpful: 12,
      notHelpful: 3
    }
  ];

  const formats: Format[] = [
    {
      type: 'eBook',
      price: '$49.99',
      availability: 'Immediate access'
    },
    {
      type: 'Print',
      price: '$59.99',
      availability: 'Ships in 1-2 business days'
    },
    {
      type: 'Bundle (Print + eBook)',
      price: '$79.99',
      availability: 'eBook: Immediate, Print: 1-2 business days'
    }
  ];

  const relatedTopics = [
    'Cybersecurity', 'Network Security', 'Penetration Testing', 'Cryptography', 
    'Malware Analysis', 'Digital Forensics', 'Security Engineering', 'IoT Security'
  ];

  const authorBio = `
    Josiah Dykstra is a senior security researcher with a focus on scientific approaches to cybersecurity. 
    He has a Ph.D. in Computer Science and has published numerous papers on security testing methodologies, 
    digital forensics, and cloud security. Dr. Dykstra has worked in both government and private sector 
    security roles and is a frequent speaker at industry conferences.
  `;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}!`);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
     

  
      <div className="bg-white border-b border-red-500">
        <div className="container mx-auto px-4 py-4">
          <div className="flex">
            <input
              type="text"
              placeholder="Search our cybersecurity book collection..."
              className="flex-grow p-2 border border-gray-300 rounded-l focus:outline-none focus:border-red-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-black text-white px-6 py-2 rounded-r hover:bg-gray-900">
              Search
            </button>
          </div>
        </div>
      </div>

   
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
       
          <div className="md:w-1/4">
            <div className="border border-gray-300 p-2 bg-white">
              <div className="bg-blue-900 text-white p-2 text-xs font-bold mb-2">O'REILLY</div>
              <img
                src={mainBook.coverImage || "/placeholder.svg"}
                alt={mainBook.title}
                className="w-full object-cover"
              />
              <div className="text-center text-sm mt-2">{mainBook.author}</div>
            </div>

            {/* Book Formats */}
            <div className="mt-6 border border-gray-200 rounded p-4 bg-gray-50">
              <h3 className="font-bold text-lg mb-4">Available Formats</h3>
              {formats.map((format, index) => (
                <div key={index} className="mb-4 pb-4 border-b border-gray-200 last:border-0 last:mb-0 last:pb-0">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      {format.type === 'eBook' && <Download className="w-4 h-4 mr-2" />}
                      {format.type === 'Print' && <BookOpen className="w-4 h-4 mr-2" />}
                      {format.type === 'Bundle (Print + eBook)' && <FileText className="w-4 h-4 mr-2" />}
                      <span className="font-medium">{format.type}</span>
                    </div>
                    <span className="font-bold">{format.price}</span>
                  </div>
                  <p className="text-sm text-gray-600">{format.availability}</p>
                </div>
              ))}
              <button className="w-full bg-green-600 text-white py-2 rounded mt-2">
                Add to Cart
              </button>
            </div>

            {/* Related Topics */}
            <div className="mt-6 border border-gray-200 rounded p-4">
              <h3 className="font-bold text-lg mb-3">Related Topics</h3>
              <div className="flex flex-wrap gap-2">
                {relatedTopics.map((topic, index) => (
                  <a 
                    key={index} 
                    href="#" 
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full"
                  >
                    {topic}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="md:w-3/4">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{mainBook.title}</h1>
            <div className="mb-6">
              <p className="mb-1">by <a href="#" className="text-red-600">{mainBook.author}</a></p>
              <p className="mb-1">Released {mainBook.publishDate}</p>
              <p className="mb-1">Publisher(s): {mainBook.publisher}</p>
              <p className="mb-1">ISBN: {mainBook.isbn}</p>
            </div>

            <div className="mb-6">
              <p className="text-lg mb-4">Read it now on the O'Reilly learning platform with a 10-day free trial.</p>
              <p className="mb-4">
                O'Reilly members get unlimited access to books, live events, courses curated
                by job role, and more from O'Reilly and nearly 200 top publishers.
              </p>
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded flex items-center">
                START YOUR FREE TRIAL <ChevronRight className="ml-1 w-5 h-5" />
              </button>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Book description</h2>
              <p className="mb-4">{mainBook.description}</p>
              <p className="mb-4">
                Once author Josiah Dykstra gets you up to speed on the scientific method, he helps you focus on standalone, domain-specific topics, such as cryptography, malware analysis, and system security engineering. The latter chapters include practical case studies that demonstrate how to use available tools to conduct domain-specific scientific experiments.
              </p>
              <ul className="list-disc pl-8 space-y-2">
                {bookFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Author Information */}
            <div className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About the Author</h2>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4 flex justify-center">
                  <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-16 h-16 text-gray-500" />
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-bold mb-2">{mainBook.author}</h3>
                  <p className="text-gray-700">{authorBio}</p>
                  <div className="mt-4 flex gap-3">
                    <a href="#" className="text-blue-600 hover:underline">Author Website</a>
                    <span className="text-gray-400">|</span>
                    <a href="#" className="text-blue-600 hover:underline">Twitter</a>
                    <span className="text-gray-400">|</span>
                    <a href="#" className="text-blue-600 hover:underline">LinkedIn</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Publisher resources</h2>
              <a href="#" className="text-blue-600">View/Submit Errata</a>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex">
                <button
                  className={`py-2 px-4 ${activeTab === 'contents' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-600'}`}
                  onClick={() => setActiveTab('contents')}
                >
                  Table of contents
                </button>
                <button
                  className={`py-2 px-4 ${activeTab === 'info' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
                  onClick={() => setActiveTab('info')}
                >
                  Product information
                </button>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'contents' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Table of contents</h2>
                <ul className="space-y-4">
                  {tableOfContents.slice(0, showMoreContents ? tableOfContents.length : 4).map((item, index) => (
                    <li key={index} className="text-gray-700 hover:text-blue-600">
                      <a href="#">{item}</a>
                    </li>
                  ))}
                </ul>
                {!showMoreContents && tableOfContents.length > 4 && (
                  <button
                    className="text-red-600 flex items-center mt-4"
                    onClick={() => setShowMoreContents(true)}
                  >
                    Show more <ChevronDown className="ml-1 w-4 h-4" />
                  </button>
                )}
              </div>
            )}

            {activeTab === 'info' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Information</h2>
                <div className="space-y-4">
                  <p><strong>Format:</strong> eBook, Print</p>
                  <p><strong>Pages:</strong> 190</p>
                  <p><strong>Language:</strong> English</p>
                  <p><strong>ISBN-10:</strong> 1491921064</p>
                  <p><strong>ISBN-13:</strong> 9781491921067</p>
                </div>
              </div>
            )}

            {/* Customer Reviews */}
            <div className="mt-12 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h2>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center mr-4">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <StarHalf className="w-5 h-5 text-yellow-500 fill-current" />
                </div>
                <span className="text-lg font-medium">4.5 out of 5</span>
                <span className="text-gray-500 ml-2">({reviews.length} reviews)</span>
              </div>
              
              <div className="space-y-6">
                {reviews.map(review => (
                  <div key={review.id} className="border-b border-gray-200 pb-6">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <div className="flex mr-2">
                          {[...Array(Math.floor(review.rating))].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                          ))}
                          {review.rating % 1 !== 0 && (
                            <StarHalf className="w-4 h-4 text-yellow-500 fill-current" />
                          )}
                        </div>
                        <span className="font-medium">{review.userName}</span>
                      </div>
                      <span className="text-gray-500 text-sm">{review.date}</span>
                    </div>
                    <h3 className="font-bold mb-2">{review.title}</h3>
                    <p className="text-gray-700 mb-4">{review.content}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-4">Was this review helpful?</span>
                      <button className="flex items-center mr-3 hover:text-gray-700">
                        <ThumbsUp className="w-4 h-4 mr-1" /> {review.helpful}
                      </button>
                      <button className="flex items-center hover:text-gray-700">
                        <ThumbsDown className="w-4 h-4 mr-1" /> {review.notHelpful}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="mt-6 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded">
                Write a Review
              </button>
            </div>
          </div>
        </div>

        {/* Related Books */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedBooks.map((book) => (
              <div key={book.id} className="border border-gray-200 bg-white p-4">
                <img
                  src={book.coverImage || "/placeholder.svg"}
                  alt={book.title}
                  className="w-full h-48 object-cover mb-4"
                />
                <div className="flex items-center mb-2">
                  <span className="bg-red-600 text-white text-xs px-2 py-1">{book.type}</span>
                </div>
                <h3 className="font-bold text-lg mb-1">
                  <a href="#" className="hover:text-blue-600">{book.title}</a>
                </h3>
                <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                <p className="text-sm">{book.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-gray-50 p-8 rounded-lg border border-gray-200">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Stay Updated on Cybersecurity</h2>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter to receive updates on the latest cybersecurity books, 
              research, and exclusive content from O'Reilly.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-grow relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button 
                type="submit" 
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from O'Reilly.
            </p>
          </div>
        </div>

        {/* Community Discussion */}
        <div className="mt-16 mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Community Discussion</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-6">
              <MessageSquare className="w-6 h-6 text-blue-500" />
              <h3 className="text-xl font-bold">Join the conversation about this book</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Connect with other readers, share your insights, and discuss practical applications of the concepts covered in this book.
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-500" />
                </div>
                <div className="flex-grow">
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    rows={3}
                    placeholder="Share your thoughts or ask a question..."
                  ></textarea>
                  <div className="flex justify-end mt-2">
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button className="text-blue-600 font-medium hover:underline">
                View All Discussions (24)
              </button>
            </div>
          </div>
        </div>
      </main>

   
    </div>
  );
};

export default TechBooks;