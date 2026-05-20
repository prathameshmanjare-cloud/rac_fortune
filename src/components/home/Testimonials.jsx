import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import SectionHeader from '../shared/SectionHeader'

// Add real team member photos to /public/images/team/
// Supported formats: .jpg, .jpeg, .png, .webp
// Recommended size: 200x200px (square, face-centered)

// Local images - uncomment after adding real images
// const localImages = {
//   1: '/images/team/priya.jpg',
//   2: '/images/team/rahul.jpg',
//   3: '/images/team/anjali.jpg',
// }

// Fallback placeholder images (use these until real images are added)
const fallbackImages = {
  1: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face',
  2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  3: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face',
}

const useLocalImages = false // Set to true after adding real team photos

const getImage = (id) => {
  if (useLocalImages) {
    return localImages[id] || fallbackImages[id]
  }
  return fallbackImages[id]
}

const testimonials = [
  {
    id: 1,
    name: 'Piyusha Patil ',
    role: 'President, 2023-24',
    quote: 'Joining RAC Pune City Fortune has transformed me into a leader. The club taught me that true leadership is about serving others.',
    image: getImage(1),
  },
  {
    id: 2,
    name: 'Onkar Katkar',
    role: 'Vice President, 2024-25',
    quote: 'The friendships I made and the skills I developed here are invaluable. This is more than just a club.',
    image: getImage(2),
  },
  {
    id: 3,
    name: 'Miheeka Khair',
    role: 'Director, Community Service',
    quote: 'Being part of projects like Daan Utsav 3.0 and AnokiBhaubeej showed me the power of collective action in creating real change.',
    image: getImage(3),
  },
]

function Testimonials() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setCurrent((prev - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((prev + 1) % testimonials.length)

  return (
    <section className="py-16 md:py-24 bg-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <SectionHeader
          title="Voices of Leaders"
          subtitle="नेत्यांचे विचार — Our Leadership Stories"
        />

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gold">
                <img
                  src={testimonials[current].image}
                  alt={testimonials[current].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <blockquote className="text-xl md:text-2xl text-secondary-mid mb-6 italic">
                "{testimonials[current].quote}"
              </blockquote>
              <div>
                <p className="text-lg font-semibold text-secondary">
                  {testimonials[current].name}
                </p>
                <p className="text-primary font-medium">
                  {testimonials[current].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-gold hover:text-primary transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gold hover:text-primary transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === current ? 'bg-primary' : 'bg-gold/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials