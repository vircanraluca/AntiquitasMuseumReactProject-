export default function Nav({ onNav, cartCount, onCart }: {
  onNav: (id: string) => void;
  cartCount: number;
  onCart: () => void;
}) {
  return (
    <nav>
      <span className="nav-logo">◈ ANTIQUITAS</span>
      <ul className="nav-links">
        <li><a onClick={() => onNav('exhibits')}>Collection</a></li>
        <li><a onClick={() => onNav('timeline')}>Timeline</a></li>
        <li><a onClick={() => onNav('tickets')}>Tickets</a></li>
        <li>
          <a onClick={onCart} style={{ position: 'relative', border: '1px solid rgba(201,168,76,0.4)', padding: '6px 14px' }}>
            🛒 Cart
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: 'var(--gold)', color: 'var(--stone)', borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Cinzel, serif', fontWeight: 600 }}>
                {cartCount}
              </span>
            )}
          </a>
        </li>
      </ul>
    </nav>
  );
}