import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface Application {
  id: string;
  applicant_id: string;
  application_type: 'license' | 'permit' | 'subsidy' | 'certification' | 'inspection';
  title: string;
  description?: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigned_to?: string;
  submitted_at: string;
  reviewed_at?: string;
  completed_at?: string;
  rejection_reason?: string;
  estimated_completion?: string;
  metadata: any;
  created_at: string;
  updated_at: string;
  applicant?: {
    full_name: string;
    email: string;
    phone?: string;
  };
  assigned_employee?: {
    full_name: string;
    email: string;
  };
}

export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, profile } = useAuth();

  const fetchApplications = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('applications')
        .select(`
          *,
          applicant:profiles!applications_applicant_id_fkey(full_name, email, phone),
          assigned_employee:profiles!applications_assigned_to_fkey(full_name, email)
        `)
        .order('created_at', { ascending: false });

      // If user is a farmer, only show their applications
      if (profile?.role === 'farmer') {
        query = query.eq('applicant_id', profile.id);
      }

      const { data, error } = await query;

      if (error) {
        toast.error('Failed to fetch applications');
        console.error('Error fetching applications:', error);
        return;
      }

      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createApplication = async (applicationData: {
    application_type: Application['application_type'];
    title: string;
    description?: string;
    priority?: Application['priority'];
    metadata?: any;
  }) => {
    try {
      if (!profile) throw new Error('No profile found');

      const { data, error } = await supabase
        .from('applications')
        .insert([
          {
            applicant_id: profile.id,
            ...applicationData,
          },
        ])
        .select()
        .single();

      if (error) {
        toast.error('Failed to create application');
        console.error('Error creating application:', error);
        return { error };
      }

      toast.success('Application submitted successfully!');
      await fetchApplications();
      return { data, error: null };
    } catch (error: any) {
      toast.error('An unexpected error occurred');
      return { error };
    }
  };

  const updateApplication = async (
    id: string,
    updates: Partial<Application>
  ) => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        toast.error('Failed to update application');
        console.error('Error updating application:', error);
        return { error };
      }

      toast.success('Application updated successfully!');
      await fetchApplications();
      return { data, error: null };
    } catch (error: any) {
      toast.error('An unexpected error occurred');
      return { error };
    }
  };

  const deleteApplication = async (id: string) => {
    try {
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', id);

      if (error) {
        toast.error('Failed to delete application');
        console.error('Error deleting application:', error);
        return { error };
      }

      toast.success('Application deleted successfully!');
      await fetchApplications();
      return { error: null };
    } catch (error: any) {
      toast.error('An unexpected error occurred');
      return { error };
    }
  };

  useEffect(() => {
    if (profile) {
      fetchApplications();
    }
  }, [profile]);

  return {
    applications,
    loading,
    createApplication,
    updateApplication,
    deleteApplication,
    refetch: fetchApplications,
  };
};