import type { Menu } from '../types/menu'

const mockedMenus: Menu[] = [
  {
    id: 1,
    title: 'Menu classique',
    shortDescription:
      'Un menu complet et généreux adapté aux repas familiaux et événements simples.',
    price: 25,
    minimumPeople: 10,
    theme: 'Classique',
    diet: 'Classique',
  },
  {
    id: 2,
    title: 'Menu de Noël',
    shortDescription:
      'Une sélection festive de plats de saison pour vos repas de fin d’année.',
    price: 35,
    minimumPeople: 12,
    theme: 'Noël',
    diet: 'Classique',
  },
  {
    id: 3,
    title: 'Menu végétarien',
    shortDescription: 'Un menu équilibré et gourmand composé de plats sans viande.',
    price: 28,
    minimumPeople: 8,
    theme: 'Événement',
    diet: 'Végétarien',
  },
]

export async function getMenus(): Promise<Menu[]> {
  // TODO: remplacer par un appel API vers le back Symfony
  // const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/menus`)
  // if (!response.ok) throw new Error('Impossible de charger les menus')
  // return response.json()
  return mockedMenus
}
