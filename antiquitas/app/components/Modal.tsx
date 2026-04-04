import { useEffect } from "react";
import type { Exhibit } from "../types/types";

export default function Modal({ exhibit, onClose }: { exhibit: Exhibit | null; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className={`modal-overlay${exhibit ? ' open' : ''}`} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      {exhibit && (
        <div className="modal">
          <button className="modal-close" onClick={onClose}>✕</button>
          <span className="modal-icon">{exhibit.icon}</span>
          <div className="modal-era">{exhibit.era}</div>
          <div className="modal-title">{exhibit.name}</div>
          <p className="modal-body">{exhibit.body}</p>
          <div className="modal-facts">
            {exhibit.facts.map(f => (
              <div key={f.label}>
                <div className="fact-label">{f.label}</div>
                <div className="fact-value">{f.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}