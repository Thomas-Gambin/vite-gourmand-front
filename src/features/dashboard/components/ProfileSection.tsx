import { useEffect, useState } from 'react'
import type { AuthUser } from '../../auth/types/user'
import { updateProfile } from '../api/profileApi'
import type { UpdateProfilePayload } from '../types/dashboard'
import { parseApiError } from '../utils/parseApiError'
import { validateProfileForm, type ProfileFormErrors } from '../utils/validateProfileForm'

const inputClassName =
  'mt-2 w-full rounded-xl border border-border/80 bg-surface px-4 py-3.5 text-sm text-text transition focus-visible:border-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2'

const primaryButtonClassName =
  'inline-flex cursor-pointer items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60'

type ProfileSectionProps = {
  user: AuthUser
  onProfileUpdated: (user: AuthUser) => void
}

export function ProfileSection({ user, onProfileUpdated }: ProfileSectionProps) {
  const [formData, setFormData] = useState<UpdateProfilePayload>({
    nom: user.nom,
    prenom: user.prenom,
    email: user.email,
    telephone: user.telephone,
    adressePostale: user.adressePostale,
    ville: user.ville,
    pays: user.pays,
  })
  const [errors, setErrors] = useState<ProfileFormErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setFormData({
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      telephone: user.telephone,
      adressePostale: user.adressePostale,
      ville: user.ville,
      pays: user.pays,
    })
  }, [user])

  function handleChange(field: keyof UpdateProfilePayload, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
    setFormError(null)
    setSuccess(null)
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const validation = validateProfileForm(formData)
    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      return
    }

    setIsSubmitting(true)
    setFormError(null)
    setSuccess(null)

    try {
      const response = await updateProfile(formData)
      onProfileUpdated(response.user)
      setSuccess(response.message)
    } catch (error) {
      const apiError = parseApiError(error)
      if (apiError.fields) {
        setErrors(apiError.fields as ProfileFormErrors)
      }
      setFormError(apiError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section aria-labelledby="profile-section-title" className="rounded-2xl border border-border/60 bg-surface-elevated p-6 shadow-sm sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Profil</p>
      <h2 id="profile-section-title" className="mt-2 text-xl font-bold text-text">
        Mes informations personnelles
      </h2>

      {success && (
        <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800" role="status">
          {success}
        </p>
      )}
      {formError && (
        <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800" role="alert">
          {formError}
        </p>
      )}

      <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="profile-prenom" className="text-sm font-medium text-text">
              Prénom
            </label>
            <input
              id="profile-prenom"
              className={`${inputClassName} ${errors.prenom ? 'border-rose-300' : ''}`}
              value={formData.prenom}
              onChange={(e) => handleChange('prenom', e.target.value)}
              autoComplete="given-name"
            />
            {errors.prenom && (
              <p className="mt-1.5 text-sm text-rose-700" role="alert">
                {errors.prenom}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="profile-nom" className="text-sm font-medium text-text">
              Nom
            </label>
            <input
              id="profile-nom"
              className={`${inputClassName} ${errors.nom ? 'border-rose-300' : ''}`}
              value={formData.nom}
              onChange={(e) => handleChange('nom', e.target.value)}
              autoComplete="family-name"
            />
            {errors.nom && (
              <p className="mt-1.5 text-sm text-rose-700" role="alert">
                {errors.nom}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="profile-email" className="text-sm font-medium text-text">
            Email
          </label>
          <input
            id="profile-email"
            type="email"
            className={`${inputClassName} ${errors.email ? 'border-rose-300' : ''}`}
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            autoComplete="email"
          />
          {errors.email && (
            <p className="mt-1.5 text-sm text-rose-700" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="profile-telephone" className="text-sm font-medium text-text">
            Téléphone / GSM
          </label>
          <input
            id="profile-telephone"
            type="tel"
            className={`${inputClassName} ${errors.telephone ? 'border-rose-300' : ''}`}
            value={formData.telephone}
            onChange={(e) => handleChange('telephone', e.target.value)}
            autoComplete="tel"
          />
          {errors.telephone && (
            <p className="mt-1.5 text-sm text-rose-700" role="alert">
              {errors.telephone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="profile-adresse" className="text-sm font-medium text-text">
            Adresse postale
          </label>
          <input
            id="profile-adresse"
            className={`${inputClassName} ${errors.adressePostale ? 'border-rose-300' : ''}`}
            value={formData.adressePostale}
            onChange={(e) => handleChange('adressePostale', e.target.value)}
            autoComplete="street-address"
          />
          {errors.adressePostale && (
            <p className="mt-1.5 text-sm text-rose-700" role="alert">
              {errors.adressePostale}
            </p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="profile-ville" className="text-sm font-medium text-text">
              Ville
            </label>
            <input
              id="profile-ville"
              className={`${inputClassName} ${errors.ville ? 'border-rose-300' : ''}`}
              value={formData.ville}
              onChange={(e) => handleChange('ville', e.target.value)}
              autoComplete="address-level2"
            />
            {errors.ville && (
              <p className="mt-1.5 text-sm text-rose-700" role="alert">
                {errors.ville}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="profile-pays" className="text-sm font-medium text-text">
              Pays
            </label>
            <input
              id="profile-pays"
              className={`${inputClassName} ${errors.pays ? 'border-rose-300' : ''}`}
              value={formData.pays}
              onChange={(e) => handleChange('pays', e.target.value)}
              autoComplete="country-name"
            />
            {errors.pays && (
              <p className="mt-1.5 text-sm text-rose-700" role="alert">
                {errors.pays}
              </p>
            )}
          </div>
        </div>

        <button type="submit" className={primaryButtonClassName} disabled={isSubmitting}>
          {isSubmitting ? 'Enregistrement…' : 'Enregistrer les modifications'}
        </button>
      </form>
    </section>
  )
}
