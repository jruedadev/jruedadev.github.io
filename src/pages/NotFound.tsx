import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArrowLeft, Home } from 'lucide-react';
import * as Sentry from '@sentry/react';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEs = i18n.language === 'es';

  useEffect(() => {
    Sentry.captureMessage(`404 - ${location.pathname}`, 'warning');
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-6 space-y-8 animate-fade-in">

          {/* Código 404 estilo terminal */}
          <div className="space-y-2">
            <p className="font-mono text-sm text-primary">
              {isEs ? '// ruta no encontrada' : '// route not found'}
            </p>
            <h1 className="font-mono text-8xl md:text-9xl font-bold text-foreground">
              <span className="text-primary">{'{'}</span>
              404
              <span className="text-primary">{'}'}</span>
            </h1>
          </div>

          {/* Mensaje */}
          <div className="space-y-2">
            <p className="text-2xl font-semibold text-foreground">
              {isEs ? 'Página no encontrada' : 'Page not found'}
            </p>
            <p className="text-muted-foreground max-w-md mx-auto">
              {isEs
                ? `La ruta "${location.pathname}" no existe o fue movida.`
                : `The route "${location.pathname}" doesn't exist or was moved.`}
            </p>
          </div>

          {/* Bloque de código decorativo */}
          <div className="inline-block text-left bg-secondary/40 border border-border rounded-lg px-6 py-4 font-mono text-sm">
            <p className="text-muted-foreground">
              <span className="text-primary">const</span>{' '}
              <span className="text-foreground">page</span>{' '}
              <span className="text-primary">=</span>{' '}
              <span className="text-yellow-500">find</span>
              <span className="text-foreground">(</span>
              <span className="text-green-500">"{location.pathname}"</span>
              <span className="text-foreground">)</span>
            </p>
            <p className="text-muted-foreground">
              <span className="text-primary">{'// '}</span>
              <span className="text-red-400">
                {isEs ? 'undefined — no existe' : 'undefined — does not exist'}
              </span>
            </p>
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button
              size="lg"
              onClick={() => navigate('/')}
              className="group"
            >
              <Home className="h-4 w-4 mr-2" />
              {isEs ? 'Ir al inicio' : 'Go home'}
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate(-1)}
              className="group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              {isEs ? 'Volver' : 'Go back'}
            </Button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;