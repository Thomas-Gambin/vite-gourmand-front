import { postJson } from '../../../shared/api/client'
import type { CreateCommandePayload, CreateCommandeResponse } from '../types/commande'

export async function createCommande(payload: CreateCommandePayload): Promise<CreateCommandeResponse> {
  return postJson<CreateCommandeResponse, CreateCommandePayload>('/commandes', payload)
}
