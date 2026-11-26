import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react';
import { siteContent, type ProjectItem } from '../data/content';
import { Reveal } from '../components/Reveal';

export default function Projects() {
  const { kicker, headline, subtitle, items } = siteContent.projects;
  const [searchParams, setSearchParams] = useSearchParams();
  const prefersReducedMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const domains = useMemo(() => {
    const unique = Array.from(new Set(items.map((p) => p.domain)));
    return ['All', ...unique];
  }, [items]);

  const paramDomain = searchParams.get('domain');
  const activeFilter =
    paramDomain && domains.includes(paramDomain) ? paramDomain : 'All';

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return items;
    return items.filter((item) => item.domain === activeFilter);
  }, [items, activeFilter]);

  const handleFilterChange = (domain: string) => {
    if (domain === 'All') {
      searchParams.delete('domain');
      setSearchParams(searchParams, { replace: true });
    } else {
      setSearchParams({ domain }, { replace: true });
    }
  };

  useEffect(() => {
    if (!selectedProject) return;
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedProject]);

  return (
    <div className="bg-[#07090C]">
      {/* Page Header */}
      <section className="py-16 md:py-24 border-b border-[#C5CBD3]/15">
        <div className="ase-container">
          <Reveal from="left" className="max-w-3xl space-y-5">
            <div className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C8102E]" aria-hidden="true" />
              <span className="type-mono text-[#C5CBD3]">{kicker}</span>
            </div>
            <h1 className="type-h1 text-[#F5F6F8]">{headline}</h1>
            <p className="type-body-lg text-[#8E929B]">{subtitle}</p>
          </Reveal>
        </div>
      </section>

      {/* Filter Bar + Project Grid */}
      <section className="py-16 md:py-24">
        <div className="ase-container space-y-10">
          <Reveal from="right" className="flex flex-wrap items-center justify-between gap-4">
            <div
              role="group"
              aria-label="Filter projects by domain"
              className="flex flex-wrap items-center gap-2"
            >
              {domains.map((domain) => {
                const isSelected = activeFilter === domain;
                return (
                  <button
                    key={domain}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => handleFilterChange(domain)}
                    className={[
                      'px-4 py-2 rounded font-mono text-xs uppercase tracking-wider border transition-colors',
                      isSelected
                        ? 'bg-[#C8102E] border-[#C8102E] text-[#F5F6F8]'
                        : 'bg-[#111419] border-[#C5CBD3]/20 text-[#8E929B] hover:text-[#F5F6F8] hover:border-[#C5CBD3]/50',
                    ].join(' ')}
                  >
                    {domain}
                  </button>
                );
              })}
            </div>

            <span className="type-mono text-[#8E929B]">
              {filteredProjects.length} {filteredProjects.length === 1 ? 'PROJECT' : 'PROJECTS'}
            </span>
          </Reveal>

          <LayoutGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project, idx) => (
                <Reveal
                  key={project.id}
                  from={idx % 2 === 0 ? 'left' : 'right'}
                  delay={idx * 0.06}
                  className="h-full"
                >
                  <motion.button
                    type="button"
                    layoutId={prefersReducedMotion ? undefined : `project-card-${project.id}`}
                    onClick={() => setSelectedProject(project)}
                    className="metal-card rounded-lg p-6 md:p-7 w-full h-full text-left flex flex-col justify-between gap-6 group"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="type-mono text-[#8E929B]">[ {project.code} ]</span>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded border border-[#C5CBD3]/20 bg-[#07090C] font-mono text-[10px] uppercase tracking-wider text-[#C5CBD3]">
                            {project.domain}
                          </span>
                          <span className="px-2.5 py-0.5 rounded border border-[#C8102E]/40 bg-[#07090C] font-mono text-[10px] uppercase tracking-wider text-[#F5F6F8]">
                            {project.status}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h2 className="type-h3 text-[#F5F6F8] group-hover:text-white">
                          {project.title}
                        </h2>
                        <p className="type-body text-[#8E929B]">{project.summary}</p>
                      </div>
                    </div>

                    <div className="space-y-4 pt-2">
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded border border-[#C5CBD3]/15 bg-[#07090C] font-mono text-[11px] text-[#C5CBD3]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-[#C5CBD3]/12 text-xs font-mono uppercase tracking-wider text-[#C5CBD3]">
                        <span>Inspect Architecture</span>
                        <span
                          aria-hidden="true"
                          className="text-[#C8102E] group-hover:translate-x-1 transition-transform"
                        >
                          →
                        </span>
                      </div>
                    </div>
                  </motion.button>
                </Reveal>
              ))}
            </div>

            {/* Expanded Detail View (Shared Layout Animation) */}
            <AnimatePresence>
              {selectedProject && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="project-modal-title"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                    onClick={() => setSelectedProject(null)}
                    className="fixed inset-0 bg-[#07090C]/85"
                  />

                  <motion.article
                    layoutId={
                      prefersReducedMotion
                        ? undefined
                        : `project-card-${selectedProject.id}`
                    }
                    initial={prefersReducedMotion ? { opacity: 1 } : undefined}
                    animate={{ opacity: 1 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : undefined}
                    transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                    className="relative z-10 w-full max-w-2xl max-h-[88dvh] overflow-y-auto rounded-lg border border-[#C5CBD3]/30 bg-[#111419] p-6 sm:p-8 space-y-6"
                  >
                    <div className="flex items-start justify-between gap-4 border-b border-[#C5CBD3]/15 pb-5">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#C8102E]" aria-hidden="true" />
                          <span className="type-mono text-[#C5CBD3]">{selectedProject.code}</span>
                          <span className="type-mono text-[#8E929B]">· {selectedProject.domain}</span>
                          <span className="type-mono text-[#8E929B]">· {selectedProject.status}</span>
                        </div>
                        <h2 id="project-modal-title" className="type-h2 text-[#F5F6F8]">
                          {selectedProject.title}
                        </h2>
                      </div>

                      <button
                        ref={closeButtonRef}
                        type="button"
                        onClick={() => setSelectedProject(null)}
                        aria-label="Close project details"
                        className="h-9 w-9 shrink-0 rounded border border-[#C5CBD3]/25 bg-[#07090C] text-[#C5CBD3] hover:text-[#F5F6F8] hover:border-[#C5CBD3]/60 inline-flex items-center justify-center transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path
                            d="M3.5 3.5L12.5 12.5M12.5 3.5L3.5 12.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-4">
                      <p className="type-body-lg text-[#C5CBD3]">{selectedProject.summary}</p>
                      <p className="type-body text-[#8E929B]">{selectedProject.description}</p>
                    </div>

                    <div className="space-y-3">
                      <h3 className="type-mono text-[#C5CBD3]">Tech Stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 rounded border border-[#C5CBD3]/20 bg-[#07090C] font-mono text-xs text-[#F5F6F8]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#C5CBD3]/15 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded text-sm font-medium bg-[#C8102E] text-[#F5F6F8] hover:bg-[#A80D26] transition-colors"
                          >
                            <span>{link.label}</span>
                            <span aria-hidden="true">↗</span>
                          </a>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedProject(null)}
                        className="px-3 py-2 font-mono text-xs uppercase tracking-wider text-[#8E929B] hover:text-[#F5F6F8] transition-colors"
                      >
                        Close [Esc]
                      </button>
                    </div>
                  </motion.article>
                </div>
              )}
            </AnimatePresence>
          </LayoutGroup>
        </div>
      </section>
    </div>
  );
}
