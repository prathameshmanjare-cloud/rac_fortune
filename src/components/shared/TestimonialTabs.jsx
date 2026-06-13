import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote } from 'lucide-react'

import { beneficiaryTestimonials, corporateTestimonials } from '../../data/placeholder'

const tabs = [
  { id: 'beneficiary', label: 'Beneficiaries', data: beneficiaryTestimonials },
  { id: 'corporate', label: 'Corporate Partners', data: corporateTestimonials },
]

function TestimonialTabs() {
  const [active, setActive] = useState('beneficiary')
  const activeTab = tabs.find((t) => t.id === active)

  return (
    <div className="max-w-5xl mx-auto">
      {/* Toggle */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex p-1 rounded-full bg-neutral-mid border border-gold/30">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={`relative px-5 sm:px-7 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                active === tab.id ? 'text-white' : 'text-secondary hover:text-primary'
              }`}
            >
              {active === tab.id && (
                <motion.span
                  layoutId="testimonial-pill"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {activeTab.data.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 shadow-card border border-gold/20 hover:border-gold hover:shadow-card-hover transition-all duration-300 flex flex-col"
            >
              <Quote className="w-8 h-8 text-gold/60 mb-4" />
              <blockquote className="text-secondary-mid italic mb-6 flex-1">
                "{t.quote}"
              </blockquote>
              <div className="flex items-center gap-3 pt-4 border-t border-neutral-mid">
                <div className="w-11 h-11 rounded-full bg-gradient-saffron flex items-center justify-center text-white font-bold flex-shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-secondary text-sm">{t.name}</p>
                  <p className="text-primary text-xs font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default TestimonialTabs
