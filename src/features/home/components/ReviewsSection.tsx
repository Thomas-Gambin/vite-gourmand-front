import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ScrollReveal } from '../../../shared/components/motion/ScrollReveal'
import { getValidatedReviews } from '../services/reviewsService'
import type { Review } from '../types/review'
import { ReviewCard } from './ReviewCard'
import { SectionHeader } from './SectionHeader'

export function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    getValidatedReviews()
      .then((data) => {
        if (isMounted) {
          setReviews(data)
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section aria-labelledby="reviews-title" className="py-8">
      <SectionHeader
        eyebrow="Témoignages"
        title="Avis clients validés"
        description="Retours de clients ayant fait appel à nos prestations. Seuls les avis validés sont affichés."
        align="center"
        titleId="reviews-title"
      />

      {isLoading ? (
        <ScrollReveal className="mt-12">
          <div className="flex justify-center gap-2" role="status" aria-live="polite">
            <span className="sr-only">Chargement des avis…</span>
            {[0, 1, 2].map((dot) => (
              <motion.span
                key={dot}
                className="h-2.5 w-2.5 rounded-full bg-brand/40"
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1, 0.85] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: dot * 0.15,
                  ease: 'easeInOut',
                }}
                aria-hidden="true"
              />
            ))}
          </div>
        </ScrollReveal>
      ) : reviews.length === 0 ? (
        <ScrollReveal className="mt-12">
          <p className="rounded-2xl border border-dashed border-border bg-surface-muted px-6 py-10 text-center text-sm text-text-muted">
            Aucun avis validé pour le moment.
          </p>
        </ScrollReveal>
      ) : (
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <li key={review.id} className="h-full">
              <ReviewCard review={review} index={index} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
