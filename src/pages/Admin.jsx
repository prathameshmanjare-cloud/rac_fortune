import { useState } from 'react'
import { Lock, Download, RefreshCw, LogOut } from 'lucide-react'

import Button from '../components/shared/Button'

function toCSV(rows) {
  if (!rows || !rows.length) return ''
  const cols = Object.keys(rows[0])
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const head = cols.join(',')
  const body = rows.map((r) => cols.map((c) => esc(r[c])).join(',')).join('\n')
  return `${head}\n${body}`
}

function downloadCSV(filename, rows) {
  const csv = toCSV(rows)
  if (!csv) return
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function DataTable({ title, rows, filename }) {
  const cols = rows.length ? Object.keys(rows[0]) : []
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h2 className="text-xl font-semibold text-secondary">
          {title} <span className="text-secondary-light text-base font-normal">({rows.length})</span>
        </h2>
        <button
          onClick={() => downloadCSV(filename, rows)}
          disabled={!rows.length}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold/15 border border-gold/40 text-gold-dark text-sm font-semibold hover:bg-gold hover:text-secondary transition-colors disabled:opacity-40"
        >
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-neutral-mid bg-white shadow-card">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-neutral text-left">
              {cols.map((c) => (
                <th key={c} className="px-4 py-3 font-semibold text-secondary whitespace-nowrap capitalize">
                  {c.replace(/_/g, ' ')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td className="px-4 py-6 text-secondary-light" colSpan={cols.length || 1}>No submissions yet.</td></tr>
            ) : (
              rows.map((r, i) => (
                <tr key={r.id || i} className="border-t border-neutral-mid hover:bg-neutral/60">
                  {cols.map((c) => (
                    <td key={c} className="px-4 py-3 text-secondary-mid align-top max-w-xs">
                      {c === 'created_at' ? new Date(r[c]).toLocaleString() : String(r[c] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Admin() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [data, setData] = useState({ joinUs: [], csr: [] })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const load = async (pw) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin-submissions', {
        method: 'POST',
        headers: { 'x-admin-password': pw },
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || !json.ok) throw new Error(json.error || 'Failed to load.')
      setData({ joinUs: json.joinUs || [], csr: json.csr || [] })
      setAuthed(true)
    } catch (err) {
      setError(err.message)
      setAuthed(false)
    } finally {
      setLoading(false)
    }
  }

  if (!authed) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-secondary px-4 pt-20">
        <form
          onSubmit={(e) => { e.preventDefault(); load(password) }}
          className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-card"
        >
          <div className="w-12 h-12 rounded-xl bg-primary-subtle flex items-center justify-center mb-5">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-display text-secondary mb-1">Admin Access</h1>
          <p className="text-secondary-light text-sm mb-6">Enter the admin password to view submissions.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 border border-neutral-dark rounded-lg focus:outline-none focus:border-primary mb-4"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? 'Checking…' : 'Sign In'}
          </Button>
        </form>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-neutral pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <h1 className="text-3xl font-display text-secondary">Submissions Dashboard</h1>
          <div className="flex gap-3">
            <button
              onClick={() => load(password)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-dark text-secondary text-sm font-semibold hover:bg-white transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </button>
            <button
              onClick={() => { setAuthed(false); setPassword(''); setData({ joinUs: [], csr: [] }) }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-dark text-secondary text-sm font-semibold hover:bg-white transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>

        <DataTable title="Join Us Applications" rows={data.joinUs} filename="join_us_submissions.csv" />
        <DataTable title="CSR Partnership Enquiries" rows={data.csr} filename="csr_partnership_submissions.csv" />
      </div>
    </section>
  )
}

export default Admin
