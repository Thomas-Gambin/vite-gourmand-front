const FRENCH_PHONE_PATTERN = /^0[1-9]\d{8}$/

export const INVALID_PHONE_MESSAGE = 'Le numéro de téléphone est invalide.'

export function isValidFrenchPhone(phone: string): boolean {
  return FRENCH_PHONE_PATTERN.test(phone.trim())
}
