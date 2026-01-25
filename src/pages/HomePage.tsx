import { useEffect } from "react"
import Hero from "../components/ui/hero"
import DataCard from "../components/ui/DataCard"
import QuickEnquiry from "../components/ui/QuickEnquiry"
import { updatePageSEO, addStructuredData } from "../services/seoService"

export default function HomePage() {
  useEffect(() => {
    updatePageSEO({
      title: "FlyConnect - Best Tour & Travel Packages in Sri Lanka",
      description: "Discover unforgettable travel experiences with FlyConnect. Explore inbound and outbound tours, special offers, and travel packages. Book your adventure today!",
      keywords: "tours, travel packages, Sri Lanka tours, outbound tours, inbound tours, travel deals, vacation packages",
      url: "https://flyconnects.com/",
    })

    addStructuredData({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "FlyConnect",
      "url": "https://flyconnects.com/",
      "logo": "https://flyconnects.com/flyconnectLogo.png",
      "sameAs": [
        "https://web.facebook.com/people/The-Fly-Connects/100090108482861/",
        "https://www.tiktok.com/@theflyconnects"
      ]
    })
  }, [])

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
