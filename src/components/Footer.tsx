import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Globe, Mail } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';

export const Footer = () => {
  const { t } = useTranslation();
  const { data: profile } = useProfile();
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-secondary/20 border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center space-y-6">
          <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {profile?.name}
          </div>

          <p className="text-muted-foreground text-center max-w-md">
            {t('footer.social')}
          </p>

          <div className="flex gap-4">
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
            {profile?.email && (
              <a href={`mailto:${profile.email}`}
                className="p-3 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-all hover:shadow-glow">
                <Mail className="h-6 w-6" />
              </a>
            )}
          </div>

          <div className="text-sm text-muted-foreground pt-6 border-t border-border w-full text-center">
            © {currentYear} {profile?.name}. {t('footer.rights')}.
          </div>
        </div>
      </div>
    </footer>
  );
};