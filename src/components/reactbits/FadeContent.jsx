import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const FadeContent = ({
  children,
  blur = false,
  duration = 0.8,
  delay = 0,
  yOffset = 20,
  className = '',
  ...props
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset, filter: blur ? 'blur(10px)' : 'none' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default FadeContent;
