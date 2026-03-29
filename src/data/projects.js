export const projects = [
  {
    title: 'Fyzen',
    description: 'App que gera treinos personalizados com base na sua altura, peso, idade e experiência.',
    descriptionEn: 'App that generates personalized workouts based on your height, weight, age, and experience.',
    tech: ['React', 'JavaScript', 'TailwindCSS'],
    image: '/images/fyzen1.png',
    demo: 'https://fyzen.app',
    github: null,
    featured: true,
  },
  {
    title: 'Riegel Films',
    description: 'Site profissional para produtora de filmes. Projeto pago.',
    descriptionEn: 'Professional website for a film production company. Paid project.',
    tech: ['React', 'JavaScript', 'TailwindCSS'],
    image: '/images/printsiteriegel.png',
    demo: 'https://riegelfilms.com',
    github: null,
    featured: true,
  },
  {
    title: 'Ventlize',
    description: 'Site institucional moderno. Projeto pago.',
    descriptionEn: 'Modern institutional website. Paid project.',
    tech: ['React', 'JavaScript', 'TailwindCSS'],
    image: '/images/printsitedopp.png',
    demo: 'https://ventlize.com.br',
    github: null,
    featured: true,
  },
  {
    title: 'ThemeForge',
    description: 'Gerador de temas interativo com preview em tempo real.',
    descriptionEn: 'Interactive theme generator with real-time preview.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: '/images/geradordetemas.png',
    demo: 'https://themeforge-caiorissa.vercel.app/',
    github: 'https://github.com/caaiiors/themeforge',
  },
  {
    title: 'Jogo da Velha',
    description: 'Jogo da velha clássico com interface limpa.',
    descriptionEn: 'Classic tic-tac-toe with a clean interface.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: '/images/jogodavelhaprint.png',
    demo: 'https://jogo-da-velha-caiorissa.vercel.app',
    github: 'https://github.com/caaiiors/jogo-da-velha',
  },
  {
    title: 'Mini Quiz Interativo',
    description: 'Quiz interativo com perguntas e respostas dinâmicas.',
    descriptionEn: 'Interactive quiz with dynamic Q&A.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: '/images/quizinterativoprint.png',
    demo: 'https://mini-quiz-interativo-caiorissa.vercel.app/',
    github: 'https://github.com/caaiiors/mini-quiz-interativo',
  },
];

export const skills = [
  { name: 'HTML5', icon: '/images/html5-logo-31813.png', desc: 'Estrutura semântica', descEn: 'Semantic structure' },
  { name: 'CSS3', icon: '/images/css3-logo-31821.png', desc: 'Design responsivo', descEn: 'Responsive design' },
  { name: 'JavaScript', icon: '/images/javascript-39410.png', desc: 'Lógica e interatividade', descEn: 'Logic & interactivity' },
  { name: 'React', icon: '/images/react-brands-solid-full.svg', desc: 'Interfaces modernas', descEn: 'Modern interfaces' },
  { name: 'Tailwind', icon: '/images/icons8-tailwind-css-48.png', desc: 'Estilização rápida', descEn: 'Rapid styling' },
];

export const socials = [
  { name: 'Instagram', url: 'https://instagram.com/caaiio.dev', icon: 'instagram' },
  { name: 'X / Twitter', url: 'https://x.com/caaiiors_', icon: 'twitter' },
  { name: 'GitHub', url: 'https://github.com/caaiiors', icon: 'github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/caio-rissa-b4706527a/', icon: 'linkedin' },
];

export const translations = {
  pt: {
    nav: { about: 'Sobre', projects: 'Projetos', contact: 'Contato' },
    hero: {
      greeting: 'Olá, eu sou',
      name: 'Caio',
      subtitle: 'Desenvolvedor Front-End · UI/UX',
      cta1: 'Ver Projetos',
      cta2: 'Entrar em contato',
    },
    about: {
      title: 'Sobre mim',
      text: 'Meu nome é Caio Rissa Silveira e sou do Rio Grande do Sul. Sou um desenvolvedor front-end que gosta de interfaces limpas, animações sutis e experiências com muita presença visual.',
    },
    skills: { title: 'Skills' },
    projects: { title: 'Projetos', demo: 'Demo', site: 'Site', code: 'Código' },
    contact: {
      title: "Let's connect",
      text: 'Quer conversar ou trabalhar comigo?',
      email: 'Enviar e-mail',
      social: 'Me siga nas redes',
    },
    stats: { projects: 'Projetos', clients: 'Clientes', year: 'Desde' },
    footer: '© {year} Caio Rissa Silveira — Todos os direitos reservados',
  },
  en: {
    nav: { about: 'About', projects: 'Projects', contact: 'Contact' },
    hero: {
      greeting: "Hi, I'm",
      name: 'Caio',
      subtitle: 'Front-End Developer · UI/UX',
      cta1: 'View Projects',
      cta2: 'Get in touch',
    },
    about: {
      title: 'About me',
      text: "My name is Caio Rissa Silveira and I'm from Rio Grande do Sul, Brazil. I'm a front-end developer who loves clean interfaces, subtle animations, and strong visual experiences.",
    },
    skills: { title: 'Skills' },
    projects: { title: 'Projects', demo: 'Demo', site: 'Site', code: 'Code' },
    contact: {
      title: "Let's connect",
      text: 'Want to chat or work with me?',
      email: 'Send email',
      social: 'Follow me on socials',
    },
    stats: { projects: 'Projects', clients: 'Clients', year: 'Since' },
    footer: '© {year} Caio Rissa Silveira — All rights reserved',
  },
};
