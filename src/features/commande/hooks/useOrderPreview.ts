import { useEffect, useState } from 'react'
import { previewCommande } from '../api/previewCommande'
import type { OrderPricePreview } from '../types/commande'

type UseOrderPreviewParams = {
  menuId: number | null
  adressePrestation: string
  villePrestation: string
  codePostalPrestation: string
  nombrePersonne: number | null
  enabled?: boolean
}

export function useOrderPreview({
  menuId,
  adressePrestation,
  villePrestation,
  codePostalPrestation,
  nombrePersonne,
  enabled = true,
}: UseOrderPreviewParams) {
  const [preview, setPreview] = useState<OrderPricePreview | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled || menuId === null || nombrePersonne === null || nombrePersonne <= 0) {
      setPreview(null)
      setError(null)
      return
    }

    const trimmedAddress = adressePrestation.trim()
    const trimmedCity = villePrestation.trim()
    if (!trimmedAddress || !trimmedCity) {
      setPreview(null)
      setError(null)
      return
    }

    const timeoutId = window.setTimeout(() => {
      setIsLoading(true)
      setError(null)

      const trimmedPostalCode = codePostalPrestation.trim()

      void previewCommande({
        menuId,
        adressePrestation: trimmedAddress,
        villePrestation: trimmedCity,
        codePostalPrestation: trimmedPostalCode || undefined,
        nombrePersonne,
      })
        .then((data) => {
          setPreview(data)
        })
        .catch((err: unknown) => {
          setPreview(null)
          if (err instanceof Error) {
            try {
              const parsed = JSON.parse(err.message) as { message?: string }
              setError(parsed.message ?? 'Impossible de calculer le prix.')
            } catch {
              setError('Impossible de calculer le prix.')
            }
          } else {
            setError('Impossible de calculer le prix.')
          }
        })
        .finally(() => {
          setIsLoading(false)
        })
    }, 300)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [enabled, menuId, adressePrestation, villePrestation, codePostalPrestation, nombrePersonne])

  return { preview, isLoading, error }
}
