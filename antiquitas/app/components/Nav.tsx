export default function Nav({ onNav }: { onNav: (id: string) => void }) {
  return (
    <nav>
      <span className="nav-logo">◈ ANTIQUITAS</span>
      <ul className="nav-links">
        <li><a onClick={() => onNav('exhibits')}>Collection</a></li>
        <li><a onClick={() => onNav('timeline')}>Timeline</a></li>
        <li><a onClick={() => onNav('tickets')}>Tickets</a></li>
      </ul>
    </nav>
  );
}