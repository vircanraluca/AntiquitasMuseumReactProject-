export default function Hero({ onNav }: { onNav: (id: string) => void }) {
  return (
    <div className="hero">
      <div className="hero-bg" />
      <div className="deco-line" style={{ left: '15%', animationDelay: '0s' }} />
      <div className="deco-line" style={{ left: '50%', animationDelay: '1s' }} />
      <div className="deco-line" style={{ left: '85%', animationDelay: '2s' }} />
      <div className="hero-content">
        <p className="museum-label">Virtual Museum · Academic Project</p>
        <h1 className="hero-title">The Ancient <span>World</span></h1>
        <div className="gold-rule" />
        <p className="hero-subtitle">A journey through the civilisations that shaped humanity</p>
      </div>
      <div className="scroll-hint" onClick={() => onNav('exhibits')} style={{ cursor: 'pointer' }}>
        <div className="scroll-line" />
        <span>Explore</span>
      </div>
    </div>
  );
}