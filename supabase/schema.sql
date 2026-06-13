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

-- Authenticated admins can delete submissions
drop policy if exists "authenticated can delete join_us" on public.join_us_submissions;
create policy "authenticated can delete join_us"
  on public.join_us_submissions for delete to authenticated using (true);

drop policy if exists "authenticated can delete csr" on public.csr_partnership_submissions;
create policy "authenticated can delete csr"
  on public.csr_partnership_submissions for delete to authenticated using (true);

-- ============================================================
-- CMS content store
-- One row per editable section, value is JSON (object or array).
-- Public site reads it (anon SELECT); only authenticated admins write.
-- ============================================================
create table if not exists public.site_content (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

drop policy if exists "anyone can read site_content" on public.site_content;
create policy "anyone can read site_content"
  on public.site_content for select to anon, authenticated using (true);

drop policy if exists "authenticated can write site_content" on public.site_content;
create policy "authenticated can write site_content"
  on public.site_content for all to authenticated using (true) with check (true);

-- keep updated_at fresh
create or replace function public.touch_site_content() returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

drop trigger if exists trg_touch_site_content on public.site_content;
create trigger trg_touch_site_content
  before update on public.site_content
  for each row execute function public.touch_site_content();

-- ============================================================
-- Storage: public "media" bucket for CMS image uploads
-- (team photos, project images, partner logos)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

-- Public can read files; authenticated admins can upload/update/delete.
drop policy if exists "public read media" on storage.objects;
create policy "public read media"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'media');

drop policy if exists "auth upload media" on storage.objects;
create policy "auth upload media"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'media');

drop policy if exists "auth update media" on storage.objects;
create policy "auth update media"
  on storage.objects for update to authenticated
  using (bucket_id = 'media') with check (bucket_id = 'media');

drop policy if exists "auth delete media" on storage.objects;
create policy "auth delete media"
  on storage.objects for delete to authenticated
  using (bucket_id = 'media');
