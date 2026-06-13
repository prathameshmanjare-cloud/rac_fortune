import { useContext, useMemo, useState } from 'react'
import { Plus, Trash2, Save, RotateCcw, CheckCircle2, AlertCircle } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'
import { ContentContext, CONTENT_DEFAULTS } from '../../context/ContentContext'
import ImageField from './ImageField'

// Field schemas per content section. `t` = type (text|number|textarea)
const SECTIONS = {
  impact_stats: {
    label: 'Impact Stats',
    fields: [
      { k: 'value', t: 'number' }, { k: 'prefix' }, { k: 'suffix' },
      { k: 'label' }, { k: 'marathi' },
      { k: 'icon', hint: 'HeartHandshake | IndianRupee | Trees | Clock | CheckCircle2' },
    ],
    blank: { value: 0, prefix: '', suffix: '+', label: '', marathi: '', icon: 'CheckCircle2' },
  },
  featured_projects: {
    label: 'Featured Projects',
    fields: [
      { k: 'name' }, { k: 'avenue', hint: 'Education | Health | Community | Environment' },
      { k: 'location' }, { k: 'description', t: 'textarea' }, { k: 'impact' },
      { k: 'image', t: 'image' },
    ],
    blank: { name: '', avenue: 'Community', location: '', description: '', impact: '', image: '' },
  },
  core_team: {
    label: 'Core Team',
    fields: [
      { k: 'name' }, { k: 'role' }, { k: 'title' },
      { k: 'thought', t: 'textarea', hint: 'Shown on card back' },
      { k: 'photo', t: 'image' },
    ],
    blank: { name: '', role: '', title: '', thought: '', photo: null },
  },
  board_of_directors: {
    label: 'Board of Directors',
    fields: [
      { k: 'name' }, { k: 'role' }, { k: 'title' },
      { k: 'thought', t: 'textarea', hint: 'Shown on card back' },
      { k: 'photo', t: 'image' },
    ],
    blank: { name: '', role: '', title: '', thought: '', photo: null },
  },
  beneficiary_testimonials: {
    label: 'Beneficiary Testimonials',
    fields: [{ k: 'name' }, { k: 'role' }, { k: 'quote', t: 'textarea' }],
    blank: { name: '', role: '', quote: '' },
  },
  corporate_testimonials: {
    label: 'Corporate Testimonials',
    fields: [{ k: 'name' }, { k: 'role' }, { k: 'quote', t: 'textarea' }],
    blank: { name: '', role: '', quote: '' },
  },
  corporate_partners: {
    label: 'Corporate Partners',
    fields: [{ k: 'name' }, { k: 'logo', t: 'image' }],
    blank: { name: '', logo: null },
  },
}

function ContentPanel() {
  const { content, refresh } = useContext(ContentContext)
  const [activeKey, setActiveKey] = useState('impact_stats')
  const section = SECTIONS[activeKey]

  // local editable copy, re-init when section changes
  const initial = useMemo(() => JSON.parse(JSON.stringify(content[activeKey] || [])), [activeKey, content])
  const [items, setItems] = useState(initial)
  const [dirtyKey, setDirtyKey] = useState(activeKey)
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  // reset local copy if user switched section
  if (dirtyKey !== activeKey) { setItems(initial); setDirtyKey(activeKey); setStatus({ state: 'idle', message: '' }) }

  const update = (i, k, v) => setItems((prev) => prev.map((it, idx) => idx === i ? { ...it, [k]: v } : it))
  const addItem = () => setItems((prev) => [...prev, { ...section.blank }])
  const removeItem = (i) => setItems((prev) => prev.filter((_, idx) => idx !== i))

  const save = async () => {
    setStatus({ state: 'saving', message: '' })
    const { error } = await supabase.from('site_content').upsert({ key: activeKey, value: items }, { onConflict: 'key' })
    if (error) return setStatus({ state: 'error', message: error.message })
    await refresh()
    setStatus({ state: 'success', message: 'Saved. Live site updated.' })
  }

  const resetDefault = async () => {
    if (!confirm('Reset this section to the original built-in content?')) return
    setStatus({ state: 'saving', message: '' })
    const { error } = await supabase.from('site_content').upsert({ key: activeKey, value: CONTENT_DEFAULTS[activeKey] }, { onConflict: 'key' })
    if (error) return setStatus({ state: 'error', message: error.message })
    await refresh()
    setItems(JSON.parse(JSON.stringify(CONTENT_DEFAULTS[activeKey])))
    setStatus({ state: 'success', message: 'Reset to defaults.' })
  }

  const inputCls = 'w-full px-3 py-2 text-sm border border-neutral-dark rounded-lg focus:outline-none focus:border-primary'

  return (
    <div>
      {/* Section tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(SECTIONS).map(([key, s]) => (
          <button
            key={key}
            onClick={() => setActiveKey(key)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${activeKey === key ? 'bg-primary text-white' : 'bg-white border border-neutral-mid text-secondary hover:border-gold'}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h3 className="text-lg font-semibold text-secondary">{section.label} <span className="text-secondary-light font-normal">({items.length})</span></h3>
        <div className="flex gap-2">
          <button onClick={addItem} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold/15 border border-gold/40 text-gold-dark text-sm font-semibold hover:bg-gold hover:text-secondary"><Plus className="w-4 h-4" /> Add</button>
          <button onClick={resetDefault} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-dark text-secondary text-sm font-semibold hover:bg-white"><RotateCcw className="w-4 h-4" /> Reset</button>
          <button onClick={save} disabled={status.state === 'saving'} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark disabled:opacity-50"><Save className="w-4 h-4" /> {status.state === 'saving' ? 'Saving…' : 'Save'}</button>
        </div>
      </div>

      {status.state === 'success' && <div className="flex items-center gap-2 text-green-700 text-sm mb-4"><CheckCircle2 className="w-5 h-5" /> {status.message}</div>}
      {status.state === 'error' && <div className="flex items-center gap-2 text-red-600 text-sm mb-4"><AlertCircle className="w-5 h-5" /> {status.message}</div>}

      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-neutral-mid shadow-card">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-semibold text-secondary-muted">#{i + 1}</span>
              <button onClick={() => removeItem(i)} className="p-1.5 rounded text-red-500 hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {section.fields.map((f) => (
                <div key={f.k} className={f.t === 'textarea' || f.t === 'image' ? 'sm:col-span-2' : ''}>
                  <label className="block text-xs font-medium text-secondary mb-1 capitalize">{f.k.replace(/_/g, ' ')}</label>
                  {f.t === 'image' ? (
                    <ImageField value={item[f.k]} folder={activeKey} onChange={(v) => update(i, f.k, v)} />
                  ) : f.t === 'textarea' ? (
                    <textarea rows={2} className={inputCls} value={item[f.k] ?? ''} onChange={(e) => update(i, f.k, e.target.value)} />
                  ) : (
                    <input
                      type={f.t === 'number' ? 'number' : 'text'}
                      className={inputCls}
                      value={item[f.k] ?? ''}
                      onChange={(e) => update(i, f.k, f.t === 'number' ? Number(e.target.value) : e.target.value)}
                    />
                  )}
                  {f.hint && <p className="text-[10px] text-secondary-muted mt-0.5">{f.hint}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-secondary-light text-sm">No items. Click “Add” to create one.</p>}
      </div>
    </div>
  )
}

export default ContentPanel
