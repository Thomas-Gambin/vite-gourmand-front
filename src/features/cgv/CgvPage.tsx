import {
  ArrowRight,
  CalendarX,
  ClipboardList,
  CreditCard,
  Euro,
  FileText,
  Mail,
  MessageSquareWarning,
  Package,
  Truck,
  UtensilsCrossed,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { InfoField, LegalCardSection } from '../../shared/components/legal'
import { ScrollReveal } from '../../shared/components/motion/ScrollReveal'

const linkClassName =
  'inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2'

const inlineLinkClassName =
  'font-medium text-brand underline decoration-border underline-offset-[3px] hover:text-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2'

export function CgvPage() {
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

      <article aria-labelledby="cgv-title" className="relative mx-auto max-w-3xl break-words">
        <ScrollReveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-surface-elevated/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand shadow-sm backdrop-blur-sm">
            <FileText className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={1.75} />
            Conditions de vente
          </p>
          <h1
            id="cgv-title"
            className="mt-5 text-3xl font-semibold tracking-tight text-text sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
          >
            Conditions générales de <span className="text-brand">vente</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
            Retrouvez ci-dessous les conditions applicables aux prestations proposées par{' '}
            <strong className="font-medium text-text">Vite &amp; Gourmand</strong>, traiteur situé
            à Bordeaux.
          </p>
        </ScrollReveal>

        <div className="mt-12 space-y-5">
          <ScrollReveal delay={0.05}>
            <LegalCardSection id="introduction" title="Introduction" icon={FileText}>
              <p>
                Les présentes conditions générales de vente (CGV) s&apos;appliquent aux prestations
                proposées par <strong className="font-medium text-text">Vite &amp; Gourmand</strong>{' '}
                pour toute commande passée via le site ou par tout autre moyen de contact proposé
                par l&apos;entreprise.
              </p>
            </LegalCardSection>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <LegalCardSection id="objet" title="Objet" icon={ClipboardList}>
              <p>
                Les CGV définissent les droits et obligations des parties dans le cadre de la vente
                de prestations traiteur, notamment la commande de menus pour des événements privés
                ou professionnels.
              </p>
            </LegalCardSection>
          </ScrollReveal>

          <ScrollReveal delay={0.11}>
            <LegalCardSection id="menus-commandes" title="Menus et commandes" icon={UtensilsCrossed}>
              <p>
                La commande porte sur un menu sélectionné parmi ceux proposés par Vite &amp;
                Gourmand. Chaque menu est soumis à un{' '}
                <strong className="font-medium text-text">nombre minimum de personnes obligatoire</strong>,
                indiqué lors de la consultation du menu.
              </p>
              <p>
                Le <strong className="font-medium text-text">prix est mis à jour selon le nombre de
                personnes</strong> renseigné lors de la commande.
              </p>
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                <InfoField label="Réduction applicable" value="10 %" />
                <InfoField label="Seuil de réduction" value="+5 personnes au-dessus du minimum" />
              </dl>
            </LegalCardSection>
          </ScrollReveal>

          <ScrollReveal delay={0.14}>
            <LegalCardSection id="prix" title="Prix" icon={Euro}>
              <p>
                Les prix affichés sont exprimés en euros et s&apos;entendent toutes taxes comprises,
                sauf mention contraire. Ils sont indicatifs et peuvent être ajustés en fonction du
                nombre de convives et des options sélectionnées.
              </p>
              <dl className="mt-4 grid gap-3">
                <InfoField label="Modalités de paiement" value="Information à compléter" />
              </dl>
            </LegalCardSection>
          </ScrollReveal>

          <ScrollReveal delay={0.17}>
            <LegalCardSection id="livraison" title="Livraison" icon={Truck}>
              <p>
                La livraison dans Bordeaux est proposée selon les modalités indiquées lors de la
                commande.
              </p>
              <p>
                Pour toute livraison{' '}
                <strong className="font-medium text-text">en dehors de Bordeaux</strong>, des frais
                supplémentaires s&apos;appliquent.
              </p>
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                <InfoField label="Frais de base" value="5 €" />
                <InfoField label="Par kilomètre" value="0,59 €" />
              </dl>
            </LegalCardSection>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <LegalCardSection
              id="modification-annulation"
              title="Modification et annulation de commande"
              icon={CalendarX}
            >
              <p>
                Toute modification ou annulation de commande est possible{' '}
                <strong className="font-medium text-text">avant acceptation de la commande par
                l&apos;équipe</strong> de Vite &amp; Gourmand.
              </p>
              <p>
                Après acceptation de la commande, les conditions de modification ou d&apos;annulation
                seront précisées au client selon les modalités applicables à la prestation
                concernée.
              </p>
            </LegalCardSection>
          </ScrollReveal>

          <ScrollReveal delay={0.23}>
            <LegalCardSection id="materiel-prete" title="Matériel prêté" icon={Package}>
              <p>
                Lorsque du matériel est prêté dans le cadre d&apos;une prestation, le client
                s&apos;engage à le restituer dans l&apos;état dans lequel il lui a été confié.
              </p>
              <p>
                En cas de non-restitution du matériel après notification, des frais pourront être
                facturés selon les conditions ci-dessous.
              </p>
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                <InfoField label="Délai de restitution" value="10 jours ouvrés" />
                <InfoField label="Frais en cas de non-restitution" value="600 €" />
              </dl>
            </LegalCardSection>
          </ScrollReveal>

          <ScrollReveal delay={0.26}>
            <LegalCardSection id="paiement" title="Paiement" icon={CreditCard}>
              <p>
                Le règlement de la commande s&apos;effectue selon les modalités communiquées lors de
                la validation de la prestation. Les conditions d&apos;acompte et de solde seront
                précisées lors de l&apos;acceptation de la commande.
              </p>
              <dl className="mt-4 grid gap-3">
                <InfoField label="Détails bancaires et délais" value="Information à compléter" />
              </dl>
            </LegalCardSection>
          </ScrollReveal>

          <ScrollReveal delay={0.29}>
            <LegalCardSection id="reclamations" title="Réclamations" icon={MessageSquareWarning}>
              <p>
                Pour toute réclamation relative à une commande ou à une prestation, le client peut
                contacter Vite &amp; Gourmand via le{' '}
                <Link to="/contact" className={inlineLinkClassName}>
                  formulaire de contact
                </Link>
                . La demande sera traitée dans les meilleurs délais.
              </p>
            </LegalCardSection>
          </ScrollReveal>

          <ScrollReveal delay={0.32}>
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
                      Pour toute question relative aux présentes conditions générales de vente,
                      contactez notre équipe via le formulaire dédié.
                    </p>
                  </div>
                </div>

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
