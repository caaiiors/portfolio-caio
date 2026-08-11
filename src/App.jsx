import { useEffect, useState } from 'react';
import { translations } from './data/projects';
import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Studio from './components/sections/Studio';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Mockups from './components/sections/Mockups';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'pt');
  const [theme, setTheme] = useState(getInitialTheme);
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      theme === 'dark' ? '#0b0b0d' : '#f5f5f7',
    );
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }, [lang]);

  const handleSetLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  return (
    <div className="app-shell">
      <a className="skip-link" href="#content">{t.skip}</a>
      <Navbar
        t={t}
        lang={lang}
        setLang={handleSetLang}
        theme={theme}
        toggleTheme={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
      />
      <main id="content">
        <Hero t={t} />
        <About t={t} />
        <Studio t={t} lang={lang} />
        <Projects t={t} lang={lang} />
        <Mockups t={t} lang={lang} />
        <Skills t={t} lang={lang} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
    </div>
  );
}
