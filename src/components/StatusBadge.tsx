// src/components/StatusBadge.tsx
import { ApplicationData } from '../services/applicationService';

interface StatusBadgeProps {
  status: ApplicationData['status'] | 'approved' | 'rejected';
  className?: string;
}

const StatusBadge = ({ status, className = '' }: StatusBadgeProps) => {
  // Define color schemes for different statuses
  const colorScheme = {
    'pending': 'bg-gray-100 text-gray-800',
    'interview1_scheduled': 'bg-blue-100 text-blue-800',
    'interview1_passed': 'bg-green-100 text-green-800',
    'interview1_failed': 'bg-red-100 text-red-800',
    'interview2_scheduled': 'bg-blue-100 text-blue-800',
    'interview2_passed': 'bg-green-100 text-green-800',
    'interview2_failed': 'bg-red-100 text-red-800',
    'interview3_scheduled': 'bg-blue-100 text-blue-800',
    'interview3_passed': 'bg-green-100 text-green-800',
    'interview3_failed': 'bg-red-100 text-red-800',
    'selected': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800',
    'approved': 'bg-green-100 text-green-800',
  }[status] || 'bg-gray-100 text-gray-800';

  // Define human-readable labels
  const statusLabel = {
    'pending': 'Pending',
    'interview1_scheduled': 'Interview 1 Scheduled',
    'interview1_passed': 'Interview 1 Passed',
    'interview1_failed': 'Interview 1 Failed',
    'interview2_scheduled': 'Interview 2 Scheduled',
    'interview2_passed': 'Interview 2 Passed',
    'interview2_failed': 'Interview 2 Failed',
    'interview3_scheduled': 'Interview 3 Scheduled',
    'interview3_passed': 'Interview 3 Passed',
    'interview3_failed': 'Interview 3 Failed',
    'selected': 'Selected',
    'rejected': 'Rejected',
    'approved': 'Approved',
  }[status] || 'Unknown';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorScheme} ${className}`}>
      {statusLabel}
    </span>
  );
};

export default StatusBadge;