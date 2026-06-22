import { postJson } from '../../../shared/api/client'
import type { AuthUser } from '../types/user'

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  message: string
  token: string
  refresh_token: string
  refresh_token_expiration?: number
  user: AuthUser
}

export async function loginUser(body: LoginRequest) {
  return await postJson<LoginResponse, LoginRequest>('/login', body, { skipAuth: true })
}
