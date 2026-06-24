import { AlertCircle, Package, Users } from 'lucide-react'
import type { Menu } from '../types/menu'
import { formatPrice } from '../utils/formatPrice'

type MenuDetailInfoProps = {
  menu: Menu
}

const statCardClassName =
  'flex flex-col justify-center rounded-2xl border border-border/40 bg-gradient-to-br from-surface-elevated to-brand-muted/30 px-4 py-4'

export function MenuDetailInfo({ menu }: MenuDetailInfoProps) {
  return (
    <div className="mt-8 space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className={statCardClassName}>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-text-muted">
            Prix / pers.
          </p>
          <p className="mt-1.5 text-2xl font-bold tracking-tight text-brand">{formatPrice(menu.price)}</p>
        </div>
        <div className={statCardClassName}>
          <p className="flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-text-muted">
            <Users className="h-3.5 w-3.5 text-brand/80" aria-hidden strokeWidth={1.75} />
            Minimum
          </p>
          <p className="mt-1.5 text-lg font-semibold text-text">
            {menu.minimumPeople} pers.
          </p>
        </div>
        <div className={statCardClassName}>
          <p className="flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-text-muted">
            <Package className="h-3.5 w-3.5 text-brand/80" aria-hidden strokeWidth={1.75} />
            Disponibilité
          </p>
          <p className={`mt-1.5 text-lg font-semibold ${menu.stock > 0 ? 'text-text' : 'text-rose-700'}`}>
            {menu.stock > 0 ? `${menu.stock} restant${menu.stock > 1 ? 's' : ''}` : 'Épuisé'}
          </p>
        </div>
      </div>

      {menu.stock === 0 ? (
        <p className="flex items-start gap-2.5 rounded-2xl border border-rose-200/70 bg-rose-50/90 px-4 py-3.5 text-sm text-rose-800">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden strokeWidth={1.75} />
          <span>Ce menu n&apos;est plus disponible pour le moment.</span>
        </p>
      ) : null}
    </div>
  )
}
