import { Link } from 'react-router-dom'
import { artworkUrl, capitalize, formatNumber } from '../utils/helpers'
import FavoriteButton from './FavoriteButton'

interface PokemonCardProps {
  name: string
  id: number | string
}

export default function PokemonCard({ name, id }: PokemonCardProps) {
  return (
    <article className="card">
      <div className="card__fav">
        <FavoriteButton name={name} />
      </div>
      <Link to={`/pokemon/${name}`} className="card__link">
        <img
          src={artworkUrl(id)}
          alt={capitalize(name)}
          loading="lazy"
          width={160}
          height={160}
        />
        <span className="card__number">{formatNumber(id)}</span>
        <h3 className="card__name">{capitalize(name)}</h3>
      </Link>
    </article>
  )
}
