import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'

function Upcoming({ title = 'Coming Soon' }) {
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
              {title}
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-marathi">
              लवचिक येणार — Coming Soon
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Clock className="w-12 h-12 text-orange-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-4">
              आम्ही लवचिक येत आहोत
            </h2>
            <p className="text-secondary-mid text-lg max-w-2xl mx-auto">
              आम्ही या पृष्ठावर काम करत आहोत. लवचिक आपल्यासाठी एक छान अनुभव आणतो. 
              तोपर्यत, आमच्या इतर पृष्ठांना भेट द्या!
            </p>
            <p className="text-gold font-marathi text-lg mt-4">
              We are working on something exciting. Stay tuned!
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Upcoming