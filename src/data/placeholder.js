export const clubInfo = {
  name: 'Rotaract Club of Pune City Fortune',
  tagline: 'सेवा. नेतृत्व. पराक्रम.',
  subtagline: 'Carrying the Legacy of Swarajya',
  description: 'Rotaract Club of Pune City Fortune is a dynamic youth organization under Rotary International District 3131, rooted in the timeless values of Chhatrapati Shivaji Maharaj — Swarajya, Seva, and Parakram. We are young leaders, aged 18–30, from Pune, committed to community service, professional excellence, and making Swarajya a living reality in our city.',
  founded: '2018',
  district: '3131',
  zone: '5',
  location: 'Pune, Maharashtra, India',
  email: 'info@racpunecityfortune.org',
  phone: '+91 99999 99999',
}

export const stats = {
  members: 80,
  projects: 50,
  livesImpacted: 5000,
  yearsOfService: 8,
}

export const socialLinks = {
  instagram: 'https://instagram.com/rac_punecity_fortune',
  linkedin: 'https://linkedin.com/company/rac-punecity-fortune',
  youtube: 'https://youtube.com/@RotaractClubofPuneCityFortune',
}

export const avenues = [
  { name: 'Community Service', color: '#FF6B00' },
  { name: 'Professional Dev', color: '#C9A84C' },
  { name: 'Club Service', color: '#0B0A0A' },
  { name: 'International', color: '#2D2D2D' },
  { name: 'DEI', color: '#5A5A5A' },
]

export const shivajiValues = [
  { marathi: 'स्वराज्य', english: 'Leadership & Autonomy' },
  { marathi: 'सेवा', english: 'Community Projects' },
  { marathi: 'पराक्रम', english: 'Courage & Bold Action' },
  { marathi: 'न्याय', english: 'DEI & Equal Opportunity' },
  { marathi: 'धैर्य', english: 'Resilience' },
  { marathi: 'नीति', english: 'Ethics & Integrity' },
]

export const milestones = [
  { year: '2018', title: 'Club Founded' },
  { year: '2019', title: 'First Major Project' },
  { year: '2020', title: 'COVID Relief' },
  { year: '2021', title: 'Growth Phase' },
  { year: '2022', title: 'Sakhi Initiative' },
  { year: '2023', title: 'District Recognition' },
  { year: '2024', title: '8 Years Strong' },
]

export const projects = [
  {
    id: 1,
    name: 'Udaan',
    avenue: 'Education',
    description: 'Empowering underprivileged children with quality education and learning materials.',
    impact: '500+ Students',
  },
  {
    id: 2,
    name: 'Arogya',
    avenue: 'Health',
    description: 'Free health check-ups and medical aid for rural communities in Pune district.',
    impact: '2000+ Beneficiaries',
  },
  {
    id: 3,
    name: 'Sakhi',
    avenue: 'Community',
    description: 'Women empowerment initiative providing skill development and employment.',
    impact: '300+ Women',
  },
]

export const events = [
  {
    id: 1,
    name: 'Annual Gala 2025',
    date: '2025-04-15',
    venue: 'JW Marriott, Pune',
    type: 'Fundraiser',
  },
]

export const boardMembers = [
  { name: 'President', role: 'President', bio: 'Leading the club vision and strategy' },
  { name: 'IPP', role: 'Immediate Past President', bio: 'Past leadership and guidance' },
  { name: 'Secretary', role: 'Secretary', bio: 'Club operations and communications' },
  { name: 'Treasurer', role: 'Treasurer', bio: 'Financial management and reporting' },
]

// ============================================================
// CSR / CORPORATE PARTNERSHIP DATA
// PLACEHOLDER - replace with real figures, partners & documents
// ============================================================

// Headline impact metrics — used on Hero overlay + Stats section
// PLACEHOLDER - replace with audited numbers
export const impactStats = [
  { id: 'lives', value: 5000, suffix: '+', label: 'Lives Impacted', marathi: 'जीवने', icon: 'HeartHandshake' },
  { id: 'funds', value: 25, prefix: '₹', suffix: 'L+', label: 'Funds Utilised', marathi: 'निधी', icon: 'IndianRupee' },
  { id: 'trees', value: 3000, suffix: '+', label: 'Trees Planted', marathi: 'वृक्ष', icon: 'Trees' },
  { id: 'hours', value: 12000, suffix: '+', label: 'Volunteer Hours', marathi: 'सेवा तास', icon: 'Clock' },
  { id: 'projects', value: 50, suffix: '+', label: 'Projects Completed', marathi: 'प्रकल्प', icon: 'CheckCircle2' },
]

// Trust signals shown in the CSR hero banner
// PLACEHOLDER - replace registration numbers with real ones
export const trustSignals = [
  { label: 'Rotary International', value: 'District 3131 Affiliated' },
  { label: 'Registration No.', value: 'PLACEHOLDER-REG-0000' },
  { label: '80G / 12A', value: 'Tax-Exempt Donations*' },
  { label: 'Transparency', value: 'Audited Annual Reports' },
]

// CSR focus areas grid
export const csrFocusAreas = [
  { icon: 'GraduationCap', title: 'Education', description: 'Learning material, scholarships & digital literacy for underprivileged students.' },
  { icon: 'Stethoscope', title: 'Health', description: 'Free medical camps, blood donation drives & preventive healthcare.' },
  { icon: 'Leaf', title: 'Environment', description: 'Tree plantation, waste management & water conservation drives.' },
  { icon: 'Briefcase', title: 'Skill Development', description: 'Vocational training & employability programs for youth and women.' },
  { icon: 'Users', title: 'Women Empowerment', description: 'Self-reliance, financial literacy & entrepreneurship for women.' },
  { icon: 'HandHeart', title: 'Community Welfare', description: 'Disaster relief, food drives & support for the elderly and differently-abled.' },
]

// How CSR funds are utilised — Recharts pie data
// PLACEHOLDER - replace with real allocation %
export const fundUtilisation = [
  { name: 'Program Delivery', value: 70, color: '#FF6B00' },
  { name: 'Beneficiary Support', value: 15, color: '#C9A84C' },
  { name: 'Operations & Logistics', value: 10, color: '#2D2D2D' },
  { name: 'Monitoring & Reporting', value: 5, color: '#9A9A9A' },
]

// Year-on-year funds raised — Recharts bar data
// PLACEHOLDER - replace with real figures (in ₹ Lakhs)
export const fundsByYear = [
  { year: '2021', amount: 4 },
  { year: '2022', amount: 7 },
  { year: '2023', amount: 12 },
  { year: '2024', amount: 18 },
  { year: '2025', amount: 25 },
]

// Downloadable resources
// PLACEHOLDER - replace href with real PDF paths in /public
export const csrResources = [
  { title: 'Annual Report 2024-25', description: 'Full impact, financials & audited statements.', href: '#', size: 'PDF · 4.2 MB' },
  { title: 'CSR Partnership Brochure', description: 'Programs, focus areas & engagement models.', href: '#', size: 'PDF · 2.1 MB' },
  { title: 'Project Portfolio Deck', description: 'Flagship projects with outcomes & reach.', href: '#', size: 'PDF · 6.8 MB' },
]

// Past corporate partners — logo showcase
// PLACEHOLDER - replace name/logo with real partners
export const corporatePartners = [
  { name: 'Acme Corp', logo: null },
  { name: 'Lumen Industries', logo: null },
  { name: 'Sahyadri Tech', logo: null },
  { name: 'Pune Motors', logo: null },
  { name: 'Veda Pharma', logo: null },
  { name: 'Trinetra Infra', logo: null },
  { name: 'Maval Finserv', logo: null },
  { name: 'Sahaja Foods', logo: null },
]

// CSR partnership engagement models (replaces vanity "tiers")
export const csrModels = [
  {
    name: 'Project Sponsor',
    range: '₹50K – ₹1L',
    description: 'Fund a focused community project end-to-end.',
    features: ['Logo on project collateral', 'Social media recognition', 'Impact summary report', 'Annual report mention'],
  },
  {
    name: 'Program Partner',
    range: '₹1L – ₹3L',
    description: 'Co-power a year-long thematic program.',
    features: ['All Sponsor benefits', 'Co-branded program identity', 'Employee volunteering days', 'Quarterly impact reviews'],
    featured: true,
  },
  {
    name: 'Strategic CSR Partner',
    range: '₹3L+',
    description: 'Multi-year strategic social impact partnership.',
    features: ['All Program benefits', 'Named flagship initiative', 'Dedicated impact dashboard', 'Joint PR & media coverage'],
  },
]

// Testimonials — split by audience for tabbed UI
export const beneficiaryTestimonials = [
  {
    id: 1,
    name: 'Sunita Kamble',
    role: 'Parent · Udaan Beneficiary',
    quote: 'My daughter now has books, a tutor and a dream. This club changed what our family thought was possible.',
  },
  {
    id: 2,
    name: 'Ramesh Pawar',
    role: 'Arogya Health Camp',
    quote: 'The free medical camp caught my condition early. I am healthy today because volunteers came to our village.',
  },
  {
    id: 3,
    name: 'Anjali Shinde',
    role: 'Sakhi Skill Program',
    quote: 'I learnt tailoring and now run a small business. For the first time, I earn my own income.',
  },
]

export const corporateTestimonials = [
  {
    id: 1,
    name: 'Priya Nair',
    role: 'Head of CSR, Lumen Industries', // PLACEHOLDER
    quote: 'Transparent reporting and on-ground execution made our CSR spend genuinely accountable. A trustworthy partner.',
  },
  {
    id: 2,
    name: 'Vikram Deshpande',
    role: 'MD, Sahyadri Tech', // PLACEHOLDER
    quote: 'Their professionalism rivals any NGO we have funded. Clear metrics, real impact, zero ambiguity on fund usage.',
  },
  {
    id: 3,
    name: 'Neha Joshi',
    role: 'CSR Lead, Veda Pharma', // PLACEHOLDER
    quote: 'Employee volunteering days with the club were the highlight of our CSR calendar. Energetic, organised, impactful.',
  },
]

// Recognition & certifications strip
export const recognitions = [
  { label: 'Rotary International', sub: 'District 3131' },
  { label: 'Best Club Award', sub: 'District Recognition 2023' },
  { label: '80G Certified', sub: 'Tax-Exempt*' },
  { label: '8+ Years', sub: 'Of Verified Service' },
]

// ============================================================
// TEAM — Core Team & Board of Directors (2024-25)
// PLACEHOLDER - add photos to /public/images/team/ and set `photo`
// ============================================================
export const coreTeam = [
  { name: 'Rtr. Piyusha', role: 'IPP', title: 'Immediate Past President', photo: null },
  { name: 'Rtr. Prathamesh', role: 'President', title: 'President', photo: null },
  { name: 'Rtr. Purva', role: 'Vice-President', title: 'Vice-President', photo: null },
  { name: 'Rtr. Miheeka', role: 'Secretary', title: 'Secretary', photo: null },
  { name: 'Rtr. Vidhi', role: 'Joint Secretary', title: 'Joint Secretary', photo: null },
  { name: 'Rtr. Sanjyot', role: 'Treasurer', title: 'Treasurer', photo: null },
  { name: 'Rtr. Omkar', role: 'Financial Advisor', title: 'Financial Advisor', photo: null },
]

export const boardOfDirectors = [
  { name: 'To Be Announced', role: 'CMD + DEI', title: 'Club Master Director & DEI', photo: null }, // PLACEHOLDER - name pending
  { name: 'Rtr. Vidhi', role: 'PDD', title: 'Professional Development Director', photo: null },
  { name: 'Rtr. Neel', role: 'CSD', title: 'Community Service Director', photo: null },
  { name: 'Rtr. Anuj', role: 'ISD', title: 'International Service Director', photo: null },
  { name: 'Rtr. Harshal', role: 'Co-ISD', title: 'Co-International Service Director', photo: null },
  { name: 'Rtr. Darshana', role: 'Editor', title: 'Editor', photo: null },
  { name: 'Rtr. Digvijay', role: 'PRO', title: 'Public Relations Officer', photo: null },
  { name: 'Rtr. Neel', role: 'Co-PRO', title: 'Co-Public Relations Officer', photo: null },
  { name: 'Rtr. Anuj', role: 'WRWC', title: 'WRWC', photo: null },
  { name: 'Rtr. Vaibhav', role: 'RRRO + IRRO', title: 'RRRO & IRRO', photo: null },
  { name: 'Rtr. Jayesh', role: 'SAA', title: 'Sergeant-at-Arms', photo: null },
]

// CSR enquiry form options
export const csrBudgetRanges = ['Under ₹50,000', '₹50,000 – ₹1 Lakh', '₹1 – 3 Lakh', '₹3 – 5 Lakh', '₹5 Lakh+']
export const csrInterestAreas = ['Education', 'Health', 'Environment', 'Skill Development', 'Women Empowerment', 'Community Welfare', 'Multiple / Not Sure']