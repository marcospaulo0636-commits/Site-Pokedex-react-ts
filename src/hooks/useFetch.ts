import { useEffect, useState } from 'react'

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

/**
 * Hook customizado: executa uma função assíncrona sempre que as
 * dependências mudarem e devolve { data, loading, error }.
 */
export function useFetch<T>(fetcher: () => Promise<T>, deps: unknown[]): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false
    setState((prev) => ({ ...prev, loading: true, error: null }))

    fetcher()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null })
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({
            data: null,
            loading: false,
            error: err instanceof Error ? err.message : 'Erro desconhecido.',
          })
        }
      })

    // evita atualizar estado de um componente que já foi desmontado
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return state
}
