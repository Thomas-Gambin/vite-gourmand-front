import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Users, UtensilsCrossed } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Menu } from '../types/menu'

type MenuCardProps = {
  menu: Menu
  index?: number
}

const priceFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
})

export function MenuCard({ menu, index = 0 }: MenuCardProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.article
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-surface-elevated shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-brand/10"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
    >
      {menu.imageUrl ? (
        <img
          src={menu.imageUrl}
          alt={menu.title}
          className="aspect-[16/10] w-full object-cover"
        />
      ) : (
        <div
          className="flex aspect-[16/10] w-full items-center justify-center bg-brand-muted"
          aria-hidden="true"
        >
          <UtensilsCrossed className="h-12 w-12 text-brand/40" strokeWidth={1.5} />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        {(menu.theme || menu.diet) && (
          <div className="mb-3 flex flex-wrap gap-2">
            {menu.theme ? (
              <span className="rounded-full bg-brand-muted px-2.5 py-0.5 text-xs font-medium text-brand">
                {menu.theme}
              </span>
            ) : null}
            {menu.diet ? (
              <span className="rounded-full border border-border/70 px-2.5 py-0.5 text-xs font-medium text-text-muted">
                {menu.diet}
              </span>
            ) : null}
          </div>
        )}

        <h2 className="text-lg font-semibold tracking-tight text-text sm:text-xl">
          {menu.title}
        </h2>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted sm:text-base">
          {menu.shortDescription}
        </p>

        <dl className="mt-5 space-y-2 border-t border-border/70 pt-4">
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-sm text-text-muted">Prix par personne</dt>
            <dd className="text-lg font-semibold text-text">
              {priceFormatter.format(menu.price)}
            </dd>
          </div>
        </dl>
        <p className="mt-2 flex items-center gap-2 text-sm text-text-muted">
          <Users className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" strokeWidth={1.75} />
          À partir de {menu.minimumPeople} personne{menu.minimumPeople > 1 ? 's' : ''}
        </p>

        <Link
          to={`/menus/${menu.id}`}
          className="group/link mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-surface-elevated shadow-lg shadow-brand/20 transition hover:-translate-y-0.5 hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          Voir le détail
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5"
            aria-hidden="true"
            strokeWidth={1.75}
          />
        </Link>
      </div>
    </motion.article>
  )
}
