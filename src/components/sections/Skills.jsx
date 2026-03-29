import FadeContent from '../reactbits/FadeContent';
import AnimatedList from '../reactbits/AnimatedList';
import GlassSurface from '../reactbits/GlassSurface';
import { skills } from '../../data/projects';

export default function Skills({ t, lang }) {
  const skillItems = skills.map((skill) => (
    <div
      key={skill.name}
      style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 16, transition: 'all 0.3s' }}
    >
      <div style={{ width: 48, height: 48, borderRadius: 8, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <img src={skill.icon} alt={skill.name} style={{ width: 32, height: 32, objectFit: 'contain' }} />
      </div>
      <div>
        <h4 style={{ color: 'white', fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{skill.name}</h4>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{lang === 'pt' ? skill.desc : skill.descEn}</p>
      </div>
    </div>
  ));

  return (
    <section style={{ padding: '80px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 600, margin: '0 auto' }}>
        <FadeContent blur>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: 'white', marginBottom: 48, textAlign: 'center', letterSpacing: '-0.02em' }}>
            {t.skills.title}
            <span style={{ color: '#5227FF' }}>.</span>
          </h2>
        </FadeContent>

        <FadeContent blur delay={0.2}>
          <GlassSurface
            width="100%"
            height="auto"
            borderRadius={20}
            borderWidth={0.06}
            brightness={35}
            opacity={0.9}
            blur={28}
            backgroundOpacity={0.25}
            saturation={1.4}
          >
            <div style={{ padding: 16, width: '100%' }}>
              <AnimatedList
                items={skillItems}
                className="flex flex-col gap-3"
                staggerDelay={0.12}
              />
            </div>
          </GlassSurface>
        </FadeContent>
      </div>
    </section>
  );
}
