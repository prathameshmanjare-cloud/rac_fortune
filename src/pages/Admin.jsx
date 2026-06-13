import { useState } from 'react'
import { Lock, LayoutDashboard, Mail, FileEdit, Settings, LogOut } from 'lucide-react'

import { supabase, hasSupabaseConfig } from '../lib/supabaseClient'
import { useAdminAuth } from '../components/admin/useAdminAuth'
import SubmissionsPanel from '../components/admin/SubmissionsPanel'
import EmailPanel from '../components/admin/EmailPanel'
import ContentPanel from '../components/admin/ContentPanel'
import SettingsPanel from '../components/admin/SettingsPanel'
import Button from '../components/shared/Button'

const TABS = [
  { id: 'submissions', label: 'Submissions', icon: LayoutDashboard },
  { id: 'content', label: 'Content', icon: FileEdit },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'settings', label: 'Settings', icon: Settings },
]

function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const signIn = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    setLoading(false)
  }

  const input = 'w-full px-4 py-3 border border-neutral-dark rounded-lg focus:outline-none focus:border-primary mb-4'

  return (
    <section className="min-h-screen flex items-center justify-center bg-secondary px-4 pt-20">
      <form onSubmit={signIn} className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-card">
        <div className="w-12 h-12 rounded-xl bg-primary-subtle flex items-center justify-center mb-5"><Lock className="w-6 h-6 text-primary" /></div>
        <h1 className="text-2xl font-display text-secondary mb-1">Admin Login</h1>
        <p className="text-secondary-light text-sm mb-6">Sign in to manage your website.</p>
        {!hasSupabaseConfig && <p className="text-red-500 text-sm mb-4">Supabase env vars missing — set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.</p>}
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className={input} autoComplete="username" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className={input} autoComplete="current-password" />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <Button type="submit" variant="primary" className="w-full" disabled={loading}>{loading ? 'Signing in…' : 'Sign In'}</Button>
      </form>
    </section>
  )
}

function Admin() {
  const { user, loading } = useAdminAuth()
  const [tab, setTab] = useState('submissions')
  const [prefillTo, setPrefillTo] = useState('')

  if (loading) {
    return <section className="min-h-screen flex items-center justify-center bg-neutral pt-20"><p className="text-secondary-light">Loading…</p></section>
  }
  if (!user) return <LoginScreen />

  const emailTo = (addr) => { setPrefillTo(addr); setTab('email') }

  return (
    <section className="min-h-screen bg-neutral pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h1 className="text-3xl font-display text-secondary">Website CMS</h1>
          <button onClick={() => supabase.auth.signOut()} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-dark text-secondary text-sm font-semibold hover:bg-white transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-neutral-mid pb-4">
          {TABS.map((t) => {
            const Icon = t.icon
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === t.id ? 'bg-secondary text-white' : 'text-secondary hover:bg-white'}`}
              >
                <Icon className="w-4 h-4" /> {t.label}
              </button>
            )
          })}
        </div>

        {tab === 'submissions' && <SubmissionsPanel onEmail={emailTo} />}
        {tab === 'content' && <ContentPanel />}
        {tab === 'email' && <EmailPanel prefillTo={prefillTo} />}
        {tab === 'settings' && <SettingsPanel user={user} />}
      </div>
    </section>
  )
}

export default Admin
