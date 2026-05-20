import { motion } from 'framer-motion'

import AnimatedCounter from '../shared/AnimatedCounter'

const stats = [
  { value: 30, suffix: '+', label: 'Members', marathi: 'सदस्य' },
  { value: 50, suffix: '+', label: 'Projects', marathi: 'प्रकल्प' },
  { value: 5000, suffix: '+', label: 'Lives Impacted', marathi: 'जीवित गती' },
  { value: 6, suffix: '', label: 'Years of Service', marathi: 'वर्षे सेवा' },
]

function StatsCounter() {
  return (
    <section id="stats" className="py-16 md:py-24 bg-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-card border-l-4 border-gold hover:shadow-card-hover transition-shadow"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-display text-primary mb-1">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm md:text-base text-secondary font-medium">
                {stat.label}
              </div>
              <div className="text-xs md:text-sm text-gold font-marathi">
                {stat.marathi}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsCounter