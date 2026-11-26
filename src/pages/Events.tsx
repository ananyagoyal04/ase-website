import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { siteContent } from '../data/content';
import { Icon } from '../components/Icon';
import { Reveal } from '../components/Reveal';

type EventFilter = 'all' | 'upcoming' | 'past';

export default function Events() {
  const { kicker, subtitle, items } = siteContent.events;
  const [filter, setFilter] = useState<EventFilter>('all');
  const [expandedId, setExpandedId] = useState<string | null>(items[0]?.id ?? null);
  const prefersReducedMotion = useReducedMotion();

  const visibleEvents = useMemo(() => {
    if (filter === 'all') return items;
    return items.filter((evt) => evt.status === filter);
  }, [items, filter]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

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
              Sprints, talks, and <span className="font-script-accent text-[#C8102E]">flagship</span> builds.
            </h1>
            <p className="type-body-lg text-[#C5CBD3]">{subtitle}</p>
          </Reveal>
        </div>
      </section>

      {/* Filter + Timeline */}
      <section className="py-16 md:py-24">
        <div className="ase-container space-y-10">
          <Reveal from="right" className="flex flex-wrap items-center justify-between gap-4">
            <div role="group" aria-label="Filter events" className="flex flex-wrap gap-2">
              {(['all', 'upcoming', 'past'] as const).map((tab) => {
                const isActive = filter === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setFilter(tab)}
                    className={[
                      'px-4 py-2 rounded type-label border transition-colors',
                      isActive
                        ? 'bg-[#C8102E] border-[#C8102E] text-[#F5F6F8]'
                        : 'bg-[#111419]/80 border-[#C5CBD3]/25 text-[#C5CBD3] hover:text-[#F5F6F8] hover:border-[#C5CBD3]/60',
                    ].join(' ')}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
            <span className="type-label text-[#C5CBD3]/80">
              {visibleEvents.length} {visibleEvents.length === 1 ? 'EVENT' : 'EVENTS'}
            </span>
          </Reveal>

          {/* Timeline Rail */}
          <div className="relative pl-6 sm:pl-9 border-l border-[#C5CBD3]/25 space-y-6">
            {visibleEvents.map((event, idx) => {
              const isExpanded = expandedId === event.id;
              const isUpcoming = event.status === 'upcoming';

              return (
                <Reveal
                  key={event.id}
                  from={idx % 2 === 0 ? 'left' : 'right'}
                  delay={idx * 0.06}
                >
                  <div className="relative">
                    {/* Timeline Node Dot */}
                    <span
                      aria-hidden="true"
                      className={[
                        'absolute -left-[29px] sm:-left-[41px] top-7 h-2.5 w-2.5 rounded-full border',
                        isUpcoming
                          ? 'bg-[#C8102E] border-[#F5F6F8]/60'
                          : 'bg-[#111419] border-[#C5CBD3]/50',
                      ].join(' ')}
                    />

                    <article className="metal-card rounded-lg">
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        aria-controls={`event-panel-${event.id}`}
                        onClick={() => toggleExpand(event.id)}
                        className="w-full p-6 md:p-7 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                      >
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <span
                              className={[
                                'px-2.5 py-0.5 rounded border type-label',
                                isUpcoming
                                  ? 'border-[#C8102E]/60 bg-[#C8102E]/15 text-[#F5F6F8]'
                                  : 'border-[#C5CBD3]/20 bg-[#07090C]/75 text-[#C5CBD3]',
                              ].join(' ')}
                            >
                              {event.category}
                            </span>
                            <span className="inline-flex items-center gap-1.5 type-label text-[#C5CBD3]/80">
                              <Icon name="calendar" className="w-3.5 h-3.5 text-[#C5CBD3]" />
                              <span>{event.dateLabel}</span>
                            </span>
                          </div>
                          <h2 className="type-h3 text-[#F5F6F8]">{event.title}</h2>
                          <p className="type-body text-[#C5CBD3]/85">{event.summary}</p>
                        </div>

                        <span
                          aria-hidden="true"
                          className="shrink-0 self-start sm:self-center h-9 w-9 rounded border border-[#C5CBD3]/25 bg-[#07090C]/75 flex items-center justify-center text-[#C5CBD3] group-hover:text-[#C8102E] transition-colors"
                        >
                          <Icon name={isExpanded ? 'minus' : 'plus'} className="w-4 h-4" />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            id={`event-panel-${event.id}`}
                            initial={
                              prefersReducedMotion
                                ? { opacity: 1 }
                                : { height: 0, opacity: 0 }
                            }
                            animate={
                              prefersReducedMotion
                                ? { opacity: 1 }
                                : { height: 'auto', opacity: 1 }
                            }
                            exit={
                              prefersReducedMotion
                                ? { opacity: 0 }
                                : { height: 0, opacity: 0 }
                            }
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 md:px-7 pb-6 md:pb-7 pt-4 border-t border-[#C5CBD3]/15 space-y-4">
                              <p className="type-body text-[#C5CBD3]">{event.details}</p>
                              <div className="flex flex-wrap items-center gap-5 type-label text-[#C5CBD3]/80">
                                <span className="inline-flex items-center gap-1.5">
                                  <Icon name="map-pin" className="w-3.5 h-3.5 text-[#C5CBD3]" />
                                  <span>{event.location}</span>
                                </span>
                                <span>STATUS // {event.status.toUpperCase()}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </article>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
