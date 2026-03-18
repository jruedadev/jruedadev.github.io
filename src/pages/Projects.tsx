import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Github, ExternalLink, X } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';
import { useCategories, getCategoryName } from '@/hooks/useCategories';

const Projects = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { data: projects, isLoading } = useProjects();
  const { data: categories = [] } = useCategories();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  // Todas las tecnologías únicas de todos los proyectos
  const allTechnologies = useMemo(() => {
    if (!projects) return [];
    const techs = projects.flatMap(p => p.technologies);
    return [...new Set(techs)].sort();
  }, [projects]);

  // Proyectos filtrados
  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    return projects.filter(p => {
      const matchCat = selectedCategory
        ? p.category_slugs?.includes(selectedCategory)
        : true;
      const matchTech = selectedTech
        ? p.technologies.includes(selectedTech)
        : true;
      return matchCat && matchTech;
    });
  }, [projects, selectedCategory, selectedTech]);

  const getDescription = (project) =>
    i18n.language === 'es' ? project.description_es : project.description_en;

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedTech(null);
  };

  const hasFilters = selectedCategory || selectedTech;

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-6 py-32">

        {/* Título */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            {t('projects.title')}
          </h1>
          <p className="text-muted-foreground text-lg">
            {filteredProjects.length} {i18n.language === 'es' ? 'proyectos' : 'projects'}
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="ml-3 text-primary hover:underline text-sm inline-flex items-center gap-1"
              >
                <X className="h-3 w-3" />
                {i18n.language === 'es' ? 'Limpiar filtros' : 'Clear filters'}
              </button>
            )}
          </p>
        </div>

        <div className="flex gap-8">

          {/* Sidebar filtros */}
          <aside className="hidden lg:block w-56 shrink-0 space-y-8">

            {/* Filtro por categoría */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                {i18n.language === 'es' ? 'Categoría' : 'Category'}
              </h3>
              <div className="space-y-1">
                {categories.map(cat => (
                  <button
                    key={cat.slug}
                    onClick={() =>
                      setSelectedCategory(
                        selectedCategory === cat.slug ? null : cat.slug
                      )
                    }
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      selectedCategory === cat.slug
                        ? 'bg-primary text-primary-foreground font-medium'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    }`}
                  >
                    {getCategoryName(cat.slug, categories, i18n.language)}
                    <span className="float-right text-xs opacity-60">
                      {projects?.filter(p => p.category_slugs?.includes(cat.slug)).length ?? 0}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Filtro por tecnología */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                {i18n.language === 'es' ? 'Tecnología' : 'Technology'}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {allTechnologies.map(tech => (
                  <button
                    key={tech}
                    onClick={() =>
                      setSelectedTech(selectedTech === tech ? null : tech)
                    }
                    className={`px-2 py-1 rounded text-xs transition-all ${
                      selectedTech === tech
                        ? 'bg-primary text-primary-foreground font-medium'
                        : 'bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* Filtros móvil */}
          <div className="lg:hidden w-full mb-6 space-y-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map(cat => (
                <button
                  key={cat.slug}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === cat.slug ? null : cat.slug
                    )
                  }
                  className={`shrink-0 px-3 py-1.5 rounded-full text-sm transition-all ${
                    selectedCategory === cat.slug
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  {getCategoryName(cat.slug, categories, i18n.language)}
                </button>
              ))}
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {allTechnologies.map(tech => (
                <button
                  key={tech}
                  onClick={() =>
                    setSelectedTech(selectedTech === tech ? null : tech)
                  }
                  className={`px-2 py-1 rounded text-xs transition-all ${
                    selectedTech === tech
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de proyectos */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="h-64 animate-pulse bg-secondary/20" />
                ))}
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-muted-foreground text-lg mb-4">
                  {i18n.language === 'es'
                    ? 'No hay proyectos con estos filtros'
                    : 'No projects match these filters'}
                </p>
                <Button variant="secondary" onClick={clearFilters}>
                  {i18n.language === 'es' ? 'Limpiar filtros' : 'Clear filters'}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                  <Card
                    key={project.$id}
                    className="overflow-hidden bg-card border-border hover:border-primary transition-all hover:shadow-glow animate-fade-in flex flex-col"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="p-6 flex flex-col flex-1 space-y-4">

                      {/* Categorías */}
                      {project.category_slugs?.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {project.category_slugs.map(slug => (
                            <Badge
                              key={slug}
                              variant="outline"
                              className="text-xs text-primary border-primary cursor-pointer"
                              onClick={() => setSelectedCategory(slug)}
                            >
                              {getCategoryName(slug, categories, i18n.language)}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <h3 className="text-xl font-bold text-foreground">
                        {project.title}
                      </h3>

                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                        {getDescription(project)}
                      </p>

                      {/* Tecnologías */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                            onClick={() => setSelectedTech(tech)}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      {/* Botones */}
                      <div className="flex gap-2 pt-2">
                        {project.github_url && project.github_url !== 'private' ? (
                          <Button variant="secondary" size="sm" asChild className="flex-1">
                            <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                              <Github className="h-3.5 w-3.5 mr-1.5" />
                              Code
                            </a>
                          </Button>
                        ) : project.github_url === 'private' && (
                          <Badge variant="outline" className="text-xs text-muted-foreground border-muted-foreground">
                            🔒 {i18n.language === 'es' ? 'Privado' : 'Private'}
                          </Badge>
                        )}
                        {project.demo_url && (
                          <Button size="sm" asChild className="flex-1">
                            <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                              Demo
                            </a>
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/projects/${project.$id}`)}
                          className="flex-1"
                        >
                          {t('projects.viewMore')}
                        </Button>
                      </div>

                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;