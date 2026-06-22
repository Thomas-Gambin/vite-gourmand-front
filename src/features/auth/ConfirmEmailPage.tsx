import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { verifyEmail } from './api/verifyEmail'
import { ResendVerificationForm } from './components/ResendVerificationForm'

type Phase = 'loading' | 'success' | 'missing' | 'error' | 'expired'

export function ConfirmEmailPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [phase, setPhase] = useState<Phase>('loading')
  const [errorDetail, setErrorDetail] = useState<string | null>(null)

  const token = searchParams.get('token')?.trim() ?? ''

  useEffect(() => {
    if (!token) {
      setPhase('missing')
      return
    }

    let active = true
    ;(async () => {
      try {
        await verifyEmail({ token })
        if (!active) return
        setPhase('success')
        window.setTimeout(() => navigate('/login', { replace: true }), 4000)
      } catch (error) {
        if (!active) return
        if (error instanceof Error) {
          try {
            const parsed = JSON.parse(error.message) as { code?: string; message?: string }
            if (parsed.code === 'TOKEN_EXPIRED') {
              setPhase('expired')
              setErrorDetail(parsed.message ?? 'Le lien a expiré.')
              return
            }
            setPhase('error')
            setErrorDetail(parsed.message ?? 'Lien invalide ou expiré.')
          } catch {
            setPhase('error')
            setErrorDetail('Une erreur est survenue.')
          }
        } else {
          setPhase('error')
          setErrorDetail('Une erreur est survenue.')
        }
      }
    })()

    return () => {
      active = false
    }
  }, [token, navigate])

  return (
    <main className="mx-auto w-full max-w-lg px-6 py-14 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-3xl border border-border/80 bg-surface-elevated p-8 shadow-sm"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Vite &amp; Gourmand</p>

        {phase === 'loading' ? (
          <>
            <h1 className="mt-4 text-xl font-semibold tracking-tight text-text">Vérification en cours…</h1>
            <p className="mt-3 text-sm text-text-muted">
              Nous confirmons votre adresse email, merci de patienter un instant.
            </p>
            <div className="mt-8 flex justify-center">
              <span
                className="h-10 w-10 animate-spin rounded-full border-2 border-brand/30 border-t-brand"
                aria-hidden
              />
            </div>
          </>
        ) : null}

        {phase === 'success' ? (
          <>
            <h1 className="mt-4 text-xl font-semibold tracking-tight text-text">Votre compte est confirmé</h1>
            <p className="mt-3 text-sm text-text-muted">
              Vous pouvez maintenant vous connecter. Redirection automatique vers la page de connexion…
            </p>
            <Link
              to="/login"
              className="mt-8 inline-flex w-full cursor-pointer items-center justify-center rounded-xl bg-brand px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              Se connecter
            </Link>
          </>
        ) : null}

        {phase === 'missing' ? (
          <>
            <h1 className="mt-4 text-xl font-semibold tracking-tight text-text">Lien incomplet</h1>
            <p className="mt-3 text-sm text-text-muted">
              Ce lien ne contient pas les informations nécessaires. Utilisez le lien reçu par email ou demandez un
              nouvel envoi.
            </p>
            <div className="mt-8">
              <ResendVerificationForm />
            </div>
            <Link
              to="/login"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-border px-5 py-3.5 text-sm font-semibold text-text transition hover:bg-surface-muted"
            >
              Retour à la connexion
            </Link>
          </>
        ) : null}

        {phase === 'expired' || phase === 'error' ? (
          <>
            <h1 className="mt-4 text-xl font-semibold tracking-tight text-text">
              {phase === 'expired' ? 'Lien expiré' : 'Confirmation impossible'}
            </h1>
            <p className="mt-3 text-sm text-text-muted">{errorDetail ?? 'Une erreur est survenue.'}</p>
            <p className="mt-4 text-sm text-text-muted">
              Vous pouvez demander un nouvel email de confirmation ci-dessous.
            </p>
            <div className="mt-6">
              <ResendVerificationForm />
            </div>
            <Link
              to="/register-success"
              className="mt-4 inline-block text-sm font-semibold text-brand underline-offset-4 hover:underline"
            >
              Page d’aide après inscription
            </Link>
            <Link
              to="/login"
              className="mt-6 block w-full rounded-xl border border-border py-3.5 text-center text-sm font-semibold text-text transition hover:bg-surface-muted"
            >
              Retour à la connexion
            </Link>
          </>
        ) : null}
      </motion.div>
    </main>
  )
}
