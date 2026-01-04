import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Code2, Users, Award, Bike, Gamepad2 } from 'lucide-react';

export const About = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: Code2, label: t('experience.years'), value: '8+' },
    { icon: Award, label: t('experience.projects'), value: '100+' },
    { icon: Users, label: t('experience.clients'), value: '50+' },
  ];

  const interests = [
    { icon: Code2, label: t('about.interests.webDev.title'), description: t('about.interests.webDev.description') },
    { icon: Bike, label: t('about.interests.motorcycles.title'), description: t('about.interests.motorcycles.description') },
    { icon: Gamepad2, label: t('about.interests.gameDev.title'), description: t('about.interests.gameDev.description') },
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in">
          {t('about.title')}
        </h2>

        <div className="max-w-4xl mx-auto">
          {/* Professional Journey */}
          <div className="mb-12 animate-fade-in">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {t('about.journey.intro')}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('about.journey.passion')}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className="p-6 text-center bg-card border-border hover:border-primary transition-all hover:shadow-glow animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              );
            })}
          </div>

          {/* Interests & Hobbies */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 animate-fade-in">
              {t('about.interests.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {interests.map((interest, index) => {
                const Icon = interest.icon;
                return (
                  <Card
                    key={index}
                    className="p-6 bg-card border-border hover:border-primary transition-all hover:shadow-glow group animate-fade-in"
                    style={{ animationDelay: `${(index + 3) * 0.1}s` }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">{interest.label}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{interest.description}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
