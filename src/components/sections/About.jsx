export default function About({ t }) {
  return (
    <section
      id="about"
      className="section about-section"
      aria-labelledby="about-title"
    >
      <div className="content-wrap about-grid">
        <figure className="about-portrait">
          <img
            src="/images/fotohome-640.webp"
            srcSet="/images/fotohome-320.webp 320w, /images/fotohome-640.webp 640w"
            sizes="(max-width: 760px) 85vw, 30vw"
            alt={t.hero.portraitAlt}
            width="640"
            height="853"
            loading="lazy"
          />
          <figcaption>
            <span>Caio Rissa Silveira</span>
            <span>{t.hero.location}</span>
          </figcaption>
        </figure>
        <div className="about-copy">
          <p className="section-label">{t.about.eyebrow}</p>
          <h2 id="about-title" className="section-title">
            {t.about.title}
          </h2>
          <p className="section-lede">{t.about.text}</p>
          <div className="principles-list">
            {t.about.principles.map((principle) => (
              <div className="principle" key={principle.title}>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
