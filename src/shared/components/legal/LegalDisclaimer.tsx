type LegalDisclaimerProps = {
  children: string
}

export function LegalDisclaimer({ children }: LegalDisclaimerProps) {
  return (
    <p
      role="note"
      className="rounded-xl border border-border bg-surface-muted px-4 py-3 text-sm leading-relaxed text-text-muted"
    >
      {children}
    </p>
  )
}
