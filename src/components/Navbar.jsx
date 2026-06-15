import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/faculty', label: 'Faculty' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact Us' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-inner page-container">
        {/* Logo */}
        <NavLink to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZLESYZXcF_M2rul555PVh27IyOFW8Cmz020MELXH1sr3jYCS4L-DkjwO9Nzgj9qJfWocQ7Mw1y3cNSWpMg0LzkNOMQbiwmAgbIhiURYpcB_XOUuEGr15sx2gv-pjf58NEBF805Ww3dFg8EwQ2LTYvgr_GGH9BIvMoPW5XUJxZeg4gSyTD21_dhdJMZCrfbPKmE_mQM2iY34kr9VK_QWLWIBCi5Wi1wtyFjLUKx3fU0EiuAou4LA3R34t1JHhU9lW2fA"
            alt="Shishyakul Logo"
            className="navbar-logo-img"
          />
          <span className="navbar-logo-text">Shishyakul</span>
        </NavLink>

        {/* Desktop Links */}
        <div className="navbar-links">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `navbar-link ${isActive ? 'navbar-link--active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* CTA */}
        <div className="navbar-actions">
          <a href="/portal/login" className="btn-pill" style={{ textDecoration: 'none' }}>Login</a>
          <button
            className={`navbar-hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`navbar-drawer ${menuOpen ? 'open' : ''}`}>
        {navLinks.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `navbar-drawer-link ${isActive ? 'navbar-drawer-link--active' : ''}`
            }
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </NavLink>
        ))}
        <a href="/portal/login" className="btn-pill" style={{ marginTop: '12px', width: '100%', textDecoration: 'none', textAlign: 'center', display: 'inline-block', boxSizing: 'border-box' }}>
          Login
        </a>
      </div>
    </nav>
  );
}
