import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ScrollReveal } from '../../shared/components/motion/ScrollReveal'
import { menuDetailSectionClassName } from './menuDetailUi'
import { MenuConditions } from './components/MenuConditions'
import { MenuDetailInfo } from './components/MenuDetailInfo'
import { MenuDetailSkeleton } from './components/MenuDetailSkeleton'
import { MenuDishesSection } from './components/MenuDishesSection'
import { MenuGallery } from './components/MenuGallery'
import { MenuOrderButton } from './components/MenuOrderButton'
import { MenuReviewsSection } from './components/MenuReviewsSection'
import { MenuSectionHeader } from './components/MenuSectionHeader'
import { getMenuById } from './services/menusService'
import type { Menu } from './types/menu'

function BackToMenusLink() {
  return (
    <Link
      to="/menus"
      className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border/50 bg-surface-elevated/90 px-4 py-2 text-sm font-medium text-text-muted shadow-sm backdrop-blur-md transition hover:border-brand/25 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden strokeWidth={1.75} />
      Tous les menus
    </Link>
  )
}

function NotFoundState() {
  return (
    <ScrollReveal className="mt-16">
      <div className="rounded-3xl border border-dashed border-border/80 bg-surface-elevated/80 px-6 py-14 text-center shadow-sm">
        <p className="text-base font-medium text-text">Menu introuvable</p>
        <p className="mt-2 text-sm text-text-muted">Ce menu n&apos;existe pas ou n&apos;est plus disponible.</p>
        <div className="mt-8">
          <BackToMenusLink />
        </div>
      </div>
    </ScrollReveal>
  )
}

const heroTransition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }

export function MenuDetailPage() {
  const { id } = useParams()
  const menuId = Number(id)
  const isValidId = Number.isInteger(menuId) && menuId > 0

  const [menu, setMenu] = useState<Menu | null>(null)
  const [isFetching, setIsFetching] = useState(isValidId)
  const [error, setError] = useState<string | null>(null)

  const [trackedMenuId, setTrackedMenuId] = useState(menuId)
  if (trackedMenuId !== menuId) {
    setTrackedMenuId(menuId)
    setMenu(null)
    setError(null)
    setIsFetching(isValidId)
  }

  const isLoading = isValidId && isFetching

  useEffect(() => {
    if (!isValidId) {
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
          setIsFetching(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [isValidId, menuId])

  return (
    <div className="relative pb-16">
      <div
        className="pointer-events-none absolute -left-20 top-32 h-80 w-80 rounded-full bg-brand/6 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 top-0 h-96 w-96 rounded-full bg-brand/8 blur-3xl"
        aria-hidden
      />

      <section aria-labelledby="menu-detail-title" className="relative">
        <div className="flex items-center justify-between gap-4">
          <BackToMenusLink />
          {menu ? (
            <p className="hidden text-xs font-medium uppercase tracking-[0.18em] text-text-muted sm:block">
              Menu gastronomique
            </p>
          ) : null}
        </div>

        {isLoading ? (
          <MenuDetailSkeleton />
        ) : error ? (
          <ScrollReveal className="mt-16">
            <p
              className="rounded-3xl border border-rose-200/70 bg-rose-50/80 px-6 py-12 text-center text-sm text-rose-800"
              role="alert"
            >
              {error}
            </p>
          </ScrollReveal>
        ) : !isValidId || !menu ? (
          <NotFoundState />
        ) : (
          <>
            <div className="mt-8 lg:mt-10 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:gap-12 xl:gap-16">
              <ScrollReveal>
                <MenuGallery title={menu.title} images={menu.images} />
              </ScrollReveal>

              <div className="mt-8 lg:sticky lg:top-24 lg:mt-0">
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={heroTransition}
                  className="overflow-hidden rounded-[1.75rem] border border-border/50 bg-surface-elevated/95 shadow-xl shadow-brand/10 ring-1 ring-border/30 backdrop-blur-sm"
                >
                  <div className="h-1 bg-gradient-to-r from-brand via-brand-light to-brand/40" aria-hidden />

                  <div className="p-7 sm:p-8">
                    {(menu.theme || menu.diet) && (
                      <div className="mb-5 flex flex-wrap gap-2">
                        {menu.theme ? (
                          <span className="rounded-full bg-brand px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-sm">
                            {menu.theme}
                          </span>
                        ) : null}
                        {menu.diet ? (
                          <span className="rounded-full border border-border/60 bg-surface px-3 py-1 text-xs font-medium text-text-muted">
                            {menu.diet}
                          </span>
                        ) : null}
                      </div>
                    )}

                    <h1
                      id="menu-detail-title"
                      className="text-balance text-3xl font-bold leading-tight tracking-tight text-text sm:text-4xl"
                    >
                      {menu.title}
                    </h1>

                    <p className="mt-4 text-base leading-relaxed text-text-muted sm:text-lg">
                      {menu.shortDescription}
                    </p>

                    <MenuDetailInfo menu={menu} />
                    <MenuOrderButton menu={menu} />
                  </div>
                </motion.article>
              </div>
            </div>

            <div className="mt-14 space-y-10 lg:mt-20 lg:space-y-12">
              <ScrollReveal>
                <section aria-labelledby="description-title" className={menuDetailSectionClassName}>
                  <MenuSectionHeader
                    eyebrow="À propos"
                    title="Description du menu"
                    titleId="description-title"
                  />
                  <p className="mt-6 max-w-3xl text-base leading-[1.75] text-text-muted sm:text-lg">
                    {menu.fullDescription}
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal>
                <MenuDishesSection dishes={menu.dishes} />
              </ScrollReveal>

              <MenuReviewsSection menuId={menu.id} />

              <ScrollReveal>
                <MenuConditions conditions={menu.conditions} />
              </ScrollReveal>
            </div>
          </>
        )}
      </section>
    </div>
  )
}
