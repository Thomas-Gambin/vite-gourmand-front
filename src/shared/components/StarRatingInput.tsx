import { useState } from 'react'
import { Star } from 'lucide-react'

const RATING_LABELS: Record<number, string> = {
  1: 'Décevant',
  2: 'Moyen',
  3: 'Correct',
  4: 'Très bien',
  5: 'Excellent',
}

type StarRatingInputProps = {
  value: number
  onChange: (value: number) => void
  id?: string
  error?: string
}

export function StarRatingInput({ value, onChange, id, error }: StarRatingInputProps) {
  const [hovered, setHovered] = useState(0)
  const displayValue = hovered || value

  return (
    <div>
      <div className="mt-3 flex flex-wrap items-center gap-4">
        <div
          id={id}
          className="flex gap-0.5"
          role="group"
          aria-label="Note de 1 à 5 étoiles"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          onMouseLeave={() => setHovered(0)}
        >
          {[1, 2, 3, 4, 5].map((starValue) => {
            const isFilled = displayValue >= starValue

            return (
              <button
                key={starValue}
                type="button"
                onClick={() => onChange(starValue)}
                onMouseEnter={() => setHovered(starValue)}
                aria-pressed={value === starValue}
                aria-label={`${starValue} étoile${starValue > 1 ? 's' : ''}`}
                className="group cursor-pointer rounded-xl p-1.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                <Star
                  className={[
                    'h-8 w-8 transition-all duration-200 sm:h-9 sm:w-9',
                    isFilled
                      ? 'scale-110 fill-brand text-brand drop-shadow-sm'
                      : 'text-border/80 group-hover:scale-105 group-hover:text-brand/40',
                  ].join(' ')}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </button>
            )
          })}
        </div>

        {displayValue > 0 && (
          <span className="text-sm font-medium text-brand transition-opacity" aria-live="polite">
            {RATING_LABELS[displayValue]}
          </span>
        )}
      </div>

      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-rose-700" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
