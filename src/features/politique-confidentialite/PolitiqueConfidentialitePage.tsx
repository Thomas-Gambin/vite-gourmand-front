import {
  ArrowRight,
  Clock,
  Database,
  Lock,
  Mail,
  Shield,
  Target,
  UserCheck,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { InfoField, LegalCardSection } from '../../shared/components/legal'
import { ScrollReveal } from '../../shared/components/motion/ScrollReveal'

const linkClassName =
  'inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2'

export function PolitiqueConfidentialitePage() {
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

      <article
        aria-labelledby="politique-confidentialite-title"
        className="relative mx-auto max-w-3xl break-words"
      >
        <ScrollReveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-surface-elevated/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand shadow-sm backdrop-blur-sm">
            <Shield className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={1.75} />
            Protection des données
          </p>
          <h1
            id="politique-confidentialite-title"
            className="mt-5 text-3xl font-semibold tracking-tight text-text sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
          >
            Politique de <span className="text-brand">confidentialité</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
            La présente politique décrit la manière dont{' '}
            <strong className="font-medium text-text">Vite &amp; Gourmand</strong> collecte et
            traite les données personnelles des utilisateurs de son site.
          </p>
        </ScrollReveal>

        <div className="mt-12 space-y-5">
          <ScrollReveal delay={0.05}>
            <LegalCardSection id="donnees-collectees" title="Données collectées" icon={Database}>
              <p>Dans le cadre de l&apos;utilisation du site, nous pouvons collecter notamment :</p>
              <ul>
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Adresse postale</li>
                <li>Adresse de prestation</li>
                <li>Informations relatives aux commandes</li>
                <li>Avis clients</li>
                <li>Messages envoyés via le formulaire de contact</li>
              </ul>
            </LegalCardSection>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <LegalCardSection id="finalites" title="Finalités du traitement" icon={Target}>
              <p>
                Les données collectées sont utilisées pour la gestion des comptes utilisateurs, des
                commandes, des demandes de contact, du suivi des prestations et des avis clients.
              </p>
            </LegalCardSection>
          </ScrollReveal>

          <ScrollReveal delay={0.11}>
            <LegalCardSection id="duree-conservation" title="Durée de conservation" icon={Clock}>
              <p>
                Les données personnelles sont conservées pendant la durée nécessaire aux finalités
                pour lesquelles elles ont été collectées, puis archivées ou supprimées conformément
                aux obligations légales applicables.
              </p>
              <dl className="mt-4 grid gap-3">
                <InfoField label="Durées de conservation détaillées" value="Information à compléter" />
              </dl>
            </LegalCardSection>
          </ScrollReveal>

          <ScrollReveal delay={0.14}>
            <LegalCardSection id="destinataires" title="Destinataires des données" icon={Users}>
              <p>
                Les données sont accessibles à l&apos;équipe de Vite &amp; Gourmand dans le cadre de
                leurs missions, ainsi qu&apos;à des prestataires techniques intervenant pour le
                fonctionnement du site et des services associés.
              </p>
              <dl className="mt-4 grid gap-3">
                <InfoField label="Liste des sous-traitants" value="Information à compléter" />
              </dl>
            </LegalCardSection>
          </ScrollReveal>

          <ScrollReveal delay={0.17}>
            <LegalCardSection id="securite" title="Sécurité" icon={Lock}>
              <p>
                Vite &amp; Gourmand met en œuvre des mesures techniques et organisationnelles
                appropriées afin de protéger les données personnelles contre la destruction, la
                perte, l&apos;altération, la divulgation ou l&apos;accès non autorisé.
              </p>
            </LegalCardSection>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <LegalCardSection id="droits-utilisateurs" title="Droits des utilisateurs" icon={UserCheck}>
              <p>
                Conformément à la réglementation applicable, vous disposez des droits suivants sur
                vos données personnelles :
              </p>
              <ul>
                <li>Droit d&apos;accès</li>
                <li>Droit de rectification</li>
                <li>Droit à l&apos;effacement</li>
                <li>Droit d&apos;opposition</li>
                <li>Droit à la portabilité</li>
                <li>Droit d&apos;introduire une réclamation auprès de la CNIL</li>
              </ul>
            </LegalCardSection>
          </ScrollReveal>

          <ScrollReveal delay={0.23}>
            <section
              aria-labelledby="contact-rgpd"
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
                    <h2 id="contact-rgpd" className="text-lg font-semibold text-text sm:text-xl">
                      Contact pour les demandes RGPD
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-text-muted sm:text-base">
                      Pour exercer vos droits ou pour toute question relative à la protection de vos
                      données, contactez notre équipe via le formulaire dédié.
                    </p>
                  </div>
                </div>

                <dl className="relative mt-6 grid gap-3">
                  <InfoField label="Email dédié aux demandes RGPD" value="contact@vitegourmand.fr" />
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
