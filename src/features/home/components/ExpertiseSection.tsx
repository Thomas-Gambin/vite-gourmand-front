import { motion, useReducedMotion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  Award,
  CalendarDays,
  ClipboardList,
  Headphones,
  Leaf,
  ShieldCheck,
} from 'lucide-react'
import { ScrollReveal } from '../../../shared/components/motion/ScrollReveal'
import { SectionHeader } from './SectionHeader'

type ExpertiseItem = {
  title: string
  description: string
  icon: LucideIcon
}

const expertiseItems: ExpertiseItem[] = [
  {
    title: '25 ans d’expérience',
    description:
      'Un savoir-faire forgé au fil des années pour accompagner particuliers et professionnels.',
    icon: Award,
  },
  {
    title: 'Menus de saison',
    description:
      'Des suggestions régulièrement renouvelées, adaptées aux produits du moment.',
    icon: Leaf,
  },
  {
    title: 'Prestations événementielles',
    description:
      'Repas, fêtes de fin d’année, réceptions privées ou événements d’entreprise.',
    icon: CalendarDays,
  },
  {
    title: 'Suivi des commandes',
    description:
      'Un accompagnement clair de la commande à la livraison ou au retrait.',
    icon: ClipboardList,
  },
  {
    title: 'Respect des conditions de préparation',
    description:
      'Des plats préparés avec rigueur pour garantir qualité et fraîcheur.',
    icon: ShieldCheck,
  },
  {
    title: 'Service client',
    description:
      'Une équipe à l’écoute pour répondre à vos questions et adapter vos besoins.',
    icon: Headphones,
  },
]

export function ExpertiseSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section aria-labelledby="expertise-title" className="py-8">
      <div className="rounded-[2rem] border border-border/70 bg-surface-muted/60 px-6 py-12 sm:px-10 sm:py-14">
        <SectionHeader
          eyebrow="Savoir-faire"
          title="Professionnalisme et excellence"
          description="Une équipe expérimentée pour des prestations soignées, de la conception du menu à la livraison."
          align="center"
          titleId="expertise-title"
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {expertiseItems.map((item, index) => {
            const Icon = item.icon

            return (
              <li key={item.title} className="h-full">
                <ScrollReveal delay={index * 0.08} className="h-full">
                  <motion.article
                    className="group flex h-full flex-col rounded-2xl border border-border/60 bg-surface-elevated p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-brand/10"
                    whileHover={prefersReducedMotion ? undefined : { y: -6 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-muted to-brand/10 text-brand transition-transform duration-300 group-hover:scale-105">
                      <Icon className="h-5 w-5" aria-hidden="true" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold text-text">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">
                      {item.description}
                    </p>
                  </motion.article>
                </ScrollReveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
