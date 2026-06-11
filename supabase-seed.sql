-- Run this in your Supabase SQL editor to set up the courses table

-- Create the courses table
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null check (progress >= 0 and progress <= 100),
  icon_name text not null default 'BookOpen',
  created_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.courses enable row level security;

-- Allow anonymous read (for the dashboard)
create policy "Allow anonymous read"
  on public.courses
  for select
  to anon
  using (true);

-- Seed data: 4 example courses
insert into public.courses (title, progress, icon_name) values
  ('Advanced React Patterns', 75, 'Code2'),
  ('Machine Learning Fundamentals', 42, 'Brain'),
  ('Database Design & SQL', 91, 'Database'),
  ('TypeScript Deep Dive', 28, 'Terminal');
