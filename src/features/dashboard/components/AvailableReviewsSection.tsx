import { AnimatePresence, motion } from 'framer-motion'
import { CalendarDays, CheckCircle2, Sparkles, Star, UtensilsCrossed } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { getAvailableReviews } from '../api/reviewsApi'
import {
  dashboardPanelClassName,
  dashboardPrimaryButtonClassName,
} from '../dashboardUi'
import type { AvailableReview } from '../types/dashboard'
import { formatDateFr } from '../utils/orderStatus'
import { parseApiError } from '../utils/parseApiError'
import { ReviewForm } from './ReviewForm'

const SUCCESS_MESSAGE =
  'Merci pour votre avis. Il sera publié après validation par notre équipe.'

type AvailableReviewsSectionProps = {
  initialActiveReviewId?: number | null
  refreshKey?: number
  onReviewSuccess?: () => void
}

function ReviewCardSkeleton() {
  return (
    <li className="animate-pulse rounded-2xl border border-border/40 bg-surface p-6">
      <div className="h-4 w-36 rounded-lg bg-surface-muted" />
      <div className="mt-3 h-3 w-48 rounded-lg bg-surface-muted" />
      <div className="mt-2 h-3 w-32 rounded-lg bg-surface-muted" />
      <div className="mt-5 h-9 w-32 rounded-full bg-surface-muted" />
    </li>
  )
}

export function AvailableReviewsSection({
  initialActiveReviewId = null,
  refreshKey = 0,
  onReviewSuccess,
}: AvailableReviewsSectionProps) {
  const [reviews, setReviews] = useState<AvailableReview[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [activeReviewId, setActiveReviewId] = useState<number | null>(initialActiveReviewId)

  const loadReviews = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await getAvailableReviews()
      setReviews(response.reviews)
    } catch (err) {
      setError(parseApiError(err).message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadReviews()
  }, [loadReviews, refreshKey])

  useEffect(() => {
    if (initialActiveReviewId === null) return
    setActiveReviewId(initialActiveReviewId)
  }, [initialActiveReviewId])

  useEffect(() => {
    if (isLoading || initialActiveReviewId === null) return
    const isAvailable = reviews.some((review) => review.commandeId === initialActiveReviewId)
    if (isAvailable) {
      setActiveReviewId(initialActiveReviewId)
    }
  }, [isLoading, reviews, initialActiveReviewId])

  function handleSuccess() {
    setSuccess(SUCCESS_MESSAGE)
    setActiveReviewId(null)
    onReviewSuccess?.()
    void loadReviews()
  }

  return (
    <section aria-labelledby="reviews-section-title" className={dashboardPanelClassName}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-muted to-brand/10 text-brand shadow-inner">
            <Star className="h-5 w-5 fill-brand/20" strokeWidth={1.75} aria-hidden />
          </span>
          <div>
            <h2 id="reviews-section-title" className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
              Avis disponibles
            </h2>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-text-muted">
              Partagez votre expérience sur vos commandes terminées. Votre avis sera publié après validation par notre
              équipe.
            </p>
          </div>
        </div>

        {!isLoading && reviews.length > 0 && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/15 bg-brand-muted/60 px-3.5 py-1.5 text-xs font-semibold text-brand">
            <Sparkles className="h-3.5 w-3.5" aria-hidden strokeWidth={1.75} />
            {reviews.length} commande{reviews.length > 1 ? 's' : ''} à noter
          </span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {success && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-200/80 bg-gradient-to-r from-emerald-50 to-emerald-50/40 px-4 py-4"
            role="status"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" strokeWidth={1.75} aria-hidden />
            <p className="text-sm leading-relaxed text-emerald-900">{success}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading && (
        <ul className="mt-8 space-y-4" aria-hidden>
          <ReviewCardSkeleton />
          <ReviewCardSkeleton />
        </ul>
      )}

      {error && (
        <p
          className="mt-6 rounded-2xl border border-rose-200/80 bg-rose-50/80 px-4 py-4 text-sm text-rose-800"
          role="alert"
        >
          {error}
        </p>
      )}

      {!isLoading && !error && reviews.length === 0 && (
        <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-border/80 bg-surface-muted/40 px-6 py-14 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-elevated text-text-muted shadow-sm">
            <Star className="h-6 w-6" strokeWidth={1.5} aria-hidden />
          </span>
          <p className="mt-4 text-sm font-medium text-text">Aucun avis disponible pour le moment</p>
          <p className="mt-1 max-w-sm text-sm text-text-muted">
            Lorsque vos commandes seront terminées, vous pourrez laisser un avis ici.
          </p>
        </div>
      )}

      {!isLoading && reviews.length > 0 && (
        <ul className="mt-8 space-y-4">
          {reviews.map((review, index) => {
            const isActive = activeReviewId === review.commandeId

            return (
              <motion.li
                key={review.commandeId}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className={[
                  'overflow-hidden rounded-2xl border transition-shadow duration-300',
                  isActive
                    ? 'border-brand/25 bg-gradient-to-b from-surface-elevated to-brand-muted/20 shadow-lg shadow-brand/10'
                    : 'border-border/50 bg-surface-elevated shadow-sm hover:border-brand/15 hover:shadow-md',
                ].join(' ')}
              >
                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold tracking-tight text-text">{review.numeroCommande}</p>
                      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
                        <span className="inline-flex items-center gap-2 text-sm text-text-muted">
                          <UtensilsCrossed className="h-4 w-4 shrink-0 text-brand/70" strokeWidth={1.75} aria-hidden />
                          {review.menuTitre}
                        </span>
                        <span className="inline-flex items-center gap-2 text-sm text-text-muted">
                          <CalendarDays className="h-4 w-4 shrink-0 text-brand/70" strokeWidth={1.75} aria-hidden />
                          Prestation le {formatDateFr(review.datePrestation)}
                        </span>
                      </div>
                    </div>

                    {!isActive && (
                      <button
                        type="button"
                        className={dashboardPrimaryButtonClassName}
                        onClick={() => {
                          setActiveReviewId(review.commandeId)
                          setSuccess(null)
                        }}
                      >
                        <Star className="h-4 w-4 fill-white/30" strokeWidth={1.75} aria-hidden />
                        Donner mon avis
                      </button>
                    )}
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        key="form"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <ReviewForm
                          review={review}
                          onSuccess={handleSuccess}
                          onCancel={() => setActiveReviewId(null)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
