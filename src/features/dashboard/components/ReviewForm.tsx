import { useState } from 'react'
import { createOrderReview } from '../api/reviewsApi'
import type { AvailableReview } from '../types/dashboard'
import { parseApiError } from '../utils/parseApiError'

const inputClassName =
  'mt-2 w-full rounded-xl border border-border/80 bg-surface px-4 py-3.5 text-sm text-text transition focus-visible:border-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2'

const primaryButtonClassName =
  'inline-flex cursor-pointer items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60'

type ReviewFormProps = {
  review: AvailableReview
  onSuccess: () => void
  onCancel: () => void
}

type FormErrors = {
  note?: string
  commentaire?: string
}

export function ReviewForm({ review, onSuccess, onCancel }: ReviewFormProps) {
  const [note, setNote] = useState(0)
  const [commentaire, setCommentaire] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function validate(): FormErrors {
    const next: FormErrors = {}
    if (!note || note < 1 || note > 5) next.note = 'La note doit être comprise entre 1 et 5.'
    if (!commentaire.trim()) next.commentaire = 'Le commentaire est obligatoire.'
    return next
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const validation = validate()
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
      if (apiError.fields) setErrors(apiError.fields as FormErrors)
      setFormError(apiError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      className="mt-4 rounded-xl border border-border/60 bg-surface p-4"
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby={`review-form-${review.commandeId}`}
    >
      <h3 id={`review-form-${review.commandeId}`} className="font-semibold text-text">
        Votre avis — {review.numeroCommande}
      </h3>

      {formError && (
        <p className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800" role="alert">
          {formError}
        </p>
      )}

      <fieldset className="mt-4">
        <legend className="text-sm font-medium text-text">
          Note <span className="text-rose-600">*</span>
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setNote(value)
                setErrors((prev) => ({ ...prev, note: undefined }))
              }}
              aria-pressed={note === value}
              className={[
                'cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
                note === value ? 'bg-brand text-white' : 'bg-surface-muted text-text-muted hover:bg-brand-muted',
              ].join(' ')}
            >
              {value}
            </button>
          ))}
        </div>
        {errors.note && (
          <p className="mt-1.5 text-sm text-rose-700" role="alert">
            {errors.note}
          </p>
        )}
      </fieldset>

      <div className="mt-4">
        <label htmlFor={`commentaire-${review.commandeId}`} className="text-sm font-medium text-text">
          Commentaire <span className="text-rose-600">*</span>
        </label>
        <textarea
          id={`commentaire-${review.commandeId}`}
          rows={4}
          className={`${inputClassName} resize-y ${errors.commentaire ? 'border-rose-300' : ''}`}
          value={commentaire}
          onChange={(e) => {
            setCommentaire(e.target.value)
            setErrors((prev) => ({ ...prev, commentaire: undefined }))
          }}
        />
        {errors.commentaire && (
          <p className="mt-1.5 text-sm text-rose-700" role="alert">
            {errors.commentaire}
          </p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button type="submit" className={primaryButtonClassName} disabled={isSubmitting}>
          {isSubmitting ? 'Envoi…' : 'Envoyer mon avis'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="cursor-pointer rounded-full border border-border px-4 py-2 text-sm font-medium text-text hover:border-brand/30"
        >
          Annuler
        </button>
      </div>
    </form>
  )
}
