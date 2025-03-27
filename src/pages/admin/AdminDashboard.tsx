// src/pages/admin/AdminDashboard.tsx
import { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import { getAllApplications, ApplicationData, updateApplicationStatus } from '../../services/applicationService';
import Card from '../../components/Card';
import StatusBadge from '../../components/StatusBadge';
import Button from '../../components/Button';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { Timestamp } from 'firebase/firestore';

// Define proper TypeScript interface for application data
// Modified to match the actual data structure from the API
interface ApplicationWithId extends Omit<ApplicationData, 'createdAt' | 'interviews'> {
  id: string;
  createdAt?: Timestamp;
  interviews?: {
    interview1?: {
      interviewerId?: string;
      interviewerName?: string;
      meetingLink?: string;
      scheduledDate?: Timestamp;
      feedback?: string;
      status?: "pending" | "passed" | "rejected";
    };
    interview2?: {
      interviewerId?: string;
      interviewerName?: string;
      meetingLink?: string;
      scheduledDate?: Timestamp;
      feedback?: string;
      status?: "pending" | "passed" | "rejected";
    };
    interview3?: {
      interviewerId?: string;
      interviewerName?: string;
      meetingLink?: string;
      scheduledDate?: Timestamp;
      feedback?: string;
      status?: "pending" | "passed" | "rejected";
    };
  };
}

// Interface for rejection dialog
interface RejectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

// Rejection dialog component
const RejectionDialog = ({ isOpen, onClose, onConfirm }: RejectionDialogProps) => {
  const [rejectionReason, setRejectionReason] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Rejection Reason</h3>
        <p className="text-sm text-gray-500 mb-4">
          Please provide a reason for rejecting this application. This will be visible to the applicant.
        </p>
        <textarea
          className="w-full border border-gray-300 rounded-md p-2 mb-4 h-32"
          placeholder="Enter reason for rejection..."
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
        ></textarea>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={() => {
              if (rejectionReason.trim()) {
                onConfirm(rejectionReason);
              } else {
                toast.error('Please provide a rejection reason');
              }
            }}
          >
            Reject Application
          </Button>
        </div>
      </div>
    </div>
  );
};
const AdminDashboard = () => {
  // Commented out unused navigate
  // const navigate = useNavigate();
  const [applications, setApplications] = useState<ApplicationWithId[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<ApplicationWithId[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [courseFilter, setCourseFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  
  // States for rejection dialog
  const [rejectionDialogOpen, setRejectionDialogOpen] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getAllApplications();
        // Type assertion to match the actual data structure
        setApplications(data as unknown as ApplicationWithId[]);
        setFilteredApplications(data as unknown as ApplicationWithId[]);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  useEffect(() => {
    // Apply filters when any filter changes
    let filtered = [...applications];
    
    if (courseFilter) {
      filtered = filtered.filter(app => app.course === courseFilter);
    }
    
    if (statusFilter) {
      filtered = filtered.filter(app => app.status === statusFilter);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        app => 
          app.name.toLowerCase().includes(term) || 
          app.email.toLowerCase().includes(term) ||
          app.phone.includes(term)
      );
    }
    
    // Apply date range filter
    if (startDate) {
      const startDateTime = new Date(startDate).getTime();
      filtered = filtered.filter(app => {
        if (!app.createdAt) return true;
        const appDate = app.createdAt.toDate().getTime();
        return appDate >= startDateTime;
      });
    }
    
    if (endDate) {
      // Set end date to end of the selected day
      const endDateTime = new Date(endDate);
      endDateTime.setHours(23, 59, 59, 999);
      const endTimeMs = endDateTime.getTime();
      
      filtered = filtered.filter(app => {
        if (!app.createdAt) return true;
        const appDate = app.createdAt.toDate().getTime();
        return appDate <= endTimeMs;
      });
    }
    
    setFilteredApplications(filtered);
  }, [courseFilter, statusFilter, searchTerm, startDate, endDate, applications]);

  // Get unique courses for filter dropdown
  const courses = [...new Set(applications.map(app => app.course))];
  
  // Get unique statuses for filter dropdown
  const statuses = [...new Set(applications.map(app => app.status))];

  // Show rejection dialog
  const handleShowRejectionDialog = (applicationId: string) => {
    setSelectedApplicationId(applicationId);
    setRejectionDialogOpen(true);
  };

  // Handle rejection confirmation
  const handleRejectApplication = async (rejectionReason: string) => {
    if (!selectedApplicationId) return;
    
    try {
      // We're still using setIsProcessing but we've removed the isProcessing state variable
      // to avoid the TypeScript error. Let's directly manage processing state in our UI.
      const processingToast = toast.loading('Processing rejection...');
      
      await updateApplicationStatus(selectedApplicationId, 'rejected', rejectionReason);
      
      // Update the applications list
      setApplications(prevApps => 
        prevApps.map(app => 
          app.id === selectedApplicationId ? { 
            ...app, 
            status: 'rejected',
            rejectionReason: rejectionReason 
          } : app
        )
      );
      
      toast.dismiss(processingToast);
      toast.success('Application rejected successfully');
      setRejectionDialogOpen(false);
      setSelectedApplicationId(null);
    } catch (error) {
      console.error('Error rejecting application:', error);
      toast.error('Failed to reject application');
    }
  };

  const handleStatusUpdate = async (applicationId: string, newStatus: 'approved' | 'rejected' | 'selected') => {
    if (newStatus === 'rejected') {
      handleShowRejectionDialog(applicationId);
      return;
    }

    try {
      // Use a loading toast instead of isProcessing state
      const processingToast = toast.loading(`Processing ${newStatus} status...`);
      
      await updateApplicationStatus(applicationId, newStatus);
      
      // Update the applications list
      setApplications(prevApps => 
        prevApps.map(app => 
          app.id === applicationId ? { ...app, status: newStatus } : app
        )
      );
      
      toast.dismiss(processingToast);
      toast.success(`Application ${newStatus} successfully`);
    } catch (error) {
      console.error(`Error ${newStatus} application:`, error);
      toast.error(`Failed to ${newStatus} application`);
    }
  };

  // Safe function to format Firebase timestamps
  const formatDate = (timestamp?: Timestamp) => {
    if (!timestamp) return 'N/A';
    try {
      return dayjs(timestamp.toDate()).format('MMM D, YYYY');
    } catch (error) {
      return 'Invalid Date';
    }
  };

  // Helper function to check if status is a rejected interview
  const isInterviewRejected = (status: string) => {
    return status === 'interview1_rejected' || 
           status === 'interview2_rejected' || 
           status === 'interview3_rejected';
  };

  // Clear all filters
  const clearAllFilters = () => {
    setCourseFilter('');
    setStatusFilter('');
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
      </div>

      {/* Rejection Dialog */}
      <RejectionDialog 
        isOpen={rejectionDialogOpen}
        onClose={() => {
          setRejectionDialogOpen(false);
          setSelectedApplicationId(null);
        }}
        onConfirm={handleRejectApplication}
      />

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              id="search"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Search by name, email, or phone"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="courseFilter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Course
            </label>
            <select
              id="courseFilter"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
            >
              <option value="">All Courses</option>
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Status
            </label>
            <select
              id="statusFilter"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>
          
          {/* Start Date Filter */}
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              From Date
            </label>
            <input
              type="date"
              id="startDate"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          
          {/* End Date Filter */}
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              To Date
            </label>
            <input
              type="date"
              id="endDate"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          
          <div className="flex items-end">
            <Button 
              variant="outline" 
              onClick={clearAllFilters}
              fullWidth
            >
              Clear Filters
            </Button>
          </div>
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
            <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {applications.length > 0 
                ? 'No applications match your filter criteria.'
                : 'No applications have been submitted yet.'}
            </p>
          </div>
        </Card>
      ) : (
        <div className="overflow-x-auto bg-white shadow-sm rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied On
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{application.name}</div>
                        <div className="text-sm text-gray-500">{application.email}</div>
                        <div className="text-sm text-gray-500">{application.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{application.course}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={application.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(application.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      {/* View Details Button - Always present */}
                      <Link to={`/admin/application/${application.id}`}>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </Link>
                      
                      {/* Status-based action buttons */}
                      {(() => {
                        const status = application.status;
                        
                        // If interview is rejected, don't show any additional buttons
                        if (isInterviewRejected(status)) {
                          return null;
                        }
                        
                        // When status is 'approved', show "Assign Interview" button
                        if (status === 'approved') {
                          return (
                            <Link to={`/admin/assign/${application.id}`}>
                              <Button size="sm" variant="primary">
                                Assign Interview
                              </Button>
                            </Link>
                          );
                        }
                        
                        // When status is interview1_passed, show "Schedule Interview 2" button
                        if (status === 'interview1_passed') {
                          return (
                            <Link to={`/admin/assign/${application.id}`}>
                              <Button size="sm" variant="primary">
                                Schedule Interview 2
                              </Button>
                            </Link>
                          );
                        }
                        
                        // When status is interview2_passed, show "Schedule Interview 3" button
                        if (status === 'interview2_passed') {
                          return (
                            <Link to={`/admin/assign/${application.id}`}>
                              <Button size="sm" variant="primary">
                                Schedule Interview 3
                              </Button>
                            </Link>
                          );
                        }
                        
                        // When status is interview3_passed, show "Mark as Selected" button
                        if (status === 'interview3_passed') {
                          return (
                            <Button 
                              size="sm"
                              variant="success"
                              onClick={() => handleStatusUpdate(application.id, 'selected')}
                            >
                              Mark as Selected
                            </Button>
                          );
                        }
                        
                        // If status is not yet approved or rejected, show approve/reject buttons
                        if (status === 'pending') {
                          return (
                            <>
                              <Button
                                size="sm"
                                variant="success"
                                onClick={() => handleStatusUpdate(application.id, 'approved')}
                              >
                                Approve
                              </Button>
                              
                              <Button
                                size="sm"
                                variant="danger"
                                onClick={() => handleShowRejectionDialog(application.id)}
                              >
                                Reject
                              </Button>
                            </>
                          );
                        }
                        
                        return null;
                      })()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;