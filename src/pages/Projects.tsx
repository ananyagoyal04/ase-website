import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react';
import { siteContent, type ProjectItem } from '../data/content';
import { Icon, resolveToolIcon } from '../components/Icon';
import { Reveal } from '../components/Reveal';

export default function Projects() {
  const { kicker, subtitle, items } = siteContent.projects;
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
    <div className="bg-transparent">
      {/* Page Header */}
      <section className="py-16 md:py-24 border-b border-[#C5CBD3]/20">
        <div className="ase-container">
          <Reveal from="left" className="max-w-3xl space-y-5">
            <div className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C8102E]" aria-hidden="true" />
              <span className="type-label text-[#C5CBD3]">{kicker}</span>
            </div>
            <h1 className="type-h1 text-[#F5F6F8]">
              Systems <span className="font-script-accent text-[#C8102E]">engineered</span> by students.
            </h1>
            <p className="type-body-lg text-[#C5CBD3]">{subtitle}</p>
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
                      'px-4 py-2 rounded type-label border transition-colors',
                      isSelected
                        ? 'bg-[#C8102E] border-[#C8102E] text-[#F5F6F8]'
                        : 'bg-[#111419]/80 border-[#C5CBD3]/25 text-[#C5CBD3] hover:text-[#F5F6F8] hover:border-[#C5CBD3]/60',
                    ].join(' ')}
                  >
                    {domain}
                  </button>
                );
              })}
            </div>

            <span className="type-label text-[#C5CBD3]/80">
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
                        <span className="inline-flex items-center gap-2 type-label text-[#C5CBD3]/80">
                          <Icon name="folder-git" className="w-4 h-4 text-[#C5CBD3] group-hover:text-[#C8102E] transition-colors" />
                          <span>[ {project.code} ]</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded border border-[#C5CBD3]/20 bg-[#07090C]/75 type-label text-[#C5CBD3]">
                            {project.domain}
                          </span>
                          <span className="px-2.5 py-0.5 rounded border border-[#C8102E]/50 bg-[#07090C]/75 type-label text-[#F5F6F8]">
                            {project.status}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h2 className="type-h3 text-[#F5F6F8]">{project.title}</h2>
                        <p className="type-body text-[#C5CBD3]/85">{project.summary}</p>
                      </div>
                    </div>

                    <div className="space-y-4 pt-2">
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#C5CBD3]/20 bg-[#07090C]/75 text-xs text-[#C5CBD3]"
                          >
                            <Icon name={resolveToolIcon(tech)} className="w-3.5 h-3.5 text-[#C5CBD3]" />
                            <span>{tech}</span>
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-[#C5CBD3]/15 type-label text-[#C5CBD3]">
                        <span>Inspect Architecture</span>
                        <Icon
                          name="arrow-right"
                          className="w-4 h-4 text-[#C5CBD3] group-hover:text-[#C8102E] group-hover:translate-x-1 transition-all"
                        />
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
                    className="relative z-10 w-full max-w-2xl max-h-[88dvh] overflow-y-auto rounded-lg border border-[#C5CBD3]/30 bg-[#111419]/92 p-6 sm:p-8 space-y-6"
                  >
                    <div className="flex items-start justify-between gap-4 border-b border-[#C5CBD3]/15 pb-5">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#C8102E]" aria-hidden="true" />
                          <span className="type-label text-[#C5CBD3]">{selectedProject.code}</span>
                          <span className="type-label text-[#C5CBD3]/75">· {selectedProject.domain}</span>
                          <span className="type-label text-[#C5CBD3]/75">· {selectedProject.status}</span>
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
                        className="h-9 w-9 shrink-0 rounded border border-[#C5CBD3]/25 bg-[#07090C]/80 text-[#C5CBD3] hover:text-[#C8102E] hover:border-[#C5CBD3]/60 inline-flex items-center justify-center transition-colors"
                      >
                        <Icon name="x" className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <p className="type-body-lg text-[#C5CBD3]">{selectedProject.summary}</p>
                      <p className="type-body text-[#C5CBD3]/85">{selectedProject.description}</p>
                    </div>

                    <div className="space-y-3">
                      <h3 className="type-label text-[#C5CBD3]">Tech Stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.stack.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#C5CBD3]/20 bg-[#07090C]/75 text-xs text-[#F5F6F8]"
                          >
                            <Icon name={resolveToolIcon(tech)} className="w-3.5 h-3.5 text-[#C5CBD3]" />
                            <span>{tech}</span>
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
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded text-sm font-bold bg-[#C8102E] text-[#F5F6F8] hover:bg-[#A80D26] transition-colors"
                          >
                            <Icon name="github" className="w-4 h-4 text-[#F5F6F8]" />
                            <span>{link.label}</span>
                            <Icon name="arrow-up-right" className="w-4 h-4 text-[#F5F6F8]" />
                          </a>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedProject(null)}
                        className="px-3 py-2 type-label text-[#C5CBD3]/85 hover:text-[#F5F6F8] transition-colors"
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
