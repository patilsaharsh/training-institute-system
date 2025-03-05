// src/pages/interviewer/InterviewEvaluation.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getApplicationById, updateInterviewResult } from '../../services/applicationService';
import Card from '../../components/Card';
import Button from '../../components/Button';
import StatusBadge from '../../components/StatusBadge';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const InterviewEvaluation = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const interviewNumber = parseInt(searchParams.get('interview') || '1');
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [application, setApplication] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [status, setStatus] = useState<'passed' | 'failed'>('passed');
  const [feedback, setFeedback] = useState('');
  
  // Check if this interview is already completed
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        
        // Fetch application details
        const applicationData = await getApplicationById(id);
        
        if (!applicationData) {
          toast.error('Application not found');
          navigate('/interviewer');
          return;
        }
        
        setApplication(applicationData);
        
        // Check if this interviewer is assigned to this interview
        const interviewKey = `interview${interviewNumber}` as keyof typeof applicationData.interviews;
        const interview = applicationData.interviews?.[interviewKey];
        
        if (!interview || interview.interviewerId !== currentUser?.email) {
          toast.error('You are not assigned to this interview');
          navigate('/interviewer');
          return;
        }
        
        // Check if interview is already completed
        if (interview.status === 'passed' || interview.status === 'failed') {
          setIsCompleted(true);
          setStatus(interview.status);
          setFeedback(interview.feedback || '');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load application details');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id, interviewNumber, currentUser, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedback.trim()) {
      toast.error('Please provide feedback');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      if (!id) throw new Error('Application ID is missing');
      
      // Update interview result
      await updateInterviewResult(
        id,
        interviewNumber as 1 | 2 | 3,
        status,
        feedback
      );
      
      toast.success('Interview evaluation submitted successfully');
      navigate('/interviewer');
    } catch (error) {
      console.error('Error submitting evaluation:', error);
      toast.error('Failed to submit evaluation');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to get interview details
  const getInterviewDetails = () => {
    if (!application || !application.interviews) return null;
    
    const interviewKey = `interview${interviewNumber}` as keyof typeof application.interviews;
    const interview = application.interviews[interviewKey];
    
    if (!interview) return null;
    
    return {
      date: interview.scheduledDate 
        ? dayjs(interview.scheduledDate.toDate()).format('MMM D, YYYY h:mm A') 
        : 'Not scheduled',
      meetingLink: interview.meetingLink,
      status: interview.status,
      feedback: interview.feedback,
    };
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
            <Link to="/interviewer">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </Card>
    );
  }

  const interviewDetails = getInterviewDetails();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          {isCompleted ? 'Interview Details' : 'Evaluate Candidate'}
        </h1>
        <div>
          <Link to="/interviewer">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
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

        {/* Interview Evaluation Form */}
        <Card title={`Interview ${interviewNumber} ${isCompleted ? 'Result' : 'Evaluation'}`} className="md:col-span-2">
          {interviewDetails && (
            <div className="mb-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Interview Date</p>
                  <p className="mt-1">{interviewDetails.date}</p>
                </div>
                
                {interviewDetails.meetingLink && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Meeting Link</p>
                    <p className="mt-1">
                      <a
                        href={interviewDetails.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-500"
                      >
                        Join Meeting
                      </a>
                    </p>
                  </div>
                )}
              </div>
              
              {isCompleted && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Evaluation Status</p>
                  <div className="mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      status === 'passed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {status === 'passed' ? 'Passed' : 'Failed'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {!isCompleted ? (
              <>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Evaluation Result
                  </label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-4 w-4 text-indigo-600"
                        value="passed"
                        checked={status === 'passed'}
                        onChange={() => setStatus('passed')}
                      />
                      <span className="ml-2 text-sm text-gray-700">Pass</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-4 w-4 text-indigo-600"
                        value="failed"
                        checked={status === 'failed'}
                        onChange={() => setStatus('failed')}
                      />
                      <span className="ml-2 text-sm text-gray-700">Fail</span>
                    </label>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                    Feedback
                  </label>
                  <textarea
                    id="feedback"
                    rows={6}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Provide detailed feedback on the candidate's performance..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                  ></textarea>
                  <p className="mt-1 text-xs text-gray-500">
                    Your feedback will be shared with the candidate and the admin.
                  </p>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/interviewer')}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    Submit Evaluation
                  </Button>
                </div>
              </>
            ) : (
              <div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Feedback
                  </label>
                  <div className="border border-gray-300 rounded-md p-3 bg-gray-50">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{feedback}</p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/interviewer')}
                  >
                    Back to Dashboard
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
};

export default InterviewEvaluation;