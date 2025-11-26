import { useMemo, useState } from "react";

interface Tour {
  id: number;
  title: string;
  location: string;
  price: string;
  duration: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  difficulty: string;
}

type DifficultyFilter = "All" | "Easy" | "Moderate" | "Challenging";

const TOURS_DATA: Tour[] = [
    {
      id: 1,
      title: "Mountain Paradise",
      location: "Swiss Alps",
      price: "$2,499",
      duration: "7 Days",
      description: "Experience the breathtaking beauty of the Swiss Alps with guided mountain trails.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      rating: 4.9,
      reviews: 234,
      difficulty: "Moderate"
    },
    {
      id: 2,
      title: "Tropical Paradise",
      location: "Maldives",
      price: "$3,299",
      duration: "5 Days",
      description: "Relax on pristine beaches and explore vibrant coral reefs in crystal clear waters.",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
      rating: 5.0,
      reviews: 412,
      difficulty: "Easy"
    },
    {
      id: 3,
      title: "Desert Adventure",
      location: "Dubai, UAE",
      price: "$1,899",
      duration: "4 Days",
      description: "Explore golden dunes, experience luxury, and witness stunning desert sunsets.",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
      rating: 4.8,
      reviews: 189,
      difficulty: "Easy"
    },
    {
      id: 4,
      title: "Ancient Wonders",
      location: "Machu Picchu, Peru",
      price: "$2,799",
      duration: "6 Days",
      description: "Journey through history exploring ancient Incan ruins and mystical landscapes.",
      image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80",
      rating: 4.9,
      reviews: 567,
      difficulty: "Challenging"
    }
];

export default function Tours() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>("All");

  const filteredTours = useMemo(() => {
    return TOURS_DATA.filter((tour) => {
      const matchesSearch =
        searchTerm.trim().length === 0 ||
        tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDifficulty =
        difficultyFilter === "All" || tour.difficulty === difficultyFilter;

      return matchesSearch && matchesDifficulty;
    });
  }, [difficultyFilter, searchTerm]);

  const getDifficultyColor = (difficulty: string): string => {

    switch (difficulty) {
      case "Easy": return "bg-green-500";
      case "Moderate": return "bg-yellow-500";
      case "Challenging": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-20 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16 animate-fade-in-up">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Popular <span className="text-cyan-500">Tours</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of extraordinary travel experiences around the globe
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by destination or tour name..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-gray-800 placeholder-gray-400"
              />
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
                </svg>
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {(["All", "Easy", "Moderate", "Challenging"] as DifficultyFilter[]).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setDifficultyFilter(level)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  difficultyFilter === level
                    ? "bg-cyan-500 text-white border-cyan-500 shadow-md shadow-cyan-500/40"
                    : "bg-white text-gray-700 border-gray-200 hover:border-cyan-400 hover:text-cyan-600"
                }`}
              >
                {level === "All" ? "All difficulties" : level}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-10 bg-white rounded-2xl shadow-inner">
              No tours match your filters. Try a different destination or difficulty.
            </div>
          )}
          {filteredTours.map((tour) => (

            <div
              key={tour.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredId(tour.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Difficulty Badge */}
                <div className={`absolute top-4 right-4 ${getDifficultyColor(tour.difficulty)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                  {tour.difficulty}
                </div>

                {/* Price Tag */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <p className="text-2xl font-bold text-cyan-600">{tour.price}</p>
                  <p className="text-xs text-gray-600">per person</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-gray-800">{tour.title}</h3>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500 text-lg">★</span>
                    <span className="text-gray-700 font-semibold">{tour.rating}</span>
                  </div>
                </div>

                <div className="flex items-center text-gray-500 mb-3">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{tour.location}</span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {tour.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{tour.duration}</span>
                  </div>
                  <button className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    hoveredId === tour.id 
                      ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/50" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}>
                    Book Now
                  </button>
                </div>

                <div className="text-xs text-gray-400 mt-2">
                  {tour.reviews} reviews
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}