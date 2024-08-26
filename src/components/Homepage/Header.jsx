"use client"; // Ensure this file is treated as a client component
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './Header.css'; // Ensure CSS is correctly imported
import AuthForm from '@/components/Auth/authform';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLoginClick = () => {
    router.push('auth'); 
  };

  const handleSignupClick = () => {
    router.push('auth'); 
  };

  return (
    <header className="header">
      <div className="container">
        <div className="brand-name">
          <span className="gradient-text">L</span>
          <span>I</span>
          <span className="gradient-text">Z</span>
          <span>A</span>
        </div>
        <button className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <nav className={`nav ${isOpen ? 'open' : ''}`}>
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">Features</a>
          <a href="#" className="nav-link">Agents</a>
          <a href="#" className="nav-link">About Us</a>
          <div className="auth-buttons">
            <button className="login" onClick={handleLoginClick}>Login</button>
            <button className="signup" onClick={handleSignupClick}>Sign Up</button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
