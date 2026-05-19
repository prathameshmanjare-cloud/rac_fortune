import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Filter } from 'lucide-react'

import SectionHeader from '../components/shared/SectionHeader'
import AnimatedCounter from '../components/shared/AnimatedCounter'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const projects = [
  {
    id: 1,
    name: 'Daan Utsav',
    avenue: 'Education',
    description: 'Providing quality education and learning materials to underprivileged children in Pune.',
    impact: '500+ Students',
    date: 'Ongoing',
    status: 'active',
    image: '/images/photos/rac_punecity_fortune_1768559369_3811274689776190906_49805461762.jpg',
  },
  {
    id: 2,
    name: 'Arogya',
    avenue: 'Health',
    description: 'Free health check-ups and medical aid for rural communities in Pune district.',
    impact: '2000+ Beneficiaries',
    date: 'Ongoing',
    status: 'active',
    image: '/images/photos/rac_punecity_fortune_1768667712_3812183533578664878_49805461762.jpg',
  },
  {
    id: 3,
    name: 'Sakhi',
    avenue: 'Community',
    description: 'Women empowerment initiative providing skill development and employment opportunities.',
    impact: '300+ Women',
    date: 'Ongoing',
    status: 'active',
    image: '/images/photos/rac_punecity_fortune_1768725426_3812667673214192559_49805461762.jpg',
  },
  {
    id: 4,
    name: 'Green Pune',
    avenue: 'Environment',
    description: 'Tree plantation and environmental awareness campaigns across Pune.',
    impact: '1000+ Trees',
    date: '2023',
    status: 'completed',
    image: '/images/photos/rac_punecity_fortune_1768838564_3813616748024907016_49805461762.jpg',
  },
  {
    id: 5,
    name: 'Skill India',
    avenue: 'Professional Dev',
    description: 'Vocational training for youth to enhance employability skills.',
    impact: '200+ Trained',
    date: '2023',
    status: 'completed',
    image: '/images/photos/rac_punecity_fortune_1768984609_3814841860192248018_49805461762.jpg',
  },
  {
    id: 6,
    name: 'Joy of Giving',
    avenue: 'Community',
    description: 'Annual donation drive for orphaned children during festive season.',
    impact: '150+ Children',
    date: '2024',
    status: 'active',
    image: '/images/photos/rac_punecity_fortune_1769087217_3815702595814328160_49805461762.jpg',
  },
]

const avenues = ['All', 'Education', 'Health', 'Environment', 'Professional Dev', 'Community']

const chartData = [
  { name: 'Education', value: 20, color: '#FF6B00' },
  { name: 'Health', value: 25, color: '#C9A84C' },
  { name: 'Environment', value: 15, color: '#0B0A0A' },
  { name: 'Professional Dev', value: 20, color: '#2D2D2D' },
  { name: 'Community', value: 20, color: '#5A5A5A' },
]

function Projects() {
  const [filter, setFilter] = useState('All')

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.avenue === filter)

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
              Projects & Impact
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-marathi">
              आमचे प्रकल्प — Our Initiatives
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-12">
            {[
              { value: 50, suffix: '+', label: 'Total Projects' },
              { value: 5000, suffix: '+', label: 'Lives Impacted' },
              { value: 8, suffix: '', label: 'Years Active' },
              { value: 80, suffix: '+', label: 'Volunteers' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-card border-l-4 border-gold"
              >
                <div className="text-3xl font-display text-primary mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-secondary font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-lg shadow-card">
            <h3 className="text-lg font-semibold text-secondary mb-4">
              Project Distribution by Avenue
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              {chartData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-secondary">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-wrap gap-2 mb-8">
            {avenues.map((avenue) => (
              <button
                key={avenue}
                onClick={() => setFilter(avenue)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === avenue
                    ? 'bg-primary text-white'
                    : 'bg-neutral text-secondary hover:bg-primary-subtle'
                }`}
              >
                {avenue}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all group"
              >
                <div
                  className="h-40 relative overflow-hidden"
                >
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
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
                    <span className="text-secondary-light text-xs">
                      {project.date}
                    </span>
                  </div>
                  <button className="flex items-center gap-1 text-primary text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                    View Details <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Projects