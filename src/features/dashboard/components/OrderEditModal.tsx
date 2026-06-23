import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getMyOrder, updateMyOrder } from '../api/ordersApi'
import type { UpdateOrderPayload, UserOrderListItem } from '../types/dashboard'
import { parseApiError } from '../utils/parseApiError'

const inputClassName =
  'mt-2 w-full rounded-xl border border-border/80 bg-surface px-4 py-3.5 text-sm text-text transition focus-visible:border-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2'

const primaryButtonClassName =
  'inline-flex cursor-pointer items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60'

const secondaryButtonClassName =
  'inline-flex cursor-pointer items-center justify-center rounded-full border border-border bg-surface-elevated px-4 py-2 text-sm font-medium text-text transition hover:border-brand/30 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2'

type OrderEditModalProps = {
  order: UserOrderListItem | null
  onClose: () => void
  onUpdated: () => void
}

type FormErrors = Partial<Record<keyof UpdateOrderPayload | 'form', string>>

export function OrderEditModal({ order, onClose, onUpdated }: OrderEditModalProps) {
  const [formData, setFormData] = useState<UpdateOrderPayload | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!order) {
      setFormData(null)
      return
    }

    let cancelled = false

    void getMyOrder(order.id).then((response) => {
      if (cancelled) return
      setFormData({
        adressePrestation: response.order.adressePrestation,
        villePrestation: response.order.villePrestation,
        codePostalPrestation: response.order.codePostalPrestation,
        datePrestation: response.order.datePrestation,
        heureLivraison: response.order.heureLivraison,
        nombrePersonne: response.order.nombrePersonne,
        pretMateriel: response.order.pretMateriel,
      })
      setErrors({})
      setFormError(null)
    })

    return () => {
      cancelled = true
    }
  }, [order])

  useEffect(() => {
    if (!order) return

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [order, onClose])

  if (!order || !formData) return null

  function validate(data: UpdateOrderPayload): FormErrors {
    const next: FormErrors = {}
    if (!data.adressePrestation.trim()) next.adressePrestation = "L'adresse est obligatoire."
    if (!data.villePrestation.trim()) next.villePrestation = 'La ville est obligatoire.'
    if (!data.datePrestation) next.datePrestation = 'La date est obligatoire.'
    if (!data.heureLivraison) next.heureLivraison = "L'heure est obligatoire."
    if (!data.nombrePersonne || data.nombrePersonne <= 0) {
      next.nombrePersonne = 'Le nombre de personnes doit être positif.'
    }
    return next
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!formData || !order) return

    const validation = validate(formData)
    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      return
    }

    setIsSubmitting(true)
    setFormError(null)

    try {
      await updateMyOrder(order.id, formData)
      onUpdated()
      onClose()
    } catch (error) {
      const apiError = parseApiError(error)
      if (apiError.fields) setErrors(apiError.fields as FormErrors)
      setFormError(apiError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-text/40 p-4 sm:items-center" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-edit-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border/60 bg-surface-elevated p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Modification</p>
            <h2 id="order-edit-title" className="mt-2 text-xl font-bold text-text">
              {order.numeroCommande}
            </h2>
            <p className="mt-1 text-sm text-text-muted">Menu : {order.menuTitre} (non modifiable)</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Fermer" className="cursor-pointer rounded-lg p-2 text-text-muted hover:bg-surface-muted">
            <X className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>

        {formError && (
          <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800" role="alert">
            {formError}
          </p>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="edit-adresse" className="text-sm font-medium text-text">
              Adresse de prestation
            </label>
            <input
              id="edit-adresse"
              className={`${inputClassName} ${errors.adressePrestation ? 'border-rose-300' : ''}`}
              value={formData.adressePrestation}
              onChange={(e) => setFormData({ ...formData, adressePrestation: e.target.value })}
            />
            {errors.adressePrestation && <p className="mt-1 text-sm text-rose-700">{errors.adressePrestation}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="edit-ville" className="text-sm font-medium text-text">
                Ville
              </label>
              <input
                id="edit-ville"
                className={`${inputClassName} ${errors.villePrestation ? 'border-rose-300' : ''}`}
                value={formData.villePrestation}
                onChange={(e) => setFormData({ ...formData, villePrestation: e.target.value })}
              />
              {errors.villePrestation && <p className="mt-1 text-sm text-rose-700">{errors.villePrestation}</p>}
            </div>
            <div>
              <label htmlFor="edit-cp" className="text-sm font-medium text-text">
                Code postal
              </label>
              <input
                id="edit-cp"
                className={inputClassName}
                value={formData.codePostalPrestation ?? ''}
                onChange={(e) => setFormData({ ...formData, codePostalPrestation: e.target.value })}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="edit-date" className="text-sm font-medium text-text">
                Date de prestation
              </label>
              <input
                id="edit-date"
                type="date"
                className={`${inputClassName} ${errors.datePrestation ? 'border-rose-300' : ''}`}
                value={formData.datePrestation}
                onChange={(e) => setFormData({ ...formData, datePrestation: e.target.value })}
              />
              {errors.datePrestation && <p className="mt-1 text-sm text-rose-700">{errors.datePrestation}</p>}
            </div>
            <div>
              <label htmlFor="edit-heure" className="text-sm font-medium text-text">
                Heure de livraison
              </label>
              <input
                id="edit-heure"
                type="time"
                className={`${inputClassName} ${errors.heureLivraison ? 'border-rose-300' : ''}`}
                value={formData.heureLivraison}
                onChange={(e) => setFormData({ ...formData, heureLivraison: e.target.value })}
              />
              {errors.heureLivraison && <p className="mt-1 text-sm text-rose-700">{errors.heureLivraison}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="edit-personnes" className="text-sm font-medium text-text">
              Nombre de personnes
            </label>
            <input
              id="edit-personnes"
              type="number"
              min={1}
              className={`${inputClassName} ${errors.nombrePersonne ? 'border-rose-300' : ''}`}
              value={formData.nombrePersonne}
              onChange={(e) => setFormData({ ...formData, nombrePersonne: Number.parseInt(e.target.value, 10) || 0 })}
            />
            {errors.nombrePersonne && <p className="mt-1 text-sm text-rose-700">{errors.nombrePersonne}</p>}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button type="submit" className={primaryButtonClassName} disabled={isSubmitting}>
              {isSubmitting ? 'Enregistrement…' : 'Enregistrer'}
            </button>
            <button type="button" onClick={onClose} className={secondaryButtonClassName}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
