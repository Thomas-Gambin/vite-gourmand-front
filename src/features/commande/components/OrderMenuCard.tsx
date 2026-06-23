import { Package, Users, UtensilsCrossed } from 'lucide-react'
import type { Menu } from '../../menus/types/menu'
import { formatPrice } from '../../menus/utils/formatPrice'

type OrderMenuCardProps = {
  menu: Menu
}

export function OrderMenuCard({ menu }: OrderMenuCardProps) {
  return (
    <section
      aria-labelledby="selected-menu-title"
      className="overflow-hidden rounded-3xl border border-border/60 bg-surface-elevated shadow-sm"
    >
      <div className="border-b border-border/50 bg-gradient-to-r from-brand-muted/60 to-surface-elevated px-7 py-5 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand/10">
            <UtensilsCrossed className="h-5 w-5 text-brand" aria-hidden="true" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Menu sélectionné</p>
            <h2 id="selected-menu-title" className="text-xl font-bold text-text">
              {menu.title}
            </h2>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-text-muted">{menu.shortDescription}</p>
      </div>

      <div className="grid gap-3 p-7 sm:grid-cols-3 sm:p-8">
        <div className="rounded-2xl border border-border/50 bg-surface-muted/60 px-4 py-4">
          <p className="text-xs font-medium uppercase tracking-wide text-text-muted">Prix / pers.</p>
          <p className="mt-1 text-lg font-bold text-brand">{formatPrice(menu.price)}</p>
        </div>
        <div className="rounded-2xl border border-border/50 bg-surface-muted/60 px-4 py-4">
          <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-text-muted">
            <Users className="h-3.5 w-3.5 text-brand" aria-hidden="true" strokeWidth={1.75} />
            Minimum
          </p>
          <p className="mt-1 text-lg font-semibold text-text">{menu.minimumPeople} pers.</p>
        </div>
        <div className="rounded-2xl border border-border/50 bg-surface-muted/60 px-4 py-4">
          <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-text-muted">
            <Package className="h-3.5 w-3.5 text-brand" aria-hidden="true" strokeWidth={1.75} />
            Stock
          </p>
          <p className="mt-1 text-lg font-semibold text-text">{menu.stock}</p>
        </div>
      </div>
    </section>
  )
}
