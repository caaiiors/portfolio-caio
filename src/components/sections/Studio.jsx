import { studio } from '../../data/projects';
import { ArrowUpRight } from '../ui/Icons';

export default function Studio({ t, lang }) {
  const tagline = lang === 'pt' ? studio.tagline : studio.taglineEn;
  const description = lang === 'pt' ? studio.description : studio.descriptionEn;

  return (
    <section id="studio" className="section">
      <div className="content-wrap">
        <article className="studio-card">
          <div className="studio-copy">
            <p className="eyebrow eyebrow-light">{t.studio.eyebrow}</p>
            <h2>{studio.name}</h2>
            <p className="studio-tagline">{tagline}</p>
            <p className="studio-description">{description}</p>
            <div className="studio-meta">
              <span>{t.studio.label}</span>
              <span>Figma · React · UX</span>
            </div>
            <a href={studio.url} target="_blank" rel="noreferrer" className="button button-light">
              {t.studio.cta}
              <ArrowUpRight />
            </a>
          </div>

          <a href={studio.url} target="_blank" rel="noreferrer" className="browser-window" aria-label={`${t.studio.cta}: ${studio.name}`}>
            <div className="browser-bar">
              <div><span /><span /><span /></div>
              <span>loomeeai.com</span>
            </div>
            <img src={studio.image} alt="Loomee AI website" loading="lazy" />
          </a>
        </article>
      </div>
    </section>
  );
}
