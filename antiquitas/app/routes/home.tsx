import { useState, useEffect } from "react";
import type { Route } from "./+types/home";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import ExhibitCard from "../components/ExhibitCard";
import type { Exhibit } from "../types/types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Antiquitas · Virtual Museum" },
    { name: "description", content: "A journey through the civilisations that shaped humanity" },
  ];
}

export default function Home() {
  const [exhibits, setExhibits] = useState<Exhibit[]>([]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetch('/api/exhibits')
      .then(res => res.json())
      .then(data => setExhibits(data));
  }, []);

  return (
    <div>
      <Nav onNav={scrollTo} />
      <Hero onNav={scrollTo} />

      <section id="exhibits">
        <div className="section-header">
          <span className="section-tag">Permanent Collection</span>
          <h2 className="section-title">Legendary Artefacts</h2>
          <p className="section-desc">Discover the objects that survived millennia to tell us the story of our world</p>
        </div>
        <div className="exhibits-grid">
          {exhibits.map(e => (
            <ExhibitCard key={e.id} exhibit={e} onClick={() => {}} />
          ))}
        </div>
      </section>
    </div>
  );
}