import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const close = () => setOpen(false)

  const handleLogout = () => {
    logout()
    close()
    navigate('/')
  }

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" onClick={close}>
          <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
              alt=""
              width={32}
              height={32}
            />
          Pokédex
        </Link>

        <button
          className="navbar__toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label="Abrir menu"
          aria-expanded={open}
        >
          ☰
        </button>

        <nav className={`navbar__links ${open ? 'is-open' : ''}`}>
          <NavLink to="/" end onClick={close}>
            Home
          </NavLink>
          <NavLink to="/pokedex" onClick={close}>
            Pokédex
          </NavLink>
          <NavLink to="/favoritos" onClick={close}>
            Favoritos
          </NavLink>
          <NavLink to="/sobre" onClick={close}>
            Sobre
          </NavLink>
          <NavLink to="/contato" onClick={close}>
            Contato
          </NavLink>
          {user ? (
            <button className="btn btn--small btn--light" onClick={handleLogout}>
              Sair ({user.name.split(' ')[0]})
            </button>
          ) : (
            <NavLink to="/login" onClick={close}>
              Entrar
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  )
}
