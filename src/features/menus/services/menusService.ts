import type { Menu } from '../types/menu'
import type { MenuFilters } from '../types/menuFilters'
import { filterMenus } from '../utils/filterMenus'

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
  {
    id: 4,
    title: 'Menu de Pâques',
    shortDescription:
      'Des saveurs printanières pour célébrer Pâques en famille ou entre amis.',
    price: 30,
    minimumPeople: 10,
    theme: 'Pâques',
    diet: 'Classique',
  },
  {
    id: 5,
    title: 'Menu végan',
    shortDescription:
      'Une carte 100 % végétale, créative et savoureuse pour tous vos événements.',
    price: 32,
    minimumPeople: 8,
    theme: 'Événement',
    diet: 'Végan',
  },
]

export async function getMenus(): Promise<Menu[]> {
  // TODO: remplacer par un appel API vers le back Symfony
  // const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/menus`)
  // if (!response.ok) throw new Error('Impossible de charger les menus')
  // return response.json()
  return mockedMenus
}

export async function getFilteredMenus(filters: MenuFilters): Promise<Menu[]> {
  // TODO: remplacer par un appel API vers le back Symfony
  // import { menuFiltersToQueryParams } from '../utils/menuFiltersToQueryParams'
  // const params = menuFiltersToQueryParams(filters)
  // const query = params.toString()
  // const url = query
  //   ? `${import.meta.env.VITE_API_BASE_URL}/menus?${query}`
  //   : `${import.meta.env.VITE_API_BASE_URL}/menus`
  // const response = await fetch(url)
  // if (!response.ok) throw new Error('Impossible de charger les menus')
  // return response.json()

  const menus = await getMenus()
  return filterMenus(menus, filters)
}
