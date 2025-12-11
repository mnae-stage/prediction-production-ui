import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Adresse',
    content: 'Anosy, Antananarivo 101',
    subtitle: 'Madagascar',
  },
  {
    icon: Phone,
    title: 'Téléphone',
    content: '+261 20 22 XXX XX',
    subtitle: 'Lun - Ven: 8h - 17h',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'contact@agriculture.gov.mg',
    subtitle: 'Réponse sous 48h',
  },
  {
    icon: Clock,
    title: 'Horaires',
    content: '8h00 - 17h00',
    subtitle: 'Du lundi au vendredi',
  },
];

export function ContactSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation<HTMLFormElement>();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-hero-gradient opacity-5 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={ref}
          className={cn(
            'text-center max-w-3xl mx-auto mb-16 opacity-0',
            isVisible && 'animate-fade-up'
          )}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary-foreground text-sm font-semibold mb-4">
            Contact
          </span>
          <h2 className="section-title mb-4">
            Contactez-nous
          </h2>
          <p className="section-subtitle mx-auto">
            Notre équipe est à votre disposition pour répondre à toutes vos questions 
            concernant l'agriculture et l'élevage à Madagascar.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((info, index) => {
              const { ref: itemRef, isVisible: itemVisible } = useScrollAnimation<HTMLDivElement>();
              
              return (
                <div
                  key={info.title}
                  ref={itemRef}
                  className={cn(
                    'flex items-start gap-4 p-4 rounded-xl bg-card border border-border/50 hover-lift opacity-0',
                    itemVisible && 'animate-slide-right',
                    `stagger-${index + 1}`
                  )}
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <info.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{info.title}</p>
                    <p className="font-semibold text-foreground">{info.content}</p>
                    <p className="text-sm text-muted-foreground">{info.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className={cn(
              'lg:col-span-3 bg-card rounded-2xl p-6 sm:p-8 border border-border/50 shadow-md opacity-0',
              formVisible && 'animate-slide-left'
            )}
          >
            <h3 className="text-xl font-display font-semibold text-foreground mb-6">
              Envoyez-nous un message
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nom complet
                </label>
                <Input 
                  required
                  placeholder="Votre nom" 
                  className="bg-background border-border focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input 
                  required
                  type="email" 
                  placeholder="votre@email.com" 
                  className="bg-background border-border focus:border-primary"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                Sujet
              </label>
              <Input 
                required
                placeholder="Objet de votre message" 
                className="bg-background border-border focus:border-primary"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <Textarea 
                required
                placeholder="Votre message..." 
                rows={5}
                className="bg-background border-border focus:border-primary resize-none"
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 font-semibold"
            >
              {isSubmitting ? (
                'Envoi en cours...'
              ) : (
                <>
                  Envoyer le message
                  <Send className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
