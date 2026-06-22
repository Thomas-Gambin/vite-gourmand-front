import { ScrollReveal } from '../../../shared/components/motion/ScrollReveal'

type SectionHeaderProps = {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  titleId?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  titleId,
}: SectionHeaderProps) {
  const alignment = align === 'center' ? 'mx-auto text-center' : 'max-w-2xl'

  return (
    <ScrollReveal className={alignment}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">{eyebrow}</p>
      <h2 id={titleId} className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </ScrollReveal>
  )
}
