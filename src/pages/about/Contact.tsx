// src/pages/ContactPage.tsx
import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section - styled like Partners page */}
      <div className="bg-indigo-700 text-white">
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">Contact Us</h1>
          <p className="mt-4 text-xl text-center max-w-3xl mx-auto">
            Get in touch with the Utkarsh Foundation team for any inquiries or information.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
          {/* Contact Information Section - Takes 2 columns on large screens */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden lg:col-span-2">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-[#1D3677] border-b pb-3">Contact Details</h2>
              
              <div className="mb-8 hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <h3 className="text-xl font-semibold text-[#1D3677] mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Main Office
                </h3>
                <p className="text-gray-700 mb-3 pl-8">
                  1st Floor, House No 1644,<br />
                  At: Chondhi Post: Kihim,<br />
                  Tal: Alibag Dist: Raigad,<br />
                  Maharashtra 402201
                </p>
                <div className="pl-8">
                  <a 
                    href="mailto:info@utkarsh-foundation.com" 
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    info@utkarsh-foundation.com
                  </a>
                </div>
              </div>
              
              <div className="mb-8 hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <h3 className="text-xl font-semibold text-[#1D3677] mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Our Branch
                </h3>
                <p className="text-gray-700 pl-8">
                  S.R.M College, S.N.Desai, chouk,<br />
                  Kudal, Maharashtra 416520
                </p>
              </div>
            </div>
          </div>
          
          {/* Map Section - Takes 3 columns on large screens */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden lg:col-span-3">
            <div className="h-96 lg:h-[500px]">
              <iframe
                title="Utkarsh Foundation Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3776.3112751235195!2d72.87856377489857!3d18.727301482787246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDQzJzM4LjMiTiA3MsKwNTInNTIuOCJF!5e0!3m2!1sen!2sin!4v1711660108071!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="p-6 bg-gray-50">
              <h3 className="text-xl font-semibold text-[#1D3677] mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Find Us
              </h3>
              <div className="flex flex-col md:flex-row md:items-center justify-between mt-2">
                <div>
                  <p className="text-gray-700 mb-2 pl-8">
                    <span className="font-medium">Main Office:</span> PVGJ+WGG Chondhi, Maharashtra
                  </p>
                  <p className="text-gray-700 mb-2 pl-8">
                    <span className="font-medium">Coordinates:</span> 18°43'38.3"N 72°52'52.8"E
                  </p>
                </div>
                <a 
                  href="https://goo.gl/maps/iiJZW3JF5WN3cEXX6" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors mt-4 md:mt-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Support Our Mission Section - Separate with real image */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[#1D3677] mb-6">Support Our Mission</h2>
              <p className="text-gray-700 mb-4">
                Your contribution can help us expand our programs and reach more students in need. 
                Every donation, no matter the size, makes a significant difference in empowering 
                India's youth and creating opportunities for their success.
              </p>
              <p className="text-gray-700">
                For more donation-related information, please contact our main office.
              </p>
            </div>
            <div className="bg-gray-100 flex items-center justify-center">
              <div className="p-4 w-full h-full">
                <img 
                  src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Educational growth and empowerment" 
                  className="w-full h-full object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    // Fallback if the image doesn't load
                    const fallbackImage = "https://images.pexels.com/photos/7096/people-woman-coffee-meeting.jpg?auto=compress&cs=tinysrgb&w=800";
                    (e.target as HTMLImageElement).src = fallbackImage;
                    
                    // Second fallback if even that fails
                    (e.target as HTMLImageElement).onerror = () => {
                      (e.target as HTMLImageElement).src = "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=800";
                      (e.target as HTMLImageElement).onerror = null;
                    };
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;