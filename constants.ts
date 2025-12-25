
import { Post } from './types';

export const AUTHOR_INFO = {
  name: "Marlen Balboa",
  role: "Estratega de Pensamiento & Liderazgo",
  bio: "Exploro la intersección entre la estrategia profesional y la profundidad humana. Mi misión es destilar ideas que resistan al tiempo para líderes y mentes curiosas.",
  linkedin: "https://www.linkedin.com/in/marlen-balboa-6a874834a/",
  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000" 
};

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'Liderazgo desde la Quietud',
    excerpt: '¿Cómo influye el silencio en la toma de decisiones estratégicas? Marlen Balboa analiza el poder de la pausa en la alta dirección.',
    content: `En mi trayectoria, he observado que los mejores líderes no son los que más gritan, sino los que saben escuchar el silencio. \n\nEl silencio no es ausencia de acción; es el espacio donde la estrategia se encuentra con la intuición. En un mundo saturado de datos, la capacidad de retirarse a la "Anatomía del Silencio" es lo que permite discernir lo esencial de lo trivial.`,
    date: '12 de Octubre, 2024',
    category: 'Estrategia',
    readingTime: '7 min',
    image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '2',
    title: 'La Resiliencia de las Ideas',
    excerpt: 'Reflexiones sobre cómo construir legados que trasciendan las tendencias efímeras del mercado actual.',
    content: `A menudo me preguntan en LinkedIn qué hace que un proyecto perdure. La respuesta es siempre la misma: una base de valores atemporales. \n\nConstruir algo que resista al tiempo requiere una paciencia que nuestra era tecnológica intenta erradicar. Debemos volver a la lentitud consciente para asegurar que lo que construimos hoy sea relevante mañana.`,
    date: '5 de Noviembre, 2024',
    category: 'Filosofía',
    readingTime: '5 min',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '3',
    title: 'El Capital Humano y lo Inefable',
    excerpt: 'Más allá de las métricas, existe un valor intangible en las conexiones humanas que define el éxito de cualquier organización.',
    content: `Las métricas nos dan una brújula, pero no nos dan el destino. El verdadero valor de una organización reside en lo inefable: la cultura, la confianza y el propósito compartido. \n\nEn este blog, busco explorar esos espacios donde las palabras a veces fallan, pero las acciones hablan con total claridad.`,
    date: '20 de Noviembre, 2024',
    category: 'Cultura',
    readingTime: '6 min',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200'
  }
];
