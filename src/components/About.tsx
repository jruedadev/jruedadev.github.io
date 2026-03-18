import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Code2, Users, Award, Bike, Gamepad2 } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';

export const About = () => {
  const { t, i18n } = useTranslation();
  const { data: profile, isLoading } = useProfile();

  const bio = i18n.language === 'es' ? profile?.bio_es : profile?.bio_en;

  const stats = [
    { icon: Code2, label: t('experience.years'), value: isLoading ? '...' : `${profile?.years_experience}+` },
    { icon: Award, label: t('experience.projects'), value: isLoading ? '...' : `${profile?.projects_count}+` },
    { icon: Users, label: t('experience.clients'), value: isLoading ? '...' : `${profile?.clients_count}+` },
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
          <div className="mb-12 animate-fade-in">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {isLoading ? '...' : bio}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index}
                  className="p-6 text-center bg-card border-border hover:border-primary transition-all hover:shadow-glow animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}>
                  <Icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              );
            })}
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 animate-fade-in">
              {t('about.interests.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {interests.map((interest, index) => {
                const Icon = interest.icon;
                return (
                  <Card key={index}
                    className="p-6 bg-card border-border hover:border-primary transition-all hover:shadow-glow animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}>
                    <Icon className="h-8 w-8 mb-4 text-primary" />
                    <h4 className="text-lg font-semibold mb-2">{interest.label}</h4>
                    <p className="text-sm text-muted-foreground">{interest.description}</p>
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