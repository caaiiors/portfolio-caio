import { useEffect, useState } from 'react';
import { Moon, Sun } from '../ui/Icons';

export default function Navbar({ t, lang, setLang, theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener('resize', closeMenu);
    return () => window.removeEventListener('resize', closeMenu);
  }, []);

  const links = [
    ['#about', t.nav.about],
    ['#studio', t.nav.studio],
    ['#projects', t.nav.projects],
    ['#mockups', t.nav.mockups],
  ];

  return (
    <header className="site-header">
      <div className="nav-wrap">
        <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`} aria-label={t.nav.label}>
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>{t.nav.contact}</a>
        </nav>

        <div className="nav-actions">
          <button className="icon-button" onClick={toggleTheme} aria-label={t.nav.theme} title={t.nav.theme}>
            {theme === 'dark' ? <Sun /> : <Moon />}
          </button>
          <button
            className="language-button"
            onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
            aria-label={lang === 'pt' ? 'Switch to English' : 'Mudar para português'}
          >
            {lang === 'pt' ? 'EN' : 'PT'}
          </button>
          <button
            className={`menu-button ${menuOpen ? 'is-open' : ''}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
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
