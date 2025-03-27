import React, { useState, useEffect, useRef } from "react";
import landing from "./image.png";

// Properly typed interface for counters
interface CounterState {
  batches: number;
  placements: number;
  trainers: number;
  mentors: number;
}

const LandingPage: React.FC = () => {
  // Counter animation for stats section with proper typing
  const [counters, setCounters] = useState<CounterState>({
    batches: 0,
    placements: 0,
    trainers: 0,
    mentors: 0,
  });

  const statsRef = useRef<HTMLDivElement>(null);
  const counted = useRef<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          animateCounters();
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const animateCounters = () => {
    const duration = 2000; // ms
    const intervals = 20;
    const steps = duration / intervals;

    const targets = {
      batches: 18,
      placements: 200,
      trainers: 100,
      mentors: 50,
    };

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;

      if (currentStep >= steps) {
        setCounters(targets);
        clearInterval(timer);
      } else {
        const progress = currentStep / steps;
        setCounters({
          batches: Math.floor(progress * targets.batches),
          placements: Math.floor(progress * targets.placements),
          trainers: Math.floor(progress * targets.trainers),
          mentors: Math.floor(progress * targets.mentors),
        });
      }
    }, intervals);
  };

  return (
    <div className="landing-page">
      {/* Hero Section with Just Image - Clean Tailwind approach */}
      <section className="relative w-full">
        {/* The image container */}
        <div className="relative w-full h-auto md:h-screen overflow-hidden">
          {/* Main image */}
          <img
            src={landing}
            alt="Utkarsh Foundation"
            className="w-full h-auto md:h-full md:object-cover md:object-center"
          />

          {/* Very subtle overlay for slight depth */}
          <div className="absolute inset-0 bg-black bg-opacity-5"></div>
        </div>
      </section>

      {/* Core Offerings */}
      <section className="core-offerings py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="offering flex flex-col items-center p-6 rounded-lg transition-all hover:shadow-md">
              <div className="icon-wrapper mb-4 p-4 bg-indigo-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2 text-gray-800">
                Skill Development
              </h4>
              <p className="text-gray-600 text-center">
                We provide SAP modules trainings as well as Full-stack
                Development trainings.
              </p>
            </div>

            <div className="offering flex flex-col items-center p-6 rounded-lg transition-all hover:shadow-md">
              <div className="icon-wrapper mb-4 p-4 bg-indigo-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2 text-gray-800">
                Personality Development
              </h4>
              <p className="text-gray-600 text-center">
                We help individuals with counseling sessions to enhance
                communication, decision-making, and attitude.
              </p>
            </div>

            <div className="offering flex flex-col items-center p-6 rounded-lg transition-all hover:shadow-md">
              <div className="icon-wrapper mb-4 p-4 bg-indigo-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2 text-gray-800">
                Job Assistance
              </h4>
              <p className="text-gray-600 text-center">
                We're committed to helping you achieve your career goals.
              </p>
            </div>

            <div className="offering flex flex-col items-center p-6 rounded-lg transition-all hover:shadow-md">
              <div className="icon-wrapper mb-4 p-4 bg-indigo-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2 text-gray-800">
                Totally Free
              </h4>
              <p className="text-gray-600 text-center">
                We do not charge any fees for Trainees and Recruiters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="mission-section py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-base text-indigo-600 uppercase font-semibold tracking-wide mb-2">
              Our Mission
            </h2>
            <h1 className="text-4xl font-bold mb-6">
              <span className="italic font-light">Building Skills</span> for a
              Better Future
            </h1>
            <p className="text-lg text-center max-w-3xl mx-auto mb-12 text-gray-600">
              We offer free industry specific skills training and industrial
              specific courses to students from universities, colleges, and
              institutions specially from remote areas. Our NGO also works with
              corporate partners to identify job opportunities for these young
              talents. We also provides preemployment training to help our
              students prepare for interviews and improve their skillset.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="mission-text">
              <p className="text-lg text-gray-700 mb-4">
                There are several challenges faced by students too at many
                levels, viz-
              </p>
              <ul className="list-disc pl-6 mb-4 text-lg text-gray-700 space-y-2">
                <li>No Campus Placement available at most of the Institutes</li>
                <li>Very Costly Private coaching classes.</li>
                <li>
                  Lot of Courses are available but not sure which course will
                  give them Job
                </li>
                <li>
                  No Soft skills and hence cannot clear Interviews even after
                  having technical knowledge
                </li>
                <li>
                  No Resources for the students to gain practical knowledge
                </li>
              </ul>
              <p className="text-lg text-gray-700">
                We at Utkarsh Foundation, volunteer to try to address the above
                challenges with utmost sincerity, a way forward to our Vision,
                to achieve our ultimate aim of empowering the young Graduates.
              </p>
            </div>

            <div className="mission-image">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1170&q=80"
                alt="Utkarsh Foundation Mission"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section with Animated Counters */}
      <section ref={statsRef} className="stats-section py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="stat-item p-6 rounded-lg bg-indigo-50">
              <div className="text-4xl font-bold text-indigo-600">
                {counters.batches}+
              </div>
              <div className="text-lg font-medium text-gray-800 mt-2">
                Batches
              </div>
            </div>

            <div className="stat-item p-6 rounded-lg bg-indigo-50">
              <div className="text-4xl font-bold text-indigo-600">
                {counters.placements}+
              </div>
              <div className="text-lg font-medium text-gray-800 mt-2">
                Placements
              </div>
            </div>

            <div className="stat-item p-6 rounded-lg bg-indigo-50">
              <div className="text-4xl font-bold text-indigo-600">
                {counters.trainers}+
              </div>
              <div className="text-lg font-medium text-gray-800 mt-2">
                Trainers
              </div>
            </div>

            <div className="stat-item p-6 rounded-lg bg-indigo-50">
              <div className="text-4xl font-bold text-indigo-600">
                {counters.mentors}+
              </div>
              <div className="text-lg font-medium text-gray-800 mt-2">
                Mentors
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Our Vision Section with new image */}
      <section className="vision-section py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-base text-indigo-600 uppercase font-semibold tracking-wide mb-2">
              Our Vision
            </h2>
            <h1 className="text-4xl font-bold mb-6">
              <span className="italic font-light">Empowering</span> Young
              Graduates
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="vision-text">
              <p className="text-lg text-gray-700 mb-4">
                "Give a man a fish and you feed him for a day, teach a man to
                fish and you feed him for a lifetime." Education and skills
                should go hand in hand then only we can establish a sustainable
                future.
              </p>

              <p className="text-lg text-gray-700 mb-4">
                Conventionally our education system often prioritizes
                theoretical knowledge over practical application. Graduates find
                themselves lacking hands-on experience and industry-specific
                skills, leading to limited employability prospects. Many studies
                show that nearly 85% of engineering graduates in India are not
                immediately employable.
              </p>

              <p className="text-lg text-gray-700">
                Our aims is not only to empower young Graduates by offering
                necessary industry specific skills and to train them to increase
                their chances of getting jobs specifically in the industry but
                also to make them able to adapt to changing technologies and
                market demands.
              </p>
            </div>

            <div className="vision-image">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1170&q=80"
                alt="Vision diagram"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Courses Section */}
      <section className="courses-section py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-base text-indigo-600 uppercase font-semibold tracking-wide mb-2">
              Our Courses
            </h2>
            <h1 className="text-4xl font-bold mb-4">
              Specialized SAP Training Programs
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our range of comprehensive courses designed to make
              you job-ready
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* SAP ABAP */}
            <div className="course-card group bg-white rounded-lg shadow-sm px-6 py-8 hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="course-icon mb-4">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-md shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <svg
                    className="h-8 w-8 text-indigo-600 group-hover:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                SAP ABAP
              </h3>
              <p className="text-gray-600">
                Learn to develop custom applications in SAP environment using
                ABAP programming language.
              </p>
            </div>

            {/* SAP SD */}
            <div className="course-card group bg-white rounded-lg shadow-sm px-6 py-8 hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="course-icon mb-4">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-md shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <svg
                    className="h-8 w-8 text-indigo-600 group-hover:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">SAP SD</h3>
              <p className="text-gray-600">
                Master Sales and Distribution module for managing the entire
                order-to-cash process.
              </p>
            </div>

            {/* SAP MM */}
            <div className="course-card group bg-white rounded-lg shadow-sm px-6 py-8 hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="course-icon mb-4">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-md shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <svg
                    className="h-8 w-8 text-indigo-600 group-hover:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">SAP MM</h3>
              <p className="text-gray-600">
                Learn Materials Management module for optimizing procurement and
                inventory management processes.
              </p>
            </div>

            {/* SAP FICO */}
            <div className="course-card group bg-white rounded-lg shadow-sm px-6 py-8 hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="course-icon mb-4">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-md shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <svg
                    className="h-8 w-8 text-indigo-600 group-hover:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                SAP FICO
              </h3>
              <p className="text-gray-600">
                Master Financial Accounting and Controlling to manage financial
                operations and reporting.
              </p>
            </div>

            {/* SAP CPI */}
            <div className="course-card group bg-white rounded-lg shadow-sm px-6 py-8 hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="course-icon mb-4">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-md shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <svg
                    className="h-8 w-8 text-indigo-600 group-hover:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                SAP CPI
              </h3>
              <p className="text-gray-600">
                Develop skills in Cloud Platform Integration to connect
                different systems and applications.
              </p>
            </div>

            {/* SAP BASIS */}
            <div className="course-card group bg-white rounded-lg shadow-sm px-6 py-8 hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="course-icon mb-4">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-md shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <svg
                    className="h-8 w-8 text-indigo-600 group-hover:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                SAP BASIS
              </h3>
              <p className="text-gray-600">
                Learn system administration, security, and technical
                configuration of SAP systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Our Cause Section */}
      <section className="support-section py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-base text-indigo-600 uppercase font-semibold tracking-wide mb-2">
              Support Our Cause
            </h2>
            <h1 className="text-4xl font-bold mb-4">
              Help Us Make a Difference
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your support enables us to continue providing free training and
              opening doors for aspiring professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Volunteer */}
            <div className="support-card bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col items-center text-center">
              <div className="card-icon w-16 h-16 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-6">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                Volunteer
              </h3>
              <p className="text-gray-600">
                Share your expertise and time by volunteering as a mentor,
                trainer, or support staff.
              </p>
            </div>

            {/* Partner with Us */}
            <div className="support-card bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col items-center text-center">
              <div className="card-icon w-16 h-16 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-6">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                Partner with Us
              </h3>
              <p className="text-gray-600">
                Collaborate as a corporate partner to provide job opportunities
                and resources.
              </p>
            </div>

            {/* Refer Students */}
            <div className="support-card bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col items-center text-center">
              <div className="card-icon w-16 h-16 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-6">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                Refer Students
              </h3>
              <p className="text-gray-600">
                Refer deserving students who could benefit from our free
                training programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section py-16 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="cta-text mb-8 md:mb-0 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">
                Ready to start your career in SAP?
              </h2>
              <p className="text-xl text-indigo-100">
                Join our next training batch.
              </p>
            </div>
            <div className="cta-button">
              <a
                href="/apply-now"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 transition-colors duration-300"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-base text-indigo-600 uppercase font-semibold tracking-wide mb-2">
              Contact Us
            </h2>
            <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions? Our team is here to help you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="contact-info bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-medium text-gray-900 mb-6">
                Contact Information
              </h3>
              <div className="space-y-6 text-gray-700">
                <div className="flex items-start">
                  <svg
                    className="h-6 w-6 text-indigo-500 mr-3 mt-1 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p>
                    1st Floor, House No 1644, At: Chondhi, Post: Kihim, Tal:
                    Alibag, Dist: Raigad, Maharashtra 402201
                  </p>
                </div>

                <div className="flex items-center">
                  <svg
                    className="h-6 w-6 text-indigo-500 mr-3 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a
                    href="mailto:info@utkarsh-foundation.com"
                    className="text-indigo-600 hover:underline"
                  >
                    info@utkarsh-foundation.com
                  </a>
                </div>
              </div>

              <div className="mt-8 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Office Hours
                </h3>
                <p className="text-gray-700">Monday - Friday: 9 AM – 6 PM</p>
              </div>
            </div>

            <div className="contact-form">
              <h3 className="text-xl font-medium text-gray-900 mb-6">
                Quick Enquiry
              </h3>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Your email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Your message"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
