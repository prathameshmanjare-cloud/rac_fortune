import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

// Tracks the Supabase auth session for the admin area.
export function useAdminAuth() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  return { session, loading, user: session?.user ?? null }
}
