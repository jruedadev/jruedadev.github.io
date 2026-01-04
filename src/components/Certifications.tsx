import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Award } from 'lucide-react';

export const Certifications = () => {
  const { t } = useTranslation();

  const certifications = [
    {
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      year: '2023',
    },
    {
      title: 'Laravel Certified Developer',
      issuer: 'Laravel',
      year: '2022',
    },
    {
      title: 'Docker Certified Associate',
      issuer: 'Docker Inc.',
      year: '2022',
    },
    {
      title: 'Professional Scrum Master',
      issuer: 'Scrum.org',
      year: '2021',
    },
  ];

  return (
    <section id="certifications" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in">
          {t('certifications.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {certifications.map((cert, index) => (
            <Card
              key={index}
              className="p-6 bg-card border-border hover:border-primary transition-all hover:shadow-glow group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-1">{cert.title}</h3>
                  <p className="text-muted-foreground">{cert.issuer}</p>
                  <p className="text-sm text-primary mt-2">{cert.year}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
