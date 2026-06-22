import type { Menu } from '../types/menu'
import { MenuCard } from './MenuCard'

type MenusGridProps = {
  menus: Menu[]
}

export function MenusGrid({ menus }: MenusGridProps) {
  return (
    <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {menus.map((menu, index) => (
        <li key={menu.id} className="h-full">
          <MenuCard menu={menu} index={index} />
        </li>
      ))}
    </ul>
  )
}
