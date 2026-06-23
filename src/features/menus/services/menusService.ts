import { getJson } from '../../../shared/api/client'
import type { Menu } from '../types/menu'
import type { MenuFilters } from '../types/menuFilters'
import { filterMenus } from '../utils/filterMenus'
import { type ApiMenu, mapApiMenuToMenu } from '../api/menuApi'

export async function getMenus(): Promise<Menu[]> {
  const data = await getJson<ApiMenu[]>('/menus', { skipAuth: true })
  return data.map(mapApiMenuToMenu)
}

export async function getMenuById(id: number): Promise<Menu | null> {
  try {
    const data = await getJson<ApiMenu>(`/menus/${id}`, { skipAuth: true })
    return mapApiMenuToMenu(data)
  } catch (error) {
    if (error instanceof Error) {
      try {
        const parsed = JSON.parse(error.message) as { code?: string }
        if (parsed.code === 'NOT_FOUND') {
          return null
        }
      } catch {
        // ignore parse error
      }
    }
    throw error
  }
}

export async function getFilteredMenus(filters: MenuFilters): Promise<Menu[]> {
  const menus = await getMenus()
  return filterMenus(menus, filters)
}
