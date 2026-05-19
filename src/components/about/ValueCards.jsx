import { useState } from 'react'
import { motion } from 'framer-motion'

const values = [
  {
    marathi: 'स्वराज्य',
    english: 'Leadership & Autonomy',
    description: 'We empower youth to lead their own initiatives and take ownership of community projects.',
    color: '#FF6B00',
  },
  {
    marathi: 'सेवा',
    english: 'Community Projects',
    description: 'Serving our community with dedication through education, health, and welfare programs.',
    color: '#C9A84C',
  },
  {
    marathi: 'पराक्रम',
    english: 'Courage & Bold Action',
    description: 'Taking bold steps to address social challenges with fearless determination.',
    color: '#FF6B00',
  },
{
    marathi: 'न्याय',
    english: 'DEI & Equal Opportunity',
    description: 'Ensuring equal opportunities and dignity for all, regardless of background.',
    color: '#C9A84C',
  },
  {
    marathi: 'धैर्य',
    english: 'Resilience',
    description: 'Persevering through challenges with unwavering commitment to our mission.',
    color: '#FF6B00',
  },
  {
    marathi: 'नीति',
    english: 'Ethics & Integrity',
    description: 'Maintaining the highest ethical standards in all our actions and decisions.',
    color: '#C9A84C',
  },
]

function ValueCards() {
  const [flipped, setFlipped] = useState(Array(values.length).fill(false))

  const toggleFlip = (index) => {
    const newFlipped = [...flipped]
    newFlipped[index] = !newFlipped[index]
    setFlipped(newFlipped)
  }

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-gold mb-4">
            Swarajya Values
          </h2>
          <p className="text-white/70 text-lg md:text-xl font-marathi">
            शिवाजी राजे भोसले — Chhatrapati Shivaji Maharaj
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.marathi}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => toggleFlip(index)}
              className="relative h-64 cursor-pointer perspective-1000"
            >
              <motion.div
                initial={false}
                animate={{ rotateY: flipped[index] ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full relative preserve-3d"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className="absolute inset-0 backface-hidden rounded-lg p-6 flex flex-col items-center justify-center border-2 border-gold/30"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <span
                    className="text-4xl md:text-5xl font-display mb-2"
                    style={{ color: value.color }}
                  >
                    {value.marathi}
                  </span>
                  <span className="text-white font-medium text-center">
                    {value.english}
                  </span>
                </div>

                <div
                  className="absolute inset-0 backface-hidden rounded-lg p-6 flex items-center justify-center border-2 border-gold/30"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <p className="text-white/80 text-sm text-center">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ValueCards