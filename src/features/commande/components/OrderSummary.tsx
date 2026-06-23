import { Info, Receipt } from 'lucide-react'
import type { OrderPricePreview } from '../types/commande'
import type { Menu } from '../../menus/types/menu'
import type { AuthUser } from '../../auth/types/user'
import type { OrderFormData } from '../types/commande'

type OrderSummaryProps = {
  menu: Menu
  user: AuthUser
  formData: OrderFormData
  preview: OrderPricePreview | null
  isLoading?: boolean
  error?: string | null
}

function formatEuro(value: string) {
  return `${Number.parseFloat(value).toFixed(2)} €`
}

export function OrderSummary({
  menu,
  user,
  formData,
  preview,
  isLoading = false,
  error = null,
}: OrderSummaryProps) {
  return (
    <aside
      aria-labelledby="order-summary-title"
      className="rounded-3xl border border-border/60 bg-surface-elevated/95 p-7 shadow-lg shadow-brand/5 backdrop-blur-sm lg:sticky lg:top-24"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand/10">
          <Receipt className="h-5 w-5 text-brand" aria-hidden="true" strokeWidth={1.75} />
        </div>
        <h2 id="order-summary-title" className="text-lg font-bold text-text">
          Résumé de commande
        </h2>
      </div>

      <dl className="mt-6 space-y-4 text-sm">
        <div className="rounded-xl bg-surface-muted/50 px-4 py-3">
          <dt className="text-xs font-medium uppercase tracking-wide text-text-muted">Menu</dt>
          <dd className="mt-1 font-semibold text-text">{menu.title}</dd>
        </div>
        <div className="rounded-xl bg-surface-muted/50 px-4 py-3">
          <dt className="text-xs font-medium uppercase tracking-wide text-text-muted">Client</dt>
          <dd className="mt-1 font-medium text-text">
            {user.prenom} {user.nom}
          </dd>
        </div>
        {formData.adressePrestation && (
          <div className="rounded-xl bg-surface-muted/50 px-4 py-3">
            <dt className="text-xs font-medium uppercase tracking-wide text-text-muted">Adresse</dt>
            <dd className="mt-1 text-text">
              {formData.adressePrestation}
              {formData.codePostalPrestation ? `, ${formData.codePostalPrestation}` : ''}{' '}
              {formData.villePrestation}
            </dd>
          </div>
        )}
        {(formData.datePrestation || formData.heureLivraison || formData.nombrePersonne) && (
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {formData.datePrestation && (
              <div className="rounded-xl bg-surface-muted/50 px-4 py-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-text-muted">Date</dt>
                <dd className="mt-1 text-text">{formData.datePrestation}</dd>
              </div>
            )}
            {formData.heureLivraison && (
              <div className="rounded-xl bg-surface-muted/50 px-4 py-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-text-muted">Heure</dt>
                <dd className="mt-1 text-text">{formData.heureLivraison}</dd>
              </div>
            )}
            {formData.nombrePersonne && (
              <div className="rounded-xl bg-surface-muted/50 px-4 py-3 sm:col-span-2 lg:col-span-1">
                <dt className="text-xs font-medium uppercase tracking-wide text-text-muted">Personnes</dt>
                <dd className="mt-1 text-text">{formData.nombrePersonne}</dd>
              </div>
            )}
          </div>
        )}
      </dl>

      <div className="mt-6 rounded-2xl border border-border/50 bg-surface-muted/30 p-5">
        {isLoading && (
          <p className="text-sm text-text-muted" role="status">
            Calcul du prix…
          </p>
        )}
        {error && (
          <p className="text-sm text-rose-700" role="alert">
            {error}
          </p>
        )}
        {preview && !isLoading && (
          <dl className="space-y-2.5 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-text-muted">Prix / personne</dt>
              <dd className="font-medium text-text">{formatEuro(preview.prixParPersonne)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-text-muted">Sous-total</dt>
              <dd className="font-medium text-text">{formatEuro(preview.sousTotal)}</dd>
            </div>
            {preview.reductionApplied && (
              <div className="flex justify-between gap-4 text-brand">
                <dt>Remise 10 %</dt>
                <dd className="font-medium">- {formatEuro(preview.remise)}</dd>
              </div>
            )}
            <div className="flex justify-between gap-4">
              <dt className="text-text-muted">Prix menu</dt>
              <dd className="font-medium text-text">{formatEuro(preview.prixMenu)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-text-muted">Livraison</dt>
              <dd className="font-medium text-text">{formatEuro(preview.prixLivraison)}</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-border/60 pt-3 text-base">
              <dt className="font-semibold text-text">Total estimé</dt>
              <dd className="text-xl font-bold text-brand">{formatEuro(preview.total)}</dd>
            </div>
          </dl>
        )}
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-brand/15 bg-gradient-to-br from-brand-muted/80 to-surface-elevated p-4 text-xs leading-relaxed text-text-muted">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
        <p>{menu.conditions}</p>
      </div>
    </aside>
  )
}
