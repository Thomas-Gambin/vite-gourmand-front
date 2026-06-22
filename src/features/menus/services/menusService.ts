import type { Allergen, Dish, Menu } from '../types/menu'
import type { MenuFilters } from '../types/menuFilters'
import { filterMenus } from '../utils/filterMenus'

const allergens = {
  gluten: { id: 1, name: 'Gluten' },
  lait: { id: 2, name: 'Lait' },
  oeufs: { id: 3, name: 'Œufs' },
  fruitsACoque: { id: 4, name: 'Fruits à coque' },
  soja: { id: 5, name: 'Soja' },
} satisfies Record<string, Allergen>

function createDishes(
  entries: [string, string?, Allergen[]?][],
  mains: [string, string?, Allergen[]?][],
  desserts: [string, string?, Allergen[]?][],
  idOffset: number,
): Dish[] {
  let id = idOffset
  const toDish = (
    type: Dish['type'],
    [name, description, dishAllergens]: [string, string?, Allergen[]?],
  ): Dish => ({
    id: id++,
    name,
    type,
    description,
    allergens: dishAllergens ?? [],
  })

  return [
    ...entries.map((entry) => toDish('Entrée', entry)),
    ...mains.map((entry) => toDish('Plat', entry)),
    ...desserts.map((entry) => toDish('Dessert', entry)),
  ]
}

const mockedMenus: Menu[] = [
  {
    id: 1,
    title: 'Menu classique',
    shortDescription:
      'Un menu complet et généreux adapté aux repas familiaux et événements simples.',
    fullDescription:
      'Notre menu classique réunit des recettes traditionnelles françaises, préparées avec des produits locaux et de saison. Idéal pour les repas de famille, les anniversaires ou les réceptions informelles, il offre un excellent rapport qualité-prix tout en garantissant une présentation soignée.',
    images: [],
    theme: 'Classique',
    diet: 'Classique',
    minimumPeople: 10,
    price: 25,
    stock: 15,
    conditions:
      'Commande minimum 10 personnes. Délai de commande : 72 h avant la date de livraison ou de retrait. Acompte de 30 % à la validation. Annulation gratuite jusqu’à 48 h avant la prestation.',
    dishes: createDishes(
      [
        ['Velouté de saison', 'Velouté onctueux aux légumes du marché', [allergens.lait]],
        ['Verrine fraîcheur', 'Verrine aux crudités et herbes fraîches'],
      ],
      [
        [
          'Poulet mijoté aux légumes',
          'Poulet fermier mijoté avec carottes, poireaux et pommes de terre',
          [allergens.gluten],
        ],
        ['Gratin de saison', 'Gratin de légumes du moment au fromage local', [allergens.lait, allergens.gluten]],
      ],
      [
        ['Tarte artisanale', 'Tarte du jour selon les arrivages', [allergens.gluten, allergens.lait, allergens.oeufs]],
        ['Mousse au chocolat', 'Mousse légère au chocolat noir', [allergens.oeufs, allergens.lait]],
      ],
      100,
    ),
  },
  {
    id: 2,
    title: 'Menu de Noël',
    shortDescription:
      'Une sélection festive de plats de saison pour vos repas de fin d’année.',
    fullDescription:
      'Célébrez les fêtes de fin d’année avec notre menu de Noël, composé de spécialités gourmandes et réconfortantes. Foie gras, volaille rôtie et desserts festifs : chaque plat est pensé pour créer une ambiance chaleureuse autour de votre table.',
    images: [],
    theme: 'Noël',
    diet: 'Classique',
    minimumPeople: 12,
    price: 35,
    stock: 0,
    conditions:
      'Commande minimum 12 personnes. Réservation obligatoire avant le 15 décembre. Délai de commande : 5 jours ouvrés. Acompte de 40 % à la validation. Les menus de fête ne sont pas remboursables en cas d’annulation tardive.',
    dishes: createDishes(
      [
        ['Foie gras mi-cuit', 'Foie gras de canard, chutney de figues', []],
        ['Velouté de châtaignes', 'Velouté crémeux aux châtaignes', [allergens.lait]],
      ],
      [
        [
          'Dinde rôtie aux marrons',
          'Dinde fermière rôtie, farce aux marrons et jus au porto',
          [allergens.gluten, allergens.oeufs],
        ],
        ['Filet de bœuf sauce morilles', 'Filet de bœuf, sauce aux morilles', [allergens.lait]],
      ],
      [
        ['Bûche traditionnelle', 'Bûche au chocolat et crème pralinée', [allergens.gluten, allergens.lait, allergens.oeufs, allergens.fruitsACoque]],
        ['Marrons glacés', 'Marrons glacés artisanaux', []],
      ],
      200,
    ),
  },
  {
    id: 3,
    title: 'Menu végétarien',
    shortDescription: 'Un menu équilibré et gourmand composé de plats sans viande.',
    fullDescription:
      'Notre menu végétarien met à l’honneur les légumes de saison, les céréales complètes et les fromages locaux. Chaque plat est élaboré pour offrir un équilibre nutritionnel et des saveurs variées, sans compromis sur le plaisir gustatif.',
    images: [],
    theme: 'Événement',
    diet: 'Végétarien',
    minimumPeople: 8,
    price: 28,
    stock: 10,
    conditions:
      'Commande minimum 8 personnes. Délai de commande : 72 h avant la prestation. Précisez toute allergie ou intolérance lors de la commande. Acompte de 30 % à la validation.',
    dishes: createDishes(
      [
        ['Salade de lentilles', 'Lentilles du Périgord, légumes croquants', []],
        ['Tarte fine aux légumes', 'Tarte fine aux légumes grillés', [allergens.gluten, allergens.lait]],
      ],
      [
        ['Gratin de courgettes', 'Gratin de courgettes et tomates au chèvre', [allergens.lait]],
        ['Risotto aux champignons', 'Risotto crémeux aux cèpes et girolles', [allergens.lait]],
      ],
      [
        ['Tarte aux fruits', 'Tarte aux fruits de saison', [allergens.gluten, allergens.lait, allergens.oeufs]],
        ['Crème dessert vanille', 'Crème onctueuse à la vanille bourbon', [allergens.lait, allergens.oeufs]],
      ],
      300,
    ),
  },
  {
    id: 4,
    title: 'Menu de Pâques',
    shortDescription:
      'Des saveurs printanières pour célébrer Pâques en famille ou entre amis.',
    fullDescription:
      'Le menu de Pâques célèbre le retour du printemps avec des produits frais et légers. Agneau, légumes primeurs et desserts aux notes florales composent une carte harmonieuse, parfaite pour un déjeuner de fête ensoleillé.',
    images: [],
    theme: 'Pâques',
    diet: 'Classique',
    minimumPeople: 10,
    price: 30,
    stock: 8,
    conditions:
      'Commande minimum 10 personnes. Délai de commande : 72 h avant la date souhaitée. Livraison ou retrait sur rendez-vous. Acompte de 30 % à la validation.',
    dishes: createDishes(
      [
        ['Œufs mimosa', 'Œufs mimosa aux herbes fraîches', [allergens.oeufs]],
        ['Asperges sauce hollandaise', 'Asperges vertes, sauce hollandaise maison', [allergens.oeufs, allergens.lait]],
      ],
      [
        ['Gigot d’agneau rôti', 'Gigot d’agneau du Périgord, jus au thym', []],
        ['Légumes primeurs rôtis', 'Carottes nouvelles, petits pois et navets rôtis', []],
      ],
      [
        ['Nid de Pâques chocolat', 'Mousse chocolat en forme de nid', [allergens.lait, allergens.oeufs]],
        ['Tarte au citron meringuée', 'Tarte citron jaune, meringue italienne', [allergens.gluten, allergens.lait, allergens.oeufs]],
      ],
      400,
    ),
  },
  {
    id: 5,
    title: 'Menu végan',
    shortDescription:
      'Une carte 100 % végétale, créative et savoureuse pour tous vos événements.',
    fullDescription:
      'Notre menu végan propose une cuisine 100 % végétale, sans produits d’origine animale. Des entrées colorées aux desserts gourmands, chaque recette est conçue pour surprendre et satisfaire tous les convives, véganes ou non.',
    images: [],
    theme: 'Événement',
    diet: 'Végan',
    minimumPeople: 8,
    price: 32,
    stock: 6,
    conditions:
      'Commande minimum 8 personnes. Délai de commande : 72 h avant la prestation. Tous les plats sont préparés dans un espace dédié aux recettes végétales. Acompte de 30 % à la validation.',
    dishes: createDishes(
      [
        ['Velouté de potimarron', 'Velouté de potimarron au lait de coco', []],
        ['Salade de quinoa', 'Quinoa, avocat, grenade et vinaigrette citronnée', []],
      ],
      [
        ['Curry de légumes', 'Curry doux aux légumes de saison et riz basmati', []],
        ['Tajine de pois chiches', 'Tajine aux pois chiches, abricots et épices', [allergens.soja]],
      ],
      [
        ['Brownie au chocolat végan', 'Brownie fondant au chocolat noir', [allergens.gluten, allergens.fruitsACoque]],
        ['Compote de fruits rouges', 'Compote maison aux fruits rouges de saison', []],
      ],
      500,
    ),
  },
]

export async function getMenus(): Promise<Menu[]> {
  // TODO: remplacer par un appel API vers le back Symfony
  // const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/menus`)
  // if (!response.ok) throw new Error('Impossible de charger les menus')
  // return response.json()
  return mockedMenus
}

export async function getMenuById(id: number): Promise<Menu | null> {
  // TODO: remplacer par un appel API vers le back Symfony
  // const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/menus/${id}`)
  // if (response.status === 404) return null
  // if (!response.ok) throw new Error('Impossible de charger le menu')
  // return response.json()
  const menus = await getMenus()
  return menus.find((menu) => menu.id === id) ?? null
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
