import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ChevronDown } from 'lucide-react'

import Button from '../shared/Button'
import AnimatedCounter from '../shared/AnimatedCounter'
import LogoSvg from '../../../logo.svg'

const heroImpact = [
  { value: 5000, suffix: '+', label: 'Lives Impacted' },
  { value: 50, suffix: '+', label: 'Projects Completed' },
  { value: 25, prefix: '₹', suffix: 'L+', label: 'Funds Utilised' },
]

const tagline = 'Service. Leadership. Valor.'
const taglineLetters = tagline.split('')

const bgImage = '/images/photos/bg/hero-bg.png'

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
      <div className="absolute inset-0">
        <img
          src={bgImage}
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="absolute inset-0 pattern-maratha opacity-20" />
      <div className="absolute inset-0 pattern-fort opacity-10" />

      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[600px] lg:h-[600px]">
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
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display text-orange-400 mb-4 tracking-wide"
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
            className="text-base sm:text-lg md:text-xl font-semibold text-white max-w-2xl mb-8 sm:mb-12"
          >
            <span className="text-gold font-display text-3xl text-nowrap">
              Rotaract Club of Pune City Fortune
            </span> <br/>Driving Social Change Through Youth Leadership
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-6 mt-8"
          >
            <Link to="/join">
              <Button variant="primary" className="w-full sm:w-auto">
                Join Us →
              </Button>
            </Link>
            <Link to="/partner">
              <Button variant="secondary" className="w-full sm:w-auto">
                Partner With Us →
              </Button>
            </Link>
          </motion.div>

          {/* Animated impact counter overlay */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            className="grid grid-cols-3 gap-3 sm:gap-8 mt-12 sm:mt-16 w-full max-w-2xl bg-white/5 backdrop-blur-sm border border-gold/20 rounded-2xl px-4 py-5 sm:px-8 sm:py-6"
          >
            {heroImpact.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl sm:text-3xl md:text-4xl font-display text-gold">
                  <AnimatedCounter end={s.value} prefix={s.prefix || ''} suffix={s.suffix} />
                </div>
                <div className="text-[10px] sm:text-xs text-white/70 mt-1">{s.label}</div>
              </div>
            ))}
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