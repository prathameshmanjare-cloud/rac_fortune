import { motion } from 'framer-motion'
import { Award, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

import { recognitions } from '../../data/placeholder'

function RecognitionStrip() {
  return (
    <section className="py-12 md:py-16 bg-white border-y border-neutral-mid">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <p className="text-center text-secondary-light text-xs font-semibold uppercase tracking-[0.2em] mb-8">
          Recognition · Certifications · Transparency
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {recognitions.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3 justify-center"
            >
              <Award className="w-8 h-8 text-gold flex-shrink-0" />
              <div className="text-left">
                <div className="text-secondary font-semibold text-sm">{r.label}</div>
                <div className="text-secondary-muted text-xs">{r.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center">
          <Link
            to="/partner#resources"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
          >
            <ShieldCheck className="w-4 h-4" /> View our financial reports & transparency commitment
          </Link>
        </div>
      </div>
    </section>
  )
}

export default RecognitionStrip
