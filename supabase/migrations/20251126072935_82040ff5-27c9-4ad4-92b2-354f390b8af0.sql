-- Create enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'client');

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Migrate existing roles from profiles to user_roles
INSERT INTO public.user_roles (user_id, role)
SELECT id, 
  CASE 
    WHEN role = 'admin' THEN 'admin'::app_role
    ELSE 'client'::app_role
  END
FROM public.profiles
WHERE role IS NOT NULL
ON CONFLICT (user_id, role) DO NOTHING;

-- Create security definer function to check roles (prevents recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

-- Create function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = _user_id
  LIMIT 1;
$$;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Update all dependent policies to use has_role function instead of profiles.role

-- Update chat_messages policies
DROP POLICY IF EXISTS "Users can view their own messages" ON public.chat_messages;
CREATE POLICY "Users can view their own messages"
  ON public.chat_messages
  FOR SELECT
  USING (sender_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- Update license_domains policies
DROP POLICY IF EXISTS "Clients can view domains for their licenses" ON public.license_domains;
CREATE POLICY "Clients can view domains for their licenses"
  ON public.license_domains
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM licenses l
      JOIN client_projects cp ON l.client_project_id = cp.id
      JOIN clients c ON cp.client_id = c.id
      WHERE l.id = license_domains.license_id 
        AND c.user_id = auth.uid()
    ) 
    OR public.has_role(auth.uid(), 'admin')
  );

-- Update license_events policies
DROP POLICY IF EXISTS "Clients can view events for their licenses" ON public.license_events;
CREATE POLICY "Clients can view events for their licenses"
  ON public.license_events
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM licenses l
      JOIN client_projects cp ON l.client_project_id = cp.id
      JOIN clients c ON cp.client_id = c.id
      WHERE l.id = license_events.license_id 
        AND c.user_id = auth.uid()
    ) 
    OR public.has_role(auth.uid(), 'admin')
  );

-- Update header_announcements policies
DROP POLICY IF EXISTS "Anyone can view enabled announcements" ON public.header_announcements;
CREATE POLICY "Anyone can view enabled announcements"
  ON public.header_announcements
  FOR SELECT
  USING (enabled = true OR public.has_role(auth.uid(), 'admin'));

-- Update storage policies for project images
DROP POLICY IF EXISTS "Admins can upload project images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update project images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete project images" ON storage.objects;

CREATE POLICY "Admins can upload project images"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update project images"
  ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete project images"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));

-- Update storage policies for project files
DROP POLICY IF EXISTS "Clients can view their project files" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload project files" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update project files" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete project files" ON storage.objects;

CREATE POLICY "Clients can view their project files"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'project-files' AND (
      EXISTS (
        SELECT 1
        FROM client_projects cp
        JOIN clients c ON cp.client_id = c.id
        WHERE c.user_id = auth.uid()
          AND (storage.foldername(name))[1] = cp.id::text
      )
      OR public.has_role(auth.uid(), 'admin')
    )
  );

CREATE POLICY "Admins can upload project files"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'project-files' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update project files"
  ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'project-files' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete project files"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'project-files' AND public.has_role(auth.uid(), 'admin'));

-- Update activity_logs policies
DROP POLICY IF EXISTS "Admins can view all activity logs" ON public.activity_logs;
CREATE POLICY "Admins can view all activity logs"
  ON public.activity_logs
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Update announcements policies
DROP POLICY IF EXISTS "Admins can manage announcements" ON public.announcements;
CREATE POLICY "Admins can manage announcements"
  ON public.announcements
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Update billing policies
DROP POLICY IF EXISTS "Admins can view all billing" ON public.billing;
DROP POLICY IF EXISTS "Admins can manage billing" ON public.billing;

CREATE POLICY "Admins can view all billing"
  ON public.billing
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage billing"
  ON public.billing
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Update portfolio policies
DROP POLICY IF EXISTS "Anyone can view featured portfolio items" ON public.portfolio;
DROP POLICY IF EXISTS "Admins can manage portfolio" ON public.portfolio;

CREATE POLICY "Anyone can view featured portfolio items"
  ON public.portfolio
  FOR SELECT
  USING (featured = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage portfolio"
  ON public.portfolio
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Update settings policies
DROP POLICY IF EXISTS "Admins can manage settings" ON public.settings;
CREATE POLICY "Admins can manage settings"
  ON public.settings
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Update support_tickets policies
DROP POLICY IF EXISTS "Admins can view all tickets" ON public.support_tickets;
DROP POLICY IF EXISTS "Admins can manage tickets" ON public.support_tickets;

CREATE POLICY "Admins can view all tickets"
  ON public.support_tickets
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage tickets"
  ON public.support_tickets
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Update ticket_messages policies
DROP POLICY IF EXISTS "Ticket participants can view messages" ON public.ticket_messages;
DROP POLICY IF EXISTS "Ticket participants can send messages" ON public.ticket_messages;

CREATE POLICY "Ticket participants can view messages"
  ON public.ticket_messages
  FOR SELECT
  USING (
    public.has_role(auth.uid(), 'admin') 
    OR EXISTS (
      SELECT 1
      FROM support_tickets st
      JOIN clients c ON c.id = st.client_id
      WHERE st.id = ticket_messages.ticket_id 
        AND c.user_id = auth.uid()
    )
  );

CREATE POLICY "Ticket participants can send messages"
  ON public.ticket_messages
  FOR INSERT
  WITH CHECK (
    public.has_role(auth.uid(), 'admin') 
    OR EXISTS (
      SELECT 1
      FROM support_tickets st
      JOIN clients c ON c.id = st.client_id
      WHERE st.id = ticket_messages.ticket_id 
        AND c.user_id = auth.uid()
    )
  );

-- Update downloads policies
DROP POLICY IF EXISTS "Admins can view all downloads" ON public.downloads;
CREATE POLICY "Admins can view all downloads"
  ON public.downloads
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Now safe to drop the role column from profiles
ALTER TABLE public.profiles DROP COLUMN IF EXISTS role CASCADE;

-- Update profiles table policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;

CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all profiles"
  ON public.profiles
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- Update trigger to assign default client role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  
  -- Assign default client role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'client');
  
  RETURN new;
END;
$$;

-- Add username and country fields to profiles if not exists
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS username TEXT UNIQUE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS country TEXT;