import { postJson } from '../../../shared/api/client'

export type RegisterRequest = {
  nom: string
  prenom: string
  email: string
  password: string
  telephone: string
  ville: string
  pays: string
  adressePostale: string
}

export type RegisterResponse = {
  message: string
  requiresEmailVerification: boolean
}

export async function registerUser(body: RegisterRequest) {
  return await postJson<RegisterResponse, RegisterRequest>('/register', body, { skipAuth: true })
}
