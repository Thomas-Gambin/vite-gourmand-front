import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ScrollReveal } from '../../shared/components/motion/ScrollReveal'
import { MenuConditions } from './components/MenuConditions'
import { MenuDetailInfo } from './components/MenuDetailInfo'
import { MenuDishesSection } from './components/MenuDishesSection'
import { MenuGallery } from './components/MenuGallery'
import { MenuOrderButton } from './components/MenuOrderButton'
import { getMenuById } from './services/menusService'
import type { Menu } from './types/menu'

function BackToMenusLink() {
  return (
    <Link
      to="/menus"
      className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border/60 bg-surface-elevated/80 px-4 py-2 text-sm font-medium text-text-muted shadow-sm backdrop-blur-sm transition hover:border-brand/30 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" strokeWidth={1.75} />
      Retour aux menus
    </Link>
  )
}

function LoadingState() {
  return (
    <ScrollReveal className="mt-16">
      <div className="flex justify-center gap-2" role="status" aria-live="polite">
        <span className="sr-only">Chargement du menu…</span>
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
  )
}

function NotFoundState() {
  return (
    <ScrollReveal className="mt-16">
      <div className="rounded-3xl border border-dashed border-border/80 bg-surface-elevated px-6 py-12 text-center shadow-sm">
        <p className="text-sm text-text-muted">Menu introuvable.</p>
        <div className="mt-6">
          <BackToMenusLink />
        </div>
      </div>
    </ScrollReveal>
  )
}

export function MenuDetailPage() {
  const { id } = useParams()
  const menuId = Number(id)
  const isValidId = Number.isInteger(menuId) && menuId > 0

  const [menu, setMenu] = useState<Menu | null>(null)
  const [isLoading, setIsLoading] = useState(isValidId)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isValidId) {
      setIsLoading(false)
      return
    }

    let isMounted = true

    getMenuById(menuId)
      .then((data) => {
        if (isMounted) {
          setMenu(data)
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('Impossible de charger ce menu pour le moment.')
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
  }, [isValidId, menuId])

  return (
    <section aria-labelledby="menu-detail-title" className="relative">
      <div
        className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-brand/5 blur-3xl"
        aria-hidden="true"
      />

      <BackToMenusLink />

      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ScrollReveal className="mt-16">
          <p
            className="rounded-3xl border border-dashed border-border/80 bg-surface-elevated px-6 py-12 text-center text-sm text-text-muted shadow-sm"
            role="alert"
          >
            {error}
          </p>
        </ScrollReveal>
      ) : !isValidId || !menu ? (
        <NotFoundState />
      ) : (
        <>
          <div className="mt-10 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-14">
            <ScrollReveal>
              <MenuGallery title={menu.title} images={menu.images} />
            </ScrollReveal>

            <div className="mt-10 lg:sticky lg:top-24 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl border border-border/60 bg-surface-elevated/90 p-7 shadow-sm backdrop-blur-sm sm:p-8"
              >
                {(menu.theme || menu.diet) && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {menu.theme ? (
                      <span className="rounded-full bg-brand px-3 py-1 text-xs font-semibold uppercase tracking-wider text-surface-elevated">
                        {menu.theme}
                      </span>
                    ) : null}
                    {menu.diet ? (
                      <span className="rounded-full border border-border/80 bg-surface px-3 py-1 text-xs font-medium text-text-muted">
                        {menu.diet}
                      </span>
                    ) : null}
                  </div>
                )}

                <h1
                  id="menu-detail-title"
                  className="break-words text-3xl font-bold tracking-tight text-text sm:text-4xl"
                >
                  {menu.title}
                </h1>

                <p className="mt-3 text-base leading-relaxed text-text-muted">{menu.shortDescription}</p>

                <MenuDetailInfo menu={menu} />
                <MenuOrderButton menu={menu} />
              </motion.div>
            </div>
          </div>

          <ScrollReveal>
            <section
              aria-labelledby="description-title"
              className="mt-16 rounded-3xl border border-border/60 bg-surface-elevated p-7 shadow-sm sm:p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">À propos</p>
              <h2
                id="description-title"
                className="mt-2 text-2xl font-bold tracking-tight text-text sm:text-3xl"
              >
                Description du menu
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-muted sm:text-lg">
                {menu.fullDescription}
              </p>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <MenuDishesSection dishes={menu.dishes} />
          </ScrollReveal>

          <ScrollReveal>
            <MenuConditions conditions={menu.conditions} />
          </ScrollReveal>
        </>
      )}
    </section>
  )
}
