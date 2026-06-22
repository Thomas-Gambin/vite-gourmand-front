import type { MenuFilters } from '../types/menuFilters'

export function menuFiltersToQueryParams(filters: MenuFilters): URLSearchParams {
  const params = new URLSearchParams()

  if (filters.maxPrice !== null) {
    params.set('maxPrice', String(filters.maxPrice))
  }

  if (filters.minPrice !== null) {
    params.set('minPrice', String(filters.minPrice))
  }

  if (filters.rangeMaxPrice !== null) {
    params.set('rangeMaxPrice', String(filters.rangeMaxPrice))
  }

  if (filters.theme) {
    params.set('theme', filters.theme)
  }

  if (filters.diet) {
    params.set('diet', filters.diet)
  }

  if (filters.minimumPeople !== null) {
    params.set('minimumPeople', String(filters.minimumPeople))
  }

  return params
}
