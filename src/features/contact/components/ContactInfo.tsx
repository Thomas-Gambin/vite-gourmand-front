import { Clock, Mail, MapPin, MessageCircle } from 'lucide-react'
import { getTodayOpeningHour, useOpeningHours } from '../../../shared/hooks/useOpeningHours'

const infoItems = [
  {
    icon: MapPin,
    title: 'Notre adresse',
    content: 'Bordeaux, Nouvelle-Aquitaine',
    detail: 'Prestations sur Bordeaux et environs',
  },
  {
    icon: Clock,
    title: 'Horaires',
    content: 'Lun – Ven : 09h00 – 18h00',
    detail: 'Sam : 09h00 – 13h00',
  },
  {
    icon: Mail,
    title: 'Réponse',
    content: 'Sous 48 h ouvrées',
    detail: 'Nous lisons chaque message avec attention',
  },
] as const

export function ContactInfo() {
  const openingHours = useOpeningHours()
  const todayEntry = getTodayOpeningHour(openingHours)

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-gradient-to-br from-brand-muted/60 via-surface-elevated to-surface p-6 shadow-xl shadow-brand/5 sm:p-7">
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-brand/10 blur-2xl"
          aria-hidden="true"
        />
        <div className="relative flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
            <MessageCircle className="h-5 w-5" aria-hidden="true" strokeWidth={1.75} />
          </span>
          <div>
            <p className="text-sm font-semibold text-text">Aujourd&apos;hui</p>
            <p className="mt-1 text-sm text-text-muted">
              {todayEntry.day} —{' '}
              <span className={todayEntry.isClosed ? 'font-medium text-brand' : 'text-text'}>
                {todayEntry.hours}
              </span>
            </p>
          </div>
        </div>
      </div>

      {infoItems.map((item) => {
        const Icon = item.icon

        return (
          <div
            key={item.title}
            className="group rounded-2xl border border-border/60 bg-surface-elevated/80 p-5 transition hover:border-brand/20 hover:shadow-md hover:shadow-brand/5"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-muted text-brand transition group-hover:bg-brand/10">
                <Icon className="h-5 w-5" aria-hidden="true" strokeWidth={1.75} />
              </span>
              <div>
                <h2 className="text-sm font-semibold text-text">{item.title}</h2>
                <p className="mt-1 text-sm font-medium text-text">{item.content}</p>
                <p className="mt-0.5 text-sm text-text-muted">{item.detail}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
