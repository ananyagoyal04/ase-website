import { useCallback, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { siteContent, type DomainItem } from '../../data/content';
import { DomainIcon } from './DomainIcon';

interface SingularityDropProps {
  activeDomainId: string | null;
  onCaptureDomain: (domain: DomainItem) => void;
}

interface OrbitSlot {
  xPct: number;
  yPct: number;
}

const ORBIT_SLOTS: OrbitSlot[] = [
  { xPct: 16, yPct: 22 },
  { xPct: 84, yPct: 22 },
  { xPct: 14, yPct: 76 },
  { xPct: 86, yPct: 76 },
  { xPct: 50, yPct: 14 },
];

const PULL_RADIUS = 155;
const CAPTURE_RADIUS = 72;

export function SingularityDrop({
  activeDomainId,
  onCaptureDomain,
}: SingularityDropProps) {
  const { items } = siteContent.domains;
  const prefersReducedMotion = useReducedMotion();
  const arenaRef = useRef<HTMLDivElement | null>(null);
  const coreRef = useRef<HTMLDivElement | null>(null);

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [nearCore, setNearCore] = useState(false);
  const [absorbingId, setAbsorbingId] = useState<string | null>(null);
  const [absorbedId, setAbsorbedId] = useState<string | null>(null);
  const [ringPulse, setRingPulse] = useState(false);

  const dragStartRef = useRef<{
    id: string;
    startX: number;
    startY: number;
    moved: boolean;
  } | null>(null);

  const isDomainAbsorbed = (domainId: string) =>
    activeDomainId !== null && absorbedId === domainId;

  const triggerCapture = useCallback(
    (domain: DomainItem) => {
      if (absorbingId) return;
      setDraggingId(null);
      setDragOffset({ x: 0, y: 0 });
      setNearCore(false);
      setAbsorbingId(domain.id);
      setRingPulse(true);

      const delay = prefersReducedMotion ? 40 : 340;
      window.setTimeout(() => {
        setAbsorbedId(domain.id);
        setAbsorbingId(null);
        setRingPulse(false);
        onCaptureDomain(domain);
      }, delay);
    },
    [absorbingId, onCaptureDomain, prefersReducedMotion]
  );

  const getCoreDistance = (clientX: number, clientY: number) => {
    const core = coreRef.current;
    if (!core) return { dx: 0, dy: 0, dist: Infinity };
    const rect = core.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = cx - clientX;
    const dy = cy - clientY;
    return { dx, dy, dist: Math.hypot(dx, dy) };
  };

  const handlePointerDown = (
    e: React.PointerEvent<HTMLButtonElement>,
    domain: DomainItem
  ) => {
    if (absorbingId || isDomainAbsorbed(domain.id)) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStartRef.current = {
      id: domain.id,
      startX: e.clientX,
      startY: e.clientY,
      moved: false,
    };
    setDraggingId(domain.id);
    setDragOffset({ x: 0, y: 0 });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const state = dragStartRef.current;
    if (!state) return;

    const rawDx = e.clientX - state.startX;
    const rawDy = e.clientY - state.startY;
    if (Math.hypot(rawDx, rawDy) > 6) {
      state.moved = true;
    }

    const { dx: toCoreX, dy: toCoreY, dist } = getCoreDistance(e.clientX, e.clientY);
    const insidePull = dist <= PULL_RADIUS;
    setNearCore(insidePull);

    // Subtle gravitational pull toward core when approaching PULL_RADIUS
    if (insidePull && !prefersReducedMotion) {
      const pullFactor = Math.max(0, 1 - dist / PULL_RADIUS) * 0.42;
      setDragOffset({
        x: rawDx + toCoreX * pullFactor,
        y: rawDy + toCoreY * pullFactor,
      });
    } else {
      setDragOffset({ x: rawDx, y: rawDy });
    }
  };

  const handlePointerUp = (
    e: React.PointerEvent<HTMLButtonElement>,
    domain: DomainItem
  ) => {
    const state = dragStartRef.current;
    dragStartRef.current = null;
    if (!state) return;

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    const { dist } = getCoreDistance(e.clientX, e.clientY);
    const isTap = !state.moved;
    const isHit = dist <= CAPTURE_RADIUS;

    if (isTap || isHit) {
      triggerCapture(domain);
    } else {
      setDraggingId(null);
      setDragOffset({ x: 0, y: 0 });
      setNearCore(false);
    }
  };

  return (
    <div className="metal-card rounded-lg p-4 sm:p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#C5CBD3]/15 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C8102E]" aria-hidden="true" />
            <span className="type-mono text-[#C5CBD3]">INTERACTION 02 // SINGULARITY</span>
          </div>
          <p className="text-sm text-[#8E929B]">
            Drag any domain node into the core—or tap / press Enter—to collapse and inspect its blueprint.
          </p>
        </div>
        <span className="type-mono text-[#8E929B] shrink-0">
          {nearCore ? 'EVENT HORIZON LOCKED' : 'GRAVITY WELL READY'}
        </span>
      </div>

      {/* Bounded Singularity Arena */}
      <div
        ref={arenaRef}
        className="relative h-[440px] sm:h-[480px] rounded border border-[#C5CBD3]/15 bg-[#07090C] overflow-hidden select-none"
      >
        {/* Subtle radial horizon markers */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div className="h-[300px] w-[300px] sm:h-[340px] sm:w-[340px] rounded-full border border-dashed border-[#C5CBD3]/10" />
          <div className="absolute h-[190px] w-[190px] rounded-full border border-[#C5CBD3]/10" />
        </div>

        {/* Center Black Hole Target */}
        <div
          ref={coreRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        >
          {/* Subtle crimson edge light */}
          <motion.div
            animate={
              ringPulse
                ? { scale: [1, 1.24, 1], opacity: [0.5, 0.95, 0.45] }
                : nearCore
                ? { scale: 1.12, opacity: 0.85 }
                : { scale: 1, opacity: 0.4 }
            }
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute h-40 w-40 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(200,16,46,0.22) 34%, rgba(200,16,46,0.06) 58%, transparent 72%)',
            }}
          />

          {/* Slow rotating titanium accretion gradient ring */}
          <motion.div
            animate={prefersReducedMotion ? undefined : { rotate: 360 }}
            transition={
              prefersReducedMotion
                ? undefined
                : { repeat: Infinity, duration: 18, ease: 'linear' }
            }
            className="h-32 w-32 rounded-full p-[1.5px]"
            style={{
              background:
                'conic-gradient(from 0deg, rgba(197,203,211,0.55), rgba(200,16,46,0.55) 22%, rgba(197,203,211,0.1) 50%, rgba(197,203,211,0.45) 78%, rgba(197,203,211,0.55))',
            }}
          >
            <div className="h-full w-full rounded-full bg-[#07090C]" />
          </motion.div>

          {/* Inner event-horizon void */}
          <motion.div
            animate={{
              scale: ringPulse ? 1.1 : nearCore ? 1.06 : 1,
            }}
            transition={{ type: 'spring', stiffness: 280, damping: 20 }}
            className="absolute h-24 w-24 rounded-full bg-[#040507] border border-[#C5CBD3]/25 flex flex-col items-center justify-center text-center"
          >
            <span className="font-mono text-[10px] tracking-[0.14em] text-[#C5CBD3] uppercase">
              CORE
            </span>
            <span className="font-mono text-[9px] text-[#8E929B] mt-0.5">
              {nearCore ? 'DROP' : 'DRAG / TAP'}
            </span>
          </motion.div>
        </div>

        {/* Orbiting Draggable / Clickable / Keyboard-accessible Domain Icons */}
        {items.map((domain, idx) => {
          const slot = ORBIT_SLOTS[idx % ORBIT_SLOTS.length];
          const isDragging = draggingId === domain.id;
          const isAbsorbing = absorbingId === domain.id;
          const isAbsorbed = isDomainAbsorbed(domain.id);

          return (
            <motion.button
              key={domain.id}
              type="button"
              onPointerDown={(e) => handlePointerDown(e, domain)}
              onPointerMove={handlePointerMove}
              onPointerUp={(e) => handlePointerUp(e, domain)}
              onPointerCancel={() => {
                dragStartRef.current = null;
                setDraggingId(null);
                setDragOffset({ x: 0, y: 0 });
                setNearCore(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  triggerCapture(domain);
                }
              }}
              aria-label={`Inspect ${domain.name} via Singularity`}
              style={{
                left: `${slot.xPct}%`,
                top: `${slot.yPct}%`,
                touchAction: 'none',
              }}
              animate={
                isAbsorbing
                  ? {
                      x: '-50%',
                      y: '-50%',
                      scale: 0.15,
                      rotate: prefersReducedMotion ? 0 : 220,
                      opacity: 0,
                    }
                  : isAbsorbed
                  ? {
                      x: '-50%',
                      y: '-50%',
                      scale: 0,
                      opacity: 0,
                    }
                  : isDragging
                  ? {
                      x: `calc(-50% + ${dragOffset.x}px)`,
                      y: `calc(-50% + ${dragOffset.y}px)`,
                      scale: nearCore ? 0.84 : 1.05,
                      rotate: nearCore && !prefersReducedMotion ? 16 : 0,
                      opacity: 1,
                    }
                  : {
                      x: '-50%',
                      y: '-50%',
                      scale: 1,
                      rotate: 0,
                      opacity: 1,
                    }
              }
              transition={
                isDragging
                  ? { type: 'spring', stiffness: 450, damping: 32 }
                  : { type: 'spring', stiffness: 260, damping: 24 }
              }
              className={[
                'absolute z-10 -translate-x-0 -translate-y-0 group flex flex-col items-center gap-1.5 p-2.5 sm:px-3.5 sm:py-2.5 rounded-lg border bg-[#111419] transition-colors cursor-grab active:cursor-grabbing',
                isDragging
                  ? 'z-20 border-[#C8102E] text-[#F5F6F8]'
                  : 'border-[#C5CBD3]/25 text-[#F5F6F8] hover:border-[#C5CBD3]/60',
              ].join(' ')}
            >
              <span className="h-9 w-9 rounded-full border border-[#C5CBD3]/25 bg-[#07090C] flex items-center justify-center text-[#F5F6F8] group-hover:border-[#C8102E]/70 transition-colors">
                <DomainIcon domainId={domain.id} className="w-4 h-4" />
              </span>
              <span className="font-mono text-[10px] tracking-wider uppercase text-[#C5CBD3] whitespace-nowrap">
                {domain.shortName}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
