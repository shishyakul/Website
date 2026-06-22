import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner page-container">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuATZJsCJlyAfmk2-rE8dzZpeKdyS67usLAl_M1Yg0ti6GZZd7rzzgq8VMsWIuFrz4i_sQ1g_fxF-5uUxdOPefeKisi4gvu4k26LBuoxWWkmIydRZtQVimd3XdQgLbtE1WW1zHT4L4PD3JheMDqrpOXduWGijX7B9F67i15dMyrAlUyLmL99HRl6MAHhKwIS0i_A6EtT7wGwSiw_uo2tNpqh2jdL6Eh2jMg9Nwy07qt3Aq_EgWZlYKFVRrKUuAhc9vf6Hg"
              alt="Shishyakul"
              style={{ height: '40px', width: 'auto' }}
            />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-primary)', fontSize: '18px' }}>
              Shishyakul
            </span>
          </div>
          <p className="footer-tagline text-label-sm">
            Dedicated coaching for Classes 8–10 (CBSE &amp; State Board). Building strong academic foundations in Kamothe, Navi Mumbai.
          </p>
          {/* Real Social Links */}
          <div className="footer-socials">
            <a href="mailto:shishyakul@gmail.com" title="Email" className="footer-social-link">
              <svg className="footer-social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </a>
            <a href="https://www.instagram.com/shishyakul/?hl=en" target="_blank" rel="noopener noreferrer" title="Instagram" className="footer-social-link">
              <svg className="footer-social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://www.facebook.com/61575765819950" target="_blank" rel="noopener noreferrer" title="Facebook" className="footer-social-link">
              <svg className="footer-social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="https://www.linkedin.com/company/shishyakul/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="footer-social-link">
              <svg className="footer-social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="https://maps.app.goo.gl/c1Lv45XNhYk7FUAz7" target="_blank" rel="noopener noreferrer" title="Google Maps" className="footer-social-link">
              <svg className="footer-social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </a>
          </div>
        </div>

        {/* Subjects */}
        <div className="footer-col">
          <p className="footer-col-title">Subjects</p>
          <Link to="/faculty" className="footer-link">Mathematics</Link>
          <Link to="/faculty" className="footer-link">Science</Link>
          <Link to="/faculty" className="footer-link">Social Science (SST)</Link>
          <Link to="/faculty" className="footer-link">English</Link>
          <Link to="/faculty" className="footer-link">Hindi &amp; Marathi</Link>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <p className="footer-col-title">Quick Links</p>
          <Link to="/about" className="footer-link">About Us</Link>
          <Link to="/faculty" className="footer-link">Our Faculty</Link>
          <Link to="/gallery" className="footer-link">Gallery</Link>
          <Link to="/contact" className="footer-link">Contact Us</Link>
          <a href="https://maps.app.goo.gl/c1Lv45XNhYk7FUAz7" target="_blank" rel="noopener noreferrer" className="footer-link">
            Get Directions
          </a>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <p className="footer-col-title">Contact</p>
          <a href="tel:+919819443674" className="footer-link footer-link--phone">
            <span className="material-symbols-outlined" style={{ fontSize: '14px', verticalAlign: 'middle', marginRight: '4px' }}>call</span>
            +91 98194 43674
          </a>
          <a href="mailto:shishyakul@gmail.com" className="footer-link" style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            shishyakul@gmail.com
          </a>
          <p className="footer-address text-label-sm">
            First Floor, Dhir Corner,<br />
            Plot No. 40, Sector 20,<br />
            Kamothe, Panvel,<br />
            Navi Mumbai – 410209
          </p>
          <a
            href="https://www.instagram.com/shishyakul/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            @shishyakul
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="text-label-sm" style={{ color: 'var(--color-tertiary)' }}>
          ©2026 Shishyakul. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
