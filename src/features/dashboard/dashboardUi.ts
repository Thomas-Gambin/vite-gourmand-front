export const dashboardPanelClassName =
  'rounded-3xl border border-border/60 bg-surface-elevated/95 p-6 shadow-lg shadow-brand/5 backdrop-blur-sm sm:p-8'

export const dashboardInputClassName =
  'mt-2 w-full rounded-xl border border-border/80 bg-surface px-4 py-3.5 pl-11 text-sm text-text transition placeholder:text-text-muted/70 focus-visible:border-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2'

export const dashboardReadOnlyInputClassName =
  'mt-2 w-full cursor-not-allowed rounded-xl border border-border/60 bg-surface-muted px-4 py-3.5 pl-11 text-sm text-text-muted'

export const dashboardPrimaryButtonClassName =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60'

export const dashboardSecondaryButtonClassName =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-border/80 bg-surface-elevated px-5 py-2.5 text-sm font-medium text-text transition hover:border-brand/30 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

export const dashboardTextareaClassName =
  'mt-2 w-full resize-y rounded-2xl border border-border/60 bg-surface px-4 py-3.5 text-sm leading-relaxed text-text transition placeholder:text-text-muted/60 focus-visible:border-brand/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/20'

export function getUserInitials(prenom: string, nom: string): string {
  const first = prenom.trim().charAt(0)
  const last = nom.trim().charAt(0)
  return `${first}${last}`.toUpperCase() || '?'
}
