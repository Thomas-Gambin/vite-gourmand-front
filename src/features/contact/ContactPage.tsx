import { Mail } from 'lucide-react'
import { ScrollReveal } from '../../shared/components/motion/ScrollReveal'
import { ContactForm } from './components/ContactForm'
import { ContactInfo } from './components/ContactInfo'

export function ContactPage() {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute -right-20 -top-10 h-64 w-64 rounded-full bg-brand/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-16 top-40 h-48 w-48 rounded-full bg-brand/8 blur-3xl"
        aria-hidden="true"
      />

      <section aria-labelledby="contact-title" className="relative">
        <ScrollReveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-surface-elevated/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand shadow-sm backdrop-blur-sm">
            <Mail className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={1.75} />
            Nous écrire
          </p>
          <h1
            id="contact-title"
            className="mt-5 text-3xl font-semibold tracking-tight text-text sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
          >
            Contactez <span className="text-brand">Vite &amp; Gourmand</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
            Une question sur nos menus ou une prestation ? Envoyez-nous votre demande, nous vous
            répondrons dès que possible.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:items-start">
          <ScrollReveal direction="left" delay={0.05}>
            <ContactInfo />
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <ContactForm />
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
