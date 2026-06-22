import type { ReactNode } from 'react'
import { LegalDisclaimer } from './LegalDisclaimer'

type LegalPageLayoutProps = {
  title: string
  titleId: string
  disclaimer?: string
  children: ReactNode
}

export function LegalPageLayout({ title, titleId, disclaimer, children }: LegalPageLayoutProps) {
  return (
    <article aria-labelledby={titleId} className="mx-auto max-w-3xl break-words">
      <h1
        id={titleId}
        className="text-3xl font-semibold tracking-tight text-text sm:text-4xl"
      >
        {title}
      </h1>

      {disclaimer ? (
        <div className="mt-6">
          <LegalDisclaimer>{disclaimer}</LegalDisclaimer>
        </div>
      ) : null}

      <div className={`space-y-10 ${disclaimer ? 'mt-10' : 'mt-8'}`}>{children}</div>
    </article>
  )
}
