import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
  const [user, setUser] = useState(localStorage.getItem('username') ? localStorage.getItem('username') : '');

  const handleLogin = (newToken, userInfo) => {
    setToken(newToken);
    setUser(userInfo);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken('');
    setUser({});
  };

  const isAuthenticated = () => {
    return !!token;
  };

  return (
    <Router>
      <NavigationBar loggedIn={isAuthenticated()} user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={handleLogin}/>} />
        <Route path="/dashboard" token={token} element={<Dashboard />} />
        {token ? <Route path="/" element={<Navigate to="/dashboard" />}/> : <Route path="/" element={<Navigate to="/login" />} />}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
