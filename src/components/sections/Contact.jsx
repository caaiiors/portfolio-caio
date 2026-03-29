import FadeContent from '../reactbits/FadeContent';
import GlassSurface from '../reactbits/GlassSurface';
import Dock from '../reactbits/Dock';
import { socials } from '../../data/projects';
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const iconMap = {
  instagram: <FaInstagram size={22} />,
  twitter: <FaXTwitter size={22} />,
  github: <FaGithub size={22} />,
  linkedin: <FaLinkedin size={22} />,
};

export default function Contact({ t }) {
  const dockItems = socials.map(social => ({
    icon: <div style={{ color: 'white' }}>{iconMap[social.icon]}</div>,
    label: social.name,
    onClick: () => window.open(social.url, '_blank'),
  }));

  return (
    <section id="contact" style={{ padding: '128px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
        <FadeContent blur>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: 'white', marginBottom: 24, letterSpacing: '-0.02em' }}>
            {t.contact.title}
            <span style={{ color: '#5227FF' }}>.</span>
          </h2>
        </FadeContent>

        <FadeContent blur delay={0.2}>
          <GlassSurface
            width="100%"
            height="auto"
            borderRadius={24}
            borderWidth={0.06}
            brightness={35}
            opacity={0.9}
            blur={28}
            backgroundOpacity={0.25}
            saturation={1.4}
          >
            <div style={{ padding: '40px 32px', textAlign: 'center', width: '100%' }}>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, marginBottom: 32, lineHeight: 1.6 }}>
                {t.contact.text}
              </p>
              <a
                href="mailto:caiorissa@gmail.com?subject=Contato%20via%20Portfólio"
                style={{ display: 'inline-block', padding: '16px 40px', background: '#5227FF', color: 'white', fontWeight: 500, borderRadius: 16, textDecoration: 'none', fontSize: 18, transition: 'all 0.3s' }}
                onMouseEnter={e => e.target.style.background = '#6b3fff'}
                onMouseLeave={e => e.target.style.background = '#5227FF'}
              >
                {t.contact.email}
              </a>
            </div>
          </GlassSurface>
        </FadeContent>

        <FadeContent blur delay={0.6}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24, marginTop: 64 }}>
            {t.contact.social}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', minHeight: 80 }}>
            <Dock
              items={dockItems}
              magnification={60}
              baseItemSize={42}
              panelHeight={56}
              dockHeight={100}
              distance={140}
            />
          </div>
        </FadeContent>
      </div>
    </section>
  );
}
