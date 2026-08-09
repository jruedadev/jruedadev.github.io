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

  const formalCertifications = certifications?.filter((cert) => cert.type !== 'course');
  const complementaryCourses = certifications?.filter((cert) => cert.type === 'course');

  const coursesByPlatformAll = complementaryCourses?.reduce<Record<string, typeof complementaryCourses>>(
    (groups, cert) => {
      const key = cert.platform || (i18n.language === 'es' ? 'Otros' : 'Other');
      groups[key] = [...(groups[key] || []), cert];
      return groups;
    },
    {}
  );

  const coursesByPlatform = coursesByPlatformAll
    ? Object.fromEntries(Object.entries(coursesByPlatformAll).filter(([, courses]) => courses.length > 1))
    : undefined;
  const soloCourses = coursesByPlatformAll
    ? Object.values(coursesByPlatformAll).filter((courses) => courses.length === 1).flat()
    : undefined;

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
          {formalCertifications?.map((cert, index) => (
            <Card
              key={cert.$id}
              className="p-6 bg-card border-border shadow-card hover:border-primary transition-all hover:shadow-glow group animate-fade-in"
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

        {complementaryCourses && complementaryCourses.length > 0 && (
          <div className="max-w-4xl mx-auto mt-12">
            <h3 className="text-xl font-semibold text-center mb-6 text-muted-foreground">
              {i18n.language === 'es' ? 'Formación complementaria' : 'Complementary training'}
            </h3>
            {coursesByPlatform && Object.keys(coursesByPlatform).length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Object.entries(coursesByPlatform).map(([platform, courses], groupIndex) => (
                <div
                  key={platform}
                  className="rounded-lg border border-border bg-card shadow-card p-4 animate-fade-in"
                  style={{ animationDelay: `${groupIndex * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-foreground">{platform}</span>
                    <Badge variant="secondary" className="text-xs">
                      {courses.length}
                    </Badge>
                  </div>
                  <ul className="divide-y divide-border">
                    {courses.map((cert) => {
                      const row = (
                        <>
                          <span className="text-sm text-foreground truncate">{getTitle(cert)}</span>
                          <span className="text-xs text-muted-foreground shrink-0 ml-3">{cert.year}</span>
                        </>
                      );
                      return (
                        <li key={cert.$id}>
                          {cert.credential_url ? (
                            <a
                              href={cert.credential_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between gap-2 py-2 hover:text-primary transition-colors"
                            >
                              {row}
                            </a>
                          ) : (
                            <div className="flex items-center justify-between gap-2 py-2">
                              {row}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
            )}

            {soloCourses && soloCourses.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                {soloCourses.map((cert) => {
                  const content = (
                    <>
                      <span className="text-foreground">{getTitle(cert)}</span>
                      {cert.platform && (
                        <span className="text-muted-foreground">· {cert.platform}</span>
                      )}
                      <span className="text-muted-foreground text-xs">{cert.year}</span>
                    </>
                  );
                  return cert.credential_url ? (
                    <a
                      key={cert.$id}
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border border-border bg-card hover:border-primary transition-colors"
                    >
                      {content}
                    </a>
                  ) : (
                    <span
                      key={cert.$id}
                      className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border border-border bg-card"
                    >
                      {content}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};