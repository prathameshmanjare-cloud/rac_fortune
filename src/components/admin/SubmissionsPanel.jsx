import { useEffect, useState } from 'react'
import { Download, RefreshCw, Trash2, Mail } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'

function toCSV(rows) {
  if (!rows?.length) return ''
  const cols = Object.keys(rows[0])
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
  return [cols.join(','), ...rows.map((r) => cols.map((c) => esc(r[c])).join(','))].join('\n')
}

function downloadCSV(filename, rows) {
  const csv = toCSV(rows)
  if (!csv) return
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
  const a = document.createElement('a')
  a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}

function Table({ title, rows, filename, table, onDelete, onEmail }) {
  const cols = rows.length ? Object.keys(rows[0]) : []
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h3 className="text-lg font-semibold text-secondary">
          {title} <span className="text-secondary-light font-normal">({rows.length})</span>
        </h3>
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
                <th key={c} className="px-4 py-3 font-semibold text-secondary whitespace-nowrap capitalize">{c.replace(/_/g, ' ')}</th>
              ))}
              <th className="px-4 py-3 font-semibold text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td className="px-4 py-6 text-secondary-light" colSpan={cols.length + 1}>No submissions yet.</td></tr>
            ) : rows.map((r) => (
              <tr key={r.id} className="border-t border-neutral-mid hover:bg-neutral/60">
                {cols.map((c) => (
                  <td key={c} className="px-4 py-3 text-secondary-mid align-top max-w-xs">
                    {c === 'created_at' ? new Date(r[c]).toLocaleString() : String(r[c] ?? '—')}
                  </td>
                ))}
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button onClick={() => onEmail(r.email)} title="Email" className="p-1.5 rounded text-primary hover:bg-primary-subtle"><Mail className="w-4 h-4" /></button>
                    <button onClick={() => onDelete(table, r.id)} title="Delete" className="p-1.5 rounded text-red-500 hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SubmissionsPanel({ onEmail }) {
  const [joinUs, setJoinUs] = useState([])
  const [csr, setCsr] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true); setError('')
    const [j, c] = await Promise.all([
      supabase.from('join_us_submissions').select('*').order('created_at', { ascending: false }),
      supabase.from('csr_partnership_submissions').select('*').order('created_at', { ascending: false }),
    ])
    if (j.error || c.error) setError((j.error || c.error).message)
    setJoinUs(j.data || []); setCsr(c.data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (table, id) => {
    if (!confirm('Delete this submission permanently?')) return
    const { error } = await supabase.from(table).delete().eq('id', id)
    if (error) { alert(error.message); return }
    load()
  }

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button onClick={load} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-dark text-secondary text-sm font-semibold hover:bg-white transition-colors">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <Table title="Join Us Applications" rows={joinUs} filename="join_us_submissions.csv" table="join_us_submissions" onDelete={handleDelete} onEmail={onEmail} />
      <Table title="CSR Partnership Enquiries" rows={csr} filename="csr_partnership_submissions.csv" table="csr_partnership_submissions" onDelete={handleDelete} onEmail={onEmail} />
    </div>
  )
}

export default SubmissionsPanel
