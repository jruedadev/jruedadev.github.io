import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Experience } from '@/components/Experience';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Certifications } from '@/components/Certifications';
import { Footer } from '@/components/Footer';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useScrollToHash } from '@/hooks/useScrollToHash';


const Index = () => {
  const navigate = useNavigate();
  useScrollToHash();

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      {/* Botón ver todos los proyectos */}
          <div className="flex justify-center pb-20 -mt-8 bg-background">
            <Button
              size="lg"
              onClick={() => navigate('/projects')}
              className="group"
            >
              Ver todos los proyectos
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
      <Certifications />
      <Footer />
    </div>
  );
};

export default Index;
