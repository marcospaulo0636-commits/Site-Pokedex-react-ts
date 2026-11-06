import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import About from './pages/About'
import Contact from './pages/Contact'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import PokemonDetail from './pages/PokemonDetail'
import Pokedex from './pages/Pokedex'

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
          <Route
            path="/favoritos"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/sobre" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}
