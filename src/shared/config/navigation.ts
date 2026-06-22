import type { LucideIcon } from 'lucide-react'
import { FileText, Home, LogIn, Mail, Scale, UtensilsCrossed } from 'lucide-react'

export type NavItem = {
  label: string
  to: string
  icon: LucideIcon
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Accueil', to: '/', icon: Home },
  { label: 'Menus', to: '/menus', icon: UtensilsCrossed },
  { label: 'Contact', to: '/contact', icon: Mail },
  { label: 'Connexion', to: '/login', icon: LogIn },
]

export type LegalLink = {
  label: string
  to: string
  icon: LucideIcon
}

export const LEGAL_LINKS: LegalLink[] = [
  { label: 'Mentions légales', to: '/mentions-legales', icon: Scale },
  { label: 'CGV', to: '/cgv', icon: FileText },
]
