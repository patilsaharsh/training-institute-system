import React, { useState, useEffect } from "react";

// Define TypeScript interfaces
interface Course {
  scheduleCode: string;
  scheduleName: string;
  trainingCenter: string;
  courseCode: string;
  startDate: string;
  endDate: string;
  plannedBatchSize: number;
  interviewStartDate: string;
  interviewEndDate: string;
}

interface GroupedCourses {
  [key: string]: Course[];
}

const UpcomingProgramsPage: React.FC = () => {
  // Course schedule data with all details
  const courses: Course[] = [
    { 
      scheduleCode: "ABAP11", 
      scheduleName: "SAP : ABAP S4Hana", 
      trainingCenter: "Kudal-Sindhudurg", 
      courseCode: "ABAP", 
      startDate: "2/1/2025",
      endDate: "4/30/2025",
      plannedBatchSize: 10,
      interviewStartDate: "1/2/2025",
      interviewEndDate: "1/31/2025"
    },
    { 
      scheduleCode: "BASIS03", 
      scheduleName: "SAP : Basis Administration & Security", 
      trainingCenter: "Chondhi-Alibaug", 
      courseCode: "BASIS", 
      startDate: "2/1/2025",
      endDate: "4/30/2025",
      plannedBatchSize: 10,
      interviewStartDate: "1/2/2025",
      interviewEndDate: "1/31/2025"
    },
    { 
      scheduleCode: "CPI03", 
      scheduleName: "SAP : PI/PO & CPI", 
      trainingCenter: "Chondhi-Alibaug", 
      courseCode: "CPI", 
      startDate: "2/1/2025",
      endDate: "4/30/2025",
      plannedBatchSize: 15,
      interviewStartDate: "1/2/2025",
      interviewEndDate: "1/31/2025"
    },
    { 
      scheduleCode: "FI02", 
      scheduleName: "SAP : Finance & Accounting", 
      trainingCenter: "Kudal-Sindhudurg", 
      courseCode: "FI", 
      startDate: "2/1/2025",
      endDate: "4/30/2025",
      plannedBatchSize: 15,
      interviewStartDate: "1/2/2025",
      interviewEndDate: "1/31/2025"
    },
    { 
      scheduleCode: "ABAP12", 
      scheduleName: "SAP : ABAP S4Hana", 
      trainingCenter: "Chondhi-Alibaug", 
      courseCode: "ABAP", 
      startDate: "7/1/2025",
      endDate: "9/30/2025",
      plannedBatchSize: 12,
      interviewStartDate: "5/1/2025",
      interviewEndDate: "6/16/2025"
    },
    { 
      scheduleCode: "ABAP13", 
      scheduleName: "SAP : ABAP S4Hana", 
      trainingCenter: "Kudal-Sindhudurg", 
      courseCode: "ABAP", 
      startDate: "7/1/2025",
      endDate: "9/30/2025",
      plannedBatchSize: 12,
      interviewStartDate: "5/1/2025",
      interviewEndDate: "6/16/2025"
    },
    { 
      scheduleCode: "PSEP01", 
      scheduleName: "Public Sector Exam Preparation", 
      trainingCenter: "Chondhi-Alibaug", 
      courseCode: "PSEP", 
      startDate: "7/1/2025",
      endDate: "9/30/2025",
      plannedBatchSize: 25,
      interviewStartDate: "5/1/2025",
      interviewEndDate: "6/16/2025"
    },
    { 
      scheduleCode: "PSEP02", 
      scheduleName: "Public Sector Exam Preparation", 
      trainingCenter: "Kudal-Sindhudurg", 
      courseCode: "PSEP", 
      startDate: "7/1/2025",
      endDate: "9/30/2025",
      plannedBatchSize: 25,
      interviewStartDate: "5/1/2025",
      interviewEndDate: "6/16/2025"
    },
    { 
      scheduleCode: "SD02", 
      scheduleName: "SAP : Sales & Distribution", 
      trainingCenter: "Chondhi-Alibaug", 
      courseCode: "SD", 
      startDate: "7/1/2025",
      endDate: "9/30/2025",
      plannedBatchSize: 15,
      interviewStartDate: "5/1/2025",
      interviewEndDate: "6/16/2025"
    },
    { 
      scheduleCode: "ABAP14", 
      scheduleName: "SAP : ABAP S4Hana", 
      trainingCenter: "Chondhi-Alibaug", 
      courseCode: "ABAP", 
      startDate: "10/1/2025",
      endDate: "12/31/2025",
      plannedBatchSize: 12,
      interviewStartDate: "8/1/2025",
      interviewEndDate: "9/16/2025"
    },
    { 
      scheduleCode: "FSD01", 
      scheduleName: "Full Stack Developer", 
      trainingCenter: "Kudal-Sindhudurg", 
      courseCode: "FSD", 
      startDate: "10/1/2025",
      endDate: "3/31/2026",
      plannedBatchSize: 20,
      interviewStartDate: "8/1/2025",
      interviewEndDate: "9/16/2025"
    },
    { 
      scheduleCode: "FSD02", 
      scheduleName: "Full Stack Developer", 
      trainingCenter: "Chondhi-Alibaug", 
      courseCode: "FSD", 
      startDate: "10/1/2025",
      endDate: "3/31/2026",
      plannedBatchSize: 20,
      interviewStartDate: "8/1/2025",
      interviewEndDate: "9/16/2025"
    },
    { 
      scheduleCode: "MM02", 
      scheduleName: "SAP : Materials Management", 
      trainingCenter: "Chondhi-Alibaug", 
      courseCode: "MM", 
      startDate: "10/1/2025",
      endDate: "12/31/2025",
      plannedBatchSize: 15,
      interviewStartDate: "8/1/2025",
      interviewEndDate: "9/16/2025"
    },
    { 
      scheduleCode: "ABAP15", 
      scheduleName: "SAP : ABAP S4Hana", 
      trainingCenter: "Kudal-Sindhudurg", 
      courseCode: "ABAP", 
      startDate: "1/1/2026",
      endDate: "3/31/2026",
      plannedBatchSize: 12,
      interviewStartDate: "11/1/2025",
      interviewEndDate: "12/17/2025"
    },
    { 
      scheduleCode: "BASIS04", 
      scheduleName: "SAP : Basis Administration & Security", 
      trainingCenter: "Chondhi-Alibaug", 
      courseCode: "BASIS", 
      startDate: "1/1/2026",
      endDate: "3/31/2026",
      plannedBatchSize: 10,
      interviewStartDate: "11/1/2025",
      interviewEndDate: "12/17/2025"
    },
    { 
      scheduleCode: "CPI04", 
      scheduleName: "SAP : PI/PO & CPI", 
      trainingCenter: "Chondhi-Alibaug", 
      courseCode: "CPI", 
      startDate: "1/1/2026",
      endDate: "3/31/2026",
      plannedBatchSize: 15,
      interviewStartDate: "11/1/2025",
      interviewEndDate: "12/17/2025"
    },
    { 
      scheduleCode: "FI03", 
      scheduleName: "SAP : Finance & Accounting", 
      trainingCenter: "Kudal-Sindhudurg", 
      courseCode: "FI", 
      startDate: "1/1/2026",
      endDate: "3/31/2026",
      plannedBatchSize: 15,
      interviewStartDate: "11/1/2025",
      interviewEndDate: "12/17/2025"
    }
  ];

  // State for filtering and sorting
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [activeLocation, setActiveLocation] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Group courses by month and year
  const groupCoursesByDate = (): GroupedCourses => {
    const grouped: GroupedCourses = {};
    
    filteredCourses.forEach(course => {
      try {
        const dateParts = course.startDate.split('/');
        const date = new Date(parseInt(dateParts[2]), parseInt(dateParts[0]) - 1, parseInt(dateParts[1]));
        if (!isNaN(date.getTime())) {
          const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
          
          if (!grouped[monthYear]) {
            grouped[monthYear] = [];
          }
          
          grouped[monthYear].push(course);
        }
      } catch (e) {
        console.log("Date parsing error:", e);
      }
    });
    
    return grouped;
  };

  // Handle filtering by course type
  const filterByCourseType = (courseType: string): void => {
    setActiveFilter(courseType);
    
    let filtered = [...courses];
    
    // Apply course type filter if not "all"
    if (courseType !== "all") {
      filtered = filtered.filter(course => course.courseCode === courseType);
    }
    
    // Apply location filter if not "all"
    if (activeLocation !== "all") {
      filtered = filtered.filter(course => course.trainingCenter === activeLocation);
    }
    
    // Apply search term filter if not empty
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(course => 
        course.scheduleName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredCourses(filtered);
  };

  // Handle filtering by location
  const filterByLocation = (location: string): void => {
    setActiveLocation(location);
    
    let filtered = [...courses];
    
    // Apply course type filter if not "all"
    if (activeFilter !== "all") {
      filtered = filtered.filter(course => course.courseCode === activeFilter);
    }
    
    // Apply location filter if not "all"
    if (location !== "all") {
      filtered = filtered.filter(course => course.trainingCenter === location);
    }
    
    // Apply search term filter if not empty
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(course => 
        course.scheduleName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredCourses(filtered);
  };
  // Handle search filtering
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value;
    setSearchTerm(term);
    
    let filtered = [...courses];
    
    // Apply course type filter if not "all"
    if (activeFilter !== "all") {
      filtered = filtered.filter(course => course.courseCode === activeFilter);
    }
    
    // Apply location filter if not "all"
    if (activeLocation !== "all") {
      filtered = filtered.filter(course => course.trainingCenter === activeLocation);
    }
    
    // Apply search term filter if not empty
    if (term.trim() !== "") {
      filtered = filtered.filter(course => 
        course.scheduleName.toLowerCase().includes(term.toLowerCase())
      );
    }
    
    setFilteredCourses(filtered);
  };

  // Get unique course types for filter
  const getCourseTypes = (): string[] => {
    const types = new Set(courses.map(course => course.courseCode));
    return Array.from(types);
  };

  // Get unique locations for filter
  const getLocations = (): string[] => {
    const locations = new Set(courses.map(course => course.trainingCenter));
    return Array.from(locations);
  };

  // Reset all filters
  const resetFilters = (): void => {
    setActiveFilter("all");
    setActiveLocation("all");
    setSearchTerm("");
    setFilteredCourses(courses);
  };

  // Format date for display
  const formatDate = (dateString: string): string => {
    try {
      const dateParts = dateString.split('/');
      const date = new Date(parseInt(dateParts[2]), parseInt(dateParts[0]) - 1, parseInt(dateParts[1]));
      
      if (!isNaN(date.getTime())) {
        return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      }
      return dateString; // Return original if parsing fails
    } catch (e) {
      console.log("Date formatting error:", e);
      return dateString; // Return original if error
    }
  };

  // Get course color based on course code
  const getCourseColor = (courseCode: string): string => {
    const colors: { [key: string]: string } = {
      ABAP: "bg-indigo-100 text-indigo-800",
      BASIS: "bg-purple-100 text-purple-800",
      CPI: "bg-blue-100 text-blue-800",
      FI: "bg-green-100 text-green-800",
      PSEP: "bg-yellow-100 text-yellow-800",
      SD: "bg-pink-100 text-pink-800",
      FSD: "bg-teal-100 text-teal-800",
      MM: "bg-orange-100 text-orange-800"
    };
    
    return colors[courseCode] || "bg-gray-100 text-gray-800";
  };

  // Initialize filtered courses
  useEffect(() => {
    setFilteredCourses(courses);
  }, []);

  // Group the filtered courses by date
  const groupedCourses = groupCoursesByDate();
  
  // Custom sort function to handle month/year strings
  const sortedMonths = Object.keys(groupedCourses).sort((a, b) => {
    try {
      const monthNamesA = a.split(' ');
      const monthNamesB = b.split(' ');
      
      const monthA = new Date(`${monthNamesA[0]} 1, ${monthNamesA[1]}`);
      const monthB = new Date(`${monthNamesB[0]} 1, ${monthNamesB[1]}`);
      
      return monthA.getTime() - monthB.getTime();
    } catch (e) {
      console.log("Sorting error:", e);
      return 0;
    }
  });

  return (
    <div className="upcoming-programs-page">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Upcoming Training Programs</h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            Explore our upcoming free SAP training programs and start your journey towards a successful career in the IT industry.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-6 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search programs..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="relative inline-block text-left">
                <select 
                  className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={activeFilter}
                  onChange={(e) => filterByCourseType(e.target.value)}
                >
                  <option value="all">All Programs</option>
                  {getCourseTypes().map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div className="relative inline-block text-left">
                <select 
                  className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={activeLocation}
                  onChange={(e) => filterByLocation(e.target.value)}
                >
                  <option value="all">All Locations</option>
                  {getLocations().map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              
              <button 
                onClick={resetFilters}
                className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-2 rounded-md text-sm transition-colors duration-200"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Timeline */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl text-gray-600">No programs match your search criteria.</h3>
              <button 
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
              >
                View All Programs
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {sortedMonths.map(month => (
                <div key={month} className="program-month">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                    {month}
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch Size</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interview Period</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {groupedCourses[month].map(course => (
                          <tr key={course.scheduleCode} className="hover:bg-gray-50 transition-colors duration-200">
                            <td className="py-4 px-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getCourseColor(course.courseCode)} mr-2`}>
                                  {course.courseCode}
                                </span>
                                <span className="text-sm text-gray-500">{course.scheduleCode}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{course.scheduleName}</div>
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{course.trainingCenter}</div>
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {formatDate(course.startDate)} - {formatDate(course.endDate)}
                              </div>
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap text-center">
                              <div className="text-sm text-gray-500">{course.plannedBatchSize}</div>
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {formatDate(course.interviewStartDate)} - {formatDate(course.interviewEndDate)}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Take advantage of our free SAP training programs to gain industry-relevant skills and open doors to exciting career opportunities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a 
              href="/contact-us" 
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors duration-300"
            >
              Contact Us
            </a>
            <a 
              href="/programs" 
              className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-md border border-indigo-600 hover:bg-indigo-50 transition-colors duration-300"
            >
              Learn More About Programs
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpcomingProgramsPage;