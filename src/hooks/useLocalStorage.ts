import { useEffect, useState } from 'react'

/** Hook customizado: useState que persiste o valor no localStorage. */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw !== null ? (JSON.parse(raw) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // localStorage indisponível (modo privado, por exemplo): ignora
    }
  }, [key, value])

  return [value, setValue] as const
}
