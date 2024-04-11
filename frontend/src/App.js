import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Groups from './pages/Groups';
import Marketplace from './pages/Marketplace';
import Postings from './pages/Postings';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Account from './pages/Account';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const storedUserId = localStorage.getItem('userId');
    const storedEmail = localStorage.getItem('email');
    if (storedUserId && storedEmail) {
      setIsAuthenticated(true);
      setUserId(storedUserId);
      setEmail(storedEmail);
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    // Clear authentication state and localStorage
    setIsAuthenticated(false);
    setUserId('');
    setEmail('');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
  };

  const handleLogin = (userId, email) => {
    // Set authentication state and save to localStorage
    setIsAuthenticated(true);
    setUserId(userId);
    setEmail(email);
    localStorage.setItem('userId', userId);
    localStorage.setItem('email', email);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Routes>
          <Route exact path="/" element={isAuthenticated ? <Navigate to="/discover" /> : <Home />} />
          <Route path="/discover" element={isAuthenticated ? <Discover userId={userId} email={email}/> : <Navigate to="/login" />} />
          <Route path="/groups" element={isAuthenticated ? <Groups /> : <Navigate to="/login" />} />
          <Route path="/marketplace" element={isAuthenticated ? <Marketplace userId={userId} email={email}/> : <Navigate to="/login" />} />
          <Route path="/postings" element={isAuthenticated ? <Postings /> :<Navigate to="/login" /> } />
          <Route path="/signup" element={<SignUp onSignUp={handleLogin} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
