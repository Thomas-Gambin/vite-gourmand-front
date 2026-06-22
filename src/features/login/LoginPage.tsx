import { motion } from 'framer-motion'
import { type FormEvent, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../shared/hooks/useAuth'

type FieldErrors = Partial<Record<'email' | 'password' | 'form', string>>

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const inputClassName =
  'mt-2 w-full rounded-xl border border-border/80 bg-surface px-4 py-3.5 text-sm text-text transition placeholder:text-text-muted/70 focus-visible:border-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60'

export function LoginPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { login, isAuthenticated, isLoading } = useAuth()
  const prefilledEmail = (location.state as { email?: string } | null)?.email ?? ''
  const fromPath = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname

  const [email, setEmail] = useState(prefilledEmail)
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate(fromPath ?? '/', { replace: true })
    }
  }, [isLoading, isAuthenticated, navigate, fromPath])

  function validate(): FieldErrors {
    const next: FieldErrors = {}
    const trimmedEmail = email.trim()
    if (!trimmedEmail) next.email = "L'email est obligatoire."
    else if (!isValidEmail(trimmedEmail)) next.email = "L'email n'est pas valide."
    if (!password) next.password = 'Le mot de passe est obligatoire.'
    return next
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (isSubmitting) return

    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)
    setErrors({})
    try {
      await login({ email: email.trim().toLowerCase(), password })
      navigate(fromPath ?? '/', { replace: true })
    } catch (error) {
      if (error instanceof Error) {
        try {
          const parsed = JSON.parse(error.message) as { message?: string; code?: string }
          if (parsed.code === 'EMAIL_NOT_VERIFIED') {
            setErrors({
              form:
                parsed.message ??
                "Votre compte n'est pas encore vérifié. Veuillez confirmer votre adresse email.",
            })
          } else {
            setErrors({ form: parsed.message ?? 'Identifiants invalides.' })
          }
        } catch {
          setErrors({ form: error.message || 'Une erreur est survenue.' })
        }
      } else {
        setErrors({ form: 'Une erreur est survenue.' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <section className="mx-auto flex min-h-[40vh] w-full max-w-lg items-center justify-center px-6 py-14">
        <p className="text-sm text-text-muted" role="status">
          Chargement…
        </p>
      </section>
    )
  }

  return (
    <section className="mx-auto w-full max-w-lg px-6 py-14">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl border border-border/80 bg-surface-elevated p-7 shadow-sm"
      >
        <h1 className="text-2xl font-bold tracking-tight text-text">Connexion</h1>
        <p className="mt-2 text-sm text-text-muted">
          Pas encore de compte ?{' '}
          <Link className="font-semibold text-brand underline-offset-4 hover:underline" to="/register">
            Créer un compte
          </Link>
        </p>

        {errors.form ? (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 rounded-xl border border-rose-200/70 bg-rose-50 px-4 py-3 text-sm text-rose-800"
          >
            <p>{errors.form}</p>
            {errors.form.includes('pas encore vérifié') ? (
              <Link
                to="/register-success"
                state={{ email: email.trim().toLowerCase() }}
                className="mt-3 inline-block font-semibold text-brand underline-offset-4 hover:underline"
              >
                Renvoyer l&apos;email de confirmation
              </Link>
            ) : null}
          </motion.div>
        ) : null}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="login-email" className="text-sm font-semibold text-text">
              Email
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              inputMode="email"
              aria-invalid={Boolean(errors.email)}
              className={`${inputClassName}${errors.email ? ' border-rose-300 focus-visible:ring-rose-500/30' : ''}`}
              placeholder="vous@email.com"
            />
            {errors.email ? <p className="mt-2 text-sm text-rose-700">{errors.email}</p> : null}
          </div>

          <div>
            <label htmlFor="login-password" className="text-sm font-semibold text-text">
              Mot de passe
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              aria-invalid={Boolean(errors.password)}
              className={`${inputClassName}${errors.password ? ' border-rose-300 focus-visible:ring-rose-500/30' : ''}`}
              placeholder="••••••••"
            />
            {errors.password ? <p className="mt-2 text-sm text-rose-700">{errors.password}</p> : null}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 inline-flex w-full cursor-pointer items-center justify-center rounded-xl bg-brand px-5 py-3.5 text-sm font-semibold text-surface-elevated transition hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>
      </motion.div>
    </section>
  )
}
