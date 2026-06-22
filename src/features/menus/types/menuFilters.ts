export type MenuFilters = {
  maxPrice: number | null
  minPrice: number | null
  rangeMaxPrice: number | null
  theme: string
  diet: string
  minimumPeople: number | null
}

export const MENU_THEMES = ['Noël', 'Pâques', 'Classique', 'Événement'] as const
export const MENU_DIETS = ['Classique', 'Végétarien', 'Végan'] as const

export const EMPTY_MENU_FILTERS: MenuFilters = {
  maxPrice: null,
  minPrice: null,
  rangeMaxPrice: null,
  theme: '',
  diet: '',
  minimumPeople: null,
}

export function countActiveFilters(filters: MenuFilters): number {
  let count = 0

  if (filters.maxPrice !== null) count++
  if (filters.minPrice !== null) count++
  if (filters.rangeMaxPrice !== null) count++
  if (filters.theme) count++
  if (filters.diet) count++
  if (filters.minimumPeople !== null) count++

  return count
}
