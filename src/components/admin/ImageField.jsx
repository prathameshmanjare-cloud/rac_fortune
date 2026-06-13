import { useRef, useState } from 'react'
import { Upload, X, Loader2 } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'

const BUCKET = 'media'

// Upload an image from device to Supabase Storage, store the public URL.
function ImageField({ value, onChange, folder = 'misc' }) {
  const inputRef = useRef(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const pick = () => inputRef.current?.click()

  const upload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setBusy(true); setError('')
    try {
      const ext = file.name.split('.').pop()
      const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
      const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, file, {
        cacheControl: '3600', upsert: false, contentType: file.type,
      })
      if (upErr) throw upErr
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
      onChange(data.publicUrl)
    } catch (err) {
      setError(err.message || 'Upload failed')
    } finally {
      setBusy(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-lg overflow-hidden bg-neutral border border-neutral-mid flex items-center justify-center flex-shrink-0">
          {value ? <img src={value} alt="" className="w-full h-full object-cover" /> : <span className="text-[10px] text-secondary-muted">none</span>}
        </div>
        <input ref={inputRef} type="file" accept="image/*" onChange={upload} className="hidden" />
        <button type="button" onClick={pick} disabled={busy} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-dark text-secondary text-sm font-semibold hover:bg-neutral disabled:opacity-50">
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />} {busy ? 'Uploading…' : 'Upload'}
        </button>
        {value && (
          <button type="button" onClick={() => onChange(null)} title="Remove" className="p-2 rounded text-red-500 hover:bg-red-50"><X className="w-4 h-4" /></button>
        )}
      </div>
      {/* Manual URL/path fallback */}
      <input
        type="text"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value || null)}
        placeholder="…or paste an image URL / path"
        className="w-full mt-2 px-3 py-2 text-xs border border-neutral-dark rounded-lg focus:outline-none focus:border-primary"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

export default ImageField
