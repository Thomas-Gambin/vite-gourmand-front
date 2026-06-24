export function hasEmployeeAccess(roles: string[] | undefined): boolean {
  if (!roles?.length) return false
  return roles.includes('ROLE_EMPLOYEE') || roles.includes('ROLE_ADMIN')
}

export function getEmployeeDashboardUrl(): string {
  const apiBase = import.meta.env.VITE_API_BASE_URL as string | undefined
  if (!apiBase) return '/admin'
  return `${apiBase.replace(/\/api\/?$/, '')}/admin`
}
