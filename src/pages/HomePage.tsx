import Hero from "../components/ui/hero"
import DataCard from "../components/ui/DataCard"
import QuickEnquiry from "../components/ui/QuickEnquiry"

export default function HomePage() {
  return (
    <div>
      <section id="home">
        <Hero />
      </section>

      <section id="offer" className="py-16">
        <DataCard />
      </section>

      <section>
        <QuickEnquiry />
      </section>
    </div>
  )
}
