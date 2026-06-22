import { getJson } from '../../../shared/api/client'
import type { AuthUser } from '../types/user'

export type MeResponse = {
  user: AuthUser
}

export function getMe() {
  return getJson<MeResponse>('/me')
}
