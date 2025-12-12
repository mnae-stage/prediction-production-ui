import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const news = [
  {
    id: 1,
    category: 'Événement',
    title: 'Lancement de la campagne rizicole 2024-2025',
    excerpt: 'Le Ministère annonce officiellement le début de la nouvelle campagne avec des objectifs ambitieux pour la production nationale.',
    date: '10 Déc 2024',
    readTime: '5 min',
    featured: true,
  },
  {
    id: 2,
    category: 'Formation',
    title: 'Programme de formation pour 10 000 agriculteurs',
    excerpt: 'Un nouveau programme de renforcement des capacités sera déployé dans les 22 régions.',
    date: '8 Déc 2024',
    readTime: '3 min',
    featured: false,
  },
  {
    id: 3,
    category: 'Partenariat',
    title: 'Accord avec la FAO pour la sécurité alimentaire',
    excerpt: 'Signature d\'un accord de coopération pour renforcer la résilience alimentaire.',
    date: '5 Déc 2024',
    readTime: '4 min',
    featured: false,
  },
  {
    id: 4,
    category: 'Innovation',
    title: 'Digitalisation des services agricoles',
    excerpt: 'Lancement d\'une plateforme numérique pour faciliter l\'accès aux services du ministère.',
    date: '1 Déc 2024',
    readTime: '3 min',
    featured: false,
  },
];

function FeaturedNews({ article }: { article: typeof news[0] }) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        'group relative bg-hero-gradient rounded-2xl p-6 sm:p-8 lg:p-10 overflow-hidden hover-lift opacity-0',
        isVisible && 'animate-fade-up'
      )}
   
    >
      {/*  style={{
        backgroundImage: "url('/public/activité.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
       Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <span className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold mb-4">
          {article.category}
        </span>
        
        <h3 className="text-2xl sm:text-3xl font-display font-bold text-primary-foreground mb-4 group-hover:text-secondary transition-colors">
          {article.title}
        </h3>
        
        <p className="text-primary-foreground/80 mb-6 text-lg">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-primary-foreground/70 text-sm">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </span>
          </div>
          
          <Button variant="ghost" className="text-primary-foreground hover:text-secondary hover:bg-transparent p-0 group/btn">
            Lire plus
            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>
        <div className="flex justify-center mb-3">
            <img src="/public/activité.png" alt=""
             style={{
               width: '60%',
               height: 'auto',
               borderRadius: '12px',
             }} />
          </div>
      </div>
    </div>
  );
}

function NewsCard({ article, index }: { article: typeof news[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        'group bg-card rounded-xl p-5 hover-lift border border-border/50 opacity-0',
        isVisible && 'animate-fade-up',
        `stagger-${index + 1}`
      )}
      
    >
      <span className="inline-block px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
        {article.category}
      </span>
      
      <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
        {article.title}
      </h4>
      
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {article.excerpt}
      </p>
      
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          {article.date}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {article.readTime}
        </span>
      </div>
    </div>
  );
}

export function NewsSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const featuredArticle = news.find(n => n.featured);
  const otherArticles = news.filter(n => !n.featured);

  return (
    <section id="actualites" 
    className="py-20 sm:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className={cn(
            'flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 opacity-0',
            isVisible && 'animate-fade-up'
          )}
        >
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              Actualités
            </span>
            <h2 className="section-title">
              Dernières nouvelles
            </h2>
          </div>
          
          <Button variant="outline" className="self-start sm:self-auto group">
            Toutes les actualités
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Featured article */}
          {featuredArticle && <FeaturedNews article={featuredArticle} />}
          
          {/* Other articles */}
          <div className="grid gap-4">
            {otherArticles.map((article, index) => (
              <NewsCard key={article.id} article={article} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
