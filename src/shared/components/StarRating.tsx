import { Star } from 'lucide-react'

type StarRatingProps = {
  rating: number
  className?: string
}

export function StarRating({ rating, className }: StarRatingProps) {
  const clampedRating = Math.min(5, Math.max(1, Math.round(rating)))

  return (
    <div className={className ?? 'flex items-center gap-2'} aria-label={`Note : ${clampedRating} sur 5`}>
      <span className="flex gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }, (_, starIndex) => {
          const isFilled = starIndex < clampedRating

          return (
            <Star
              key={starIndex}
              className={`h-4 w-4 ${isFilled ? 'fill-brand text-brand' : 'text-border'}`}
              strokeWidth={1.75}
            />
          )
        })}
      </span>
      <span className="text-sm font-medium text-text">{clampedRating}/5</span>
    </div>
  )
}
