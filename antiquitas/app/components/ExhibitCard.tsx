import type { Exhibit } from "../types/types";

export default function ExhibitCard({ exhibit, onClick }: { exhibit: Exhibit; onClick: (e: Exhibit) => void }) {
  return (
    <div className="exhibit-card" onClick={() => onClick(exhibit)}>
      <span className="exhibit-icon">{exhibit.icon}</span>
      <div className="exhibit-era">{exhibit.era}</div>
      <div className="exhibit-name">{exhibit.name}</div>
      <div className="exhibit-desc">{exhibit.description}</div>
      <div className="exhibit-link">Explore</div>
    </div>
  );
}