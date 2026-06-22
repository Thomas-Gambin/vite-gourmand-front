import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'

export function MainLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-surface">
      <Header />
      <main id="main-content" className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-5 py-10">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}
