import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import SectionHeader from '../shared/SectionHeader'

const projects = [
  {
    id: 1,
    name: 'Daan Utsav',
    avenue: 'Education',
    description: 'Empowering underprivileged children with quality education and learning materials.',
    impact: '2000+ Students Per Year',
    image: 'url(/images/photos/community/daanutsav.jpg)',
  },
  {
    id: 2,
    name: 'Arogya',
    avenue: 'Health',
    description: 'Free health check-ups and medical aid for rural communities in Pune district.',
    impact: '2000+ Beneficiaries',
    image: 'linear-gradient(135deg, #C9A84C 0%, #E8C96A 100%)',
  },
  {
    id: 3,
    name: 'Anokhi Bhaubijee',
    avenue: 'Community',
    description: 'Women empowerment initiative providing and employment .',
    impact: '300+ Women',
    image: 'url(/images/photos/community/anokibhaubij.jpg)',
  },
]

function FeaturedProjects() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-16 md:py-24 bg-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <SectionHeader
          title="Featured Projects"
          subtitle="आमचे प्रकल्प — Our Initiatives"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="bg-white rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group"
            >
              <div
                className="h-40 md:h-48 relative"
                style={{ background: project.image, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 text-secondary text-xs font-semibold px-3 py-1 rounded-full">
                    {project.avenue}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-secondary mb-2 group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                <p className="text-secondary-mid text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gold font-semibold text-sm">
                    {project.impact}
                  </span>
                  <Link
                    to="/projects"
                    className="flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedProjects