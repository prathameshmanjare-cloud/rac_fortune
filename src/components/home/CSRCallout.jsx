import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, TrendingUp, Award } from 'lucide-react'

import Button from '../shared/Button'

const benefits = [
  {
    icon: Users,
    title: 'Reach',
    description: 'Connect with 80+ young professionals and amplify your brand impact',
  },
  {
    icon: TrendingUp,
    title: 'Impact',
    description: 'Create real change in education, health, and women empowerment',
  },
  {
    icon: Award,
    title: 'Recognition',
    description: 'Gain visibility through our events, social media, and annual reports',
  },
]

function CSRCallout() {
  return (
    <section className="py-16 md:py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 pattern-maratha opacity-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-white mb-4">
            Partner With Us for Social Good
          </h2>
          <p className="text-white/90 text-lg md:text-xl font-marathi">
            सामाजिक भागीदारी — Social Partnership
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-gold/30"
            >
              <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-white/80 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/partner">
            <Button variant="dark">
              Become a CSR Partner →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CSRCallout