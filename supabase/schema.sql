-- ============================================================
-- RAC Pune City Fortune — Form submissions schema
-- Run in Supabase Dashboard → SQL Editor → New query → Run
-- ============================================================

-- ---------- Join Us applications ----------
create table if not exists public.join_us_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text not null,
  college_or_organization text,
  why_join text not null,
  area_of_interest text
);

-- ---------- CSR partnership enquiries ----------
create table if not exists public.csr_partnership_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  company_name text not null,
  contact_person text not null,
  designation text,
  email text not null,
  phone text not null,
  csr_budget_range text,
  area_of_interest text,
  message text
);

-- ============================================================
-- Row Level Security
-- The service_role key (used only server-side in API routes)
-- BYPASSES RLS entirely, so it can always insert + read.
-- We add an explicit anon INSERT policy as a safety net in case
-- you ever switch the API to the anon key. Reads stay locked.
-- ============================================================

alter table public.join_us_submissions enable row level security;
alter table public.csr_partnership_submissions enable row level security;

-- Allow anonymous INSERTs (form submissions)
drop policy if exists "anon can insert join_us" on public.join_us_submissions;
create policy "anon can insert join_us"
  on public.join_us_submissions
  for insert
  to anon
  with check (true);

drop policy if exists "anon can insert csr" on public.csr_partnership_submissions;
create policy "anon can insert csr"
  on public.csr_partnership_submissions
  for insert
  to anon
  with check (true);

-- Allow SELECT only to authenticated users (Supabase Auth dashboard users).
-- service_role bypasses RLS and can always read.
-- No policy is granted to anon for SELECT/UPDATE/DELETE → those are denied.
drop policy if exists "authenticated can read join_us" on public.join_us_submissions;
create policy "authenticated can read join_us"
  on public.join_us_submissions
  for select
  to authenticated
  using (true);

drop policy if exists "authenticated can read csr" on public.csr_partnership_submissions;
create policy "authenticated can read csr"
  on public.csr_partnership_submissions
  for select
  to authenticated
  using (true);
