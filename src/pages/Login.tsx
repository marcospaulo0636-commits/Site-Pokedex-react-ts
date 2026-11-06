import { useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface LocationState {
  from?: string
}

export default function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as LocationState | null)?.from ?? '/pokedex'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  if (user) {
    return <Navigate to={from} replace />
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (name.trim().length < 2) {
      setError('Informe seu nome (mínimo 2 letras).')
      return
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Informe um e-mail válido.')
      return
    }

    // Login simulado: guarda o usuário no localStorage (sem servidor)
    login({ name: name.trim(), email: email.trim() })
    navigate(from, { replace: true })
  }

  return (
    <div className="container section">
      <form className="form" onSubmit={handleSubmit} noValidate>
        <h1>Entrar</h1>
        <p className="muted">Entre para favoritar seus Pokémon.</p>

        <label htmlFor="login-name">Nome</label>
        <input
          id="login-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ash Ketchum"
        />

        <label htmlFor="login-email">E-mail</label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ash@pallet.town"
        />

        {error && (
          <p className="form__error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="btn">
          Entrar
        </button>
      </form>
    </div>
  )
}
