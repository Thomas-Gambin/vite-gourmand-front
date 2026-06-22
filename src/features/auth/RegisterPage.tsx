import { motion } from 'framer-motion'
import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from './api/register'
import { PasswordStrength } from './components/PasswordStrength'
import type { RegisterFormData } from './utils/validateRegisterForm'
import { validateRegisterForm } from './utils/validateRegisterForm'

const inputClassName =
  'mt-2 w-full rounded-xl border border-border/80 bg-surface px-4 py-3.5 text-sm text-text transition placeholder:text-text-muted/70 focus-visible:border-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60'

const emptyForm: RegisterFormData = {
  nom: '',
  prenom: '',
  email: '',
  password: '',
  confirmPassword: '',
  telephone: '',
  ville: '',
  pays: '',
  adressePostale: '',
}

export function RegisterPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<RegisterFormData>(emptyForm)
  const [errors, setErrors] = useState<ReturnType<typeof validateRegisterForm>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  function updateField<K extends keyof RegisterFormData>(field: K, value: string) {
    setFormData((current) => ({ ...current, [field]: value }))
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current }
        delete next[field]
        return next
      })
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (isSubmitting) return

    const nextErrors = validateRegisterForm(formData)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)
    try {
      await registerUser({
        nom: formData.nom.trim(),
        prenom: formData.prenom.trim(),
        email: formData.email.trim(),
        password: formData.password,
        telephone: formData.telephone.trim(),
        ville: formData.ville.trim(),
        pays: formData.pays.trim(),
        adressePostale: formData.adressePostale.trim(),
      })

      navigate('/register-success', {
        state: { email: formData.email.trim().toLowerCase() },
      })
    } catch (error) {
      if (error instanceof Error) {
        try {
          const parsed = JSON.parse(error.message) as {
            message?: string
            fields?: Record<string, string>
          }
          setErrors({
            form: parsed.message ?? 'Une erreur est survenue.',
            nom: parsed.fields?.nom,
            prenom: parsed.fields?.prenom,
            email: parsed.fields?.email,
            password: parsed.fields?.password,
            telephone: parsed.fields?.telephone,
            ville: parsed.fields?.ville,
            pays: parsed.fields?.pays,
            adressePostale: parsed.fields?.adressePostale,
          })
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

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-14 sm:py-16">
      <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <section className="rounded-3xl border border-border/80 bg-brand-muted p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Vite &amp; Gourmand</p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-text">Créez votre compte client</h1>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            Inscrivez-vous pour commander nos menus traiteur, suivre vos commandes et laisser vos avis.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-text-muted">
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand/70" />
              <span>Vos coordonnées pour la livraison et la facturation.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand/70" />
              <span>Un mot de passe renforcé pour protéger votre compte.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand/70" />
              <span>Un email de confirmation pour activer votre compte.</span>
            </li>
          </ul>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-border/80 bg-surface-elevated p-7 shadow-sm"
        >
          <h2 className="text-xl font-semibold tracking-tight text-text">Créer un compte</h2>
          <p className="mt-2 text-sm text-text-muted">
            Déjà inscrit ?{' '}
            <Link className="font-semibold text-brand underline-offset-4 hover:underline" to="/login">
              Se connecter
            </Link>
          </p>

          {errors.form ? (
            <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
              {errors.form}
            </div>
          ) : null}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="nom" className="text-sm font-semibold text-text">
                  Nom
                </label>
                <input
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={(event) => updateField('nom', event.target.value)}
                  aria-invalid={Boolean(errors.nom)}
                  className={inputClassName}
                  autoComplete="family-name"
                />
                {errors.nom ? <p className="mt-2 text-sm text-rose-700">{errors.nom}</p> : null}
              </div>

              <div>
                <label htmlFor="prenom" className="text-sm font-semibold text-text">
                  Prénom
                </label>
                <input
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={(event) => updateField('prenom', event.target.value)}
                  aria-invalid={Boolean(errors.prenom)}
                  className={inputClassName}
                  autoComplete="given-name"
                />
                {errors.prenom ? <p className="mt-2 text-sm text-rose-700">{errors.prenom}</p> : null}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-semibold text-text">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(event) => updateField('email', event.target.value)}
                aria-invalid={Boolean(errors.email)}
                className={inputClassName}
                autoComplete="email"
                inputMode="email"
                placeholder="vous@email.com"
              />
              {errors.email ? <p className="mt-2 text-sm text-rose-700">{errors.email}</p> : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="password" className="text-sm font-semibold text-text">
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={(event) => updateField('password', event.target.value)}
                  aria-invalid={Boolean(errors.password)}
                  className={inputClassName}
                  autoComplete="new-password"
                />
                <PasswordStrength password={formData.password} />
                {errors.password ? <p className="mt-2 text-sm text-rose-700">{errors.password}</p> : null}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="text-sm font-semibold text-text">
                  Confirmation
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(event) => updateField('confirmPassword', event.target.value)}
                  aria-invalid={Boolean(errors.confirmPassword)}
                  className={inputClassName}
                  autoComplete="new-password"
                />
                {errors.confirmPassword ? (
                  <p className="mt-2 text-sm text-rose-700">{errors.confirmPassword}</p>
                ) : null}
              </div>
            </div>

            <div>
              <label htmlFor="telephone" className="text-sm font-semibold text-text">
                Téléphone
              </label>
              <input
                id="telephone"
                name="telephone"
                type="tel"
                value={formData.telephone}
                onChange={(event) => updateField('telephone', event.target.value)}
                aria-invalid={Boolean(errors.telephone)}
                className={inputClassName}
                autoComplete="tel"
              />
              {errors.telephone ? <p className="mt-2 text-sm text-rose-700">{errors.telephone}</p> : null}
            </div>

            <div>
              <label htmlFor="adressePostale" className="text-sm font-semibold text-text">
                Adresse postale
              </label>
              <input
                id="adressePostale"
                name="adressePostale"
                value={formData.adressePostale}
                onChange={(event) => updateField('adressePostale', event.target.value)}
                aria-invalid={Boolean(errors.adressePostale)}
                className={inputClassName}
                autoComplete="street-address"
              />
              {errors.adressePostale ? (
                <p className="mt-2 text-sm text-rose-700">{errors.adressePostale}</p>
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="ville" className="text-sm font-semibold text-text">
                  Ville
                </label>
                <input
                  id="ville"
                  name="ville"
                  value={formData.ville}
                  onChange={(event) => updateField('ville', event.target.value)}
                  aria-invalid={Boolean(errors.ville)}
                  className={inputClassName}
                  autoComplete="address-level2"
                />
                {errors.ville ? <p className="mt-2 text-sm text-rose-700">{errors.ville}</p> : null}
              </div>

              <div>
                <label htmlFor="pays" className="text-sm font-semibold text-text">
                  Pays
                </label>
                <input
                  id="pays"
                  name="pays"
                  value={formData.pays}
                  onChange={(event) => updateField('pays', event.target.value)}
                  aria-invalid={Boolean(errors.pays)}
                  className={inputClassName}
                  autoComplete="country-name"
                />
                {errors.pays ? <p className="mt-2 text-sm text-rose-700">{errors.pays}</p> : null}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-brand px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60"
            >
              {isSubmitting ? 'Création en cours…' : 'Créer mon compte'}
            </button>
          </form>
        </motion.section>
      </div>
    </main>
  )
}
