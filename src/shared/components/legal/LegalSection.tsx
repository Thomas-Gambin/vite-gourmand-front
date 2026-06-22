import type { ReactNode } from 'react'

type LegalSectionProps = {
  id: string
  title: string
  children: ReactNode
}

export function LegalSection({ id, title, children }: LegalSectionProps) {
  return (
    <section aria-labelledby={id} className="space-y-3">
      <h2 id={id} className="text-xl font-semibold text-text sm:text-2xl">
        {title}
      </h2>
      <div className="space-y-3 text-sm leading-relaxed text-text-muted sm:text-base [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  )
}
