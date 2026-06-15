import { useState, useEffect, useRef, useCallback } from 'react';
import StarRating from './StarRating';
import './ReviewsCarousel.css';

const GAP = 24;           // px gap between cards
const TRANSITION_MS = 500;
const INTERVAL_MS = 3500;

function getVisibleCount() {
  const w = window.innerWidth;
  if (w < 640) return 1;
  if (w < 960) return 2;
  return 3;
}

function ReviewCard({ review }) {
  return (
    <div className="rc-card glass-panel">
      <div className="rc-card-top">
        <StarRating count={review.rating || 5} />
        <span className="rc-google-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google Review
        </span>
      </div>
      <p className="rc-quote">{review.quote}</p>
      <div className="rc-author">
        <div className="rc-avatar" style={{ background: review.avatarBg, color: review.avatarColor }}>
          {review.initials}
        </div>
        <div>
          <p className="rc-name">{review.name}</p>
          <p className="rc-role">{review.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsCarousel({ reviews, mapsUrl }) {
  const n = reviews.length;

  // Clone entire set on both sides for seamless infinite loop
  const items = [...reviews, ...reviews, ...reviews];
  // We start in the "middle" copy
  const START = n; // index in items[] where the real set begins (middle copy)

  const [pos, setPos]         = useState(START);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused]   = useState(false);
  const [visible, setVisible] = useState(getVisibleCount());
  const [cardPx, setCardPx]   = useState(0);
  const viewportRef           = useRef(null);
  const posRef                = useRef(pos);
  posRef.current              = pos;

  // ── Measure card width ──────────────────────────────────────────
  const measure = useCallback(() => {
    if (!viewportRef.current) return;
    const vc = getVisibleCount();
    setVisible(vc);
    const w = viewportRef.current.offsetWidth;
    setCardPx((w - GAP * (vc - 1)) / vc);
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, [measure]);

  // ── Advance / retreat ───────────────────────────────────────────
  const advance = useCallback(() => {
    setAnimate(true);
    setPos(p => p + 1);
  }, []);

  const retreat = useCallback(() => {
    setAnimate(true);
    setPos(p => p - 1);
  }, []);

  // ── Auto timer ──────────────────────────────────────────────────
  useEffect(() => {
    if (paused) return;
    const id = setInterval(advance, INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, advance]);

  // ── Seamless infinite loop: snap back when hitting clones ───────
  useEffect(() => {
    // Moved past the last real card into tail clones
    if (pos >= n * 2) {
      const id = setTimeout(() => {
        setAnimate(false);
        setPos(n); // jump to middle copy start
      }, TRANSITION_MS);
      return () => clearTimeout(id);
    }
    // Moved before the middle copy into head clones
    if (pos < n) {
      const id = setTimeout(() => {
        setAnimate(false);
        setPos(n * 2 - 1); // jump to end of middle copy
      }, TRANSITION_MS);
      return () => clearTimeout(id);
    }
  }, [pos, n]);

  // Re-enable transition after instant snap
  useEffect(() => {
    if (!animate) {
      const id = setTimeout(() => setAnimate(true), 30);
      return () => clearTimeout(id);
    }
  }, [animate]);

  // ── Navigate to a specific dot ──────────────────────────────────
  const goTo = (realIdx) => {
    setAnimate(true);
    setPos(n + realIdx); // middle copy
    setPaused(true);
    setTimeout(() => setPaused(false), 7000);
  };

  const handleManual = (fn) => {
    fn();
    setPaused(true);
    setTimeout(() => setPaused(false), 7000);
  };

  // Current dot indicator
  const currentDot = ((pos - n) % n + n) % n;

  const translateX = -pos * (cardPx + GAP);
  const trackWidth = items.length * (cardPx + GAP) - GAP;

  return (
    <div
      className="rc-wrapper"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Left arrow */}
      <button
        className="rc-arrow rc-arrow--left"
        onClick={() => handleManual(retreat)}
        aria-label="Previous review"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>

      {/* Scrolling viewport */}
      <div className="rc-viewport" ref={viewportRef}>
        <div
          className="rc-track"
          style={{
            width: cardPx ? `${trackWidth}px` : '100%',
            transform: cardPx ? `translateX(${translateX}px)` : 'none',
            transition: animate
              ? `transform ${TRANSITION_MS}ms cubic-bezier(0.25, 1, 0.5, 1)`
              : 'none',
          }}
        >
          {items.map((review, i) => (
            <div
              key={i}
              className="rc-card-slot"
              style={{ width: cardPx ? `${cardPx}px` : '100%' }}
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>

      {/* Right arrow */}
      <button
        className="rc-arrow rc-arrow--right"
        onClick={() => handleManual(advance)}
        aria-label="Next review"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>

      {/* Dots */}
      <div className="rc-dots">
        {reviews.map((_, i) => (
          <button
            key={i}
            className={`rc-dot ${currentDot === i ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Review ${i + 1}`}
          />
        ))}
      </div>

      {/* Google Maps CTA */}
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rc-maps-cta"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Read all Google Reviews
        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>open_in_new</span>
      </a>
    </div>
  );
}
