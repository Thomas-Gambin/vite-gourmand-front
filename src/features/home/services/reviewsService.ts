import type { Review } from '../types/review'

const mockReviews: Review[] = [
  {
    id: 1,
    author: 'Client anonyme',
    rating: 5,
    comment: 'Une prestation soignée et un menu apprécié par tous nos invités.',
    isValidated: true,
  },
  {
    id: 2,
    author: 'Client anonyme',
    rating: 4,
    comment: 'Très bonne organisation et excellente qualité des plats.',
    isValidated: true,
  },
  {
    id: 3,
    author: 'Client anonyme',
    rating: 5,
    comment: 'Une équipe professionnelle et à l’écoute.',
    isValidated: true,
  },
  {
    id: 4,
    author: 'Client en attente',
    rating: 3,
    comment: 'Avis en cours de modération.',
    isValidated: false,
  },
]

export async function getValidatedReviews(): Promise<Review[]> {
  // TODO: remplacer par un appel API vers le back Symfony
  return mockReviews.filter((review) => review.isValidated !== false)
}
