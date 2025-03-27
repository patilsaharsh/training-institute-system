import React from 'react';

interface Trustee {
  id: number;
  name: string;
  position?: string;
  image: string;
  description: string;
}

const Trustees: React.FC = () => {
  const trustees: Trustee[] = [
    {
      id: 1,
      name: "Dilendra Shirdhankar",
      position: "President",
      image: "/trustees/Dilendra-Shirdhankar.jpg",
      description: "Dilendra has over 30 years of experience in Information Technology, with 25 years dedicated to the SAP technical domain. He completed his graduation in Commerce and has worked for companies such as Vikram Ispat (JSW), Ispat Industries Limited (JSW), Siemens Information Technology Limited (SISL), InvenioLSI, and is currently serving as the “Co-founder & Technical Practice Head” at TechWit Business Solutions.His experience spans various industry sectors, including Manufacturing (Ispat Industries, Bajaj Auto, Cancor, etc.), Media (Times of India, Sakal papers, Gulf News, New York Times, Indian Express, Universal Music, etc.), and Public Sector (Saudi Arabia Tax Authority, Maldives Tax Authority, etc.).Dilendra is passionate about guiding and providing training to eligible individuals in need of employment opportunities. He continues to offer a platform to talented individuals through Utkarsh Foundation."
    },
    {
      id: 2,
      name: "Niraj Vaidya",
      image: "/trustees/Niraj-Vaidya.jpg",
      description: "Niraj has 25+ years of experience in IT industry, with 20+ years in SAP Domain.He has a bachelor’s degree in Electronics Engineering. He has worked with various companies like Wartsila India Limited, Siemens Information Systems Limited, Capgemini, InvenioLSI.He is having experience working in various Manufacturing, Pharmaceutical, Life Science, Public Sector.Niraj is passionate about coaching and mentoring the individuals who need guidance on career growth."
    },
    {
      id: 3,
      name: "Anil Kadam",
      position: "Secretary",
      image: "/trustees/Anil-Kadam.jpg",
      description: "Anil Kadam is having 22+ years of IT experience and mostly worked on SAP technology and Oracle. He has done his graduation from Shivaji University and currently working as Lead Consultant in InvenioLSI.He has consistently demonstrated leadership, quality skills, innovation skills and problem-solving capability throughout his career. He is passionate about helping people in his village and educating children in his hometown. It is important to support local communities and education for a brighter future. He has also involved in number of social activities.Anil’s expertise and dedication make him a valuable asset in IT industry. Whether it’s Media sector (Sakal Papers, Times of India, STAR TV, Indian Express, Punjab Kesari, Kompas Gramedia, Universal Music etc.), Manufacturing sector (VVF Limited, Kirloskar Brothers Limited, Nilkamal, SPP), Public sector (Federal Tax Authority Dubai, Saudi Arabia Tax Authority, Maldives Tax Authorities) in a lead role, He consistently excels and brings success and creates positive working environment.He drives to bring equality and excellence in job and his ability to recognize talent and give equal opportunity to all make him a remarkable individual in IT industry and local community. His forward-thinking approach and passion for people in need continue to inspire and influence those around him."
    },
    {
      id: 4,
      name: "Vinay Sharma",
      image: "/trustees/Vinay-Sharma.jpg",
      description: "Vinay has 18+ years of experience in IT industry, with 14+ years in SAP Domain.He has a degree in Master of Computer Application. He has worked with companies like 4c Plus(Internet) Pvt Ltd, DB Corp Limited, and InvenioLSI. He has experience working in various Media, Pharmaceutical, Private Sector. He is CPI certified Consultant. He worked on several implementation Projects like Universal Music Group France, Italy, UK, Netherlands, Germany, SAP Maintenance and support projects as SAP Technical Architect.He worked for 3 years onsite as a Support Consultant with Univeral Music Group USA.He is passionate about coaching and mentoring individuals who need guidance on career growth."
    },
    {
      id: 5,
      name: "Atul Patil",
      image: "/trustees/Atul-Patil.jpg",
      description: "Atul Patil is a SAP Certified Consultant with 20 years of extensive experience in SAP BTP, SAP Integration, SAP S/4HANA Cloud extensions and SAP ABAP Development. He has Proven track record in delivering innovative solutions and optimizing business by driving successful implementations, maintenance, and support projects as an SAP Technical consultant.He completed his graduation in Information Technology and has worked for companies like Siemens Information Systems Limited (SISL), IBM, Atos, InvenioLSI and BirlaSoft catering to clients both locally and abroad. With his deep understanding of SAP technologies to guide organizations towards excellence he also intends to contribute to the fraternity by sharing his knowledge and training the inquisitive talents."
    },
    {
      id: 6,
      name: "Rahul Patil",
      position: "Treasurer",
      image: "/trustees/Rahul-Patil.jpg",
      description: "Rahul has 12+ years of experience with SAP technology in the IT industry. He worked on various implementation and support projects across India and Overseas. He has completed a master of computer science from Mumbai university and is currently working as a technical lead consultant at InvenioLSI.He has interpersonal skills with strong analytical ability and problem solving capability. He is a Spoc person of various technical training and a panel member of technical drive from campus and walking drive.He is passionate to share his experience and knowledge for the people who want to grow in their respective area."
    },
    {
      id: 7,
      name: "Adv. Nitin Salunkhe",
      image: "/trustees/Nitin-Salunke.jpg",
      description: "Nitin Salunke has completed a law degree from Mumbai University and a master’s degree in management from Pune University, with a specialization in Personnel Management and Human Resources. He has also obtained a diploma in labor law and labor welfare.He has 22 years of professional experience. Nitin’s career has primarily specialized in advocacy. He has played a significant role in managing labor-related matters and also known for representing clients in various courts in Maharashtra. His expertise isn’t limited to labor law, as he has also practiced law in civil, criminal, consumer, and cooperative courts.Beyond his education and career, Nitin’s passion lies in sharing his legal experience and knowledge with individuals in need of legal guidance. He is dedicated to help those who require legal assistance, showing his commitment to helping others who need legal assistance."
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-indigo-700 text-white">
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">Trustees</h1>
          <p className="mt-4 text-xl text-center max-w-3xl mx-auto">
            Meet the founding members who govern and guide our foundation's mission and vision.
          </p>
        </div>
      </div>
      
      {/* Trustees List Section */}
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Our Trustee Board</h2>
        
        <div className="space-y-12">
          {trustees.map((trustee) => (
            <div 
              key={trustee.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 flex-shrink-0">
                  <img 
                    src={trustee.image} 
                    alt={trustee.name} 
                    className="h-64 w-full object-cover md:h-full"
                  />
                </div>
                <div className="p-8 md:w-3/4">
                  <h3 className="text-2xl font-bold mb-4">{trustee.name}</h3>
                  {trustee.position && (
                    <h6 className="text-amber-500 font-bold mb-4">{trustee.position}</h6>
                  )}
                  <p className="text-gray-600">{trustee.description}</p>
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
            href="/apply-now" 
            className="inline-block bg-indigo-600 text-white font-medium py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors duration-300"
          >
            Apply for Training
          </a>
        </div>
      </div>


    </div>
  );
};

export default Trustees;