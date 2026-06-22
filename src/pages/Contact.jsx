import { useState } from 'react';
import RevealWrapper from '../components/RevealWrapper';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import './Contact.css';

const contactDetails = [
  {
    icon: 'call',
    title: 'Call Us',
    desc: 'Mon–Sat, 8am to 8pm IST. We\'re always ready to help.',
    value: '+91 98194 43674',
    href: 'tel:+919819443674',
    type: 'phone',
  },
  {
    icon: 'mail',
    title: 'Email Us',
    desc: 'Drop us a line anytime. We usually respond within 24 hours.',
    value: 'shishyakul@gmail.com',
    href: 'mailto:shishyakul@gmail.com',
    type: 'email',
  },
  {
    icon: 'location_on',
    title: 'Visit Us',
    desc: 'First Floor, Dhir Corner, Plot No. 40, Sector 20, Kamothe, Panvel, Navi Mumbai, Maharashtra 410209',
    value: 'Get Directions →',
    href: 'https://maps.app.goo.gl/c1Lv45XNhYk7FUAz7',
    type: 'address',
  },
];

const subjects = ['General Inquiry', 'Admissions (Class 8)', 'Admissions (Class 9)', 'Admissions (Class 10)', 'Fee Structure', 'Other'];

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', subject: 'General Inquiry', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: '', phone: '', subject: 'General Inquiry', message: '' });
  };

  return (
    <div className="contact">
      <SEO 
        title="Contact Us"
        description="Get in touch with Shishyakul in Kamothe, Navi Mumbai. Located at Sector 20, Panvel. Call +91 98194 43674 for admissions."
        keywords="contact Shishyakul, Shishyakul address Kamothe, Sector 20 coaching classes, tuition phone number navi mumbai"
      />
      {/* ── Hero ── */}
      <section className="contact-hero">
        <div className="page-container">
          <RevealWrapper>
            <div className="contact-hero-tag text-label-sm">GET IN TOUCH</div>
            <h1 className="contact-hero-title">
              Let's start your child's academic <span className="kinetic-text">transformation.</span>
            </h1>
            <p className="text-body-lg contact-hero-sub">
              Whether you have questions about admissions, fees, or our teaching approach — our team is here to guide you. Reach out today!
            </p>
          </RevealWrapper>
        </div>
      </section>

      {/* ── Contact Details ── */}
      <section className="section" style={{ background: 'var(--color-surface-container-lowest)' }}>
        <div className="page-container">
          <RevealWrapper>
            <h2 className="text-headline-lg" style={{ textAlign: 'center', marginBottom: 'var(--space-stack-lg)' }}>
              Contact Details
            </h2>
          </RevealWrapper>
          <div className="contact-cards">
            {contactDetails.map((c, i) => (
              <RevealWrapper key={i} delay={i === 1 ? 'delay-100' : i === 2 ? 'delay-200' : ''}>
                <div className="contact-detail-card glass-panel">
                  <div className="contact-detail-icon">
                    <span className="material-symbols-outlined filled" style={{ fontSize: '22px', color: 'var(--color-primary)' }}>{c.icon}</span>
                  </div>
                  <h3 className="text-headline-md" style={{ marginBottom: '8px', fontSize: '18px' }}>{c.title}</h3>
                  <p className="text-body-md" style={{ color: 'var(--color-secondary)', marginBottom: '10px' }}>{c.desc}</p>
                  <a
                    href={c.href}
                    target={c.type !== 'phone' && c.type !== 'email' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: c.type === 'phone' ? 'var(--font-mono)' : 'var(--font-body)',
                      color: 'var(--color-primary)',
                      fontSize: '14px',
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'inline-block',
                      transition: 'opacity 0.2s',
                    }}
                    onMouseOver={e => e.target.style.opacity = '0.7'}
                    onMouseOut={e => e.target.style.opacity = '1'}
                  >
                    {c.value}
                  </a>
                </div>
              </RevealWrapper>
            ))}
          </div>

          {/* Social Links Row */}
          <RevealWrapper>
            <div className="social-links-row">
              <p className="text-label-md" style={{ color: 'var(--color-secondary)', marginBottom: '16px' }}>Also find us on</p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {[
                  { label: 'Facebook', icon: 'thumb_up', href: 'https://www.facebook.com/61575765819950' },
                  { label: 'LinkedIn', icon: 'work', href: 'https://www.linkedin.com/company/shishyakul/' },
                  { label: 'Instagram', icon: 'photo_camera', href: 'https://www.instagram.com/shishyakul/?hl=en' },
                  { label: 'Google Maps', icon: 'map', href: 'https://maps.app.goo.gl/c1Lv45XNhYk7FUAz7' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-chip"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{s.icon}</span>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section className="section" style={{ background: 'var(--color-surface)' }}>
        <div className="page-container">
          <div className="contact-form-wrap">
            <RevealWrapper>
              <h2 className="text-headline-lg" style={{ textAlign: 'center', marginBottom: '8px' }}>Send Us a Message</h2>
              <p className="text-body-md" style={{ textAlign: 'center', color: 'var(--color-secondary)', marginBottom: '36px' }}>
                Drop us an enquiry and we'll get back to you shortly.
              </p>

              {submitted && (
                <div className="contact-success">
                  <span className="material-symbols-outlined filled" style={{ fontSize: '20px', color: 'var(--color-primary)' }}>check_circle</span>
                  Thank you! We'll reach out to you soon.
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label text-label-sm">PARENT / STUDENT NAME</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label text-label-sm">PHONE NUMBER</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="input-field"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label text-label-sm">ENQUIRY TYPE</label>
                  <select name="subject" value={form.subject} onChange={handleChange} className="input-field">
                    {subjects.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label text-label-sm">YOUR MESSAGE</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your child's current class, board, and any specific needs..."
                    className="input-field"
                    rows={5}
                  />
                </div>
                <div className="form-footer">
                  <div className="form-secure">
                    <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--color-secondary)' }}>school</span>
                    <span className="text-label-sm" style={{ color: 'var(--color-secondary)' }}>Classes 8, 9 &amp; 10 • CBSE &amp; State Board</span>
                  </div>
                  <button type="submit" className="btn-primary">
                    Send Enquiry
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>send</span>
                  </button>
                </div>
              </form>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="section" style={{ background: 'var(--color-surface-container-lowest)' }}>
        <div className="page-container">
          <RevealWrapper>
            <h2 className="text-headline-lg" style={{ textAlign: 'center', marginBottom: '8px' }}>Find Us</h2>
            <p className="text-body-md" style={{ textAlign: 'center', color: 'var(--color-secondary)', marginBottom: '32px' }}>
              First Floor, Dhir Corner, Plot No. 40, Sector 20, Kamothe, Panvel, Navi Mumbai — 410209
            </p>
            <div className="map-container">
              <iframe
                title="Shishyakul Location – Kamothe, Navi Mumbai"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.8!2d73.0986!3d18.9961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e8d5b7a8e1d1%3A0x0!2zMTjCsDU5JzQ2LjAiTiA3M8KwMDUnNTQuOSJF!5e0!3m2!1sen!2sin!4v1&q=Dhir+corner+plot+40+sector+20+kamothe+panvel+navi+mumbai"
                width="100%"
                height="100%"
                style={{ border: 'none', filter: 'grayscale(0.2) contrast(1.05)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="map-pin-overlay">
                <a href="https://maps.app.goo.gl/c1Lv45XNhYk7FUAz7" target="_blank" rel="noopener noreferrer" className="map-pin-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <span className="material-symbols-outlined filled" style={{ color: 'var(--color-primary)', fontSize: '20px' }}>location_on</span>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '14px' }}>Shishyakul Institute</p>
                    <p className="text-label-sm" style={{ color: 'var(--color-secondary)' }}>Kamothe, Navi Mumbai → Open in Maps</p>
                  </div>
                </a>
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>

      <Footer />
    </div>
  );
}
