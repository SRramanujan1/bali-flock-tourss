import { Mail, Phone, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary border-t border-buttonborder">
      <div className="max-w-[120rem] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-heading text-3xl text-primary-foreground mb-4">
              Bali Flock Tours
            </h3>
            <p className="font-paragraph text-base text-foreground">
              Creating unforgettable group experiences in paradise
            </p>
          </div>
          
          <div>
            <h4 className="font-paragraph text-lg uppercase text-primary-foreground mb-4">
              Contact Us
            </h4>
            <div className="space-y-3">
              <a 
                href="mailto:info@balibliss.com" 
                className="flex items-center gap-3 font-paragraph text-base text-foreground hover:text-primary-foreground transition-colors"
              >
                <Mail className="w-5 h-5" />
                info@balibliss.com
              </a>
              <a 
                href="tel:+64212345678" 
                className="flex items-center gap-3 font-paragraph text-base text-foreground hover:text-primary-foreground transition-colors"
              >
                <Phone className="w-5 h-5" />
                +64 21 234 5678
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-paragraph text-lg uppercase text-primary-foreground mb-4">
              Follow Us
            </h4>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-buttonborder flex items-center justify-center text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-buttonborder flex items-center justify-center text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-buttonborder text-center">
          <p className="font-paragraph text-sm text-foreground">
            © {new Date().getFullYear()} Bali Flock Tours. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
