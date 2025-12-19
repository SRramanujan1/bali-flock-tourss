import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm">
      <div className="max-w-[120rem] mx-auto px-6 py-5 flex justify-between items-center">
        <Link to="/" className="group flex items-center gap-2">
          <div className="relative">
            <span className="text-3xl font-black tracking-tighter text-primary-foreground group-hover:text-primary-foreground/80 transition-colors duration-300">
              BALI
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-primary-foreground to-transparent group-hover:w-full transition-all duration-500" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-foreground/70 group-hover:text-primary-foreground/90 transition-colors">
              Flock
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-primary-foreground group-hover:text-primary-foreground/80 transition-colors">
              Tours
            </span>
          </div>
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
