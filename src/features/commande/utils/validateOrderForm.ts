import type { Menu } from '../../menus/types/menu'
import type { OrderFormData, OrderFormErrors } from '../types/commande'

export function validateOrderForm(formData: OrderFormData, menu: Menu): OrderFormErrors {
  const errors: OrderFormErrors = {}

  if (!formData.adressePrestation.trim()) {
    errors.adressePrestation = "L'adresse de prestation est obligatoire."
  }

  if (!formData.villePrestation.trim()) {
    errors.villePrestation = 'La ville de prestation est obligatoire.'
  }

  if (!formData.datePrestation) {
    errors.datePrestation = 'La date de prestation est obligatoire.'
  } else {
    const selected = new Date(`${formData.datePrestation}T00:00:00`)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (selected < today) {
      errors.datePrestation = 'La date de prestation ne peut pas être dans le passé.'
    }
  }

  if (!formData.heureLivraison) {
    errors.heureLivraison = "L'heure de livraison est obligatoire."
  }

  const nombrePersonne = Number.parseInt(formData.nombrePersonne, 10)
  if (!formData.nombrePersonne) {
    errors.nombrePersonne = 'Le nombre de personnes est obligatoire.'
  } else if (Number.isNaN(nombrePersonne) || nombrePersonne <= 0) {
    errors.nombrePersonne = 'Le nombre de personnes doit être strictement positif.'
  } else if (nombrePersonne < menu.minimumPeople) {
    errors.nombrePersonne = `Le nombre de personnes doit être au minimum de ${menu.minimumPeople}.`
  }

  if (menu.stock <= 0) {
    errors.form = 'Ce menu n’est plus disponible (stock épuisé).'
  }

  return errors
}
