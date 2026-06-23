import { useState } from 'react'
import { MenuImagePlaceholder } from './MenuImagePlaceholder'
import { resolveMenuImageUrl } from '../utils/resolveMenuImageUrl'

type MenuImageProps = {
  src?: string | null
  alt: string
  className?: string
  placeholderClassName?: string
  placeholderIconClassName?: string
  rounded?: boolean
  placeholderTitle?: string
}

export function MenuImage({
  src,
  alt,
  className = '',
  placeholderClassName = '',
  placeholderIconClassName,
  rounded = false,
  placeholderTitle,
}: MenuImageProps) {
  const [hasError, setHasError] = useState(false)
  const resolvedSrc = resolveMenuImageUrl(src)

  if (!resolvedSrc || hasError) {
    return (
      <MenuImagePlaceholder
        title={placeholderTitle}
        className={placeholderClassName || className}
        iconClassName={placeholderIconClassName}
        rounded={rounded}
      />
    )
  }

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  )
}
