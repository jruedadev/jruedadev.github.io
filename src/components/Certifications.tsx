import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, ExternalLink } from 'lucide-react';
import { useCertifications } from '@/hooks/useCertifications';

export const Certifications = () => {
  const { t, i18n } = useTranslation();
  const { data: certifications, isLoading } = useCertifications();

  const getTitle = (cert) =>
    i18n.language === 'es' ? cert.title_es : cert.title_en;

  if (isLoading) {
    return (
      <section id="certifications" className="py-20 bg-secondary/20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            {t('certifications.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="h-28 animate-pulse bg-secondary/40" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="certifications" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in">
          {t('certifications.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {certifications?.map((cert, index) => (
            <Card
              key={cert.$id}
              className="p-6 bg-card border-border hover:border-primary transition-all hover:shadow-glow group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-semibold text-foreground leading-tight">
                      {getTitle(cert)}
                    </h3>
                    <Badge variant="secondary" className="text-xs shrink-0">
                      {cert.year}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {cert.issuer}
                  </p>
                  {cert.credential_url && (
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                    >
                      <ExternalLink className="h-3 w-3" />
                      {i18n.language === 'es' ? 'Ver credencial' : 'View credential'}
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};