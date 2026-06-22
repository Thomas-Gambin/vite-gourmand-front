import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { ScrollReveal } from '../../shared/components/motion/ScrollReveal'
import { MenusFilters } from './components/MenusFilters'
import { MenusGrid } from './components/MenusGrid'
import { getMenus } from './services/menusService'
import type { Menu } from './types/menu'
import { EMPTY_MENU_FILTERS, type MenuFilters } from './types/menuFilters'
import { filterMenus } from './utils/filterMenus'

export function MenusPage() {
  const [allMenus, setAllMenus] = useState<Menu[]>([])
  const [filters, setFilters] = useState<MenuFilters>(EMPTY_MENU_FILTERS)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const filteredMenus = useMemo(
    () => filterMenus(allMenus, filters),
    [allMenus, filters],
  )

  useEffect(() => {
    let isMounted = true

    getMenus()
      .then((data) => {
        if (isMounted) {
          setAllMenus(data)
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('Impossible de charger les menus pour le moment.')
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  const handleResetFilters = () => {
    setFilters(EMPTY_MENU_FILTERS)
  }

  return (
    <section aria-labelledby="menus-title">
      <h1 id="menus-title" className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
        Nos menus
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
        Découvrez les menus proposés par Vite & Gourmand pour vos repas, événements et
        prestations sur mesure.
      </p>

      {isLoading ? (
        <ScrollReveal className="mt-12">
          <div className="flex justify-center gap-2" role="status" aria-live="polite">
            <span className="sr-only">Chargement des menus…</span>
            {[0, 1, 2].map((dot) => (
              <motion.span
                key={dot}
                className="h-2.5 w-2.5 rounded-full bg-brand/40"
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1, 0.85] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: dot * 0.15,
                  ease: 'easeInOut',
                }}
                aria-hidden="true"
              />
            ))}
          </div>
        </ScrollReveal>
      ) : error ? (
        <ScrollReveal className="mt-12">
          <p
            className="rounded-2xl border border-dashed border-border bg-surface-muted px-6 py-10 text-center text-sm text-text-muted"
            role="alert"
          >
            {error}
          </p>
        </ScrollReveal>
      ) : allMenus.length === 0 ? (
        <ScrollReveal className="mt-12">
          <p className="rounded-2xl border border-dashed border-border bg-surface-muted px-6 py-10 text-center text-sm text-text-muted">
            Aucun menu disponible pour le moment.
          </p>
        </ScrollReveal>
      ) : (
        <>
          <ScrollReveal>
            <MenusFilters
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
              resultCount={filteredMenus.length}
            />
          </ScrollReveal>

          {filteredMenus.length > 0 ? (
            <MenusGrid menus={filteredMenus} />
          ) : (
            <ScrollReveal className="mt-12">
              <div className="rounded-2xl border border-dashed border-border bg-surface-muted px-6 py-10 text-center">
                <p className="text-sm text-text-muted">
                  Aucun menu ne correspond à votre recherche.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-5 inline-flex items-center justify-center rounded-full border border-border/80 bg-surface-elevated px-6 py-3 text-sm font-medium text-text transition hover:border-brand/30 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            </ScrollReveal>
          )}
        </>
      )}
    </section>
  )
}
