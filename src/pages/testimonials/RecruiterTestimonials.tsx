import React from 'react';
import { Link } from 'react-router-dom';

const RecruiterTestimonialsPage = () => {
  // Testimonials data from Utkarsh Foundation
  const testimonials = [
    {
      id: 1,
      content: "I think my stars were perfectly aligned when I came across Utkarsh Foundation. Utkarsh understood my requirements patiently and found perfect matching candidates required. I would like to mention here that all these candidates were not only technically skilled, but even professionally trained for business skills, functional skills, and communication skills as well. I really appreciate seeing these candidates working with international customers with the kind of confidence they have, and I bet, within one year they could stand as equal as 4-5 years experience consultants. I am happy that I came across Utkarsh Foundation during our early years of SBATECH, which helped us to get the right candidates with the right skills required.",
      name: "Swapnil Utekar",
      title: "Founder Director at SBAtech Solutions Pvt. Ltd.",
      image: "https://utkarsh-foundation.com/wp-content/uploads/2023/10/Swapnil-Utekar-120x120.jpg"
    },
    {
      id: 2,
      content: "We have had a good fortune of engaging with Utkarsh foundation for past 1.5 years and have on boarded two batches of trained ABAPers from them. Not only are we satisfied with their performance, but we are quite happy with their overall progress in picking up customer requirements, their attitude towards work, and general level of skill competence shown during the customer engagements. We are happy to extend our support to Utkarsh foundation in their aim to skill people as per corporate's requirement and also instil tacit qualities of workmanship in them.",
      name: "Sujeet Kulkarni",
      title: "CEO at DOT1 Solutions Pvt Ltd.",
      image: "https://utkarsh-foundation.com/wp-content/uploads/2023/10/Sujeet-Kulkarni-120x120.jpg"
    },
    {
      id: 3,
      content: "At TechWit, we have hired more than 20 bright, young and enthusiastic people coming out from Utkarsh foundation. They are working in various technical areas of SAP at the moment, including ABAP, Basis, PI-PO, CPI and BTP. Our experience with each one of them is fantastic. The training they have received is clearly far superior to what you would generally see in the other SAP training academies. Most of the consultants started to work independently within a short span of time. It is very clear that the training they have undergone is very practical, hands-on and relevant in today's rapidly changing technology world. I am also very pleased with the attitude these young folks have shown. They are always ready to put their hand up, take responsibility and dive in.",
      name: "Kedar Patwardhan",
      title: "Co-founder and CEO at TechWit Business Solutions",
      image: "https://utkarsh-foundation.com/wp-content/uploads/2023/10/Kedar-Patwardhan-120x120.jpg"
    },
    {
      id: 4,
      content: "We are engaged with Utkarsh foundation and would highly recommend them for their diligent approach and methodology of training that is imparted to the young aspiring professionals. The quality of the training in SAP ABAP, Basis and CPI is latest and based on the current market demands and industry requirements. We have onboarded 3 candidates in ABAP and 1 in Basis and the feedback from their project managers has been very encouraging. They are always eager to take on assignments and try to complete them on time. Must say we are very happy with the output of these resources and looking to onboard more resources in the near future.",
      name: "Dominic Parera",
      title: "Co-founder and Director at Sapours Technologies",
      image: "https://utkarsh-foundation.com/wp-content/uploads/2023/10/Dominic-Parera-120x120.jpg"
    },
    {
      id: 5,
      content: "We wish to appreciate services provided by Utkarsh Foundation. We have onboarded resources from Utkarsh Foundation, these resources have exhibited greater work ethics and skills. We appreciate the training model and personal grooming conducted by Utkarsh Foundation for these candidates. Wishing success and more deeper partnership.",
      name: "Vijay Pandit",
      title: "Founder and CEO at Constaccent",
      image: "https://utkarsh-foundation.com/wp-content/uploads/2023/10/Vijay-Pandit-1-120x120.jpg"
    },
    {
      id: 6,
      content: "It is quite astonishing the level of Talent that Utkarsh Foundation is able to produce at freshmen level, who are able to hit the ground running from day one. The grind and the rigor invested into building the talent is quite evident. The testimonials received from our customers for the talent absorbed from Utkarsh Foundation has been exceptional. Kudos to Team Utkarsh!",
      name: "Abhay Mehta",
      title: "Co-Founder and Global Delivery at Percipere",
      image: "https://utkarsh-foundation.com/wp-content/uploads/2023/10/Abhay-Mehta-1-120x120.jpg"
    }
  ];

  return (
    <div className="recruiter-testimonials-page">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Recruiter Testimonials</h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            Hear what our hiring partners have to say about the quality of talent and training provided by Utkarsh Foundation.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Corporate Partners Say
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We work closely with employers to ensure our training programs meet industry standards and prepare students for real-world challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg">
                <div className="p-8 md:flex">
                  <div className="md:w-1/4 flex flex-col items-center text-center mb-6 md:mb-0">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-indigo-100">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=4F46E5&color=fff&size=200`;
                        }}
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-indigo-600">{testimonial.title}</p>
                  </div>
                  <div className="md:w-3/4 md:pl-8 md:border-l border-gray-200">
                    <div className="relative">
                      <p className="text-gray-600 text-lg leading-relaxed mb-4">
                        {testimonial.content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action for Employers */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Looking for Quality Talent?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Partner with Utkarsh Foundation to access our pool of well-trained, job-ready SAP professionals at no cost.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/about/contact" 
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors duration-300"
            >
              Hire Our Graduates
            </Link>
            <Link 
              to="/about/contact" 
              className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-md border border-indigo-600 hover:bg-indigo-50 transition-colors duration-300"
            >
              Become a Partner
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1170&q=80" 
                alt="Corporate meeting" 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Benefits of Hiring from Utkarsh
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                When you recruit from Utkarsh Foundation, you get more than just technical talent:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Candidates trained in latest SAP technologies</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Professionally groomed with soft skills and business knowledge</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Ready to work with minimal onboarding time</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Strong work ethic and eagerness to learn</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">No recruitment fees or charges</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecruiterTestimonialsPage;