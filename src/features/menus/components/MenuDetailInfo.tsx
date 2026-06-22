import { AlertCircle, Users } from 'lucide-react'
import type { Menu } from '../types/menu'
import { formatPrice } from '../utils/formatPrice'

type MenuDetailInfoProps = {
  menu: Menu
}

export function MenuDetailInfo({ menu }: MenuDetailInfoProps) {
  return (
    <div className="mt-5 space-y-5">
      {(menu.theme || menu.diet) && (
        <div className="flex flex-wrap gap-2">
          {menu.theme ? (
            <span className="rounded-full bg-brand-muted px-2.5 py-0.5 text-xs font-medium text-brand">
              {menu.theme}
            </span>
          ) : null}
          {menu.diet ? (
            <span className="rounded-full border border-border/70 px-2.5 py-0.5 text-xs font-medium text-text-muted">
              {menu.diet}
            </span>
          ) : null}
        </div>
      )}

      <dl className="space-y-3 rounded-2xl border border-border/60 bg-surface-elevated p-5">
        <div className="flex items-baseline justify-between gap-3">
          <dt className="text-sm text-text-muted">Prix par personne</dt>
          <dd className="text-xl font-semibold text-text">{formatPrice(menu.price)}</dd>
        </div>
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <Users className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" strokeWidth={1.75} />
          <dt className="sr-only">Nombre minimum de personnes</dt>
          <dd>
            À partir de {menu.minimumPeople} personne{menu.minimumPeople > 1 ? 's' : ''}
          </dd>
        </div>
        <div className="border-t border-border/70 pt-3">
          <dt className="text-sm text-text-muted">Stock disponible</dt>
          <dd className="mt-1 text-sm font-medium text-text">
            {menu.stock > 0
              ? `${menu.stock} commande${menu.stock > 1 ? 's' : ''}`
              : 'Épuisé'}
          </dd>
        </div>
      </dl>

      {menu.stock === 0 ? (
        <p className="flex items-start gap-2 rounded-2xl border border-border bg-surface-muted px-4 py-3 text-sm text-text">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" strokeWidth={1.75} />
          <span>Ce menu n’est plus disponible pour le moment.</span>
        </p>
      ) : (
        <p className="text-sm text-text-muted">
          Stock disponible : {menu.stock} commande{menu.stock > 1 ? 's' : ''}
        </p>
      )}
    </div>
  )
}
