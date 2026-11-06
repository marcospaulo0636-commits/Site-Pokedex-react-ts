import { Link, useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import FavoriteButton from '../components/FavoriteButton'
import Loading from '../components/Loading'
import StatBar from '../components/StatBar'
import TypeBadge from '../components/TypeBadge'
import { useFetch } from '../hooks/useFetch'
import { getPokemon } from '../services/api'
import type { PokemonDetails } from '../types/pokemon'
import { artworkUrl, capitalize, formatNumber } from '../utils/helpers'

export default function PokemonDetail() {
  const { name = '' } = useParams<{ name: string }>()

  const { data: pokemon, loading, error } = useFetch<PokemonDetails>(
    () => getPokemon(name),
    [name],
  )

  return (
    <div className="container section">
      <Link to="/pokedex" className="back-link">
        ← Voltar para a Pokédex
      </Link>

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {pokemon && (
        <article className="detail">
          <div className="detail__image">
            <img
              src={
                pokemon.sprites.other?.['official-artwork']?.front_default ??
                pokemon.sprites.front_default ??
                artworkUrl(pokemon.id)
              }
              alt={capitalize(pokemon.name)}
              width={280}
              height={280}
            />
          </div>

          <div className="detail__info">
            <div className="detail__title">
              <div>
                <span className="card__number">{formatNumber(pokemon.id)}</span>
                <h1>{capitalize(pokemon.name)}</h1>
              </div>
              <FavoriteButton name={pokemon.name} />
            </div>

            <div className="badges">
              {pokemon.types.map((t) => (
                <TypeBadge key={t.type.name} type={t.type.name} />
              ))}
            </div>

            <dl className="facts">
              <div>
                <dt>Altura</dt>
                <dd>{(pokemon.height / 10).toFixed(1)} m</dd>
              </div>
              <div>
                <dt>Peso</dt>
                <dd>{(pokemon.weight / 10).toFixed(1)} kg</dd>
              </div>
              <div>
                <dt>Habilidades</dt>
                <dd>{pokemon.abilities.map((a) => capitalize(a.ability.name)).join(', ')}</dd>
              </div>
            </dl>

            <h2>Status base</h2>
            {pokemon.stats.map((s) => (
              <StatBar key={s.stat.name} name={s.stat.name} value={s.base_stat} />
            ))}
          </div>
        </article>
      )}
    </div>
  )
}
