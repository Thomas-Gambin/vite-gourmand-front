import { MenuConditions } from '../../menus/components/MenuConditions'
import type { AuthUser } from '../../auth/types/user'
import type { Menu } from '../../menus/types/menu'
import type { OrderFormData, OrderPricePreview } from '../types/commande'
import { OrderSummary } from './OrderSummary'

type OrderStepSummaryProps = {
  menu: Menu
  user: AuthUser
  formData: OrderFormData
  preview: OrderPricePreview | null
  isPreviewLoading: boolean
  previewError: string | null
}

export function OrderStepSummary({
  menu,
  user,
  formData,
  preview,
  isPreviewLoading,
  previewError,
}: OrderStepSummaryProps) {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-border/60 bg-surface-elevated p-7 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Validation</p>
        <h2 className="mt-1 text-2xl font-bold text-text">Récapitulatif avant validation</h2>
        <p className="mt-2 text-sm text-text-muted">
          Vérifiez les informations ci-dessous avant de confirmer votre commande.
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <div className="space-y-6">
          <section className="rounded-3xl border border-border/60 bg-surface-elevated p-7 shadow-sm sm:p-8">
            <h3 className="text-lg font-bold text-text">Détails de la prestation</h3>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-surface-muted/50 px-4 py-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-text-muted">Adresse</dt>
                <dd className="mt-1 text-sm text-text">
                  {formData.adressePrestation}
                  {formData.codePostalPrestation ? `, ${formData.codePostalPrestation}` : ''}{' '}
                  {formData.villePrestation}
                </dd>
              </div>
              <div className="rounded-xl bg-surface-muted/50 px-4 py-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-text-muted">Date</dt>
                <dd className="mt-1 text-sm text-text">{formData.datePrestation}</dd>
              </div>
              <div className="rounded-xl bg-surface-muted/50 px-4 py-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-text-muted">Heure</dt>
                <dd className="mt-1 text-sm text-text">{formData.heureLivraison}</dd>
              </div>
              <div className="rounded-xl bg-surface-muted/50 px-4 py-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-text-muted">Personnes</dt>
                <dd className="mt-1 text-sm text-text">{formData.nombrePersonne}</dd>
              </div>
              <div className="rounded-xl bg-surface-muted/50 px-4 py-3 sm:col-span-2">
                <dt className="text-xs font-medium uppercase tracking-wide text-text-muted">Prêt matériel</dt>
                <dd className="mt-1 text-sm text-text">{formData.pretMateriel ? 'Oui' : 'Non'}</dd>
              </div>
            </dl>
          </section>
          <MenuConditions conditions={menu.conditions} />
        </div>

        <OrderSummary
          menu={menu}
          user={user}
          formData={formData}
          preview={preview}
          isLoading={isPreviewLoading}
          error={previewError}
        />
      </div>
    </div>
  )
}
