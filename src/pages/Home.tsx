import { Link } from 'react-router-dom';
import { siteContent } from '../data/content';
import { Icon } from '../components/Icon';
import { Reveal } from '../components/Reveal';

export default function Home() {
  const { hero, intro, teasersKicker, teasersTitle, teasers } = siteContent.home;

  return (
    <div>
      {/* HERO: Transparent over persistent global eagle video */}
      <section
        aria-label="ASE Hero"
        className="relative min-h-[calc(100svh-4rem)] flex items-end md:items-center"
      >
        <div className="ase-container py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-10 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded border border-[#C5CBD3]/30 bg-[#111419]/80">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C8102E]" aria-hidden="true" />
                <span className="type-label text-[#C5CBD3]">{hero.kicker}</span>
              </div>

              <h1 className="type-hero text-[#F5F6F8] max-w-4xl">
                We imagine. We{' '}
                <span className="font-script-accent text-[#F5F6F8]">engineer</span>.{' '}
                <span className="inline-block">
                  We build what&apos;s{' '}
                  <span className="font-script-accent text-[#C8102E]">next</span>.
                </span>
              </h1>

              <p className="type-body-lg text-[#F5F6F8]/90 max-w-2xl">
                {hero.subtext}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to={hero.primaryCta.to}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded text-base font-bold bg-[#C8102E] text-[#F5F6F8] hover:bg-[#A80D26] transition-colors"
                >
                  <span>{hero.primaryCta.label}</span>
                  <Icon name="arrow-right" className="w-4 h-4 text-[#F5F6F8]" />
                </Link>
                <Link
                  to={hero.secondaryCta.to}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded text-base font-bold border border-[#C5CBD3]/35 bg-[#111419]/80 text-[#F5F6F8] hover:border-[#C5CBD3]/70 group transition-colors"
                >
                  <span>{hero.secondaryCta.label}</span>
                  <Icon
                    name="arrow-up-right"
                    className="w-4 h-4 text-[#C5CBD3] group-hover:text-[#C8102E] transition-colors"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ONE-SCREEN INTRO: Alternating left text / right panel */}
      <section className="py-24 md:py-32 border-t border-[#C5CBD3]/20">
        <div className="ase-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <Reveal from="left" className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C8102E]" aria-hidden="true" />
                <span className="type-label text-[#C5CBD3]">{intro.kicker}</span>
              </div>
              <h2 className="type-h1 text-[#F5F6F8]">
                We don&apos;t just study technology. We{' '}
                <span className="font-script-accent text-[#C8102E]">build</span> what comes next.
              </h2>
              <p className="type-body-lg text-[#C5CBD3]">{intro.body}</p>
              <div className="pt-2">
                <Link
                  to={intro.cta.to}
                  className="inline-flex items-center gap-2 type-label text-[#F5F6F8] hover:text-[#C5CBD3] transition-colors border-b border-[#C8102E] pb-1 group"
                >
                  <span>{intro.cta.label}</span>
                  <Icon
                    name="arrow-up-right"
                    className="w-4 h-4 text-[#C5CBD3] group-hover:text-[#C8102E] transition-colors"
                  />
                </Link>
              </div>
            </Reveal>

            <Reveal from="right" delay={0.1} className="lg:col-span-6">
              <div className="metal-card rounded-lg p-6 md:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-[#C5CBD3]/20 pb-4">
                  <span className="type-label text-[#C5CBD3]">SYSTEM // OVERVIEW</span>
                  <span className="type-label text-[#C5CBD3]/80">NMIT BENGALURU</span>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  {intro.highlights.map((item) => (
                    <div
                      key={item.label}
                      className="p-4 rounded border border-[#C5CBD3]/15 bg-[#07090C]/75 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                    >
                      <div>
                        <span className="type-label text-[#C5CBD3]/80 block">{item.label}</span>
                        <span className="font-display text-lg font-semibold text-[#F5F6F8]">
                          {item.value}
                        </span>
                      </div>
                      <span className="text-sm text-[#C5CBD3]/85">{item.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3 TEASER CARDS: Swap reveal direction */}
      <section className="py-24 md:py-28 border-t border-[#C5CBD3]/20 surface-brushed">
        <div className="ase-container space-y-12">
          <Reveal from="right" className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C8102E]" aria-hidden="true" />
                <span className="type-label text-[#C5CBD3]">{teasersKicker}</span>
              </div>
              <h2 className="type-h1 text-[#F5F6F8]">{teasersTitle}</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teasers.map((card, idx) => (
              <Reveal
                key={card.id}
                from={idx % 2 === 0 ? 'left' : 'right'}
                delay={idx * 0.08}
                className="h-full"
              >
                <Link
                  to={card.to}
                  className="metal-card rounded-lg p-6 md:p-7 h-full flex flex-col justify-between gap-8 group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-2 type-label text-[#C5CBD3]/80">
                        <Icon
                          name={card.icon}
                          className="w-4 h-4 text-[#C5CBD3] group-hover:text-[#C8102E] transition-colors"
                        />
                        <span>[ {card.index} ]</span>
                      </span>
                      <span className="type-label text-[#C5CBD3]">{card.kicker}</span>
                    </div>
                    <h3 className="type-h3 text-[#F5F6F8]">{card.title}</h3>
                    <p className="type-body text-[#C5CBD3]/90">{card.summary}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#C5CBD3]/15 text-base font-bold text-[#F5F6F8]">
                    <span>{card.ctaLabel}</span>
                    <Icon
                      name="arrow-right"
                      className="w-4 h-4 text-[#C5CBD3] group-hover:text-[#C8102E] group-hover:translate-x-1 transition-all"
                    />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
