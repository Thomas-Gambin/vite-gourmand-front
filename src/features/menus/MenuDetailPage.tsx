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
      className="inline-flex items-center gap-2 text-sm font-medium text-brand transition hover:text-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" strokeWidth={1.75} />
      Retour aux menus
    </Link>
  )
}

function LoadingState() {
  return (
    <ScrollReveal className="mt-12">
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
    <ScrollReveal className="mt-12">
      <div className="rounded-2xl border border-dashed border-border bg-surface-muted px-6 py-10 text-center">
        <p className="text-sm text-text-muted">Menu introuvable.</p>
        <div className="mt-5">
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
    <section aria-labelledby="menu-detail-title">
      <BackToMenusLink />

      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ScrollReveal className="mt-12">
          <p
            className="rounded-2xl border border-dashed border-border bg-surface-muted px-6 py-10 text-center text-sm text-text-muted"
            role="alert"
          >
            {error}
          </p>
        </ScrollReveal>
      ) : !isValidId || !menu ? (
        <NotFoundState />
      ) : (
        <>
          <div className="mt-8 lg:grid lg:grid-cols-2 lg:items-start lg:gap-10">
            <ScrollReveal>
              <MenuGallery title={menu.title} images={menu.images} />
            </ScrollReveal>

            <div className="mt-8 lg:mt-0">
              <h1
                id="menu-detail-title"
                className="break-words text-3xl font-semibold tracking-tight text-text sm:text-4xl"
              >
                {menu.title}
              </h1>
              <MenuDetailInfo menu={menu} />
              <MenuOrderButton menu={menu} />
            </div>
          </div>

          <ScrollReveal>
            <section aria-labelledby="description-title" className="mt-10">
              <h2
                id="description-title"
                className="text-2xl font-semibold tracking-tight text-text sm:text-3xl"
              >
                Description du menu
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-muted sm:text-lg">
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
