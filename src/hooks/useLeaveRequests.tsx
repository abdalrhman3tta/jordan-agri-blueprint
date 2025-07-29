import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface LeaveRequest {
  id: string;
  employee_id: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  total_days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approved_by?: string;
  approved_at?: string;
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
  employee?: {
    full_name: string;
    email: string;
    department?: string;
    position?: string;
  };
  approver?: {
    full_name: string;
    email: string;
  };
}

export const useLeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { profile } = useAuth();

  const fetchLeaveRequests = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('leave_requests')
        .select(`
          *,
          employee:profiles!leave_requests_employee_id_fkey(full_name, email, department, position),
          approver:profiles!leave_requests_approved_by_fkey(full_name, email)
        `)
        .order('created_at', { ascending: false });

      // If user is an employee, only show their leave requests
      if (profile?.role === 'employee') {
        query = query.eq('employee_id', profile.id);
      }

      const { data, error } = await query;

      if (error) {
        toast.error('Failed to fetch leave requests');
        console.error('Error fetching leave requests:', error);
        return;
      }

      setLeaveRequests(data || []);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createLeaveRequest = async (leaveData: {
    leave_type: string;
    start_date: string;
    end_date: string;
    reason: string;
  }) => {
    try {
      if (!profile) throw new Error('No profile found');
      if (!['employee', 'admin', 'supervisor'].includes(profile.role)) {
        throw new Error('Only employees can create leave requests');
      }

      // Calculate total days
      const startDate = new Date(leaveData.start_date);
      const endDate = new Date(leaveData.end_date);
      const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

      const { data, error } = await supabase
        .from('leave_requests')
        .insert([
          {
            employee_id: profile.id,
            ...leaveData,
            total_days: totalDays,
          },
        ])
        .select()
        .single();

      if (error) {
        toast.error('Failed to create leave request');
        console.error('Error creating leave request:', error);
        return { error };
      }

      toast.success('Leave request submitted successfully!');
      await fetchLeaveRequests();
      return { data, error: null };
    } catch (error: any) {
      toast.error(error.message || 'An unexpected error occurred');
      return { error };
    }
  };

  const updateLeaveRequest = async (
    id: string,
    updates: Partial<LeaveRequest>
  ) => {
    try {
      const { data, error } = await supabase
        .from('leave_requests')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        toast.error('Failed to update leave request');
        console.error('Error updating leave request:', error);
        return { error };
      }

      toast.success('Leave request updated successfully!');
      await fetchLeaveRequests();
      return { data, error: null };
    } catch (error: any) {
      toast.error('An unexpected error occurred');
      return { error };
    }
  };

  const approveLeaveRequest = async (id: string) => {
    try {
      if (!profile || !['admin', 'supervisor'].includes(profile.role)) {
        throw new Error('Only supervisors can approve leave requests');
      }

      const { data, error } = await supabase
        .from('leave_requests')
        .update({
          status: 'approved',
          approved_by: profile.id,
          approved_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        toast.error('Failed to approve leave request');
        console.error('Error approving leave request:', error);
        return { error };
      }

      toast.success('Leave request approved successfully!');
      await fetchLeaveRequests();
      return { data, error: null };
    } catch (error: any) {
      toast.error(error.message || 'An unexpected error occurred');
      return { error };
    }
  };

  const rejectLeaveRequest = async (id: string, rejectionReason: string) => {
    try {
      if (!profile || !['admin', 'supervisor'].includes(profile.role)) {
        throw new Error('Only supervisors can reject leave requests');
      }

      const { data, error } = await supabase
        .from('leave_requests')
        .update({
          status: 'rejected',
          approved_by: profile.id,
          approved_at: new Date().toISOString(),
          rejection_reason: rejectionReason,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        toast.error('Failed to reject leave request');
        console.error('Error rejecting leave request:', error);
        return { error };
      }

      toast.success('Leave request rejected successfully!');
      await fetchLeaveRequests();
      return { data, error: null };
    } catch (error: any) {
      toast.error(error.message || 'An unexpected error occurred');
      return { error };
    }
  };

  useEffect(() => {
    if (profile) {
      fetchLeaveRequests();
    }
  }, [profile]);

  return {
    leaveRequests,
    loading,
    createLeaveRequest,
    updateLeaveRequest,
    approveLeaveRequest,
    rejectLeaveRequest,
    refetch: fetchLeaveRequests,
  };
};