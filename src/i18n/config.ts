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
        name: 'Johan Roberto Rueda',
        title: 'Fullstack Developer',
        subtitle: 'Specialized in PHP, Laravel, and Modern JavaScript Frameworks',
        cta: 'View Projects',
        contact: 'Get in Touch',
      },
      about: {
        title: 'About Me',
        journey: {
          intro: 'Passionate fullstack developer with over 8 years of experience building scalable web applications. My journey in software development has been driven by a constant desire to learn and master new technologies. I specialize in backend development with PHP (Laravel, Phalcon, CodeIgniter) and modern frontend frameworks like Angular, Vue, and React.',
          passion: 'I\'m an advocate for clean code, best practices, and efficient solutions. Expert in containerization with Docker and cloud deployments on AWS, I enjoy tackling complex technical challenges and transforming ideas into robust digital products.',
        },
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
        name: 'Johan Roberto Rueda',
        title: 'Desarrollador Fullstack',
        subtitle: 'Especializado en PHP, Laravel y Frameworks Modernos de JavaScript',
        cta: 'Ver Proyectos',
        contact: 'Contáctame',
      },
      about: {
        title: 'Sobre Mí',
        journey: {
          intro: 'Desarrollador fullstack apasionado con más de 8 años de experiencia construyendo aplicaciones web escalables. Mi trayectoria en el desarrollo de software ha estado impulsada por un deseo constante de aprender y dominar nuevas tecnologías. Me especializo en desarrollo backend con PHP (Laravel, Phalcon, CodeIgniter) y frameworks frontend modernos como Angular, Vue y React.',
          passion: 'Soy un defensor del código limpio, las mejores prácticas y las soluciones eficientes. Experto en contenedorización con Docker y despliegues en la nube con AWS, disfruto enfrentando desafíos técnicos complejos y transformando ideas en productos digitales robustos.',
        },
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
