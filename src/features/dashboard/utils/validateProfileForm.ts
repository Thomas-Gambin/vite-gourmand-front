import type { UpdateProfilePayload } from '../types/dashboard'

export type ProfileFormErrors = Partial<Record<keyof UpdateProfilePayload, string>>

export function validateProfileForm(data: UpdateProfilePayload): ProfileFormErrors {
  const errors: ProfileFormErrors = {}

  if (!data.prenom.trim()) errors.prenom = 'Le prénom est obligatoire.'
  if (!data.nom.trim()) errors.nom = 'Le nom est obligatoire.'
  if (!data.email.trim()) {
    errors.email = "L'email est obligatoire."
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "L'email n'est pas valide."
  }
  if (!data.telephone.trim()) errors.telephone = 'Le téléphone est obligatoire.'
  if (!data.adressePostale.trim()) errors.adressePostale = "L'adresse postale est obligatoire."
  if (!data.ville.trim()) errors.ville = 'La ville est obligatoire.'
  if (!data.pays.trim()) errors.pays = 'Le pays est obligatoire.'

  return errors
}
