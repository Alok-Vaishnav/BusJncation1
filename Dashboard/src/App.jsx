import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginApp from './components/LoginApp';
import Dashboard from './pages/Dashboard';
import BusesList from './pages/BusesList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from sessionStorage
    const userLoggedIn = sessionStorage.getItem('isLoggedIn');
    const userData = sessionStorage.getItem('userData');
    if (userLoggedIn && userData) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('userData', JSON.stringify(user));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userData');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-900">
        <div className="text-center">
          <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18.35 10.04C18.67 10.13 19 10.02 19.12 9.77C19.3 9.45 19.47 9.12 19.6 8.77C19.81 8.32 19.6 7.81 19.16 7.63C18.76 7.46 18.3 7.59 18.15 7.99C18.05 8.23 17.93 8.46 17.77 8.67C17.6 8.88 17.77 9.2 18.11 9.28C18.23 9.31 18.29 9.35 18.35 10.04M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2M12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20M9 9.5C9.83 9.5 10.5 8.83 10.5 8C10.5 7.17 9.83 6.5 9 6.5C8.17 6.5 7.5 7.17 7.5 8C7.5 8.83 8.17 9.5 9 9.5M15 9.5C15.83 9.5 16.5 8.83 16.5 8C16.5 7.17 15.83 6.5 15 6.5C14.17 6.5 13.5 7.17 13.5 8C13.5 8.83 14.17 9.5 15 9.5M12 17.5C13.1 17.5 14.1 17.04 14.79 16.33C15.92 15.14 15.92 13.4 14.79 12.21C14.1 11.5 13.1 11 12 11C10.9 11 9.9 11.5 9.21 12.21C8.08 13.4 8.08 15.14 9.21 16.33C9.9 17.04 10.9 17.5 12 17.5Z" />
            </svg>
          </div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <LoginApp onLogin={handleLogin} />}
        />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard currentUser={currentUser} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/buses"
          element={
            isLoggedIn ? (
              <BusesList currentUser={currentUser} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/" element={<Navigate to={isLoggedIn ? '/dashboard' : '/login'} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
