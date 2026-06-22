import { Route, Routes } from 'react-router-dom'
import { CgvPage } from './features/cgv/CgvPage'
import { ContactPage } from './features/contact/ContactPage'
import { HomePage } from './features/home/HomePage'
import { LoginPage } from './features/login/LoginPage'
import { MentionsLegalesPage } from './features/mentions-legales/MentionsLegalesPage'
import { MenusPage } from './features/menus/MenusPage'
import { MainLayout } from './shared/components/layout'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="menus" element={<MenusPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="mentions-legales" element={<MentionsLegalesPage />} />
        <Route path="cgv" element={<CgvPage />} />
      </Route>
    </Routes>
  )
}
