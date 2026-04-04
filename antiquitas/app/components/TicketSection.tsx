import { useState } from "react";
import type { TicketType } from "../types/types";

export default function TicketSection({ tickets }: { tickets: TicketType[] }) {
  const [qtys, setQtys] = useState<Record<string, number>>({});
  const [date, setDate] = useState('');
  const today = new Date().toISOString().split('T')[0];

  const change = (id: string, delta: number) => {
    setQtys(p => ({ ...p, [id]: Math.max(0, (p[id] || 0) + delta) }));
  };

  const total = tickets.reduce((s, t) => s + t.price * (qtys[t.id] || 0), 0);
  const anyQty = Object.values(qtys).some(v => v > 0);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
      <div style={{ background: 'var(--stone-mid)', border: '1px solid rgba(201,168,76,0.2)', padding: '2rem' }}>
        <h3 style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold)', marginBottom: '1.5rem' }}>Select Tickets</h3>
        {tickets.map(t => (
          <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
            <div>
              <div style={{ fontFamily: 'Cinzel, serif' }}>{t.name}</div>
              <div style={{ color: 'var(--gold)', fontSize: '.85rem', fontStyle: 'italic' }}>£{t.price}.00 per person</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '.8rem', fontStyle: 'italic' }}>{t.description}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button className="qty-btn" onClick={() => change(t.id, -1)}>−</button>
              <span style={{ fontFamily: 'Cinzel, serif', minWidth: '20px', textAlign: 'center' }}>{qtys[t.id] || 0}</span>
              <button className="qty-btn" onClick={() => change(t.id, 1)}>+</button>
            </div>
          </div>
        ))}
        <div style={{ marginTop: '1.2rem' }}>
          <label style={{ fontFamily: 'Cinzel, serif', fontSize: '10px', letterSpacing: '.3em', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '.5rem' }}>Visit Date</label>
          <input type="date" min={today} value={date} onChange={e => setDate(e.target.value)}
            style={{ background: 'var(--stone)', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--text-main)', padding: '.6rem 1rem', width: '100%', fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem' }} />
        </div>
        <button disabled={!anyQty || !date}
          style={{ width: '100%', marginTop: '1.5rem', padding: '.9rem', background: 'none', border: '1px solid var(--gold)', color: 'var(--gold)', fontFamily: 'Cinzel, serif', fontSize: '11px', letterSpacing: '.3em', textTransform: 'uppercase', cursor: 'pointer', opacity: (!anyQty || !date) ? 0.4 : 1 }}>
          Add to Cart
        </button>
      </div>

      <div style={{ background: 'var(--stone-mid)', border: '1px solid rgba(201,168,76,0.2)', padding: '2rem' }}>
        <h3 style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold)', marginBottom: '1.5rem' }}>Order Summary</h3>
        {anyQty ? (
          <div>
            {tickets.filter(t => qtys[t.id] > 0).map(t => (
              <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '.4rem 0' }}>
                <span>{t.name} ×{qtys[t.id]}</span>
                <span>£{(t.price * qtys[t.id]).toFixed(2)}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(201,168,76,0.2)', marginTop: '.5rem', paddingTop: '.8rem', fontFamily: 'Cinzel, serif', color: 'var(--gold)' }}>
              <span>Total</span>
              <span>£{total.toFixed(2)}</span>
            </div>
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No tickets selected yet.</p>
        )}
      </div>
    </div>
  );
}