import { projects } from '../../data/projects';
import { ArrowUpRight } from '../ui/Icons';
import ProjectImage from '../ui/ProjectImage';

function ProjectCard({ project, t, lang, index }) {
  const description =
    lang === 'pt' ? project.description : project.descriptionEn;
  return (
    <article
      className={`project-card ${index === 0 ? 'project-card-featured' : ''}`}
    >
      <a
        href={project.demo}
        target="_blank"
        rel="noreferrer"
        className="project-image-link"
        aria-label={`${t.projects.site}: ${project.title}`}
      >
        <div className="project-image">
          <ProjectImage
            project={project}
            lang={lang}
            sizes={
              index === 0
                ? '(max-width: 760px) calc(100vw - 80px), (max-width: 900px) calc(91.2vw - 64px), 720px'
                : '(max-width: 760px) calc(100vw - 80px), (max-width: 1100px) 40vw, 520px'
            }
          />
          <span className="project-open">
            <ArrowUpRight size={20} />
          </span>
        </div>
      </a>
      <div className="project-body">
        <div className="project-heading">
          <div>
            <p className="card-kicker">
              {lang === 'pt' ? project.categoryPt : project.category}
            </p>
            <h3>{project.title}</h3>
          </div>
        </div>
        <p>{description}</p>
        <p className="project-role">{t.projects.role}</p>
        <div className="tag-list">
          {project.tech.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <div className="card-actions">
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            {t.projects.site}
            <ArrowUpRight />
          </a>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="text-link text-link-muted"
            >
              {t.projects.code}
              <ArrowUpRight />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects({ t, lang }) {
  return (
    <section
      id="projects"
      className="section projects-section"
      aria-labelledby="projects-title"
    >
      <div className="content-wrap">
        <header className="section-header section-header-row">
          <h2 id="projects-title" className="section-title">
            {t.projects.title}
          </h2>
          <p className="section-lede">{t.projects.subtitle}</p>
        </header>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              t={t}
              lang={lang}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
