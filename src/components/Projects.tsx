import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ExternalLink, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useProjects } from '@/hooks/useProjects';
import { useCategories, getCategoryName } from '@/hooks/useCategories';
import { useNavigate } from 'react-router-dom';


export const Projects = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { data: projects, isLoading } = useProjects();
  const { data: categories = [] } = useCategories();

  const getDescription = (project) =>
    i18n.language === 'es' ? project.description_es : project.description_en;

  if (isLoading) {
    return (
      <section id="projects" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            {t('projects.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="h-64 animate-pulse bg-secondary/20" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in">
          {t('projects.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects?.map((project, index) => (
            <Card
              key={project.$id}
              className="overflow-hidden bg-card border-border hover:border-primary transition-all hover:shadow-glow animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6 space-y-4">
                {/* Categorías */}
                {project.category_slugs && project.category_slugs.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.category_slugs.map(slug => (
                      <Badge key={slug} variant="outline" className="text-xs text-primary border-primary">
                        {getCategoryName(slug, categories, i18n.language)}
                      </Badge>
                    ))}
                  </div>
                )}

                <h3 className="text-2xl font-bold text-foreground">{project.title}</h3>
                <p className="text-muted-foreground">{getDescription(project)}</p>

                {/* Tecnologías */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Botones */}
                <div className="flex gap-3 pt-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/projects/${project.$id}`)}
                    className="w-full mt-1"
                  >
                    {t('projects.viewMore')}
                  </Button>
                </div>
                <div className="flex gap-3 pt-2">
                  {project.github_url ? (
                    project.github_url === 'private' ? (
                      <Badge variant="outline" className="text-xs text-muted-foreground border-muted-foreground">
                        🔒 {i18n.language === 'es' ? 'Repositorio privado' : 'Private repository'}
                      </Badge>
                    ) : (
                      <Button variant="secondary" size="sm" className="flex-1" asChild>
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    )
                  ) : null}
                  {project.demo_url && (
                    <Button size="sm" className="flex-1" asChild>
                      <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Demo
                      </a>
                    </Button>
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