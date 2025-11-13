// Gestión de tokens JWT en el cliente
export const TokenManager = {
  setToken: (token: string, expiresIn: number = 24 * 60 * 60 * 1000) => {
    const expiresAt = Date.now() + expiresIn
    localStorage.setItem("auth_token", token)
    localStorage.setItem("token_expires_at", expiresAt.toString())
  },

  getToken: (): string | null => {
    const token = localStorage.getItem("auth_token")
    const expiresAt = localStorage.getItem("token_expires_at")

    if (!token || !expiresAt) return null

    if (Date.now() > Number.parseInt(expiresAt)) {
      TokenManager.clearToken()
      return null
    }

    return token
  },

  clearToken: () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("token_expires_at")
    localStorage.removeItem("user")
  },

  isTokenValid: (): boolean => {
    return TokenManager.getToken() !== null
  },
}
