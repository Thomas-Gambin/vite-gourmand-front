import { X } from 'lucide-react'
import { useEffect } from 'react'
import type { UserOrderDetail } from '../types/dashboard'
import { formatDateFr, formatDateTimeFr, formatPrice } from '../utils/orderStatus'
import { StatusBadge } from './StatusBadge'

const secondaryButtonClassName =
  'inline-flex cursor-pointer items-center justify-center rounded-full border border-border bg-surface-elevated px-4 py-2 text-sm font-medium text-text transition hover:border-brand/30 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2'

type OrderDetailModalProps = {
  order: UserOrderDetail | null
  isLoading: boolean
  error: string | null
  onClose: () => void
}

export function OrderDetailModal({ order, isLoading, error, onClose }: OrderDetailModalProps) {
  useEffect(() => {
    if (!order && !isLoading) return

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [order, isLoading, onClose])

  if (!order && !isLoading && !error) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-text/40 p-4 sm:items-center"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-detail-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border/60 bg-surface-elevated p-6 shadow-xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Détail commande</p>
            <h2 id="order-detail-title" className="mt-2 text-xl font-bold text-text">
              {order?.numeroCommande ?? 'Chargement…'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="cursor-pointer rounded-lg p-2 text-text-muted transition hover:bg-surface-muted hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <X className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>

        {isLoading && (
          <p className="mt-6 text-sm text-text-muted" role="status">
            Chargement du détail…
          </p>
        )}

        {error && (
          <p className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800" role="alert">
            {error}
          </p>
        )}

        {order && !isLoading && (
          <div className="mt-6 space-y-6 text-sm">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge statut={order.statut} />
              <span className="text-text-muted">Créée le {formatDateTimeFr(order.dateCommande)}</span>
            </div>

            <dl className="grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-text-muted">Client</dt>
                <dd className="mt-1 text-text">
                  {order.client.prenom} {order.client.nom}
                  <br />
                  {order.client.email}
                  <br />
                  {order.client.telephone}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-text-muted">Menu</dt>
                <dd className="mt-1 text-text">{order.menu.titre}</dd>
              </div>
              <div>
                <dt className="font-semibold text-text-muted">Date de prestation</dt>
                <dd className="mt-1 text-text">
                  {formatDateFr(order.datePrestation)} à {order.heureLivraison}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-text-muted">Nombre de personnes</dt>
                <dd className="mt-1 text-text">{order.nombrePersonne}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-semibold text-text-muted">Adresse de prestation</dt>
                <dd className="mt-1 text-text">
                  {order.adressePrestation}, {order.codePostalPrestation ? `${order.codePostalPrestation} ` : ''}
                  {order.villePrestation}
                </dd>
              </div>
            </dl>

            <div className="rounded-xl border border-border/60 bg-surface p-4">
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-text-muted">Prix menu</dt>
                  <dd className="font-medium text-text">{formatPrice(order.prixMenu)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-text-muted">Frais de livraison</dt>
                  <dd className="font-medium text-text">{formatPrice(order.prixLivraison)}</dd>
                </div>
                {Number.parseFloat(order.remise) > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <dt>Réduction</dt>
                    <dd className="font-medium">− {formatPrice(order.remise)}</dd>
                  </div>
                )}
                <div className="flex justify-between border-t border-border/60 pt-2 text-base font-bold text-text">
                  <dt>Total</dt>
                  <dd>{formatPrice(order.total)}</dd>
                </div>
              </dl>
            </div>

            {order.historique.length > 0 && (
              <div>
                <h3 className="font-semibold text-text">Historique des statuts</h3>
                <ul className="mt-3 space-y-2">
                  {order.historique.map((entry) => (
                    <li key={entry.dateModification} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-surface-muted px-3 py-2">
                      <StatusBadge statut={entry.statut} />
                      <span className="text-text-muted">{formatDateTimeFr(entry.dateModification)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button type="button" onClick={onClose} className={secondaryButtonClassName}>
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
