import { useState, useEffect } from "react";
import type { Route } from "./+types/home";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import ExhibitCard from "../components/ExhibitCard";
import Modal from "../components/Modal";
import Timeline from "../components/Timeline";
import TicketSection from "../components/TicketSection";
import CartSidebar from "../components/CartSidebar";
import type { CartItem } from "../components/CartSidebar";
import type { Exhibit, TimelineEvent, TicketType } from "../types/types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Antiquitas · Virtual Museum" },
    { name: "description", content: "A journey through the civilisations that shaped humanity" },
  ];
}

export default function Home() {
  const [exhibits, setExhibits] = useState<Exhibit[]>([]);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [modal, setModal] = useState<Exhibit | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetch('/api/exhibits').then(res => res.json()).then(setExhibits);
    fetch('/api/timeline').then(res => res.json()).then(setTimeline);
    fetch('/api/tickets').then(res => res.json()).then(setTickets);
  }, []);

  const addToCart = (item: CartItem) => setCart(p => [...p, item]);
  const removeFromCart = (id: string) => setCart(p => p.filter(i => i.id !== id));

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    const visit_date = cart[0].visit_date;
    const items = cart.map(i => ({
      ticket_type_id: i.ticket_type_id,
      quantity: i.quantity,
      unit_price: i.unit_price,
    }));

    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visit_date, items }),
    });

    const data = await res.json();
    if (data.success) {
      setCart([]);
      setCartOpen(false);
      alert(`Booking confirmed! Reference: #${data.bookingId}`);
    }
  };

  return (
    <div>
      <Nav onNav={scrollTo} cartCount={cart.length} onCart={() => setCartOpen(true)} />
      <Hero onNav={scrollTo} />

      <section id="exhibits">
        <div className="section-header">
          <span className="section-tag">Permanent Collection</span>
          <h2 className="section-title">Legendary Artefacts</h2>
          <p className="section-desc">Discover the objects that survived millennia to tell us the story of our world</p>
        </div>
        <div className="exhibits-grid">
          {exhibits.map(e => (
            <ExhibitCard key={e.id} exhibit={e} onClick={setModal} />
          ))}
        </div>
      </section>

      <section id="timeline">
        <div className="section-header">
          <span className="section-tag">Through the Ages</span>
          <h2 className="section-title">Timeline of Civilisations</h2>
          <p className="section-desc">From the first cities to the fall of Rome</p>
        </div>
        <Timeline events={timeline} />
      </section>

      <section id="tickets">
        <div className="section-header">
          <span className="section-tag">Plan Your Visit</span>
          <h2 className="section-title">Book Tickets</h2>
          <p className="section-desc">Choose your ticket type, select a date, and add to your cart</p>
        </div>
        <TicketSection tickets={tickets} onAdd={addToCart} />
      </section>

      <footer>◈  ANTIQUITAS · Virtual Museum · Academic Project  ◈</footer>

      <Modal exhibit={modal} onClose={() => setModal(null)} />
      <CartSidebar
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
}