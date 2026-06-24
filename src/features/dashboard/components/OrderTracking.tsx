import { ArrowLeft, Check, Circle, Package, RefreshCw } from 'lucide-react'
import type { OrderStatus, OrderTracking } from '../types/dashboard'
import { dashboardSecondaryButtonClassName } from '../dashboardUi'
import {
  ORDER_STATUS_LABELS,
  formatTrackingDateParts,
  getTrackingProgressPercent,
} from '../utils/orderStatus'
import { StatusBadge } from './StatusBadge'

type TrackingEtape = OrderTracking['etapes'][number] & {
  isInferred?: boolean
}

type OrderTrackingProps = {
  tracking: OrderTracking | null
  isLoading: boolean
  isRefreshing?: boolean
  error: string | null
  onRefresh?: () => void
  onBack?: () => void
}

function sortEtapes(etapes: OrderTracking['etapes']): TrackingEtape[] {
  return [...etapes].sort(
    (a, b) => new Date(a.dateModification).getTime() - new Date(b.dateModification).getTime(),
  )
}

/** Retourne toutes les étapes triées chronologiquement, sans en retirer. */
function normalizeEtapes(tracking: OrderTracking): TrackingEtape[] {
  const sorted = sortEtapes(tracking.etapes)

  const hasCurrentStatus = sorted.some((etape) => etape.statut === tracking.statutActuel)
  if (hasCurrentStatus) {
    return sorted
  }

  // Filet de sécurité si le statut actuel n'a pas encore d'entrée dédiée en base
  return [
    ...sorted,
    {
      id: -1,
      statut: tracking.statutActuel,
      dateModification: '',
      heureModification: '',
      isInferred: true,
    },
  ]
}

function TrackingSkeleton() {
  return (
    <div className="mt-8 space-y-4" role="status" aria-label="Chargement du suivi">
      {[0, 1, 2].map((key) => (
        <div key={key} className="flex gap-4">
          <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-surface-muted" />
          <div className="flex-1 space-y-2 rounded-2xl border border-border/40 bg-surface-muted/40 p-4">
            <div className="h-4 w-32 animate-pulse rounded bg-surface-muted" />
            <div className="h-3 w-48 animate-pulse rounded bg-surface-muted" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function OrderTrackingView({
  tracking,
  isLoading,
  isRefreshing = false,
  error,
  onRefresh,
  onBack,
}: OrderTrackingProps) {
  if (isLoading && !tracking) {
    return (
      <section aria-labelledby="tracking-loading-title">
        <h2 id="tracking-loading-title" className="text-xl font-semibold tracking-tight text-text">
          Suivi de commande
        </h2>
        <TrackingSkeleton />
      </section>
    )
  }

  if (error) {
    return (
      <section aria-labelledby="tracking-error-title">
        <h2 id="tracking-error-title" className="text-xl font-semibold tracking-tight text-text">
          Suivi de commande
        </h2>
        <p
          className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
          role="alert"
        >
          {error}
        </p>
        {onBack && (
          <button type="button" className={`${dashboardSecondaryButtonClassName} mt-4`} onClick={onBack}>
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Retour vers Mes commandes
          </button>
        )}
      </section>
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
        <div className="mt-8 rounded-2xl border border-dashed border-border/80 bg-surface-muted/50 px-6 py-12 text-center">
          <Package className="mx-auto h-10 w-10 text-text-muted/50" aria-hidden strokeWidth={1.5} />
          <p className="mt-3 text-sm font-medium text-text">Aucune commande sélectionnée</p>
          <p className="mt-1 text-sm text-text-muted">
            Rendez-vous dans « Mes commandes » et cliquez sur « Suivre ma commande ».
          </p>
        </div>
      </section>
    )
  }

  const etapes = normalizeEtapes(tracking)
  const progressPercent = getTrackingProgressPercent(tracking.statutActuel)
  const isCancelled = tracking.statutActuel === 'annulee'
  const isFinished = tracking.statutActuel === 'terminee' || isCancelled

  return (
    <section aria-labelledby="tracking-title">
      {/* En-tête */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="mb-3 inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-text-muted transition hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
              Mes commandes
            </button>
          )}
          <h2 id="tracking-title" className="text-xl font-semibold tracking-tight text-text">
            Suivi de commande
          </h2>
        </div>

        {onRefresh && (
          <button
            type="button"
            className={dashboardSecondaryButtonClassName}
            onClick={onRefresh}
            disabled={isRefreshing}
            aria-busy={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} aria-hidden />
            Actualiser
          </button>
        )}
      </div>

      {/* Carte résumé commande */}
      <div className="mt-5 rounded-2xl border border-border/60 bg-gradient-to-br from-surface to-surface-muted/40 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">Commande</p>
            <p className="mt-1 font-semibold text-text">{tracking.numeroCommande}</p>
          </div>
          <StatusBadge statut={tracking.statutActuel} />
        </div>

        {!isCancelled && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-text-muted">
              <span>Progression</span>
              <span className="font-medium text-text">{progressPercent} %</span>
            </div>
            <div
              className="mt-2 h-2 overflow-hidden rounded-full bg-border/50"
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progression de la commande"
            >
              <div
                className="h-full rounded-full bg-brand transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {isLoading && (
        <p className="mt-4 text-sm text-text-muted" role="status">
          Mise à jour du suivi…
        </p>
      )}

      {/* Timeline */}
      {etapes.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border/80 bg-surface-muted/50 px-6 py-10 text-center">
          <p className="text-sm text-text-muted">Aucun suivi disponible pour cette commande.</p>
        </div>
      ) : (
        <>
          <p className="mt-6 text-sm text-text-muted">
            {etapes.length} étape{etapes.length > 1 ? 's' : ''} enregistrée{etapes.length > 1 ? 's' : ''} — chaque
            changement de statut s&apos;ajoute à l&apos;historique.
          </p>
          <ol className="relative mt-4 space-y-0" aria-label="Historique du suivi">
            {etapes.map((etape, index) => {
              const isLast = index === etapes.length - 1
              const isPast = !isLast
              const isCurrent = isLast && !isFinished
              const label = ORDER_STATUS_LABELS[etape.statut as OrderStatus] ?? etape.statut
              const dateParts = etape.dateModification ? formatTrackingDateParts(etape.dateModification) : null
              const stepKey = etape.id > 0 ? `step-${etape.id}` : `step-${etape.statut}-${index}`

              return (
                <li key={stepKey} className="relative flex gap-4 pb-6 last:pb-0">
                {/* Colonne icône + ligne */}
                <div className="flex flex-col items-center">
                  <span
                    className={[
                      'relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                      isCurrent
                        ? 'border-brand bg-brand text-white shadow-md shadow-brand/30'
                        : isPast
                          ? 'border-brand/40 bg-brand/10 text-brand'
                          : 'border-border bg-surface-elevated text-text-muted',
                    ].join(' ')}
                    aria-hidden="true"
                  >
                    {isPast ? (
                      <Check className="h-4 w-4" strokeWidth={2.5} />
                    ) : isCurrent ? (
                      <Circle className="h-3 w-3 fill-current" strokeWidth={0} />
                    ) : (
                      <Check className="h-4 w-4" strokeWidth={2} />
                    )}
                  </span>
                  {index < etapes.length - 1 && (
                    <span
                      className={[
                        'mt-1 w-0.5 flex-1 min-h-[2rem]',
                        isPast ? 'bg-brand/30' : 'bg-border/60',
                      ].join(' ')}
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* Carte étape */}
                <div
                  className={[
                    'mb-2 flex-1 rounded-2xl border px-4 py-3.5 transition-colors sm:px-5',
                    isCurrent
                      ? 'border-brand/30 bg-brand-muted/30 shadow-sm'
                      : isPast
                        ? 'border-border/40 bg-surface/80'
                        : 'border-border/60 bg-surface-elevated',
                  ].join(' ')}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                        Étape {index + 1}
                      </p>
                      <p
                        className={[
                          'mt-0.5 text-sm font-semibold',
                          isCurrent ? 'text-brand' : isPast ? 'text-text' : 'text-text-muted',
                        ].join(' ')}
                      >
                        {label}
                      </p>
                    </div>
                    {isCurrent && (
                      <span className="inline-flex rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        En cours
                      </span>
                    )}
                    {isLast && isFinished && !isCancelled && (
                      <span className="inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                        Terminé
                      </span>
                    )}
                    {isLast && isCancelled && (
                      <span className="inline-flex rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-800">
                        Annulée
                      </span>
                    )}
                  </div>

                  {dateParts ? (
                    <p className="mt-1.5 text-sm text-text-muted">
                      <time dateTime={etape.dateModification}>
                        {dateParts.date}
                        <span className="mx-1.5 text-border" aria-hidden>
                          ·
                        </span>
                        <span className="font-medium text-text">{dateParts.time}</span>
                      </time>
                    </p>
                  ) : etape.isInferred ? (
                    <p className="mt-1.5 text-sm italic text-text-muted">Mise à jour en cours de synchronisation</p>
                  ) : null}
                </div>
              </li>
            )
          })}
          </ol>
        </>
      )}
    </section>
  )
}
