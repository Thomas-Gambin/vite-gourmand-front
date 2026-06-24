import { getJson } from '../../../shared/api/client'
import type { Review } from '../../home/types/review'

export type MenuReviewsResponse = {
  reviews: Review[]
  totalCount: number
  averageRating: number | null
}

export function getMenuReviews(menuId: number) {
  return getJson<MenuReviewsResponse>(`/menus/${menuId}/reviews`, { skipAuth: true })
}
