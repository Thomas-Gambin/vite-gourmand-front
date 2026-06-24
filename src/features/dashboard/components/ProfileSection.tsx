import { Globe, Home, Mail, MapPin, Phone, User } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import type { AuthUser } from '../../auth/types/user'
import { ResendVerificationForm } from '../../auth/components/ResendVerificationForm'
import { updateProfile } from '../api/profileApi'
import {
  dashboardInputClassName,
  dashboardPanelClassName,
  dashboardPrimaryButtonClassName,
  dashboardReadOnlyInputClassName,
} from '../dashboardUi'
import type { UpdateProfilePayload } from '../types/dashboard'
import { parseApiError } from '../utils/parseApiError'
import { validateProfileForm, type ProfileFormErrors } from '../utils/validateProfileForm'

type ProfileSectionProps = {
  user: AuthUser
  onProfileUpdated: (user: AuthUser) => void
}

function toFormData(user: AuthUser): UpdateProfilePayload {
  return {
    nom: user.nom,
    prenom: user.prenom,
    telephone: user.telephone,
    adressePostale: user.adressePostale,
    ville: user.ville,
    pays: user.pays,
  }
}

type FieldProps = {
  id: string
  label: string
  icon: typeof User
  error?: string
  children: ReactNode
}

function FormField({ id, label, icon: Icon, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-text">
        {label}
      </label>
      <div className="relative">
        <Icon
          className="pointer-events-none absolute left-3.5 top-[calc(50%+4px)] h-4 w-4 -translate-y-1/2 text-text-muted/70"
          aria-hidden
          strokeWidth={1.75}
        />
        {children}
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-rose-700" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

function SectionDivider({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <div className="border-t border-border/60 pt-6 first:border-t-0 first:pt-0">
      <h3 className="text-base font-semibold text-text">{title}</h3>
      {description ? <p className="mt-1 text-sm text-text-muted">{description}</p> : null}
      {children}
    </div>
  )
}

export function ProfileSection({ user, onProfileUpdated }: ProfileSectionProps) {
  const [formData, setFormData] = useState<UpdateProfilePayload>(() => toFormData(user))
  const [errors, setErrors] = useState<ProfileFormErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setFormData(toFormData(user))
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
    <section aria-labelledby="profile-section-title" className={dashboardPanelClassName}>
      <h2 id="profile-section-title" className="text-xl font-semibold tracking-tight text-text">
        Mes informations personnelles
      </h2>
      <p className="mt-1.5 text-sm text-text-muted">
        Mettez à jour vos coordonnées pour faciliter vos commandes et livraisons.
      </p>

      {!user.isVerified && (
        <div className="mt-6 space-y-4 rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50 to-amber-50/40 px-5 py-4 text-sm text-amber-900">
          <p role="status">
            Votre adresse email n&apos;est pas encore confirmée. Consultez votre boîte mail (et vos spams) ou
            renvoyez un email de confirmation.
          </p>
          <ResendVerificationForm initialEmail={user.email} />
        </div>
      )}

      {success && (
        <p
          className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
          role="status"
        >
          {success}
        </p>
      )}
      {formError && (
        <p
          className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
          role="alert"
        >
          {formError}
        </p>
      )}

      <form className="mt-8 space-y-8" onSubmit={handleSubmit} noValidate>
        <SectionDivider title="Identité" description="Votre nom tel qu'il apparaît sur vos commandes.">
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <FormField id="profile-prenom" label="Prénom" icon={User} error={errors.prenom}>
              <input
                id="profile-prenom"
                className={`${dashboardInputClassName} ${errors.prenom ? 'border-rose-300' : ''}`}
                value={formData.prenom}
                onChange={(e) => handleChange('prenom', e.target.value)}
                autoComplete="given-name"
              />
            </FormField>
            <FormField id="profile-nom" label="Nom" icon={User} error={errors.nom}>
              <input
                id="profile-nom"
                className={`${dashboardInputClassName} ${errors.nom ? 'border-rose-300' : ''}`}
                value={formData.nom}
                onChange={(e) => handleChange('nom', e.target.value)}
                autoComplete="family-name"
              />
            </FormField>
          </div>
        </SectionDivider>

        <SectionDivider title="Contact">
          <div className="mt-5 space-y-5">
            <FormField id="profile-email" label="Email" icon={Mail}>
              <input
                id="profile-email"
                type="email"
                className={dashboardReadOnlyInputClassName}
                value={user.email}
                readOnly
                disabled
                aria-describedby="profile-email-hint"
              />
            </FormField>
            <p id="profile-email-hint" className="-mt-3 text-sm text-text-muted">
              L&apos;adresse email ne peut pas être modifiée depuis cet espace.
            </p>

            <FormField id="profile-telephone" label="Téléphone / GSM" icon={Phone} error={errors.telephone}>
              <input
                id="profile-telephone"
                type="tel"
                className={`${dashboardInputClassName} ${errors.telephone ? 'border-rose-300' : ''}`}
                value={formData.telephone}
                onChange={(e) => handleChange('telephone', e.target.value)}
                autoComplete="tel"
              />
            </FormField>
          </div>
        </SectionDivider>

        <SectionDivider title="Adresse" description="Utilisée par défaut pour vos prestations à domicile.">
          <div className="mt-5 space-y-5">
            <FormField
              id="profile-adresse"
              label="Adresse postale"
              icon={Home}
              error={errors.adressePostale}
            >
              <input
                id="profile-adresse"
                className={`${dashboardInputClassName} ${errors.adressePostale ? 'border-rose-300' : ''}`}
                value={formData.adressePostale}
                onChange={(e) => handleChange('adressePostale', e.target.value)}
                autoComplete="street-address"
              />
            </FormField>

            <div className="grid gap-5 sm:grid-cols-2">
              <FormField id="profile-ville" label="Ville" icon={MapPin} error={errors.ville}>
                <input
                  id="profile-ville"
                  className={`${dashboardInputClassName} ${errors.ville ? 'border-rose-300' : ''}`}
                  value={formData.ville}
                  onChange={(e) => handleChange('ville', e.target.value)}
                  autoComplete="address-level2"
                />
              </FormField>
              <FormField id="profile-pays" label="Pays" icon={Globe} error={errors.pays}>
                <input
                  id="profile-pays"
                  className={`${dashboardInputClassName} ${errors.pays ? 'border-rose-300' : ''}`}
                  value={formData.pays}
                  onChange={(e) => handleChange('pays', e.target.value)}
                  autoComplete="country-name"
                />
              </FormField>
            </div>
          </div>
        </SectionDivider>

        <div className="flex flex-col gap-3 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text-muted">Les champs marqués sont requis pour valider une commande.</p>
          <button type="submit" className={dashboardPrimaryButtonClassName} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span
                  className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                  aria-hidden
                />
                Enregistrement…
              </>
            ) : (
              'Enregistrer les modifications'
            )}
          </button>
        </div>
      </form>
    </section>
  )
}
