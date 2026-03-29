import FadeContent from '../reactbits/FadeContent';
import Counter from '../reactbits/Counter';
import GlassSurface from '../reactbits/GlassSurface';

export default function About({ t }) {
  return (
    <section id="about" style={{ padding: '128px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 900, margin: '0 auto' }}>
        <FadeContent blur>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: 'white', marginBottom: 48, textAlign: 'center', letterSpacing: '-0.02em' }}>
            {t.about.title}
            <span style={{ color: '#5227FF' }}>.</span>
          </h2>
        </FadeContent>

        <FadeContent blur delay={0.2}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 48 }}>
            <GlassSurface
              width="100%"
              height="auto"
              borderRadius={20}
              borderWidth={0.08}
              brightness={40}
              opacity={0.9}
              blur={28}
              backgroundOpacity={0.25}
              saturation={1.4}
            >
              <div style={{ padding: 24, textAlign: 'center' }}>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, lineHeight: 1.7 }}>
                  {t.about.text}
                </p>
              </div>
            </GlassSurface>
          </div>
        </FadeContent>

        <FadeContent blur delay={0.4}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, maxWidth: 600, margin: '0 auto' }}>
            <GlassSurface width="100%" height="auto" borderRadius={16} borderWidth={0.06} brightness={35} opacity={0.85} blur={24} backgroundOpacity={0.2} saturation={1.4}>
              <div style={{ padding: '24px 16px', textAlign: 'center', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 2 }}>
                  <Counter value={7} fontSize={32} textColor="#5227FF" fontWeight="bold" />
                  <span style={{ color: '#5227FF', fontSize: 24, fontWeight: 700 }}>+</span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 8 }}>{t.stats.projects}</p>
              </div>
            </GlassSurface>

            <GlassSurface width="100%" height="auto" borderRadius={16} borderWidth={0.06} brightness={35} opacity={0.85} blur={24} backgroundOpacity={0.2} saturation={1.4}>
              <div style={{ padding: '24px 16px', textAlign: 'center', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 2 }}>
                  <Counter value={3} fontSize={32} textColor="#5227FF" fontWeight="bold" />
                  <span style={{ color: '#5227FF', fontSize: 24, fontWeight: 700 }}>+</span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 8 }}>{t.stats.clients}</p>
              </div>
            </GlassSurface>

            <GlassSurface width="100%" height="auto" borderRadius={16} borderWidth={0.06} brightness={35} opacity={0.85} blur={24} backgroundOpacity={0.2} saturation={1.4}>
              <div style={{ padding: '24px 16px', textAlign: 'center', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
                  <Counter value={2024} fontSize={24} textColor="#5227FF" fontWeight="bold" />
                </div>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 8 }}>{t.stats.year}</p>
              </div>
            </GlassSurface>
          </div>
        </FadeContent>
      </div>
    </section>
  );
}
