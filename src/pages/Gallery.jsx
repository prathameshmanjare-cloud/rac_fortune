import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react'

import SectionHeader from '../components/shared/SectionHeader'

// Add real images to /public/images/gallery/
// Supported formats: .jpg, .jpeg, .png, .webp
// Recommended size: 800x600px for optimal display

const categories = ['All', 'Events', 'Projects', 'Team', 'Community']

const useLocalImages = true

const localPhotos = [
  { id: 1, category: 'Events', src: '/images/photos/rac_punecity_fortune_1768559369_3811274689776190906_49805461762.jpg' },
  { id: 2, category: 'Projects', src: '/images/photos/rac_punecity_fortune_1768667712_3812183533578664878_49805461762.jpg' },
  { id: 3, category: 'Team', src: '/images/photos/rac_punecity_fortune_1768725426_3812667673214192559_49805461762.jpg' },
  { id: 4, category: 'Community', src: '/images/photos/rac_punecity_fortune_1768838564_3813616748024907016_49805461762.jpg' },
  { id: 5, category: 'Events', src: '/images/photos/rac_punecity_fortune_1768984609_3814841860192248018_49805461762.jpg' },
  { id: 6, category: 'Projects', src: '/images/photos/rac_punecity_fortune_1769087217_3815702595814328160_49805461762.jpg' },
  { id: 7, category: 'Team', src: '/images/photos/rac_punecity_fortune_1769170143_3816398231660399328_49805461762.jpg' },
  { id: 8, category: 'Community', src: '/images/photos/rac_punecity_fortune_1770188787_3824943233730618918_49805461762.jpg' },
  { id: 9, category: 'Events', src: '/images/photos/rac_punecity_fortune_1770208206_3825106133443166656_49805461762.jpg' },
  { id: 10, category: 'Projects', src: '/images/photos/rac_punecity_fortune_1770284445_3825745674692733749_49805461762.jpg' },
  { id: 11, category: 'Team', src: '/images/photos/rac_punecity_fortune_1770357176_3826355762540678171_49805461762.webp' },
  { id: 12, category: 'Community', src: '/images/photos/rac_punecity_fortune_1770712155_3829333568921569691_49805461762.jpg' },
]

const photos = useLocalImages ? localPhotos : []

const videos = [
  { id: 1, title: 'Udaan Project Documentary', thumbnail: 'https://images.unsplash.com/photo-1531206715517-5c0ba140840e?w=400&h=225&fit=crop', views: '1.2K' },
  { id: 2, title: 'Annual Gala 2024', thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=225&fit=crop', views: '800' },
  { id: 3, title: 'Sakhi Initiative', thumbnail: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=225&fit=crop', views: '2.1K' },
]

function Gallery() {
  const [filter, setFilter] = useState('All')
  const [lightbox, setLightbox] = useState(null)

  const filteredPhotos = filter === 'All'
    ? photos
    : photos.filter(p => p.category === filter)

  const nextImage = () => {
    if (lightbox === null) return
    const currentIndex = filteredPhotos.findIndex(p => p.id === lightbox)
    const nextIndex = (currentIndex + 1) % filteredPhotos.length
    setLightbox(filteredPhotos[nextIndex].id)
  }

  const prevImage = () => {
    if (lightbox === null) return
    const currentIndex = filteredPhotos.findIndex(p => p.id === lightbox)
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length
    setLightbox(filteredPhotos[prevIndex].id)
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
              Gallery
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-marathi">
              छायाचित्र — Our Memories
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === category
                    ? 'bg-primary text-white'
                    : 'bg-neutral text-secondary hover:bg-gold/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence>
              {filteredPhotos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-square group cursor-pointer overflow-hidden rounded-lg"
                  onClick={() => setLightbox(photo.id)}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt || `Gallery ${photo.id}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors duration-300" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-display text-secondary text-center mb-8">
              Videos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {videos.map((video) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                        <Play className="w-5 h-5 text-primary ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-medium text-secondary group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-secondary-light">{video.views} views</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-full"
              onClick={() => setLightbox(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <button
              className="absolute left-4 p-2 text-white hover:bg-white/20 rounded-full"
              onClick={(e) => { e.stopPropagation(); prevImage() }}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              className="absolute right-4 p-2 text-white hover:bg-white/20 rounded-full"
              onClick={(e) => { e.stopPropagation(); nextImage() }}
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            <img
              src={filteredPhotos.find(p => p.id === lightbox)?.src}
              alt="Full size"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Gallery