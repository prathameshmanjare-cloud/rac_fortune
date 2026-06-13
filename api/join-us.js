import { getSupabase, getResend, emailShell, methodGuard, requireFields } from './_lib/clients.js'

export default async function handler(req, res) {
  if (!methodGuard(req, res)) return

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {})

    const missing = requireFields(body, ['full_name', 'email', 'phone', 'why_join'])
    if (missing.length) {
      return res.status(400).json({ ok: false, error: `Missing required fields: ${missing.join(', ')}` })
    }

    const record = {
      full_name: body.full_name.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      college_or_organization: body.college_or_organization?.trim() || null,
      why_join: body.why_join.trim(),
      area_of_interest: body.area_of_interest?.trim() || null,
    }

    const supabase = getSupabase()
    const { error: dbError } = await supabase.from('join_us_submissions').insert(record)
    if (dbError) {
      console.error('Supabase insert error:', dbError)
      return res.status(500).json({ ok: false, error: 'Could not save your application. Please try again.' })
    }

    // Email notification (non-fatal if it fails — data is already saved)
    try {
      const resend = getResend()
      await resend.emails.send({
        from: process.env.RESEND_FROM || 'RAC Pune City Fortune <onboarding@resend.dev>',
        to: process.env.NOTIFICATION_EMAIL,
        replyTo: record.email,
        subject: `New Join Us Application — ${record.full_name}`,
        html: emailShell('New Join Us Application', [
          ['Full Name', record.full_name],
          ['Email', record.email],
          ['Phone', record.phone],
          ['College / Organization', record.college_or_organization],
          ['Area of Interest', record.area_of_interest],
          ['Why Join', record.why_join],
        ]),
      })
    } catch (mailErr) {
      console.error('Resend error (non-fatal):', mailErr)
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('join-us handler error:', err)
    return res.status(500).json({ ok: false, error: 'Unexpected server error.' })
  }
}
