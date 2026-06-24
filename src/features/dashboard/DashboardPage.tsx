import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Sparkles } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { AuthUser } from '../auth/types/user'
import { getOrderTracking } from './api/ordersApi'
import { AvailableReviewsSection } from './components/AvailableReviewsSection'
import { DashboardNav } from './components/DashboardNav'
import { OrderTrackingView } from './components/OrderTracking'
import { OrdersSection } from './components/OrdersSection'
import { ProfileSection } from './components/ProfileSection'
import { dashboardPanelClassName, getUserInitials } from './dashboardUi'
import type { DashboardTab, OrderTracking } from './types/dashboard'
import { parseDashboardTab } from './types/dashboard'
import { parseApiError } from './utils/parseApiError'

type DashboardPageProps = {
  user: AuthUser
  onProfileUpdated: (user: AuthUser) => void
}

const tabTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
}

const POLLING_INTERVAL_MS = 60_000
const TERMINAL_STATUSES = new Set(['terminee', 'annulee'])

function parseOrderId(value: string | null): number | null {
  if (value === null || value === '') return null
  const parsed = Number.parseInt(value, 10)
  return Number.isNaN(parsed) || parsed <= 0 ? null : parsed
}

export function DashboardPage({ user, onProfileUpdated }: DashboardPageProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<DashboardTab>(() => parseDashboardTab(searchParams.get('tab')))
  const [activeReviewId, setActiveReviewId] = useState<number | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [tracking, setTracking] = useState<OrderTracking | null>(null)
  const [trackingLoading, setTrackingLoading] = useState(false)
  const [trackingRefreshing, setTrackingRefreshing] = useState(false)
  const [trackingError, setTrackingError] = useState<string | null>(null)
  const trackingOrderId = parseOrderId(searchParams.get('orderId'))
  const isTrackingView = activeTab === 'commandes' && trackingOrderId !== null
  const loadTrackingRef = useRef<(orderId: number, options?: { silent?: boolean }) => Promise<void>>(async () => {})

  const loadTracking = useCallback(async (orderId: number, options?: { silent?: boolean }) => {
    const silent = options?.silent ?? false
    if (silent) {
      setTrackingRefreshing(true)
    } else {
      setTrackingLoading(true)
      setTrackingError(null)
      setTracking(null)
    }

    try {
      const response = await getOrderTracking(orderId)
      setTracking(response.tracking)
      setTrackingError(null)
    } catch (err) {
      if (!silent) {
        setTracking(null)
      }
      setTrackingError(parseApiError(err).message)
    } finally {
      if (silent) {
        setTrackingRefreshing(false)
      } else {
        setTrackingLoading(false)
      }
    }
  }, [])

  loadTrackingRef.current = loadTracking

  // Redirige les anciens liens ?tab=suivi vers ?tab=commandes
  useEffect(() => {
    if (searchParams.get('tab') !== 'suivi') return

    const orderId = searchParams.get('orderId')
    if (orderId) {
      setSearchParams({ tab: 'commandes', orderId }, { replace: true })
      return
    }

    setSearchParams({ tab: 'commandes' }, { replace: true })
  }, [searchParams, setSearchParams])

  useEffect(() => {
    setActiveTab(parseDashboardTab(searchParams.get('tab')))
  }, [searchParams])

  useEffect(() => {
    if (!isTrackingView || trackingOrderId === null) {
      return
    }

    void loadTracking(trackingOrderId)
  }, [isTrackingView, trackingOrderId, loadTracking])

  useEffect(() => {
    if (!isTrackingView || trackingOrderId === null) {
      return
    }

    if (tracking !== null && TERMINAL_STATUSES.has(tracking.statutActuel)) {
      return
    }

    const intervalId = window.setInterval(() => {
      void loadTrackingRef.current(trackingOrderId, { silent: true })
    }, POLLING_INTERVAL_MS)

    return () => window.clearInterval(intervalId)
  }, [isTrackingView, trackingOrderId, tracking?.statutActuel])

  function handleTrackOrder(orderId: number) {
    setSearchParams({ tab: 'commandes', orderId: String(orderId) })
  }

  function handleReviewOrder(orderId: number) {
    setActiveReviewId(orderId)
    handleTabChange('avis')
  }

  function handleReviewSuccess() {
    setActiveReviewId(null)
    setRefreshKey((key) => key + 1)
  }

  function handleTabChange(tab: DashboardTab) {
    setActiveTab(tab)

    if (tab === 'profil') {
      setSearchParams({})
      return
    }

    setSearchParams({ tab })
  }

  function handleBackToOrders() {
    setTracking(null)
    setTrackingError(null)
    setSearchParams({ tab: 'commandes' })
  }

  function handleRefreshTracking() {
    if (trackingOrderId === null) return
    void loadTracking(trackingOrderId, { silent: true })
  }

  const contentKey =
    activeTab === 'commandes'
      ? trackingOrderId !== null
        ? `commandes-tracking-${trackingOrderId}`
        : 'commandes'
      : activeTab

  const initials = getUserInitials(user.prenom, user.nom)

  return (
    <main className="relative mx-auto w-full max-w-6xl px-5 py-10 sm:px-6 sm:py-14">
      <div
        className="pointer-events-none absolute -right-16 top-6 h-64 w-64 rounded-full bg-brand/5 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-12 bottom-24 h-56 w-56 rounded-full bg-brand/8 blur-3xl"
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <header className="relative overflow-hidden rounded-3xl border border-brand/15 bg-gradient-to-br from-brand-muted/90 via-surface-elevated to-surface p-6 shadow-sm sm:p-8">
          <div
            className="pointer-events-none absolute -right-8 top-0 h-44 w-44 rounded-full bg-brand/10 blur-2xl"
            aria-hidden
          />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4 sm:gap-5">
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand text-xl font-bold tracking-tight text-white shadow-lg shadow-brand/30"
                aria-hidden
              >
                {initials}
              </div>
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-surface-elevated/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand shadow-sm backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden strokeWidth={1.75} />
                  Espace client
                </p>
                <h1 className="mt-3 text-2xl font-semibold tracking-tight text-text sm:text-3xl">
                  Bonjour, <span className="text-brand">{user.prenom}</span>
                </h1>
                <p className="mt-1.5 text-sm text-text-muted">{user.email}</p>
              </div>
            </div>

            {user.isVerified ? (
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-medium text-emerald-800">
                <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden strokeWidth={1.75} />
                Compte vérifié
              </span>
            ) : (
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-medium text-amber-900">
                Email en attente de confirmation
              </span>
            )}
          </div>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,15.5rem)_minmax(0,1fr)] lg:items-start">
          <aside className="lg:sticky lg:top-24">
            <DashboardNav activeTab={activeTab} onTabChange={handleTabChange} />
          </aside>

          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div key={contentKey} {...tabTransition}>
                {activeTab === 'profil' && (
                  <ProfileSection user={user} onProfileUpdated={onProfileUpdated} />
                )}

                {activeTab === 'commandes' && !isTrackingView && (
                  <OrdersSection
                    onTrackOrder={handleTrackOrder}
                    onReviewOrder={handleReviewOrder}
                    refreshKey={refreshKey}
                  />
                )}

                {activeTab === 'commandes' && isTrackingView && (
                  <div className={dashboardPanelClassName}>
                    <OrderTrackingView
                      tracking={tracking}
                      isLoading={trackingLoading}
                      isRefreshing={trackingRefreshing}
                      error={trackingError}
                      onRefresh={handleRefreshTracking}
                      onBack={handleBackToOrders}
                    />
                  </div>
                )}

                {activeTab === 'avis' && (
                  <AvailableReviewsSection
                    initialActiveReviewId={activeReviewId}
                    refreshKey={refreshKey}
                    onReviewSuccess={handleReviewSuccess}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </main>
  )
}
