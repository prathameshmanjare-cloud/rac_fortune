import { useEffect, useState } from 'react'
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'

function EmailPanel({ prefillTo }) {
  const [to, setTo] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  useEffect(() => { if (prefillTo) setTo(prefillTo) }, [prefillTo])

  const send = async (e) => {
    e.preventDefault()
    setStatus({ state: 'sending', message: '' })
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token}` },
        body: JSON.stringify({ to, subject, message }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || !json.ok) throw new Error(json.error || 'Failed to send.')
      setStatus({ state: 'success', message: `Email sent to ${to}.` })
      setSubject(''); setMessage('')
    } catch (err) {
      setStatus({ state: 'error', message: err.message })
    }
  }

  const input = 'w-full px-4 py-3 border border-neutral-dark rounded-lg focus:outline-none focus:border-primary'
  const sending = status.state === 'sending'

  return (
    <form onSubmit={send} className="max-w-2xl bg-white rounded-2xl p-6 md:p-8 shadow-card border border-neutral-mid space-y-5">
      <h3 className="text-lg font-semibold text-secondary">Compose Email</h3>
      <div>
        <label className="block text-sm font-medium text-secondary mb-1.5">To</label>
        <input type="email" value={to} onChange={(e) => setTo(e.target.value)} required className={input} placeholder="recipient@email.com" />
      </div>
      <div>
        <label className="block text-sm font-medium text-secondary mb-1.5">Subject</label>
        <input value={subject} onChange={(e) => setSubject(e.target.value)} required className={input} placeholder="Subject line" />
      </div>
      <div>
        <label className="block text-sm font-medium text-secondary mb-1.5">Message</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={8} className={input} placeholder="Write your message… (blank line = new paragraph)" />
      </div>
      {status.state === 'success' && <div className="flex items-center gap-2 text-green-700 text-sm"><CheckCircle2 className="w-5 h-5" /> {status.message}</div>}
      {status.state === 'error' && <div className="flex items-center gap-2 text-red-600 text-sm"><AlertCircle className="w-5 h-5" /> {status.message}</div>}
      <button type="submit" disabled={sending} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50">
        <Send className="w-4 h-4" /> {sending ? 'Sending…' : 'Send Email'}
      </button>
      <p className="text-xs text-secondary-muted">Sent from your verified domain. Replies go to {`{NOTIFICATION_EMAIL}`}.</p>
    </form>
  )
}

export default EmailPanel
