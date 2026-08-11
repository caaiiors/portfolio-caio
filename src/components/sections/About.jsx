export default function About({ t }) {
  return (
    <section id="about" className="section section-muted">
      <div className="content-wrap">
        <div className="about-grid">
          <div>
            <p className="eyebrow">{t.about.eyebrow}</p>
            <h2 className="section-title section-title-wide">{t.about.title}</h2>
          </div>
          <p className="section-lede about-lede">{t.about.text}</p>
        </div>

        <div className="principles-grid">
          {t.about.principles.map((principle, index) => (
            <article className="principle-card" key={principle.title}>
              <span className="principle-index">0{index + 1}</span>
              <h3>{principle.title}</h3>
              <p>{principle.text}</p>
            </article>
          ))}
        </div>

        <dl className="stats-row">
          {t.about.stats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.value}</dt>
              <dd>{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
