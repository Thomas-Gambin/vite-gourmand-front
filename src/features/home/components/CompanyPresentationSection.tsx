import { motion, useReducedMotion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { ScrollReveal } from '../../../shared/components/motion/ScrollReveal'
import { SectionHeader } from './SectionHeader'

const highlights = [
  { value: '25', label: 'Années d’expérience' },
  { value: '100%', label: 'Prestations sur mesure' },
  { value: 'Bordeaux', label: 'Ancrés localement' },
]

export function CompanyPresentationSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section aria-labelledby="company-presentation-title" className="py-8">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
        <div>
          <SectionHeader
            eyebrow="Notre histoire"
            title="Une entreprise de traiteur ancrée à Bordeaux"
            titleId="company-presentation-title"
          />

          <ScrollReveal delay={0.1} className="mt-8 max-w-2xl space-y-5">
            <p className="text-base leading-relaxed text-text-muted sm:text-lg">
              Depuis 25 ans, Vite &amp; Gourmand accompagne ses clients à Bordeaux avec des menus
              pensés pour les repas du quotidien comme pour les grands événements. Julie et José
              mettent leur expérience au service d&apos;une cuisine généreuse, organisée et
              adaptée aux besoins de chaque prestation.
            </p>
            <p className="text-base leading-relaxed text-text-muted">
              Repas de famille, fêtes de Noël et de Pâques, réceptions privées ou événements
              professionnels : nos cartes évoluent régulièrement pour proposer des suggestions de
              saison, toujours pensées pour faciliter l&apos;organisation de votre événement.
            </p>
            <p className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface-elevated px-4 py-2 text-sm font-medium text-text shadow-sm">
              <MapPin className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" strokeWidth={1.75} />
              <span>Bordeaux</span>
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="right" delay={0.15}>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-gradient-to-br from-brand-muted/50 via-surface-elevated to-surface p-8 shadow-xl shadow-brand/5">
            <div
              className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand/10 blur-2xl"
              aria-hidden="true"
            />
            <h3 className="text-lg font-semibold text-text">Ce qui nous définit</h3>
            <ul className="mt-6 space-y-4">
              {highlights.map((item, index) => (
                <motion.li
                  key={item.label}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-border/60 bg-surface-elevated/80 px-5 py-4"
                  initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span className="text-sm text-text-muted">{item.label}</span>
                  <span className="text-lg font-semibold text-brand">{item.value}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
