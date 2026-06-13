import { createClient } from '@supabase/supabase-js'

// Browser client — uses the ANON public key + the logged-in user's session.
// RLS enforces who can do what. NEVER put the service-role key here.
const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const hasSupabaseConfig = Boolean(url && anonKey)

if (!hasSupabaseConfig) {
  // Helps catch missing env during dev/build
  console.warn('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY — admin login + CMS will not work.')
}

// Use harmless placeholders if env is missing so createClient() doesn't throw
// and crash the public site. Real calls are gated behind hasSupabaseConfig.
export const supabase = createClient(
  url || 'https://placeholder.supabase.co',
  anonKey || 'placeholder-anon-key',
  { auth: { persistSession: true, autoRefreshToken: true } },
)
