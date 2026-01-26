import { useEffect } from "react"
import Hero from "../components/ui/hero"
import DataCard from "../components/ui/DataCard"
import QuickEnquiry from "../components/ui/QuickEnquiry"
import { updatePageSEO, addStructuredData } from "../services/seoService"

export default function HomePage() {
  useEffect(() => {
    updatePageSEO({
      title: "The Fly Connects - Best Tour & Travel Packages in Sri Lanka | Inbound & Outbound Tours",
      description: "Discover unforgettable travel experiences with The Fly Connects. Explore inbound Sri Lanka tours, outbound international tours, special offers, and customized travel packages. Expert tour operators based in Kurunegala.",
      keywords: "tours, travel packages, Sri Lanka tours, outbound tours, inbound tours, travel deals, vacation packages, The Fly Connects",
      url: "https://theflyconnects.com/",
    })

    addStructuredData({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "The Fly Connects",
      "url": "https://theflyconnects.com/",
      "logo": "https://theflyconnects.com/flyconnectLogo.png",
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
