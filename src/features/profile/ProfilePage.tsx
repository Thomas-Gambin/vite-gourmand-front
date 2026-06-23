import { Navigate } from 'react-router-dom'
import { useAuth } from '../../shared/hooks/useAuth'
import { DashboardPage } from '../dashboard/DashboardPage'

export function ProfilePage() {
  return <Navigate to="/mon-compte" replace />
}

export function UserAccountPage() {
  const { user, isAuthenticated, isLoading, updateUser } = useAuth()

  if (isLoading) {
    return (
      <section className="mx-auto flex min-h-[40vh] w-full max-w-6xl items-center justify-center px-6 py-14">
        <p className="text-sm text-text-muted" role="status">
          Chargement…
        </p>
      </section>
    )
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace state={{ from: { pathname: '/mon-compte' } }} />
  }

  return <DashboardPage user={user} onProfileUpdated={updateUser} />
}
