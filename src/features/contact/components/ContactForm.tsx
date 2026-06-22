import { AlertCircle, CheckCircle2, Send } from 'lucide-react'
import { type FormEvent, useId, useState } from 'react'
import {
  CONTACT_ERROR_MESSAGE,
  CONTACT_SUCCESS_MESSAGE,
  ContactServiceError,
  sendContactMessage,
} from '../services/contactService'
import type { ContactFieldErrors, ContactFormData } from '../types/contact'
import { validateContactForm } from '../utils/validateContactForm'

const inputClassName =
  'w-full rounded-xl border border-border/80 bg-surface px-4 py-3.5 text-sm text-text transition placeholder:text-text-muted/70 focus-visible:border-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60'

const emptyFormData: ContactFormData = {
  title: '',
  email: '',
  description: '',
}

type GlobalMessage = {
  type: 'success' | 'error'
  text: string
}

export function ContactForm() {
  const formId = useId()
  const titleId = `${formId}-title`
  const emailId = `${formId}-email`
  const descriptionId = `${formId}-description`
  const titleErrorId = `${formId}-title-error`
  const emailErrorId = `${formId}-email-error`
  const descriptionErrorId = `${formId}-description-error`

  const [formData, setFormData] = useState<ContactFormData>(emptyFormData)
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({})
  const [globalMessage, setGlobalMessage] = useState<GlobalMessage | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function updateField(field: keyof ContactFormData, value: string) {
    setFormData((current) => ({ ...current, [field]: value }))

    if (fieldErrors[field]) {
      setFieldErrors((current) => {
        const next = { ...current }
        delete next[field]
        return next
      })
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setGlobalMessage(null)
    setFieldErrors({})

    const errors = validateContactForm(formData)

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    setIsSubmitting(true)

    try {
      await sendContactMessage(formData)
      setFormData(emptyFormData)
      setGlobalMessage({ type: 'success', text: CONTACT_SUCCESS_MESSAGE })
    } catch (error) {
      if (error instanceof ContactServiceError && error.fieldErrors) {
        setFieldErrors(error.fieldErrors)
      }

      setGlobalMessage({
        type: 'error',
        text: error instanceof ContactServiceError ? error.message : CONTACT_ERROR_MESSAGE,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-gradient-to-br from-surface-elevated via-surface-elevated to-brand-muted/20 p-6 shadow-xl shadow-brand/5 sm:p-8"
    >
      <div
        className="pointer-events-none absolute -left-12 -bottom-12 h-40 w-40 rounded-full bg-brand/5 blur-2xl"
        aria-hidden="true"
      />

      <div className="relative">
        <h2 className="text-lg font-semibold tracking-tight text-text">Envoyez-nous un message</h2>
        <p className="mt-1 text-sm text-text-muted">
          Remplissez le formulaire ci-dessous, nous vous répondrons rapidement.
        </p>

        {globalMessage ? (
          <p
            role="alert"
            className={`mt-5 flex items-start gap-2.5 rounded-xl border px-4 py-3.5 text-sm ${
              globalMessage.type === 'success'
                ? 'border-brand/20 bg-brand-muted/80 text-text'
                : 'border-brand/30 bg-brand-muted text-text'
            }`}
          >
            {globalMessage.type === 'success' ? (
              <CheckCircle2
                className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                aria-hidden="true"
                strokeWidth={1.75}
              />
            ) : (
              <AlertCircle
                className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                aria-hidden="true"
                strokeWidth={1.75}
              />
            )}
            <span>{globalMessage.text}</span>
          </p>
        ) : null}

        <div className="mt-6 space-y-5">
          <div>
            <label htmlFor={titleId} className="mb-2 block text-sm font-medium text-text">
              Titre
            </label>
            <input
              id={titleId}
              type="text"
              name="title"
              value={formData.title}
              placeholder="Objet de votre message"
              aria-invalid={fieldErrors.title ? true : undefined}
              aria-describedby={fieldErrors.title ? titleErrorId : undefined}
              disabled={isSubmitting}
              onChange={(event) => updateField('title', event.target.value)}
              className={`${inputClassName} ${fieldErrors.title ? 'border-brand' : ''}`}
            />
            {fieldErrors.title ? (
              <p
                id={titleErrorId}
                className="mt-2 flex items-start gap-1.5 text-sm text-brand"
                role="alert"
              >
                <AlertCircle
                  className="mt-0.5 h-4 w-4 shrink-0"
                  aria-hidden="true"
                  strokeWidth={1.75}
                />
                <span>{fieldErrors.title}</span>
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor={emailId} className="mb-2 block text-sm font-medium text-text">
              Email
            </label>
            <input
              id={emailId}
              type="email"
              name="email"
              value={formData.email}
              placeholder="votre@email.com"
              autoComplete="email"
              aria-invalid={fieldErrors.email ? true : undefined}
              aria-describedby={fieldErrors.email ? emailErrorId : undefined}
              disabled={isSubmitting}
              onChange={(event) => updateField('email', event.target.value)}
              className={`${inputClassName} ${fieldErrors.email ? 'border-brand' : ''}`}
            />
            {fieldErrors.email ? (
              <p
                id={emailErrorId}
                className="mt-2 flex items-start gap-1.5 text-sm text-brand"
                role="alert"
              >
                <AlertCircle
                  className="mt-0.5 h-4 w-4 shrink-0"
                  aria-hidden="true"
                  strokeWidth={1.75}
                />
                <span>{fieldErrors.email}</span>
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor={descriptionId} className="mb-2 block text-sm font-medium text-text">
              Description
            </label>
            <textarea
              id={descriptionId}
              name="description"
              value={formData.description}
              placeholder="Décrivez votre demande..."
              rows={6}
              aria-invalid={fieldErrors.description ? true : undefined}
              aria-describedby={fieldErrors.description ? descriptionErrorId : undefined}
              disabled={isSubmitting}
              onChange={(event) => updateField('description', event.target.value)}
              className={`${inputClassName} min-h-[9rem] resize-y ${fieldErrors.description ? 'border-brand' : ''}`}
            />
            {fieldErrors.description ? (
              <p
                id={descriptionErrorId}
                className="mt-2 flex items-start gap-1.5 text-sm text-brand"
                role="alert"
              >
                <AlertCircle
                  className="mt-0.5 h-4 w-4 shrink-0"
                  aria-hidden="true"
                  strokeWidth={1.75}
                />
                <span>{fieldErrors.description}</span>
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-7">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-medium text-surface-elevated shadow-lg shadow-brand/20 transition hover:-translate-y-0.5 hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:translate-y-0 disabled:bg-brand/40 disabled:shadow-none sm:w-auto"
          >
            {isSubmitting ? (
              'Envoi en cours...'
            ) : (
              <>
                Envoyer
                <Send
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                  strokeWidth={1.75}
                />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
