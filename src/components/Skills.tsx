import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useSkills } from '@/hooks/useSkills';

export const Skills = () => {
  const { t } = useTranslation();
  const { data: skills, isLoading } = useSkills();

  const categories = [
    { key: 'backend', label: t('skills.backend') },
    { key: 'frontend', label: t('skills.frontend') },
    { key: 'tools', label: t('skills.tools') },
  ];

  if (isLoading) {
    return (
      <section id="skills" className="py-20 bg-secondary/20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            {t('skills.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="h-48 animate-pulse bg-secondary/40" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in">
          {t('skills.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((cat, index) => {
            const catSkills = skills?.filter(s => s.category === cat.key) ?? [];
            return (
              <Card
                key={cat.key}
                className="p-6 bg-card border-border hover:border-primary transition-all hover:shadow-glow animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-2xl font-semibold mb-6 text-primary">{cat.label}</h3>
                <div className="flex flex-wrap gap-2">
                  {catSkills.map(skill => (
                    <Badge
                      key={skill.$id}
                      variant="secondary"
                      className="px-3 py-1 text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};