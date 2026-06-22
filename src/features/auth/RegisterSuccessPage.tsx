import { motion } from 'framer-motion'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { ResendVerificationForm } from './components/ResendVerificationForm'

export function RegisterSuccessPage() {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const stateEmail = (location.state as { email?: string } | null)?.email
  const queryEmail = searchParams.get('email') ?? ''
  const initialEmail = stateEmail ?? queryEmail

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-14 sm:py-16">
      <div className="grid items-stretch gap-8 lg:grid-cols-2">
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-border/80 bg-brand-muted p-7"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Vite &amp; Gourmand</p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-text">Presque terminé</h1>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            Il ne reste plus qu’à confirmer votre adresse email pour activer votre compte et commander nos menus.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-border/80 bg-surface-elevated p-7 shadow-sm"
        >
          <h2 className="text-xl font-semibold tracking-tight text-text">Confirmez votre adresse email</h2>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            Un email de confirmation vous a été envoyé. Cliquez sur le lien présent dans cet email pour activer votre
            compte.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            Pensez à vérifier vos{' '}
            <span className="font-semibold text-text">courriers indésirables</span> si le message n’apparaît pas dans
            votre boîte de réception.
          </p>

          <div className="mt-8">
            <Link
              to="/login"
              className="inline-flex w-full items-center justify-center rounded-xl bg-brand px-5 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              Retour à la connexion
            </Link>
          </div>

          <div className="mt-10 border-t border-border/80 pt-8">
            <p className="text-sm font-semibold text-text">Renvoyer l’email de confirmation</p>
            <p className="mt-1 text-xs text-text-muted">
              Saisissez l’adresse utilisée à l’inscription si le champ n’est pas prérempli.
            </p>
            <div className="mt-4">
              <ResendVerificationForm initialEmail={initialEmail} />
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  )
}
