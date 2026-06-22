import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none'

type ScrollRevealProps = Omit<HTMLMotionProps<'div'>, 'children'> & {
  children: ReactNode
  delay?: number
  direction?: RevealDirection
  duration?: number
  once?: boolean
}

const directionOffsets: Record<RevealDirection, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: -40, y: 0 },
  right: { x: 40, y: 0 },
  none: { x: 0, y: 0 },
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 0.65,
  once = true,
  ...props
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const offset = directionOffsets[direction]

  return (
    <motion.div
      className={className}
      initial={
        prefersReducedMotion
          ? false
          : { opacity: 0, x: offset.x, y: offset.y, filter: 'blur(6px)' }
      }
      whileInView={
        prefersReducedMotion
          ? undefined
          : { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }
      }
      viewport={{ once, margin: '-60px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
