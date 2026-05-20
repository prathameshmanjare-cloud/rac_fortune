import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import LogoSvg from '../../../logo.svg'

const avenues = [
  { name: 'Community', color: '#FF6B00' },
  { name: 'Professional', color: '#C9A84C' },
  { name: 'Club', color: '#0B0A0A' },
  { name: 'International', color: '#2D2D2D' },
  { name: 'DEI', color: '#5A5A5A' },
]

function AboutSnapshot() {
  const [hoveredAvenue, setHoveredAvenue] = useState(null)
  const orbitRef = useRef(null)
  const [size, setSize] = useState(0)

  useEffect(() => {
    const updateSize = () => {
      if (orbitRef.current) {
        setSize(orbitRef.current.offsetWidth)
      }
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const center = size / 2
  const outerRadius = size * 0.42
  const innerRadius = size * 0.25
  const itemSize = Math.max(56, size * 0.18)
  const centerSize = Math.max(72, size * 0.24)
  const logoSize = Math.max(50, size * 0.17)

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="border-l-4 border-gold pl-6"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary mb-4">
              About Our Club
            </h2>
            <p className="text-secondary-mid text-base md:text-lg leading-relaxed mb-4">
              Rotaract Club of Pune City Fortune is a dynamic youth organization under Rotary International District 3131, rooted in the timeless values of Chhatrapati Shivaji Maharaj — Swarajya, Seva, and Parakram.
            </p>
            <p className="text-secondary-mid text-base md:text-lg leading-relaxed mb-4">
              We are young leaders, aged 18–30, from Pune, committed to community service, professional excellence, and making Swarajya a living reality in our city.
            </p>
            <p className="text-gold font-marathi text-lg md:text-xl mb-4">
              स्वराज्य व्हावे ही तो श्रींची इच्छा आहे
            </p>
            <p className="text-secondary-muted text-sm">
              "Let Swarajya be achieved — this is Shivaji's wish"
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div
              ref={orbitRef}
              className="relative w-full max-w-[400px] mx-auto aspect-square"
            >
              {size > 0 && (
                <>
                  <div
                    className="absolute rounded-full border border-[#C9A84C]/30"
                    style={{
                      top: '50%',
                      left: '50%',
                      width: outerRadius * 2,
                      height: outerRadius * 2,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />

                  <div
                    className="absolute rounded-full border border-dashed border-[#C9A84C]/40"
                    style={{
                      top: '50%',
                      left: '50%',
                      width: innerRadius * 2,
                      height: innerRadius * 2,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />

                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: `${center}px ${center}px` }}
                  >
                    {avenues.map((avenue, index) => {
                      const angle = (index * 72 - 90) * (Math.PI / 180)
                      const x = center + outerRadius * Math.cos(angle) - itemSize / 2
                      const y = center + outerRadius * Math.sin(angle) - itemSize / 2
                      return (
                        <motion.div
                          key={avenue.name}
                          className="absolute rounded-full cursor-pointer flex items-center justify-center"
                          style={{
                            left: x,
                            top: y,
                            width: itemSize,
                            height: itemSize,
                            background: hoveredAvenue === index ? avenue.color : '#FAF6EF',
                            border: `3px solid ${avenue.color}`,
                            boxShadow: hoveredAvenue === index ? `0_0_25px_${avenue.color}` : 'none',
                          }}
                          onMouseEnter={() => setHoveredAvenue(index)}
                          onMouseLeave={() => setHoveredAvenue(null)}
                          whileHover={{ scale: 1.15 }}
                        >
                          <span
                            className="text-[10px] font-bold leading-tight text-center px-1"
                            style={{
                              color: hoveredAvenue === index ? '#FFF' : avenue.color,
                              fontFamily: 'Montserrat',
                            }}
                          >
                            {avenue.name}
                          </span>
                        </motion.div>
                      )
                    })}
                  </motion.div>

                  <div
                    className="absolute rounded-full bg-white border-2 border-[#C9A84C] flex items-center justify-center shadow-lg"
                    style={{
                      top: '50%',
                      left: '50%',
                      width: centerSize,
                      height: centerSize,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <img
                      src={LogoSvg}
                      alt="RAC Logo"
                      className="object-contain"
                      style={{ width: logoSize, height: logoSize }}
                    />
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSnapshot
