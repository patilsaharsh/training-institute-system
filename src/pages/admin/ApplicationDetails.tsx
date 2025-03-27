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
    
    // Don't show any action buttons if the application is rejected
    if (status === 'rejected') {
      return null;
    }
    
    // Only show schedule interview button after approval
    if (status === 'approved') {
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

  // Component to render rejection reason
  const RejectionNotice = () => {
    if (!application || application.status !== 'rejected' || !application.rejectionReason) {
      return null;
    }

    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
        <h3 className="text-red-800 font-medium text-sm">Application Rejected</h3>
        <p className="text-red-700 text-sm mt-1">
          <span className="font-medium">Reason for rejection:</span> {application.rejectionReason}
        </p>
      </div>
    );
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

  // Helper function to format boolean values
  const formatBoolean = (value: boolean | undefined) => {
    if (value === undefined) return 'Not specified';
    return value ? 'Yes' : 'No';
  };

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

      {/* Rejection Notice */}
      <RejectionNotice />

      <div className="grid grid-cols-1 gap-6">
        {/* Personal Details */}
        <Card title="Personal Information" className="col-span-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="mt-1">{application.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="mt-1">{application.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Gender</p>
              <p className="mt-1">{application.gender ? application.gender.charAt(0).toUpperCase() + application.gender.slice(1) : 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Date of Birth</p>
              <p className="mt-1">{application.dateOfBirth}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Phone</p>
              <p className="mt-1">{application.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">WhatsApp Number</p>
              <p className="mt-1">{application.whatsappNumber}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Alternate Phone</p>
              <p className="mt-1">{application.alternatePhone || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Aadhar Number</p>
              <p className="mt-1">{application.aadharNumber}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Referred By</p>
              <p className="mt-1">{application.referredBy || 'Not referred'}</p>
            </div>
          </div>
        </Card>
        
        {/* Address Information */}
        <Card title="Address Information" className="col-span-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Country</p>
              <p className="mt-1">{application.country ? application.country.charAt(0).toUpperCase() + application.country.slice(1) : 'Not specified'}</p>
            </div>
            {application.state && (
              <div>
                <p className="text-sm font-medium text-gray-500">State</p>
                <p className="mt-1">{application.state.replace(/_/g, ' ').split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-gray-500">City</p>
              <p className="mt-1">{application.city}</p>
            </div>
            <div className="md:col-span-3">
              <p className="text-sm font-medium text-gray-500">Permanent Address</p>
              <p className="mt-1">{application.permanentAddress}</p>
            </div>
          </div>
        </Card>

        {/* Course Information */}
        <Card title="Course Information" className="col-span-1">
          <div>
            <p className="text-sm font-medium text-gray-500">Selected Course</p>
            <p className="mt-1">{application.course}</p>
          </div>
        </Card>

        {/* SSC & HSC Details */}
        <Card title="School Education" className="col-span-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SSC (10th) Details */}
            <div className="border-b pb-4 md:border-b-0 md:border-r md:pr-6">
              <h3 className="text-md font-medium mb-3">SSC (10th Standard)</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Passing Year</p>
                  <p className="mt-1">{application.sscPassingYear}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Percentage</p>
                  <p className="mt-1">{application.sscMarks}%</p>
                </div>
              </div>
            </div>

            {/* HSC (12th) Details */}
            <div>
              <h3 className="text-md font-medium mb-3">HSC (12th Standard)</h3>
              {application.hscPassingYear ? (
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Passing Year</p>
                    <p className="mt-1">{application.hscPassingYear}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Percentage</p>
                    <p className="mt-1">{application.hscMarks}%</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Not provided</p>
              )}
            </div>
          </div>
        </Card>

        {/* Diploma Details (if applicable) */}
        {application.hasDiploma && (
          <Card title="Diploma Education" className="col-span-1">
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Diploma Stream</p>
                  <p className="mt-1">{application.diplomaStream}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Passing Year</p>
                  <p className="mt-1">{application.diplomaPassingYear}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Percentage</p>
                  <p className="mt-1">{application.diplomaMarks}%</p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Graduation Details */}
        <Card title="Graduation Details" className="col-span-1">
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Graduation Stream</p>
                <p className="mt-1">{application.graduationStream}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Technical Stream</p>
                <p className="mt-1">{application.technicalStream}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Passing Year</p>
                <p className="mt-1">{application.graduationPassingYear}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Percentage</p>
                <p className="mt-1">{application.graduationMarks}%</p>
              </div>
            </div>

            {/* Education Gap */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-md font-medium">Education Gap</h3>
                <span className={`inline-flex rounded-full px-2 text-xs font-semibold ${
                  application.educationGap 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {formatBoolean(application.educationGap)}
                </span>
              </div>
              {application.educationGap && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Gap Duration (Years)</p>
                    <p className="mt-1">{application.educationGapYears}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Reason</p>
                    <p className="mt-1">{application.educationGapReason || 'Not specified'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Post Graduation Details (if applicable) */}
        {application.hasPostGraduation && (
          <Card title="Post Graduation Details" className="col-span-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Post Graduation Stream</p>
                <p className="mt-1">{application.postGraduationStream}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Passing Year</p>
                <p className="mt-1">{application.postGraduationPassingYear}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Percentage</p>
                <p className="mt-1">{application.postGraduationMarks}%</p>
              </div>
            </div>
          </Card>
        )}

        {/* Technical Skills & Work Experience */}
        <Card title="Skills & Experience" className="col-span-1">
          <div className="space-y-6">
            {/* Technical Skills */}
            <div>
              <h3 className="text-md font-medium mb-2">Technical Skills</h3>
              <p className="text-sm whitespace-pre-line">{application.technicalSkills}</p>
            </div>
            
            {/* Work Experience */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-md font-medium">Work Experience</h3>
                <span className={`inline-flex rounded-full px-2 text-xs font-semibold ${
                  application.hasWorkExperience 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {formatBoolean(application.hasWorkExperience)}
                </span>
              </div>
              {application.hasWorkExperience && (
                <div className="mt-3 space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Duration (Months)</p>
                    <p className="mt-1">{application.workExperienceMonths}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Details</p>
                    <p className="mt-1 whitespace-pre-line">{application.workExperienceDetails}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Resume */}
        <Card title="Documents" className="col-span-1">
          <div className="flex items-center space-x-3">
            <svg className="h-10 w-10 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <div>
              <h3 className="text-md font-medium">Resume</h3>
              <a
                href={application.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-500 text-sm mt-1 inline-block"
              >
                Download Resume (PDF)
              </a>
            </div>
          </div>
        </Card>

        {/* Application Status */}
        <Card title="Application Status" className="col-span-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <p className="text-sm font-medium text-gray-500">Last Updated</p>
              <p className="mt-1">
                {application.updatedAt && dayjs(application.updatedAt.toDate()).format('MMM D, YYYY')}
              </p>
            </div>
          </div>
        </Card>

        {/* Interview Details */}
        <Card title="Interview Process" className="col-span-1">
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
                        {/* Disable the link if interview is completed */}
                        {interview1.status === 'passed' || interview1.status === 'failed' ? (
                          <span className="text-gray-500">
                            {interview1.meetingLink}
                            <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">Interview Completed</span>
                          </span>
                        ) : (
                          <a
                            href={interview1.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-500"
                          >
                            {interview1.meetingLink}
                          </a>
                        )}
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
                  <p className="text-sm text-gray-500">
                    {application.status === 'approved' 
                      ? 'First interview can now be scheduled.'
                      : application.status === 'rejected'
                      ? 'Application was rejected.'
                      : 'Application needs to be approved before scheduling interviews.'}
                  </p>
                  {application.status === 'approved' && (
                    <div className="mt-3">
                      <Link to={`/admin/assign/${id}`}>
                        <Button size="sm">Schedule Interview 1</Button>
                      </Link>
                    </div>
                  )}
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
                        {/* Disable the link if interview is completed */}
                        {interview2.status === 'passed' || interview2.status === 'failed' ? (
                          <span className="text-gray-500">
                            {interview2.meetingLink}
                            <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">Interview Completed</span>
                          </span>
                        ) : (
                          <a
                            href={interview2.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-500"
                          >
                            {interview2.meetingLink}
                          </a>
                        )}
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
                  {application.status !== 'rejected' && (
                    <div className="mt-3">
                      <Link to={`/admin/assign/${id}`}>
                        <Button size="sm">Schedule Interview 2</Button>
                      </Link>
                    </div>
                  )}
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
                        {/* Disable the link if interview is completed */}
                        {interview3.status === 'passed' || interview3.status === 'failed' ? (
                          <span className="text-gray-500">
                            {interview3.meetingLink}
                            <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">Interview Completed</span>
                          </span>
                        ) : (
                          <a
                            href={interview3.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-500"
                          >
                            {interview3.meetingLink}
                          </a>
                        )}
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
                  {application.status !== 'rejected' && (
                    <div className="mt-3">
                      <Link to={`/admin/assign/${id}`}>
                        <Button size="sm">Schedule Interview 3</Button>
                      </Link>
                    </div>
                  )}
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