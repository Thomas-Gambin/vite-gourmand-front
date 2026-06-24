import { Info } from 'lucide-react'
import { menuDetailSectionClassName } from '../menuDetailUi'

type MenuConditionsProps = {
  conditions: string
}

export function MenuConditions({ conditions }: MenuConditionsProps) {
  return (
    <section
      aria-labelledby="conditions-title"
      className={`${menuDetailSectionClassName} overflow-hidden border-brand/20 bg-gradient-to-br from-brand-muted/50 via-surface-elevated to-surface-muted/60`}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand shadow-inner">
          <Info className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">Important</p>
          <h2 id="conditions-title" className="mt-2 text-xl font-bold tracking-tight text-text sm:text-2xl">
            Conditions de commande
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-text-muted sm:text-base">{conditions}</p>
        </div>
      </div>
    </section>
  )
}
