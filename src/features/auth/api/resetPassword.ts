import { postJson } from '../../../shared/api/client'

export type ResetPasswordRequest = {
  token: string
  password: string
}

export type ResetPasswordResponse = {
  message: string
}

export async function resetPassword(body: ResetPasswordRequest) {
  return await postJson<ResetPasswordResponse, ResetPasswordRequest>('/reset-password', body, {
    skipAuth: true,
  })
}
