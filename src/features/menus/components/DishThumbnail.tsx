import { useState } from 'react'
import { resolveMenuImageUrl } from '../utils/resolveMenuImageUrl'

type DishThumbnailProps = {
  photo: string
  name: string
}

export function DishThumbnail({ photo, name }: DishThumbnailProps) {
  const [hasError, setHasError] = useState(false)
  const resolvedSrc = resolveMenuImageUrl(photo)

  if (!resolvedSrc || hasError) {
    return null
  }

  return (
    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-surface-muted sm:h-[4.5rem] sm:w-[4.5rem]">
      <img
        src={resolvedSrc}
        alt={`Photo du plat ${name}`}
        className="h-full w-full object-cover"
        onError={() => setHasError(true)}
      />
    </div>
  )
}
