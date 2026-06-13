import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Crown, Quote } from 'lucide-react'

import SectionHeader from '../components/shared/SectionHeader'
import { useContent } from '../context/ContentContext'

// Flip card: front = photo + name + role, back = title + thought.
// Flips on hover (desktop) and on tap (touch).
function MemberCard({ member, index, highlight, className = '' }) {
  const [flipped, setFlipped] = useState(false)
  const initials = member.name
    .replace(/^Rtr\.?\s*/i, '')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 6) * 0.06 }}
      className={`group perspective h-64 sm:h-72 cursor-pointer ${className}`}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d group-hover:rotate-y-180 ${flipped ? 'rotate-y-180' : ''}`}
      >
        {/* FRONT */}
        <div className="absolute inset-0 backface-hidden bg-white rounded-2xl p-6 text-center shadow-card border border-gold/20 flex flex-col items-center justify-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className={`w-full h-full rounded-full overflow-hidden border-4 ${highlight ? 'border-gold' : 'border-neutral-mid'}`}>
              {member.photo ? (
                <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-saffron flex items-center justify-center text-white text-2xl font-display">
                  {initials}
                </div>
              )}
            </div>
            {highlight && (
              <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gold flex items-center justify-center">
                <Crown className="w-4 h-4 text-secondary" />
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-secondary">{member.name}</h3>
          <p className="text-primary text-sm font-semibold mt-0.5">{member.role}</p>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-secondary rounded-2xl p-6 text-center shadow-card-hover border border-gold/40 flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 pattern-maratha opacity-10" />
          <div className="relative">
            <p className="text-gold font-semibold text-sm mb-1">{member.name}</p>
            <p className="text-white/60 text-xs mb-4">{member.title}</p>
            <Quote className="w-6 h-6 text-gold/50 mx-auto mb-2" />
            <p className="text-white/90 text-sm italic leading-relaxed line-clamp-5">
              {member.thought || 'Serving with Swarajya, Seva and Parakram.'}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Split a flat list into rows of the given sizes; leftovers go in a final row.
function chunkByCounts(items, counts) {
  const rows = []
  let i = 0
  for (const c of counts) {
    if (i >= items.length) break
    rows.push(items.slice(i, i + c))
    i += c
  }
  if (i < items.length) rows.push(items.slice(i))
  return rows
}

function Team() {
  const coreTeam = useContent('core_team')
  const boardOfDirectors = useContent('board_of_directors')
  return (
    <>
      {/* HERO */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-24 bg-secondary overflow-hidden">
        <div className="absolute inset-0 pattern-maratha opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-secondary" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-semibold tracking-wide uppercase mb-6">
              <Sparkles className="w-4 h-4" /> Leadership 2024-25
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-4">
              Meet the <span className="text-gold">Team</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl font-marathi">
              नेतृत्व — The People Driving Our Mission
            </p>
          </motion.div>
        </div>
      </section>

      {/* CORE TEAM */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pattern-fort opacity-[0.04]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <SectionHeader title="Core Team" subtitle="मुख्य संघ — Office Bearers" />
          <div className="space-y-5 md:space-y-6">
            {chunkByCounts(coreTeam, [2, 3, 3]).map((row, ri) => (
              <div key={ri} className="flex flex-wrap justify-center gap-5 md:gap-6">
                {row.map((m, i) => (
                  <MemberCard
                    key={`${m.name}-${m.role}`}
                    member={m}
                    index={i}
                    highlight={m.role === 'President'}
                    className="w-[calc(50%-0.625rem)] sm:w-56"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOARD OF DIRECTORS */}
      <section className="py-16 md:py-24 bg-neutral relative overflow-hidden">
        <div className="absolute inset-0 pattern-maratha opacity-[0.04]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <SectionHeader title="Board of Directors" subtitle="संचालक मंडळ — Avenue Directors" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-5 md:gap-6">
            {boardOfDirectors.map((m, i) => (
              <MemberCard key={`${m.name}-${m.role}`} member={m} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Team
