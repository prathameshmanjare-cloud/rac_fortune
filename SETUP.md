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

## Field → column mapping

**Join Us:** full_name, email, phone, college_or_organization, why_join, area_of_interest
**CSR:** company_name, contact_person, designation, email, phone, csr_budget_range, area_of_interest, message
