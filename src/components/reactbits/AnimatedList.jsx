import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const AnimatedItem = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedList = ({ items = [], className = '', staggerDelay = 0.1 }) => {
  return (
    <div className={className}>
      {items.map((item, index) => (
        <AnimatedItem key={index} delay={index * staggerDelay}>
          {item}
        </AnimatedItem>
      ))}
    </div>
  );
};

export default AnimatedList;
