import { getSupabase, methodGuard } from './_lib/clients.js'

// Returns both tables' rows. Gated by ADMIN_PASSWORD env var.
// Password sent in `x-admin-password` header (over HTTPS on Vercel).
export default async function handler(req, res) {
  if (!methodGuard(req, res)) return

  const expected = process.env.ADMIN_PASSWORD
  if (!expected) {
    return res.status(500).json({ ok: false, error: 'ADMIN_PASSWORD not configured.' })
  }

  const provided = req.headers['x-admin-password']
  if (provided !== expected) {
    return res.status(401).json({ ok: false, error: 'Invalid password.' })
  }

  try {
    const supabase = getSupabase()
    const [joinRes, csrRes] = await Promise.all([
      supabase.from('join_us_submissions').select('*').order('created_at', { ascending: false }),
      supabase.from('csr_partnership_submissions').select('*').order('created_at', { ascending: false }),
    ])

    if (joinRes.error || csrRes.error) {
      console.error(joinRes.error || csrRes.error)
      return res.status(500).json({ ok: false, error: 'Failed to load submissions.' })
    }

    return res.status(200).json({
      ok: true,
      joinUs: joinRes.data,
      csr: csrRes.data,
    })
  } catch (err) {
    console.error('admin-submissions error:', err)
    return res.status(500).json({ ok: false, error: 'Unexpected server error.' })
  }
}
