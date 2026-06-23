import type { Menu } from '../types/menu'

type ApiMenuDish = {
  id: number
  name: string
  type: 'Entrée' | 'Plat' | 'Dessert'
  description?: string | null
  allergens: { id: number; name: string }[]
}

export type ApiMenu = {
  id: number
  title: string
  shortDescription: string
  fullDescription: string
  images: string[]
  theme: string
  diet: string
  minimumPeople: number
  price: string
  stock: number
  conditions: string
  dishes: ApiMenuDish[]
}

export function mapApiMenuToMenu(apiMenu: ApiMenu): Menu {
  return {
    id: apiMenu.id,
    title: apiMenu.title,
    shortDescription: apiMenu.shortDescription,
    fullDescription: apiMenu.fullDescription,
    images: apiMenu.images,
    theme: apiMenu.theme,
    diet: apiMenu.diet,
    minimumPeople: apiMenu.minimumPeople,
    price: Number.parseFloat(apiMenu.price),
    stock: apiMenu.stock,
    conditions: apiMenu.conditions,
    dishes: apiMenu.dishes.map((dish) => ({
      id: dish.id,
      name: dish.name,
      type: dish.type,
      description: dish.description ?? undefined,
      allergens: dish.allergens,
    })),
  }
}
