import type { ApiErrorShape } from '../../../shared/api/client'

export function parseApiError(error: unknown): ApiErrorShape {
  if (error instanceof Error) {
    try {
      return JSON.parse(error.message) as ApiErrorShape
    } catch {
      return { message: error.message }
    }
  }

  return { message: 'Une erreur est survenue.' }
}
