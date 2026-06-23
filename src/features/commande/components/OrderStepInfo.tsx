import { MapPin } from 'lucide-react'
import type { AuthUser } from '../../auth/types/user'
import type { Menu } from '../../menus/types/menu'
import type { OrderFormData, OrderFormErrors } from '../types/commande'
import { OrderClientInfo } from './OrderClientInfo'
import { OrderMenuCard } from './OrderMenuCard'

const inputClassName =
  'mt-2 w-full rounded-xl border border-border/50 bg-surface px-4 py-3.5 text-sm text-text transition focus-visible:border-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2'

type OrderStepInfoProps = {
  menu: Menu
  user: AuthUser
  formData: OrderFormData
  errors: OrderFormErrors
  onChange: (field: keyof OrderFormData, value: string | boolean) => void
}

export function OrderStepInfo({ menu, user, formData, errors, onChange }: OrderStepInfoProps) {
  return (
    <div className="space-y-6">
      <OrderClientInfo user={user} />
      <OrderMenuCard menu={menu} />

      <section
        aria-labelledby="prestation-title"
        className="rounded-3xl border border-border/60 bg-surface-elevated p-7 shadow-sm sm:p-8"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand/10">
            <MapPin className="h-5 w-5 text-brand" aria-hidden="true" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Prestation</p>
            <h2 id="prestation-title" className="text-lg font-bold text-text">
              Informations de livraison
            </h2>
          </div>
        </div>

        <div className="mt-6 grid gap-5">
          <div>
            <label htmlFor="adressePrestation" className="text-sm font-medium text-text">
              Adresse de prestation
            </label>
            <input
              id="adressePrestation"
              className={`${inputClassName} ${errors.adressePrestation ? 'border-rose-300 ring-rose-100' : ''}`}
              value={formData.adressePrestation}
              onChange={(e) => onChange('adressePrestation', e.target.value)}
              autoComplete="street-address"
            />
            {errors.adressePrestation && (
              <p className="mt-1.5 text-sm text-rose-700" role="alert">
                {errors.adressePrestation}
              </p>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="villePrestation" className="text-sm font-medium text-text">
                Ville
              </label>
              <input
                id="villePrestation"
                className={`${inputClassName} ${errors.villePrestation ? 'border-rose-300' : ''}`}
                value={formData.villePrestation}
                onChange={(e) => onChange('villePrestation', e.target.value)}
                autoComplete="address-level2"
              />
              {errors.villePrestation && (
                <p className="mt-1.5 text-sm text-rose-700" role="alert">
                  {errors.villePrestation}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="codePostalPrestation" className="text-sm font-medium text-text">
                Code postal
              </label>
              <input
                id="codePostalPrestation"
                className={inputClassName}
                value={formData.codePostalPrestation}
                onChange={(e) => onChange('codePostalPrestation', e.target.value)}
                autoComplete="postal-code"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="datePrestation" className="text-sm font-medium text-text">
                Date de prestation
              </label>
              <input
                id="datePrestation"
                type="date"
                className={`${inputClassName} ${errors.datePrestation ? 'border-rose-300' : ''}`}
                value={formData.datePrestation}
                onChange={(e) => onChange('datePrestation', e.target.value)}
              />
              {errors.datePrestation && (
                <p className="mt-1.5 text-sm text-rose-700" role="alert">
                  {errors.datePrestation}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="heureLivraison" className="text-sm font-medium text-text">
                Heure de livraison souhaitée
              </label>
              <input
                id="heureLivraison"
                type="time"
                className={`${inputClassName} ${errors.heureLivraison ? 'border-rose-300' : ''}`}
                value={formData.heureLivraison}
                onChange={(e) => onChange('heureLivraison', e.target.value)}
              />
              {errors.heureLivraison && (
                <p className="mt-1.5 text-sm text-rose-700" role="alert">
                  {errors.heureLivraison}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="nombrePersonne" className="text-sm font-medium text-text">
              Nombre de personnes
            </label>
            <input
              id="nombrePersonne"
              type="number"
              min={menu.minimumPeople}
              className={`${inputClassName} ${errors.nombrePersonne ? 'border-rose-300' : ''}`}
              value={formData.nombrePersonne}
              onChange={(e) => onChange('nombrePersonne', e.target.value)}
            />
            {errors.nombrePersonne && (
              <p className="mt-1.5 text-sm text-rose-700" role="alert">
                {errors.nombrePersonne}
              </p>
            )}
          </div>

          <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border/50 bg-surface-muted/40 px-4 py-3.5 text-sm text-text transition hover:border-brand/20">
            <input
              type="checkbox"
              checked={formData.pretMateriel}
              onChange={(e) => onChange('pretMateriel', e.target.checked)}
              className="h-4 w-4 cursor-pointer rounded border-border text-brand focus-visible:ring-brand"
            />
            Je souhaite le prêt de matériel (vaisselle, nappes…)
          </label>
        </div>
      </section>
    </div>
  )
}
