export type CreateCommandePayload = {
  menuId: number
  adressePrestation: string
  villePrestation: string
  codePostalPrestation?: string
  datePrestation: string
  heureLivraison: string
  nombrePersonne: number
  pretMateriel?: boolean
}

export type PreviewCommandePayload = {
  menuId: number
  adressePrestation: string
  villePrestation: string
  codePostalPrestation?: string
  nombrePersonne: number
}

export type OrderPricePreview = {
  prixParPersonne: string
  nombrePersonne: number
  nombrePersonneMinimum: number
  sousTotal: string
  remise: string
  prixMenu: string
  prixLivraison: string
  total: string
  reductionApplied: boolean
  villePrestation: string
  distanceLivraisonKm: string | null
}

export type CreatedCommande = {
  id: number
  numeroCommande: string
  statut: string
  prixMenu: string
  prixLivraison: string
  remise: string
  total: string
  datePrestation: string
  heureLivraison: string
}

export type CreateCommandeResponse = {
  message: string
  commande: CreatedCommande
}

export type OrderFormData = {
  adressePrestation: string
  villePrestation: string
  codePostalPrestation: string
  datePrestation: string
  heureLivraison: string
  nombrePersonne: string
  pretMateriel: boolean
}

export type OrderFormErrors = Partial<Record<keyof OrderFormData | 'form', string>>
