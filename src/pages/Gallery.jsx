import { useState } from 'react';
import RevealWrapper from '../components/RevealWrapper';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import './Gallery.css';

const photos = [
  { src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80&fit=crop', alt: 'Students studying together', span: 'tall' },
  { src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80&fit=crop', alt: 'Graduation ceremony', span: 'tall' },
  { src: 'https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?w=600&q=80&fit=crop', alt: 'Modern classroom', span: 'normal' },
  { src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80&fit=crop', alt: 'Lab work', span: 'normal' },
  { src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80&fit=crop', alt: 'Mentoring session', span: 'normal' },
  { src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80&fit=crop', alt: 'Workshop event', span: 'normal' },
];

const videos = [
  {
    thumb: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80&fit=crop',
    label: 'VIRTUAL TOUR',
    title: 'Campus Virtual Tour',
    duration: '5:20',
  },
  {
    thumb: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80&fit=crop',
    label: 'LAB INSIGHTS',
    title: 'Research Lab Walkthrough',
    duration: '7:45',
  },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <div className="gallery">
      <SEO 
        title="Gallery"
        description="See the vibrant learning environment at Shishyakul. Pictures of our classrooms, activities, and students in Kamothe."
        keywords="Shishyakul photos, tuition classes gallery Kamothe, navi mumbai coaching images"
      />
      {/* ── Hero ── */}
      <section className="gallery-hero">
        <div className="page-container">
          <RevealWrapper>
            <div className="gallery-hero-tag text-label-sm">VISUAL ARCHIVES</div>
            <h1 className="gallery-hero-title">
              Showcase Photo <span className="kinetic-text">Gallery</span>
            </h1>
            <p className="text-body-lg" style={{ color: 'var(--color-secondary)', maxWidth: '480px', margin: '0 auto' }}>
              Explore the captured moments of academic brilliance and vibrant campus life.
            </p>
          </RevealWrapper>
        </div>
      </section>

      {/* ── Photo Grid ── */}
      <section className="section" style={{ background: 'var(--color-surface-container-lowest)' }}>
        <div className="page-container">
          <div className="photo-grid">
            {photos.map((photo, i) => (
              <RevealWrapper key={i} className={`photo-item ${photo.span === 'tall' ? 'photo-item--tall' : ''}`}>
                <div className="photo-wrap" onClick={() => setLightbox(photo.src)}>
                  <img src={photo.src} alt={photo.alt} className="photo-img" />
                  <div className="photo-overlay">
                    <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#fff' }}>zoom_in</span>
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ── Video Gallery ── */}
      <section className="section" style={{ background: 'var(--color-surface)' }}>
        <div className="page-container">
          <RevealWrapper>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-stack-lg)' }}>
              <div className="gallery-hero-tag text-label-sm">CINEMATIC EXPERIENCE</div>
              <h2 className="text-headline-lg" style={{ marginBottom: '12px' }}>
                Video <span className="kinetic-text">Gallery</span>
              </h2>
              <p className="text-body-lg" style={{ color: 'var(--color-secondary)' }}>
                Watch our campus come to life through student vlogs and virtual tours.
              </p>
            </div>
          </RevealWrapper>
          <div className="video-grid">
            {videos.map((v, i) => (
              <RevealWrapper key={i} delay={i === 1 ? 'delay-100' : ''}>
                <div className="video-card">
                  <img src={v.thumb} alt={v.title} className="video-card-thumb" />
                  <div className="video-card-overlay">
                    <button className="video-card-play">
                      <span className="material-symbols-outlined filled" style={{ fontSize: '32px', color: 'var(--color-on-primary-container)' }}>play_arrow</span>
                    </button>
                  </div>
                  <div className="video-card-chip">{v.label}</div>
                  <div className="video-card-info">
                    <p style={{ fontWeight: 600, color: '#fff', fontSize: '15px' }}>{v.title}</p>
                    <p className="text-label-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{v.duration}</p>
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>

          <RevealWrapper>
            <div style={{ textAlign: 'center', marginTop: '48px' }}>
              <button className="btn-secondary">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>refresh</span>
                Load More Memories
              </button>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>
            <span className="material-symbols-outlined">close</span>
          </button>
          <img src={lightbox} alt="Gallery" className="lightbox-img" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      <Footer />
    </div>
  );
}
