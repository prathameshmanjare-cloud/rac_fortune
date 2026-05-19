import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Instagram, Linkedin, Youtube, Send } from 'lucide-react'

import SectionHeader from '../components/shared/SectionHeader'
import Button from '../components/shared/Button'

const socialLinks = [
  { icon: Instagram, label: 'Instagram', url: 'https://instagram.com/rac_punecity_fortune' },
  { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com/company/rac-punecity-fortune' },
  { icon: Youtube, label: 'YouTube', url: 'https://youtube.com/@RotaractClubofPuneCityFortune' },
]

function Contact() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    alert('Message sent! We will contact you soon.')
    reset()
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
              Contact Us
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-marathi">
              संपर्क — Get in Touch
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeader
                title="Get in Touch"
                subtitle="संपर्क करा — Reach Us"
                align="left"
              />

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary mb-1">
                      Address
                    </h3>
                    <p className="text-secondary-light text-sm">
                      Pune, Maharashtra, India
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary mb-1">
                      Email
                    </h3>
                    <a
                      href="mailto:info@racpunecityfortune.org"
                      className="text-secondary-light text-sm hover:text-primary"
                    >
                      info@racpunecityfortune.org
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary mb-1">
                      Phone
                    </h3>
                    <a
                      href="tel:+919999999999"
                      className="text-secondary-light text-sm hover:text-primary"
                    >
                      +91 99999 99999
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-secondary mb-4">
                  Follow Us
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-primary transition-colors group"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 text-white group-hover:text-white" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-8 h-48 bg-neutral rounded-lg overflow-hidden">
                <iframe
                  title="Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782!2d73.8567!3d18.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMxJzE2LjYiTiA3M1UgNDkuNDggXQ!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeader
                title="Send a Message"
                subtitle="संदेश पाठवा — Send Message"
                align="left"
              />

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Name
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-4 py-3 border border-neutral-dark rounded-lg focus:outline-none focus:border-primary"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Email
                  </label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    type="email"
                    className="w-full px-4 py-3 border border-neutral-dark rounded-lg focus:outline-none focus:border-primary"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Subject
                  </label>
                  <input
                    {...register('subject', { required: 'Subject is required' })}
                    className="w-full px-4 py-3 border border-neutral-dark rounded-lg focus:outline-none focus:border-primary"
                    placeholder="What is this about?"
                  />
                  {errors.subject && (
                    <span className="text-red-500 text-sm">
                      {errors.subject.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Message
                  </label>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    rows={6}
                    className="w-full px-4 py-3 border border-neutral-dark rounded-lg focus:outline-none focus:border-primary"
                    placeholder="Your message..."
                  />
                  {errors.message && (
                    <span className="text-red-500 text-sm">
                      {errors.message.message}
                    </span>
                  )}
                </div>

                <Button type="submit" variant="primary" className="w-full">
                  <Send className="w-5 h-5" />
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact