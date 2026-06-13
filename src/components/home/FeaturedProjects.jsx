import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, FileBarChart } from 'lucide-react'

import SectionHeader from '../shared/SectionHeader'

// Category -> badge color
const categoryColors = {
  Education: 'bg-primary text-white',
  Health: 'bg-gold text-secondary',
  Community: 'bg-secondary text-white',
  Environment: 'bg-green-600 text-white',
}

const projects = [
  {
    id: 1,
    name: 'Daan Utsav',
    avenue: 'Education',
    location: 'Pune, MH',
    description: 'Empowering underprivileged children with quality education and learning materials.',
    impact: '2000+ Students Per Year',
    image: 'url(/images/photos/community/daanutsav.jpg)',
  },
  {
    id: 2,
    name: 'Arogya',
    avenue: 'Health',
    location: 'Pune District',
    description: 'Free health check-ups and medical aid for rural communities in Pune district.',
    impact: '2000+ Beneficiaries',
    image: 'url(/images/photos/community/arogya.png)',
  },
  {
    id: 3,
    name: 'Anokhi Bhaubijee',
    avenue: 'Community',
    location: 'Pune, MH',
    description: 'Women empowerment initiative providing skills and employment.',
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
              className="bg-white rounded-2xl overflow-hidden shadow-card border border-transparent hover:border-gold hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group flex flex-col"
            >
              <div
                className="h-44 md:h-52 relative overflow-hidden"
                style={{ background: project.image, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[project.avenue] || 'bg-white/90 text-secondary'}`}>
                    {project.avenue}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-1 text-white text-xs font-medium">
                  <MapPin className="w-3.5 h-3.5" /> {project.location}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-semibold text-secondary mb-2 group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                <p className="text-secondary-mid text-sm mb-4 line-clamp-2 flex-1">
                  {project.description}
                </p>
                <div className="inline-flex items-center self-start gap-2 bg-gold/10 text-gold-dark text-xs font-bold px-3 py-1.5 rounded-lg mb-4">
                  {project.impact}
                </div>
                <Link
                  to="/projects"
                  className="flex items-center gap-1.5 text-primary text-sm font-semibold hover:gap-2.5 transition-all"
                >
                  <FileBarChart className="w-4 h-4" /> View Impact Report <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedProjects