import { postJson } from '../../../shared/api/client'

export type ForgotPasswordRequest = {
  email: string
}

export type ForgotPasswordResponse = {
  message: string
}

export async function forgotPassword(body: ForgotPasswordRequest) {
  return await postJson<ForgotPasswordResponse, ForgotPasswordRequest>('/forgot-password', body, {
    skipAuth: true,
  })
}
