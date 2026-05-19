import { motion } from 'framer-motion'

import SectionHeader from '../shared/SectionHeader'

const localImages = [
  '/images/photos/service/rac_punecity_fortune_1768668061_3812186464029770588_49805461762.jpg',
  '/images/photos/service/rac_punecity_fortune_1768668125_3812187000808413192_49805461762.jpg',
  '/images/photos/service/rac_punecity_fortune_1769087290_3815703213266187565_49805461762.jpg',
  '/images/photos/service/rac_punecity_fortune_1769087362_3815703815954162734_49805461762.jpg',
  '/images/photos/service/rac_punecity_fortune_1769098454_3815796855985189862_49805461762.jpg',
  '/images/photos/service/rac_punecity_fortune_1769170143_3816398231660399328_49805461762.jpg',
  '/images/photos/service/rac_punecity_fortune_1769170220_3816398881089685253_49805461762.jpg',
  '/images/photos/service/rac_punecity_fortune_1770188787_3824943233730618918_49805461762.jpg',
  '/images/photos/service/rac_punecity_fortune_1770284445_3825745674692733749_49805461762.jpg',
  '/images/photos/service/rac_punecity_fortune_1770712155_3829333568921569691_49805461762.jpg',
  '/images/photos/service/rac_punecity_fortune_1770712307_3829334843235012353_49805461762.jpg',
  '/images/photos/service/rac_punecity_fortune_1770712570_3829337042862238260_49805461762.jpg',
]

const fallbackImages = [
  { id: 1, url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=600&fit=crop', alt: 'Team gathering' },
  { id: 2, url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=600&fit=crop', alt: 'Community service' },
  { id: 3, url: 'https://images.unsplash.com/photo-1531206715517-5c0ba140840e?w=600&h=600&fit=crop', alt: 'Event celebration' },
  { id: 4, url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=600&fit=crop', alt: 'Team meeting' },
  { id: 5, url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=600&fit=crop', alt: 'Project activity' },
  { id: 6, url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=600&fit=crop', alt: 'Team workshop' },
]

const useLocalImages = true

const clubImages = useLocalImages 
  ? localImages.map((url, index) => ({ id: index + 1, url, alt: `Club image ${index + 1}` }))
  : fallbackImages

function InstagramGrid() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <SectionHeader
          title="Life at Fortune"
          subtitle="आमचे जीवन — Our Journey"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {clubImages.map((image, index) => (
            <motion.a
              key={image.id}
              href="https://instagram.com/rac_punecity_fortune"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-square group overflow-hidden rounded-lg"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/60 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View on Instagram
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <div className="text-center mt-8">
          <a
            href="https://instagram.com/rac_punecity_fortune"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            Follow @rac_punecity_fortune →
          </a>
        </div>
      </div>
    </section>
  )
}

export default InstagramGrid