// src/pages/student/StudentDashboard.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getApplicationsByUserId, ApplicationData } from '../../services/applicationService';
import Card from '../../components/Card';
import Button from '../../components/Button';
import StatusBadge from '../../components/StatusBadge';
import dayjs from 'dayjs';

// Enhanced interface that includes the rejection reason
interface EnhancedApplicationData extends ApplicationData {
  id: string;
  rejectionReason?: string;
}

const StudentDashboard = () => {
  const { currentUser } = useAuth();
  const [applications, setApplications] = useState<EnhancedApplicationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        if (currentUser) {
          const data = await getApplicationsByUserId(currentUser.uid);
          setApplications(data);
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [currentUser]);

  // Helper function to get interview stage details
  const getInterviewDetails = (application: EnhancedApplicationData) => {
    const interviewStages = [
      { key: 'interview1', label: 'Interview 1' },
      { key: 'interview2', label: 'Interview 2' },
      { key: 'interview3', label: 'Interview 3' },
    ];

    // Find the current interview stage based on status
    for (const stage of interviewStages) {
      if (application.status.startsWith(stage.key)) {
        const interviewData = application.interviews?.[stage.key as keyof typeof application.interviews];
        
        if (interviewData) {
          return {
            stage: stage.label,
            interviewer: interviewData.interviewerName,
            date: interviewData.scheduledDate 
              ? dayjs(interviewData.scheduledDate.toDate()).format('MMM D, YYYY h:mm A') 
              : 'Not scheduled',
            meetingLink: interviewData.meetingLink,
            status: application.status,
            feedback: interviewData.feedback,
          };
        }
        
        return {
          stage: stage.label,
          status: application.status,
        };
      }
    }

    return null;
  };

  // Function to render the rejection notification
  const renderRejectionNotice = (application: EnhancedApplicationData) => {
    if (application.status !== 'rejected' || !application.rejectionReason) {
      return null;
    }

    return (
      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
        <h4 className="text-sm font-medium text-red-800">Application Rejected</h4>
        <p className="mt-1 text-sm text-red-700">
          <span className="font-medium">Reason:</span> {application.rejectionReason}
        </p>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
        <Link to="/student/apply">
          <Button>Apply for Training</Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : applications.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No applications</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by applying for a training program.</p>
            <div className="mt-6">
              <Link to="/student/apply">
                <Button>Apply Now</Button>
              </Link>
            </div>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          {applications.map((application) => {
            const interviewDetails = getInterviewDetails(application);
            
            return (
              <Card key={application.id} className="overflow-hidden">
                <div className="border-b pb-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{application.course} Training Application</h3>
                    <p className="text-sm text-gray-500">
                      Applied on {dayjs(application.createdAt.toDate()).format('MMM D, YYYY')}
                    </p>
                  </div>
                  <StatusBadge status={application.status} />
                </div>
                
                <div className="mt-4 space-y-4">
                  {/* Render rejection notice if the application was rejected */}
                  {renderRejectionNotice(application)}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Personal Details</h4>
                      <div className="mt-2 space-y-2">
                        <p><span className="font-medium">Name:</span> {application.name}</p>
                        <p><span className="font-medium">Email:</span> {application.email}</p>
                        <p><span className="font-medium">Phone:</span> {application.phone}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Application Status</h4>
                      <div className="mt-2">
                        <p><span className="font-medium">Current Status:</span> <StatusBadge status={application.status} /></p>
                        
                        {interviewDetails && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-500">{interviewDetails.stage} Details</h4>
                            
                            {interviewDetails.interviewer && (
                              <p className="mt-1"><span className="font-medium">Interviewer:</span> {interviewDetails.interviewer}</p>
                            )}
                            
                            {interviewDetails.date && (
                              <p><span className="font-medium">Scheduled for:</span> {interviewDetails.date}</p>
                            )}
                            
                            {interviewDetails.meetingLink && (
                              <div className="mt-2">
                                {/* Check if interview status is 'passed' or 'failed' to disable the link */}
                                {interviewDetails.status.includes('_passed') || interviewDetails.status.includes('_failed') ? (
                                  <button
                                    disabled
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-500 bg-gray-200 cursor-not-allowed"
                                  >
                                    Interview Completed
                                  </button>
                                ) : (
                                  <a 
                                    href={interviewDetails.meetingLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                  >
                                    Join Interview
                                  </a>
                                )}
                              </div>
                            )}
                            
                            {interviewDetails.feedback && (
                              <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-500">Feedback</h4>
                                <p className="mt-1 text-sm text-gray-700">{interviewDetails.feedback}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;