import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useFavorites } from '../context/FavoritesContext'

export default function FavoriteButton({ name }: { name: string }) {
  const { user } = useAuth()
  const { isFavorite, toggleFavorite } = useFavorites()
  const navigate = useNavigate()
  const location = useLocation()

  const active = isFavorite(name)

  const handleClick = () => {
    // Favoritar exige login: se não estiver logado, vai para a tela de login
    if (!user) {
      navigate('/login', { state: { from: location.pathname } })
      return
    }
    toggleFavorite(name)
  }

  return (
    <button
      className={`fav-btn ${active ? 'is-active' : ''}`}
      onClick={handleClick}
      aria-pressed={active}
      aria-label={active ? `Remover ${name} dos favoritos` : `Favoritar ${name}`}
      title={active ? 'Remover dos favoritos' : 'Favoritar'}
    >
      {active ? '★' : '☆'}
    </button>
  )
}
