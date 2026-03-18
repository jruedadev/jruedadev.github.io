import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProfile } from '@/hooks/useProfile';
import {
  Github,
  Linkedin,
  Globe,
  Mail,
  MessageCircle,
  Clock,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

const WHATSAPP_NUMBER = '573012605465';
const FUNCTION_URL = import.meta.env.VITE_APPWRITE_FUNCTION_CONTACT_URL;

const ContactForm = () => {
  const { t, i18n } = useTranslation();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!executeRecaptcha) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const recaptchaToken = await executeRecaptcha('contact_form');

      const response = await fetch(FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, recaptchaToken }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Error al enviar el mensaje');
      }
    } catch {
      setStatus('error');
      setErrorMessage(i18n.language === 'es' ? 'Error de conexión' : 'Connection error');
    }
  }, [executeRecaptcha, form, i18n.language]);

  const isEs = i18n.language === 'es';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            {isEs ? 'Nombre' : 'Name'} <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            maxLength={100}
            placeholder={isEs ? 'Tu nombre' : 'Your name'}
            className="w-full px-4 py-2.5 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground transition-colors text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            Email <span className="text-primary">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            maxLength={255}
            placeholder={isEs ? 'tu@email.com' : 'your@email.com'}
            className="w-full px-4 py-2.5 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground transition-colors text-sm"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">
          {isEs ? 'Asunto' : 'Subject'}
        </label>
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          maxLength={200}
          placeholder={isEs ? '¿En qué puedo ayudarte?' : 'How can I help you?'}
          className="w-full px-4 py-2.5 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground transition-colors text-sm"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">
          {isEs ? 'Mensaje' : 'Message'} <span className="text-primary">*</span>
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          maxLength={2000}
          rows={5}
          placeholder={isEs ? 'Cuéntame sobre tu proyecto...' : 'Tell me about your project...'}
          className="w-full px-4 py-2.5 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground transition-colors text-sm resize-none"
        />
        <p className="text-xs text-muted-foreground text-right">
          {form.message.length}/2000
        </p>
      </div>

      {/* Estado de envío */}
      {status === 'success' && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-500 text-sm">
          <CheckCircle className="h-4 w-4 shrink-0" />
          {isEs ? '¡Mensaje enviado! Te responderé pronto.' : 'Message sent! I\'ll get back to you soon.'}
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {errorMessage}
        </div>
      )}

      <Button
        type="submit"
        disabled={status === 'loading'}
        className="w-full group"
        size="lg"
      >
        {status === 'loading' ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            {isEs ? 'Enviando...' : 'Sending...'}
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            {isEs ? 'Enviar mensaje' : 'Send message'}
          </span>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        {isEs
          ? 'Protegido por reCAPTCHA v3 — sin interrupciones para ti'
          : 'Protected by reCAPTCHA v3 — no interruptions for you'}
      </p>
    </form>
  );
};

const ContactPage = () => {
  const { i18n } = useTranslation();
  const { data: profile } = useProfile();
  const isEs = i18n.language === 'es';

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    isEs
      ? 'Hola Johan, vi tu portafolio y me gustaría hablar contigo.'
      : 'Hi Johan, I saw your portfolio and would like to talk with you.'
  )}`;

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: profile?.github_url || 'https://github.com/jruedadev',
      show: true,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: profile?.linkedin_url || 'https://linkedin.com/in/jruedag',
      show: !!profile?.linkedin_url,
    },
    {
      icon: Globe,
      label: 'Website',
      href: profile?.website_url || 'https://jrueda.dev',
      show: true,
    },
    {
      icon: Mail,
      label: 'Email',
      href: `mailto:${profile?.email || 'me@jrueda.dev'}`,
      show: true,
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-6 py-32">
        <div className="max-w-5xl mx-auto">

          {/* Título */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              {isEs ? 'Contacto' : 'Contact'}
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              {isEs
                ? '¿Tienes un proyecto en mente? Hablemos.'
                : 'Have a project in mind? Let\'s talk.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* Sidebar info */}
            <div className="lg:col-span-2 space-y-6">

              {/* Disponibilidad */}
              <Card className="p-6 bg-card border-border">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  {isEs ? 'Disponibilidad' : 'Availability'}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm text-foreground font-medium">
                      {isEs ? 'Disponible para proyectos' : 'Available for projects'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    Bogotá, Colombia
                  </div>
                  <div className="text-sm text-muted-foreground">
                    🕐 UTC-5 (COT)
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {isEs
                      ? 'Respondo en menos de 24 horas'
                      : 'I respond within 24 hours'}
                  </div>
                </div>
              </Card>

              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-xl bg-green-500/10 border border-green-500/30 hover:border-green-500/60 hover:bg-green-500/15 transition-all group"
              >
                <div className="p-2.5 rounded-lg bg-green-500/20 group-hover:bg-green-500/30 transition-colors">
                  <MessageCircle className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">WhatsApp</p>
                  <p className="text-xs text-muted-foreground">+57 301 260 5465</p>
                </div>
                <Badge variant="secondary" className="ml-auto text-xs">
                  {isEs ? 'Rápido' : 'Fast'}
                </Badge>
              </a>

              {/* Redes sociales */}
              <Card className="p-6 bg-card border-border">
                <h3 className="font-semibold text-foreground mb-4">
                  {isEs ? 'Redes sociales' : 'Social links'}
                </h3>
                <div className="space-y-2">
                  {socialLinks.filter(l => l.show).map((link) => {
                    const Icon = link.icon;
                    return (
                      <a 
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors group"
                      >
                        <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {link.label}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </Card>
            </div>

            {/* Formulario */}
            <Card className="lg:col-span-3 p-8 bg-card border-border">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                {isEs ? 'Envíame un mensaje' : 'Send me a message'}
              </h2>
              <ContactForm />
            </Card>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const Contact = () => (
  <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}>
    <ContactPage />
  </GoogleReCaptchaProvider>
);

export default Contact;