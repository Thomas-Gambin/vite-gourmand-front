import { Menu, UtensilsCrossed, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navigation } from './Navigation'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function toggleMenu() {
    setIsMenuOpen((open) => !open)
  }

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface-elevated">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-surface-elevated focus:px-3 focus:py-2 focus:text-brand"
      >
        Aller au contenu principal
      </a>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3.5">
        <Link
          to="/"
          className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-surface-elevated">
            <UtensilsCrossed className="h-4 w-4" aria-hidden="true" strokeWidth={1.75} />
          </span>
          <span className="leading-tight">
            <span className="block text-base font-semibold text-brand sm:text-lg">
              Vite &amp; Gourmand
            </span>
            <span className="block text-xs text-text-muted">Traiteur à Bordeaux</span>
          </span>
        </Link>

        <Navigation isOpen={false} onClose={closeMenu} variant="desktop" />

        <button
          type="button"
          className="rounded-md border border-border p-2 text-text hover:border-brand/40 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 md:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation-mobile"
          aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" strokeWidth={1.5} />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" strokeWidth={1.5} />
          )}
        </button>
      </div>

      <Navigation isOpen={isMenuOpen} onClose={closeMenu} variant="mobile" />
    </header>
  )
}
