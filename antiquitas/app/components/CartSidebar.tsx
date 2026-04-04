import type { TicketType } from "../types/types";

export interface CartItem {
  id: string;
  ticket_type_id: string;
  name: string;
  quantity: number;
  unit_price: number;
  visit_date: string;
}

export default function CartSidebar({ open, onClose, items, onRemove, onCheckout }: {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
}) {
  const total = items.reduce((s, i) => s + i.unit_price * i.quantity, 0);

  return (
    <>
      <div className={`cart-overlay${open ? ' open' : ''}`} onClick={onClose} />
      <div className="cart-sidebar" style={{
        position: 'fixed', right: 0, top: 0, bottom: 0,
        width: 'min(420px, 100vw)', background: 'var(--stone-mid)',
        borderLeft: '1px solid rgba(201,168,76,0.2)', zIndex: 501,
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform .35s cubic-bezier(.16,1,.3,1)',
        display: 'flex', flexDirection: 'column'
      }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(201,168,76,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '1rem', letterSpacing: '.15em', color: 'var(--gold)' }}>Your Cart</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.4rem', cursor: 'pointer' }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {items.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', padding: '3rem 1rem' }}>Your cart is empty.</p>
          ) : items.map(item => (
            <div key={item.id} style={{ padding: '1rem 0', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                <div>
                  <div style={{ fontFamily: 'Cinzel, serif', fontSize: '.9rem', marginBottom: '.3rem' }}>{item.name}</div>
                  <div style={{ fontSize: '.82rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>{item.visit_date} · {item.quantity}×</div>
                </div>
                <div style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold)', whiteSpace: 'nowrap' }}>£{(item.unit_price * item.quantity).toFixed(2)}</div>
              </div>
              <button onClick={() => onRemove(item.id)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '.8rem', fontFamily: 'Cinzel, serif', letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer', marginTop: '.4rem' }}>Remove</button>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(201,168,76,0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Cinzel, serif', fontSize: '1.1rem', color: 'var(--gold)', marginBottom: '1.2rem' }}>
              <span>Total</span>
              <span>£{total.toFixed(2)}</span>
            </div>
            <button onClick={onCheckout} style={{ width: '100%', padding: '1rem', background: 'var(--gold)', border: 'none', color: 'var(--stone)', fontFamily: 'Cinzel, serif', fontSize: '12px', letterSpacing: '.3em', textTransform: 'uppercase', cursor: 'pointer' }}>
              Confirm Booking
            </button>
          </div>
        )}
      </div>
    </>
  );
}