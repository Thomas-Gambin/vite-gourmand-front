import { Route, Routes } from 'react-router-dom'
import { ConfirmEmailPage } from './features/auth/ConfirmEmailPage'
import { ForgotPasswordPage } from './features/auth/ForgotPasswordPage'
import { RegisterPage } from './features/auth/RegisterPage'
import { RegisterSuccessPage } from './features/auth/RegisterSuccessPage'
import { ResetPasswordPage } from './features/auth/ResetPasswordPage'
import { CgvPage } from './features/cgv/CgvPage'
import { ContactPage } from './features/contact/ContactPage'
import { HomePage } from './features/home/HomePage'
import { LoginPage } from './features/login/LoginPage'
import { MentionsLegalesPage } from './features/mentions-legales/MentionsLegalesPage'
import { PolitiqueConfidentialitePage } from './features/politique-confidentialite/PolitiqueConfidentialitePage'
import { ProfilePage } from './features/profile/ProfilePage'
import { MenusPage } from './features/menus/MenusPage'
import { MenuDetailPage } from './features/menus/MenuDetailPage'
import { CommandePage } from './features/commande/CommandePage'
import { MainLayout } from './shared/components/layout'
import { ProtectedRoute } from './shared/components/auth/ProtectedRoute'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="menus" element={<MenusPage />} />
        <Route path="menus/:id" element={<MenuDetailPage />} />
        <Route
          path="commande/:menuId"
          element={
            <ProtectedRoute>
              <CommandePage />
            </ProtectedRoute>
          }
        />
        <Route path="contact" element={<ContactPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route path="profil" element={<ProfilePage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="register-success" element={<RegisterSuccessPage />} />
        <Route path="confirm-email" element={<ConfirmEmailPage />} />
        <Route path="mentions-legales" element={<MentionsLegalesPage />} />
        <Route path="cgv" element={<CgvPage />} />
        <Route path="politique-confidentialite" element={<PolitiqueConfidentialitePage />} />
      </Route>
    </Routes>
  )
}
