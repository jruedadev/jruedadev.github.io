import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        about: 'About',
        experience: 'Experience',
        skills: 'Skills',
        projects: 'Projects',
        certifications: 'Certifications',
        contact: 'Contact',
      },
      hero: {
        greeting: 'Hi, I am',
        subtitle: 'Specialized in PHP, Laravel, and Modern JavaScript Frameworks',
        cta: 'View Projects',
        contact: 'Get in Touch',
      },
      about: {
        title: 'About Me',
        interests: {
          title: 'Beyond Code',
          webDev: {
            title: 'Web Development',
            description: 'Creating scalable applications with modern technologies, focusing on performance and user experience.',
          },
          motorcycles: {
            title: 'Motorcycling',
            description: 'Passionate about two wheels, the freedom of the road, and the mechanics behind these amazing machines.',
          },
          gameDev: {
            title: 'Game Development',
            description: 'Exploring interactive experiences and game mechanics as a creative hobby and technical challenge.',
          },
        },
      },
      experience: {
        title: 'Professional Experience',
        years: 'Years of Experience',
        projects: 'Projects Completed',
        clients: 'Satisfied Clients',
      },
      skills: {
        title: 'Technical Skills',
        backend: 'Backend',
        frontend: 'Frontend',
        tools: 'Tools & Cloud',
      },
      projects: {
        title: 'Featured Projects',
        viewMore: 'View Details',
        technologies: 'Technologies',
      },
      certifications: {
        title: 'Certifications',
      },
      footer: {
        rights: 'All rights reserved',
        social: 'Connect with me',
      },
    },
  },
  es: {
    translation: {
      nav: {
        about: 'Acerca',
        experience: 'Experiencia',
        skills: 'Habilidades',
        projects: 'Proyectos',
        certifications: 'Certificaciones',
        contact: 'Contacto',
      },
      hero: {
        greeting: 'Hola, soy',
        subtitle: 'Especializado en PHP, Laravel y Frameworks Modernos de JavaScript',
        cta: 'Ver Proyectos',
        contact: 'Contáctame',
      },
      about: {
        title: 'Sobre Mí',
        interests: {
          title: 'Más Allá del Código',
          webDev: {
            title: 'Desarrollo Web',
            description: 'Creando aplicaciones escalables con tecnologías modernas, enfocado en rendimiento y experiencia de usuario.',
          },
          motorcycles: {
            title: 'Motociclismo',
            description: 'Apasionado por las dos ruedas, la libertad del camino y la mecánica detrás de estas increíbles máquinas.',
          },
          gameDev: {
            title: 'Desarrollo de Videojuegos',
            description: 'Explorando experiencias interactivas y mecánicas de juego como hobby creativo y desafío técnico.',
          },
        },
      },
      experience: {
        title: 'Experiencia Profesional',
        years: 'Años de Experiencia',
        projects: 'Proyectos Completados',
        clients: 'Clientes Satisfechos',
      },
      skills: {
        title: 'Habilidades Técnicas',
        backend: 'Backend',
        frontend: 'Frontend',
        tools: 'Herramientas y Nube',
      },
      projects: {
        title: 'Proyectos Destacados',
        viewMore: 'Ver Detalles',
        technologies: 'Tecnologías',
      },
      certifications: {
        title: 'Certificaciones',
      },
      footer: {
        rights: 'Todos los derechos reservados',
        social: 'Conéctate conmigo',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;