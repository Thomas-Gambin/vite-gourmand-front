import { Info } from 'lucide-react'

type MenuConditionsProps = {
  conditions: string
}

export function MenuConditions({ conditions }: MenuConditionsProps) {
  return (
    <section
      aria-labelledby="conditions-title"
      className="mt-16 overflow-hidden rounded-3xl border border-brand/15 bg-gradient-to-br from-brand-muted/80 via-surface-elevated to-surface-muted p-7 shadow-sm sm:p-8"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand/10">
          <Info className="h-5 w-5 text-brand" aria-hidden="true" strokeWidth={1.75} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Important</p>
          <h2 id="conditions-title" className="mt-1 text-xl font-bold text-text sm:text-2xl">
            Conditions de commande
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-text-muted sm:text-base">{conditions}</p>
        </div>
      </div>
    </section>
  )
}
