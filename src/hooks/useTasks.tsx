import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface Task {
  id: string;
  title: string;
  description?: string;
  assigned_to: string;
  assigned_by: string;
  application_id?: string;
  status: 'todo' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  due_date?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
  assigned_user?: {
    full_name: string;
    email: string;
    department?: string;
    position?: string;
  };
  assigner?: {
    full_name: string;
    email: string;
  };
  application?: {
    title: string;
    application_type: string;
  };
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { profile } = useAuth();

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const query = supabase
        .from('tasks')
        .select(`
          *,
          assigned_user:profiles!tasks_assigned_to_fkey(full_name, email, department, position),
          assigner:profiles!tasks_assigned_by_fkey(full_name, email),
          application:applications(title, application_type)
        `)
        .order('created_at', { ascending: false });

      const { data, error } = await query;

      if (error) {
        toast.error('Failed to fetch tasks');
        console.error('Error fetching tasks:', error);
        return;
      }

      setTasks(data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData: {
    title: string;
    description?: string;
    assigned_to: string;
    application_id?: string;
    priority?: Task['priority'];
    due_date?: string;
  }) => {
    try {
      if (!profile) throw new Error('No profile found');
      if (!['employee', 'admin', 'supervisor'].includes(profile.role)) {
        throw new Error('Only employees can create tasks');
      }

      const { data, error } = await supabase
        .from('tasks')
        .insert([
          {
            assigned_by: profile.id,
            ...taskData,
          },
        ])
        .select()
        .single();

      if (error) {
        toast.error('Failed to create task');
        console.error('Error creating task:', error);
        return { error };
      }

      toast.success('Task created successfully!');
      await fetchTasks();
      return { data, error: null };
    } catch (error: any) {
      toast.error(error.message || 'An unexpected error occurred');
      return { error };
    }
  };

  const updateTask = async (
    id: string,
    updates: Partial<Task>
  ) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        toast.error('Failed to update task');
        console.error('Error updating task:', error);
        return { error };
      }

      toast.success('Task updated successfully!');
      await fetchTasks();
      return { data, error: null };
    } catch (error: any) {
      toast.error('An unexpected error occurred');
      return { error };
    }
  };

  const completeTask = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        toast.error('Failed to complete task');
        console.error('Error completing task:', error);
        return { error };
      }

      toast.success('Task completed successfully!');
      await fetchTasks();
      return { data, error: null };
    } catch (error: any) {
      toast.error('An unexpected error occurred');
      return { error };
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) {
        toast.error('Failed to delete task');
        console.error('Error deleting task:', error);
        return { error };
      }

      toast.success('Task deleted successfully!');
      await fetchTasks();
      return { error: null };
    } catch (error: any) {
      toast.error('An unexpected error occurred');
      return { error };
    }
  };

  useEffect(() => {
    if (profile) {
      fetchTasks();
    }
  }, [profile]);

  return {
    tasks,
    loading,
    createTask,
    updateTask,
    completeTask,
    deleteTask,
    refetch: fetchTasks,
  };
};