import type { Dish, DishType } from '../types/menu'
import { DishItem } from './DishItem'

type MenuDishesSectionProps = {
  dishes: Dish[]
}

const DISH_TYPE_ORDER: DishType[] = ['Entrée', 'Plat', 'Dessert']

const DISH_TYPE_LABELS: Record<DishType, string> = {
  Entrée: 'Entrées',
  Plat: 'Plats',
  Dessert: 'Desserts',
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
    <section aria-labelledby="dishes-title" className="mt-16">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Composition</p>
      <h2 id="dishes-title" className="mt-2 text-2xl font-bold tracking-tight text-text sm:text-3xl">
        Les plats du menu
      </h2>
      <div className="mt-8 space-y-10">
        {DISH_TYPE_ORDER.map((type) => {
          const typeDishes = groupedDishes[type]
          if (!typeDishes?.length) return null

          return (
            <div key={type}>
              <h3 className="inline-flex items-center gap-2 text-lg font-semibold text-text">
                <span className="h-px w-8 bg-brand/40" aria-hidden="true" />
                {DISH_TYPE_LABELS[type]}
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
