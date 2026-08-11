import { mockups } from '../../data/projects';
import { ArrowUpRight } from '../ui/Icons';

export default function Mockups({ t, lang }) {
  return (
    <section id="mockups" className="section">
      <div className="content-wrap">
        <header className="section-header section-header-row">
          <div>
            <p className="eyebrow">{t.mockups.eyebrow}</p>
            <h2 className="section-title">{t.mockups.title}</h2>
          </div>
          <p className="section-lede">{t.mockups.subtitle}</p>
        </header>

        <div className="concepts-grid">
          {mockups.map((mockup) => {
            const category = lang === 'pt' ? mockup.category : mockup.categoryEn;
            const description = lang === 'pt' ? mockup.description : mockup.descriptionEn;
            return (
              <article className="concept-card" key={mockup.title}>
                <a href={mockup.demo} target="_blank" rel="noreferrer" className="concept-image" aria-label={`${t.mockups.viewConcept}: ${mockup.title}`}>
                  <img src={mockup.image} alt={mockup.title} loading="lazy" />
                  <span className="concept-badge">{t.mockups.badge}</span>
                </a>
                <div className="concept-body">
                  <p className="card-kicker">{category}</p>
                  <h3>{mockup.title}</h3>
                  <p>{description}</p>
                  <div className="concept-links">
                    <a href={mockup.demo} target="_blank" rel="noreferrer" className="text-link">
                      {t.mockups.viewConcept}<ArrowUpRight />
                    </a>
                    <a href={mockup.github} target="_blank" rel="noreferrer" className="icon-link" aria-label={`${t.projects.code}: ${mockup.title}`}>
                      GitHub
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
