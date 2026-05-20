import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { ChevronRight, ChevronDown, ChevronUp, User, Users, Award, Star } from 'lucide-react'

import Button from '../components/shared/Button'

const valueProps = [
  {
    icon: User,
    title: 'Leadership Skills',
    benefit: 'Take ownership of real projects and build leadership experience',
  },
  {
    icon: Users,
    title: 'Network',
    benefit: 'Connect with 80+ young professionals and industry leaders',
  },
  {
    icon: Award,
    title: 'Recognition',
    benefit: 'Get recognized for your contributions at club and district level',
  },
  {
    icon: Star,
    title: 'Growth',
    benefit: 'Personal and professional growth through service',
  },
]

const journey = [
  { step: 1, title: 'Apply', description: 'Submit your application form' },
  { step: 2, title: 'Interview', description: 'Meet with our team' },
  { step: 3, title: 'Induction', description: 'Join as a provisional member' },
  { step: 4, title: 'Board Roles', description: 'Serve on committees' },
  { step: 5, title: 'Alumni', description: 'Lifetime network' },
]

const faqs = [
  {
    question: 'What is the membership fee?',
    answer: 'Annual membership fee is ₹2,500 which includes club activities, events, and materials.',
  },
  {
    question: 'What is the time commitment?',
    answer: 'Members are expected to attend weekly meetings and contribute 4-6 hours monthly to projects.',
  },
  {
    question: 'Who can join?',
    answer: 'Any young professional aged 18-30 residing in Pune or nearby areas.',
  },
  {
    question: 'When are meetings held?',
    answer: 'Club meetings are held every Saturday at 6:00 PM at our club venue in Pune.',
  },
]

function JoinUs() {
  const [expandedFaq, setExpandedFaq] = useState(null)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    alert('Application submitted! We will contact you soon.')
  }

  return (
    <>
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 pattern-maratha opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-4">
              Ready to Lead? Ready to Serve?
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-marathi mb-8">
              आपल्या स्वराज्याची सुरुवात इथून होते
            </p>
            <Button variant="secondary" href="#apply">
              Apply Now →
            </Button>
          </motion.div>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block opacity-20">
          <svg viewBox="0 0 200 300" className="w-48 h-72">
            <path
              d="M100 20 L180 100 L180 280 L100 300 L20 280 L20 100 Z"
              fill="none"
              stroke="#C9A84C"
              strokeWidth="2"
            />
            <path
              d="M60 140 L100 100 L140 140"
              fill="none"
              stroke="#C9A84C"
              strokeWidth="2"
            />
            <path
              d="M60 180 L100 220 L140 180"
              fill="none"
              stroke="#C9A84C"
              strokeWidth="2"
            />
          </svg>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-secondary mb-4">
              Why Join Us?
            </h2>
            <p className="text-gold text-lg md:text-xl font-marathi">
              का सामील व्हावे — Why Be Part of Us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueProps.map((prop, index) => (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-neutral p-6 rounded-lg text-center group hover:bg-primary-subtle transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold transition-colors">
                  <prop.icon className="w-8 h-8 text-gold group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-secondary mb-2">
                  {prop.title}
                </h3>
                <p className="text-secondary-light text-sm">
                  {prop.benefit}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-secondary mb-4">
              Member Journey
            </h2>
            <p className="text-gold text-lg md:text-xl font-marathi">
              आमची वाटचाल — Our Path Together
            </p>
          </motion.div>

                  <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0">
                    {journey.map((step, index) => (
                      <div key={step.step} className="flex flex-col md:flex-row items-center gap-0 md:gap-0">
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="text-center"
                        >
                          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-1 md:mb-2">
                            <span className="text-lg md:text-xl font-bold">{step.step}</span>
                          </div>
                          <div className="text-sm font-medium text-secondary">
                            {step.title}
                          </div>
                          <div className="text-xs text-secondary-light">
                            {step.description}
                          </div>
                        </motion.div>
                        {index < journey.length - 1 && (
                          <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-gold mx-2 rotate-90 md:rotate-0" />
                        )}
                      </div>
                    ))}
                  </div>
        </div>
      </section>

      <section id="apply" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-secondary mb-4">
              Apply Now
            </h2>
            <p className="text-gold text-lg md:text-xl font-marathi">
              अर्ज करा — Apply Today
            </p>
          </motion.div>

          <div className="max-w-xl mx-auto">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Full Name
                </label>
                <input
                  {...register('name', { required: true })}
                  className="w-full px-4 py-3 border border-neutral-dark rounded-lg focus:outline-none focus:border-primary"
                  placeholder="Your name"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">Name is required</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Email
                </label>
                <input
                  {...register('email', { required: true })}
                  type="email"
                  className="w-full px-4 py-3 border border-neutral-dark rounded-lg focus:outline-none focus:border-primary"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">Email is required</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Phone
                </label>
                <input
                  {...register('phone', { required: true })}
                  type="tel"
                  className="w-full px-4 py-3 border border-neutral-dark rounded-lg focus:outline-none focus:border-primary"
                  placeholder="+91 99999 99999"
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm">Phone is required</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Why do you want to join?
                </label>
                <textarea
                  {...register('reason', { required: true })}
                  rows={4}
                  className="w-full px-4 py-3 border border-neutral-dark rounded-lg focus:outline-none focus:border-primary"
                  placeholder="Tell us about yourself..."
                />
                {errors.reason && (
                  <span className="text-red-500 text-sm">This field is required</span>
                )}
              </div>

              <Button type="submit" variant="primary" className="w-full">
                Submit Application
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-secondary mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="border border-neutral-dark rounded-lg overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className="w-full flex items-center justify-between p-4 bg-white hover:bg-neutral transition-colors"
                >
                  <span className="text-left font-medium text-secondary">
                    {faq.question}
                  </span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    className="px-4 pb-4"
                  >
                    <p className="text-secondary-light">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default JoinUs