import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { 
  Sprout, 
  FileText, 
  GraduationCap, 
  Droplets, 
  Shield, 
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
  {
    icon: Sprout,
    title: 'Appui aux Agriculteurs',
    description: 'Accompagnement technique et financier pour les exploitants agricoles.',
    color: 'bg-green-light/10 text-green-light',
  },
  {
    icon: FileText,
    title: 'Formalités Administratives',
    description: 'Démarches et documents officiels pour vos activités agricoles.',
    color: 'bg-secondary/20 text-secondary',
  },
  {
    icon: GraduationCap,
    title: 'Formation & Vulgarisation',
    description: 'Programmes de formation pour moderniser les pratiques agricoles.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Droplets,
    title: 'Gestion de l\'Eau',
    description: 'Infrastructures d\'irrigation et gestion durable des ressources en eau.',
    color: 'bg-accent/20 text-accent',
  },
  {
    icon: Shield,
    title: 'Protection des Cultures',
    description: 'Lutte contre les maladies et parasites, certification phytosanitaire.',
    color: 'bg-destructive/10 text-destructive',
  },
  {
    icon: BarChart3,
    title: 'Statistiques Agricoles',
    description: 'Données et analyses pour le pilotage du secteur agricole.',
    color: 'bg-gold/20 text-gold',
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        'group relative bg-card rounded-2xl p-6 sm:p-8 hover-lift border border-border/50 cursor-pointer opacity-0 overflow-hidden',
        isVisible && 'animate-fade-up',
        `stagger-${(index % 3) + 1}`
      )}
    >
      {/* --- Petit rond décoratif derrière la carte (comme StatCard) --- */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full 
                      -translate-y-1/2 translate-x-1/2 
                      group-hover:bg-primary/10 transition-colors duration-300 z-0" />

      {/* Contenu */}
      <div className="relative z-10">
        <div className={cn(
          'w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110',
          service.color
        )}>
          <service.icon className="w-7 h-7" />
        </div>

        <h3 className="text-xl font-display font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
          {service.title}
        </h3>

        <p className="text-muted-foreground mb-4 line-clamp-2">
          {service.description}
        </p>
      </div>

      {/* Overlay douce au hover */}
      <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 
                      transition-opacity duration-300 z-0" />
    </div>
  );
}

export function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="services" className="relative py-20 sm:py-28"
/*style={{
        backgroundImage: "url('/public/green2.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}*/
>
      
      {/* Overlay léger pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-white/26 z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={ref}
          className={cn(
            'text-center max-w-3xl mx-auto mb-16 opacity-0',
            isVisible && 'animate-fade-up'
          )}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/50 text-secondary-foreground text-sm font-semibold mb-4 text-green-900">
            Nos Services
          </span>

          <h2 className="section-title mb-4 text-green-900">
            Au service du monde agricole
          </h2>

          <p className="section-subtitle mx-auto text-green-900">
            Le Ministère met à disposition une gamme complète de services pour soutenir 
            le développement de l'agriculture et de l'élevage à Madagascar.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
