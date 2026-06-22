import { Info } from 'lucide-react'

type MenuConditionsProps = {
  conditions: string
}

export function MenuConditions({ conditions }: MenuConditionsProps) {
  return (
    <section
      aria-labelledby="conditions-title"
      className="mt-10 rounded-2xl border border-border bg-surface-muted p-6"
    >
      <div className="flex items-start gap-3">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" strokeWidth={1.75} />
        <div>
          <h2 id="conditions-title" className="text-lg font-semibold text-text sm:text-xl">
            Conditions de commande
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-muted sm:text-base">{conditions}</p>
        </div>
      </div>
    </section>
  )
}
