import { UtensilsCrossed } from 'lucide-react'

type MenuImagePlaceholderProps = {
  title?: string
  className?: string
  iconClassName?: string
  rounded?: boolean
}

export function MenuImagePlaceholder({
  title,
  className = '',
  iconClassName = 'h-12 w-12',
  rounded = false,
}: MenuImagePlaceholderProps) {
  return (
    <div
      className={`relative flex w-full items-center justify-center overflow-hidden bg-gradient-to-br from-brand-muted via-surface-muted to-brand/5 ${
        rounded ? 'rounded-2xl' : ''
      } ${className}`}
      role={title ? 'img' : undefined}
      aria-label={title ? `Aucune photo disponible pour le menu ${title}` : undefined}
      aria-hidden={title ? undefined : true}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(107,44,53,0.08),transparent_50%)]"
        aria-hidden="true"
      />
      <div className="relative flex flex-col items-center gap-3 text-brand/45">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-brand/10 bg-surface-elevated/80 shadow-inner">
          <UtensilsCrossed className={iconClassName} strokeWidth={1.25} aria-hidden="true" />
        </div>
        {title ? (
          <span className="px-4 text-center text-xs font-medium uppercase tracking-wider text-text-muted">
            Photo à venir
          </span>
        ) : null}
      </div>
    </div>
  )
}
