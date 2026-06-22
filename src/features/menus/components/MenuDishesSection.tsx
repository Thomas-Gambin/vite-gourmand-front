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
    <section aria-labelledby="dishes-title" className="mt-10">
      <h2 id="dishes-title" className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">
        Les plats du menu
      </h2>
      <div className="mt-6 space-y-8">
        {DISH_TYPE_ORDER.map((type) => {
          const typeDishes = groupedDishes[type]
          if (!typeDishes?.length) return null

          return (
            <div key={type}>
              <h3 className="text-lg font-semibold text-text">{DISH_TYPE_LABELS[type]}</h3>
              <ul className="mt-3 space-y-3">
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
