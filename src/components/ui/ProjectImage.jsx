export default function ProjectImage({
  project,
  lang,
  priority = false,
  sizes = '(max-width: 760px) 92vw, 60vw',
}) {
  const base = project.image.replace(/\.png$/, '');
  return (
    <img
      src={`${base}-1280.webp`}
      srcSet={`${base}-640.webp 640w, ${base}-1280.webp 1280w`}
      sizes={sizes}
      width={project.width}
      height={project.height}
      alt={lang === 'pt' ? project.alt : project.altEn}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  );
}
