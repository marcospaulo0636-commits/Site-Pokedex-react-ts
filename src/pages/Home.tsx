import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import PokemonCard from '../components/PokemonCard'
import { useFetch } from '../hooks/useFetch'
import { getPokemon, MAX_POKEMON_ID } from '../services/api'
import type { PokemonDetails } from '../types/pokemon'

function randomIds(count: number): number[] {
  const ids = new Set<number>()
  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * MAX_POKEMON_ID) + 1)
  }
  return [...ids]
}

export default function Home() {
  // sorteia 4 Pokémon uma única vez por visita à página
  const featuredIds = useMemo(() => randomIds(4), [])

  const { data, loading, error } = useFetch<PokemonDetails[]>(
    () => Promise.all(featuredIds.map((id) => getPokemon(id))),
    [featuredIds],
  )

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Bem-vindo à Pokédex</h1>
          <p>
            Pesquise entre mais de mil Pokémon, veja status, tipos e habilidades e salve seus
            favoritos.
          </p>
          <Link to="/pokedex" className="btn btn--light">
            Explorar a Pokédex
          </Link>
        </div>
      </section>

      <section className="container section">
        <h2>Pokémon em destaque</h2>
        <p className="muted">Sorteados a cada visita. Recarregue a página para ver outros!</p>

        {loading && <Loading />}
        {error && <ErrorMessage message={error} />}
        {data && (
          <div className="grid">
            {data.map((p) => (
              <PokemonCard key={p.id} id={p.id} name={p.name} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
