export type ReviewFormData = {
  note: number
  commentaire: string
}

export type ReviewFormErrors = Partial<Record<keyof ReviewFormData, string>>

export function validateReviewForm(data: ReviewFormData): ReviewFormErrors {
  const errors: ReviewFormErrors = {}

  if (!data.note) {
    errors.note = 'La note est obligatoire.'
  } else if (data.note < 1 || data.note > 5) {
    errors.note = 'La note doit être comprise entre 1 et 5.'
  }

  const trimmedComment = data.commentaire.trim()
  if (!trimmedComment) {
    errors.commentaire = 'Le commentaire est obligatoire.'
  } else if (trimmedComment.length < 10) {
    errors.commentaire = 'Le commentaire doit contenir au moins 10 caractères.'
  } else if (trimmedComment.length > 1000) {
    errors.commentaire = 'Le commentaire ne peut pas dépasser 1000 caractères.'
  }

  return errors
}
