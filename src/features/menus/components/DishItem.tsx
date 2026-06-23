import type { Dish } from '../types/menu'

type DishItemProps = {
  dish: Dish
}

export function DishItem({ dish }: DishItemProps) {
  return (
    <li className="rounded-2xl border border-border/50 bg-surface-elevated p-5 shadow-sm transition hover:border-brand/20 hover:shadow-md">
      <p className="font-semibold text-text">{dish.name}</p>
      {dish.description ? (
        <p className="mt-2 text-sm leading-relaxed text-text-muted">{dish.description}</p>
      ) : null}
      <div className="mt-3">
        {dish.allergens.length > 0 ? (
          <ul className="flex flex-wrap gap-1.5" aria-label={`Allergènes pour ${dish.name}`}>
            {dish.allergens.map((allergen) => (
              <li
                key={allergen.id}
                className="rounded-full border border-border/70 bg-surface-muted px-2.5 py-0.5 text-xs font-medium text-text-muted"
              >
                {allergen.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-text-muted">Aucun allergène renseigné</p>
        )}
      </div>
    </li>
  )
}
