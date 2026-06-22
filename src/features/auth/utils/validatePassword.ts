export function checkPasswordStrength(password: string) {
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

export function validatePassword(password: string): string | undefined {
  if (!password) return 'Le mot de passe est obligatoire.'
  const { score } = checkPasswordStrength(password)
  if (score < 5) return "Le mot de passe n'est pas assez fort."
  return undefined
}
