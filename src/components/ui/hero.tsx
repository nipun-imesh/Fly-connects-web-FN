import { useNavigate } from "react-router-dom";
import heroPhoto from "../../assets/heroSectionPhoto.png";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full inline-block overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-10" />

      {/* Hero Content */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="ml-3 mr-3 sm:ml-6 sm:mr-6 md:ml-20 max-w-5xl animate-fade-in-up flex flex-col lg:flex-row gap-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-2xl">
              Discover Your Next
              <span className="block text-primary-400 mt-1 sm:mt-2">Adventure</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8 max-w-xl leading-relaxed">
              Explore breathtaking destinations around the world with our curated tours.
              Create memories that last a lifetime with flexible, personalized trips.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <button 
                onClick={() => navigate("/tours")}
                className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-cyan-500 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-cyan-600 transform hover:scale-105 transition duration-300 shadow-lg hover:shadow-primary-500/50"
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

      {/* Hero Image with Animation */}
      <img
        className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[750px] object-cover animate-ken-burns"
        src={heroPhoto}
        alt="Travel Adventure"
      />
    </div>
  );
}
