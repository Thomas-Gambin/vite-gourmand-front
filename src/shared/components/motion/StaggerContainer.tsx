import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

type StaggerContainerProps = Omit<HTMLMotionProps<'div'>, 'children'> & {
  children: ReactNode
  stagger?: number
  delayChildren?: number
}

export function StaggerContainer({
  children,
  className,
  stagger = 0.1,
  delayChildren = 0.1,
  ...props
}: StaggerContainerProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate={prefersReducedMotion ? undefined : 'visible'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
}

type StaggerItemProps = Omit<HTMLMotionProps<'div'>, 'children'> & {
  children: ReactNode
}

export function StaggerItem({ children, className, ...props }: StaggerItemProps) {
  return (
    <motion.div className={className} variants={staggerItemVariants} {...props}>
      {children}
    </motion.div>
  )
}
