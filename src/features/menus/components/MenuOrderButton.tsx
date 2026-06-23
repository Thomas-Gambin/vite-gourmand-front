import { type MouseEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../shared/hooks/useAuth'
import type { Menu } from '../types/menu'

type MenuOrderButtonProps = {
  menu: Menu
}

const buttonClassName =
  'mt-7 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-surface-elevated shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand-light hover:shadow-xl hover:shadow-brand/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2'

export function MenuOrderButton({ menu }: MenuOrderButtonProps) {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const isAvailable = menu.stock > 0
  const commandePath = `/commande/${menu.id}`

  if (!isAvailable) {
    return (
      <div className="mt-7">
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-full bg-brand/30 px-6 py-3.5 text-sm font-semibold text-surface-elevated/70"
        >
          Commander
        </button>
        <p className="mt-3 text-center text-sm text-text-muted" role="status">
          Commande indisponible : ce menu n’est plus en stock.
        </p>
      </div>
    )
  }

  function handleClick(event: MouseEvent) {
    if (!isAuthenticated) {
      event.preventDefault()
      navigate('/login', { state: { from: { pathname: commandePath } } })
    }
  }

  return (
    <Link to={commandePath} onClick={handleClick} className={buttonClassName}>
      Commander ce menu
      <ArrowRight className="h-4 w-4" aria-hidden="true" strokeWidth={1.75} />
    </Link>
  )
}
