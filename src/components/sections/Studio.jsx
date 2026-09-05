import { studio } from '../../data/projects';
import { ArrowUpRight } from '../ui/Icons';
import ProjectImage from '../ui/ProjectImage';

export default function Studio({ t, lang }) {
  const tagline = lang === 'pt' ? studio.tagline : studio.taglineEn;
  const description = lang === 'pt' ? studio.description : studio.descriptionEn;

  return (
    <section
      id="studio"
      className="section studio-section"
      aria-labelledby="studio-title"
    >
      <div className="content-wrap">
        <article className="studio-card">
          <div className="studio-copy">
            <p className="section-label">{t.studio.eyebrow}</p>
            <h2 id="studio-title">{studio.name}</h2>
            <p className="studio-tagline">{tagline}</p>
            <p className="studio-description">{description}</p>
            <div className="studio-meta">
              <span>{t.studio.label}</span>
              <span>Figma · React · UX</span>
            </div>
            <a
              href={studio.url}
              target="_blank"
              rel="noreferrer"
              className="button button-light"
            >
              {t.studio.cta}
              <ArrowUpRight />
            </a>
          </div>

          <a
            href={studio.url}
            target="_blank"
            rel="noreferrer"
            className="browser-window"
            aria-label={`loomeeai.com — ${t.studio.cta}`}
          >
            <div className="browser-bar">
              <div>
                <span />
                <span />
                <span />
              </div>
              <span>loomeeai.com</span>
            </div>
            <ProjectImage
              project={studio}
              lang={lang}
              sizes="(max-width: 900px) 90vw, 50vw"
            />
          </a>
        </article>
      </div>
    </section>
  );
}
