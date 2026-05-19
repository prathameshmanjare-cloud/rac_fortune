import { motion } from 'framer-motion'

const buttonVariants = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  secondary: 'bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-secondary',
  dark: 'bg-secondary text-white hover:bg-secondary-mid',
}

function Button({
  children,
  variant = 'primary',
  className = '',
  href,
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    px-6 py-3 rounded-lg font-semibold text-sm
    transition-colors duration-300
    min-h-[44px] min-w-[44px]
    disabled:opacity-50 disabled:cursor-not-allowed
  `

  const variantStyles = buttonVariants[variant]

  const Component = href ? motion.a : motion.button

  return (
    <Component
      href={href}
      onClick={onClick}
      type={href ? undefined : type}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Button