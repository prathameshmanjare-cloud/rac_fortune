import { motion } from 'framer-motion'

function SectionHeader({ title, subtitle, align = 'center', className = '' }) {
  const alignments = {
    center: 'text-center',
    left: 'text-left',
    right: 'text-right',
  }

  return (
    <div className={`mb-8 md:mb-12 ${alignments[align]} ${className}`}>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary mb-2">
        {title}
      </h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gold font-marathi text-lg md:text-xl"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`h-1 bg-gold mx-auto mt-4 ${align === 'center' ? 'w-24' : 'w-24'}`}
      />
    </div>
  )
}

export default SectionHeader