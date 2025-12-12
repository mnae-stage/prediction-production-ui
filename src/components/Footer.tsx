import { Facebook, Twitter, Linkedin, Youtube, ArrowUp, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

const footerLinks = {
  ministere: [
    { label: 'À propos', href: '#apropos' },
    { label: 'Organisation', href: '#organisation' },
    { label: 'Direction', href: '#direction' },
    { label: 'Historique', href: '#historique' },
  ],
  services: [
    { label: 'Appui aux agriculteurs', href: '#' },
    { label: 'Formations', href: '#' },
    { label: 'Statistiques', href: '#' },
    { label: 'Publications', href: '#' },
  ],
  ressources: [
    { label: 'Documents officiels', href: '#' },
    { label: 'Lois et règlements', href: '#' },
    { label: 'Données ouvertes', href: '#' },
    { label: 'FAQ', href: '#' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-green-dark text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <Leaf className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div>
                <p className="font-display font-bold">Ministère de l'Agriculture</p>
                <p className="text-sm opacity-80">et de l'Élevage</p>
              </div>
            </div>
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              Au service du développement agricole et de la sécurité alimentaire de Madagascar.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Ministère</h4>
            <ul className="space-y-2">
              {footerLinks.ministere.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Ressources</h4>
            <ul className="space-y-2">
              {footerLinks.ressources.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/60 text-center sm:text-left">
              © 2025 Ministère de l'Agriculture et de l'Élevage - République de Madagascar. 
              Tous droits réservés.
            </p>
            
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-foreground/10 hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 text-sm"
            >
              Retour en haut
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
