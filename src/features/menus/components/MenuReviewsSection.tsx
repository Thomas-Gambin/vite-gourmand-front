import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ReviewCard } from '../../home/components/ReviewCard'
import type { Review } from '../../home/types/review'
import { ScrollReveal } from '../../../shared/components/motion/ScrollReveal'
import { menuDetailSectionClassName } from '../menuDetailUi'
import { getMenuReviews } from '../api/menuReviewsApi'
import { MenuSectionHeader } from './MenuSectionHeader'

type MenuReviewsSectionProps = {
  menuId: number
}

export function MenuReviewsSection({ menuId }: MenuReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [averageRating, setAverageRating] = useState<number | null>(null)
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [trackedMenuId, setTrackedMenuId] = useState(menuId)
  if (trackedMenuId !== menuId) {
    setTrackedMenuId(menuId)
    setReviews([])
    setAverageRating(null)
    setTotalCount(0)
    setError(null)
    setIsLoading(true)
  }

  useEffect(() => {
    let isMounted = true

    getMenuReviews(menuId)
      .then((data) => {
        if (!isMounted) return
        setReviews(data.reviews)
        setAverageRating(data.averageRating)
        setTotalCount(data.totalCount)
      })
      .catch(() => {
        if (isMounted) {
          setError('Impossible de charger les avis pour ce menu.')
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
  }, [menuId])

  if (isLoading) {
    return (
      <ScrollReveal>
        <div className={`${menuDetailSectionClassName} animate-pulse`}>
          <div className="h-4 w-28 rounded-lg bg-surface-muted" />
          <div className="mt-3 h-8 w-48 rounded-xl bg-surface-muted" />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="h-40 rounded-2xl bg-surface-muted" />
            <div className="h-40 rounded-2xl bg-surface-muted" />
          </div>
        </div>
      </ScrollReveal>
    )
  }

  if (error) {
    return (
      <ScrollReveal>
        <p
          className="rounded-3xl border border-rose-200/70 bg-rose-50/80 px-6 py-10 text-center text-sm text-rose-800"
          role="alert"
        >
          {error}
        </p>
      </ScrollReveal>
    )
  }

  if (totalCount === 0) {
    return (
      <ScrollReveal>
        <section
          aria-labelledby="menu-reviews-title"
          className={`${menuDetailSectionClassName} border-dashed text-center`}
        >
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-muted text-brand">
            <Star className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          </span>
          <MenuSectionHeader
            eyebrow="Témoignages"
            title="Avis clients"
            titleId="menu-reviews-title"
            description="Aucun avis validé pour ce menu pour le moment. Soyez le premier à partager votre expérience après votre commande."
            align="center"
          />
        </section>
      </ScrollReveal>
    )
  }

  return (
    <ScrollReveal>
      <section aria-labelledby="menu-reviews-title" className={menuDetailSectionClassName}>
        <div className="flex flex-wrap items-start justify-between gap-6">
          <MenuSectionHeader
            eyebrow="Témoignages"
            title="Avis clients"
            titleId="menu-reviews-title"
            description={`${totalCount} avis validé${totalCount > 1 ? 's' : ''} sur ce menu`}
          />

          {averageRating !== null && (
            <div className="flex items-center gap-4 rounded-2xl border border-brand/15 bg-gradient-to-br from-brand-muted/80 to-surface-elevated px-5 py-4 shadow-sm">
              <p className="text-3xl font-bold tabular-nums leading-none text-brand">
                {averageRating.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
              </p>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">sur 5</p>
                <p className="mt-0.5 text-sm font-medium text-text">Note moyenne</p>
              </div>
            </div>
          )}
        </div>

        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          {reviews.map((review, index) => (
            <motion.li
              key={review.id}
              className="h-full"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <ReviewCard review={review} index={index} />
            </motion.li>
          ))}
        </ul>
      </section>
    </ScrollReveal>
  )
}
