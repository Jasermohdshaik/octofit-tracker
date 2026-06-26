import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const tabs = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const apiBaseUrl = codespaceName
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`
    : 'http://localhost:8000/api';

  return (
    <div className="container py-4 py-md-5">
      <header className="mb-4">
        <h1 className="display-6 fw-semibold mb-2">OctoFit Tracker</h1>
        <p className="text-secondary mb-3">
          React 19 presentation tier with Codespaces-aware API routing.
        </p>
        <div className="alert alert-info" role="alert">
          API base URL: <strong>{apiBaseUrl}</strong>
        </div>
      </header>

      <nav className="mb-4">
        <ul className="nav nav-pills gap-2">
          {tabs.map((tab) => (
            <li key={tab.to} className="nav-item">
              <NavLink
                to={tab.to}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : 'text-dark bg-light border'}`
                }
              >
                {tab.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
