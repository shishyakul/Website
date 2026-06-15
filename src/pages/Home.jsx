import RevealWrapper from '../components/RevealWrapper';
import HoverCard from '../components/HoverCard';
import Footer from '../components/Footer';
import ReviewsCarousel from '../components/ReviewsCarousel';
import SEO from '../components/SEO';
import './Home.css';

const LOGO_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBwqhBZ62Q3j8GboWdCAV4XLG8y4eMvLeTcNR0arLJr6KbIsONcKlIDxDnQW4XigupJosMBU3yL5o7g7BH64081_r-NkkgeADM6igy35S95I_wp2FS18Ttku58SFk0MZA_i8ap79G9uPYoR3SpvFazhFgOCf66b6iiDybqjNVUlRoNRMHmNYjEoil6i3jBExu_k3wItRY_DFyvmkkLW2MZIj5y2FZ-ZmsB9y_Y_VTV1lX_2M0qlLf9IrLq9uLqtz0e92A';

const CLASSROOM_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuArETeVnqV3YtCM5pNbekQpylcLmRtOx6Wz-yWQF1nZdL-9TdXXPyAsR1GKjKnWZlrjcWK9qvSSbfCetR-02YHZ9pQLXbZb16TRokPedOToLZMKKp-Fwyg8ccoru-SwJhGpmWLqmkVO3FtvT9FHJ3GtWRKDRDVwla8tqPir458BXMZabmFW3hvg2_7Aeqf0WpcXIvZO-ufFuZMFWFjbG51OB6ra9UrVEckx0y29BIVxve3vwMFIsa7k';

const LEARNING_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDqkiM2-2_CFsQj4x-JeOMXyyVfSIvaRthaECh2NUjmTv5T2E3fFMAl1tgIdFOC8MsYxepUgtSHCcMy2D4dAGibJXClSJ6u8Wo2EGvUfmYpzTYSBkA-BU5oLMk7TPrWBeZJEPoixOcATqhTT4k5Z21MCZCjNF9TgxAfefkAsCVt_C6798kEsrK322jtKyLPysf5DvUp8zHuo_JQ5hk-gdUoHEu665GlnFm7LZZ1REC3AbumzwOjwPFD';

// ── Real Shishyakul Data ─────────────────────────────────────

const services = [
  {
    icon: 'groups',
    color: 'var(--color-primary)',
    bg: 'var(--color-primary-fixed)',
    border: 'var(--color-primary)',
    title: 'Small Batch Sizes',
    desc: 'Individual attention in every class. Small batches let teachers truly understand each student\'s strengths and areas for improvement.',
  },
  {
    icon: 'quiz',
    color: 'var(--color-tertiary)',
    bg: 'var(--color-tertiary-fixed)',
    border: 'var(--color-tertiary)',
    title: 'Regular Assessments',
    desc: 'Weekly tests, doubt-solving sessions, and continuous feedback help students track progress and achieve consistent academic growth.',
  },
  {
    icon: 'family_restroom',
    color: 'var(--color-primary)',
    bg: 'rgba(255,186,64,0.3)',
    border: 'var(--color-primary-container)',
    title: 'Parent–Teacher Connect',
    desc: 'Regular PTMs, progress reports, and timely updates keep parents actively involved in their child\'s academic journey.',
  },
];

// Reviews referencing the real Google Maps page
// (maps.app.goo.gl/c1Lv45XNhYk7FUAz7)
const MAPS_URL = 'https://maps.app.goo.gl/c1Lv45XNhYk7FUAz7';

const reviews = [
  {
    quote: '"Shishyakul has truly transformed my child\'s approach to studies. The teachers are dedicated, patient, and make every concept crystal clear. Highly recommended!"',
    name: 'Parent — Class 9',
    role: 'State Board, Navi Mumbai',
    initials: 'SP',
    rating: 5,
    avatarBg: 'var(--color-primary-fixed)',
    avatarColor: 'var(--color-primary)',
  },
  {
    quote: '"The small batch system is a game-changer. My daughter went from struggling in Maths to scoring 90+ in her board exam. Thank you, Shishyakul!"',
    name: 'Parent — Class 10',
    role: 'CBSE Board Student',
    initials: 'MR',
    rating: 5,
    avatarBg: 'var(--color-primary-container)',
    avatarColor: 'var(--color-on-primary-container)',
  },
  {
    quote: '"Regular tests, doubt sessions, and caring teachers — Shishyakul is everything a student needs for real academic growth and confidence."',
    name: 'Student — Class 8',
    role: 'State Board, Kamothe',
    initials: 'AK',
    rating: 5,
    avatarBg: 'var(--color-tertiary-fixed)',
    avatarColor: 'var(--color-tertiary)',
  },
  {
    quote: '"Sneha ma\'am\'s Science sessions are exceptional. My son now loves the subject and understands every concept deeply. Best institute in Navi Mumbai!"',
    name: 'Parent — Class 9',
    role: 'CBSE Board, Panvel',
    initials: 'RK',
    rating: 5,
    avatarBg: 'var(--color-secondary-fixed)',
    avatarColor: 'var(--color-secondary)',
  },
  {
    quote: '"Brijesh sir\'s Maths classes are a revelation — step-by-step clarity every time. My child\'s marks jumped from 55 to 88 in one term!"',
    name: 'Parent — Class 10',
    role: 'State Board Student',
    initials: 'NP',
    rating: 5,
    avatarBg: 'rgba(255,186,64,0.25)',
    avatarColor: 'var(--color-primary)',
  },
  {
    quote: '"Asawari ma\'am made Hindi and Marathi so easy to understand. I topped my class in both languages this year. Forever grateful to Shishyakul!"',
    name: 'Student — Class 8',
    role: 'State Board, Sector 20',
    initials: 'VD',
    rating: 5,
    avatarBg: 'var(--color-surface-container-high)',
    avatarColor: 'var(--color-on-surface)',
  },
];

export default function Home() {
  return (
    <div className="home">
      <SEO />
      {/* ── Hero ── */}
      <header className="hero">
        <div className="hero-canvas">
          <svg className="hero-svg" fill="none" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="200" r="120" stroke="#7f5600" strokeDasharray="6 6" strokeWidth="1" opacity="0.3" />
            <circle cx="200" cy="200" r="70" stroke="#fdb42a" strokeDasharray="4 4" strokeWidth="0.8" opacity="0.2" />
            <path d="M80 200 L320 200 M200 80 L200 320" stroke="#7f5600" strokeWidth="0.5" opacity="0.3" />
            <circle cx="200" cy="200" fill="#7f5600" r="6" opacity="0.6" />
            <circle cx="80" cy="200" fill="#fdb42a" r="4" opacity="0.8">
              <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="320" cy="200" fill="#fdb42a" r="4" opacity="0.8">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="200" cy="80" fill="#fdb42a" r="4" opacity="0.6">
              <animate attributeName="opacity" values="0.6;0.9;0.6" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="200" cy="320" fill="#fdb42a" r="4" opacity="0.6">
              <animate attributeName="opacity" values="0.9;0.6;0.9" dur="2.5s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        <div className="hero-inner page-container">
          <RevealWrapper className="hero-text">
            <div className="hero-badge">
              <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--color-primary)' }}>school</span>
              <span className="text-label-sm" style={{ color: 'var(--color-on-primary-fixed)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                Classes 8th – 10th • CBSE &amp; State Board
              </span>
            </div>
            <h1 className="hero-heading text-display-lg-mobile">
              Build a Strong <span className="kinetic-text">Academic Foundation</span> with Shishyakul.
            </h1>
            <p className="hero-subtext text-body-lg">
              Shishyakul is a dedicated coaching institute in Navi Mumbai committed to nurturing academic excellence for students in Classes 8–10. We combine experienced faculty, small batch sizes, and personalized attention to create an engaging and effective learning environment.
            </p>
            <div className="hero-ctas">
              <button className="btn-primary" style={{ fontSize: '17px', padding: '14px 32px' }}>Enroll Now</button>
              <a href="tel:+919819443674" className="btn-secondary" style={{ fontSize: '17px', padding: '14px 32px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>call</span>
                Call Us
              </a>
            </div>
          </RevealWrapper>

          <RevealWrapper className="hero-image-wrap" delay="delay-200">
            <img
              src={LOGO_URL}
              alt="Shishyakul"
              className="hero-logo-img"
            />
          </RevealWrapper>
        </div>
      </header>

      {/* ── Vision ── */}
      <section className="section" style={{ background: 'var(--color-surface)' }} id="vision">
        <div className="page-container">
          <div className="vision-grid">
            <RevealWrapper>
              <h2 className="text-headline-lg" style={{ marginBottom: '20px' }}>Our Approach</h2>
              <p className="text-body-lg" style={{ color: 'var(--color-secondary)', marginBottom: '28px', lineHeight: '1.7' }}>
                At Shishyakul, every lesson is designed to simplify complex concepts through clear explanations, structured notes, and innovative teaching techniques — aligned with the latest CBSE &amp; State Board curriculum and exam patterns.
              </p>
              <div className="vision-list">
                {[
                  'Small batch sizes for genuine individual attention.',
                  'Weekly tests, assessments & doubt-solving sessions.',
                  'Well-equipped classrooms and a comprehensive library.',
                ].map((item, i) => (
                  <div key={i} className="vision-item">
                    <div className="vision-check">
                      <span className="material-symbols-outlined filled" style={{ fontSize: '14px', color: 'var(--color-on-primary-container)' }}>check</span>
                    </div>
                    <p className="text-body-md" style={{ color: 'var(--color-on-surface-variant)' }}>{item}</p>
                  </div>
                ))}
              </div>
            </RevealWrapper>

            <RevealWrapper delay="delay-200">
              <div className="vision-card">
                <div className="vision-card-glow" />
                <span className="material-symbols-outlined" style={{ fontSize: '80px', color: 'var(--color-primary)', opacity: 0.8, marginBottom: '20px', display: 'block' }}>emoji_events</span>
                <h3 className="text-headline-md" style={{ color: 'var(--color-primary)', marginBottom: '12px' }}>Trusted by Families in Navi Mumbai</h3>
                <p style={{ color: 'var(--color-on-surface-variant)', fontStyle: 'italic', lineHeight: '1.6' }}>
                  "Over the years, Shishyakul has earned the trust of students and parents through improved academic performance, enhanced confidence, and a genuine passion for learning."
                </p>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="section" style={{ background: 'var(--color-surface-container-lowest)' }} id="offerings">
        <div className="page-container">
          <RevealWrapper>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-stack-lg)' }}>
              <h2 className="text-headline-lg" style={{ marginBottom: '12px' }}>What Makes Shishyakul Different?</h2>
              <p className="text-body-md" style={{ color: 'var(--color-secondary)', maxWidth: '520px', margin: '0 auto' }}>
                A student-centered environment built for Classes 8–10 (CBSE &amp; State Board) with quality, care, and affordability.
              </p>
            </div>
          </RevealWrapper>
          <div className="services-grid">
            {services.map((svc, i) => (
              <RevealWrapper key={i} delay={i === 1 ? 'delay-100' : i === 2 ? 'delay-200' : ''}>
                <HoverCard className={`glass-panel service-card`} style={{ borderTop: `4px solid ${svc.border}` }}>
                  <div className="service-icon-wrap" style={{ background: svc.bg }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '30px', color: svc.color }}>{svc.icon}</span>
                  </div>
                  <h3 className="text-headline-md" style={{ marginBottom: '12px' }}>{svc.title}</h3>
                  <p className="text-body-md" style={{ color: 'var(--color-secondary)' }}>{svc.desc}</p>
                </HoverCard>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Us Bento ── */}
      <section className="section" id="why-us">
        <div className="page-container">
          <RevealWrapper>
            <h2 className="text-headline-lg" style={{ textAlign: 'center', marginBottom: 'var(--space-stack-lg)' }}>
              Why Choose Shishyakul?
            </h2>
          </RevealWrapper>
          <div className="bento-grid">
            {/* Main bento */}
            <RevealWrapper className="bento-main">
              <div className="bento-main-inner">
                <div className="bento-trophy">
                  <span className="material-symbols-outlined" style={{ fontSize: '160px', color: 'var(--color-primary)' }}>school</span>
                </div>
                <div className="bento-main-content">
                  <span className="bento-badge text-label-md">Classes 8 – 10</span>
                  <h3 className="text-headline-lg" style={{ margin: '12px 0 8px' }}>CBSE &amp; State Board Excellence</h3>
                  <p className="text-body-md" style={{ color: 'var(--color-secondary)', maxWidth: '400px' }}>
                    Structured coaching across Maths, Science, SST, English, Hindi &amp; Marathi — aligned with the latest board curriculum and exam patterns.
                  </p>
                </div>
              </div>
            </RevealWrapper>

            {/* Community */}
            <RevealWrapper className="bento-community" delay="delay-100">
              <div className="bento-community-header">
                <div className="bento-comm-icon">
                  <span className="material-symbols-outlined" style={{ color: '#fff' }}>location_on</span>
                </div>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: '28px' }}>Kamothe</span>
              </div>
              <div>
                <h3 className="text-headline-md" style={{ color: '#fff' }}>Navi Mumbai</h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', marginTop: '4px' }}>Sector 20, Panvel — easily accessible.</p>
              </div>
            </RevealWrapper>

            {/* AI Learning */}
            <RevealWrapper className="bento-ai" delay="delay-200">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>menu_book</span>
                <span className="text-label-md">Affordable Quality</span>
              </div>
              <h3 className="text-headline-md" style={{ marginBottom: '8px' }}>Quality Education</h3>
              <p className="text-body-md" style={{ color: 'var(--color-secondary)' }}>
                Top-quality teaching at an affordable cost — because every student deserves access to the best education.
              </p>
            </RevealWrapper>

            {/* Real World */}
            <RevealWrapper className="bento-realworld" delay="delay-300">
              <div className="bento-rw-img">
                <img src={LEARNING_IMG} alt="Shishyakul Classroom" className="bento-rw-photo" />
              </div>
              <div>
                <h3 className="text-headline-md" style={{ marginBottom: '8px' }}>Structured Notes &amp; Resources</h3>
                <p className="text-body-md" style={{ color: 'var(--color-secondary)' }}>
                  Every lesson comes with well-structured notes and resources, helping students revise effectively and ace their exams.
                </p>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* ── Video Section ── */}
      <section className="section" style={{ background: 'var(--color-surface)', overflow: 'hidden' }}>
        <div className="page-container">
          <RevealWrapper>
            <h2 className="text-headline-lg" style={{ textAlign: 'center', marginBottom: 'var(--space-stack-md)' }}>
              The Shishyakul Experience
            </h2>
            <div className="video-wrapper glass-panel">
              <div className="video-inner">
                <img src={CLASSROOM_URL} alt="Classroom experience" className="video-thumb" />
                <div className="video-overlay">
                  <button className="video-play-btn">
                    <span className="material-symbols-outlined filled" style={{ fontSize: '40px' }}>play_arrow</span>
                  </button>
                </div>
              </div>
              <div className="video-meta">
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '18px' }}>A Day at Shishyakul, Kamothe</p>
                  <p className="text-label-sm" style={{ color: 'var(--color-secondary)', marginTop: '4px' }}>Navi Mumbai • CBSE &amp; State Board Coaching</p>
                </div>
                <a
                  href="https://www.instagram.com/shishyakul/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-label-md"
                  style={{ color: 'var(--color-primary)', animation: 'pulse 2s ease-in-out infinite', textDecoration: 'none' }}
                >
                  ● FOLLOW US
                </a>
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* ── Testimonials / Reviews Carousel ── */}
      <section className="section" style={{ background: 'var(--color-surface-container-lowest)' }} id="stories">
        <div className="page-container">
          <RevealWrapper>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-stack-lg)' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'var(--color-primary-fixed)',
                padding: '6px 16px', borderRadius: '9999px', marginBottom: '16px',
              }}>
                <span className="material-symbols-outlined filled" style={{ fontSize: '16px', color: 'var(--color-primary)' }}>star</span>
                <span className="text-label-sm" style={{ color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Google Reviews</span>
              </div>
              <h2 className="text-headline-lg" style={{ marginBottom: '8px' }}>
                What Parents &amp; Students Say
              </h2>
              <p className="text-body-md" style={{ color: 'var(--color-secondary)', maxWidth: '440px', margin: '0 auto' }}>
                Real reviews from our community.
              </p>
            </div>
          </RevealWrapper>
          <ReviewsCarousel reviews={reviews} mapsUrl={MAPS_URL} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
