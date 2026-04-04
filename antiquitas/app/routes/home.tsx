import type { Route } from "./+types/home";
import Nav from "../components/Nav";
import Hero from "../components/Hero";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Antiquitas · Virtual Museum" },
    { name: "description", content: "A journey through the civilisations that shaped humanity" },
  ];
}

export default function Home() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <Nav onNav={scrollTo} />
       <Hero onNav={scrollTo} />
    </div>
  );
}