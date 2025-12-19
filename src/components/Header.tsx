import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-[100rem] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">BF</span>
          </div>
          <span className="text-xl font-bold text-foreground hidden sm:inline">Bali Flock</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-foreground font-medium hover:text-primary transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/packages"
            className="text-foreground font-medium hover:text-primary transition-colors duration-200"
          >
            Packages
          </Link>
          <Link
            to="/destination"
            className="text-foreground font-medium hover:text-primary transition-colors duration-200"
          >
            Destination
          </Link>
          <button className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105">
            Book Now
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-foreground hover:text-primary transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <div className="max-w-[100rem] mx-auto px-6 py-4 flex flex-col gap-4">
            <Link
              to="/"
              className="text-foreground font-medium hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/packages"
              className="text-foreground font-medium hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Packages
            </Link>
            <Link
              to="/destination"
              className="text-foreground font-medium hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Destination
            </Link>
            <button className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200 w-full">
              Book Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
