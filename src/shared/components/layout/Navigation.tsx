import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { NAV_ITEMS } from '../../config/navigation'
import { UserMenu } from './UserMenu'

type NavigationProps = {
  isOpen: boolean
  onClose: () => void
  variant: 'desktop' | 'mobile'
}

function desktopLinkClassName({ isActive }: { isActive: boolean }) {
  const base =
    'flex items-center gap-2 border-b-2 px-1 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2'
  const inactive = 'border-transparent text-text-muted hover:border-border hover:text-text'
  const active = 'border-brand font-medium text-brand'

  return `${base} ${isActive ? active : inactive}`
}

function mobileLinkClassName({ isActive }: { isActive: boolean }) {
  const base =
    'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2'
  const inactive = 'text-text-muted hover:bg-brand-muted hover:text-text'
  const active = 'bg-brand-muted font-medium text-brand'

  return `${base} ${isActive ? active : inactive}`
}

export function Navigation({ isOpen, onClose, variant }: NavigationProps) {
  useEffect(() => {
    if (!isOpen || variant !== 'mobile') return

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose, variant])

  if (variant === 'desktop') {
    return (
      <nav
        id="main-navigation"
        aria-label="Navigation principale"
        className="hidden md:block"
      >
        <ul className="flex items-center gap-5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={desktopLinkClassName}
                  end={item.to === '/'}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" strokeWidth={1.75} />
                  {item.label}
                </NavLink>
              </li>
            )
          })}
          <UserMenu variant="desktop" />
        </ul>
      </nav>
    )
  }

  if (!isOpen) return null

  return (
    <nav
      id="main-navigation-mobile"
      aria-label="Navigation principale"
      className="border-t border-border bg-surface-muted md:hidden"
    >
      <ul className="flex flex-col gap-0.5 px-4 py-3">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          return (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={mobileLinkClassName}
                end={item.to === '/'}
                onClick={onClose}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" strokeWidth={1.75} />
                {item.label}
              </NavLink>
            </li>
          )
        })}
        <UserMenu variant="mobile" onNavigate={onClose} />
      </ul>
    </nav>
  )
}
