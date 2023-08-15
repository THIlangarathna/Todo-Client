import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = ({ loggedIn, user, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <span className="navbar-brand">Todo App</span>
        <div className="collapse navbar-collapse justify-content-end">
          {loggedIn ? (
            <>
              <span className="navbar-text">Hello, {user}!</span>
              <button className="btn btn-outline-danger mx-2" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-primary mx-2">
                Login
              </Link>
              <Link to="/register" className="btn btn-outline-primary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
