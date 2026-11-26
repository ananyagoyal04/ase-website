import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { DomainItem } from '../../data/content';
import { Icon, resolveToolIcon } from '../Icon';
import { DomainIcon } from './DomainIcon';

interface DomainDetailDrawerProps {
  domain: DomainItem | null;
  onClose: () => void;
}

export function DomainDetailDrawer({ domain, onClose }: DomainDetailDrawerProps) {
  const prefersReducedMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!domain) return;
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [domain, onClose]);

  return (
    <AnimatePresence>
      {domain && (
        <div
          className="fixed inset-0 z-50 flex justify-end items-end md:items-stretch"
          role="dialog"
          aria-modal="true"
          aria-labelledby="domain-drawer-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#07090C]/80"
          />

          {/* Side panel on desktop, bottom sheet on mobile */}
          <motion.aside
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { x: 40, y: 24, opacity: 0 }
            }
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { x: 40, y: 24, opacity: 0 }
            }
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full md:max-w-md max-h-[85dvh] md:max-h-none md:h-full overflow-y-auto bg-[#111419]/92 border-t md:border-t-0 md:border-l border-[#C5CBD3]/25 rounded-t-xl md:rounded-none p-6 md:p-8 flex flex-col justify-between gap-8"
          >
            <div className="space-y-6">
              {/* Mobile sheet drag handle visual */}
              <div className="md:hidden flex justify-center -mt-2 mb-2" aria-hidden="true">
                <span className="h-1 w-10 rounded-full bg-[#C5CBD3]/30" />
              </div>

              <div className="flex items-start justify-between gap-4 border-b border-[#C5CBD3]/15 pb-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded border border-[#C5CBD3]/25 bg-[#07090C]/80 flex items-center justify-center text-[#C5CBD3]">
                    <DomainIcon domainId={domain.id} className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#C8102E]" aria-hidden="true" />
                      <span className="type-label text-[#C5CBD3]">{domain.code}</span>
                    </div>
                    <h2 id="domain-drawer-title" className="type-h3 text-[#F5F6F8] mt-0.5">
                      {domain.name}
                    </h2>
                  </div>
                </div>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close domain panel"
                  className="h-9 w-9 shrink-0 rounded border border-[#C5CBD3]/25 bg-[#07090C]/80 text-[#C5CBD3] hover:text-[#C8102E] hover:border-[#C5CBD3]/60 inline-flex items-center justify-center transition-colors"
                >
                  <Icon name="x" className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <p className="text-base font-bold text-[#C5CBD3]">{domain.tagline}</p>
                <p className="type-body text-[#C5CBD3]/85">{domain.description}</p>
              </div>

              <div className="space-y-3">
                <h3 className="type-label text-[#C5CBD3]">Core Skills</h3>
                <ul className="flex flex-wrap gap-2">
                  {domain.skills.map((skill) => (
                    <li
                      key={skill}
                      className="px-3 py-1.5 rounded border border-[#C5CBD3]/20 bg-[#07090C]/75 text-sm text-[#F5F6F8]"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="type-label text-[#C5CBD3]">Primary Tooling</h3>
                <ul className="flex flex-wrap gap-2">
                  {domain.tools.map((tool) => (
                    <li
                      key={tool}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-[#C5CBD3]/20 bg-[#171B22]/90 type-label text-[#C5CBD3] hover:text-[#F5F6F8] hover:border-[#C8102E]/60 transition-colors"
                    >
                      <Icon name={resolveToolIcon(tool)} className="w-3.5 h-3.5 text-[#C5CBD3]" />
                      <span>{tool}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded border border-[#C5CBD3]/15 bg-[#07090C]/75 space-y-1">
                <span className="type-label text-[#C5CBD3]/80 block">Track Focus</span>
                <p className="text-sm text-[#F5F6F8]">{domain.featuredFocus}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#C5CBD3]/15 flex flex-wrap items-center justify-between gap-3">
              <Link
                to={`/projects?domain=${encodeURIComponent(domain.shortName)}`}
                onClick={onClose}
                className="inline-flex items-center gap-2 px-5 py-3 rounded text-sm font-bold bg-[#C8102E] text-[#F5F6F8] hover:bg-[#A80D26] transition-colors"
              >
                <span>View {domain.shortName} Projects</span>
                <Icon name="arrow-right" className="w-4 h-4 text-[#F5F6F8]" />
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-3 rounded type-label text-[#C5CBD3]/85 hover:text-[#F5F6F8] transition-colors"
              >
                Close [Esc]
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
