import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { User } from '../types/pokemon'

interface AuthContextValue {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<User | null>('pokedex:user', null)

  const login = useCallback((u: User) => setUser(u), [setUser])
  const logout = useCallback(() => setUser(null), [setUser])

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>.')
  return ctx
}
