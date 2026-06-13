import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HeartHandshake, IndianRupee, Trees, Clock, CheckCircle2 } from 'lucide-react'

import AnimatedCounter from '../shared/AnimatedCounter'
import SectionHeader from '../shared/SectionHeader'
import { useContent } from '../../context/ContentContext'

gsap.registerPlugin(ScrollTrigger)

const iconMap = { HeartHandshake, IndianRupee, Trees, Clock, CheckCircle2 }

function StatsCounter() {
  const impactStats = useContent('impact_stats')
  const gridRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion || !gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.stat-card')
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        }
      )
    }, gridRef)
    return () => ctx.revert()
  }, [shouldReduceMotion])

  return (
    <section id="stats" className="py-16 md:py-24 bg-neutral relative overflow-hidden">
      <div className="absolute inset-0 pattern-maratha opacity-[0.04]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <SectionHeader title="Our Impact in Numbers" subtitle="परिणाम — Measurable Change" />
        <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {impactStats.map((stat) => {
            const Icon = iconMap[stat.icon]
            return (
              <div
                key={stat.id}
                className="stat-card group bg-white p-6 rounded-2xl shadow-card border border-transparent hover:border-gold hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-subtle flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors">
                  {Icon && <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />}
                </div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-display text-primary">
                  <AnimatedCounter end={stat.value} prefix={stat.prefix || ''} suffix={stat.suffix} />
                </div>
                <div className="h-0.5 w-10 bg-gold mx-auto my-2.5" />
                <div className="text-xs md:text-sm text-secondary font-semibold">{stat.label}</div>
                <div className="text-[11px] text-gold font-marathi">{stat.marathi}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default StatsCounter
