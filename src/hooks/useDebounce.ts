import { useEffect, useState } from 'react'

/** Hook customizado: atrasa a atualização de um valor (útil em buscas). */
export function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState<T>(value)

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])

  return debounced
}
