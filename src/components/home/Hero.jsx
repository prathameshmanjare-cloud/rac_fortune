import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ChevronDown } from 'lucide-react'

import Button from '../shared/Button'
import LogoSvg from '../../../logo.svg'

const tagline = 'Service. Leadership. Valor.'
const taglineLetters = tagline.split('')

const bgImages = [
  '/images/photos/bg/1.jpeg',
  '/images/photos/bg/2.jpeg',
  '/images/photos/bg/3.jpeg',
]

function Hero() {
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion || !textRef.current) return

    const letters = textRef.current.querySelectorAll('.char')
    gsap.fromTo(
      letters,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out',
        delay: 0.3,
      }
    )
  }, [shouldReduceMotion])

  const scrollToNext = () => {
    const statsSection = document.getElementById('stats')
    if (statsSection) {
      statsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-saffron"
    >
      <div className="absolute inset-0 grid grid-cols-3 gap-0">
        {bgImages.map((img, index) => (
          <div key={index} className="relative w-full h-full">
            <img 
              src={img} 
              alt={`Background ${index + 1}`}
              className="w-full h-full object-contain bg-black/40"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 pattern-maratha opacity-20" />
      <div className="absolute inset-0 pattern-fort opacity-10" />

      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-[600px] h-[600px]">
          <path
            d="M40 160 L40 80 L60 60 L60 40 L140 40 L140 60 L160 80 L160 160 L100 180 Z"
            fill="none"
            stroke="#C9A84C"
            strokeWidth="2"
          />
          <path
            d="M60 100 L60 80 L80 60"
            fill="none"
            stroke="#C9A84C"
            strokeWidth="1"
          />
          <path
            d="M140 100 L140 80 L120 60"
            fill="none"
            stroke="#C9A84C"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-32">
        <div className="flex flex-col items-center text-center">
          <h1
            ref={textRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display text-orange-400 mb-4 tracking-wide"
          >
            {taglineLetters.map((letter, index) => (
              <span
                key={index}
                className={`inline-block ${letter === ' ' ? 'w-6' : ''}`}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-lg md:text-xl font-semibold text-black max-w-2xl mb-12"
          >
            Rotaract Club of Pune City Fortune — Carrying the Legacy of Swarajya
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-6 mt-8"
          >
            <Link to="/join">
              <Button variant="primary" className="w-full sm:w-auto">
                Join the Mission →
              </Button>
            </Link>
            <Link to="/partner">
              <Button variant="secondary" className="w-full sm:w-auto">
                Support Our Cause →
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors cursor-pointer"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.button>
    </section>
  )
}

export default Hero