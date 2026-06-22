import { Mail, UtensilsCrossed } from 'lucide-react'
import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <section className="max-w-3xl">
      <div className="border-l-4 border-brand bg-surface-elevated px-6 py-8 sm:px-8 sm:py-10">
        <h1>Traiteur à Bordeaux</h1>
        <p className="max-w-xl text-base leading-relaxed">
          Vite &amp; Gourmand prépare vos repas, buffets et événements avec des produits de
          saison. Consultez nos menus ou contactez-nous pour un devis.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to="/menus"
            className="inline-flex items-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-medium text-surface-elevated hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <UtensilsCrossed className="h-4 w-4" aria-hidden="true" strokeWidth={1.75} />
            Voir les menus
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-medium text-text hover:border-brand/40 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <Mail className="h-4 w-4" aria-hidden="true" strokeWidth={1.75} />
            Nous contacter
          </Link>
        </div>
      </div>
    </section>
  )
}
