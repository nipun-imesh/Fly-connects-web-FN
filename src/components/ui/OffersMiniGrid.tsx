import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllServices } from "../../services/serviceData"
import type { Service } from "../../services/serviceData"

export default function OffersMiniGrid() {
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    setServices(getAllServices())
  }, [])

  if (services.length === 0) return null

  return (
    <section className="mb-6">
      <div className="mb-4 sm:mb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Offers</h2>
        <p className="text-sm sm:text-base text-gray-600 mt-1">Our current offers, displayed in the same tour card style</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {services.map((service) => (
          <Link
            key={service.id}
            to={`/offers/${service.id}`}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 border border-gray-100 hover:border-red-200 hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="flex flex-col md:flex-row">
              {/* Left: Image (tour-card style) */}
              <div className="relative md:w-5/12 h-56 sm:h-64 md:h-auto md:min-h-[240px] bg-gray-900 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent pointer-events-none" />

                {/* Offer badge */}
                <div className="absolute top-3 left-3 bg-red-600/95 rounded-lg px-3 py-2">
                  <p className="text-sm font-bold text-white">Offer</p>
                </div>
              </div>

              {/* Right: Details (tour-card style) */}
              <div className="flex-1 p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{service.title}</h3>
                    <div className="flex items-center text-gray-600 mt-2">
                      <span className="font-medium">What We Offer</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-xl">{service.icon}</span>
                  </div>
                </div>

                {service.details && service.details.length > 0 ? (
                  <div className="mt-4">
                    <h4 className="text-sm font-bold text-gray-900 mb-2">Package Inclusions</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      {service.details.slice(0, 5).map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-gray-700 mt-4 line-clamp-3">{service.description}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
