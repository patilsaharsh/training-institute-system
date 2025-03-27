import React from 'react';

interface SME {
  id: number;
  name: string;
  image: string;
  description: string;
}

const SMEs: React.FC = () => {
  const experts: SME[] = [
    {
      id: 1,
      name: "Satish Mothukuru",
      image: "/experts/Satish-Mothukuru.jpg",
      description: "Sathish is a B.Tech graduate with 20 years of IT experience. Worked for various companies like TCS, Wipro Infotech, SAP Labs India Pvt Ltd, CA Technologies, InvenioLSI, and is currently a head of Cloud and Infrastructure at TechWit Business Solutions.Satish is passionate about training talented individuals and Key contributor to the training and development of more than 100 IT individuals so far.He has supported other NGOs Future India Foundation, Bangalore and associate with Utkarsh Foundation to uplift the society."
    },
    {
      id: 2,
      name: "Dattaprasad Mahajan",
      image: "/experts/Dattaprasad-Mahajan.jpg",
      description: "Dattaprasad is an IT professional with over 25 years of overall experience in different software systems like Oracle, SAP etc. He is a techno-functional consultant with 15 years of experience in SAP consulting. He has exposure to implementing & supporting the SAP projects which includes more than 8 full cycle implementations as well as support in Domestic & International locations.He has rich domain experience in the Media vertical as well as Manufacturing industries. He has worked for organizations like Sakal Papers, SIEMENS, Invenio Business Solutions etc."
    },
    {
      id: 3,
      name: "Abhay Patil",
      image: "/experts/Abhay-Patil.jpg",
      description: "Having more than 15 years of professional experience, Including 13+ years as SAP Materials Management and Sales & Distribution Consultant.Abhay has completed his S4 HANA certification training on Logistics, Procurement and Inventory Involved in Seven End to End Implementations, 4 rollouts and several support projects Worked on cross-functional modules such as Sales and Distribution (SD), Production Planning (PP), Quality Management (QM), Extended Warehouse Management (EWM) and ABAP.Familiar with Kanban processes Worked across various industries such as Automobile, Textile, Chemicals, Media, FMCG, Public sector Worked on IS-A&D (Aerospace and Defense), Media Sales & Distribution (MSD) component and VIM (Vendor Invoice Management by Open Text).Ability to define application architectures in a large, complex environment Perform change impact analysis, change impact communication/workshops, training material, knowledge transfer, etc., with guidance from the Change Management Team Ensure proper use of SAP project management methodology, standards, tools, processes and procedures Coach to clarify assignments and deliverables to project team; review quality of work and manage the integration of team members’ work; provide performance input to project team members’ functional management."
    },
    {
      id: 4,
      name: "Pradeep Patil",
      image: "/experts/Pradeep-Patil.jpg",
      description: "Pradeep Patil is an accomplished Solution Architect with two decades of experience, specializing in SAP solutions, and a strong track record of success in diverse industry sectors. With over 14 years of deep SAP functional expertise, he has effectively contributed to the success of organizations in the public sector, manufacturing, media, and more.Key Competencies:SAP Functional Expertise: Possessing extensive knowledge of SAP modules, including SAP FI/CO, MM, SD, and various others, Pradeep has consistently optimized SAP implementations to align with industry-specific requirements.Cross-Industry Experience: Demonstrated ability to excel in various sectors, including the public sector, manufacturing, media, and beyond. Pradeep effectively used his wide-ranging experience to tailor solutions that address unique sector challenges and opportunities.Solution Architecture: Proven proficiency in architecting end-to-end solutions that enhance business processes, operational efficiency, and digital transformation efforts. Skilled in creating comprehensive blueprints and roadmaps.Project Leadership: Known for effective leadership, He has successfully led cross-functional teams to achieve project objectives on time and within budget, regardless of industry complexities.Business Transformation: Pradeep also has a history of translating intricate business requirements into effective technical solutions that facilitate sector-specific strategic goals.Stakeholder Collaboration: Exceptional communication skills enable Pradeep to foster productive collaborations with clients, executives, and technical teams, regardless of the industry landscape.Continuous Learning: He is dedicated to remaining updated with the latest SAP technologies and industry trends, ensuring that solutions remain cutting-edge and industry relevant.Problem-Solving: Proficient in identifying and resolving technical and business challenges, guaranteeing seamless operations and client satisfaction across diverse industry sectors.With a strong foundation in SAP functional expertise and extensive experience across various sectors, He is committed to assisting organizations in the public sector, manufacturing, media, and beyond, in achieving their sector-specific goals and maintaining competitiveness in today’s dynamic business environment."
    },
    {
      id: 5,
      name: "Asha Joshua",
      image: "/experts/Asha-Joshua.jpg",
      description: "Asha Joshua is Learning Architect & Facilitator with 20+ years of experience in the L&D function. Her exhaustive understanding of the L&D landscape gives her the ability to address the strategic and tactical learning needs of organizations, teams and individuals. She focuses on supporting personal transformation and mind-set change thereby accelerating growth. Asha has facilitated behavioral training workshops for Bosch, Honda Motors, Hitachi Terminal Solutions, Qualcomm, and CriticalRiver."
    },
    {
      id: 6,
      name: "Swapnil Gharat",
      image: "/experts/Swapnil-Gharat.jpg",
      description: "Swapnil has over 16 years of experience in Information Technology dedicated to the SAP technical domain. He completed his graduation in B. Tech. and has worked for companies such as S2 Infotech, Siemens Information Systems Limited (SISL) and is currently working as Principal Consultant in Analytics domain in InvenioLSI.His experience spans various industry sectors, including Media (Times of India, Sakal papers, Star TV, Universal Music, News Uk etc.), and Public Sector (Saudi Arabia Tax Authority, Dubai Tax Authority, etc.). Swapnil is passionate about guiding and providing training to eligible individuals in need of employment opportunities. He continues to offer a platform to talented individuals through Utkarsh Foundation."
    },
    {
      id: 7,
      name: "Vishnu Sharma",
      image: "/experts/Vishnu-Sharma.jpg",
      description: "Vishnu has a strong track record in SAP, specializing in SAP Public Sector for Tax Ministries and the Electricity/Gas Sector. With extensive experience in diverse countries like Saudi Arabia, Fiji, Aruba, and Qatar, Vishnu has gained valuable insights into regional business practices and regulations.Vishnu’s role has involved designing effective Business Processes, delivering tailored Solutions, conducting comprehensive Project Scoping, and providing accurate Effort Estimations. He has actively contributed to Requirements Analysis and Prototyping, leveraging his knowledge of ITIL processes and AGILE methodology to ensure the seamless execution of projects.Vishnu has effectively supported and led critical project phases, including BBP, SIT, and UAT, playing a pivotal role in the successful implementation of SAP solutions in various regions."
    },
    {
      id: 8,
      name: "Sumit Naik",
      image: "/experts/Sumit-Naik.jpg",
      description: "Sumit Dipak Naik boasts over 19 years of technical consulting, solutioning, and management expertise as a seasoned ABAP and SAP HANA certified professional.His specialization lies in deploying SAP ERP and SAP S/4HANA solutions across diverse industry domains, including telecommunications, food and beverages, manufacturing, retail, life sciences, energy and utilities, the public sector, and IT.Sumit is well-versed in a wide array of implementation methodologies, approaches, and accelerators. Additionally, he is a published author with SAP Press, having authored a book on ABAP on HANA."
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-indigo-700 text-white">
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">Subject Matter Experts</h1>
          <p className="mt-4 text-xl text-center max-w-3xl mx-auto">
            Meet our team of industry professionals who bring expertise and knowledge to our training programs.
          </p>
        </div>
      </div>
      
      {/* SMEs List Section */}
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Our Expert Team</h2>
        
        <div className="space-y-12">
          {experts.map((expert) => (
            <div 
              key={expert.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 flex-shrink-0">
                  <img 
                    src={expert.image} 
                    alt={expert.name} 
                    className="h-64 w-full object-cover md:h-full"
                  />
                </div>
                <div className="p-8 md:w-3/4">
                  <h3 className="text-2xl font-bold mb-4">{expert.name}</h3>
                  <p className="text-gray-600">{expert.description}</p>
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

export default SMEs;