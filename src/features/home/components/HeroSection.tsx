import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Mail, Sparkles, UtensilsCrossed } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { StaggerContainer, StaggerItem } from '../../../shared/components/motion/StaggerContainer'

export function HeroSection() {
  const imageRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1])

  return (
    <section
      aria-labelledby="hero-title"
      className="relative left-1/2 mb-6 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden"
    >
      <div className="relative bg-gradient-to-br from-brand-muted/80 via-surface to-surface px-5 pb-20 pt-14 sm:pb-24 sm:pt-20">
        <div
          className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-brand/5 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-brand/8 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <StaggerContainer className="max-w-xl">
            <StaggerItem>
              <p className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-surface-elevated/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand shadow-sm backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={1.75} />
                Traiteur à Bordeaux
              </p>
            </StaggerItem>

            <StaggerItem>
              <h1
                id="hero-title"
                className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-text sm:text-5xl lg:text-[3.25rem]"
              >
                Vite &amp; Gourmand,{' '}
                <span className="text-brand">traiteur d&apos;exception</span> depuis 25 ans
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-text-muted sm:text-lg">
                Des menus de saison pour vos repas, événements familiaux et prestations
                professionnelles. Une cuisine généreuse, soignée et pensée pour chaque
                occasion.
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  to="/menus"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-surface-elevated shadow-lg shadow-brand/20 transition hover:-translate-y-0.5 hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  <UtensilsCrossed className="h-4 w-4" aria-hidden="true" strokeWidth={1.75} />
                  Découvrir nos menus
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                    strokeWidth={1.75}
                  />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border/80 bg-surface-elevated/90 px-6 py-3 text-sm font-medium text-text shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-brand/30 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" strokeWidth={1.75} />
                  Nous contacter
                </Link>
              </div>
            </StaggerItem>

            <StaggerItem>
              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border/70 pt-8">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-text-muted">Expérience</dt>
                  <dd className="mt-1 text-2xl font-semibold text-brand">25 ans</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-text-muted">Ville</dt>
                  <dd className="mt-1 text-2xl font-semibold text-brand">Bordeaux</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-text-muted">Cuisine</dt>
                  <dd className="mt-1 text-2xl font-semibold text-brand">Saison</dd>
                </div>
              </dl>
            </StaggerItem>
          </StaggerContainer>

          <motion.div
            ref={imageRef}
            className="relative"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96, y: 24 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand/15 to-transparent blur-2xl"
              aria-hidden="true"
            />
            <figure className="relative overflow-hidden rounded-[1.75rem] border border-white/60 bg-surface-elevated shadow-2xl shadow-brand/10">
              <motion.div
                className="overflow-hidden"
                style={prefersReducedMotion ? undefined : { y: imageY, scale: imageScale }}
              >
                <img
                  src="/buffet.png"
                  alt="Buffet traiteur élégant avec canapés, salades et desserts dans une salle de réception lumineuse."
                  className="aspect-[4/3] w-full object-cover sm:aspect-[5/4]"
                  width={1200}
                  height={800}
                  fetchPriority="high"
                />
              </motion.div>
            </figure>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
