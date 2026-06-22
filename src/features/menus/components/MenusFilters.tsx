import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, SlidersHorizontal } from 'lucide-react'
import { useId, useState } from 'react'
import type { MenuFilters } from '../types/menuFilters'
import { MENU_DIETS, MENU_THEMES, countActiveFilters } from '../types/menuFilters'
import { hasInvalidPriceRange } from '../utils/filterMenus'

type MenusFiltersProps = {
  filters: MenuFilters
  onChange: (filters: MenuFilters) => void
  onReset: () => void
  resultCount?: number
}

const inputClassName =
  'w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2'

function parseOptionalNumber(value: string): number | null {
  if (value === '') {
    return null
  }

  const parsed = Number(value)
  return Number.isNaN(parsed) ? null : parsed
}

export function MenusFilters({
  filters,
  onChange,
  onReset,
  resultCount,
}: MenusFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const panelId = useId()
  const prefersReducedMotion = useReducedMotion()
  const showInvalidRange = hasInvalidPriceRange(filters)
  const activeFilterCount = countActiveFilters(filters)

  const panelTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }

  function togglePanel() {
    setIsOpen((open) => !open)
  }

  return (
    <div className="mt-10 rounded-2xl border border-border/60 bg-surface-elevated">
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <button
          type="button"
          className="flex w-full items-center justify-between gap-3 rounded-xl px-2 py-1 text-left transition hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={togglePanel}
        >
          <span className="flex items-center gap-3">
            <SlidersHorizontal className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" strokeWidth={1.75} />
            <span className="text-lg font-semibold tracking-tight text-text">Filtrer les menus</span>
            {activeFilterCount > 0 ? (
              <span className="rounded-full bg-brand-muted px-2.5 py-0.5 text-xs font-medium text-brand">
                {activeFilterCount} filtre{activeFilterCount > 1 ? 's' : ''} actif
                {activeFilterCount > 1 ? 's' : ''}
              </span>
            ) : null}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={panelTransition}
            className="shrink-0"
          >
            <ChevronDown
              className="h-5 w-5 text-text-muted"
              aria-hidden="true"
              strokeWidth={1.75}
            />
          </motion.span>
        </button>

        {resultCount !== undefined ? (
          <p className="px-2 text-sm text-text-muted sm:px-0" aria-live="polite">
            {resultCount} menu{resultCount > 1 ? 's' : ''} trouvé{resultCount > 1 ? 's' : ''}
          </p>
        ) : null}
      </div>

      <div id={panelId}>
        <AnimatePresence initial={false}>
          {isOpen ? (
            <motion.div
              key="menus-filters-panel"
              initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
              transition={panelTransition}
              className="overflow-hidden border-t border-border/60"
            >
            <div className="px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
              <fieldset>
                <legend className="sr-only">Critères de filtrage des menus</legend>

                <motion.div
                  initial={prefersReducedMotion ? false : { y: -8 }}
                  animate={{ y: 0 }}
                  exit={prefersReducedMotion ? undefined : { y: -8 }}
                  transition={panelTransition}
                >
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label htmlFor="menu-filter-max-price" className="mb-2 block text-sm font-medium text-text">
                Prix maximum (€)
              </label>
              <input
                id="menu-filter-max-price"
                type="number"
                min={0}
                placeholder="Prix maximum"
                value={filters.maxPrice ?? ''}
                onChange={(event) =>
                  onChange({
                    ...filters,
                    maxPrice: parseOptionalNumber(event.target.value),
                  })
                }
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="menu-filter-min-price" className="mb-2 block text-sm font-medium text-text">
                Prix minimum (fourchette)
              </label>
              <input
                id="menu-filter-min-price"
                type="number"
                min={0}
                placeholder="Prix minimum"
                value={filters.minPrice ?? ''}
                onChange={(event) =>
                  onChange({
                    ...filters,
                    minPrice: parseOptionalNumber(event.target.value),
                  })
                }
                className={inputClassName}
              />
            </div>

            <div>
              <label
                htmlFor="menu-filter-range-max-price"
                className="mb-2 block text-sm font-medium text-text"
              >
                Prix maximum (fourchette)
              </label>
              <input
                id="menu-filter-range-max-price"
                type="number"
                min={0}
                placeholder="Prix maximum"
                value={filters.rangeMaxPrice ?? ''}
                onChange={(event) =>
                  onChange({
                    ...filters,
                    rangeMaxPrice: parseOptionalNumber(event.target.value),
                  })
                }
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="menu-filter-theme" className="mb-2 block text-sm font-medium text-text">
                Thème
              </label>
              <select
                id="menu-filter-theme"
                value={filters.theme}
                onChange={(event) =>
                  onChange({
                    ...filters,
                    theme: event.target.value,
                  })
                }
                className={inputClassName}
              >
                <option value="">Tous les thèmes</option>
                {MENU_THEMES.map((theme) => (
                  <option key={theme} value={theme}>
                    {theme}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="menu-filter-diet" className="mb-2 block text-sm font-medium text-text">
                Régime
              </label>
              <select
                id="menu-filter-diet"
                value={filters.diet}
                onChange={(event) =>
                  onChange({
                    ...filters,
                    diet: event.target.value,
                  })
                }
                className={inputClassName}
              >
                <option value="">Tous les régimes</option>
                {MENU_DIETS.map((diet) => (
                  <option key={diet} value={diet}>
                    {diet}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="menu-filter-minimum-people"
                className="mb-2 block text-sm font-medium text-text"
              >
                Nombre de personnes
              </label>
              <input
                id="menu-filter-minimum-people"
                type="number"
                min={1}
                placeholder="Nombre de personnes"
                value={filters.minimumPeople ?? ''}
                onChange={(event) =>
                  onChange({
                    ...filters,
                    minimumPeople: parseOptionalNumber(event.target.value),
                  })
                }
                className={inputClassName}
              />
            </div>
          </div>

          {showInvalidRange ? (
            <p className="mt-4 text-sm text-brand" role="alert">
              Le prix minimum de la fourchette ne peut pas être supérieur au prix maximum de la
              fourchette.
            </p>
          ) : null}

          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center justify-center rounded-full border border-border/80 bg-surface-elevated px-6 py-3 text-sm font-medium text-text transition hover:border-brand/30 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              Réinitialiser les filtres
            </button>
          </div>
                </motion.div>
              </fieldset>
            </div>
          </motion.div>
        ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}
