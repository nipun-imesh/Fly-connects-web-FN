import { useState } from "react";

interface Tour {
  id: number;
  title: string;
  location: string;
  price: number;
  duration: string;
  description: string;
  images: string[];
  rating: number;
  reviews: number;
  difficulty: string;
  category: string;
}

export default function ToursPage() {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const tours: Tour[] = [
    {
      id: 1,
      title: "Mountain Paradise",
      location: "Swiss Alps",
      price: 2499,
      duration: "7 Days",
      description: "Experience the breathtaking beauty of the Swiss Alps with guided mountain trails.",
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
        "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
        "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&q=80",
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80"
      ],
      rating: 4.9,
      reviews: 234,
      difficulty: "Moderate",
      category: "Adventure"
    },
    {
      id: 2,
      title: "Tropical Paradise",
      location: "Maldives",
      price: 3299,
      duration: "5 Days",
      description: "Relax on pristine beaches and explore vibrant coral reefs in crystal clear waters.",
      images: [
        "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
        "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80",
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80"
      ],
      rating: 5.0,
      reviews: 412,
      difficulty: "Easy",
      category: "Beach"
    },
    {
      id: 3,
      title: "Desert Adventure",
      location: "Dubai, UAE",
      price: 1899,
      duration: "4 Days",
      description: "Explore golden dunes, experience luxury, and witness stunning desert sunsets.",
      images: [
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
        "https://images.unsplash.com/photo-1546412414-e1885259563a?w=800&q=80",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80"
      ],
      rating: 4.8,
      reviews: 189,
      difficulty: "Easy",
      category: "Adventure"
    },
    {
      id: 4,
      title: "Ancient Wonders",
      location: "Machu Picchu, Peru",
      price: 2799,
      duration: "6 Days",
      description: "Journey through history exploring ancient Incan ruins and mystical landscapes.",
      images: [
        "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80",
        "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80",
        "https://images.unsplash.com/photo-1531065208531-4036c0dba3ca?w=800&q=80",
        "https://images.unsplash.com/photo-1582719369371-46b048f6d87d?w=800&q=80"
      ],
      rating: 4.9,
      reviews: 567,
      difficulty: "Challenging",
      category: "Cultural"
    },
    {
      id: 5,
      title: "Northern Lights",
      location: "Iceland",
      price: 3499,
      duration: "8 Days",
      description: "Witness the magical Aurora Borealis and explore Iceland's dramatic landscapes.",
      images: [
        "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=800&q=80",
        "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80",
        "https://images.unsplash.com/photo-1531168556467-80aace0d0144?w=800&q=80",
        "https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=800&q=80"
      ],
      rating: 5.0,
      reviews: 328,
      difficulty: "Moderate",
      category: "Nature"
    },
    {
      id: 6,
      title: "Safari Experience",
      location: "Serengeti, Tanzania",
      price: 4299,
      duration: "10 Days",
      description: "Embark on an unforgettable wildlife safari through Africa's most iconic landscapes.",
      images: [
        "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
        "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80",
        "https://images.unsplash.com/photo-1535338454770-6c4e6685e69d?w=800&q=80",
        "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800&q=80"
      ],
      rating: 4.9,
      reviews: 445,
      difficulty: "Moderate",
      category: "Wildlife"
    },
    {
      id: 7,
      title: "Santorini Sunset",
      location: "Santorini, Greece",
      price: 2199,
      duration: "5 Days",
      description: "Experience the iconic white-washed buildings and stunning sunsets of this Mediterranean paradise.",
      images: [
        "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80",
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
        "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=80",
        "https://images.unsplash.com/photo-1591689161998-b9f9ff5fc6f7?w=800&q=80"
      ],
      rating: 4.8,
      reviews: 302,
      difficulty: "Easy",
      category: "Beach"
    },
    {
      id: 8,
      title: "Tokyo Explorer",
      location: "Tokyo, Japan",
      price: 3199,
      duration: "7 Days",
      description: "Immerse yourself in the perfect blend of ancient tradition and cutting-edge modernity.",
      images: [
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
        "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800&q=80",
        "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80",
        "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&q=80"
      ],
      rating: 4.9,
      reviews: 521,
      difficulty: "Easy",
      category: "Cultural"
    },
    {
      id: 9,
      title: "Amazon Rainforest",
      location: "Amazon Basin, Brazil",
      price: 2899,
      duration: "6 Days",
      description: "Venture into the world's largest rainforest and discover incredible biodiversity.",
      images: [
        "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
        "https://images.unsplash.com/photo-1587138808182-85deaa02da0d?w=800&q=80",
        "https://images.unsplash.com/photo-1583552907108-d75c8ba9929d?w=800&q=80",
        "https://images.unsplash.com/photo-1606136563134-0abca0d26ea8?w=800&q=80"
      ],
      rating: 4.7,
      reviews: 198,
      difficulty: "Challenging",
      category: "Nature"
    },
    {
      id: 10,
      title: "Great Barrier Reef",
      location: "Queensland, Australia",
      price: 3799,
      duration: "8 Days",
      description: "Dive into the world's largest coral reef system and witness marine life like never before.",
      images: [
        "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&q=80",
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
        "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=800&q=80",
        "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80"
      ],
      rating: 5.0,
      reviews: 389,
      difficulty: "Moderate",
      category: "Adventure"
    }
  ];

  const openModal = (tour: Tour): void => {
    setSelectedTour(tour);
    setCurrentImageIndex(0);
    document.body.style.overflow = "hidden";
  };

  const closeModal = (): void => {
    setSelectedTour(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = "unset";
  };

  const nextImage = (): void => {
    if (selectedTour) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedTour.images.length);
    }
  };

  const prevImage = (): void => {
    if (selectedTour) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedTour.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-5">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-3 sm:mb-4">
            Explore Our <span className="text-primary-600">Tours</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Discover extraordinary travel experiences tailored to your adventure style
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {tours.map((tour, index) => (
            <div
              key={tour.id}
              className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openModal(tour)}
            >
              {/* Image Container */}
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                <div className="grid grid-cols-2 grid-rows-2 gap-1 h-full">
                  {tour.images.map((image, imgIndex) => (
                    <div key={imgIndex} className="relative overflow-hidden">
                      <img
                        src={image}
                        alt={`${tour.title} ${imgIndex + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 md:p-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">{tour.title}</h3>

                <div className="flex items-center text-gray-500 mb-2 sm:mb-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-base font-medium">{tour.location}</span>
                </div>

                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                  {tour.description}
                </p>

                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 pt-3 sm:pt-4 border-t border-gray-200">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{tour.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Popup */}
        {selectedTour && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4"
            onClick={closeModal}
          >
            <div 
              className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-white/90 hover:bg-white rounded-full p-1.5 sm:p-2 transition-all duration-300 shadow-lg"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image Slider */}
              <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 bg-gray-900">
                <img
                  src={selectedTour.images[currentImageIndex]}
                  alt={`${selectedTour.title} ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Previous Button */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 transition-all duration-300 shadow-lg"
                >
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Next Button */}
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 transition-all duration-300 shadow-lg"
                >
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm">
                  {currentImageIndex + 1} / {selectedTour.images.length}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">{selectedTour.title}</h2>

                <div className="flex items-center text-gray-600 mb-4 sm:mb-6">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base sm:text-lg font-medium">{selectedTour.location}</span>
                </div>

                <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed">
                  {selectedTour.description}
                </p>

                <div className="flex items-center space-x-2 text-gray-600 pt-4 sm:pt-6 border-t border-gray-200">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-base sm:text-lg font-medium">{selectedTour.duration}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
