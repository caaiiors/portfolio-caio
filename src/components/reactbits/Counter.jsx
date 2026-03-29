import { motion, useSpring, useTransform, useInView } from 'motion/react';
import { useEffect, useRef } from 'react';

function Digit({ place, value, height, fontSize }) {
  const valueRoundedToPlace = Math.floor(value / place);
  const animatedValue = useSpring(0, { stiffness: 80, damping: 20 });

  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace, inView]);

  return (
    <div ref={ref} className="relative overflow-hidden tabular-nums" style={{ width: '1ch', height }}>
      {Array.from({ length: 10 }, (_, i) => (
        <DigitNumber key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </div>
  );
}

function DigitNumber({ mv, number, height }) {
  const y = useTransform(mv, latest => {
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) memo -= 10 * height;
    return memo;
  });

  return (
    <motion.span
      style={{ y }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {number}
    </motion.span>
  );
}

export default function Counter({
  value,
  fontSize = 48,
  textColor = 'white',
  fontWeight = 'bold',
  className = ''
}) {
  const height = fontSize;
  const places = [];
  const str = Math.abs(value).toString();
  for (let i = 0; i < str.length; i++) {
    places.push(Math.pow(10, str.length - i - 1));
  }

  return (
    <div className={`inline-flex overflow-hidden leading-none ${className}`} style={{ fontSize, color: textColor, fontWeight }}>
      {places.map((place, i) => (
        <Digit key={i} place={place} value={Math.abs(value)} height={height} fontSize={fontSize} />
      ))}
    </div>
  );
}
