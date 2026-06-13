import { useState } from 'react'
import { KeyRound, CheckCircle2, AlertCircle } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'

function SettingsPanel({ user }) {
  const [pw, setPw] = useState('')
  const [pw2, setPw2] = useState('')
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  const change = async (e) => {
    e.preventDefault()
    if (pw.length < 8) return setStatus({ state: 'error', message: 'Password must be at least 8 characters.' })
    if (pw !== pw2) return setStatus({ state: 'error', message: 'Passwords do not match.' })
    setStatus({ state: 'saving', message: '' })
    const { error } = await supabase.auth.updateUser({ password: pw })
    if (error) return setStatus({ state: 'error', message: error.message })
    setStatus({ state: 'success', message: 'Password updated.' })
    setPw(''); setPw2('')
  }

  const input = 'w-full px-4 py-3 border border-neutral-dark rounded-lg focus:outline-none focus:border-primary'

  return (
    <div className="max-w-md">
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-card border border-neutral-mid mb-6">
        <h3 className="text-lg font-semibold text-secondary mb-1">Account</h3>
        <p className="text-sm text-secondary-light">Signed in as <span className="font-medium text-secondary">{user?.email}</span></p>
      </div>

      <form onSubmit={change} className="bg-white rounded-2xl p-6 md:p-8 shadow-card border border-neutral-mid space-y-5">
        <h3 className="text-lg font-semibold text-secondary flex items-center gap-2"><KeyRound className="w-5 h-5 text-primary" /> Change Password</h3>
        <div>
          <label className="block text-sm font-medium text-secondary mb-1.5">New password</label>
          <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} className={input} placeholder="At least 8 characters" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary mb-1.5">Confirm new password</label>
          <input type="password" value={pw2} onChange={(e) => setPw2(e.target.value)} className={input} />
        </div>
        {status.state === 'success' && <div className="flex items-center gap-2 text-green-700 text-sm"><CheckCircle2 className="w-5 h-5" /> {status.message}</div>}
        {status.state === 'error' && <div className="flex items-center gap-2 text-red-600 text-sm"><AlertCircle className="w-5 h-5" /> {status.message}</div>}
        <button type="submit" disabled={status.state === 'saving'} className="px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50">
          {status.state === 'saving' ? 'Saving…' : 'Update Password'}
        </button>
      </form>
    </div>
  )
}

export default SettingsPanel
