export type OrderStatus =
  | 'en_attente'
  | 'accepte'
  | 'en_preparation'
  | 'en_cours_de_livraison'
  | 'livre'
  | 'en_attente_retour_materiel'
  | 'terminee'
  | 'annulee'

export type UserOrderListItem = {
  id: number
  numeroCommande: string
  menuId: number
  menuTitre: string
  datePrestation: string
  heureLivraison: string
  adressePrestation: string
  villePrestation: string
  codePostalPrestation: string | null
  nombrePersonne: number
  prixMenu: string
  prixLivraison: string
  remise: string
  total: string
  statut: OrderStatus
  dateCommande: string
  canEdit: boolean
  canCancel: boolean
  canTrack: boolean
  canReview: boolean
}

export type UserOrderDetail = {
  id: number
  numeroCommande: string
  statut: OrderStatus
  dateCommande: string
  datePrestation: string
  heureLivraison: string
  nombrePersonne: number
  adressePrestation: string
  villePrestation: string
  codePostalPrestation: string | null
  pretMateriel: boolean
  prixMenu: string
  prixLivraison: string
  remise: string
  total: string
  client: {
    prenom: string
    nom: string
    email: string
    telephone: string
  }
  menu: {
    id: number
    titre: string
  }
  historique: Array<{
    statut: OrderStatus
    dateModification: string
  }>
  canEdit: boolean
  canCancel: boolean
  canTrack: boolean
  canReview: boolean
}

export type OrderTracking = {
  id: number
  numeroCommande: string
  statutActuel: OrderStatus
  etapes: Array<{
    statut: OrderStatus
    dateModification: string
    heureModification: string
  }>
}

export type AvailableReview = {
  commandeId: number
  numeroCommande: string
  menuTitre: string
  datePrestation: string
}

export type UpdateProfilePayload = {
  nom: string
  prenom: string
  telephone: string
  adressePostale: string
  ville: string
  pays: string
}

export type UpdateOrderPayload = {
  adressePrestation: string
  villePrestation: string
  codePostalPrestation?: string | null
  datePrestation: string
  heureLivraison: string
  nombrePersonne: number
  pretMateriel: boolean
}

export type CreateReviewPayload = {
  note: number
  commentaire: string
}

export type DashboardTab = 'profil' | 'commandes' | 'suivi' | 'avis'
