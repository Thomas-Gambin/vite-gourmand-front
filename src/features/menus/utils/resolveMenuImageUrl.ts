export function resolveMenuImageUrl(path: string | undefined | null): string | null {
  if (!path?.trim()) {
    return null
  }

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  const apiBase = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/api\/?$/, '')
  if (!apiBase) {
    return path.startsWith('/') ? path : `/${path}`
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  return `${apiBase}${normalizedPath}`
}
