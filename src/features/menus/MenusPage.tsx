import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ScrollReveal } from '../../shared/components/motion/ScrollReveal'
import { MenusGrid } from './components/MenusGrid'
import { getMenus } from './services/menusService'
import type { Menu } from './types/menu'

export function MenusPage() {
  const [menus, setMenus] = useState<Menu[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    getMenus()
      .then((data) => {
        if (isMounted) {
          setMenus(data)
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
      ) : menus.length === 0 ? (
        <ScrollReveal className="mt-12">
          <p className="rounded-2xl border border-dashed border-border bg-surface-muted px-6 py-10 text-center text-sm text-text-muted">
            Aucun menu disponible pour le moment.
          </p>
        </ScrollReveal>
      ) : (
        <MenusGrid menus={menus} />
      )}
    </section>
  )
}
