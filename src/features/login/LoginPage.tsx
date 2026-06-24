import { motion } from 'framer-motion'
import { ArrowRight, ChefHat, Lock, LogIn, Mail, Sparkles, UtensilsCrossed } from 'lucide-react'
import { type FormEvent, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../shared/hooks/useAuth'

type FieldErrors = Partial<Record<'email' | 'password' | 'form', string>>

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const inputClassName =
  'mt-2 w-full rounded-xl border border-border/80 bg-surface px-4 py-3.5 pl-11 text-sm text-text transition placeholder:text-text-muted/70 focus-visible:border-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60'

const primaryButtonClassName =
  'group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60'

export function LoginPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { login, isAuthenticated, isLoading } = useAuth()
  const prefilledEmail = (location.state as { email?: string } | null)?.email ?? ''
  const fromLocation = (location.state as { from?: { pathname?: string; search?: string } } | null)?.from
  const redirectTo = fromLocation
    ? `${fromLocation.pathname ?? '/'}${fromLocation.search ?? ''}`
    : '/'

  const [email, setEmail] = useState(prefilledEmail)
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate(redirectTo, { replace: true })
    }
  }, [isLoading, isAuthenticated, navigate, redirectTo])

  function validate(): FieldErrors {
    const next: FieldErrors = {}
    const trimmedEmail = email.trim()
    if (!trimmedEmail) next.email = "L'email est obligatoire."
    else if (!isValidEmail(trimmedEmail)) next.email = "L'adresse email est invalide."
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
      navigate(redirectTo, { replace: true })
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
      <main className="mx-auto flex min-h-[50vh] w-full max-w-6xl items-center justify-center px-6 py-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <span
            className="h-10 w-10 animate-spin rounded-full border-2 border-brand/30 border-t-brand"
            aria-hidden
          />
          <p className="text-sm text-text-muted" role="status">
            Chargement de votre session…
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="relative mx-auto w-full max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
      <div
        className="pointer-events-none absolute -right-20 top-8 h-64 w-64 rounded-full bg-brand/5 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-brand/8 blur-3xl"
        aria-hidden
      />

      <div className="relative grid items-stretch gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <section className="relative overflow-hidden rounded-3xl border border-brand/15 bg-gradient-to-br from-brand-muted/90 via-surface-elevated to-surface p-7 shadow-sm sm:p-8">
          <div
            className="pointer-events-none absolute -right-10 top-0 h-40 w-40 rounded-full bg-brand/10 blur-2xl"
            aria-hidden
          />

          <p className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-surface-elevated/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand shadow-sm backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" aria-hidden strokeWidth={1.75} />
            Espace client
          </p>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Heureux de vous <span className="text-brand">revoir</span>
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-text-muted sm:text-base">
            Connectez-vous pour commander nos menus traiteur, suivre vos livraisons et gérer votre
            profil en toute simplicité.
          </p>

          <ul className="mt-8 space-y-4 text-sm text-text-muted">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-surface-elevated/90 text-brand shadow-sm">
                <UtensilsCrossed className="h-4 w-4" aria-hidden strokeWidth={1.75} />
              </span>
              <span>Accédez à nos menus et passez commande en quelques clics.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-surface-elevated/90 text-brand shadow-sm">
                <ChefHat className="h-4 w-4" aria-hidden strokeWidth={1.75} />
              </span>
              <span>Suivez vos commandes et l&apos;avancement de la livraison.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-surface-elevated/90 text-brand shadow-sm">
                <LogIn className="h-4 w-4" aria-hidden strokeWidth={1.75} />
              </span>
              <span>Retrouvez vos informations personnelles à jour.</span>
            </li>
          </ul>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-border/80 bg-surface-elevated/95 p-7 shadow-xl shadow-brand/5 backdrop-blur-sm sm:p-8"
        >
          <h2 className="text-2xl font-semibold tracking-tight text-text">Connexion</h2>
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
              className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
              role="alert"
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

          <form className="mt-7 space-y-5" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="login-email" className="text-sm font-medium text-text">
                Email
              </label>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute left-4 top-1/2 mt-1 h-4 w-4 -translate-y-1/2 text-text-muted"
                  aria-hidden
                  strokeWidth={1.75}
                />
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
              </div>
              {errors.email ? (
                <p className="mt-2 text-sm text-rose-700" role="alert">
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div>
              <div className="flex items-center justify-between gap-3">
                <label htmlFor="login-password" className="text-sm font-medium text-text">
                  Mot de passe
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-brand underline-offset-4 hover:underline"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative">
                <Lock
                  className="pointer-events-none absolute left-4 top-1/2 mt-1 h-4 w-4 -translate-y-1/2 text-text-muted"
                  aria-hidden
                  strokeWidth={1.75}
                />
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
              </div>
              {errors.password ? (
                <p className="mt-2 text-sm text-rose-700" role="alert">
                  {errors.password}
                </p>
              ) : null}
            </div>

            <button type="submit" disabled={isSubmitting} className={primaryButtonClassName}>
              {isSubmitting ? (
                <>
                  <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                    aria-hidden
                  />
                  Connexion…
                </>
              ) : (
                <>
                  Se connecter
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                    strokeWidth={1.75}
                  />
                </>
              )}
            </button>
          </form>
        </motion.section>
      </div>
    </main>
  )
}
