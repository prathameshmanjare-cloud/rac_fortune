# Form Backend Setup — Supabase + Resend + Vercel

Two forms (**Join Us**, **CSR Partnership**) now POST to Vercel serverless functions
that save to Supabase and email a notification via Resend. There's also a password-gated
`/admin` dashboard with CSV export.

```
api/
  _lib/clients.js        # shared Supabase + Resend clients, email template
  join-us.js             # POST /api/join-us
  csr-partnership.js     # POST /api/csr-partnership
  admin-submissions.js   # POST /api/admin-submissions (password-gated read)
supabase/schema.sql      # run this in Supabase
src/pages/Admin.jsx      # /admin dashboard
```

---

## 1. Supabase

1. Go to <https://supabase.com> → **Start your project** → sign in with GitHub.
2. **New project** → name it, pick a region near Pune (e.g. Mumbai / ap-south-1), set a DB password, **Create**.
3. Left sidebar → **SQL Editor** → **New query** → paste all of [`supabase/schema.sql`](supabase/schema.sql) → **Run**.
   - Creates `join_us_submissions` + `csr_partnership_submissions`, enables RLS, adds policies
     (anon can INSERT, only authenticated/service_role can SELECT).
4. **Project Settings** (gear) → **API**. Copy:
   - **Project URL** → `SUPABASE_URL`
   - **Project API keys → `service_role`** (click reveal) → `SUPABASE_SERVICE_ROLE_KEY`
     ⚠️ This key bypasses RLS. Server-side only. Never put it in frontend code or commit it.

> The frontend never talks to Supabase directly — only the serverless functions do,
> using the service role key. So the anon key isn't needed by this setup.

---

## 2. Resend

1. Go to <https://resend.com> → sign up (free tier: 3,000 emails/mo, 100/day).
2. **API Keys** → **Create API Key** → copy → `RESEND_API_KEY`.
3. Sending address:
   - **Quick test:** leave `RESEND_FROM` unset — code defaults to `onboarding@resend.dev`.
     On the free shared domain you can only send to *your own* verified Resend account email.
   - **Production:** **Domains** → **Add Domain** → enter e.g. `racpunecityfortune.org` →
     add the shown DNS records (TXT/MX/DKIM) at your domain registrar → wait for **Verified** →
     set `RESEND_FROM="RAC Pune City Fortune <noreply@racpunecityfortune.org>"`.
4. `NOTIFICATION_EMAIL` = where you want to receive submissions (e.g. `info@racpunecityfortune.org`).

---

## 3. Environment variables

| Variable | Used by | Notes |
|---|---|---|
| `SUPABASE_URL` | all api routes | Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | all api routes | **secret** |
| `RESEND_API_KEY` | join-us, csr | **secret** |
| `RESEND_FROM` | join-us, csr | optional; verified-domain sender |
| `NOTIFICATION_EMAIL` | join-us, csr | inbox for alerts |
| `ADMIN_PASSWORD` | admin-submissions | password for `/admin` |

### Vercel
Project → **Settings → Environment Variables** → add each (Production + Preview + Development) → **Save** → redeploy.

### Local dev
1. `cp .env.local.example .env.local` and fill values. (`.env.local` is gitignored.)
2. `npm i -g vercel` then `vercel dev` — runs Vite **and** the `/api` functions together on one port.
   - Plain `npm run dev` (Vite alone) will NOT serve `/api` — forms will 404. Use `vercel dev`.

---

## 4. Admin dashboard

- Visit `/admin`, enter `ADMIN_PASSWORD`.
- Shows both tables newest-first, **Export CSV** per table, Refresh, Sign Out.
- Auth is a simple server-side password check. For stronger auth, switch to Supabase Auth later.

---

## 5. Test checklist

- [ ] `supabase/schema.sql` ran without errors (Table Editor shows both tables).
- [ ] `vercel dev` locally → submit Join Us form → success message → row in Supabase → email received.
- [ ] Submit CSR form → same.
- [ ] `/admin` loads with password, lists rows, CSV exports.
- [ ] Deployed to Vercel with all env vars set.

---

# Admin CMS (Supabase Auth)

`/admin` is now a full dashboard: **Submissions · Content · Email · Settings**, gated by
Supabase Auth (real email+password login, password change built in).

## One-time setup

1. **Run the updated schema** — re-run [`supabase/schema.sql`](supabase/schema.sql) in the SQL Editor.
   Adds `site_content` (CMS store), delete policies, and public-read policy.
2. **Add the anon key** — Supabase → Settings → API → copy **anon public** key. Put in `.env.local`:
   ```
   VITE_SUPABASE_URL='https://gfosfpzwnaialvffooda.supabase.co'
   VITE_SUPABASE_ANON_KEY='<anon public key>'
   ```
   Also add both in **Vercel → Settings → Environment Variables**.
   ⚠️ `VITE_*` vars are baked at **build time** — set them in Vercel *before* redeploying.
3. **Create your admin user** — Supabase → Authentication → Users → **Add user** →
   enter your email + password → enable **Auto Confirm User**. That's your `/admin` login.
   (Add more users the same way; anyone with an account is an admin.)
4. Restart `vercel dev`, go to `/admin`, sign in.

## What each tab does

- **Submissions** — Join Us + CSR entries (read live from Supabase), delete, export CSV,
  ✉️ icon jumps to Email pre-filled with that person's address.
- **Content** — edit site sections (Impact Stats, Featured Projects, Core Team, Board,
  Testimonials, Corporate Partners). Add/remove/edit items → **Save** → live site updates.
  **Reset** restores the original built-in content. Stored as JSON in `site_content`;
  the public site falls back to `placeholder.js` defaults if a section was never edited.
- **Email** — compose + send an email to anyone via Resend (uses your verified domain).
- **Settings** — shows your account, lets you change your password.

## How content flows

`src/context/ContentContext.jsx` fetches `site_content` on load, merges over defaults, and
exposes `useContent('<key>')`. Wired components: StatsCounter, FeaturedProjects, Team,
TestimonialTabs, Partner (partners + impact band). To make a new section editable: add a
default to `CONTENT_DEFAULTS`, a schema entry in `ContentPanel.jsx`, and `useContent` in the component.

> The old `/api/admin-submissions.js` (env-password read) is now unused — Submissions read
> directly via the logged-in session + RLS. Safe to delete.

---

## Field → column mapping

**Join Us:** full_name, email, phone, college_or_organization, why_join, area_of_interest
**CSR:** company_name, contact_person, designation, email, phone, csr_budget_range, area_of_interest, message
