import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/ui/NavBar";
import Footer from "./components/ui/footer";
import HomePage from "./pages/HomePage";
import ToursPage from "./pages/ToursPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BookingPage from "./pages/BookingPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tours" element={<ToursPage />} />
            <Route path="/tours/:tourId/book" element={<BookingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
