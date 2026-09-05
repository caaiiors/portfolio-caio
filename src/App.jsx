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
import { readPreference, savePreference } from './lib/preferences';

const getInitialTheme = () => {
  const savedTheme = readPreference('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

export default function App() {
  const [lang, setLang] = useState(() =>
    readPreference('lang') === 'en' ? 'en' : 'pt',
  );
  const [theme, setTheme] = useState(getInitialTheme);
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#151d2b' : '#f8f9fc');
    savePreference('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.title =
      lang === 'pt'
        ? 'Caio Rissa — Desenvolvimento front-end & UI/UX'
        : 'Caio Rissa — Front-end development & UI/UX';
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', t.meta.description);
  }, [lang, t.meta.description]);

  const handleSetLang = (newLang) => {
    setLang(newLang);
    savePreference('lang', newLang);
  };

  return (
    <div className="app-shell">
      <a className="skip-link" href="#content">
        {t.skip}
      </a>
      <Navbar
        t={t}
        lang={lang}
        setLang={handleSetLang}
        theme={theme}
        toggleTheme={() =>
          setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
        }
      />
      <main id="content" tabIndex={-1}>
        <Hero t={t} lang={lang} />
        <Skills t={t} lang={lang} />
        <Projects t={t} lang={lang} />
        <Mockups t={t} lang={lang} />
        <Studio t={t} lang={lang} />
        <About t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
    </div>
  );
}
