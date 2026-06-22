import { motion } from 'framer-motion'
import { type FormEvent, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { resetPassword } from './api/resetPassword'
import { PasswordStrength } from './components/PasswordStrength'
import { validatePassword } from './utils/validatePassword'

const inputClassName =
  'mt-2 w-full rounded-xl border border-border/80 bg-surface px-4 py-3.5 text-sm text-text transition placeholder:text-text-muted/70 focus-visible:border-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60'

type FieldErrors = Partial<Record<'password' | 'confirmPassword' | 'form', string>>

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')?.trim() ?? ''

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  function validate(): FieldErrors {
    const next: FieldErrors = {}
    const passwordError = validatePassword(password)
    if (passwordError) next.password = passwordError
    if (!confirmPassword) next.confirmPassword = 'La confirmation est obligatoire.'
    else if (confirmPassword !== password) next.confirmPassword = 'Les mots de passe ne correspondent pas.'
    return next
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (isSubmitting || !token) return

    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)
    setErrors({})

    try {
      await resetPassword({ token, password })
      navigate('/login', {
        replace: true,
        state: { email: undefined },
      })
    } catch (error) {
      if (error instanceof Error) {
        try {
          const parsed = JSON.parse(error.message) as { message?: string; code?: string }
          if (parsed.code === 'TOKEN_EXPIRED') {
            setErrors({
              form: parsed.message ?? 'Le lien a expiré. Demandez une nouvelle réinitialisation.',
            })
          } else {
            setErrors({ form: parsed.message ?? 'Lien invalide ou expiré.' })
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

  if (!token) {
    return (
      <section className="mx-auto w-full max-w-lg px-6 py-14">
        <div className="rounded-2xl border border-border/80 bg-surface-elevated p-7 shadow-sm">
          <h1 className="text-xl font-semibold text-text">Lien incomplet</h1>
          <p className="mt-3 text-sm text-text-muted">
            Ce lien ne contient pas les informations nécessaires. Utilisez le lien reçu par email ou faites une
            nouvelle demande.
          </p>
          <Link
            to="/forgot-password"
            className="mt-6 inline-flex w-full cursor-pointer items-center justify-center rounded-xl bg-brand px-5 py-3.5 text-sm font-semibold text-surface-elevated transition hover:bg-brand/90"
          >
            Mot de passe oublié
          </Link>
        </div>
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
        <h1 className="text-2xl font-bold tracking-tight text-text">Nouveau mot de passe</h1>
        <p className="mt-2 text-sm text-text-muted">Choisissez un mot de passe sécurisé pour votre compte.</p>

        {errors.form ? (
          <div className="mt-5 rounded-xl border border-rose-200/70 bg-rose-50 px-4 py-3 text-sm text-rose-800">
            <p>{errors.form}</p>
            {errors.form.includes('expiré') ? (
              <Link
                to="/forgot-password"
                className="mt-3 inline-block font-semibold text-brand underline-offset-4 hover:underline"
              >
                Faire une nouvelle demande
              </Link>
            ) : null}
          </div>
        ) : null}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="reset-password" className="text-sm font-semibold text-text">
              Nouveau mot de passe
            </label>
            <input
              id="reset-password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              aria-invalid={Boolean(errors.password)}
              className={`${inputClassName}${errors.password ? ' border-rose-300 focus-visible:ring-rose-500/30' : ''}`}
            />
            <PasswordStrength password={password} />
            {errors.password ? <p className="mt-2 text-sm text-rose-700">{errors.password}</p> : null}
          </div>

          <div>
            <label htmlFor="reset-confirm-password" className="text-sm font-semibold text-text">
              Confirmer le mot de passe
            </label>
            <input
              id="reset-confirm-password"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              autoComplete="new-password"
              aria-invalid={Boolean(errors.confirmPassword)}
              className={`${inputClassName}${errors.confirmPassword ? ' border-rose-300 focus-visible:ring-rose-500/30' : ''}`}
            />
            {errors.confirmPassword ? (
              <p className="mt-2 text-sm text-rose-700">{errors.confirmPassword}</p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-xl bg-brand px-5 py-3.5 text-sm font-semibold text-surface-elevated transition hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Enregistrement…' : 'Réinitialiser le mot de passe'}
          </button>
        </form>
      </motion.div>
    </section>
  )
}
