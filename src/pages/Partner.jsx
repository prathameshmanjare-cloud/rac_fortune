import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { TrendingUp, Users, Award, Download, ArrowRight } from 'lucide-react'

import Button from '../components/shared/Button'
import SectionHeader from '../components/shared/SectionHeader'

const whyPartner = [
  {
    icon: Users,
    title: 'Reach',
    description: 'Connect with 80+ young professionals and amplify your brand impact across Pune',
  },
  {
    icon: TrendingUp,
    title: 'Impact',
    description: 'Create real change in education, health, and women empowerment initiatives',
  },
  {
    icon: Award,
    title: 'Recognition',
    description: 'Gain visibility through events, social media, and annual reports',
  },
]

const tiers = [
  {
    name: 'Community Partner',
    price: '₹50,000',
    features: [
      'Logo on website',
      'Social media mentions',
      'Event invitations',
      'Annual report recognition',
    ],
  },
  {
    name: 'Silver Partner',
    price: '₹1,00,000',
    features: [
      'All Community benefits',
      'Logo on all materials',
      'Speaking opportunities',
      'VIP event access',
    ],
  },
  {
    name: 'Gold Partner',
    price: '₹2,50,000',
    features: [
      'All Silver benefits',
      'Named project sponsorship',
      'Exclusive branding',
      'Board meeting invites',
    ],
  },
]

const sponsors = [
  { name: 'Your Brand Here', color: '#FF6B00' },
  { name: 'Your Brand Here', color: '#C9A84C' },
  { name: 'Your Brand Here', color: '#0B0A0A' },
  { name: 'Your Brand Here', color: '#2D2D2D' },
  { name: 'Your Brand Here', color: '#5A5A5A' },
]

function Partner() {
  const [selectedTier, setSelectedTier] = useState(null)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    alert('CSR enquiry submitted! We will contact you soon.')
  }

  return (
    <>
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-secondary overflow-hidden">
        <div className="absolute inset-0 pattern-maratha opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-gold mb-4">
              Create Impact. Build Legacy.
            </h1>
            <p className="text-white/70 text-lg md:text-xl font-marathi">
              सामाजिक भागीदारी — Social Partnership
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <SectionHeader
            title="Why Partner With Us?"
            subtitle="का साथ द्यावा — Why Partner With Us"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyPartner.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-10 h-10 text-gold" />
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-2">
                  {item.title}
                </h3>
                <p className="text-secondary-light">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <SectionHeader
            title="Partnership Tiers"
            subtitle="भागीदारी — Partnership Levels"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedTier(index)}
                className={`bg-white p-8 rounded-lg shadow-card cursor-pointer transition-all ${
                  selectedTier === index ? 'ring-2 ring-primary' : ''
                } hover:shadow-card-hover`}
              >
                <h3 className="text-xl font-semibold text-secondary mb-2">
                  {tier.name}
                </h3>
                <div className="text-3xl font-display text-primary mb-4">
                  {tier.price}
                </div>
                <ul className="space-y-2 mb-6">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-secondary"
                    >
                      <ArrowRight className="w-4 h-4 text-gold" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={index === 2 ? 'primary' : 'secondary'}
                  className="w-full"
                >
                  Select Plan
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <SectionHeader title="Our Partners" subtitle="आमचे सहकारी" />

          <div className="flex items-center gap-8 overflow-x-auto py-8">
            {sponsors.map((sponsor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-40 h-20 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: sponsor.color }}
              >
                <span className="text-white font-semibold text-sm">
                  {sponsor.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display text-gold mb-4">
                CSR Enquiry
              </h2>
              <p className="text-white/70 mb-6">
                Interested in partnering with us? Send us your enquiry and we'll get back to you within 48 hours.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Company Name
                  </label>
                  <input
                    {...register('company', { required: true })}
                    className="w-full px-4 py-3 bg-secondary-mid border border-secondary-light rounded-lg text-white focus:outline-none focus:border-primary"
                    placeholder="Your company"
                  />
                  {errors.company && (
                    <span className="text-red-500 text-sm">
                      Company name is required
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Contact Person
                  </label>
                  <input
                    {...register('contact', { required: true })}
                    className="w-full px-4 py-3 bg-secondary-mid border border-secondary-light rounded-lg text-white focus:outline-none focus:border-primary"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Email
                  </label>
                  <input
                    {...register('email', { required: true })}
                    type="email"
                    className="w-full px-4 py-3 bg-secondary-mid border border-secondary-light rounded-lg text-white focus:outline-none focus:border-primary"
                    placeholder="company@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Message
                  </label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    className="w-full px-4 py-3 bg-secondary-mid border border-secondary-light rounded-lg text-white focus:outline-none focus:border-primary"
                    placeholder="Tell us about your CSR goals..."
                  />
                </div>

                <Button type="submit" variant="primary">
                  Send Enquiry
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-3xl font-display text-gold mb-4">
                Download CSR Deck
              </h2>
              <p className="text-white/70 mb-6">
                Get detailed information about our projects, impact metrics, and partnership opportunities.
              </p>

              <Button href="#" variant="secondary" className="w-full">
                <Download className="w-5 h-5" />
                Download CSR Deck (PDF)
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Partner