export type DishType = 'Entrée' | 'Plat' | 'Dessert'

export type Allergen = {
  id: number
  name: string
}

export type Dish = {
  id: number
  name: string
  type: DishType
  description?: string
  allergens: Allergen[]
}

export type Menu = {
  id: number
  title: string
  shortDescription: string
  fullDescription: string
  images: string[]
  theme: string
  diet: string
  dishes: Dish[]
  minimumPeople: number
  price: number
  stock: number
  conditions: string
}
