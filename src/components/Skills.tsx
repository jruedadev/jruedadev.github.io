import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export const Skills = () => {
  const { t } = useTranslation();

  const skillCategories = [
    {
      title: t('skills.backend'),
      skills: ['PHP', 'Laravel', 'Phalcon', 'CodeIgniter', 'MySQL', 'PostgreSQL', 'REST APIs', 'GraphQL'],
    },
    {
      title: t('skills.frontend'),
      skills: ['React', 'Vue.js', 'Angular', 'TypeScript', 'JavaScript', 'TailwindCSS', 'HTML5', 'CSS3'],
    },
    {
      title: t('skills.tools'),
      skills: ['Docker', 'AWS', 'Git', 'Linux', 'CI/CD', 'Nginx', 'Redis', 'Elasticsearch'],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in">
          {t('skills.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className="p-6 bg-card border-border hover:border-primary transition-all hover:shadow-glow animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-2xl font-semibold mb-6 text-primary">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <Badge
                    key={skillIndex}
                    variant="secondary"
                    className="px-3 py-1 text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
