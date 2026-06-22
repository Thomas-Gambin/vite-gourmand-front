import { Clock, MapPin, UtensilsCrossed } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LEGAL_LINKS } from '../../config/navigation'
import { OPENING_HOURS } from '../../config/openingHours'

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface-muted">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 md:grid-cols-3 md:gap-12">
        <div>
          <div className="flex items-center gap-2.5">
            <UtensilsCrossed
              className="h-5 w-5 text-brand"
              aria-hidden="true"
              strokeWidth={1.75}
            />
            <p className="text-base font-semibold text-brand">Vite &amp; Gourmand</p>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-muted">
            Traiteur à Bordeaux depuis 25 ans, pour vos repas, événements et menus de
            saison.
          </p>
          <p className="mt-4 flex items-center gap-2 text-sm text-text-muted">
            <MapPin className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" strokeWidth={1.75} />
            Bordeaux
          </p>
        </div>

        <div>
          <h2 className="flex items-center gap-2 font-semibold text-text">
            <Clock className="h-4 w-4 text-brand" aria-hidden="true" strokeWidth={1.75} />
            Horaires d&apos;ouverture
          </h2>
          <dl className="mt-3 space-y-1.5 text-sm">
            {OPENING_HOURS.map((entry) => (
              <div key={entry.day} className="flex justify-between gap-4">
                <dt className="text-text">{entry.day}</dt>
                <dd className={entry.isClosed ? 'font-medium text-brand' : 'text-text-muted'}>
                  {entry.hours}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="font-semibold text-text">Informations légales</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {LEGAL_LINKS.map((link) => {
              const Icon = link.icon
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-flex items-center gap-2 text-text-muted hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" strokeWidth={1.75} />
                    <span className="underline decoration-border underline-offset-[3px]">
                      {link.label}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-5 py-4 text-center text-xs text-text-muted">
        © {CURRENT_YEAR}{' '}
        <a
          href="https://www.thomas-gambin.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-violet-600 transition hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2"
        >
          Thomas Gambin
        </a>{' '}
        — Tous droits réservés.
      </div>
    </footer>
  )
}
