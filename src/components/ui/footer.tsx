import { Link } from "react-router-dom";

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactElement;
}

interface FooterLink {
  title: string;
  url: string;
}

export default function Footer() {
  const currentYear: number = new Date().getFullYear();

  const socialLinks: SocialLink[] = [
    {
      name: "Facebook",
      url: "https://web.facebook.com/people/The-Fly-Connects/100090108482861/",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
   {
  name: "TikTok",
  url: "https://www.tiktok.com/@theflyconnectsx",
  icon: (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21 8.153a6.46 6.46 0 0 1-3.77-1.197 6.53 6.53 0 0 1-2.36-3.756h-3.54v12.02a2.89 2.89 0 1 1-2.89-2.89c.28 0 .55.04.8.11V8.8a6.41 6.41 0 0 0-.8-.05 6.36 6.36 0 1 0 6.36 6.36V10.6a9.77 9.77 0 0 0 5.77 1.87V8.153z" />
    </svg>
  )
}

  ];

  const quickLinks: FooterLink[] = [
    { title: "Home", url: "/" },
    { title: "Tours", url: "/tours" },
    { title: "About", url: "/about" },
    { title: "Contact", url: "/contact" }
  ];

  const supportLinks: FooterLink[] = [
    { title: "Contact Us", url: "#" },
    { title: "FAQs", url: "#" },
    { title: "Terms & Conditions", url: "#" },
    { title: "Privacy Policy", url: "#" }
  ];

  const openingHours = [
    { day: "Mon - Fri", hours: "9:00 AM - 5:30 PM" },
    { day: "Saturday", hours: "9:00 AM - 1:30 PM" },
    { day: "Sunday", hours: "Closed" }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="text-4xl">✈️</div>
              <h3 className="text-2xl font-bold text-cyan-400">TravelWorld</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Creating unforgettable travel experiences around the globe since 2008. 
              Your adventure awaits!
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-cyan-500 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-cyan-400">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.url}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 cursor-pointer flex items-center space-x-2"
                  >
                    <span className="text-cyan-400">→</span>
                    <span>{link.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-cyan-400">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.url}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center space-x-2"
                  >
                    <span className="text-cyan-400">→</span>
                    <span>{link.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-cyan-400">Opening Hours</h4>
            <ul className="space-y-3">
              {openingHours.map((item) => (
                <li key={item.day} className="flex flex-col text-gray-400">
                  <span className="font-semibold text-gray-300">{item.day}</span>
                  <span className="text-sm">{item.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-cyan-400">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400">
                <svg className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>No:28, Negombo Road, Kurunegala, Sri Lanka</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-400">
                <svg className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Theflyconnects@gmail.com</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-400">
                <svg className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                <span>+94 77 042 6007</span>
                <br />
                <span>+94 37 713 3535</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-center md:text-left">
              © {currentYear} TravelWorld by Ajmal. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-gray-400 text-sm">
              <span className="flex items-center space-x-2">
                <span className="text-cyan-400">🛡️</span>
                <span>SSL Protected</span>
              </span>
              <span className="flex items-center space-x-2">
                <span className="text-cyan-400">⭐</span>
                <span>Trusted Service</span>
              </span>
            </div>
          </div>
          <p className="text-gray-500 text-center text-sm mt-4">
            Created with passion for travel enthusiasts worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}