import { Package, Route, Star, User } from 'lucide-react'
import type { DashboardTab } from '../types/dashboard'

const tabs: Array<{ id: DashboardTab; label: string; icon: typeof User }> = [
  { id: 'profil', label: 'Profil', icon: User },
  { id: 'commandes', label: 'Mes commandes', icon: Package },
  { id: 'suivi', label: 'Suivi', icon: Route },
  { id: 'avis', label: 'Avis disponibles', icon: Star },
]

type DashboardNavProps = {
  activeTab: DashboardTab
  onTabChange: (tab: DashboardTab) => void
}

export function DashboardNav({ activeTab, onTabChange }: DashboardNavProps) {
  return (
    <nav
      aria-label="Sections du compte"
      className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            aria-current={isActive ? 'page' : undefined}
            className={[
              'flex shrink-0 cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 lg:w-full',
              isActive
                ? 'bg-brand text-white shadow-md shadow-brand/25'
                : 'border border-border/50 bg-surface-elevated/80 text-text-muted hover:border-brand/20 hover:bg-brand-muted/60 hover:text-brand',
            ].join(' ')}
          >
            <span
              className={[
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition',
                isActive ? 'bg-white/15 text-white' : 'bg-surface-muted text-brand',
              ].join(' ')}
            >
              <Icon className="h-4 w-4" aria-hidden="true" strokeWidth={1.75} />
            </span>
            <span className="whitespace-nowrap lg:whitespace-normal">{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
