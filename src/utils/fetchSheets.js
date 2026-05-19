import Papa from 'papaparse'

const CACHE_KEY_PREFIX = 'rac_sheets_'
const CACHE_TTL = 60 * 60 * 1000

export async function fetchFromGoogleSheets(sheetId, sheetGid = 0) {
  const cacheKey = `${CACHE_KEY_PREFIX}${sheetId}_${sheetGid}`

  const cached = localStorage.getItem(cacheKey)
  if (cached) {
    const { data, timestamp } = JSON.parse(cached)
    if (Date.now() - timestamp < CACHE_TTL) {
      return data
    }
  }

  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${sheetGid}`

  try {
    const response = await fetch(url)
    const text = await response.text()

    const result = Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
    })

    const data = result.data.map((row) => {
      const processed = {}
      Object.keys(row).forEach((key) => {
        processed[key.toLowerCase().replace(/\s+/g, '_')] = row[key]
      })
      return processed
    })

    localStorage.setItem(cacheKey, JSON.stringify({
      data,
      timestamp: Date.now(),
    }))

    return data
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error)
    throw error
  }
}

export async function fetchProjects(sheetId = 'placeholder') {
  if (sheetId === 'placeholder') {
    return getPlaceholderProjects()
  }
  return fetchFromGoogleSheets(sheetId, 0)
}

export async function fetchEvents(sheetId = 'placeholder') {
  if (sheetId === 'placeholder') {
    return getPlaceholderEvents()
  }
  return fetchFromGoogleSheets(sheetId, 0)
}

function getPlaceholderProjects() {
  return [
    {
      id: '1',
      project_name: 'Udaan',
      avenue: 'Education',
      description: 'Providing quality education and learning materials to underprivileged children in Pune.',
      impact_stat: '500+ Students',
      date: 'Ongoing',
      cover_image_url: '',
      status: 'active',
    },
    {
      id: '2',
      project_name: 'Arogya',
      avenue: 'Health',
      description: 'Free health check-ups and medical aid for rural communities in Pune district.',
      impact_stat: '2000+ Beneficiaries',
      date: 'Ongoing',
      cover_image_url: '',
      status: 'active',
    },
  ]
}

function getPlaceholderEvents() {
  return [
    {
      id: '1',
      event_name: 'Annual Gala 2025',
      date: '2025-04-15',
      venue: 'JW Marriott, Pune',
      type: 'Fundraiser',
      description: 'Join us for an evening of celebration and impact.',
      registration_form_url: '',
      youtube_url: '',
      status: 'upcoming',
    },
  ]
}