import { motion } from 'framer-motion'
import { Sparkles, Crown } from 'lucide-react'

import SectionHeader from '../components/shared/SectionHeader'
import { coreTeam, boardOfDirectors } from '../data/placeholder'

// Member card with photo fallback to gradient initials avatar
function MemberCard({ member, index, highlight }) {
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
      className="group bg-white rounded-2xl p-6 text-center shadow-card border border-transparent hover:border-gold hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative w-24 h-24 mx-auto mb-4">
        <div className={`w-full h-full rounded-full overflow-hidden border-4 ${highlight ? 'border-gold' : 'border-neutral-mid group-hover:border-gold'} transition-colors`}>
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
      <h3 className="text-lg font-semibold text-secondary group-hover:text-primary transition-colors">
        {member.name}
      </h3>
      <p className="text-primary text-sm font-semibold mt-0.5">{member.role}</p>
      {member.title !== member.role && (
        <p className="text-secondary-light text-xs mt-1">{member.title}</p>
      )}
    </motion.div>
  )
}

function Team() {
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {coreTeam.map((m, i) => (
              <MemberCard key={`${m.name}-${m.role}`} member={m} index={i} highlight={m.role === 'President'} />
            ))}
          </div>
        </div>
      </section>

      {/* BOARD OF DIRECTORS */}
      <section className="py-16 md:py-24 bg-neutral relative overflow-hidden">
        <div className="absolute inset-0 pattern-maratha opacity-[0.04]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <SectionHeader title="Board of Directors" subtitle="संचालक मंडळ — Avenue Directors" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
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
