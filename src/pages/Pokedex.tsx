import { useEffect, useMemo, useState } from 'react'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import Pagination from '../components/Pagination'
import PokemonCard from '../components/PokemonCard'
import SearchBar from '../components/SearchBar'
import TypeFilter from '../components/TypeFilter'
import { useDebounce } from '../hooks/useDebounce'
import { useFetch } from '../hooks/useFetch'
import { getAllPokemon, getPokemonByType } from '../services/api'
import type { PokemonListItem } from '../types/pokemon'
import { getIdFromUrl } from '../utils/helpers'

const PAGE_SIZE = 24

export default function Pokedex() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('')
  const [page, setPage] = useState(1)
  const [attempt, setAttempt] = useState(0)

  const debouncedSearch = useDebounce(search, 300)

  const { data, loading, error } = useFetch<PokemonListItem[]>(
    () => (type ? getPokemonByType(type) : getAllPokemon()),
    [type, attempt],
  )

  // aplica a busca sobre a lista carregada (recalcula só quando algo muda)
  const filtered = useMemo(() => {
    if (!data) return []
    const term = debouncedSearch.trim().toLowerCase()
    if (!term) return data
    return data.filter((p) => p.name.includes(term) || getIdFromUrl(p.url) === term)
  }, [data, debouncedSearch])

  // volta para a página 1 quando a busca ou o filtro mudam
  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, type])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))

  const visible = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page],
  )

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="container section">
      <h1>Pokédex</h1>

      <div className="toolbar">
        <SearchBar value={search} onChange={setSearch} />
        <TypeFilter value={type} onChange={setType} />
      </div>

      {loading && <Loading text="Buscando Pokémon..." />}
      {error && <ErrorMessage message={error} onRetry={() => setAttempt((a) => a + 1)} />}

      {!loading && !error && (
        <>
          <p className="muted">
            {filtered.length} Pokémon encontrado{filtered.length === 1 ? '' : 's'}
          </p>

          {visible.length === 0 ? (
            <p className="empty">Nenhum Pokémon encontrado. Tente outra busca.</p>
          ) : (
            <div className="grid">
              {visible.map((p) => (
                <PokemonCard key={p.name} name={p.name} id={getIdFromUrl(p.url)} />
              ))}
            </div>
          )}

          <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} />
        </>
      )}
    </div>
  )
}
