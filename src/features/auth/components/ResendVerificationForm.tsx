import { type FormEvent, useState } from 'react'
import { resendVerificationEmail } from '../api/resendVerification'

type ResendVerificationFormProps = {
  initialEmail?: string
}

const inputClassName =
  'mt-2 w-full rounded-xl border border-border/80 bg-surface px-4 py-3.5 text-sm text-text transition placeholder:text-text-muted/70 focus-visible:border-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60'

export function ResendVerificationForm({ initialEmail = '' }: ResendVerificationFormProps) {
  const [email, setEmail] = useState(initialEmail)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successHint, setSuccessHint] = useState<string | null>(null)

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (status === 'loading') return

    const trimmed = email.trim()
    if (!trimmed) {
      setErrorMessage('Indiquez votre adresse email.')
      setStatus('error')
      return
    }

    setStatus('loading')
    setErrorMessage(null)
    setSuccessHint(null)

    try {
      const response = await resendVerificationEmail({ email: trimmed.toLowerCase() })
      setSuccessHint(response.message)
      setStatus('success')
    } catch (error) {
      setStatus('error')
      if (error instanceof Error) {
        try {
          const parsed = JSON.parse(error.message) as { message?: string }
          setErrorMessage(parsed.message ?? 'Une erreur est survenue.')
        } catch {
          setErrorMessage(error.message || 'Une erreur est survenue.')
        }
      } else {
        setErrorMessage('Une erreur est survenue.')
      }
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="resend-email" className="text-sm font-semibold text-text">
          Email
        </label>
        <input
          id="resend-email"
          name="resend-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          inputMode="email"
          className={inputClassName}
          placeholder="vous@email.com"
        />
      </div>

      {errorMessage ? (
        <p className="text-sm text-rose-700" role="alert">
          {errorMessage}
        </p>
      ) : null}

      {status === 'success' ? (
        <p className="text-sm text-brand" role="status">
          {successHint ??
            'Si un compte non vérifié existe avec cet email, un nouvel email a été envoyé. Pensez à vérifier vos spams.'}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex w-full items-center justify-center rounded-xl border border-brand/25 bg-surface-elevated px-5 py-3 text-sm font-semibold text-brand transition hover:bg-brand-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60"
      >
        {status === 'loading' ? 'Envoi en cours…' : 'Renvoyer l’email de confirmation'}
      </button>
    </form>
  )
}
