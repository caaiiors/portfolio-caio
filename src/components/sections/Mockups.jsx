import { mockups } from '../../data/projects';
import { ArrowUpRight } from '../ui/Icons';
import ProjectImage from '../ui/ProjectImage';

export default function Mockups({ t, lang }) {
  return (
    <section
      id="mockups"
      className="section concepts-section"
      aria-labelledby="concepts-title"
    >
      <div className="content-wrap">
        <header className="section-header section-header-row">
          <div>
            <h2 id="concepts-title" className="section-title">
              {t.mockups.title}
            </h2>
          </div>
          <p className="section-lede">{t.mockups.subtitle}</p>
        </header>

        <div className="concepts-grid">
          {mockups.map((mockup) => {
            const category =
              lang === 'pt' ? mockup.category : mockup.categoryEn;
            const description =
              lang === 'pt' ? mockup.description : mockup.descriptionEn;
            return (
              <article className="concept-card" key={mockup.title}>
                <a
                  href={mockup.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="concept-image"
                  aria-label={`${t.mockups.viewConcept}: ${mockup.title}`}
                >
                  <ProjectImage
                    project={mockup}
                    lang={lang}
                    sizes="(max-width: 760px) calc(100vw - 80px), (max-width: 900px) 40vw, 360px"
                  />
                </a>
                <div className="concept-body">
                  <p className="card-kicker">{category}</p>
                  <h3>{mockup.title}</h3>
                  <p>{description}</p>
                  <div className="tag-list">
                    {mockup.tech.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  <div className="concept-links">
                    <a
                      href={mockup.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-link"
                    >
                      {t.mockups.viewConcept}
                      <ArrowUpRight />
                    </a>
                    <a
                      href={mockup.github}
                      target="_blank"
                      rel="noreferrer"
                      className="icon-link"
                      aria-label={`GitHub — ${t.projects.code}: ${mockup.title}`}
                    >
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
