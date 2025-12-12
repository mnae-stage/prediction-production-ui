import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Services', href: '#services' },
  { label: 'Actualités', href: '#actualites' },
  { label: 'Contact', href: '#contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#accueil');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Détecter quelle section est visible
      let currentSection = '#accueil';
      navLinks.forEach(link => {
        const id = link.href.replace('#', '');
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom > 100) {
            currentSection = link.href;
          }
        }
      });
      setCurrentHash(currentSection);
    };

    window.addEventListener('scroll', handleScroll);

    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#accueil');
    };
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Fonction pour scroll smooth
  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault(); 
    const id = href.replace('#', '');
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false); 
    setCurrentHash(href);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-card/95 backdrop-blur-md shadow-md py-2'
          : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a href="#accueil" onClick={(e) => handleNavClick(e, '#accueil')} className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full overflow-hidden transition-transform group-hover:scale-110">
              <img
                src="/mnae-logo.png"
                alt="Logo MAE"
                className="w-full h-full object-cover"
              />
            </div>

            <div
              className={cn(
                'hidden sm:block transition-colors',
                isScrolled ? 'text-foreground' : 'text-primary-foreground'
              )}
            >
              <p className="font-display font-bold text-sm leading-tight">Ministère de l'Agriculture</p>
              <p className="text-xs opacity-80">et de l'Élevage</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 relative">
            {navLinks.map((link) => {
              const isActive = currentHash === link.href;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    'px-4 py-2 rounded-lg font-medium transition-all relative',
                    isScrolled
                      ? 'text-foreground hover:bg-muted'
                      : 'text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10'
                  )}
                >
                  {link.label}
                  {/* Ligne orange animée */}
                  <span
                    className={cn(
                      'absolute left-0 bottom-0 h-1 bg-orange-500 rounded transition-all duration-500',
                      isActive ? 'w-full animate-slide-in' : 'w-0'
                    )}
                  />
                </a>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block"></div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              'lg:hidden p-2 rounded-lg transition-colors',
              isScrolled
                ? 'text-foreground hover:bg-muted'
                : 'text-primary-foreground hover:bg-primary-foreground/10'
            )}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 animate-fade-in">
            <div className="bg-card rounded-xl shadow-lg border border-border p-4 space-y-2">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="block px-4 py-3 rounded-lg font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    {link.label}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
