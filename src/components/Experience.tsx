import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Briefcase, ExternalLink, Calendar } from 'lucide-react';
import { useExperiences } from '@/hooks/useExperiences';

const formatDate = (dateStr: string, locale: string) => {
  const [year, month] = dateStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString(locale === 'es' ? 'es-CO' : 'en-US', {
    year: 'numeric',
    month: 'short',
  });
};

export const Experience = () => {
  const { t, i18n } = useTranslation();

  const { data: experiences, isLoading } = useExperiences();

  const getPosition = (exp) =>
    i18n.language === 'es' ? exp.position_es : exp.position_en;

  const getDescription = (exp) =>
    i18n.language === 'es' ? exp.description_es : exp.description_en;

  const getDateRange = (exp) => {
    const start = formatDate(exp.start_date, i18n.language);
    const end = exp.end_date
      ? formatDate(exp.end_date, i18n.language)
      : i18n.language === 'es' ? 'Actualidad' : 'Present';
    return `${start} – ${end}`;
  };

  if (isLoading) {
    return (
      <section id="experience" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            {t('experience.title')}
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="h-36 animate-pulse bg-secondary/20" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in">
          {t('experience.title')}
        </h2>

        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Línea vertical */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden md:block" />

            <div className="space-y-8">
              {experiences?.map((exp, index) => (
                <div
                  key={exp.$id}
                  className="relative flex gap-6 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Dot en la línea */}
                  <div className="hidden md:flex shrink-0 w-12 h-12 rounded-full bg-card border-2 border-primary items-center justify-center z-10">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>

                  {/* Card */}
                  <Card className="flex-1 p-6 bg-card border-border hover:border-primary transition-all hover:shadow-glow">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">
                          {getPosition(exp)}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          {exp.company_url ? (
                            <a
                              href={exp.company_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline font-medium flex items-center gap-1"
                            >
                              {exp.company}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          ) : (
                            <span className="text-primary font-medium">
                              {exp.company}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground shrink-0">
                        <Calendar className="h-3.5 w-3.5" />
                        {getDateRange(exp)}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {getDescription(exp)}
                    </p>

                    {exp.technologies?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};