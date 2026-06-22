import { postJson } from '../../../shared/api/client'

export type ResendVerificationRequest = {
  email: string
}

export type ResendVerificationResponse = {
  message: string
  code?: string
}

export async function resendVerificationEmail(body: ResendVerificationRequest) {
  return await postJson<ResendVerificationResponse, ResendVerificationRequest>(
    '/resend-verification-email',
    body,
    { skipAuth: true },
  )
}
