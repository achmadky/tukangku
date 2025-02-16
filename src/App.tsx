import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TukangList from './pages/TukangList';
import TukangProfile from './pages/TukangProfile';
import Register from './pages/Register';
import { useAuth } from './contexts/AuthContext';

// Auth callback handler component
const AuthCallback = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // After successful authentication, redirect to home
    navigate('/', { replace: true });
  }, [navigate]);

  return null;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tukangs" element={<TukangList />} />
            <Route path="/tukang/:id" element={<TukangProfile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;