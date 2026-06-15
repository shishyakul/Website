import { useState } from 'react';
import RevealWrapper from '../components/RevealWrapper';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import './Faculty.css';

// Real Shishyakul Faculty
const faculty = [
  {
    name: 'Mayur Randive',
    dept: 'SST & English',
    role: 'Subject Expert',
    specialty: 'SOCIAL SCIENCE & ENGLISH',
    desc: 'Dedicated educator bringing clarity to History, Geography, Civics and English language skills with structured notes and engaging sessions.',
    initials: 'MR',
    color: '#7f5600',
  },
  {
    name: 'Asawari Cherphale',
    dept: 'Hindi & Marathi',
    role: 'Language Specialist',
    specialty: 'HINDI & MARATHI',
    desc: 'Expert in regional language learning, helping students build strong grammar foundations and excel in Hindi and Marathi board examinations.',
    initials: 'AC',
    color: '#505f76',
  },
  {
    name: 'Sneha More',
    dept: 'Science',
    role: 'Science Faculty',
    specialty: 'SCIENCE',
    desc: 'Passionate about simplifying complex scientific concepts through real-world examples, lab-based thinking, and exam-oriented preparation.',
    initials: 'SM',
    color: '#565e74',
  },
  {
    name: 'Brijesh Prajapati',
    dept: 'Maths',
    role: 'Mathematics Expert',
    specialty: 'MATHEMATICS',
    desc: 'Makes Mathematics approachable through step-by-step problem solving, regular practice sets, and doubt-clearing sessions for Classes 8–10.',
    initials: 'BP',
    color: '#7f5600',
  },
  {
    name: 'Smriti Rauniyar',
    dept: 'SST & English',
    role: 'Subject Expert',
    specialty: 'SOCIAL SCIENCE & ENGLISH',
    desc: 'Passionate educator bringing clarity to History, Geography, Civics and English language skills with structured notes and engaging sessions.',
    initials: 'SR',
    color: '#7f5600',
  },
];

const departments = ['All Subjects', 'SST & English', 'Hindi & Marathi', 'Science', 'Maths'];

export default function Faculty() {
  const [selectedDept, setSelectedDept] = useState('All Subjects');
  const [search, setSearch] = useState('');

  const filtered = faculty.filter((f) => {
    const matchDept = selectedDept === 'All Subjects' || f.dept === selectedDept;
    const matchSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.specialty.toLowerCase().includes(search.toLowerCase()) ||
      f.dept.toLowerCase().includes(search.toLowerCase());
    return matchDept && matchSearch;
  });

  return (
    <div className="faculty">
      <SEO 
        title="Our Faculty"
        description="Meet the dedicated educators at Shishyakul. Expert teachers for Maths, Science, SST, English, Hindi & Marathi in Kamothe."
        keywords="Shishyakul teachers, maths teacher kamothe, science teacher kamothe, best faculty navi mumbai, CBSE teachers kamothe"
      />
      {/* ── Hero ── */}
      <section className="faculty-hero">
        <div className="page-container">
          <div className="faculty-hero-grid">
            <RevealWrapper className="faculty-hero-text">
              <div className="faculty-hero-tag text-label-sm">OUR EDUCATORS</div>
              <h1 className="text-headline-lg faculty-title">
                Meet the Minds<br />
                <span className="kinetic-text">Shaping Every Student.</span>
              </h1>
              <p className="text-body-lg" style={{ color: 'var(--color-secondary)', marginBottom: '28px', maxWidth: '420px' }}>
                Our faculty at Shishyakul comprises experienced, dedicated educators who bring both subject mastery and genuine care to every classroom.
              </p>
              <div className="faculty-mentor-count">
                <div className="faculty-avatar-stack">
                  {['#7f5600', '#505f76', '#565e74', '#604100'].map((c, i) => (
                    <div key={i} className="faculty-avatar-bubble" style={{ background: c, marginLeft: i > 0 ? '-10px' : 0 }}>
                      <span className="material-symbols-outlined filled" style={{ fontSize: '16px', color: '#fff' }}>person</span>
                    </div>
                  ))}
                </div>
                <span className="text-label-md" style={{ color: 'var(--color-secondary)' }}>4 Dedicated Subject Experts</span>
              </div>
            </RevealWrapper>

            <RevealWrapper delay="delay-200" className="faculty-hero-card glass-panel">
              <p className="text-label-sm" style={{ color: 'var(--color-secondary)', marginBottom: '8px' }}>Subjects Covered</p>
              <p className="text-label-md" style={{ color: 'var(--color-primary)', marginBottom: '20px' }}>Complete Academic Coverage</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { icon: 'calculate', label: 'Mathematics', color: 'var(--color-primary)' },
                  { icon: 'science', label: 'Science', color: 'var(--color-tertiary)' },
                  { icon: 'public', label: 'Social Science (SST)', color: 'var(--color-primary)' },
                  { icon: 'translate', label: 'English, Hindi & Marathi', color: 'var(--color-secondary)' },
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: 'var(--color-surface-container-low)', borderRadius: '10px' }}>
                    <span className="material-symbols-outlined" style={{ color: s.color, fontSize: '20px' }}>{s.icon}</span>
                    <span className="text-body-md" style={{ fontWeight: 500 }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* ── Filter ── */}
      <section style={{ background: 'var(--color-surface-container-lowest)', padding: '28px 0', position: 'sticky', top: '72px', zIndex: 30, borderBottom: '1px solid var(--color-glass-stroke)', backdropFilter: 'blur(8px)' }}>
        <div className="page-container">
          <div className="faculty-filter">
            <div className="faculty-search-wrap">
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--color-outline)', position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>search</span>
              <input
                type="text"
                placeholder="Search by name or subject..."
                className="input-field faculty-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="faculty-pills">
              {departments.map((dept) => (
                <button
                  key={dept}
                  className={`faculty-pill ${selectedDept === dept ? 'active' : ''}`}
                  onClick={() => setSelectedDept(dept)}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Faculty Grid ── */}
      <section className="section" style={{ background: 'var(--color-surface)' }}>
        <div className="page-container">
          <div className="faculty-grid">
            {filtered.map((member, i) => (
              <RevealWrapper key={member.name} delay={`delay-${(i % 4) * 100}`}>
                <div className="faculty-card">
                  {/* Avatar instead of photo since no real photos provided */}
                  <div className="faculty-card-img-wrap" style={{ aspectRatio: '1', background: 'var(--color-surface-container)' }}>
                    <div style={{
                      width: '100%', height: '100%',
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                      background: `linear-gradient(135deg, ${member.color}18, ${member.color}30)`,
                    }}>
                      <div style={{
                        width: '80px', height: '80px',
                        borderRadius: '9999px',
                        background: member.color,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '28px', fontWeight: 700,
                        color: '#fff',
                        fontFamily: 'var(--font-display)',
                        marginBottom: '12px',
                        boxShadow: `0 8px 24px ${member.color}40`,
                      }}>
                        {member.initials}
                      </div>
                    </div>
                    <div className="faculty-card-badge">{member.role}</div>
                  </div>
                  <div className="faculty-card-body">
                    <p className="text-label-sm" style={{ color: 'var(--color-primary)', marginBottom: '6px' }}>{member.specialty}</p>
                    <h3 className="text-headline-md" style={{ marginBottom: '8px', fontSize: '20px' }}>{member.name}</h3>
                    <p className="text-body-md" style={{ color: 'var(--color-secondary)', fontSize: '14px', lineHeight: '1.5' }}>{member.desc}</p>
                    <div className="faculty-card-actions">
                      <a href="tel:+919819443674" className="faculty-icon-btn" title="Call Shishyakul">
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>call</span>
                      </a>
                      <a href="https://www.instagram.com/shishyakul/?hl=en" target="_blank" rel="noopener noreferrer" className="faculty-icon-btn" title="Instagram">
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>photo_camera</span>
                      </a>
                      <a href="https://www.linkedin.com/in/shishyakul/" target="_blank" rel="noopener noreferrer" className="faculty-icon-btn" title="LinkedIn">
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>work</span>
                      </a>
                    </div>
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-secondary)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '48px', display: 'block', marginBottom: '12px', opacity: 0.4 }}>search_off</span>
              <p>No faculty found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <RevealWrapper>
        <section className="faculty-cta">
          <div className="page-container">
            <div className="faculty-cta-inner">
              <h2 className="text-headline-lg" style={{ marginBottom: '14px' }}>You Are Someone, Who Can Teach?</h2>
              <p className="text-body-lg" style={{ color: 'var(--color-secondary)', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
                Join our team of dedicated educators and make a difference in the lives of students. Apply now to become a part of the Shishyakul family.
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="tel:+919136043608" className="btn-primary" style={{ textDecoration: 'none' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>call</span>
                  Call Now: +91 91360 43608
                </a>
                <a href="https://www.instagram.com/shishyakul/?hl=en" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ textDecoration: 'none' }}>
                  Follow on Instagram
                </a>
              </div>
            </div>
          </div>
        </section>
      </RevealWrapper>

      <Footer />
    </div>
  );
}
