export default function Navbar({ t, lang, setLang }) {
  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(0,0,0,0.6)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32 }}>

        {/* Mobile: foto ao invés do nome */}
        <a href="#home" className="md:hidden" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/images/eu.jpeg"
            alt="Caio"
            style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.1)' }}
          />
        </a>

        {/* Desktop: nome escrito */}
        <a href="#home" className="hidden md:block" style={{ color: 'white', fontWeight: 700, fontSize: 16, letterSpacing: '-0.02em', textDecoration: 'none' }}>
          Caio Rissa Silveira
        </a>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <a href="#about" className="hidden md:block" style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>{t.nav.about}</a>
          <a href="#projects" className="hidden md:block" style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>{t.nav.projects}</a>
          <a href="#contact" className="hidden md:block" style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>{t.nav.contact}</a>
          <button
            onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
            style={{ fontSize: 12, padding: '6px 12px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)', background: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', transition: 'all 0.3s' }}
          >
            {lang === 'pt' ? '🇺🇸 EN' : '🇧🇷 PT'}
          </button>
        </nav>
      </div>
    </header>
  );
}
