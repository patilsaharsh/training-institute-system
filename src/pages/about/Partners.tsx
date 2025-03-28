import React from 'react';

interface Partner {
  id: number;
  name: string;
  logo: string;
}

const Partners: React.FC = () => {
  const partners: Partner[] = [
    {
      id: 1,
      name: "DOT 1",
      logo: "/partners/DOT1-logo-300px.jpg"
    },
    {
      id: 2,
      name: "SBAtech",
      logo: "/partners/SBAtech-logo-300px.jpg"
    },
    {
      id: 3,
      name: "Sapours",
      logo: "/partners/Sapours-logo-300px.jpg"
    },
    {
      id: 4,
      name: "Geodrive Solutions Private Limited",
      logo: "/partners/GeoDrive-Logo-300px.jpg"
    },
    {
      id: 5,
      name: "Percipere",
      logo: "/partners/percepere-logo-300px.jpg"
    },
    {
      id: 6,
      name: "Sanathan Texttiles",
      logo: "/partners/Sanathan-Textiles-Logo-300px.jpg"
    },
    {
      id: 7,
      name: "Sainnovate Innovation Instincts",
      logo: "/partners/Sainnovate-logo-300px.jpg"
    },
    {
      id: 8,
      name: "TechWit Business Solutions",
      logo: "/partners/TechWit-Logo-300px.jpg"
    },
    {
      id: 9,
      name: "Astiro Information Systems",
      logo: "/partners/astiro_logo-1.jpg"
    },
    {
      id: 10,
      name: "Constaccent",
      logo: "/partners/Constaccent-1.jpg"
    },
    {
      id: 11,
      name: "Solsynch Technologies Pvt. Ltd",
      logo: "/partners/solsynch-logo-1.jpg"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-indigo-700 text-white">
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">Our Partners</h1>
          <p className="mt-4 text-xl text-center max-w-3xl mx-auto">
            Utkarsh Foundation collaborates with leading organizations to provide quality training and opportunities.
          </p>
        </div>
      </div>
      
      {/* Partners Grid */}
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Trusted by Industry Leaders</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {partners.map((partner) => (
            <div 
              key={partner.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="p-6 flex flex-col items-center">
                <div className="w-32 h-32 mb-4 flex items-center justify-center">
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`} 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <h3 className="text-lg font-medium text-center">{partner.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Partnership CTA Section */}
      <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Interested in Partnering with Us?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join our network of industry partners and help us in our mission to provide quality education and opportunities to students.
          </p>
          <a 
            href="/about/contact" 
            className="inline-block bg-indigo-600 text-white font-medium py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors duration-300"
          >
            Get in Touch
          </a>
        </div>
      </div>


    </div>
  );
};

export default Partners;