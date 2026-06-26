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
        <ul
          className="flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-0.5 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Miniatures du menu"
        >
          {images.map((image, index) => {
            const isSelected = selectedIndex === index

            return (
              <li key={`${image}-${index}`} className="shrink-0 snap-start">
                <button
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`Afficher la photo ${index + 1}`}
                  aria-current={isSelected ? 'true' : undefined}
                  className={[
                    'box-border block rounded-xl bg-surface-muted transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
                    isSelected
                      ? 'border-2 border-brand shadow-md shadow-brand/10'
                      : 'border-2 border-transparent opacity-75 hover:opacity-100',
                  ].join(' ')}
                >
                  <div className="flex aspect-[4/3] w-[5.75rem] items-center justify-center sm:w-24">
                    <MenuImage
                      src={image}
                      alt=""
                      className="max-h-full max-w-full object-contain"
                      placeholderClassName="h-full w-full"
                      placeholderIconClassName="h-5 w-5"
                    />
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
