import { skills } from '../../data/projects';

export default function Skills({ t, lang }) {
  return (
    <section
      id="skills"
      className="skills-section"
      aria-labelledby="skills-title"
    >
      <div className="content-wrap">
        <div className="skills-heading">
          <h2 id="skills-title">{t.skills.title}</h2>
          <p>{t.skills.text}</p>
        </div>
        <div className="skills-list">
          {skills.map((skill) => (
            <div key={skill.name} className="skill-row">
              <img
                src={skill.icon}
                width="24"
                height="24"
                alt=""
                loading="lazy"
              />
              <div>
                <h3>{skill.name}</h3>
                <p>{lang === 'pt' ? skill.desc : skill.descEn}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
