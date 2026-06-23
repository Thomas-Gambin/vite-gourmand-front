import { patchJson } from '../../../shared/api/client'
import type { AuthUser } from '../../auth/types/user'
import type { UpdateProfilePayload } from '../types/dashboard'

export type UpdateProfileResponse = {
  message: string
  user: AuthUser
}

export function updateProfile(payload: UpdateProfilePayload) {
  return patchJson<UpdateProfileResponse, UpdateProfilePayload>('/me', payload)
}
