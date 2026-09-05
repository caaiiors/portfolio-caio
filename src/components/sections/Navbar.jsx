import { useEffect, useRef, useState } from 'react';
import { BrandMark, Moon, Sun } from '../ui/Icons';

const sectionIds = [
  'home',
  'skills',
  'projects',
  'mockups',
  'studio',
  'about',
  'contact',
];

export default function Navbar({ t, lang, setLang, theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onPointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) closeMenu();
    };
    const breakpoint = window.matchMedia('(min-width: 901px)');
    breakpoint.addEventListener('change', closeMenu);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      breakpoint.removeEventListener('change', closeMenu);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries.find((entry) => entry.isIntersecting);
        if (current) setActiveSection(current.target.id);
      },
      { rootMargin: '-15% 0px -65% 0px', threshold: 0 },
    );
    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  const links = [
    ['projects', t.nav.projects],
    ['mockups', t.nav.mockups],
    ['studio', t.nav.studio],
    ['about', t.nav.about],
    ['contact', t.nav.contact],
  ];
  return (
    <header
      className="site-header"
      ref={headerRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setMenuOpen(false);
      }}
    >
      <div className="nav-wrap content-wrap">
        <a
          className="brand"
          href="#home"
          aria-label={`Caio Rissa — ${t.top}`}
          onClick={() => setMenuOpen(false)}
        >
          <span className="brand-symbol" aria-hidden="true">
            <BrandMark />
          </span>
          <span>Caio Rissa</span>
        </a>
        <nav
          id="main-navigation"
          className={`nav-links ${menuOpen ? 'is-open' : ''}`}
          aria-label={t.nav.label}
        >
          {links.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activeSection === id ? 'location' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            type="button"
            className="icon-button"
            onClick={toggleTheme}
            aria-label={t.nav.theme}
            title={t.nav.theme}
            aria-pressed={theme === 'dark'}
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
          </button>
          <button
            type="button"
            className="language-button"
            onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
            aria-label={
              lang === 'pt' ? 'Switch to English' : 'Mudar para português'
            }
          >
            {lang === 'pt' ? 'EN' : 'PT'}
          </button>
          <button
            type="button"
            ref={menuButtonRef}
            className={`menu-button ${menuOpen ? 'is-open' : ''}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            aria-label={menuOpen ? t.nav.close : t.nav.menu}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
