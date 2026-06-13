import { getSupabase, getResend, emailShell, methodGuard, requireFields } from './_lib/clients.js'

export default async function handler(req, res) {
  if (!methodGuard(req, res)) return

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {})

    const missing = requireFields(body, ['company_name', 'contact_person', 'email', 'phone'])
    if (missing.length) {
      return res.status(400).json({ ok: false, error: `Missing required fields: ${missing.join(', ')}` })
    }

    const record = {
      company_name: body.company_name.trim(),
      contact_person: body.contact_person.trim(),
      designation: body.designation?.trim() || null,
      email: body.email.trim(),
      phone: body.phone.trim(),
      csr_budget_range: body.csr_budget_range?.trim() || null,
      area_of_interest: body.area_of_interest?.trim() || null,
      message: body.message?.trim() || null,
    }

    const supabase = getSupabase()
    const { error: dbError } = await supabase.from('csr_partnership_submissions').insert(record)
    if (dbError) {
      console.error('Supabase insert error:', dbError)
      return res.status(500).json({ ok: false, error: 'Could not save your enquiry. Please try again.' })
    }

    try {
      const resend = getResend()
      await resend.emails.send({
        from: process.env.RESEND_FROM || 'RAC Pune City Fortune <onboarding@resend.dev>',
        to: process.env.NOTIFICATION_EMAIL,
        replyTo: record.email,
        subject: `New CSR Partnership Enquiry — ${record.company_name}`,
        html: emailShell('New CSR Partnership Enquiry', [
          ['Company Name', record.company_name],
          ['Contact Person', record.contact_person],
          ['Designation', record.designation],
          ['Email', record.email],
          ['Phone', record.phone],
          ['CSR Budget Range', record.csr_budget_range],
          ['Area of Interest', record.area_of_interest],
          ['Message', record.message],
        ]),
      })
    } catch (mailErr) {
      console.error('Resend error (non-fatal):', mailErr)
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('csr-partnership handler error:', err)
    return res.status(500).json({ ok: false, error: 'Unexpected server error.' })
  }
}
