import { useCallback, useEffect, useState } from 'react'
import { cancelMyOrder, getMyOrder, getMyOrders } from '../api/ordersApi'
import type { UserOrderListItem } from '../types/dashboard'
import { formatDateFr, formatDateTimeFr, formatPrice } from '../utils/orderStatus'
import { parseApiError } from '../utils/parseApiError'
import { OrderDetailModal } from './OrderDetailModal'
import { OrderEditModal } from './OrderEditModal'
import { StatusBadge } from './StatusBadge'

const primaryButtonClassName =
  'inline-flex cursor-pointer items-center justify-center rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

const secondaryButtonClassName =
  'inline-flex cursor-pointer items-center justify-center rounded-full border border-border bg-surface-elevated px-4 py-2 text-xs font-medium text-text transition hover:border-brand/30 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

const dangerButtonClassName =
  'inline-flex cursor-pointer items-center justify-center rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-medium text-rose-800 transition hover:bg-rose-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

type OrdersSectionProps = {
  onTrackOrder: (orderId: number) => void
  refreshKey?: number
}

export function OrdersSection({ onTrackOrder, refreshKey = 0 }: OrdersSectionProps) {
  const [orders, setOrders] = useState<UserOrderListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
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
    <section aria-labelledby="orders-section-title" className="rounded-2xl border border-border/60 bg-surface-elevated p-6 shadow-sm sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Commandes</p>
      <h2 id="orders-section-title" className="mt-2 text-xl font-bold text-text">
        Mes commandes
      </h2>

      {actionError && (
        <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800" role="alert">
          {actionError}
        </p>
      )}

      {isLoading && (
        <p className="mt-6 text-sm text-text-muted" role="status">
          Chargement des commandes…
        </p>
      )}

      {error && (
        <p className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800" role="alert">
          {error}
        </p>
      )}

      {!isLoading && !error && orders.length === 0 && (
        <p className="mt-6 text-sm text-text-muted">Vous n'avez pas encore passé de commande.</p>
      )}

      {!isLoading && orders.length > 0 && (
        <ul className="mt-6 space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="rounded-xl border border-border/60 bg-surface p-4 sm:p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-text">{order.numeroCommande}</p>
                  <p className="mt-1 text-sm text-text-muted">{order.menuTitre}</p>
                </div>
                <StatusBadge statut={order.statut} />
              </div>

              <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-text-muted">Prestation</dt>
                  <dd className="text-text">
                    {formatDateFr(order.datePrestation)} à {order.heureLivraison}
                  </dd>
                </div>
                <div>
                  <dt className="text-text-muted">Adresse</dt>
                  <dd className="text-text">
                    {order.adressePrestation}, {order.villePrestation}
                  </dd>
                </div>
                <div>
                  <dt className="text-text-muted">Personnes</dt>
                  <dd className="text-text">{order.nombrePersonne}</dd>
                </div>
                <div>
                  <dt className="text-text-muted">Total</dt>
                  <dd className="font-medium text-text">{formatPrice(order.total)}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-text-muted">Créée le</dt>
                  <dd className="text-text">{formatDateTimeFr(order.dateCommande)}</dd>
                </div>
              </dl>

              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" className={primaryButtonClassName} onClick={() => void openDetail(order.id)}>
                  Voir le détail
                </button>
                <button
                  type="button"
                  className={secondaryButtonClassName}
                  disabled={!order.canTrack}
                  onClick={() => onTrackOrder(order.id)}
                  title={!order.canTrack ? 'Suivi disponible une fois la commande acceptée' : undefined}
                >
                  Suivi
                </button>
                <button
                  type="button"
                  className={secondaryButtonClassName}
                  disabled={!order.canEdit}
                  onClick={() => setEditOrder(order)}
                  title={!order.canEdit ? 'Modification impossible après acceptation' : undefined}
                >
                  Modifier
                </button>
                <button
                  type="button"
                  className={dangerButtonClassName}
                  disabled={!order.canCancel}
                  onClick={() => void handleCancel(order)}
                  title={!order.canCancel ? 'Annulation impossible après acceptation' : undefined}
                >
                  Annuler
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <OrderDetailModal
        order={detailOrder}
        isLoading={detailLoading && detailId !== null}
        error={detailError}
        onClose={closeDetail}
      />

      <OrderEditModal
        order={editOrder}
        onClose={() => setEditOrder(null)}
        onUpdated={() => void loadOrders()}
      />
    </section>
  )
}
