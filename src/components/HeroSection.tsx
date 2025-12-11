import { ArrowRight, Leaf, Tractor, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-secondary rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse-slow stagger-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-foreground/5 rounded-full blur-3xl" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Leaf className="absolute top-1/4 left-[15%] w-12 h-12 text-secondary/40 animate-float" />
        <Leaf className="absolute top-1/3 right-[20%] w-8 h-8 text-secondary/30 animate-float stagger-2" />
        <Tractor className="absolute bottom-1/4 left-[10%] w-16 h-16 text-primary-foreground/20 animate-float stagger-3" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">

            <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-4xl font-display font-bold text-primary-foreground leading-tight mb-6 animate-fade-up stagger-1">
              <span className="text-gradient">Riziculture</span> moderne à Itasy
            </h1>

            <p className="text-lg sm:text-xl text-primary-foreground/80 max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-up stagger-2">
              Pour une riziculture durable et performante.
              Cette application vous aide à prédire la production et à soutenir le développement agricole dans la région d'Itasy.
            </p>


            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up stagger-3">
              <Button className="btn-hero group">
                S'incrire
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold shadow-gold">
                Se Connecter
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-primary-foreground/20 animate-fade-up stagger-4">
              {[
                { icon: Users, value: '80%', label: 'Population rurale' },
                { icon: Leaf, value: '25M', label: 'Hectares cultivables' },
                { icon: Tractor, value: '3000+', label: 'Projets actifs' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <p className="text-2xl sm:text-3xl font-display font-bold text-primary-foreground">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-primary-foreground/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative hidden lg:block">
            <div className="relative z-10 animate-fade-up stagger-2">
              <div className="aspect-square max-w-lg mx-auto relative">
                {/* Decorative circles */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary-foreground/20 animate-[spin_30s_linear_infinite]" />
                <div className="absolute inset-8 rounded-full border-2 border-dashed border-secondary/30 animate-[spin_25s_linear_infinite_reverse]" />

                {/* Center element */}
                <div className="absolute inset-16 rounded-full bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-20 h-20 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center shadow-gold">
                      <Leaf className="w-10 h-10 text-secondary-foreground" />
                    </div>
                    <p className="text-primary-foreground font-display font-semibold text-lg">Madagascar</p>
                    <p className="text-primary-foreground/70 text-sm">Île verte</p>
                  </div>
                </div>

                {/* Floating cards */}
                <div className="absolute -top-4 -right-4 bg-card rounded-xl p-4 shadow-lg animate-float">
                  <p className="text-xs text-muted-foreground">Production annuelle</p>
                  <p className="text-xl font-bold text-foreground">+15%</p>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-card rounded-xl p-4 shadow-lg animate-float stagger-2">
                  <p className="text-xs text-muted-foreground">Agriculteurs formés</p>
                  <p className="text-xl font-bold text-foreground">50K+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-primary-foreground/50 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
