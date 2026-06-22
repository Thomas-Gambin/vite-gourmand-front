import type {
  ContactApiValidationError,
  ContactFieldErrors,
  ContactFormData,
} from '../types/contact'

export type ContactServiceErrorCode = 'network' | 'unavailable' | 'validation' | 'server'

export class ContactServiceError extends Error {
  readonly code: ContactServiceErrorCode
  readonly fieldErrors?: ContactFieldErrors

  constructor(
    code: ContactServiceErrorCode,
    message: string,
    fieldErrors?: ContactFieldErrors,
  ) {
    super(message)
    this.name = 'ContactServiceError'
    this.code = code
    this.fieldErrors = fieldErrors
  }
}

export const CONTACT_SUCCESS_MESSAGE =
  'Votre message a bien été envoyé. Nous vous répondrons dès que possible.'

export const CONTACT_ERROR_MESSAGE =
  'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer plus tard.'

const CONTACT_FIELDS: (keyof ContactFormData)[] = ['title', 'email', 'description']

function isContactField(field: string): field is keyof ContactFormData {
  return CONTACT_FIELDS.includes(field as keyof ContactFormData)
}

function mapApiValidationErrors(errors: ContactApiValidationError[]): ContactFieldErrors {
  const fieldErrors: ContactFieldErrors = {}

  for (const error of errors) {
    if (isContactField(error.field)) {
      fieldErrors[error.field] = error.message
    }
  }

  return fieldErrors
}

async function parseValidationErrors(response: Response): Promise<ContactFieldErrors | null> {
  try {
    const body = (await response.json()) as { errors?: ContactApiValidationError[] }

    if (!Array.isArray(body.errors) || body.errors.length === 0) {
      return null
    }

    return mapApiValidationErrors(body.errors)
  } catch {
    return null
  }
}

export async function sendContactMessage(data: ContactFormData): Promise<void> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL

  if (!baseUrl) {
    throw new ContactServiceError('unavailable', CONTACT_ERROR_MESSAGE)
  }

  let response: Response

  try {
    response = await fetch(`${baseUrl}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        title: data.title.trim(),
        email: data.email.trim(),
        description: data.description.trim(),
      }),
    })
  } catch {
    throw new ContactServiceError('network', CONTACT_ERROR_MESSAGE)
  }

  if (response.status === 422) {
    const fieldErrors = await parseValidationErrors(response)

    if (fieldErrors && Object.keys(fieldErrors).length > 0) {
      throw new ContactServiceError('validation', CONTACT_ERROR_MESSAGE, fieldErrors)
    }

    throw new ContactServiceError('validation', CONTACT_ERROR_MESSAGE)
  }

  if (!response.ok) {
    throw new ContactServiceError('server', CONTACT_ERROR_MESSAGE)
  }
}
