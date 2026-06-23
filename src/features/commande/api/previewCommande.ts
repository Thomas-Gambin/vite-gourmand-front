import { postJson } from '../../../shared/api/client'
import type { OrderPricePreview, PreviewCommandePayload } from '../types/commande'

export async function previewCommande(payload: PreviewCommandePayload): Promise<OrderPricePreview> {
  return postJson<OrderPricePreview, PreviewCommandePayload>('/commandes/preview', payload)
}
