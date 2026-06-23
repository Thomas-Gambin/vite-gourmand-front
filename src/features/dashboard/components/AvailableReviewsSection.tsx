import { useCallback, useEffect, useState } from 'react'
import { getAvailableReviews } from '../api/reviewsApi'
import type { AvailableReview } from '../types/dashboard'
import { formatDateFr } from '../utils/orderStatus'
import { parseApiError } from '../utils/parseApiError'
import { ReviewForm } from './ReviewForm'

const primaryButtonClassName =
  'inline-flex cursor-pointer items-center justify-center rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2'

type AvailableReviewsSectionProps = {
  refreshKey?: number
}

export function AvailableReviewsSection({ refreshKey = 0 }: AvailableReviewsSectionProps) {
  const [reviews, setReviews] = useState<AvailableReview[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [activeReviewId, setActiveReviewId] = useState<number | null>(null)

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

  function handleSuccess() {
    setSuccess('Votre avis a été envoyé et sera publié après validation.')
    setActiveReviewId(null)
    void loadReviews()
  }

  return (
    <section aria-labelledby="reviews-section-title" className="rounded-2xl border border-border/60 bg-surface-elevated p-6 shadow-sm sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Avis</p>
      <h2 id="reviews-section-title" className="mt-2 text-xl font-bold text-text">
        Avis disponibles
      </h2>
      <p className="mt-2 text-sm text-text-muted">
        Laissez un avis sur vos commandes terminées. Il sera visible publiquement après validation par notre équipe.
      </p>

      {success && (
        <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800" role="status">
          {success}
        </p>
      )}

      {isLoading && (
        <p className="mt-6 text-sm text-text-muted" role="status">
          Chargement…
        </p>
      )}

      {error && (
        <p className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800" role="alert">
          {error}
        </p>
      )}

      {!isLoading && !error && reviews.length === 0 && (
        <p className="mt-6 text-sm text-text-muted">Aucun avis disponible pour le moment.</p>
      )}

      {!isLoading && reviews.length > 0 && (
        <ul className="mt-6 space-y-4">
          {reviews.map((review) => (
            <li key={review.commandeId} className="rounded-xl border border-border/60 bg-surface p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-text">{review.numeroCommande}</p>
                  <p className="mt-1 text-sm text-text-muted">{review.menuTitre}</p>
                  <p className="mt-1 text-sm text-text-muted">
                    Prestation le {formatDateFr(review.datePrestation)}
                  </p>
                </div>
                {activeReviewId !== review.commandeId && (
                  <button
                    type="button"
                    className={primaryButtonClassName}
                    onClick={() => {
                      setActiveReviewId(review.commandeId)
                      setSuccess(null)
                    }}
                  >
                    Donner mon avis
                  </button>
                )}
              </div>

              {activeReviewId === review.commandeId && (
                <ReviewForm
                  review={review}
                  onSuccess={handleSuccess}
                  onCancel={() => setActiveReviewId(null)}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
