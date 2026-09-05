import { useState } from 'react';
import { projects } from '../../data/projects';
import { ArrowDown, ArrowUpRight } from '../ui/Icons';
import ProjectImage from '../ui/ProjectImage';

export default function Hero({ t, lang }) {
  const [selected, setSelected] = useState(0);
  const project = projects[selected];
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="content-wrap">
        <div className="hero-meta">
          <p className="availability">
            <span aria-hidden="true" />
            {t.hero.status}
          </p>
          <p>{t.hero.location}</p>
        </div>
        <div className="hero-heading hero-enter">
          <h1 id="hero-title">
            Caio Rissa<span>.</span>
          </h1>
          <p>
            Front-end
            <br />& UI/UX
          </p>
        </div>
        <div className="hero-layout hero-enter">
          <div className="hero-copy">
            <h2>{t.hero.title}</h2>
            <p className="hero-description">{t.hero.description}</p>
            <div className="hero-actions">
              <a href="#projects" className="button button-primary">
                {t.hero.cta1}
                <ArrowDown />
              </a>
              <a href="#contact" className="text-link">
                {t.hero.cta2}
              </a>
            </div>
            <a className="hero-person" href="#about">
              <img
                src="/images/fotohome-320.webp"
                width="48"
                height="48"
                alt=""
              />
              <span>
                {t.hero.personal}
                <span>
                  {t.hero.personalLink}
                  <ArrowUpRight size={14} />
                </span>
              </span>
            </a>
          </div>
          <div className="work-preview">
            <div className="preview-toolbar">
              <span>{t.hero.preview}</span>
              <div className="preview-controls" aria-label={t.hero.choose}>
                {projects.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    aria-pressed={selected === index}
                    aria-controls="hero-preview"
                    onClick={() => setSelected(index)}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
            <a
              id="hero-preview"
              className={`preview-image preview-image-${selected}`}
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.projects.site}: ${project.title}`}
            >
              <ProjectImage
                key={project.title}
                project={project}
                lang={lang}
                priority
                sizes="(max-width: 760px) calc(100vw - 80px), (max-width: 1375px) 43vw, 606px"
              />
              <span className="preview-open">
                <ArrowUpRight size={24} />
              </span>
            </a>
            <div className="preview-caption" aria-live="polite">
              <span>{project.title}</span>
              <span>
                {lang === 'pt' ? project.categoryPt : project.category}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
