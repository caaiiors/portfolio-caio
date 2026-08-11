import { ArrowDown, ArrowUpRight } from '../ui/Icons';

export default function Hero({ t }) {
  return (
    <section id="home" className="hero section-shell">
      <div className="hero-glow hero-glow-one" aria-hidden="true" />
      <div className="hero-glow hero-glow-two" aria-hidden="true" />
      <div className="hero-layout content-wrap">
        <div className="hero-copy">
          <div className="status-pill hero-enter delay-1">
            <span className="status-dot" />
            {t.hero.status}
          </div>
          <p className="eyebrow hero-enter delay-2">{t.hero.eyebrow}</p>
          <h1 className="hero-title hero-enter delay-3">
            {t.hero.title}<br />
            <span>{t.hero.titleAccent}</span>
          </h1>
          <p className="hero-description hero-enter delay-4">{t.hero.description}</p>
          <div className="hero-actions hero-enter delay-5">
            <a href="#projects" className="button button-primary">
              {t.hero.cta1}
              <ArrowDown />
            </a>
            <a href="#contact" className="text-link">
              {t.hero.cta2}
              <ArrowUpRight />
            </a>
          </div>
        </div>

        <div className="portrait-stage hero-enter delay-4">
          <div className="portrait-halo" aria-hidden="true" />
          <div className="portrait-frame">
            <img src="/images/fotohome.jpeg" alt={t.hero.portraitAlt} fetchPriority="high" />
          </div>
          <div className="floating-note floating-note-top">
            <span>{t.hero.cardLabel}</span>
            <strong>{t.hero.cardValue}</strong>
          </div>
          <div className="floating-note floating-note-bottom" aria-hidden="true">
            <span className="code-dot red" /><span className="code-dot amber" /><span className="code-dot green" />
            <code>design → code</code>
          </div>
        </div>
      </div>
      <a className="scroll-cue" href="#about">
        <span>{t.hero.scroll}</span>
        <ArrowDown />
      </a>
    </section>
  );
}
