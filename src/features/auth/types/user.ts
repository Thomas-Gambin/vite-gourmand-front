export type AuthUser = {
  id: number
  email: string
  nom: string
  prenom: string
  telephone: string
  adressePostale: string
  ville: string
  pays: string
  roles: string[]
  isVerified: boolean
}
