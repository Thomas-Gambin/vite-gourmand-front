import { AlertCircle, Package, Users } from 'lucide-react'
import type { Menu } from '../types/menu'
import { formatPrice } from '../utils/formatPrice'

type MenuDetailInfoProps = {
  menu: Menu
}

export function MenuDetailInfo({ menu }: MenuDetailInfoProps) {
  return (
    <div className="mt-7 space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-border/50 bg-surface-muted/60 px-4 py-4">
          <p className="text-xs font-medium uppercase tracking-wide text-text-muted">Prix / pers.</p>
          <p className="mt-1 text-xl font-bold text-brand">{formatPrice(menu.price)}</p>
        </div>
        <div className="rounded-2xl border border-border/50 bg-surface-muted/60 px-4 py-4">
          <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-text-muted">
            <Users className="h-3.5 w-3.5 text-brand" aria-hidden="true" strokeWidth={1.75} />
            Minimum
          </p>
          <p className="mt-1 text-lg font-semibold text-text">
            {menu.minimumPeople} pers.
          </p>
        </div>
        <div className="rounded-2xl border border-border/50 bg-surface-muted/60 px-4 py-4">
          <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-text-muted">
            <Package className="h-3.5 w-3.5 text-brand" aria-hidden="true" strokeWidth={1.75} />
            Stock
          </p>
          <p className="mt-1 text-lg font-semibold text-text">
            {menu.stock > 0 ? `${menu.stock} restant${menu.stock > 1 ? 's' : ''}` : 'Épuisé'}
          </p>
        </div>
      </div>

      {menu.stock === 0 ? (
        <p className="flex items-start gap-2 rounded-2xl border border-rose-200/80 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" strokeWidth={1.75} />
          <span>Ce menu n’est plus disponible pour le moment.</span>
        </p>
      ) : null}
    </div>
  )
}
