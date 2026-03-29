import { motion } from 'motion/react';

export default function Hero({ t }) {
  return (
    <section id="home" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 800, width: '100%', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ color: 'rgba(255,255,255,0.5)', fontSize: 18, marginBottom: 16, letterSpacing: '0.15em', textTransform: 'uppercase' }}
        >
          {t.hero.greeting}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: 'blur(20px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)', fontWeight: 700, color: 'white', marginBottom: 24, letterSpacing: '-0.02em', lineHeight: 1 }}
        >
          {t.hero.name}
          <span style={{ color: '#5227FF' }}>.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a
            href="#projects"
            style={{ padding: '14px 32px', background: '#5227FF', color: 'white', fontWeight: 500, borderRadius: 12, textDecoration: 'none', transition: 'all 0.3s' }}
            onMouseEnter={e => e.target.style.background = '#6b3fff'}
            onMouseLeave={e => e.target.style.background = '#5227FF'}
          >
            {t.hero.cta1}
          </a>
          <a
            href="#contact"
            style={{ padding: '14px 32px', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)', borderRadius: 12, textDecoration: 'none', transition: 'all 0.3s' }}
          >
            {t.hero.cta2}
          </a>
        </motion.div>
      </div>

      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)' }}>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
