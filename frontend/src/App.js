import React, { useState, useEffect, useReducer } from 'react';
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
import Feedback from './components/Feedback';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
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
          <Route path="/groups" element={isAuthenticated ? <Groups userId={userId} email={email}/> : <Navigate to="/login" />} />
          <Route path="/marketplace" element={isAuthenticated ? <Marketplace userId={userId} email={email}/> : <Navigate to="/login" />} />
          <Route path="/postings" element={isAuthenticated ? <Postings userId={userId} email={email}/> :<Navigate to="/login" /> } />
          <Route path="/signup" element={<SignUp onSignUp={handleLogin} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/account" element={isAuthenticated ? <Account userId={userId} email={email}/> :<Navigate to="/login" /> } />
          <Route path="/feedback" element={<Feedback userId={userId} email={email}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
