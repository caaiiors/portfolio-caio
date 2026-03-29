import { useRef, useEffect } from 'react';

export default function BorderGlow({ children, className = '', glowColor = 'rgba(82, 39, 255, 0.4)', glowSize = 2 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--glow-x', `${x}px`);
      el.style.setProperty('--glow-y', `${y}px`);
    };
    el.addEventListener('mousemove', handleMouseMove);
    return () => el.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{
        '--glow-color': glowColor,
        '--glow-size': `${glowSize}px`,
      }}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at var(--glow-x) var(--glow-y), var(--glow-color), transparent 40%)`,
        }}
      />
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at var(--glow-x) var(--glow-y), var(--glow-color), transparent 40%)`,
          mixBlendMode: 'overlay',
        }}
      />
      {children}
      <style>{`
        .relative:hover > .pointer-events-none { opacity: 1 !important; }
      `}</style>
    </div>
  );
}
