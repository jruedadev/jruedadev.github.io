import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useProject } from '@/hooks/useProjects';
import { useCategories, getCategoryName } from '@/hooks/useCategories';
import { getFilePreviewUrl } from '@/lib/appwrite';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { data: project, isLoading, isError } = useProject(id);
  const { data: categories = [] } = useCategories();
  const [currentImage, setCurrentImage] = useState(0);

  const description = i18n.language === 'es'
    ? project?.description_es
    : project?.description_en;

  const images = project?.image_id ?? [];

  const prevImage = () =>
    setCurrentImage(i => (i === 0 ? images.length - 1 : i - 1));

  const nextImage = () =>
    setCurrentImage(i => (i === images.length - 1 ? 0 : i + 1));

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-6 py-32">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="h-10 w-48 bg-secondary/40 rounded animate-pulse" />
            <div className="h-96 bg-secondary/40 rounded-xl animate-pulse" />
            <div className="h-6 w-full bg-secondary/40 rounded animate-pulse" />
            <div className="h-6 w-3/4 bg-secondary/40 rounded animate-pulse" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-6 py-32 text-center">
          <h1 className="text-4xl font-bold mb-4">Proyecto no encontrado</h1>
          <Button onClick={() => navigate('/')} variant="secondary">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al inicio
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-6 py-32">
        <div className="max-w-4xl mx-auto">

          {/* Volver */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-8 text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {i18n.language === 'es' ? 'Volver' : 'Back'}
          </Button>

          {/* Carrusel de imágenes */}
          {images.length > 0 && (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10 bg-secondary/20 group">
              <img
                src={getFilePreviewUrl(images[currentImage])}
                alt={`${project.title} - imagen ${currentImage + 1}`}
                className="w-full h-full object-cover transition-opacity duration-300"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/70 hover:bg-background transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/70 hover:bg-background transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  {/* Indicadores */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImage(i)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          i === currentImage
                            ? 'bg-primary w-4'
                            : 'bg-background/60 hover:bg-background'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Header del proyecto */}
          <div className="space-y-4 mb-8">
            {/* Categorías */}
            {project.category_slugs && project.category_slugs.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.category_slugs.map(slug => (
                  <Badge key={slug} variant="outline" className="text-primary border-primary">
                    {getCategoryName(slug, categories, i18n.language)}
                  </Badge>
                ))}
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              {project.title}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          {/* Tecnologías */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {t('projects.technologies')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <Badge key={i} variant="secondary" className="px-3 py-1">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Botones */}
          <div className="flex flex-wrap gap-4">
            {project.github_url && project.github_url !== 'private' ? (
              <Button variant="secondary" asChild>
                <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  Code
                </a>
              </Button>
            ) : project.github_url === 'private' && (
              <Badge variant="outline" className="text-muted-foreground border-muted-foreground px-4 py-2">
                🔒 {i18n.language === 'es' ? 'Repositorio privado' : 'Private repository'}
              </Badge>
            )}

            {project.demo_url && (
              <Button asChild>
                <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Demo
                </a>
              </Button>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;