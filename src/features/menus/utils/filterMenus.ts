import type { Menu } from '../types/menu'
import type { MenuFilters } from '../types/menuFilters'

export function hasInvalidPriceRange(filters: MenuFilters): boolean {
  if (filters.minPrice === null || filters.rangeMaxPrice === null) {
    return false
  }

  return filters.minPrice > filters.rangeMaxPrice
}

export function filterMenus(menus: Menu[], filters: MenuFilters): Menu[] {
  if (hasInvalidPriceRange(filters)) {
    return []
  }

  return menus.filter((menu) => {
    const matchesMaxPrice =
      filters.maxPrice === null || menu.price <= filters.maxPrice

    const matchesPriceRange =
      (filters.minPrice === null || menu.price >= filters.minPrice) &&
      (filters.rangeMaxPrice === null || menu.price <= filters.rangeMaxPrice)

    const matchesTheme = !filters.theme || menu.theme === filters.theme

    const matchesDiet = !filters.diet || menu.diet === filters.diet

    const matchesPeople =
      filters.minimumPeople === null || menu.minimumPeople <= filters.minimumPeople

    return (
      matchesMaxPrice &&
      matchesPriceRange &&
      matchesTheme &&
      matchesDiet &&
      matchesPeople
    )
  })
}
