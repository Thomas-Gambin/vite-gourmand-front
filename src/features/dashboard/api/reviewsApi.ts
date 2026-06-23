import { getJson, postJson } from '../../../shared/api/client'
import type { AvailableReview, CreateReviewPayload } from '../types/dashboard'

export type AvailableReviewsResponse = {
  reviews: AvailableReview[]
}

export type CreateReviewResponse = {
  message: string
  review: {
    id: number
    note: number
    statut: string
    commandeId: number
  }
}

export function getAvailableReviews() {
  return getJson<AvailableReviewsResponse>('/me/reviews/available')
}

export function createOrderReview(commandeId: number, payload: CreateReviewPayload) {
  return postJson<CreateReviewResponse, CreateReviewPayload>(
    `/me/orders/${commandeId}/review`,
    payload,
  )
}
