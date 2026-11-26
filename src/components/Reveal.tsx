import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

type RevealDirection = 'left' | 'right' | 'up';

interface RevealProps {
  children: ReactNode;
  from?: RevealDirection;
  delay?: number;
  className?: string;
}

const OFFSETS: Record<RevealDirection, { x: number; y: number }> = {
  left: { x: -28, y: 0 },
  right: { x: 28, y: 0 },
  up: { x: 0, y: 24 },
};

export function Reveal({
  children,
  from = 'up',
  delay = 0,
  className = '',
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const offset = OFFSETS[from];

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
