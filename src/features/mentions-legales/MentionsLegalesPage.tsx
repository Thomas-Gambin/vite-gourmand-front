import { ArrowRight, Building2, Copyright, Mail, Scale, Server, ShieldAlert } from 'lucide-react'
import { Link } from 'react-router-dom'
import { InfoField, LegalCardSection } from '../../shared/components/legal'
import { ScrollReveal } from '../../shared/components/motion/ScrollReveal'

const linkClassName =
  'inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2'

export function MentionsLegalesPage() {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute -right-20 -top-10 h-64 w-64 rounded-full bg-brand/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-16 top-48 h-48 w-48 rounded-full bg-brand/8 blur-3xl"
        aria-hidden="true"
      />

      <article aria-labelledby="mentions-legales-title" className="relative mx-auto max-w-3xl break-words">
        <ScrollReveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-surface-elevated/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand shadow-sm backdrop-blur-sm">
            <Scale className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={1.75} />
            Informations légales
          </p>
          <h1
            id="mentions-legales-title"
            className="mt-5 text-3xl font-semibold tracking-tight text-text sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
          >
            Mentions <span className="text-brand">légales</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
            Le site <strong className="font-medium text-text">Vite &amp; Gourmand</strong> est édité
            par une entreprise de traiteur située à Bordeaux. Retrouvez ci-dessous les informations
            réglementaires relatives à ce site.
          </p>
        </ScrollReveal>

        <div className="mt-12 space-y-5">
          <ScrollReveal delay={0.05}>
            <LegalCardSection id="editeur" title="Éditeur du site" icon={Building2}>
              <p>
                <strong className="font-medium text-text">Vite &amp; Gourmand</strong> — entreprise
                située à Bordeaux.
              </p>
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                <InfoField label="Adresse" value="Information à compléter" />
                <InfoField label="Email" value="Information à compléter" />
                <InfoField label="SIRET" value="Information à compléter" />
              </dl>
            </LegalCardSection>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <LegalCardSection id="hebergement" title="Hébergement" icon={Server}>
              <dl className="grid gap-3 sm:grid-cols-2">
                <InfoField label="Hébergeur" value="Information à compléter" />
                <InfoField label="Adresse" value="Information à compléter" />
                <InfoField label="Contact" value="Information à compléter" />
              </dl>
            </LegalCardSection>
          </ScrollReveal>

          <ScrollReveal delay={0.11}>
            <LegalCardSection
              id="propriete-intellectuelle"
              title="Propriété intellectuelle"
              icon={Copyright}
            >
              <p>
                L&apos;ensemble des éléments présents sur ce site (textes, images, graphismes, logo,
                structure) est protégé par le droit de la propriété intellectuelle.
              </p>
              <p>
                Toute reproduction, représentation, modification ou exploitation, totale ou
                partielle, sans autorisation préalable de l&apos;éditeur est interdite.
              </p>
            </LegalCardSection>
          </ScrollReveal>

          <ScrollReveal delay={0.14}>
            <LegalCardSection id="responsabilite" title="Responsabilité" icon={ShieldAlert}>
              <p>
                L&apos;éditeur s&apos;efforce d&apos;assurer l&apos;exactitude des informations
                diffusées sur le site. Toutefois, il ne saurait être tenu responsable des omissions,
                inexactitudes ou d&apos;une indisponibilité temporaire du service.
              </p>
              <p>
                L&apos;utilisateur est seul responsable de l&apos;usage qu&apos;il fait des
                informations accessibles sur le site.
              </p>
            </LegalCardSection>
          </ScrollReveal>

          <ScrollReveal delay={0.17}>
            <section
              aria-labelledby="contact"
              className="relative overflow-hidden rounded-[1.75rem] border border-brand/15 bg-gradient-to-br from-brand-muted/70 via-surface-elevated to-surface p-6 shadow-xl shadow-brand/5 sm:p-8"
            >
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand/10 blur-2xl"
                aria-hidden="true"
              />
              <div className="relative">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Mail className="h-5 w-5" aria-hidden="true" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h2 id="contact" className="text-lg font-semibold text-text sm:text-xl">
                      Contact
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-text-muted sm:text-base">
                      Pour toute question relative au site, contactez-nous via notre formulaire ou
                      les coordonnées ci-dessous.
                    </p>
                  </div>
                </div>

                <dl className="relative mt-6 grid gap-3 sm:grid-cols-2">
                  <InfoField label="Email" value="Information à compléter" />
                  <InfoField label="Téléphone" value="Information à compléter" />
                </dl>

                <div className="relative mt-6">
                  <Link to="/contact" className={linkClassName}>
                    Accéder à la page contact
                    <ArrowRight className="h-4 w-4" aria-hidden="true" strokeWidth={2} />
                  </Link>
                </div>
              </div>
            </section>
          </ScrollReveal>
        </div>
      </article>
    </div>
  )
}
