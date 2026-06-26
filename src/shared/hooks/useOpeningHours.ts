import { useEffect, useState } from 'react'
import { getOpeningHours } from '../api/openingHoursApi'
import { DEFAULT_OPENING_HOURS } from '../config/openingHours'
import type { OpeningHour } from '../types/openingHours'

export function useOpeningHours(): OpeningHour[] {
  const [hours, setHours] = useState<OpeningHour[]>(DEFAULT_OPENING_HOURS)

  useEffect(() => {
    let isMounted = true

    getOpeningHours()
      .then((data) => {
        if (isMounted && data.length > 0) {
          setHours(data)
        }
      })
      .catch(() => {
        // Conserve les horaires par défaut en cas d'erreur réseau.
      })

    return () => {
      isMounted = false
    }
  }, [])

  return hours
}

export function getTodayOpeningHour(hours: OpeningHour[]): OpeningHour {
  const dayIndex = new Date().getDay()
  const normalizedIndex = dayIndex === 0 ? 6 : dayIndex - 1

  return hours[normalizedIndex] ?? hours[0]
}
