import React from 'react';
import { Link } from 'react-router-dom';

const StudentTestimonialsPage = () => {
  // Testimonials data from Utkarsh Foundation
  const testimonials = [
    {
      id: 1,
      content: "My experience at Utkarsh for SAP CPI training was exceptional, from counseling to placement support. The expert trainers made complex concepts easy with interactive sessions, real-time scenarios, and hands-on exercises. The final project and practice environment boosted my practical knowledge. The friendly atmosphere and 24/7 doubt-clearing support made learning seamless. Thanks to Utkarsh Foundation, I gained in-depth SAP CPI skills and secured a great placement opportunity!",
      name: "Faizuddin Shaik",
      title: "SAP CPI Consultant",
      image: "/testimonials/Faizuddin.jpeg"
    },
    {
      id: 2,
      content: "My experience at Utkarsh in SAP SD was outstanding. The knowledgeable counselors, expert trainers, and interactive sessions made learning effective. Group studies and projects enhanced practical skills, while excellent practice facilities helped reinforce concepts. The friendly environment and easy access to doubt-solving made it even better. Utkarsh ensures both quality learning and strong placement opportunities in SAP SD.",
      name: "Shubham Pedhavi",
      title: "SAP SD Consultant",
      image: "/testimonials/ShubhamP.jpeg"
    },
    {
      id: 3,
      content: "My experience at Utkarsh Foundation in SAP CPI was exceptional. The expert trainers, interactive sessions, and knowledgeable counselors made learning highly effective. Hands-on projects and group studies enhanced practical understanding, while top-notch practice facilities reinforced key concepts. The supportive environment and seamless doubt-solving process further enriched the experience. Utkarsh Foundation ensures not only quality learning but also strong placement opportunities in SAP CPI, making it the ideal choice for aspiring professionals.",
      name: "Anita Khopatkar",
      title: "SAP CPI Consultant",
      image: "/testimonials/anita.jpg"
    },
    {
      id: 4,
      content: "I'm excited to share my journey through the SAP ABAP training program. After working in IT support for several years, I discovered this course through Utkarsh Foundation. The program, led by knowledgeable professionals, provided me with a solid foundation in SAP ABAP. I'm now a SAP ABAP Developer at Percipere Consulting India Pvt Ltd. What sets this training apart is the challenge it presented, honing my skills and instilling resilience.",
      name: "Mandar Mokal",
      title: "SAP ABAP Developer",
      image: "https://utkarsh-foundation.com/wp-content/uploads/2023/10/Mandar-Mokal-120x120.jpeg"
    },
    {
      id: 5,
      content: "I graduated in Mechanical Engineering in 2018 and struggled to find a job in my field. In December 2021, I met Dilendra Shirdhankar, who introduced me to the SAP ABAP Training program. The three-month training provided in-depth SAP knowledge and improved my interpersonal skills. After the program, I secured a placement at SBA Tech Solutions, where I've now been working for nearly 2 years. Thanks to the training, I've established a stable career.",
      name: "Kamini Bhoir",
      title: "SAP ABAP Specialist",
      image: "https://utkarsh-foundation.com/wp-content/uploads/2023/10/Kamini-Bhoir-120x120.jpeg"
    },
    {
      id: 6,
      content: "I completed my engineering degree and was actively searching job when I met Dilendra Shirdhankar Sir, a seasoned SAP professional. He introduced me to the SAP ABAP course by Utkarsh foundation, offering free training and placement assistance. The training was exceptional, led by experts with experience. Thanks to this program, I gained expertise in SAP ABAP and landed a position at Percipere Consulting India Pvt Ltd.",
      name: "Rutik Patil",
      title: "SAP ABAP Consultant",
      image: "https://utkarsh-foundation.com/wp-content/uploads/2023/10/Rutik-Patil-e1698045021332-120x120.jpeg"
    },
    {
      id: 7,
      content: "I completed my Master Of Computer Application (MCA) degree from Mumbai University during lockdown. I gave multiple interviews for campus placements, but I was lacking confidence. But that's when I found out about Dilendra sir. He prepared me for interviews by assigning his senior and experienced employees to take my mock interviews every week. This helped me to increase confidence and perform better in the interviews eventually. I cleared my interview after which he also provided me SAP-ABAP 3 months training which was free of cost along with providing me placement. Today I have been working in SAP ABAP for a year and I am very happy with the work environment and everything that he taught me has been useful to me in starting this journey.",
      name: "Aishwarya Kadam",
      title: "SAP ABAP Developer",
      image: "https://utkarsh-foundation.com/wp-content/uploads/2023/10/Aishwarya-Kadam-120x120.jpeg"
    },
    {
      id: 8,
      content: "It was one of the best learning experiences I had, at Utkarsh, right from counseling to placements. Utkarsh has counselors with appropriate industrial knowledge, which helps to identify the needs of students. Trainers are highly experienced. The classes are very interactive and expand our knowledge. Group studies help to learn new things. The final project helps to increase in practical knowledge. The provisions provided for practicing are very good and helpful. Overall environment is very friendly and the best thing about this place is that anytime we can go and clear our doubts. Students get knowledge and good placements are provided by Utkarsh.",
      name: "Nayan Rane",
      title: "SAP CPI Specialist",
      image: "https://utkarsh-foundation.com/wp-content/uploads/2023/10/Nayan-Rane-120x120.jpeg"
    }
  ];

  return (
    <div className="student-testimonials-page">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Student Testimonials</h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            Hear from our graduates about their journey with Utkarsh Foundation and how our training programs have transformed their careers.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Success Stories from Our Students
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our students come from diverse backgrounds but share a common goal of building successful careers in the SAP ecosystem.
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

      {/* Call to Action */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Success Story?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Join our free training programs and take the first step towards a rewarding career in SAP technology.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/student/apply" 
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors duration-300"
            >
              Apply Now
            </Link>
            <Link 
              to="/programs/upcoming" 
              className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-md border border-indigo-600 hover:bg-indigo-50 transition-colors duration-300"
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </section>

      {/* More Information Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                More Than Just Training
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                At Utkarsh Foundation, we believe in providing comprehensive support beyond technical training. Our approach includes:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Personality development sessions</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Mock interviews with industry professionals</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">One-on-one mentoring</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Job placement assistance</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Post-placement support</span>
                </li>
              </ul>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1170&q=80" 
                alt="Students collaborating" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Are the training programs really free?</h3>
              <p className="text-gray-600">
                Yes, all our training programs are completely free of charge. We believe in making quality education accessible to everyone.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What qualifications do I need to apply?</h3>
              <p className="text-gray-600">
                Our programs are designed for graduates and recent graduates from any discipline. Basic computer knowledge is required, but no specific technical background is necessary.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How long are the training programs?</h3>
              <p className="text-gray-600">
                Most of our SAP module training programs run for approximately 3 months, with regular classes and practical sessions.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Is job placement guaranteed?</h3>
              <p className="text-gray-600">
                While we cannot guarantee placement, we have a strong track record of helping our students find relevant opportunities. We work with corporate partners to identify job opportunities for our trained candidates.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Where are the training sessions conducted?</h3>
              <p className="text-gray-600">
                Training sessions are conducted at our center in Alibag, Maharashtra. We also offer some online sessions depending on the program.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentTestimonialsPage;