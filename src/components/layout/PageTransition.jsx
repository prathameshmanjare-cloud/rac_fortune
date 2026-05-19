import { motion, useReducedMotion } from 'framer-motion'

function PageTransition({ children }) {
  const shouldReduceMotion = useReducedMotion()

  const variants = {
    initial: shouldReduceMotion
      ? { opacity: 0 }
      : {
          scaleY: 0,
          opacity: 0,
        },
    animate: shouldReduceMotion
      ? { opacity: 1 }
      : {
          scaleY: 1,
          opacity: 1,
          transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          },
        },
    exit: shouldReduceMotion
      ? { opacity: 0 }
      : {
          scaleY: 0,
          opacity: 0,
          transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          },
        },
  }

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        transformOrigin: 'top',
      }}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition