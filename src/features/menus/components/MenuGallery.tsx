import { useState } from 'react'
import { UtensilsCrossed } from 'lucide-react'

type MenuGalleryProps = {
  title: string
  images: string[]
}

export function MenuGallery({ title, images }: MenuGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (images.length === 0) {
    return (
      <div
        className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl bg-brand-muted"
        role="img"
        aria-label={`Aucune photo disponible pour le menu ${title}`}
      >
        <UtensilsCrossed className="h-16 w-16 text-brand/40" strokeWidth={1.5} aria-hidden="true" />
      </div>
    )
  }

  const mainAlt =
    images.length > 1
      ? `Photo ${selectedIndex + 1} du menu ${title}`
      : `Photo du menu ${title}`

  return (
    <div>
      <img
        src={images[selectedIndex]}
        alt={mainAlt}
        className="aspect-[4/3] w-full rounded-2xl object-cover"
      />

      {images.length > 1 ? (
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Miniatures du menu">
          {images.map((image, index) => (
            <li key={image}>
              <button
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-label={`Afficher la photo ${index + 1}`}
                aria-current={selectedIndex === index ? 'true' : undefined}
                className={`overflow-hidden rounded-lg border-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
                  selectedIndex === index ? 'border-brand' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={image}
                  alt=""
                  className="h-16 w-20 object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
