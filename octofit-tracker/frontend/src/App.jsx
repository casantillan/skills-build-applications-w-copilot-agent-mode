import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/leaderboard">OCTOFIT<span>TRACKER</span></NavLink>
        <nav className="main-nav" aria-label="Secciones principales">
          <NavLink to="/leaderboard">Ranking</NavLink>
          <NavLink to="/activities">Actividades</NavLink>
          <NavLink to="/workouts">Entrenamientos</NavLink>
          <NavLink to="/teams">Equipos</NavLink>
          <NavLink to="/users">Atletas</NavLink>
        </nav>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Leaderboard />} />
        </Routes>
      </main>
      <footer className="app-footer">MOVIMIENTO DIARIO / PROGRESO COMPARTIDO</footer>
    </div>
  )
}

export default App
