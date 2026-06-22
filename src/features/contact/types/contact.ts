export type ContactFormData = {
  title: string
  email: string
  description: string
}

export type ContactFieldErrors = Partial<Record<keyof ContactFormData, string>>

export type ContactApiValidationError = {
  field: keyof ContactFormData
  message: string
}
