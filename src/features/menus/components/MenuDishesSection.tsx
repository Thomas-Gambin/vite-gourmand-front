import { ChefHat, Cookie, Salad } from 'lucide-react'
import type { Dish, DishType } from '../types/menu'
import { menuDetailSectionClassName } from '../menuDetailUi'
import { DishItem } from './DishItem'
import { MenuSectionHeader } from './MenuSectionHeader'

type MenuDishesSectionProps = {
  dishes: Dish[]
}

const DISH_TYPE_ORDER: DishType[] = ['Entrée', 'Plat', 'Dessert']

const DISH_TYPE_LABELS: Record<DishType, string> = {
  Entrée: 'Entrées',
  Plat: 'Plats',
  Dessert: 'Desserts',
}

const DISH_TYPE_ICONS: Record<DishType, typeof Salad> = {
  Entrée: Salad,
  Plat: ChefHat,
  Dessert: Cookie,
}

function groupDishesByType(dishes: Dish[]): Partial<Record<DishType, Dish[]>> {
  return dishes.reduce<Partial<Record<DishType, Dish[]>>>((groups, dish) => {
    const existing = groups[dish.type] ?? []
    return { ...groups, [dish.type]: [...existing, dish] }
  }, {})
}

export function MenuDishesSection({ dishes }: MenuDishesSectionProps) {
  const groupedDishes = groupDishesByType(dishes)

  return (
    <section aria-labelledby="dishes-title" className={menuDetailSectionClassName}>
      <MenuSectionHeader
        eyebrow="Composition"
        title="Les plats du menu"
        titleId="dishes-title"
        description="Découvrez la sélection de plats inclus dans cette prestation."
      />

      <div className="mt-8 space-y-10">
        {DISH_TYPE_ORDER.map((type) => {
          const typeDishes = groupedDishes[type]
          if (!typeDishes?.length) return null

          const Icon = DISH_TYPE_ICONS[type]

          return (
            <div key={type}>
              <h3 className="flex items-center gap-3 text-base font-semibold text-text">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-muted text-brand">
                  <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                </span>
                {DISH_TYPE_LABELS[type]}
                <span className="text-sm font-normal text-text-muted">({typeDishes.length})</span>
              </h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {typeDishes.map((dish) => (
                  <DishItem key={dish.id} dish={dish} />
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}
