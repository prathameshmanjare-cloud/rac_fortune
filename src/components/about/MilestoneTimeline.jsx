import { motion } from 'framer-motion'

const milestones = [
  {
    year: '2021',
    title: 'Our Journey Begins',
    description: 'The journey of service and leadership began with a vision to create meaningful change.',
    marathi: 'आमची सुरुवात',
  },
  {
    year: '2022',
    title: 'Building Momentum',
    description: 'Expanded initiatives and grew our community impact across Pune.',
    marathi: 'गती वाढवत आहे',
  },
  {
    year: '2023',
    title: 'Strengthening Roots',
    description: 'Deepened community engagement and launched new programs.',
    marathi: 'मुळे मजबूत करणे',
  },
  {
    year: '2024',
    title: 'Daan Utsav 2.0',
    description: 'A milestone year! Daan Utsav 2.0 was our biggest celebration of giving yet.',
    marathi: 'दान उत्सव २.०',
  },
  {
    year: '2025',
    title: 'Rising Together',
    description: 'Continued our legacy of service with greater reach and impact.',
    marathi: 'एकत्र वाढत आहे',
  },
  {
    year: '2026',
    title: '6 Years Strong',
    description: 'Celebrating 6 years of service in July 2026 — a journey of impact and growth.',
    marathi: 'सहा वर्षे सेवा',
  },
]

function MilestoneTimeline() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-secondary mb-4">
            Our Journey
          </h2>
          <p className="text-gold text-lg md:text-xl font-marathi">
            आमची वाटचाल — Our Path
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gold" />

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="flex-1 md:w-1/2" />
                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary" />
                <div className="flex-1 md:w-1/2 pl-8 md:pl-0" >
                  <div className="bg-neutral p-4 rounded-lg shadow-card">
                    <span className="text-primary font-display text-lg">
                      {milestone.year}
                    </span>
                    <h3 className="text-lg font-semibold text-secondary mt-1">
                      {milestone.title}
                    </h3>
                    <p className="text-secondary-mid text-sm mt-1">
                      {milestone.description}
                    </p>
                    <span className="text-gold font-marathi text-sm">
                      {milestone.marathi}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MilestoneTimeline