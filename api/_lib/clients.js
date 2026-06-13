// Shared server-side clients + helpers for Vercel serverless functions.
// NEVER import this from frontend code — it uses the service role key.
import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

// Local dev (`vercel dev`) doesn't always inject .env.local into the function
// runtime. Load it explicitly. In production the file is absent → no-op, and
// dotenv never overrides variables Vercel already set, so this is safe.
config({ path: '.env.local' })
config() // also pick up plain .env if present

export function getSupabase() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY')
  return createClient(url, key, { auth: { persistSession: false } })
}

export function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('Missing RESEND_API_KEY')
  return new Resend(key)
}

// Brand-styled HTML email wrapper
export function emailShell(title, rows) {
  const rowHtml = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 16px;border-bottom:1px solid #EDE8DF;font-weight:600;color:#0B0A0A;width:38%;vertical-align:top;">${label}</td>
        <td style="padding:10px 16px;border-bottom:1px solid #EDE8DF;color:#2D2D2D;white-space:pre-wrap;">${escapeHtml(value || '—')}</td>
      </tr>`
    )
    .join('')

  return `<!DOCTYPE html>
<html>
<body style="margin:0;background:#FAF6EF;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px;">
    <div style="background:#0B0A0A;border-radius:16px 16px 0 0;padding:28px 24px;border-bottom:4px solid #C9A84C;">
      <div style="color:#FF6B00;font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">RAC Pune City Fortune</div>
      <div style="color:#ffffff;font-size:22px;font-weight:800;margin-top:6px;">${escapeHtml(title)}</div>
    </div>
    <div style="background:#ffffff;border-radius:0 0 16px 16px;padding:8px 0 16px;border:1px solid #EDE8DF;border-top:none;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">${rowHtml}</table>
    </div>
    <p style="color:#9A9A9A;font-size:12px;text-align:center;margin-top:18px;">
      Automated notification · Driving Social Change Through Youth Leadership
    </p>
  </div>
</body>
</html>`
}

// Branded acknowledgement email sent TO the applicant / partner
export function thankYouEmail({ name, title, intro, paragraphs = [] }) {
  const body = paragraphs
    .map((p) => `<p style="margin:0 0 14px;color:#2D2D2D;font-size:15px;line-height:1.6;">${p}</p>`)
    .join('')

  return `<!DOCTYPE html>
<html>
<body style="margin:0;background:#FAF6EF;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px;">
    <div style="background:#0B0A0A;border-radius:16px 16px 0 0;padding:30px 28px;border-bottom:4px solid #C9A84C;">
      <div style="color:#FF6B00;font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">RAC Pune City Fortune</div>
      <div style="color:#ffffff;font-size:24px;font-weight:800;margin-top:8px;">${escapeHtml(title)}</div>
    </div>
    <div style="background:#ffffff;border-radius:0 0 16px 16px;padding:28px;border:1px solid #EDE8DF;border-top:none;">
      <p style="margin:0 0 16px;color:#0B0A0A;font-size:16px;font-weight:600;">Dear ${escapeHtml(name)},</p>
      <p style="margin:0 0 14px;color:#2D2D2D;font-size:15px;line-height:1.6;">${escapeHtml(intro)}</p>
      ${body}
      <div style="margin-top:22px;padding-top:18px;border-top:1px solid #EDE8DF;">
        <p style="margin:0;color:#0B0A0A;font-size:14px;font-weight:600;">Warm regards,</p>
        <p style="margin:4px 0 0;color:#C9A84C;font-size:14px;font-weight:700;">Team RAC Pune City Fortune</p>
        <p style="margin:2px 0 0;color:#9A9A9A;font-size:12px;">Driving Social Change Through Youth Leadership</p>
      </div>
    </div>
  </div>
</body>
</html>`
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Tiny shared request guards
export function methodGuard(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' })
    return false
  }
  return true
}

export function requireFields(body, fields) {
  const missing = fields.filter((f) => !body?.[f] || String(body[f]).trim() === '')
  return missing
}
