# Rotaract Club of Pune City Fortune

A production-ready, fully responsive website for the Rotaract Club of Pune City Fortune, built with React 18, Vite, Tailwind CSS, Framer Motion, and GSAP.

## 🌐 Live Website

[Add your deployed URL here]

## 🛠️ Tech Stack

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS v3 with custom theme
- **Animations:** Framer Motion + GSAP + ScrollTrigger
- **Icons:** Lucide React
- **Forms:** React Hook Form
- **Data:** PapaParse for Google Sheets integration
- **Charts:** Recharts

## 🎨 Design System

### Colors

| Name | Hex | Usage |
|------|-----|-------|
| Primary | `#FF6B00` | Saffron - CTAs, accents |
| Secondary | `#0B0A0A` | Deep Black - Dark sections |
| Gold | `#C9A84C` | Royal Gold - Accents, borders |
| Neutral | `#FAF6EF` | Ivory Parchment - Light backgrounds |

### Typography

**Font:** Montserrat (Google Fonts) — All text uses Montserrat only.

- Display/Hero: `Montserrat 800`
- Section Headings: `Montserrat 700`
- Card Headings: `Montserrat 600`
- Body: `Montserrat 400`

### Theme: "Swaraj"

Inspired by Chhatrapati Shivaji Maharaj's values fused with modern youth energy.

- Hero sections: Diagonal saffron-to-black gradient
- Dark sections: `#0B0A0A` with gold accents
- Geometric Maratha-inspired CSS patterns
- Devanagari/Marathi decorative phrases

## 📱 Responsive Breakpoints

- `xs`: 375px — iPhone SE / small phones
- `sm`: 640px — large phones
- `md`: 768px — tablets portrait
- `lg`: 1024px — tablets landscape
- `xl`: 1280px — laptops
- `2xl`: 1536px — standard desktops
- `3xl`: 1920px — full HD / big screens

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/rac-pune-city-fortune.git
cd rac-pune-city-fortune

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder.

## 📄 Google Sheets Configuration

### Required Columns

**Projects Sheet:**
```
id | project_name | avenue | description | impact_stat | date | cover_image_url | status
```

**Events Sheet:**
```
id | event_name | date | venue | type | description | cover_image | registration_form_url | youtube_url | status
```

### Setup

1. Create a Google Sheet with the required columns
2. Go to File → Share → Publish to Web
3. Select CSV format
4. Copy the sheet ID from the URL
5. Update the `fetchProjects()` and `fetchEvents()` functions in `src/utils/fetchSheets.js`

## 📝 Google Forms Configuration

### Join Us Form

1. Create a Google Form for membership applications
2. Copy the form ID from the URL
3. Update the form embed in the JoinUs component

### Event Registration

1. Create Google Forms for each event
2. Add the form URL to the events data
3. Update the registration button link

## 🔗 Social Links

Update these in the Footer component:

- Instagram: `@rac_punecity_fortune`
- LinkedIn: `rac-punecity-fortune`
- YouTube: `@RotaractClubofPuneCityFortune`

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── PageTransition.jsx
│   ├── home/
│   │   ├── Hero.jsx
│   │   ├── StatsCounter.jsx
│   │   ├── AboutSnapshot.jsx
│   │   ├── FeaturedProjects.jsx
│   │   ├── InstagramGrid.jsx
│   │   ├── YouTubeFeature.jsx
│   │   ├── Testimonials.jsx
│   │   └── CSRCallout.jsx
│   ├── shared/
│   │   ├── Button.jsx
│   │   ├── SectionHeader.jsx
│   │   └── AnimatedCounter.jsx
│   └── about/
│       ├── ValueCards.jsx
│       └── MilestoneTimeline.jsx
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Projects.jsx
│   ├── Events.jsx
│   ├── JoinUs.jsx
│   ├── Partner.jsx
│   ├── Gallery.jsx
│   └── Contact.jsx
├── utils/
│   └── fetchSheets.js
├── data/
│   └── placeholder.js
└── styles/
    └── globals.css
```

## ✨ Features

- ✅ Mobile-first responsive design
- ✅ GSAP text reveal animations
- ✅ Framer Motion page transitions
- ✅ Animated counter statistics
- ✅ Project filtering
- ✅ Image lightbox gallery
- ✅ Video gallery
- ✅ Event countdown timer
- ✅ FAQ accordion
- ✅ Contact form with validation
- ✅ CSR enquiry form
- ✅ Google Sheets data integration
- ✅ prefers-reduced-motion support

## 📜 License

This project is for the Rotaract Club of Pune City Fortune.

---

Built with ❤️ by the RAC Pune City Fortune team

*सेवा. नेतृत्व. पराक्रम.*