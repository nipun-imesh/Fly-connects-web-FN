interface Stat {
  value: string;
  label: string;
  icon: string;
}

interface Feature {
  title: string;
  description: string;
  icon: string;
}

export default function About() {
  const stats: Stat[] = [
    { value: "15+", label: "Years Experience", icon: "🏆" },
    { value: "50K+", label: "Happy Travelers", icon: "😊" },
    { value: "150+", label: "Destinations", icon: "🌍" },
    { value: "98%", label: "Satisfaction Rate", icon: "⭐" }
  ];

  const features: Feature[] = [
    {
      title: "Expert Guides",
      description: "Our certified guides have decades of experience and deep local knowledge",
      icon: "👨‍🏫"
    },
    {
      title: "Best Prices",
      description: "Competitive rates with no hidden fees and flexible payment options",
      icon: "💰"
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock customer service for peace of mind during your journey",
      icon: "🛟"
    },
    {
      title: "Safety First",
      description: "Comprehensive insurance and safety protocols for worry-free adventures",
      icon: "🔒"
    }
  ];

  return (
    <div className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 via-white to-cyan-50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-10 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-subtle"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-subtle"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            About <span className="text-cyan-500">Our Journey</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            For over 15 years, we've been crafting unforgettable travel experiences that inspire, excite, and create lifelong memories
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-12 md:mb-16">
          {/* Left Side - Story */}
          <div className="space-y-4 sm:space-y-6 animate-slide-in-left">
            <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-xl">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">Our Story</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                Founded in 2008, we began as a small team of passionate travelers who wanted to share 
                the world's wonders with others. Today, we're a leading travel agency with a global presence 
                and a commitment to sustainable tourism.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                Every journey we design is crafted with care, blending adventure, culture, and comfort 
                to create experiences that go beyond typical tourism. We believe travel should transform 
                lives and create connections across cultures.
              </p>
              <div className="flex items-center space-x-3 sm:space-x-4 pt-3 sm:pt-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-2xl sm:text-3xl">
                  ✈️
                </div>
                <div>
                  <p className="font-bold text-sm sm:text-base text-gray-800">Our Mission</p>
                  <p className="text-xs sm:text-sm text-gray-600">Making the world accessible to everyone</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Image Collage */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 animate-slide-in-right">
            <div className="space-y-3 sm:space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&q=80" 
                alt="Travel Experience" 
                className="rounded-xl sm:rounded-2xl shadow-lg w-full h-36 sm:h-40 md:h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
              <img 
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=80" 
                alt="Adventure" 
                className="rounded-xl sm:rounded-2xl shadow-lg w-full h-48 sm:h-56 md:h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="space-y-3 sm:space-y-4 pt-6 sm:pt-8">
              <img 
                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80" 
                alt="Destinations" 
                className="rounded-xl sm:rounded-2xl shadow-lg w-full h-48 sm:h-56 md:h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
              <img 
                src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=400&q=80" 
                alt="Culture" 
                className="rounded-xl sm:rounded-2xl shadow-lg w-full h-36 sm:h-40 md:h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12 md:mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3">{stat.icon}</div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-600 mb-1 sm:mb-2">{stat.value}</div>
              <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-gradient-to-br hover:from-cyan-50 hover:to-blue-50"
            >
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-cyan-600 transition-colors">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
