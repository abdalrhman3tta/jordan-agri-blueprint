-- Phase 1: Complete Database Schema for Agriculture Ministry App

-- Create custom types
CREATE TYPE public.application_status AS ENUM ('pending', 'under_review', 'approved', 'rejected', 'completed');
CREATE TYPE public.application_type AS ENUM ('license', 'permit', 'subsidy', 'certification', 'inspection');
CREATE TYPE public.user_role AS ENUM ('farmer', 'employee', 'admin', 'supervisor');
CREATE TYPE public.leave_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE public.task_status AS ENUM ('todo', 'in_progress', 'completed', 'cancelled');
CREATE TYPE public.priority_level AS ENUM ('low', 'medium', 'high', 'urgent');

-- User profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'farmer',
  department TEXT,
  position TEXT,
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Applications table
CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  application_type application_type NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status application_status NOT NULL DEFAULT 'pending',
  priority priority_level DEFAULT 'medium',
  assigned_to UUID REFERENCES public.profiles(id),
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  rejection_reason TEXT,
  estimated_completion DATE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Documents table for file storage
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  uploaded_by UUID REFERENCES public.profiles(id) NOT NULL,
  is_required BOOLEAN DEFAULT false,
  document_category TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Employee leave requests
CREATE TABLE public.leave_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  leave_type TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_days INTEGER NOT NULL,
  reason TEXT NOT NULL,
  status leave_status NOT NULL DEFAULT 'pending',
  approved_by UUID REFERENCES public.profiles(id),
  approved_at TIMESTAMPTZ,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tasks and assignments
CREATE TABLE public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  assigned_to UUID REFERENCES public.profiles(id) NOT NULL,
  assigned_by UUID REFERENCES public.profiles(id) NOT NULL,
  application_id UUID REFERENCES public.applications(id),
  status task_status NOT NULL DEFAULT 'todo',
  priority priority_level DEFAULT 'medium',
  due_date DATE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Notifications system
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  related_id UUID,
  related_type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- System settings
CREATE TABLE public.system_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES public.profiles(id),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Security definer functions
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID)
RETURNS user_role
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT role FROM public.profiles WHERE user_id = user_uuid;
$$;

CREATE OR REPLACE FUNCTION public.is_admin_or_employee(user_uuid UUID)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT role IN ('admin', 'employee', 'supervisor') FROM public.profiles WHERE user_id = user_uuid;
$$;

-- RLS Policies

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins and employees can view all profiles" ON public.profiles
  FOR SELECT USING (public.is_admin_or_employee(auth.uid()));

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Applications policies
CREATE POLICY "Users can view their own applications" ON public.applications
  FOR SELECT USING (applicant_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Employees can view all applications" ON public.applications
  FOR SELECT USING (public.is_admin_or_employee(auth.uid()));

CREATE POLICY "Users can create applications" ON public.applications
  FOR INSERT WITH CHECK (applicant_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Employees can update applications" ON public.applications
  FOR UPDATE USING (public.is_admin_or_employee(auth.uid()));

-- Documents policies
CREATE POLICY "Users can view their own documents" ON public.documents
  FOR SELECT USING (
    profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()) OR
    application_id IN (SELECT id FROM public.applications WHERE applicant_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())) OR
    public.is_admin_or_employee(auth.uid())
  );

CREATE POLICY "Users can upload documents" ON public.documents
  FOR INSERT WITH CHECK (uploaded_by IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

-- Leave requests policies
CREATE POLICY "Employees can view their own leave requests" ON public.leave_requests
  FOR SELECT USING (employee_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Supervisors can view all leave requests" ON public.leave_requests
  FOR SELECT USING (public.get_user_role(auth.uid()) IN ('admin', 'supervisor'));

CREATE POLICY "Employees can create leave requests" ON public.leave_requests
  FOR INSERT WITH CHECK (employee_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()) AND public.get_user_role(auth.uid()) IN ('employee', 'admin', 'supervisor'));

CREATE POLICY "Supervisors can update leave requests" ON public.leave_requests
  FOR UPDATE USING (public.get_user_role(auth.uid()) IN ('admin', 'supervisor'));

-- Tasks policies
CREATE POLICY "Users can view assigned tasks" ON public.tasks
  FOR SELECT USING (
    assigned_to IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()) OR
    assigned_by IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()) OR
    public.is_admin_or_employee(auth.uid())
  );

CREATE POLICY "Employees can create tasks" ON public.tasks
  FOR INSERT WITH CHECK (
    assigned_by IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()) AND
    public.is_admin_or_employee(auth.uid())
  );

CREATE POLICY "Users can update their assigned tasks" ON public.tasks
  FOR UPDATE USING (
    assigned_to IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()) OR
    (assigned_by IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()) AND public.is_admin_or_employee(auth.uid()))
  );

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT USING (user_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "System can create notifications" ON public.notifications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE USING (user_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

-- System settings policies
CREATE POLICY "Admins can manage system settings" ON public.system_settings
  FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Everyone can view system settings" ON public.system_settings
  FOR SELECT USING (true);

-- Functions and triggers for automatic timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON public.applications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_leave_requests_updated_at BEFORE UPDATE ON public.leave_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON public.tasks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'farmer')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('documents', 'documents', false),
  ('avatars', 'avatars', true);

-- Storage policies
CREATE POLICY "Users can upload their own documents" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'documents' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own documents" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'documents' AND (
      auth.uid()::text = (storage.foldername(name))[1] OR
      public.is_admin_or_employee(auth.uid())
    )
  );

CREATE POLICY "Anyone can upload avatars" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Avatars are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

-- Insert initial system settings
INSERT INTO public.system_settings (key, value, description) VALUES
  ('app_name', '"Agriculture Ministry Portal"', 'Application name'),
  ('maintenance_mode', 'false', 'Enable/disable maintenance mode'),
  ('max_file_size', '10485760', 'Maximum file upload size in bytes (10MB)'),
  ('supported_file_types', '["pdf", "doc", "docx", "jpg", "jpeg", "png"]', 'Supported file types for uploads'),
  ('default_language', '"en"', 'Default application language'),
  ('email_notifications', 'true', 'Enable email notifications');