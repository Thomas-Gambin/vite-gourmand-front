import type { Dish } from '../types/menu'

type DishItemProps = {
  dish: Dish
}

export function DishItem({ dish }: DishItemProps) {
  return (
    <li className="rounded-xl border border-border/60 bg-surface-elevated p-4">
      <p className="font-medium text-text">{dish.name}</p>
      {dish.description ? (
        <p className="mt-1 text-sm leading-relaxed text-text-muted">{dish.description}</p>
      ) : null}
      <p className="mt-2 text-sm text-text-muted">
        {dish.allergens.length > 0 ? (
          <>
            <span className="font-medium text-text">Allergènes :</span>{' '}
            {dish.allergens.map((allergen) => allergen.name).join(', ')}
          </>
        ) : (
          'Aucun allergène renseigné'
        )}
      </p>
    </li>
  )
}
