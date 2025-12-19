import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm">
      <div className="max-w-[120rem] mx-auto px-6 py-5 flex justify-between items-center">
        <Link to="/" className="font-heading text-4xl text-primary-foreground hover:opacity-80 transition-opacity">
          Bali Bliss
        </Link>
        
        <nav className="flex items-center gap-8">
          <Link 
            to="/" 
            className="font-paragraph text-sm uppercase tracking-wider text-foreground hover:text-primary-foreground transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/packages" 
            className="font-paragraph text-sm uppercase tracking-wider text-foreground hover:text-primary-foreground transition-colors"
          >
            Packages
          </Link>
          <Link 
            to="/destination" 
            className="font-paragraph text-sm uppercase tracking-wider text-foreground hover:text-primary-foreground transition-colors"
          >
            Bali
          </Link>
        </nav>
      </div>
    </header>
  );
}
