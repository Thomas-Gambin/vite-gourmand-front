import { Link } from 'react-router-dom'
import type { Menu } from '../types/menu'

type MenuOrderButtonProps = {
  menu: Menu
}

export function MenuOrderButton({ menu }: MenuOrderButtonProps) {
  const isAvailable = menu.stock > 0

  // TODO: quand l'authentification sera disponible,
  // rediriger les visiteurs non connectés vers /login avant la commande.

  if (!isAvailable) {
    return (
      <div className="mt-6">
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="inline-flex w-full items-center justify-center rounded-full bg-brand/40 px-6 py-3 text-sm font-medium text-surface-elevated/80 sm:w-auto"
        >
          Commander
        </button>
        <p className="mt-3 text-sm text-text-muted" role="status">
          Commande indisponible : ce menu n’est plus en stock.
        </p>
      </div>
    )
  }

  return (
    <Link
      to={`/commande?menuId=${menu.id}`}
      className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-medium text-surface-elevated shadow-lg shadow-brand/20 transition hover:-translate-y-0.5 hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:w-auto"
    >
      Commander
    </Link>
  )
}
