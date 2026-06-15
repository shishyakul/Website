export default function StarRating({ count = 5 }) {
  return (
    <div style={{ display: 'flex', gap: '2px', color: 'var(--color-primary)' }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="material-symbols-outlined filled" style={{ fontSize: '16px' }}>
          star
        </span>
      ))}
    </div>
  );
}
