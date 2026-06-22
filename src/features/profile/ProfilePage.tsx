import { motion } from 'framer-motion'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../shared/hooks/useAuth'

export function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <section className="mx-auto flex min-h-[40vh] w-full max-w-lg items-center justify-center px-6 py-14">
        <p className="text-sm text-text-muted" role="status">
          Chargement…
        </p>
      </section>
    )
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace state={{ from: { pathname: '/profil' } }} />
  }

  return (
    <section className="mx-auto w-full max-w-lg px-6 py-14">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl border border-border/80 bg-surface-elevated p-7 shadow-sm"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Mon compte</p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-text">Mon profil</h1>
        <dl className="mt-6 space-y-4 text-sm">
          <div>
            <dt className="font-semibold text-text-muted">Prénom</dt>
            <dd className="mt-1 text-text">{user.prenom}</dd>
          </div>
          <div>
            <dt className="font-semibold text-text-muted">Nom</dt>
            <dd className="mt-1 text-text">{user.nom}</dd>
          </div>
          <div>
            <dt className="font-semibold text-text-muted">Email</dt>
            <dd className="mt-1 text-text">{user.email}</dd>
          </div>
        </dl>
      </motion.div>
    </section>
  )
}
