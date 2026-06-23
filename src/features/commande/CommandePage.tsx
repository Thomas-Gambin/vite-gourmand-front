import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getMenuById } from '../menus/services/menusService'
import type { Menu } from '../menus/types/menu'
import { useAuth } from '../../shared/hooks/useAuth'
import { createCommande } from './api/createCommande'
import { OrderStepConfirmation } from './components/OrderStepConfirmation'
import { OrderStepInfo } from './components/OrderStepInfo'
import { OrderStepSummary } from './components/OrderStepSummary'
import { useOrderPreview } from './hooks/useOrderPreview'
import type { CreatedCommande, OrderFormData, OrderFormErrors } from './types/commande'
import { validateOrderForm } from './utils/validateOrderForm'
import { OrderSummary } from './components/OrderSummary'

const primaryButtonClassName =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-surface-elevated shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand-light hover:shadow-xl hover:shadow-brand/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60'

const secondaryButtonClassName =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-border/60 bg-surface-elevated px-6 py-3.5 text-sm font-medium text-text shadow-sm transition hover:border-brand/30 hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2'

const topBackLinkClassName =
  'inline-flex cursor-pointer items-center gap-2 rounded-full border border-border/60 bg-surface-elevated/80 px-4 py-2 text-sm font-medium text-text-muted shadow-sm backdrop-blur-sm transition hover:border-brand/30 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2'

type Step = 'info' | 'summary' | 'confirmation'

const STEPS: { id: Step; label: string }[] = [
  { id: 'info', label: 'Informations' },
  { id: 'summary', label: 'Résumé' },
  { id: 'confirmation', label: 'Confirmation' },
]

function buildInitialFormData(user: ReturnType<typeof useAuth>['user']): OrderFormData {
  return {
    adressePrestation: user?.adressePostale ?? '',
    villePrestation: user?.ville ?? '',
    codePostalPrestation: '',
    datePrestation: '',
    heureLivraison: '',
    nombrePersonne: '',
    pretMateriel: false,
  }
}

function OrderStepIndicator({ currentStep }: { currentStep: Step }) {
  const currentIndex = STEPS.findIndex((s) => s.id === currentStep)

  return (
    <ol className="mt-6 flex items-center gap-2 sm:gap-3" aria-label="Étapes de commande">
      {STEPS.map((step, index) => {
        const isActive = index === currentIndex
        const isCompleted = index < currentIndex

        return (
          <li key={step.id} className="flex flex-1 items-center gap-2 sm:gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${
                  isActive
                    ? 'bg-brand text-surface-elevated shadow-md shadow-brand/25'
                    : isCompleted
                      ? 'bg-brand/15 text-brand'
                      : 'border border-border/80 bg-surface-elevated text-text-muted'
                }`}
                aria-current={isActive ? 'step' : undefined}
              >
                {index + 1}
              </span>
              <span
                className={`hidden truncate text-sm font-medium sm:inline ${
                  isActive ? 'text-text' : 'text-text-muted'
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < STEPS.length - 1 ? (
              <div
                className={`h-px flex-1 ${isCompleted ? 'bg-brand/40' : 'bg-border/80'}`}
                aria-hidden="true"
              />
            ) : null}
          </li>
        )
      })}
    </ol>
  )
}

export function CommandePage() {
  const { menuId } = useParams<{ menuId: string }>()
  const { user } = useAuth()
  const parsedMenuId = Number.parseInt(menuId ?? '', 10)

  const [menu, setMenu] = useState<Menu | null>(null)
  const [isMenuLoading, setIsMenuLoading] = useState(true)
  const [menuError, setMenuError] = useState<string | null>(null)
  const [step, setStep] = useState<Step>('info')
  const [formData, setFormData] = useState<OrderFormData>(() => buildInitialFormData(user))
  const [errors, setErrors] = useState<OrderFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [createdCommande, setCreatedCommande] = useState<CreatedCommande | null>(null)

  useEffect(() => {
    if (user) {
      setFormData((current) => ({
        ...current,
        adressePrestation: current.adressePrestation || user.adressePostale,
        villePrestation: current.villePrestation || user.ville,
      }))
    }
  }, [user])

  useEffect(() => {
    if (Number.isNaN(parsedMenuId)) {
      setMenuError('Menu invalide.')
      setIsMenuLoading(false)
      return
    }

    setIsMenuLoading(true)
    setMenuError(null)

    void getMenuById(parsedMenuId)
      .then((loadedMenu) => {
        if (!loadedMenu) {
          setMenuError('Menu introuvable.')
          setMenu(null)
          return
        }
        setMenu(loadedMenu)
        setFormData((current) => ({
          ...current,
          nombrePersonne: current.nombrePersonne || String(loadedMenu.minimumPeople),
        }))
      })
      .catch(() => {
        setMenuError('Impossible de charger le menu.')
      })
      .finally(() => {
        setIsMenuLoading(false)
      })
  }, [parsedMenuId])

  const nombrePersonne = useMemo(() => {
    const value = Number.parseInt(formData.nombrePersonne, 10)
    return Number.isNaN(value) ? null : value
  }, [formData.nombrePersonne])

  const { preview, isLoading: isPreviewLoading, error: previewError } = useOrderPreview({
    menuId: menu?.id ?? null,
    villePrestation: formData.villePrestation,
    nombrePersonne,
    enabled: step !== 'confirmation',
  })

  function handleChange(field: keyof OrderFormData, value: string | boolean) {
    setFormData((current) => ({ ...current, [field]: value }))
    setErrors((current) => {
      const next = { ...current }
      delete next[field]
      delete next.form
      return next
    })
  }

  async function handleConfirm() {
    if (!menu || !user) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await createCommande({
        menuId: menu.id,
        adressePrestation: formData.adressePrestation.trim(),
        villePrestation: formData.villePrestation.trim(),
        codePostalPrestation: formData.codePostalPrestation.trim() || undefined,
        datePrestation: formData.datePrestation,
        heureLivraison: formData.heureLivraison,
        nombrePersonne: Number.parseInt(formData.nombrePersonne, 10),
        pretMateriel: formData.pretMateriel,
      })
      setCreatedCommande(response.commande)
      setStep('confirmation')
    } catch (error) {
      if (error instanceof Error) {
        try {
          const parsed = JSON.parse(error.message) as {
            message?: string
            fields?: Record<string, string>
          }
          if (parsed.fields) {
            setErrors(parsed.fields as OrderFormErrors)
          }
          setSubmitError(parsed.message ?? 'Impossible de créer la commande.')
        } catch {
          setSubmitError('Impossible de créer la commande.')
        }
      } else {
        setSubmitError('Impossible de créer la commande.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleContinue() {
    if (!menu) return
    const nextErrors = validateOrderForm(formData, menu)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    setStep('summary')
  }

  function handlePreviousStep() {
    if (step === 'summary') {
      setStep('info')
      setSubmitError(null)
    }
  }

  if (isMenuLoading) {
    return (
      <section className="relative mx-auto flex min-h-[40vh] max-w-6xl items-center justify-center px-5 py-10">
        <p className="text-sm text-text-muted" role="status">
          Chargement du menu…
        </p>
      </section>
    )
  }

  if (menuError || !menu || !user) {
    return (
      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-800 shadow-sm" role="alert">
          {menuError ?? 'Une erreur est survenue.'}
        </div>
        <Link
          to="/menus"
          className="mt-6 inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-brand hover:text-brand-light"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Retour aux menus
        </Link>
      </section>
    )
  }

  if (menu.stock <= 0) {
    return (
      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="rounded-3xl border border-border/60 bg-surface-elevated p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-text">Commande indisponible</h1>
          <p className="mt-2 text-sm text-text-muted">Ce menu n’est plus en stock.</p>
          <Link
            to={`/menus/${menu.id}`}
            className="mt-6 inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-brand"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Retour au menu
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="relative mx-auto max-w-6xl px-5 py-10">
      <div
        className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-brand/5 blur-3xl"
        aria-hidden="true"
      />

      {step === 'info' ? (
        <Link to={`/menus/${menu.id}`} className={topBackLinkClassName}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" strokeWidth={1.75} />
          Retour au menu
        </Link>
      ) : step === 'summary' ? (
        <button type="button" onClick={handlePreviousStep} className={topBackLinkClassName}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" strokeWidth={1.75} />
          Retour aux informations
        </button>
      ) : null}

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
        <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">Finaliser ma commande</h1>
        <p className="mt-2 text-sm text-text-muted">
          Étape {step === 'info' ? 1 : step === 'summary' ? 2 : 3} sur 3
        </p>
        <OrderStepIndicator currentStep={step} />
      </motion.div>

      <div className="mt-10">
        {step === 'info' && (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <OrderStepInfo
              menu={menu}
              user={user}
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />
            <OrderSummary
              menu={menu}
              user={user}
              formData={formData}
              preview={preview}
              isLoading={isPreviewLoading}
              error={previewError}
            />
          </div>
        )}

        {step === 'summary' && (
          <OrderStepSummary
            menu={menu}
            user={user}
            formData={formData}
            preview={preview}
            isPreviewLoading={isPreviewLoading}
            previewError={previewError}
          />
        )}

        {step === 'confirmation' && createdCommande && (
          <OrderStepConfirmation commande={createdCommande} />
        )}
      </div>

      {step === 'info' && (
        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-border/60 pt-8 sm:flex-row sm:justify-between">
          <Link to={`/menus/${menu.id}`} className={secondaryButtonClassName}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" strokeWidth={1.75} />
            Retour au menu
          </Link>
          <button type="button" className={primaryButtonClassName} onClick={handleContinue}>
            Continuer
            <ArrowRight className="h-4 w-4" aria-hidden="true" strokeWidth={1.75} />
          </button>
        </div>
      )}

      {step === 'summary' && (
        <>
          {submitError && (
            <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800" role="alert">
              {submitError}
            </p>
          )}
          <div className="mt-10 flex flex-col-reverse gap-3 border-t border-border/60 pt-8 sm:flex-row sm:justify-between">
            <button
              type="button"
              className={secondaryButtonClassName}
              onClick={handlePreviousStep}
              disabled={isSubmitting}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" strokeWidth={1.75} />
              Retour
            </button>
            <button
              type="button"
              className={primaryButtonClassName}
              onClick={() => void handleConfirm()}
              disabled={isSubmitting || isPreviewLoading || !preview}
            >
              {isSubmitting ? 'Envoi en cours…' : 'Confirmer la commande'}
              {!isSubmitting && <ArrowRight className="h-4 w-4" aria-hidden="true" strokeWidth={1.75} />}
            </button>
          </div>
        </>
      )}

      {errors.form && (
        <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800" role="alert">
          {errors.form}
        </p>
      )}
    </section>
  )
}
