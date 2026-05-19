import { motion } from 'framer-motion'
import { Linkedin } from 'lucide-react'
import LogoSvg from '../../logo.svg'

import ValueCards from '../components/about/ValueCards'
import MilestoneTimeline from '../components/about/MilestoneTimeline'

const coreTeam = [
  { name: 'Pres. Name', role: 'President', bio: 'Leading the club vision and strategy', image: '/images/photos/team/president.webp' },
  { name: 'VP Name', role: 'Vice President', bio: 'Supporting president and club operations', image: '/images/photos/team/vp.webp' },
  { name: 'IPP Name', role: 'Immediate Past President', bio: 'Past leadership and guidance', image: '/images/photos/team/ipp.webp' },
  { name: 'Sec. Name', role: 'Secretary', bio: 'Club operations and communications', image: '/images/photos/team/sec.webp' },
  { name: 'Treas. Name', role: 'Treasurer', bio: 'Financial management and reporting', image: '/images/photos/team/tresurer.webp' },
]

const aboutPhotos = [
  '/images/photos/service/rac_punecity_fortune_1769087362_3815703815954162734_49805461762.jpg',
  '/images/photos/service/rac_punecity_fortune_1769098566_3815797799191849780_49805461762.jpg',
  '/images/photos/service/rac_punecity_fortune_1769170220_3816398881089685253_49805461762.jpg',
  '/images/photos/service/rac_punecity_fortune_1769170259_3816399202658552178_49805461762.jpg',
  '/images/photos/service/rac_punecity_fortune_1769190241_3816566821483209142_49805461762.jpg',
  '/images/photos/service/rac_punecity_fortune_1770189010_3824945107745645112_49805461762.jpg',
  '/images/photos/service/rac_punecity_fortune_1770284883_3825749347577638287_49805461762.jpg',
  '/images/photos/service/rac_punecity_fortune_1770712307_3829334843235012353_49805461762.jpg',
]



function About() {
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
              About Us
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-marathi">
              आमची माहिती — About Our Club
            </p>
          </motion.div>
        </div>
      </section>


      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary mb-4">
                Our Story
              </h2>
              <p className="text-secondary-mid text-base md:text-lg leading-relaxed mb-4">
                Rotaract Club of Pune City Fortune was founded in 2018 under Rotary International District 3131, with a vision to empower young leaders in Pune to create meaningful change in their communities.
              </p>
              <p className="text-secondary-mid text-base md:text-lg leading-relaxed mb-4">
                Rooted in the timeless values of Chhatrapati Shivaji Maharaj — Swarajya (self-governance), Seva (service), and Parakram (courage) — we strive to make these principles relevant to modern youth leadership.
              </p>
              <p className="text-gold font-marathi text-lg md:text-xl">
                स्वराज्य व्हावे ही तो श्रींची इच्छा आहे
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-neutral p-8 rounded-lg border-l-4 border-gold"
            >
              <h3 className="text-xl font-semibold text-secondary mb-4">
                Our Mission
              </h3>
              <p className="text-secondary-mid">
                To provide young leaders with opportunities for service and professional development while creating lasting positive impact in our community.
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
          >
            {aboutPhotos.map((photo, index) => (
              <div 
                key={index}
                className="aspect-square rounded-lg overflow-hidden shadow-card"
              >
                <img 
                  src={photo} 
                  alt={`Club moment ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <ValueCards />

      <MilestoneTimeline />

      <section className="py-16 md:py-24 bg-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-secondary mb-4">
              Core Team
            </h2>
            <p className="text-gold text-lg md:text-xl font-marathi">
              आमचे नेतृत्व — Our Leadership
            </p>
          </motion.div>

          <div className="flex flex-col items-center gap-8">
            <div className="flex justify-center">
              {coreTeam.filter(m => m.role === 'President').map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-card hover:shadow-card-hover transition-all group w-64"
                >
                  <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary text-center">
                    {member.name}
                  </h3>
                  <p className="text-primary text-sm font-medium mb-2 text-center">
                    {member.role}
                  </p>
                  <p className="text-secondary-light text-sm text-center">
                    {member.bio}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {coreTeam.filter(m => m.role !== 'President').map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-card hover:shadow-card-hover transition-all group w-56"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary text-center">
                    {member.name}
                  </h3>
                  <p className="text-primary text-sm font-medium mb-2 text-center">
                    {member.role}
                  </p>
                  <p className="text-secondary-light text-sm text-center">
                    {member.bio}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-secondary">
              Rotary Family — रोटरी कुटुंब
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center items-start gap-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center items-center gap-8"
            >
              <div className="text-center">
                  <img 
                    src="/images/logos/rotary-international.svg" 
                    alt="Rotary International" 
                    className="h-20 mx-auto mb-2"
                  />
                <span className="text-secondary font-medium">Rotary International</span>
              </div>

              <div className="w-px h-16 bg-gold" />

              <div className="text-center">
                  <img 
                    src="/images/logos/district-logo.svg" 
                    alt="District 3131" 
                    className="h-20 mx-auto mb-2"
                  />
                <span className="text-secondary font-medium">District 3131</span>
              </div>

              <div className="w-px h-16 bg-gold" />

              <div className="text-center">
                  <img 
                    src="/images/logos/rotary-international.svg" 
                    alt="Rotary Club" 
                    className="h-16 mx-auto mb-2"
                  />
                <span className="text-secondary font-medium">Parent Club</span>
              </div>

              <div className="w-px h-16 bg-gold" />

              <div className="text-center">
                  <img 
                    src={LogoSvg}
                    alt="RAC" 
                    className="h-20 mx-auto mb-2"
                  />
                <span className="text-secondary font-medium">RAC Pune City Fortune</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About