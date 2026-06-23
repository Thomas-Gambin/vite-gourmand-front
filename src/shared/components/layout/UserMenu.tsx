import { AnimatePresence, motion } from 'framer-motion'
import { LogIn, LogOut, User } from 'lucide-react'
import { useCallback, useEffect, useId, useRef, useState, type FocusEvent } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useOptionalAuth } from '../../hooks/useAuth'

type UserMenuProps = {
  variant: 'desktop' | 'mobile'
  onNavigate?: () => void
}

const menuItemClassName =
  'flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-text transition-colors hover:bg-brand-muted hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2'

function ConnexionLink({ variant, onNavigate }: UserMenuProps) {
  if (variant === 'mobile') {
    return (
      <li>
        <NavLink
          to="/login"
          onClick={onNavigate}
          className={({ isActive }) =>
            [
              'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
              isActive
                ? 'bg-brand-muted font-medium text-brand'
                : 'text-text-muted hover:bg-brand-muted hover:text-text',
            ].join(' ')
          }
        >
          <LogIn className="h-4 w-4 shrink-0" aria-hidden="true" strokeWidth={1.75} />
          Connexion
        </NavLink>
      </li>
    )
  }

  return (
    <li>
      <NavLink
        to="/login"
        className={({ isActive }) =>
          [
            'flex items-center gap-2 border-b-2 px-1 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
            isActive
              ? 'border-brand font-medium text-brand'
              : 'border-transparent text-text-muted hover:border-border hover:text-text',
          ].join(' ')
        }
      >
        <LogIn className="h-4 w-4 shrink-0" aria-hidden="true" strokeWidth={1.75} />
        Connexion
      </NavLink>
    </li>
  )
}

export function UserMenu({ variant, onNavigate }: UserMenuProps) {
  const auth = useOptionalAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLLIElement>(null)
  const menuId = useId()

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close])

  function handleBlur(event: FocusEvent<HTMLLIElement>) {
    if (!containerRef.current?.contains(event.relatedTarget as Node)) {
      close()
    }
  }

  async function handleLogout() {
    close()
    onNavigate?.()
    await auth?.logout()
    navigate('/login', { replace: true })
  }

  function handleNavClick() {
    close()
    onNavigate?.()
  }

  if (!auth || auth.isLoading) {
    return (
      <li aria-hidden="true">
        <span className="inline-block h-9 w-20 rounded-md bg-surface-muted" />
      </li>
    )
  }

  if (!auth.isAuthenticated || !auth.user) {
    return <ConnexionLink variant={variant} onNavigate={onNavigate} />
  }

  if (variant === 'mobile') {
    return (
      <>
        <li>
          <p className="px-3 pt-2 text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
            Mon compte
          </p>
        </li>
        <li>
          <Link
            to="/mon-compte"
            onClick={handleNavClick}
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-text-muted transition-colors hover:bg-brand-muted hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <User className="h-4 w-4 shrink-0" aria-hidden="true" strokeWidth={1.75} />
            Mon profil
          </Link>
        </li>
        <li>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-rose-700 transition-colors hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" strokeWidth={1.75} />
            Déconnexion
          </button>
        </li>
      </>
    )
  }

  return (
    <li
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={close}
      onBlur={handleBlur}
    >
      <button
        type="button"
        aria-label="Menu compte"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={open ? menuId : undefined}
        onFocus={() => setOpen(true)}
        className={[
          'flex cursor-pointer items-center gap-2 border-b-2 px-1 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
          open
            ? 'border-brand font-medium text-brand'
            : 'border-transparent text-text-muted hover:border-border hover:text-text',
        ].join(' ')}
      >
        <User className="h-4 w-4 shrink-0" aria-hidden="true" strokeWidth={1.75} />
        Mon compte
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="absolute right-0 top-full z-[60] pt-2"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              id={menuId}
              role="menu"
              aria-label="Menu compte utilisateur"
              className="min-w-[11rem] overflow-hidden rounded-xl border border-border/80 bg-surface-elevated p-1.5 shadow-lg"
            >
              <Link to="/mon-compte" role="menuitem" onClick={handleNavClick} className={menuItemClassName}>
                <User className="h-4 w-4 shrink-0" aria-hidden="true" strokeWidth={1.75} />
                Mon profil
              </Link>
              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className={`${menuItemClassName} text-rose-700 hover:bg-rose-50 hover:text-rose-800`}
              >
                <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" strokeWidth={1.75} />
                Déconnexion
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  )
}
