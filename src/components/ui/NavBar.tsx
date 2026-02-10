import { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/ajmal.jpg";

export default function NavBar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const navItems = useMemo(() => [
    { name: "Home", to: "/", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { name: "Tours", to: "/tours", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { name: "About", to: "/about", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { name: "Contact", to: "/contact", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  ], []);

  const isActive = useCallback((path: string): boolean => {
    return location.pathname === path;
  }, [location.pathname]);

  const toggleMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [location.pathname, closeMenu]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "0px";
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isMobileMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        closeMenu();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen, closeMenu]);

  return (
    <>
      <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-20 border-b border-white/20 h-[60px] sm:h-[70px] md:h-[80px] bg-white/30 backdrop-blur-md fixed top-0 left-0 w-full z-50 shadow-lg transition-all duration-300">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group z-50">
          <img 
            src={Logo} 
            alt="Logo" 
            className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px] object-cover rounded-full ring-2 sm:ring-4 ring-red-100 group-hover:ring-red-300 transition-all duration-300" 
          />
          <div className="flex flex-col">
            <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent drop-shadow-sm">The Fly</span>
              <span className="text-gray-800 ml-1 font-bold relative">
                Connects
                <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-orange-400"></span>
              </span>
            </h1>
            <p className="text-[10px] sm:text-xs text-gray-500 hidden sm:block leading-tight mt-0.5">Explore the World</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 font-semibold">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className={`relative text-[18px] py-2 transition-all duration-300 group
                ${isActive(item.to) ? "text-red-700" : "text-gray-900 hover:text-red-700"}`}
            >
              {item.name}
              <span className={`absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-red-600 to-red-700 transform transition-transform duration-300
                ${isActive(item.to) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
              />
            </Link>
          ))}
        </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors z-50 relative touch-manipulation"
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMobileMenuOpen}
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span className={`bg-gray-700 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm will-change-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`} />
          <span className={`bg-gray-700 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`} />
          <span className={`bg-gray-700 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm will-change-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`} />
        </div>
      </button>
    </nav>

    {/* Mobile Menu Overlay */}
    {isMobileMenuOpen && (
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-fade-in"
        onClick={closeMenu}
        role="button"
        tabIndex={0}
        aria-label="Close menu overlay"
        onKeyDown={(e) => e.key === "Enter" && closeMenu()}
      />
    )}

    {/* Mobile Menu Drawer */}
    <div 
      className={`fixed top-0 right-0 h-full w-[220px] sm:w-[240px] bg-gradient-to-br from-white via-red-50/30 to-white shadow-2xl z-50 md:hidden will-change-transform flex flex-col ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      style={{ transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
    >
      {/* Menu Header */}
      <div className="flex items-center justify-end p-3 border-b border-gray-200/80 bg-white/90 backdrop-blur-lg">
        <button
          onClick={closeMenu}
          className="p-1.5 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation"
          aria-label="Close menu"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col p-3 sm:p-4 space-y-1 flex-1 overflow-y-auto">
        {navItems.map((item, index) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={closeMenu}
            className={`group flex items-center space-x-2.5 py-2 px-3 rounded-lg font-medium transition-all duration-200 touch-manipulation ${
              isActive(item.to) 
                ? "bg-red-50 text-red-600 shadow-md" 
                : "text-gray-700 hover:text-red-600 hover:bg-white hover:shadow-md active:scale-[0.98]"
            }`}
            style={{ 
              animation: isMobileMenuOpen ? `slideInRight 0.3s ease-out ${index * 0.05}s both` : 'none'
            }}
          >
            <svg 
              className="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-active:scale-95" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            <span className="text-sm flex-1 font-medium">{item.name}</span>
            {isActive(item.to) && (
              <svg className="w-4 h-4 flex-shrink-0 animate-fade-in" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </Link>
        ))}
      </nav>
    </div>
  </>
);
}
