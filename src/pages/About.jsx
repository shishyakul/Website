import RevealWrapper from '../components/RevealWrapper';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import './About.css';

const methodology = [
  {
    icon: 'menu_book',
    title: 'Structured Curriculum',
    desc: 'Every lesson is designed to simplify complex concepts through clear explanations, structured notes, and innovative teaching techniques aligned with the latest CBSE & State Board patterns.',
  },
  {
    icon: 'groups',
    title: 'Small Batch Learning',
    desc: 'Small batch sizes ensure individual attention, allowing teachers to understand each student\'s strengths and areas for improvement for targeted growth.',
  },
  {
    icon: 'family_restroom',
    title: 'Parent–Teacher Partnership',
    desc: 'Regular PTMs, progress reports, and timely updates create a collaborative learning ecosystem that keeps families actively involved in their child\'s journey.',
  },
];

const timeline = [
  {
    year: 'FOUNDATION',
    tag: 'OUR STORY',
    title: 'Shishyakul Was Born',
    desc: 'Founded with a single mission — to provide quality, personalized coaching to students in Classes 8–10 across CBSE and State Boards in Navi Mumbai.',
  },
  {
    year: 'GROWTH',
    tag: 'EXPANDING REACH',
    title: 'Building Trust with Families',
    desc: 'Earned the trust of students and parents through improved academic performance, enhanced confidence, and a genuine passion for learning.',
  },
  {
    year: 'TODAY',
    tag: 'WHERE WE STAND',
    title: 'Experienced Faculty Across All Subjects',
    desc: 'Our team of dedicated teachers covers Maths, Science, SST, English, Hindi, and Marathi — ensuring complete academic support under one roof.',
  },
  {
    year: 'FUTURE',
    tag: 'OUR COMMITMENT',
    title: 'Quality, Affordability & Growth',
    desc: 'Shishyakul continues to guide students toward academic success and a brighter future — with a focus on quality education, personal development, and affordability.',
  },
];

export default function About() {
  return (
    <div className="about">
      <SEO 
        title="About Us"
        description="Learn about Shishyakul's journey, methodology, and commitment to providing the best CBSE and State Board coaching in Kamothe, Navi Mumbai."
        keywords="about Shishyakul, coaching institute Kamothe, best tuition centre in Navi Mumbai, CBSE class 10 coaching, state board class 8 coaching"
      />
      {/* ── Hero ── */}
      <section className="about-hero">
        <div className="page-container">
          <RevealWrapper>
            <div className="about-hero-tag text-label-sm">OUR INSTITUTE</div>
            <h1 className="about-hero-title">
              About <span className="kinetic-text">Shishyakul</span>
            </h1>
            <p className="text-body-lg about-hero-sub">
              A dedicated coaching institute committed to nurturing academic excellence for students from Classes 8 to 10 across CBSE and State Boards in Navi Mumbai.
            </p>
          </RevealWrapper>
        </div>
      </section>

      {/* ── Identity ── */}
      <section className="section" style={{ background: 'var(--color-surface)' }}>
        <div className="page-container">
          <div className="identity-grid">
            <RevealWrapper>
              <div className="identity-tag text-label-sm">WHO WE ARE</div>
              <h2 className="text-headline-lg identity-title">What Is Shishyakul?</h2>
              <p className="text-body-lg" style={{ color: 'var(--color-secondary)', marginBottom: '28px', lineHeight: '1.7' }}>
                Shishyakul is a dedicated educational institute committed to nurturing academic excellence and building strong foundations for students from Classes 8th to 10th across State and CBSE boards. With a student-centered approach, Shishyakul combines experienced faculty, modern teaching methodologies, and personalized attention to create an engaging and effective learning environment.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { icon: 'verified', title: 'Well-Equipped Infrastructure', desc: 'Spacious classrooms and a comprehensive library designed for focused, holistic learning.' },
                  { icon: 'quiz', title: 'Continuous Assessment System', desc: 'Weekly tests, doubt-solving sessions, and regular feedback for consistent academic progress.' },
                ].map((item, i) => (
                  <div key={i} className="identity-feature">
                    <span className="material-symbols-outlined filled" style={{ color: 'var(--color-primary-container)', fontSize: '22px' }}>{item.icon}</span>
                    <div>
                      <p style={{ fontWeight: 700, marginBottom: '4px' }}>{item.title}</p>
                      <p className="text-body-md" style={{ color: 'var(--color-secondary)' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </RevealWrapper>

            <RevealWrapper delay="delay-200">
              <div className="identity-score-card">
                <p className="text-label-sm" style={{ color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
                  OUR FOCUS
                </p>
                <p className="text-display-lg" style={{ color: 'var(--color-on-surface)', lineHeight: 1.1 }}>Classes</p>
                <p className="text-display-lg" style={{ color: 'var(--color-primary)', lineHeight: 1.1 }}>8 – 10</p>
                <p className="text-headline-md" style={{ color: 'var(--color-secondary)', marginTop: '12px' }}>CBSE &amp; State Board</p>
                <div className="identity-score-bar" style={{ marginTop: '24px' }}>
                  <div className="identity-score-fill" />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '20px' }}>
                  {['Maths', 'Science', 'SST', 'English', 'Hindi', 'Marathi'].map(sub => (
                    <span key={sub} style={{
                      background: 'var(--color-primary-fixed)',
                      color: 'var(--color-primary)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: '9999px',
                    }}>{sub}</span>
                  ))}
                </div>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* ── Methodology ── */}
      <section className="section" style={{ background: 'var(--color-surface-container-lowest)' }}>
        <div className="page-container">
          <RevealWrapper>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-stack-lg)' }}>
              <div className="about-section-tag text-label-sm">HOW WE TEACH</div>
              <h2 className="text-headline-lg" style={{ marginBottom: '12px' }}>What We Do</h2>
              <p className="text-body-lg" style={{ color: 'var(--color-secondary)', maxWidth: '520px', margin: '0 auto' }}>
                We architect a learning environment where every student gets the care, clarity, and consistency they need to excel.
              </p>
            </div>
          </RevealWrapper>
          <div className="methodology-grid">
            {methodology.map((m, i) => (
              <RevealWrapper key={i} delay={i === 1 ? 'delay-100' : i === 2 ? 'delay-200' : ''}>
                <div className="method-card glass-panel">
                  <div className="method-icon-wrap">
                    <span className="material-symbols-outlined" style={{ fontSize: '26px', color: 'var(--color-primary)' }}>{m.icon}</span>
                  </div>
                  <h3 className="text-headline-md" style={{ marginBottom: '10px' }}>{m.title}</h3>
                  <p className="text-body-md" style={{ color: 'var(--color-secondary)' }}>{m.desc}</p>
                  <div className="method-bar" />
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="section" style={{ background: 'var(--color-surface)' }}>
        <div className="page-container">
          <div className="timeline-layout">
            <RevealWrapper className="timeline-left">
              <div className="timeline-tag text-label-sm">OUR JOURNEY</div>
              <h2 className="text-headline-lg" style={{ marginBottom: '16px' }}>Growth &amp; Trust</h2>
              <p className="text-body-md" style={{ color: 'var(--color-secondary)', marginBottom: '32px', lineHeight: '1.7' }}>
                Built on dedication, shaped by results. Shishyakul has consistently helped students grow in academics and confidence.
              </p>
              <div className="timeline-stats">
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, color: 'var(--color-primary)' }}>8–10</p>
                  <p className="text-label-sm" style={{ color: 'var(--color-secondary)' }}>Classes Taught</p>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, color: 'var(--color-primary)' }}>4</p>
                  <p className="text-label-sm" style={{ color: 'var(--color-secondary)' }}>Expert Faculty</p>
                </div>
              </div>
            </RevealWrapper>

            <div className="timeline-events">
              {timeline.map((item, i) => (
                <RevealWrapper key={i} delay={`delay-${Math.min(i * 100, 300)}`} className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-content glass-panel">
                    <span className="timeline-year text-label-sm">{item.tag}</span>
                    <h3 className="text-headline-md" style={{ margin: '8px 0' }}>{item.title}</h3>
                    <p className="text-body-md" style={{ color: 'var(--color-secondary)' }}>{item.desc}</p>
                  </div>
                </RevealWrapper>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
