// src/pages/admin/ApplicationDetails.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getApplicationById } from '../../services/applicationService';
import Card from '../../components/Card';
import Button from '../../components/Button';
import StatusBadge from '../../components/StatusBadge';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const ApplicationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [application, setApplication] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        
        // Fetch application details
        const applicationData = await getApplicationById(id);
        
        if (!applicationData) {
          toast.error('Application not found');
          navigate('/admin');
          return;
        }
        
        setApplication(applicationData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load application details');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id, navigate]);

  // Helper function to get formatted interview details
  const getInterviewDetails = (interviewKey: string) => {
    if (!application || !application.interviews || !application.interviews[interviewKey]) {
      return null;
    }
    
    const interview = application.interviews[interviewKey];
    
    return {
      interviewer: interview.interviewerName,
      date: interview.scheduledDate 
        ? dayjs(interview.scheduledDate.toDate()).format('MMM D, YYYY h:mm A') 
        : 'Not scheduled',
      meetingLink: interview.meetingLink,
      status: interview.status,
      feedback: interview.feedback,
    };
  };

  // Get action button based on application status
  const getActionButton = () => {
    if (!application) return null;
    
    const status = application.status;
    
    if (status === 'pending') {
      return (
        <Link to={`/admin/assign/${id}`}>
          <Button>Schedule Interview 1</Button>
        </Link>
      );
    }
    
    if (status === 'interview1_passed') {
      return (
        <Link to={`/admin/assign/${id}`}>
          <Button>Schedule Interview 2</Button>
        </Link>
      );
    }
    
    if (status === 'interview2_passed') {
      return (
        <Link to={`/admin/assign/${id}`}>
          <Button>Schedule Interview 3</Button>
        </Link>
      );
    }
    
    return null;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  if (!application) {
    return (
      <Card>
        <div className="text-center py-12">
          <p className="text-lg text-gray-700">Application not found</p>
          <div className="mt-4">
            <Link to="/admin">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </Card>
    );
  }

  const interview1 = getInterviewDetails('interview1');
  const interview2 = getInterviewDetails('interview2');
  const interview3 = getInterviewDetails('interview3');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Application Details</h1>
        <div className="flex space-x-3">
          <Link to="/admin">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
          {getActionButton()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Applicant Details */}
        <Card title="Applicant Details" className="md:col-span-1">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="mt-1">{application.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="mt-1">{application.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Phone</p>
              <p className="mt-1">{application.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Aadhar Number</p>
              <p className="mt-1">{application.aadharNumber}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Course</p>
              <p className="mt-1">{application.course}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Current Status</p>
              <div className="mt-1">
                <StatusBadge status={application.status} />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Applied On</p>
              <p className="mt-1">
                {application.createdAt && dayjs(application.createdAt.toDate()).format('MMM D, YYYY')}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Resume</p>
              <div className="mt-1">
                <a
                  href={application.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  View Resume
                </a>
              </div>
            </div>
          </div>
        </Card>

        {/* Interview Details */}
        <Card title="Interview Process" className="md:col-span-2">
          <div className="space-y-8">
            {/* Interview 1 */}
            <div className="border-b pb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Interview 1</h3>
                {interview1 ? (
                  <StatusBadge 
                    status={
                      interview1.status === 'passed' 
                        ? 'interview1_passed' 
                        : interview1.status === 'failed'
                        ? 'interview1_failed'
                        : 'interview1_scheduled'
                    } 
                  />
                ) : (
                  <span className="text-sm text-gray-500">Not scheduled</span>
                )}
              </div>
              
              {interview1 ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Interviewer</p>
                      <p className="mt-1">{interview1.interviewer}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Scheduled For</p>
                      <p className="mt-1">{interview1.date}</p>
                    </div>
                  </div>
                  
                  {interview1.meetingLink && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Meeting Link</p>
                      <p className="mt-1">
                        <a
                          href={interview1.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-500"
                        >
                          {interview1.meetingLink}
                        </a>
                      </p>
                    </div>
                  )}
                  
                  {interview1.feedback && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Feedback</p>
                      <p className="mt-1">{interview1.feedback}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">First interview hasn't been scheduled yet.</p>
                  <div className="mt-3">
                    <Link to={`/admin/assign/${id}`}>
                      <Button size="sm">Schedule Interview 1</Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Interview 2 */}
            <div className="border-b pb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Interview 2</h3>
                {interview2 ? (
                  <StatusBadge 
                    status={
                      interview2.status === 'passed' 
                        ? 'interview2_passed' 
                        : interview2.status === 'failed'
                        ? 'interview2_failed'
                        : 'interview2_scheduled'
                    } 
                  />
                ) : (
                  <span className="text-sm text-gray-500">
                    {application.status === 'interview1_passed' ? 'Ready to schedule' : 'Waiting for interview 1'}
                  </span>
                )}
              </div>
              
              {interview2 ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Interviewer</p>
                      <p className="mt-1">{interview2.interviewer}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Scheduled For</p>
                      <p className="mt-1">{interview2.date}</p>
                    </div>
                  </div>
                  
                  {interview2.meetingLink && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Meeting Link</p>
                      <p className="mt-1">
                        <a
                          href={interview2.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-500"
                        >
                          {interview2.meetingLink}
                        </a>
                      </p>
                    </div>
                  )}
                  
                  {interview2.feedback && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Feedback</p>
                      <p className="mt-1">{interview2.feedback}</p>
                    </div>
                  )}
                </div>
              ) : application.status === 'interview1_passed' ? (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">Ready to schedule second interview.</p>
                  <div className="mt-3">
                    <Link to={`/admin/assign/${id}`}>
                      <Button size="sm">Schedule Interview 2</Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">
                    Waiting for the first interview to be completed before scheduling the second one.
                  </p>
                </div>
              )}
            </div>
            
            {/* Interview 3 */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Interview 3</h3>
                {interview3 ? (
                  <StatusBadge 
                    status={
                      interview3.status === 'passed' 
                        ? 'interview3_passed' 
                        : interview3.status === 'failed'
                        ? 'interview3_failed'
                        : 'interview3_scheduled'
                    } 
                  />
                ) : (
                  <span className="text-sm text-gray-500">
                    {application.status === 'interview2_passed' ? 'Ready to schedule' : 'Waiting for interview 2'}
                  </span>
                )}
              </div>
              
              {interview3 ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Interviewer</p>
                      <p className="mt-1">{interview3.interviewer}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Scheduled For</p>
                      <p className="mt-1">{interview3.date}</p>
                    </div>
                  </div>
                  
                  {interview3.meetingLink && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Meeting Link</p>
                      <p className="mt-1">
                        <a
                          href={interview3.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-500"
                        >
                          {interview3.meetingLink}
                        </a>
                      </p>
                    </div>
                  )}
                  
                  {interview3.feedback && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Feedback</p>
                      <p className="mt-1">{interview3.feedback}</p>
                    </div>
                  )}
                </div>
              ) : application.status === 'interview2_passed' ? (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">Ready to schedule final interview.</p>
                  <div className="mt-3">
                    <Link to={`/admin/assign/${id}`}>
                      <Button size="sm">Schedule Interview 3</Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">
                    Waiting for the second interview to be completed before scheduling the final one.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ApplicationDetails;