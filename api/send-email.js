import { getSupabase, getResend, methodGuard } from './_lib/clients.js'

// Sends a custom email from the admin dashboard.
// Auth: requires a valid Supabase user JWT in the Authorization header.
export default async function handler(req, res) {
  if (!methodGuard(req, res)) return

  // Verify the caller is a logged-in admin
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
  if (!token) return res.status(401).json({ ok: false, error: 'Not authenticated.' })

  const supabase = getSupabase()
  const { data: userData, error: authErr } = await supabase.auth.getUser(token)
  if (authErr || !userData?.user) {
    return res.status(401).json({ ok: false, error: 'Invalid session.' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {})
    const { to, subject, message } = body
    if (!to || !subject || !message) {
      return res.status(400).json({ ok: false, error: 'to, subject and message are required.' })
    }

    const paragraphs = String(message)
      .split(/\n{2,}/)
      .map((p) => `<p style="margin:0 0 14px;color:#2D2D2D;font-size:15px;line-height:1.6;">${escapeHtml(p).replace(/\n/g, '<br>')}</p>`)
      .join('')

    const html = `<!DOCTYPE html><html><body style="margin:0;background:#FAF6EF;font-family:Arial,sans-serif;">
      <div style="max-width:600px;margin:0 auto;padding:24px;">
        <div style="background:#0B0A0A;border-radius:16px 16px 0 0;padding:26px;border-bottom:4px solid #C9A84C;">
          <div style="color:#FF6B00;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">RAC Pune City Fortune</div>
        </div>
        <div style="background:#fff;border-radius:0 0 16px 16px;padding:28px;border:1px solid #EDE8DF;border-top:none;">
          ${paragraphs}
          <div style="margin-top:20px;padding-top:16px;border-top:1px solid #EDE8DF;">
            <p style="margin:0;color:#C9A84C;font-size:14px;font-weight:700;">Team RAC Pune City Fortune</p>
          </div>
        </div>
      </div></body></html>`

    const resend = getResend()
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM || 'RAC Pune City Fortune <onboarding@resend.dev>',
      to,
      replyTo: process.env.NOTIFICATION_EMAIL,
      subject,
      html,
    })
    if (error) {
      console.error('Resend error:', error)
      return res.status(502).json({ ok: false, error: 'Email provider rejected the message.' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('send-email error:', err)
    return res.status(500).json({ ok: false, error: 'Unexpected server error.' })
  }
}

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
