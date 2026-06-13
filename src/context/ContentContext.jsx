import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, hasSupabaseConfig } from '../lib/supabaseClient'
import {
  impactStats, beneficiaryTestimonials, corporateTestimonials,
  corporatePartners, coreTeam, boardOfDirectors,
} from '../data/placeholder'

// Featured projects default (mirrors FeaturedProjects.jsx originals)
const featuredProjectsDefault = [
  { id: 1, name: 'Daan Utsav', avenue: 'Education', location: 'Pune, MH', description: 'Empowering underprivileged children with quality education and learning materials.', impact: '2000+ Students Per Year', image: '/images/photos/community/daanutsav.jpg' },
  { id: 2, name: 'Arogya', avenue: 'Health', location: 'Pune District', description: 'Free health check-ups and medical aid for rural communities in Pune district.', impact: '2000+ Beneficiaries', image: '/images/photos/community/arogya.png' },
  { id: 3, name: 'Anokhi Bhaubijee', avenue: 'Community', location: 'Pune, MH', description: 'Women empowerment initiative providing skills and employment.', impact: '300+ Women', image: '/images/photos/community/anokibhaubij.jpg' },
]

// Every editable section: key -> default value. CMS rows override these.
export const CONTENT_DEFAULTS = {
  impact_stats: impactStats,
  featured_projects: featuredProjectsDefault,
  core_team: coreTeam,
  board_of_directors: boardOfDirectors,
  beneficiary_testimonials: beneficiaryTestimonials,
  corporate_testimonials: corporateTestimonials,
  corporate_partners: corporatePartners,
}

export const ContentContext = createContext({ content: CONTENT_DEFAULTS, loading: true, refresh: () => {} })

export function ContentProvider({ children }) {
  const [overrides, setOverrides] = useState({})
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    if (!hasSupabaseConfig) { setLoading(false); return }
    try {
      const { data, error } = await supabase.from('site_content').select('key, value')
      if (error) throw error
      const map = {}
      ;(data || []).forEach((row) => { map[row.key] = row.value })
      setOverrides(map)
    } catch (e) {
      console.warn('Content fetch failed, using defaults:', e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { refresh() }, [])

  // Merge: a non-empty CMS value wins, else default
  const content = {}
  Object.keys(CONTENT_DEFAULTS).forEach((k) => {
    const ov = overrides[k]
    content[k] = ov && (Array.isArray(ov) ? ov.length : Object.keys(ov).length) ? ov : CONTENT_DEFAULTS[k]
  })

  return (
    <ContentContext.Provider value={{ content, loading, refresh }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent(key) {
  const { content } = useContext(ContentContext)
  return key ? content[key] : content
}
