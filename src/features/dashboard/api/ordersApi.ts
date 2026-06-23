import { getJson, patchJson } from '../../../shared/api/client'
import type {
  UpdateOrderPayload,
  UserOrderDetail,
  UserOrderListItem,
  OrderTracking,
} from '../types/dashboard'

export type OrdersListResponse = {
  orders: UserOrderListItem[]
}

export type OrderDetailResponse = {
  order: UserOrderDetail
}

export type OrderTrackingResponse = {
  tracking: OrderTracking
}

export function getMyOrders() {
  return getJson<OrdersListResponse>('/me/orders')
}

export function getMyOrder(id: number) {
  return getJson<OrderDetailResponse>(`/me/orders/${id}`)
}

export function updateMyOrder(id: number, payload: UpdateOrderPayload) {
  return patchJson<OrderDetailResponse & { message: string }, UpdateOrderPayload>(
    `/me/orders/${id}`,
    payload,
  )
}

export function cancelMyOrder(id: number) {
  return patchJson<OrderDetailResponse & { message: string }, Record<string, never>>(
    `/me/orders/${id}/cancel`,
    {},
  )
}

export function getOrderTracking(id: number) {
  return getJson<OrderTrackingResponse>(`/me/orders/${id}/tracking`)
}
