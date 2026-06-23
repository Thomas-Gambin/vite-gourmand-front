import type { DashboardTab } from '../types/dashboard'

const tabs: Array<{ id: DashboardTab; label: string }> = [
  { id: 'profil', label: 'Profil' },
  { id: 'commandes', label: 'Mes commandes' },
  { id: 'suivi', label: 'Suivi' },
  { id: 'avis', label: 'Avis disponibles' },
]

type DashboardNavProps = {
  activeTab: DashboardTab
  onTabChange: (tab: DashboardTab) => void
}

export function DashboardNav({ activeTab, onTabChange }: DashboardNavProps) {
  return (
    <nav aria-label="Sections du compte" className="flex flex-col gap-1 sm:flex-row sm:flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          aria-current={activeTab === tab.id ? 'page' : undefined}
          className={[
            'cursor-pointer rounded-xl px-4 py-2.5 text-left text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
            activeTab === tab.id
              ? 'bg-brand text-white shadow-sm'
              : 'bg-surface-muted text-text-muted hover:bg-brand-muted hover:text-brand',
          ].join(' ')}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
