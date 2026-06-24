import type { OrderStatus } from '../types/dashboard'

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  en_attente: 'En attente',
  accepte: 'Acceptée',
  en_preparation: 'En préparation',
  en_cours_de_livraison: 'En cours de livraison',
  livre: 'Livrée',
  en_attente_retour_materiel: 'En attente du retour de matériel',
  terminee: 'Terminée',
  annulee: 'Annulée',
}

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  en_attente: 'bg-amber-100 text-amber-900',
  accepte: 'bg-sky-100 text-sky-900',
  en_preparation: 'bg-indigo-100 text-indigo-900',
  en_cours_de_livraison: 'bg-violet-100 text-violet-900',
  livre: 'bg-emerald-100 text-emerald-900',
  en_attente_retour_materiel: 'bg-orange-100 text-orange-900',
  terminee: 'bg-brand-muted text-brand',
  annulee: 'bg-rose-100 text-rose-900',
}

export function formatDateFr(isoDate: string): string {
  const date = new Date(isoDate.includes('T') ? isoDate : `${isoDate}T12:00:00`)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatDateTimeFr(isoDate: string): string {
  const date = new Date(isoDate)
  return date.toLocaleString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatPrice(value: string): string {
  return `${Number.parseFloat(value).toFixed(2).replace('.', ',')} €`
}

/** Étapes du parcours livraison (hors en_attente et annulee). */
export const TRACKING_PROGRESS_STATUSES: OrderStatus[] = [
  'accepte',
  'en_preparation',
  'en_cours_de_livraison',
  'livre',
  'en_attente_retour_materiel',
  'terminee',
]

export function getTrackingProgressPercent(statut: OrderStatus): number {
  if (statut === 'annulee') return 0
  const index = TRACKING_PROGRESS_STATUSES.indexOf(statut)
  if (index < 0) return 0
  if (TRACKING_PROGRESS_STATUSES.length <= 1) return 100
  return Math.round((index / (TRACKING_PROGRESS_STATUSES.length - 1)) * 100)
}

export function formatTrackingDateParts(isoDate: string): { date: string; time: string } {
  const date = new Date(isoDate)
  return {
    date: date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    time: date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  }
}
