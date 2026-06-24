import {
  CalendarDays,
  ChevronRight,
  MapPin,
  MessageSquare,
  Pencil,
  Receipt,
  Route,
  Users,
  XCircle,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  dashboardPrimaryButtonClassName,
  dashboardSecondaryButtonClassName,
} from '../dashboardUi'
import type { UserOrderListItem } from '../types/dashboard'
import { formatDateFr, formatDateTimeFr, formatPrice, getTrackingProgressPercent } from '../utils/orderStatus'
import { StatusBadge } from './StatusBadge'

const dangerButtonClassName =
  'inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-medium text-rose-800 transition hover:bg-rose-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2'

type OrderCardProps = {
  order: UserOrderListItem
  onDetail: (id: number) => void
  onTrack: (id: number) => void
  onReview: (id: number) => void
  onEdit: (order: UserOrderListItem) => void
  onCancel: (order: UserOrderListItem) => void
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays
  label: string
  value: string
}) {
  return (
    <div className="flex gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-muted/60 text-brand">
        <Icon className="h-4 w-4" aria-hidden strokeWidth={1.75} />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-text-muted">{label}</p>
        <p className="mt-0.5 text-sm font-medium text-text">{value}</p>
      </div>
    </div>
  )
}

export function OrderCard({ order, onDetail, onTrack, onReview, onEdit, onCancel }: OrderCardProps) {
  const progressPercent = getTrackingProgressPercent(order.statut)
  const showProgress = order.canTrack && order.statut !== 'annulee'
  const isTerminal = order.statut === 'terminee' || order.statut === 'annulee'

  return (
    <article className="overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-surface to-surface-muted/30 shadow-sm transition hover:border-brand/25 hover:shadow-md">
      {/* En-tête */}
      <div className="border-b border-border/40 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">Commande</p>
            <h3 className="mt-1 font-semibold text-text">{order.numeroCommande}</h3>
            <p className="mt-1 truncate text-sm text-text-muted">{order.menuTitre}</p>
          </div>
          <StatusBadge statut={order.statut} />
        </div>

        {showProgress && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-text-muted">
              <span>Avancement</span>
              <span className="font-medium text-text">{progressPercent} %</span>
            </div>
            <div
              className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-border/50"
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Avancement de la commande ${order.numeroCommande}`}
            >
              <div
                className="h-full rounded-full bg-brand transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Infos */}
      <div className="grid gap-4 px-5 py-4 sm:grid-cols-2 sm:px-6 sm:py-5">
        <InfoItem
          icon={CalendarDays}
          label="Prestation"
          value={`${formatDateFr(order.datePrestation)} à ${order.heureLivraison}`}
        />
        <InfoItem
          icon={MapPin}
          label="Adresse"
          value={`${order.adressePrestation}, ${order.villePrestation}`}
        />
        <InfoItem icon={Users} label="Personnes" value={String(order.nombrePersonne)} />
        <InfoItem icon={Receipt} label="Total" value={formatPrice(order.total)} />
      </div>

      <p className="border-t border-border/40 px-5 py-2.5 text-xs text-text-muted sm:px-6">
        Commandée le {formatDateTimeFr(order.dateCommande)}
      </p>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 border-t border-border/40 bg-surface-muted/30 px-5 py-4 sm:px-6">
        {order.canTrack && (
          <button
            type="button"
            className={dashboardPrimaryButtonClassName}
            onClick={() => onTrack(order.id)}
          >
            <Route className="h-4 w-4" aria-hidden />
            Suivre ma commande
          </button>
        )}
        {order.canReview && (
          <button
            type="button"
            className={dashboardPrimaryButtonClassName}
            onClick={() => onReview(order.id)}
          >
            <MessageSquare className="h-4 w-4" aria-hidden />
            Donner mon avis
          </button>
        )}
        <button
          type="button"
          className={dashboardSecondaryButtonClassName}
          onClick={() => onDetail(order.id)}
        >
          Voir le détail
        </button>
        {order.canEdit && (
          <button type="button" className={dashboardSecondaryButtonClassName} onClick={() => onEdit(order)}>
            <Pencil className="h-4 w-4" aria-hidden />
            Modifier
          </button>
        )}
        {order.canCancel && (
          <button type="button" className={dangerButtonClassName} onClick={() => onCancel(order)}>
            <XCircle className="h-4 w-4" aria-hidden />
            Annuler
          </button>
        )}
      </div>

      {!order.canReview && !isTerminal && (
        <p className="border-t border-border/30 px-5 py-3 text-xs text-text-muted sm:px-6">
          Vous pourrez déposer un avis lorsque la commande sera terminée.
        </p>
      )}
    </article>
  )
}

export function OrdersListSkeleton() {
  return (
    <div className="mt-8 space-y-4" role="status" aria-label="Chargement des commandes">
      {[0, 1].map((key) => (
        <div key={key} className="overflow-hidden rounded-2xl border border-border/40 bg-surface-muted/30">
          <div className="border-b border-border/40 p-5 sm:p-6">
            <div className="h-4 w-24 animate-pulse rounded bg-surface-muted" />
            <div className="mt-3 h-5 w-40 animate-pulse rounded bg-surface-muted" />
            <div className="mt-2 h-4 w-56 animate-pulse rounded bg-surface-muted" />
          </div>
          <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
            {[0, 1, 2, 3].map((item) => (
              <div key={item} className="flex gap-3">
                <div className="h-9 w-9 animate-pulse rounded-xl bg-surface-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-16 animate-pulse rounded bg-surface-muted" />
                  <div className="h-4 w-32 animate-pulse rounded bg-surface-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function OrdersEmptyState() {
  return (
    <div className="mt-8 rounded-2xl border border-dashed border-border/80 bg-surface-muted/50 px-6 py-12 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-muted/80 text-brand">
        <CalendarDays className="h-7 w-7" aria-hidden strokeWidth={1.5} />
      </div>
      <p className="mt-4 text-base font-semibold text-text">Aucune commande pour le moment</p>
      <p className="mt-1.5 text-sm text-text-muted">
        Découvrez nos menus traiteur et passez votre première commande en quelques clics.
      </p>
      <Link
        to="/menus"
        className={`${dashboardPrimaryButtonClassName} mt-6 inline-flex`}
      >
        Parcourir les menus
        <ChevronRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  )
}
