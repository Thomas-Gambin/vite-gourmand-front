import { motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import type { AuthUser } from '../auth/types/user'
import { getOrderTracking } from './api/ordersApi'
import { AvailableReviewsSection } from './components/AvailableReviewsSection'
import { DashboardNav } from './components/DashboardNav'
import { OrderTrackingView } from './components/OrderTracking'
import { OrdersSection } from './components/OrdersSection'
import { ProfileSection } from './components/ProfileSection'
import type { DashboardTab, OrderTracking } from './types/dashboard'
import { parseApiError } from './utils/parseApiError'

type DashboardPageProps = {
  user: AuthUser
  onProfileUpdated: (user: AuthUser) => void
}

export function DashboardPage({ user, onProfileUpdated }: DashboardPageProps) {
  const [activeTab, setActiveTab] = useState<DashboardTab>('profil')
  const [trackingOrderId, setTrackingOrderId] = useState<number | null>(null)
  const [tracking, setTracking] = useState<OrderTracking | null>(null)
  const [trackingLoading, setTrackingLoading] = useState(false)
  const [trackingError, setTrackingError] = useState<string | null>(null)

  const loadTracking = useCallback(async (orderId: number) => {
    setTrackingLoading(true)
    setTrackingError(null)
    setTracking(null)
    try {
      const response = await getOrderTracking(orderId)
      setTracking(response.tracking)
    } catch (err) {
      setTrackingError(parseApiError(err).message)
    } finally {
      setTrackingLoading(false)
    }
  }, [])

  useEffect(() => {
    if (activeTab === 'suivi' && trackingOrderId !== null) {
      void loadTracking(trackingOrderId)
    }
  }, [activeTab, trackingOrderId, loadTracking])

  function handleTrackOrder(orderId: number) {
    setTrackingOrderId(orderId)
    setActiveTab('suivi')
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6 sm:py-14">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Espace client</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-text">Mon compte</h1>
        <p className="mt-2 text-sm text-text-muted">
          Bienvenue {user.prenom}, gérez votre profil, vos commandes et vos avis.
        </p>

        <div className="mt-8">
          <DashboardNav activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <div className="mt-8">
          {activeTab === 'profil' && (
            <ProfileSection user={user} onProfileUpdated={onProfileUpdated} />
          )}

          {activeTab === 'commandes' && (
            <OrdersSection onTrackOrder={handleTrackOrder} />
          )}

          {activeTab === 'suivi' && (
            <div className="rounded-2xl border border-border/60 bg-surface-elevated p-6 shadow-sm sm:p-8">
              <OrderTrackingView tracking={tracking} isLoading={trackingLoading} error={trackingError} />
            </div>
          )}

          {activeTab === 'avis' && <AvailableReviewsSection />}
        </div>
      </motion.div>
    </section>
  )
}
