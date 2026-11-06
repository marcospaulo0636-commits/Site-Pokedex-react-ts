import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface FavoritesContextValue {
  favorites: string[]
  isFavorite: (name: string) => boolean
  toggleFavorite: (name: string) => void
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useLocalStorage<string[]>('pokedex:favorites', [])

  const isFavorite = useCallback((name: string) => favorites.includes(name), [favorites])

  const toggleFavorite = useCallback(
    (name: string) =>
      setFavorites((prev) =>
        prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
      ),
    [setFavorites],
  )

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite }),
    [favorites, isFavorite, toggleFavorite],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites deve ser usado dentro de <FavoritesProvider>.')
  return ctx
}
