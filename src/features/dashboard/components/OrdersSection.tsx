import { Package, RefreshCw } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { cancelMyOrder, getMyOrder, getMyOrders } from '../api/ordersApi'
import { dashboardPanelClassName, dashboardSecondaryButtonClassName } from '../dashboardUi'
import type { UserOrderListItem } from '../types/dashboard'
import { parseApiError } from '../utils/parseApiError'
import { OrderCard, OrdersEmptyState, OrdersListSkeleton } from './OrderCard'
import { OrderDetailModal } from './OrderDetailModal'
import { OrderEditModal } from './OrderEditModal'

type OrdersSectionProps = {
  onTrackOrder: (orderId: number) => void
  onReviewOrder: (orderId: number) => void
  refreshKey?: number
}

type OrderFilter = 'all' | 'active' | 'done' | 'cancelled'

const filterOptions: Array<{ id: OrderFilter; label: string }> = [
  { id: 'all', label: 'Toutes' },
  { id: 'active', label: 'En cours' },
  { id: 'done', label: 'Terminées' },
  { id: 'cancelled', label: 'Annulées' },
]

function matchesFilter(order: UserOrderListItem, filter: OrderFilter): boolean {
  if (filter === 'all') return true
  if (filter === 'active') return order.statut !== 'terminee' && order.statut !== 'annulee'
  if (filter === 'done') return order.statut === 'terminee'
  return order.statut === 'annulee'
}

function countByFilter(orders: UserOrderListItem[], filter: OrderFilter): number {
  return orders.filter((order) => matchesFilter(order, filter)).length
}

export function OrdersSection({ onTrackOrder, onReviewOrder, refreshKey = 0 }: OrdersSectionProps) {
  const [orders, setOrders] = useState<UserOrderListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<OrderFilter>('all')
  const [detailId, setDetailId] = useState<number | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState<string | null>(null)
  const [detailOrder, setDetailOrder] = useState<Awaited<ReturnType<typeof getMyOrder>>['order'] | null>(null)
  const [editOrder, setEditOrder] = useState<UserOrderListItem | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)

  const loadOrders = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await getMyOrders()
      setOrders(response.orders)
    } catch (err) {
      setError(parseApiError(err).message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadOrders()
  }, [loadOrders, refreshKey])

  const filteredOrders = useMemo(
    () => orders.filter((order) => matchesFilter(order, filter)),
    [orders, filter],
  )

  const activeCount = useMemo(() => countByFilter(orders, 'active'), [orders])

  async function openDetail(id: number) {
    setDetailId(id)
    setDetailLoading(true)
    setDetailError(null)
    setDetailOrder(null)
    try {
      const response = await getMyOrder(id)
      setDetailOrder(response.order)
    } catch (err) {
      setDetailError(parseApiError(err).message)
    } finally {
      setDetailLoading(false)
    }
  }

  function closeDetail() {
    setDetailId(null)
    setDetailOrder(null)
    setDetailError(null)
  }

  async function handleCancel(order: UserOrderListItem) {
    if (!order.canCancel) return
    const confirmed = window.confirm(
      `Confirmez-vous l'annulation de la commande ${order.numeroCommande} ? Cette action est irréversible.`,
    )
    if (!confirmed) return

    setActionError(null)
    try {
      await cancelMyOrder(order.id)
      await loadOrders()
    } catch (err) {
      setActionError(parseApiError(err).message)
    }
  }

  return (
    <section aria-labelledby="orders-section-title" className={dashboardPanelClassName}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 id="orders-section-title" className="text-xl font-semibold tracking-tight text-text">
            Mes commandes
          </h2>
          <p className="mt-1.5 max-w-xl text-sm text-text-muted">
            Retrouvez l&apos;historique de vos commandes, suivez leur avancement ou modifiez-les si besoin.
          </p>
        </div>

        {!isLoading && orders.length > 0 && (
          <button
            type="button"
            className={dashboardSecondaryButtonClassName}
            onClick={() => void loadOrders()}
            aria-label="Actualiser la liste des commandes"
          >
            <RefreshCw className="h-4 w-4" aria-hidden />
            Actualiser
          </button>
        )}
      </div>

      {!isLoading && orders.length > 0 && (
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-border/50 bg-surface-muted/40 px-4 py-3">
            <p className="text-xs font-medium text-text-muted">Total</p>
            <p className="mt-1 text-2xl font-semibold text-text">{orders.length}</p>
          </div>
          <div className="rounded-2xl border border-brand/20 bg-brand-muted/30 px-4 py-3">
            <p className="text-xs font-medium text-brand">En cours</p>
            <p className="mt-1 text-2xl font-semibold text-brand">{activeCount}</p>
          </div>
          <div className="rounded-2xl border border-border/50 bg-surface-muted/40 px-4 py-3">
            <p className="text-xs font-medium text-text-muted">Terminées</p>
            <p className="mt-1 text-2xl font-semibold text-text">{countByFilter(orders, 'done')}</p>
          </div>
        </div>
      )}

      {!isLoading && orders.length > 0 && (
        <div
          className="mt-5 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filtrer les commandes"
        >
          {filterOptions.map((option) => {
            const count = countByFilter(orders, option.id)
            const isActive = filter === option.id
            return (
              <button
                key={option.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(option.id)}
                className={[
                  'inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
                  isActive
                    ? 'bg-brand text-white shadow-sm shadow-brand/25'
                    : 'border border-border/60 bg-surface text-text-muted hover:border-brand/25 hover:text-brand',
                ].join(' ')}
              >
                {option.label}
                <span
                  className={[
                    'rounded-full px-1.5 py-0.5 text-[10px] font-bold',
                    isActive ? 'bg-white/20 text-white' : 'bg-surface-muted text-text-muted',
                  ].join(' ')}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      )}

      {actionError && (
        <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800" role="alert">
          {actionError}
        </p>
      )}

      {isLoading && <OrdersListSkeleton />}

      {error && (
        <p className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800" role="alert">
          {error}
        </p>
      )}

      {!isLoading && !error && orders.length === 0 && <OrdersEmptyState />}

      {!isLoading && orders.length > 0 && filteredOrders.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-border/80 bg-surface-muted/50 px-6 py-10 text-center">
          <Package className="mx-auto h-9 w-9 text-text-muted/50" aria-hidden strokeWidth={1.5} />
          <p className="mt-3 text-sm font-medium text-text">Aucune commande dans cette catégorie</p>
          <button
            type="button"
            className={`${dashboardSecondaryButtonClassName} mt-4`}
            onClick={() => setFilter('all')}
          >
            Voir toutes les commandes
          </button>
        </div>
      )}

      {!isLoading && filteredOrders.length > 0 && (
        <ul className="mt-6 space-y-4">
          {filteredOrders.map((order) => (
            <li key={order.id}>
              <OrderCard
                order={order}
                onDetail={(id) => void openDetail(id)}
                onTrack={onTrackOrder}
                onReview={onReviewOrder}
                onEdit={setEditOrder}
                onCancel={(o) => void handleCancel(o)}
              />
            </li>
          ))}
        </ul>
      )}

      <OrderDetailModal
        order={detailOrder}
        isLoading={detailLoading && detailId !== null}
        error={detailError}
        onClose={closeDetail}
        onReviewOrder={onReviewOrder}
      />

      <OrderEditModal
        order={editOrder}
        onClose={() => setEditOrder(null)}
        onUpdated={() => void loadOrders()}
      />
    </section>
  )
}
