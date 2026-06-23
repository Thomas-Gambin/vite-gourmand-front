import type { OrderStatus } from '../types/dashboard'
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from '../utils/orderStatus'

type StatusBadgeProps = {
  statut: OrderStatus
}

export function StatusBadge({ statut }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${ORDER_STATUS_COLORS[statut] ?? 'bg-surface-muted text-text-muted'}`}
    >
      {ORDER_STATUS_LABELS[statut] ?? statut}
    </span>
  )
}
