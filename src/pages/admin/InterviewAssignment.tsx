// src/pages/admin/InterviewAssignment.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getApplicationById, assignInterviewer } from '../../services/applicationService';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Card from '../../components/Card';
import Button from '../../components/Button';
import StatusBadge from '../../components/StatusBadge';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const InterviewAssignment = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [application, setApplication] = useState<any>(null);
  const [interviewers, setInterviewers] = useState<{ id: string; name: string; email: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form data
  const [selectedInterviewer, setSelectedInterviewer] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('');
  
  // Determine which interview needs to be scheduled
  const [interviewStage, setInterviewStage] = useState<1 | 2 | 3>(1);

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
        
        // Determine which interview stage we're at
        if (applicationData.status === 'pending') {
          setInterviewStage(1);
        } else if (applicationData.status === 'interview1_passed') {
          setInterviewStage(2);
        } else if (applicationData.status === 'interview2_passed') {
          setInterviewStage(3);
        }
        
        // Fetch available interviewers
        const interviewersQuery = query(
          collection(db, 'users'),
          where('role.interviewer', '==', true)
        );
        
        const interviewersSnapshot = await getDocs(interviewersQuery);
        const interviewersList: { id: string; name: string; email: string }[] = [];
        
        interviewersSnapshot.forEach((doc) => {
          const data = doc.data();
          interviewersList.push({
            id: doc.id,
            name: data.displayName || data.email,
            email: data.email,
          });
        });
        
        setInterviewers(interviewersList);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedInterviewer || !meetingLink || !interviewDate || !interviewTime) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      if (!id) throw new Error('Application ID is missing');
      
      // Get interviewer details
      const selectedInterviewerData = interviewers.find(i => i.id === selectedInterviewer);
      
      if (!selectedInterviewerData) {
        throw new Error('Selected interviewer not found');
      }
      
      // Create Date object for scheduled date/time
      const scheduledDate = new Date(`${interviewDate}T${interviewTime}`);
      
      // Call API to assign interviewer
      await assignInterviewer(
        id,
        interviewStage,
        selectedInterviewerData.email, // Using email as the interviewer ID
        selectedInterviewerData.name,
        meetingLink,
        scheduledDate
      );
      
      toast.success(`Interview ${interviewStage} scheduled successfully`);
      navigate('/admin');
    } catch (error) {
      console.error('Error assigning interviewer:', error);
      toast.error('Failed to schedule interview');
    } finally {
      setIsSubmitting(false);
    }
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Schedule Interview {interviewStage}
        </h1>
        <div>
          <Link to="/admin">
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
              <p className="text-sm font-medium text-gray-500">Status</p>
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

        {/* Interview Assignment Form */}
        <Card title={`Schedule Interview ${interviewStage}`} className="md:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="interviewer" className="block text-sm font-medium text-gray-700">
                Select Interviewer
              </label>
              <select
                id="interviewer"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={selectedInterviewer}
                onChange={(e) => setSelectedInterviewer(e.target.value)}
                required
              >
                <option value="">Select an interviewer</option>
                {interviewers.map((interviewer) => (
                  <option key={interviewer.id} value={interviewer.id}>
                    {interviewer.name} ({interviewer.email})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="meetingLink" className="block text-sm font-medium text-gray-700">
                Meeting Link
              </label>
              <input
                type="url"
                name="meetingLink"
                id="meetingLink"
                placeholder="https://meet.google.com/..."
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Provide a Google Meet, Zoom, or other video conferencing link
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="interviewDate" className="block text-sm font-medium text-gray-700">
                  Interview Date
                </label>
                <input
                  type="date"
                  name="interviewDate"
                  id="interviewDate"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  min={dayjs().format('YYYY-MM-DD')}
                  required
                />
              </div>

              <div>
                <label htmlFor="interviewTime" className="block text-sm font-medium text-gray-700">
                  Interview Time
                </label>
                <input
                  type="time"
                  name="interviewTime"
                  id="interviewTime"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={interviewTime}
                  onChange={(e) => setInterviewTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                Schedule Interview
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default InterviewAssignment;