import { useState } from 'react'
import { Loader2, MessageSquare, Send } from 'lucide-react'
import { StarRatingInput } from '../../../shared/components/StarRatingInput'
import { createOrderReview } from '../api/reviewsApi'
import {
  dashboardPrimaryButtonClassName,
  dashboardSecondaryButtonClassName,
  dashboardTextareaClassName,
} from '../dashboardUi'
import type { AvailableReview } from '../types/dashboard'
import { parseApiError } from '../utils/parseApiError'
import { validateReviewForm, type ReviewFormErrors } from '../utils/validateReviewForm'

const MIN_COMMENT_LENGTH = 10
const MAX_COMMENT_LENGTH = 1000

type ReviewFormProps = {
  review: AvailableReview
  onSuccess: () => void
  onCancel: () => void
}

export function ReviewForm({ review, onSuccess, onCancel }: ReviewFormProps) {
  const [note, setNote] = useState(0)
  const [commentaire, setCommentaire] = useState('')
  const [errors, setErrors] = useState<ReviewFormErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const trimmedLength = commentaire.trim().length
  const isCommentValid = trimmedLength >= MIN_COMMENT_LENGTH

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const validation = validateReviewForm({ note, commentaire })
    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      return
    }

    setIsSubmitting(true)
    setFormError(null)

    try {
      await createOrderReview(review.commandeId, { note, commentaire: commentaire.trim() })
      onSuccess()
    } catch (error) {
      const apiError = parseApiError(error)
      if (apiError.fields) setErrors(apiError.fields as ReviewFormErrors)
      setFormError(apiError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      className="border-t border-border/50 pt-6"
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby={`review-form-${review.commandeId}`}
    >
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-muted text-brand">
          <MessageSquare className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        </span>
        <h3 id={`review-form-${review.commandeId}`} className="text-base font-semibold text-text">
          Partagez votre expérience
        </h3>
      </div>

      {formError && (
        <p
          className="mt-4 rounded-2xl border border-rose-200/80 bg-rose-50/80 px-4 py-3 text-sm text-rose-800"
          role="alert"
        >
          {formError}
        </p>
      )}

      <fieldset className="mt-5">
        <legend className="text-sm font-medium text-text">
          Votre note <span className="text-brand">*</span>
        </legend>
        <StarRatingInput
          id={`note-${review.commandeId}`}
          value={note}
          error={errors.note}
          onChange={(value) => {
            setNote(value)
            setErrors((prev) => ({ ...prev, note: undefined }))
          }}
        />
      </fieldset>

      <div className="mt-5">
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor={`commentaire-${review.commandeId}`} className="text-sm font-medium text-text">
            Votre commentaire <span className="text-brand">*</span>
          </label>
          <span
            className={[
              'text-xs tabular-nums transition-colors',
              trimmedLength > 0 && !isCommentValid ? 'text-amber-700' : 'text-text-muted',
            ].join(' ')}
            aria-live="polite"
          >
            {trimmedLength}/{MAX_COMMENT_LENGTH}
          </span>
        </div>
        <textarea
          id={`commentaire-${review.commandeId}`}
          rows={4}
          maxLength={MAX_COMMENT_LENGTH}
          placeholder="Décrivez votre expérience : qualité des plats, ponctualité, présentation…"
          className={[
            dashboardTextareaClassName,
            errors.commentaire ? 'border-rose-300 ring-2 ring-rose-100' : '',
          ].join(' ')}
          value={commentaire}
          onChange={(e) => {
            setCommentaire(e.target.value)
            setErrors((prev) => ({ ...prev, commentaire: undefined }))
          }}
        />
        {errors.commentaire ? (
          <p className="mt-2 text-sm text-rose-700" role="alert">
            {errors.commentaire}
          </p>
        ) : (
          <p className="mt-2 text-xs text-text-muted">Minimum {MIN_COMMENT_LENGTH} caractères.</p>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button type="submit" className={dashboardPrimaryButtonClassName} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Envoi en cours…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden />
              Envoyer mon avis
            </>
          )}
        </button>
        <button type="button" onClick={onCancel} className={dashboardSecondaryButtonClassName} disabled={isSubmitting}>
          Annuler
        </button>
      </div>
    </form>
  )
}
