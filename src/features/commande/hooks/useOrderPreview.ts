import { useEffect, useState } from 'react'
import { previewCommande } from '../api/previewCommande'
import type { OrderPricePreview } from '../types/commande'

type UseOrderPreviewParams = {
  menuId: number | null
  villePrestation: string
  nombrePersonne: number | null
  enabled?: boolean
}

export function useOrderPreview({
  menuId,
  villePrestation,
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

    const trimmedCity = villePrestation.trim()
    if (!trimmedCity) {
      setPreview(null)
      return
    }

    const timeoutId = window.setTimeout(() => {
      setIsLoading(true)
      setError(null)

      void previewCommande({
        menuId,
        villePrestation: trimmedCity,
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
  }, [enabled, menuId, villePrestation, nombrePersonne])

  return { preview, isLoading, error }
}
