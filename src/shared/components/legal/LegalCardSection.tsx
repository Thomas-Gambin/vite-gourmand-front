import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

type LegalCardSectionProps = {
  id: string
  title: string
  icon: LucideIcon
  children: ReactNode
}

export function LegalCardSection({ id, title, icon: Icon, children }: LegalCardSectionProps) {
  return (
    <section
      aria-labelledby={id}
      className="group rounded-[1.75rem] border border-border/70 bg-surface-elevated/80 p-6 shadow-sm transition hover:border-brand/20 hover:shadow-md hover:shadow-brand/5 sm:p-7"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-muted text-brand transition group-hover:bg-brand/10">
          <Icon className="h-5 w-5" aria-hidden="true" strokeWidth={1.75} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 id={id} className="text-lg font-semibold text-text sm:text-xl">
            {title}
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-text-muted sm:text-base [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}
