import { useState } from 'react'
import { MenuImage } from './MenuImage'
import { MenuImagePlaceholder } from './MenuImagePlaceholder'

type MenuGalleryProps = {
  title: string
  images: string[]
}

export function MenuGallery({ title, images }: MenuGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (images.length === 0) {
    return (
      <div className="overflow-hidden rounded-3xl border border-border/60 shadow-lg shadow-brand/5 ring-1 ring-border/40">
        <MenuImagePlaceholder
          title={title}
          className="aspect-[5/4] w-full"
          iconClassName="h-16 w-16"
        />
      </div>
    )
  }

  const mainAlt =
    images.length > 1
      ? `Photo ${selectedIndex + 1} du menu ${title}`
      : `Photo du menu ${title}`

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-3xl border border-border/60 shadow-lg shadow-brand/5 ring-1 ring-border/40">
        <MenuImage
          key={images[selectedIndex]}
          src={images[selectedIndex]}
          alt={mainAlt}
          className="aspect-[5/4] w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
          placeholderClassName="aspect-[5/4] w-full"
          placeholderIconClassName="h-16 w-16"
          placeholderTitle={title}
        />
      </div>

      {images.length > 1 ? (
        <ul className="flex flex-wrap gap-2.5" aria-label="Miniatures du menu">
          {images.map((image, index) => (
            <li key={`${image}-${index}`}>
              <button
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-label={`Afficher la photo ${index + 1}`}
                aria-current={selectedIndex === index ? 'true' : undefined}
                className={`cursor-pointer overflow-hidden rounded-xl border-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
                  selectedIndex === index
                    ? 'border-brand shadow-md shadow-brand/15'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <MenuImage
                  src={image}
                  alt=""
                  className="h-16 w-20 object-cover"
                  placeholderClassName="h-16 w-20"
                  placeholderIconClassName="h-6 w-6"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
