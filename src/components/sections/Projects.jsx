import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import FadeContent from '../reactbits/FadeContent';
import GlareHover from '../reactbits/GlareHover';
import { projects } from '../../data/projects';

const tiltSpring = { damping: 15, stiffness: 200, mass: 0.8 };

function ProjectCard({ project, t, lang, index }) {
  const ref = useRef(null);
  const rotateX = useSpring(0, tiltSpring);
  const rotateY = useSpring(0, tiltSpring);
  const cardScale = useSpring(1, tiltSpring);

  function handleMouse(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(y * -20);
    rotateY.set(x * 20);
  }

  return (
    <FadeContent blur delay={index * 0.1} yOffset={30}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseEnter={() => cardScale.set(1.05)}
        onMouseLeave={() => { rotateX.set(0); rotateY.set(0); cardScale.set(1); }}
        style={{ rotateX, rotateY, scale: cardScale, perspective: 600, transformStyle: 'preserve-3d', cursor: 'pointer' }}
      >
        <GlareHover
          width="100%"
          height="auto"
          background="rgba(255,255,255,0.02)"
          borderRadius="16px"
          borderColor="rgba(255,255,255,0.08)"
          glareColor="#5227FF"
          glareOpacity={0.15}
          transitionDuration={800}
        >
          <div style={{ overflow: 'hidden', borderRadius: '16px 16px 0 0' }}>
            <img
              src={project.image}
              alt={project.title}
              style={{ width: '100%', height: 200, objectFit: 'cover', objectPosition: 'top', display: 'block', transition: 'transform 0.5s' }}
              draggable={false}
            />
          </div>

          <div style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <h3 style={{ color: 'white', fontWeight: 700, fontSize: 16 }}>{project.title}</h3>
              {project.featured && (
                <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#5227FF', background: 'rgba(82,39,255,0.1)', padding: '2px 8px', borderRadius: 20, fontWeight: 500 }}>
                  Pro
                </span>
              )}
            </div>

            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 16, lineHeight: 1.5 }}>
              {lang === 'pt' ? project.description : (project.descriptionEn || project.description)}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
              {project.tech.map(tech => (
                <span key={tech} style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', padding: '3px 10px', borderRadius: 20 }}>
                  {tech}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 12, fontWeight: 500, padding: '8px 16px', background: '#5227FF', color: 'white', borderRadius: 8, textDecoration: 'none', transition: 'all 0.3s' }}>
                  {project.github ? t.projects.demo : t.projects.site}
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 12, fontWeight: 500, padding: '8px 16px', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', borderRadius: 8, textDecoration: 'none', transition: 'all 0.3s' }}>
                  {t.projects.code}
                </a>
              )}
            </div>
          </div>
        </GlareHover>
      </motion.div>
    </FadeContent>
  );
}

export default function Projects({ t, lang }) {
  return (
    <section id="projects" style={{ padding: '128px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 1100, margin: '0 auto' }}>
        <FadeContent blur>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: 'white', marginBottom: 64, textAlign: 'center', letterSpacing: '-0.02em' }}>
            {t.projects.title}
            <span style={{ color: '#5227FF' }}>.</span>
          </h2>
        </FadeContent>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} t={t} lang={lang} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
