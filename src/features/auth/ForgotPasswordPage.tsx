import { motion } from 'framer-motion'
import { type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { forgotPassword } from './api/forgotPassword'

const inputClassName =
  'mt-2 w-full rounded-xl border border-border/80 bg-surface px-4 py-3.5 text-sm text-text transition placeholder:text-text-muted/70 focus-visible:border-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (isSubmitting) return

    const trimmed = email.trim().toLowerCase()
    if (!trimmed) {
      setErrorMessage("L'email est obligatoire.")
      setSuccessMessage(null)
      return
    }
    if (!isValidEmail(trimmed)) {
      setErrorMessage("L'email n'est pas valide.")
      setSuccessMessage(null)
      return
    }

    setIsSubmitting(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      const response = await forgotPassword({ email: trimmed })
      setSuccessMessage(
        response.message ??
          'Si un compte existe avec cet email, un lien de réinitialisation a été envoyé. Pensez à vérifier vos spams.',
      )
    } catch (error) {
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
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="mx-auto w-full max-w-lg px-6 py-14">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl border border-border/80 bg-surface-elevated p-7 shadow-sm"
      >
        <h1 className="text-2xl font-bold tracking-tight text-text">Mot de passe oublié</h1>
        <p className="mt-2 text-sm text-text-muted">
          Indiquez votre adresse email. Si un compte existe, vous recevrez un lien pour choisir un nouveau mot de passe.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="forgot-email" className="text-sm font-semibold text-text">
              Email
            </label>
            <input
              id="forgot-email"
              name="email"
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

          {successMessage ? (
            <p className="text-sm text-brand" role="status">
              {successMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-xl bg-brand px-5 py-3.5 text-sm font-semibold text-surface-elevated transition hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Envoi en cours…' : 'Envoyer le lien'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-muted">
          <Link className="font-semibold text-brand underline-offset-4 hover:underline" to="/login">
            Retour à la connexion
          </Link>
        </p>
      </motion.div>
    </section>
  )
}
