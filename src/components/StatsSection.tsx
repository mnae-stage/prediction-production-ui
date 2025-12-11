import { useCountUp } from '@/hooks/useCountUp';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Wheat, Users, MapPin, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const stats = [
  {
    icon: Wheat,
    value: 4200000,
    suffix: '',
    label: 'Tonnes de riz produites',
    description: 'Production annuelle',
  },
  {
    icon: Users,
    value: 12,
    suffix: 'M',
    label: 'Agriculteurs',
    description: 'Population agricole active',
  },
  {
    icon: MapPin,
    value: 22,
    suffix: '',
    label: 'Régions couvertes',
    description: 'Présence nationale',
  },
  {
    icon: TrendingUp,
    value: 35,
    suffix: '%',
    label: 'Du PIB',
    description: 'Contribution économique',
  },
];

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const { count, ref } = useCountUp({ 
    end: stat.value, 
    duration: 2500 
  });
  const { ref: animRef, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div
      ref={animRef}
      className={cn(
        'group relative bg-card rounded-2xl p-6 sm:p-8 hover-lift border border-border/50 opacity-0',
        isVisible && 'animate-fade-up',
        `stagger-${index + 1}`
      )}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
      
      <div className="relative">
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
          <stat.icon className="w-7 h-7 text-primary" />
        </div>
        
        <div ref={ref} className="mb-2">
          <span className="text-4xl sm:text-5xl font-display font-bold text-foreground">
            {count.toLocaleString()}
          </span>
          <span className="text-3xl sm:text-4xl font-display font-bold text-secondary">
            {stat.suffix}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-foreground mb-1">{stat.label}</h3>
        <p className="text-sm text-muted-foreground">{stat.description}</p>
      </div>
    </div>
  );
}

export function StatsSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="py-20 sm:py-28 bg-muted/50 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={ref}
          className={cn(
            'text-center max-w-3xl mx-auto mb-16 opacity-0',
            isVisible && 'animate-fade-up'
          )}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Nos chiffres clés
          </span>
          <h2 className="section-title mb-4">
            L'agriculture au cœur de l'économie
          </h2>
          <p className="section-subtitle mx-auto">
            Découvrez les chiffres qui illustrent l'importance du secteur agricole à Madagascar 
            et notre engagement pour son développement.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
