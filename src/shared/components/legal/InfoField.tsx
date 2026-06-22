type InfoFieldProps = {
  label: string
  value: string
}

export function InfoField({ label, value }: InfoFieldProps) {
  return (
    <div className="rounded-xl border border-border/50 bg-surface-muted/60 px-4 py-3">
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">{label}</dt>
      <dd className="mt-1.5 text-sm font-medium text-text">{value}</dd>
    </div>
  )
}
