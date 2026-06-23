import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { CreatedCommande } from '../types/commande'

type OrderStepConfirmationProps = {
  commande: CreatedCommande
}

const primaryButtonClassName =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-surface-elevated shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand-light hover:shadow-xl hover:shadow-brand/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2'

const secondaryButtonClassName =
  'inline-flex cursor-pointer items-center justify-center rounded-full border border-border/60 bg-surface-elevated px-6 py-3.5 text-sm font-medium text-text shadow-sm transition hover:border-brand/30 hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2'

export function OrderStepConfirmation({ commande }: OrderStepConfirmationProps) {
  return (
    <section
      aria-labelledby="confirmation-title"
      className="mx-auto max-w-xl overflow-hidden rounded-3xl border border-border/60 bg-surface-elevated p-8 text-center shadow-lg shadow-brand/5 sm:p-10"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand/10">
        <CheckCircle2 className="h-9 w-9 text-brand" aria-hidden="true" strokeWidth={1.5} />
      </div>
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-brand">Succès</p>
      <h2 id="confirmation-title" className="mt-2 text-2xl font-bold text-text sm:text-3xl">
        Commande confirmée !
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-text-muted">
        Votre commande a bien été enregistrée. Un email de confirmation vous a été envoyé.
      </p>

      <dl className="mt-8 space-y-4 rounded-2xl border border-border/50 bg-surface-muted/50 p-6 text-left text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-text-muted">N° de commande</dt>
          <dd className="font-bold text-text">{commande.numeroCommande}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-text-muted">Statut</dt>
          <dd className="font-medium capitalize text-text">{commande.statut.replace(/_/g, ' ')}</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-border/60 pt-4">
          <dt className="font-semibold text-text">Total</dt>
          <dd className="text-xl font-bold text-brand">{Number.parseFloat(commande.total).toFixed(2)} €</dd>
        </div>
      </dl>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link to="/mon-compte" className={secondaryButtonClassName}>
          Mes commandes
        </Link>
        <Link to="/menus" className={primaryButtonClassName}>
          Retour aux menus
          <ArrowRight className="h-4 w-4" aria-hidden="true" strokeWidth={1.75} />
        </Link>
      </div>
    </section>
  )
}
