import { motion, useReducedMotion } from 'framer-motion'
import { StarRating } from '../../../shared/components/StarRating'
import type { Review } from '../types/review'

type ReviewCardProps = {
  review: Review
  index?: number
}

export function ReviewCard({ review, index = 0 }: ReviewCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const author = review.author.trim() || 'Client anonyme'

  return (
    <motion.article
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-surface-elevated p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-brand/10"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
    >
      <span
        className="pointer-events-none absolute -right-2 -top-4 text-7xl font-serif leading-none text-brand/10"
        aria-hidden="true"
      >
        &ldquo;
      </span>
      <StarRating rating={review.rating} />
      <blockquote className="relative mt-5 flex-1 text-sm leading-relaxed text-text-muted sm:text-base">
        <p>{review.comment}</p>
      </blockquote>
      <footer className="mt-6 flex items-center gap-3 border-t border-border/70 pt-4">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-muted text-xs font-semibold text-brand"
          aria-hidden="true"
        >
          {author.charAt(0).toUpperCase()}
        </span>
        <cite className="text-sm font-medium not-italic text-text">{author}</cite>
      </footer>
    </motion.article>
  )
}
