import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Globe, ArrowRight } from 'lucide-react';
import profilePhoto from '@/assets/profile-photo.jpg';
import { useProfile } from '@/hooks/useProfile';

export const Hero = () => {
  const { t, i18n } = useTranslation();
  const { data: profile, isLoading } = useProfile();

  const title = i18n.language === 'es' ? profile?.title_es : profile?.title_en;

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-hero pt-20">
      <div className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <p className="text-primary text-lg font-medium">{t('hero.greeting')}</p>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground">
              {isLoading ? '...' : profile?.name}
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold text-muted-foreground">
              {isLoading ? '...' : title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-lg">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button onClick={scrollToProjects} size="lg" className="group">
                {t('hero.cta')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button onClick={scrollToContact} variant="secondary" size="lg">
                {t('hero.contact')}
              </Button>
            </div>

            <div className="flex gap-4 pt-6">
              {profile?.github_url && (
                <a href={profile.github_url} target="_blank" rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-all hover:shadow-glow">
                  <Github className="h-6 w-6" />
                </a>
              )}
              {profile?.linkedin_url && (
                <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-all hover:shadow-glow">
                  <Linkedin className="h-6 w-6" />
                </a>
              )}
              {profile?.website_url && (
                <a href={profile.website_url} target="_blank" rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-all hover:shadow-glow">
                  <Globe className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>

          <div className="flex justify-center animate-fade-in">
            <img
              src={profilePhoto}
              alt={profile?.name}
              className="w-80 h-80 rounded-full object-cover border-4 border-primary shadow-glow"
            />
          </div>
        </div>
      </div>
    </section>
  );
};