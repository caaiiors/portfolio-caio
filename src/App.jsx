import { useState } from 'react';
import { translations } from './data/projects';
import ClickSpark from './components/reactbits/ClickSpark';
import BlobCursor from './components/reactbits/BlobCursor';
import Particles from './components/reactbits/Particles';
import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'pt');
  const t = translations[lang];

  const handleSetLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#050505', color: 'white', overflowX: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <Particles
          particleCount={400}
          particleSpread={10}
          speed={0.1}
          particleColors={['#5227FF', '#8B5CF6', '#ffffff', '#6366f1']}
          moveParticlesOnHover
          particleHoverFactor={2}
          alphaParticles
          particleBaseSize={150}
          sizeRandomness={1.5}
          cameraDistance={18}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="hidden md:block">
          <BlobCursor
            blobType="circle"
            fillColor="#5227FF"
            trailCount={3}
            sizes={[40, 90, 55]}
            opacities={[0.3, 0.2, 0.15]}
            filterStdDeviation={25}
            fastDuration={0.08}
            slowDuration={0.4}
          />
        </div>

        <ClickSpark sparkColor="#5227FF" sparkSize={12} sparkRadius={20} sparkCount={10} duration={500}>
          <Navbar t={t} lang={lang} setLang={handleSetLang} />
          <Hero t={t} />
          <About t={t} />
          <Skills t={t} lang={lang} />
          <Projects t={t} lang={lang} />
          <Contact t={t} />
          <Footer t={t} />
        </ClickSpark>
      </div>
    </div>
  );
}
