import { Link } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import PokemonCard from '../components/PokemonCard'
import { useFavorites } from '../context/FavoritesContext'
import { useFetch } from '../hooks/useFetch'
import { getPokemon } from '../services/api'
import type { PokemonDetails } from '../types/pokemon'

export default function Favorites() {
  const { favorites } = useFavorites()

  // busca os dados de cada favorito (o efeito roda de novo quando a lista muda)
  const { data, loading, error } = useFetch<PokemonDetails[]>(
    () => Promise.all(favorites.map((name) => getPokemon(name))),
    [favorites],
  )

  return (
    <div className="container section">
      <h1>Meus favoritos</h1>

      {favorites.length === 0 ? (
        <p className="empty">
          Você ainda não favoritou nenhum Pokémon.{' '}
          <Link to="/pokedex">Explore a Pokédex</Link> e clique na estrela ☆.
        </p>
      ) : (
        <>
          {loading && <Loading />}
          {error && <ErrorMessage message={error} />}
          {data && (
            <div className="grid">
              {data.map((p) => (
                <PokemonCard key={p.id} id={p.id} name={p.name} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
