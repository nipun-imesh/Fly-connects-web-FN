import About from "../components/ui/about";

export default function AboutPage() {
  return (
    <div className="pt-14 sm:pt-[70px] md:pt-20">
      <About />
      
      {/* Additional Team Section */}
      <div className="bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
              Meet Our <span className="text-primary-600">Team</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Passionate professionals dedicated to creating your perfect journey
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Founder & CEO",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
                bio: "20+ years of travel industry experience"
              },
              {
                name: "Michael Chen",
                role: "Head of Operations",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
                bio: "Expert in luxury travel planning"
              },
              {
                name: "Emma Rodriguez",
                role: "Adventure Specialist",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
                bio: "Certified mountain guide and explorer"
              }
            ].map((member, index) => (
              <div key={index} className="group bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 text-white">
                    <h3 className="text-xl sm:text-2xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary-300 text-sm sm:text-base font-semibold mb-2">{member.role}</p>
                    <p className="text-xs sm:text-sm text-gray-200">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
