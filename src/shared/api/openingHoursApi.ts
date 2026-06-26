import { getJson } from '../api/client'
import type { OpeningHour } from '../types/openingHours'

type ApiOpeningHour = {
  day: string
  hours: string
  isClosed: boolean
}

export async function getOpeningHours(): Promise<OpeningHour[]> {
  const data = await getJson<ApiOpeningHour[]>('/horaires', { skipAuth: true })

  return data.map((entry) => ({
    day: entry.day,
    hours: entry.hours,
    isClosed: entry.isClosed,
  }))
}
