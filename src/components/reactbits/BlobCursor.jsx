import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

export default function BlobCursor({
  blobType = 'circle',
  fillColor = '#5227FF',
  trailCount = 3,
  sizes = [60, 125, 75],
  opacities = [0.6, 0.6, 0.6],
  filterStdDeviation = 30,
  fastDuration = 0.1,
  slowDuration = 0.5,
  zIndex = 100
}) {
  const containerRef = useRef(null);
  const blobsRef = useRef([]);

  const updateOffset = useCallback(() => {
    if (!containerRef.current) return { left: 0, top: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return { left: rect.left, top: rect.top };
  }, []);

  const handleMove = useCallback(e => {
    const { left, top } = updateOffset();
    const cx = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    const cy = 'clientY' in e ? e.clientY : e.touches[0].clientY;
    blobsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        x: cx - left,
        y: cy - top,
        duration: i === 0 ? fastDuration : slowDuration,
        ease: i === 0 ? 'power3.out' : 'power1.out'
      });
    });
  }, [updateOffset, fastDuration, slowDuration]);

  useEffect(() => {
    window.addEventListener('resize', updateOffset);
    return () => window.removeEventListener('resize', updateOffset);
  }, [updateOffset]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      style={{ position: 'fixed', inset: 0, zIndex, pointerEvents: 'none' }}
    >
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="blob-filter">
          <feGaussianBlur in="SourceGraphic" stdDeviation={filterStdDeviation} result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10" />
        </filter>
      </svg>
      <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', filter: 'url(#blob-filter)' }}>
        {Array.from({ length: trailCount }).map((_, i) => (
          <div
            key={i}
            ref={el => (blobsRef.current[i] = el)}
            style={{
              position: 'absolute',
              width: sizes[i],
              height: sizes[i],
              borderRadius: blobType === 'circle' ? '50%' : '0%',
              backgroundColor: fillColor,
              opacity: opacities[i],
              transform: 'translate(-50%, -50%)',
              willChange: 'transform',
            }}
          />
        ))}
      </div>
    </div>
  );
}
