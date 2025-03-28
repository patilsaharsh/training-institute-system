import React from 'react';

interface Advisor {
  id: number;
  name: string;
  image: string;
  description: string;
}

const Advisors: React.FC = () => {
  const advisors: Advisor[] = [
    {
      id: 1,
      name: "Sudhir Kanvinde",
      image: "/advisors/Sudhir-Kanvinde.jpg",
      description: "Shri. Sudhir Kanvinde : Over 25+ years experience in the IT industry across varied sectors ranging from Manufacturing, NBFC, Media to Construction and Transportation (worked with Siemens for 17 Years).Is ex Executive Director (JS level) of IPA (Apex body MoPSW)Recipient of Government of India’s Digital India Award 2020, received from the Hon. President of India Shri Ram Nath Kovind, for the project which significantly improved India’s ‘Ease of Doing Business’ ranking. Was a part of the core team involved in drafting Vision 2030 for MoPSW (Ministry of Ports Shipping and Waterways) and involved in ULIP system of Niti Ayog.He is with ‘The Supreme Industries Ltd’ as Chief Information Officer (CIO).Is currently a member of the Governing Body of ‘CIO’s Association of India’ & Board of IT committee Mumbai University."
    },
    {
      id: 2,
      name: "Prashant Keravadekar",
      image: "/advisors/Prashant.jpg",
      description: "Prashant Suresh Keravadekar has been an integral part of Sant Rawool Maharaj Mahavidyalaya (SRMM), Kudal since 2002, initially serving as a dedicated computer and network engineer until 2009. Since then, he has continued his journey at SRMM as an Assistant Professor, demonstrating unwavering commitment to the institution’s growth and the development of its students.His involvement in various initiatives underscores his passion for nurturing talent and fostering innovation within the educational landscape. Notably, Prashant played a pivotal role in the establishment of “Sindhugenous Technologies” on August, 2019, a platform within SRMM dedicated to software development, offering students invaluable internship opportunities.Furthermore, his contributions extend to the inauguration of SRMM’s own “Incubation and Innovation Center” on January, 2023, designed to provide students with a platform to showcase their expertise across multiple domains, including software development, marketing, finance, HR, and accounting.In addition to his teaching responsibilities, Prashant has actively assisted students in their placement and career development pursuits, ensuring they are equipped with the requisite skills and knowledge to excel in their chosen fields. Moreover, his membership in the College Development Committee and the Internal Quality Assurance Cell highlights his commitment to enhancing the overall educational experience and maintaining high standards of academic excellence at SRMM."
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-indigo-700 text-white">
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">Advisors</h1>
          <p className="mt-4 text-xl text-center max-w-3xl mx-auto">
            Meet our team of industry experts who provide strategic guidance to our foundation.
          </p>
        </div>
      </div>
      
      {/* Advisors List Section */}
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Our Advisor Team</h2>
        
        <div className="space-y-12">
          {advisors.map((advisor) => (
            <div 
              key={advisor.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 flex-shrink-0">
                  <img 
                    src={advisor.image} 
                    alt={advisor.name} 
                    className="h-64 w-full object-cover md:h-full"
                  />
                </div>
                <div className="p-8 md:w-3/4">
                  <h3 className="text-2xl font-bold mb-4">{advisor.name}</h3>
                  <p className="text-gray-600">{advisor.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Training Programs</h2>
          <p className="text-lg text-gray-600 mb-8">
            Learn from our industry experts and gain valuable skills for your career development.
          </p>
          <a 
            href="/student/apply" 
            className="inline-block bg-indigo-600 text-white font-medium py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors duration-300"
          >
            Apply for Training
          </a>
        </div>
      </div>


    </div>
  );
};

export default Advisors;