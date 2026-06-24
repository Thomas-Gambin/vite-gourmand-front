import { Check } from 'lucide-react'
import type { OrderTracking } from '../types/dashboard'
import { ORDER_STATUS_LABELS, formatDateTimeFr } from '../utils/orderStatus'
import { StatusBadge } from './StatusBadge'

type OrderTrackingProps = {
  tracking: OrderTracking | null
  isLoading: boolean
  error: string | null
}

export function OrderTrackingView({ tracking, isLoading, error }: OrderTrackingProps) {
  if (isLoading) {
    return (
      <p className="text-sm text-text-muted" role="status">
        Chargement du suivi…
      </p>
    )
  }

  if (error) {
    return (
      <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800" role="alert">
        {error}
      </p>
    )
  }

  if (!tracking) {
    return (
      <section aria-labelledby="tracking-empty-title">
        <h2 id="tracking-empty-title" className="text-xl font-semibold tracking-tight text-text">
          Suivi de commande
        </h2>
        <p className="mt-1.5 text-sm text-text-muted">
          Sélectionnez une commande éligible depuis l&apos;onglet « Mes commandes » pour afficher son suivi.
        </p>
        <div className="mt-8 rounded-2xl border border-dashed border-border/80 bg-surface-muted/50 px-6 py-10 text-center">
          <p className="text-sm text-text-muted">Aucune commande sélectionnée pour le moment.</p>
        </div>
      </section>
    )
  }

  return (
    <section aria-labelledby="tracking-title">
      <h2 id="tracking-title" className="text-xl font-semibold tracking-tight text-text">
        Suivi de commande
      </h2>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <p className="text-sm font-medium text-text">{tracking.numeroCommande}</p>
        <StatusBadge statut={tracking.statutActuel} />
      </div>

      <ol className="relative mt-8 space-y-0 border-l-2 border-brand/20 pl-6">
        {tracking.etapes.map((etape, index) => {
          const isLast = index === tracking.etapes.length - 1
          return (
            <li key={`${etape.statut}-${etape.dateModification}`} className="relative pb-8 last:pb-0">
              <span
                className={[
                  'absolute -left-[1.9rem] flex h-7 w-7 items-center justify-center rounded-full border-2',
                  isLast ? 'border-brand bg-brand text-white' : 'border-brand/30 bg-surface-elevated text-brand',
                ].join(' ')}
                aria-hidden="true"
              >
                {isLast ? <Check className="h-4 w-4" strokeWidth={2} /> : null}
              </span>
              <p className="text-sm font-semibold text-text">
                {ORDER_STATUS_LABELS[etape.statut] ?? etape.statut}
              </p>
              <p className="mt-1 text-sm text-text-muted">{formatDateTimeFr(etape.dateModification)}</p>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
