export type RegisterFormData = {
  nom: string
  prenom: string
  email: string
  password: string
  confirmPassword: string
  telephone: string
  ville: string
  pays: string
  adressePostale: string
}

export type RegisterFieldErrors = Partial<Record<keyof RegisterFormData | 'form', string>>

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function checkPassword(password: string) {
  const rules = {
    minLength: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasDigit: /\d/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password),
  }
  const score = Object.values(rules).filter(Boolean).length
  return { rules, score }
}

export function validateRegisterForm(data: RegisterFormData): RegisterFieldErrors {
  const errors: RegisterFieldErrors = {}

  if (!data.nom.trim()) errors.nom = 'Le nom est obligatoire.'
  if (!data.prenom.trim()) errors.prenom = 'Le prénom est obligatoire.'

  const email = data.email.trim()
  if (!email) errors.email = "L'email est obligatoire."
  else if (!isValidEmail(email)) errors.email = "L'email n'est pas valide."

  const pwd = checkPassword(data.password)
  if (!data.password) errors.password = 'Le mot de passe est obligatoire.'
  else if (pwd.score < 5) errors.password = "Le mot de passe n'est pas assez fort."

  if (!data.confirmPassword) errors.confirmPassword = 'La confirmation est obligatoire.'
  else if (data.confirmPassword !== data.password) {
    errors.confirmPassword = 'Les mots de passe ne correspondent pas.'
  }

  if (!data.telephone.trim()) errors.telephone = 'Le téléphone est obligatoire.'
  if (!data.ville.trim()) errors.ville = 'La ville est obligatoire.'
  if (!data.pays.trim()) errors.pays = 'Le pays est obligatoire.'
  if (!data.adressePostale.trim()) errors.adressePostale = "L'adresse postale est obligatoire."

  return errors
}
