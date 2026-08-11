import { skills } from '../../data/projects';

export default function Skills({ t, lang }) {
  return (
    <section className="section skills-section">
      <div className="content-wrap skills-layout">
        <div className="skills-copy">
          <p className="eyebrow">{t.skills.eyebrow}</p>
          <h2 className="section-title">{t.skills.title}</h2>
          <p className="section-lede">{t.skills.text}</p>
        </div>
        <div className="skills-list">
          {skills.map((skill) => (
            <article key={skill.name} className="skill-row">
              <div className="skill-icon"><img src={skill.icon} alt="" loading="lazy" /></div>
              <div>
                <h3>{skill.name}</h3>
                <p>{lang === 'pt' ? skill.desc : skill.descEn}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
