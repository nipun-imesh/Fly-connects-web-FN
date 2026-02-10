import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import heroPhoto1 from "../../assets/heroSectionPhoto1.png"
import heroPhoto2 from "../../assets/heroSectionphoto2.png"
import heroPhoto3 from "../../assets/heroSectionphoto3.png"
import heroPhoto4 from "../../assets/heroSectionphoto4.png"

const heroImages = [
  heroPhoto1,
  heroPhoto2,
  heroPhoto3,
  heroPhoto4,
  heroPhoto3
];

export default function Hero() {
  const navigate = useNavigate()
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [hasHeroImageLoaded, setHasHeroImageLoaded] = useState<boolean>(() => {
    try {
      return window.sessionStorage.getItem("heroImageLoaded") === "1"
    } catch {
      return false
    }
  })

  // Preload images
  useEffect(() => {
    heroImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Image rotation timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (hasHeroImageLoaded) return

    let cancelled = false
    const img = new Image()
    img.src = heroImages[0] // Check first image
    img.onload = () => {
      if (cancelled) return
      setHasHeroImageLoaded(true)
      try {
        window.sessionStorage.setItem("heroImageLoaded", "1")
      } catch {
        // ignore
      }
    }
    img.onerror = () => {
      if (cancelled) return
      setHasHeroImageLoaded(true)
    }

    return () => {
      cancelled = true
    }
  }, [hasHeroImageLoaded])

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[750px] overflow-hidden">
      {/* Hero Content */}
      <div className="absolute inset-0 z-30 flex items-center pointer-events-none">
        <div className="ml-3 mr-3 sm:ml-6 sm:mr-6 md:ml-20 max-w-5xl animate-fade-in-up flex flex-col lg:flex-row gap-10 pointer-events-auto">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-[0_4px_3px_rgba(0,0,0,0.5)]">
              Discover Your Next
              <span className="block text-primary-400 mt-1 sm:mt-2 drop-shadow-[0_4px_3px_rgba(0,0,0,0.5)]">Adventure</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-medium mb-6 sm:mb-8 max-w-xl leading-relaxed drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              Explore breathtaking destinations around the world with our curated tours.
              Create memories that last a lifetime with flexible, personalized trips.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <button 
                onClick={() => navigate("/tours")}
                className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-red-500 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-red-600 transform hover:scale-105 transition duration-300 shadow-lg hover:shadow-primary-500/50"
              >
                Explore Tours
              </button>
              <button 
                onClick={() => navigate("/about")}
                className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-white/20 backdrop-blur-md text-white text-sm sm:text-base font-semibold rounded-lg border-2 border-white/50 hover:bg-white/30 transform hover:scale-105 transition duration-300"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Images with Animation */}
      {heroImages.map((img, index) => {
        const isCurrent = index === currentImageIndex;
        const isPrevious = index === (currentImageIndex - 1 + heroImages.length) % heroImages.length;
        
        return (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-[3000ms] ease-in-out ${
              isCurrent ? "opacity-100 z-20" : isPrevious ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={img}
              alt={`Travel Adventure ${index + 1}`}
              className={`w-full h-full object-cover ${
                isCurrent || isPrevious ? "animate-ken-burns" : ""
              }`}
              style={{ animationDuration: "45s" }}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        );
      })}
    </div>
  )
}
