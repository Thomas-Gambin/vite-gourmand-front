import { User } from 'lucide-react'
import type { AuthUser } from '../../auth/types/user'

const fieldClassName =
  'mt-2 w-full rounded-xl border border-border/50 bg-surface-muted/80 px-4 py-3 text-sm text-text'

type OrderClientInfoProps = {
  user: AuthUser
}

export function OrderClientInfo({ user }: OrderClientInfoProps) {
  return (
    <section
      aria-labelledby="client-info-title"
      className="rounded-3xl border border-border/60 bg-surface-elevated p-7 shadow-sm sm:p-8"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand/10">
          <User className="h-5 w-5 text-brand" aria-hidden="true" strokeWidth={1.75} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Compte</p>
          <h2 id="client-info-title" className="text-lg font-bold text-text">
            Vos informations
          </h2>
        </div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-text-muted">Prénom</label>
          <input className={fieldClassName} value={user.prenom} readOnly aria-readonly="true" />
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-text-muted">Nom</label>
          <input className={fieldClassName} value={user.nom} readOnly aria-readonly="true" />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-medium uppercase tracking-wide text-text-muted">Email</label>
          <input className={fieldClassName} value={user.email} readOnly aria-readonly="true" />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-medium uppercase tracking-wide text-text-muted">Téléphone</label>
          <input
            className={fieldClassName}
            value={user.telephone || '—'}
            readOnly
            aria-readonly="true"
          />
        </div>
      </div>
    </section>
  )
}
