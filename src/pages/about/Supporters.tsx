import React from 'react';

interface Supporter {
  id: number;
  name: string;
  image: string;
}

const Supporters: React.FC = () => {
  const supporters: Supporter[] = [
    {
      id: 1,
      name: "Sumit Dukare",
      image: "/supporters/Sumit-Dukare-1.jpg"
    },
    {
      id: 2,
      name: "Mandar Shirdhankar",
      image: "/supporters/Mandar-Shirdhankar.jpg"
    },
    {
      id: 3,
      name: "Ajit Mhatre",
      image: "/supporters/Ajit-Mhatre.jpg"
    },
    {
      id: 4,
      name: "Prathamesh Gandhi",
      image: "/supporters/Prathamesh-Gandhi.jpg"
    },
    {
      id: 5,
      name: "Soham Zendekar",
      image: "/supporters/Soham-Zendekar.jpg"
    },
    {
      id: 6,
      name: "Sujit Thakur",
      image: "/supporters/Sujit-Thakur.jpg"
    },
    {
      id: 7,
      name: "Vikas Jadhav",
      image: "/supporters/Vikas-Jadhav.jpg"
    },
    {
      id: 8,
      name: "Swapnil Rayphale",
      image: "/supporters/Swapnil-Rayphale.jpg"
    },
    {
      id: 9,
      name: "Yogesh Gupte",
      image: "/supporters/yogesh-Gupte.jpg"
    },
    {
      id: 10,
      name: "Shrikant More",
      image: "/supporters/Shrikant-More.jpg"
    },
    {
      id: 11,
      name: "Pavitra Patil",
      image: "/supporters/Pavitra-Patil.jpg"
    },
    {
      id: 12,
      name: "Sharvari Gandhi",
      image: "/supporters/Sharvari-Gandhi.jpg"
    },
    {
      id: 13,
      name: "Akash Patil",
      image: "/supporters/Akash-Patil.jpg"
    },
    {
      id: 14,
      name: "Harshal Thakur",
      image: "/supporters/Harshal-Thakur.jpg"
    },
    {
      id: 15,
      name: "Chetan Mhatre",
      image: "/supporters/Chetan-Mhatre.jpg"
    },
    {
      id: 16,
      name: "Ankit Mhatre",
      image: "/supporters/Ankit-Mhatre.jpg"
    },
    {
      id: 17,
      name: "Mrudula Rane",
      image: "/supporters/Mrudula-Rane.jpg"
    },
    {
      id: 18,
      name: "Amit Jadhav",
      image: "/supporters/Amit-Jadhav.jpg"
    },
    {
      id: 19,
      name: "Nikhil Save",
      image: "/supporters/NIkhil-Save.jpg"
    },
    {
      id: 20,
      name: "Azhar Shaikh", 
      image: "/supporters/Azahar-Shaikh.jpg"
    },
    {
      id: 21,
      name: "Tajudeen Shaik",
      image: "/supporters/Tajuddeen-Shaikh.jpg"
    },
    {
      id: 22,
      name: "Abdul Aziz",
      image: "/supporters/Abdul-Aziz.jpg"
    },
    {
      id: 23,
      name: "Vishal Apte",
      image: "/supporters/Vishal-Apte.jpg"
    },
    {
      id: 24,
      name: "Hemant Paithankar",
      image: "/supporters/Hemant-Paithankar.jpg"
    },
    {
      id: 25,
      name: "Omkar Korgaonkar",
      image: "/supporters/Omkar-Korgaonkar.jpg"
    },
    {
      id: 26,
      name: "Parag Gaonkar",
      image: "/supporters/Parag-Gaonkar.jpg"
    },
    {
      id: 27,
      name: "Rushikesh Patil",
      image: "/supporters/Rushikesh-Patiil.jpg"
    },
    {
      id: 28,
      name: "Prafull Bagul",
      image: "/supporters/Prafull-Bagul.jpg"
    },
    {
      id: 29,
      name: "Gopala Konugulu",
      image: "/supporters/Gopala-Konogulu.jpg"
    },
    {
      id: 30,
      name: "Vinayak Deshmukh",
      image: "/supporters/Vinayak-Deshmukh.jpg"
    },
    {
      id: 31,
      name: "Rishikesh Chaturvedi",
      image: "/supporters/Rushikesh-Chaturvedi.jpg"
    },
    {
      id: 32,
      name: "Suraj Bhoir",
      image: "/supporters/Suraj-Bhoir.jpg"
    },
    {
      id: 33,
      name: "Abdul Mueed Gharade",
      image: "/supporters/Abdul-mueed.jpg"
    },
    {
      id: 34,
      name: "Anvit Mandke",
      image: "/supporters/Anvit-Mandke.jpg"
    },
    {
      id: 35,
      name: "Shirish Yadawad",
      image: "/supporters/Shirish-Yadawad.jpg"
    },
    {
      id: 36,
      name: "Rohit Ranka",
      image: "/supporters/Rohit-Ranka.jpg"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-indigo-700 text-white">
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">Our Supporters</h1>
          <p className="mt-4 text-xl text-center max-w-3xl mx-auto">
            Meet the dedicated individuals who support Utkarsh Foundation's mission and help make our work possible.
          </p>
        </div>
      </div>
      
      {/* Supporters Grid */}
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Our Community of Supporters</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {supporters.map((supporter) => (
            <div 
              key={supporter.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="h-80 overflow-hidden bg-gray-50">
                <img 
                  src={supporter.image} 
                  alt={supporter.name} 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-center">{supporter.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Support CTA Section */}
      <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Supporters Network</h2>
          <p className="text-lg text-gray-600 mb-8">
            Become a part of our mission to provide quality education and opportunities to students from underserved communities.
          </p>
          <a 
            href="/contact-us" 
            className="inline-block bg-indigo-600 text-white font-medium py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors duration-300"
          >
            Get Involved
          </a>
        </div>
      </div>
    </div>
  );
};

export default Supporters;