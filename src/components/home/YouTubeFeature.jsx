import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

function YouTubeFeature() {
  return (
    <section className="py-16 md:py-24 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 pattern-maratha opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-gold mb-4">
            Our Stories
          </h2>
          <p className="text-white/70 text-lg md:text-xl font-marathi">
            आमची कहाणी — Tales of Impact
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-3xl mx-auto aspect-video bg-secondary-mid rounded-lg overflow-hidden group cursor-pointer"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary flex items-center justify-center"
            >
              <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" />
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-white font-medium">Watch our journey →</p>
          </div>
        </motion.div>

        <div className="text-center mt-8">
          <a
            href="https://youtube.com/@RotaractClubofPuneCityFortune"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            Subscribe for our stories →
          </a>
        </div>
      </div>
    </section>
  )
}

export default YouTubeFeature