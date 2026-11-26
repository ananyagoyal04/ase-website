import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';

export function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none h-[2px] w-full bg-white/[0.06] overflow-hidden"
    >
      <motion.div
        className="h-full w-full origin-left bg-[#C8102E]"
        style={{ scaleX: prefersReducedMotion ? scrollYProgress : scaleX }}
      />
    </div>
  );
}
