import type { ContactFieldErrors, ContactFormData } from '../types/contact'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContactForm(data: ContactFormData): ContactFieldErrors {
  const errors: ContactFieldErrors = {}

  const title = data.title.trim()
  if (title.length < 3 || title.length > 100) {
    errors.title = 'Le titre doit contenir entre 3 et 100 caractères.'
  }

  const email = data.email.trim()
  if (!email || !EMAIL_PATTERN.test(email)) {
    errors.email = 'Veuillez saisir une adresse email valide.'
  }

  const description = data.description.trim()
  if (description.length < 10 || description.length > 1000) {
    errors.description = 'La description doit contenir entre 10 et 1000 caractères.'
  }

  return errors
}
