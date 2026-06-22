export type OpeningHour = {
  day: string
  hours: string
  isClosed?: boolean
}

export const OPENING_HOURS: OpeningHour[] = [
  { day: 'Lundi', hours: '09h00 - 18h00' },
  { day: 'Mardi', hours: '09h00 - 18h00' },
  { day: 'Mercredi', hours: '09h00 - 18h00' },
  { day: 'Jeudi', hours: '09h00 - 18h00' },
  { day: 'Vendredi', hours: '09h00 - 18h00' },
  { day: 'Samedi', hours: '09h00 - 13h00' },
  { day: 'Dimanche', hours: 'Fermé', isClosed: true },
]
