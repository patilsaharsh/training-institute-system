// src/pages/interviewer/InterviewerDashboard.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getInterviewerAssignments, ApplicationData } from '../../services/applicationService';
import Card from '../../components/Card';
import Button from '../../components/Button';
import StatusBadge from '../../components/StatusBadge';
import dayjs from 'dayjs';

// Use intersection type rather than extending
type ApplicationWithId = ApplicationData & { id: string };

const InterviewerDashboard = () => {
  const { currentUser } = useAuth();
  const [applications, setApplications] = useState<ApplicationWithId[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        if (currentUser) {
          const data = await getInterviewerAssignments(currentUser.email || '');
          setApplications(data);
          console.log('Fetched applications:', data); // Debug log
        }
      } catch (error) {
        console.error('Error fetching interviewer assignments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignments();
  }, [currentUser]);

  // Helper function to get active interview number for this interviewer
  const getInterviewNumber = (application: ApplicationWithId) => {
    if (!currentUser?.email) return null;
    
    const email = currentUser.email;
    const status = application.status;
    
    console.log(`Application ${application.id} status: ${status}`); // Debug log
    
    // Determine interview number based on the current application status
    if (status.includes('interview1') && 
        application.interviews?.interview1?.interviewerId === email) {
      return 1;
    }
    
    if (status.includes('interview2') && 
        application.interviews?.interview2?.interviewerId === email) {
      return 2;
    }
    
    if (status.includes('interview3') && 
        application.interviews?.interview3?.interviewerId === email) {
      return 3;
    }
    
    // Fallback: check all interviews if we couldn't determine by status
    if (application.interviews?.interview3?.interviewerId === email) {
      return 3;
    } else if (application.interviews?.interview2?.interviewerId === email) {
      return 2;
    } else if (application.interviews?.interview1?.interviewerId === email) {
      return 1;
    }
    
    return null;
  };

  // Helper function to get interview date
  const getInterviewDate = (application: ApplicationWithId, interviewNumber: number) => {
    if (!application.interviews) return 'Not scheduled';
    
    let interview;
    if (interviewNumber === 1) {
      interview = application.interviews.interview1;
    } else if (interviewNumber === 2) {
      interview = application.interviews.interview2;
    } else if (interviewNumber === 3) {
      interview = application.interviews.interview3;
    } else {
      return 'Not scheduled';
    }
    
    if (!interview || !interview.scheduledDate) {
      return 'Not scheduled';
    }
    
    return dayjs(interview.scheduledDate.toDate()).format('MMM D, YYYY h:mm A');
  };

  // Helper function to check if interview is pending
  const isInterviewPending = (application: ApplicationWithId, interviewNumber: number) => {
    const status = application.status;
    
    // Check if the interview is pending based on the application status
    if (interviewNumber === 1) {
      return status === 'pending' || status === 'interview1_scheduled';
    }
    
    if (interviewNumber === 2) {
      return status === 'interview1_passed' || status === 'interview2_scheduled';
    }
    
    if (interviewNumber === 3) {
      return status === 'interview2_passed' || status === 'interview3_scheduled';
    }
    
    return false;
  };

  // Helper function to get meeting link
  const getMeetingLink = (application: ApplicationWithId, interviewNumber: number) => {
    if (!application.interviews) return undefined;
    
    if (interviewNumber === 1 && application.interviews.interview1) {
      return application.interviews.interview1.meetingLink;
    } else if (interviewNumber === 2 && application.interviews.interview2) {
      return application.interviews.interview2.meetingLink;
    } else if (interviewNumber === 3 && application.interviews.interview3) {
      return application.interviews.interview3.meetingLink;
    }
    
    return undefined;
  };

  // Filter applications based on the selected filter
  const filteredApplications = applications.filter((application) => {
    const interviewNumber = getInterviewNumber(application);
    
    if (!interviewNumber) return false;
    
    if (filter === 'all') return true;
    
    if (filter === 'pending') {
      return isInterviewPending(application, interviewNumber);
    }
    
    // Completed interviews
    return !isInterviewPending(application, interviewNumber);
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Interviewer Dashboard</h1>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex space-x-4">
          <Button 
            variant={filter === 'all' ? 'primary' : 'outline'} 
            onClick={() => setFilter('all')}
          >
            All Interviews
          </Button>
          <Button 
            variant={filter === 'pending' ? 'primary' : 'outline'} 
            onClick={() => setFilter('pending')}
          >
            Pending Interviews
          </Button>
          <Button 
            variant={filter === 'completed' ? 'primary' : 'outline'} 
            onClick={() => setFilter('completed')}
          >
            Completed Interviews
          </Button>
        </div>
      </Card>

      {/* Applications List */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : filteredApplications.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No interviews found</h3>
            <p className="mt-1 text-sm text-gray-500">
              You don't have any {filter !== 'all' ? (filter === 'pending' ? 'pending' : 'completed') : ''} interviews assigned.
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          {filteredApplications.map((application) => {
            const interviewNumber = getInterviewNumber(application);
            if (!interviewNumber) return null;
            
            const interviewDate = getInterviewDate(application, interviewNumber);
            const isPending = isInterviewPending(application, interviewNumber);
            const meetingLink = getMeetingLink(application, interviewNumber);
            
            return (
              <Card key={`${application.id}-interview${interviewNumber}`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{application.name}</h3>
                    <p className="text-sm text-gray-500">{application.email}</p>
                    <p className="text-sm text-gray-500">{application.phone}</p>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {application.course}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Interview Details</p>
                    <p className="mt-1">
                      <span className="font-medium">Interview {interviewNumber}</span> on {interviewDate}
                    </p>
                    
                    <div className="mt-2">
                      <StatusBadge status={application.status} />
                    </div>
                    
                    {meetingLink && (
                      <div className="mt-3">
                        <a
                          href={meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Join Meeting
                        </a>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-end justify-end">
                    {isPending ? (
                      <Link to={`/interviewer/evaluate/${application.id}?interview=${interviewNumber}`}>
                        <Button>Evaluate Candidate</Button>
                      </Link>
                    ) : (
                      <Link to={`/interviewer/evaluate/${application.id}?interview=${interviewNumber}`}>
                        <Button variant="outline">View Details</Button>
                      </Link>
                    )}
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

export default InterviewerDashboard;