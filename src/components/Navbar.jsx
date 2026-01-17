import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="glass">
      <div className="container nav-container">
        <NavLink to="/" className="logo">
          Credit<span className="logo-highlight">Health</span>
        </NavLink>
        
        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/financial-form" className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setIsOpen(false)}>
            Update Data
          </NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setIsOpen(false)}>
            Dashboard
          </NavLink>
          <NavLink to="/loans" className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setIsOpen(false)}>
            Compare Loans
          </NavLink>
        </div>

        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
