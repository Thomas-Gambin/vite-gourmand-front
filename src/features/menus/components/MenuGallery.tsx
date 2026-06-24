import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
      <div className="group relative overflow-hidden rounded-[1.75rem] shadow-xl shadow-brand/10 ring-1 ring-border/30">
        <MenuImagePlaceholder
          title={title}
          className="aspect-[5/4] w-full sm:aspect-[4/3]"
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
    <div className="space-y-3">
      <div className="group relative overflow-hidden rounded-[1.75rem] shadow-xl shadow-brand/10 ring-1 ring-border/30">
        <AnimatePresence mode="wait">
          <motion.div
            key={images[selectedIndex]}
            initial={{ opacity: 0.6, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.6 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <MenuImage
              src={images[selectedIndex]}
              alt={mainAlt}
              className="aspect-[5/4] w-full object-cover transition duration-700 group-hover:scale-[1.03] sm:aspect-[4/3]"
              placeholderClassName="aspect-[5/4] w-full sm:aspect-[4/3]"
              placeholderIconClassName="h-16 w-16"
              placeholderTitle={title}
            />
          </motion.div>
        </AnimatePresence>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-text/25 to-transparent"
          aria-hidden
        />

        {images.length > 1 && (
          <span className="absolute bottom-4 right-4 rounded-full bg-surface-elevated/90 px-3 py-1 text-xs font-medium tabular-nums text-text shadow-sm backdrop-blur-sm">
            {selectedIndex + 1} / {images.length}
          </span>
        )}
      </div>

      {images.length > 1 ? (
        <ul className="flex gap-2 overflow-x-auto pb-1" aria-label="Miniatures du menu">
          {images.map((image, index) => (
            <li key={`${image}-${index}`} className="shrink-0">
              <button
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-label={`Afficher la photo ${index + 1}`}
                aria-current={selectedIndex === index ? 'true' : undefined}
                className={[
                  'cursor-pointer overflow-hidden rounded-xl transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
                  selectedIndex === index
                    ? 'ring-2 ring-brand ring-offset-2'
                    : 'opacity-55 hover:opacity-100',
                ].join(' ')}
              >
                <MenuImage
                  src={image}
                  alt=""
                  className="h-14 w-[4.5rem] object-cover sm:h-16 sm:w-20"
                  placeholderClassName="h-14 w-[4.5rem] sm:h-16 sm:w-20"
                  placeholderIconClassName="h-5 w-5"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
