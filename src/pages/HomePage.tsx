import Hero from "../components/ui/hero";
import DataCard from "../components/ui/DataCard";
import Testimonials from "../components/ui/testimonials";

export default function HomePage() {
  return (
    <div>
      <section id="home">
        <Hero />
      </section>

      <section id="offer" className="py-16">
        <DataCard />
      </section>

      <section id="testimonials" className="py-16">
        <Testimonials />
      </section>
    </div>
  );
}
