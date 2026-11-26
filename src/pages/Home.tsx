import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { siteContent } from '../data/content';
import { Reveal } from '../components/Reveal';

export default function Home() {
  const { hero, intro, teasersKicker, teasersTitle, teasers } = siteContent.home;
  const heroRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [videoError, setVideoError] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Subtle parallax on the video layer only; disabled when reduced-motion is on
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);

  return (
    <div>
      {/* HERO: Full-viewport eagle video background */}
      <section
        ref={heroRef}
        aria-label="ASE Hero"
        className="relative min-h-[calc(100svh-4rem)] flex items-end md:items-center overflow-hidden bg-[#07090C]"
      >
        {/* Reserved media layer */}
        <motion.div
          aria-hidden="true"
          style={prefersReducedMotion ? undefined : { y: videoY }}
          className="absolute inset-0 will-change-transform"
        >
          {prefersReducedMotion || videoError ? (
            <img
              src={hero.poster}
              alt=""
              className="h-full w-full object-cover object-center"
            />
          ) : (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={hero.poster}
              onError={() => setVideoError(true)}
              className="h-full w-full object-cover object-center"
            >
              <source src={hero.videoMp4} type="video/mp4" />
            </video>
          )}
        </motion.div>

        {/* Dark graphite gradient overlay for AA contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#07090C] via-[#07090C]/75 to-[#07090C]/45"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#07090C]/90 via-[#07090C]/55 to-transparent"
        />

        {/* Hero Foreground Content */}
        <div className="relative z-10 ase-container py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-9 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded border border-[#C5CBD3]/25 bg-[#111419]/85">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C8102E]" aria-hidden="true" />
                <span className="type-mono text-[#C5CBD3]">{hero.kicker}</span>
              </div>

              <h1 className="type-hero text-[#F5F6F8] max-w-4xl">
                {hero.headline}
              </h1>

              <p className="type-body-lg text-[#C5CBD3] max-w-2xl">
                {hero.subtext}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to={hero.primaryCta.to}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded text-sm font-medium bg-[#C8102E] text-[#F5F6F8] hover:bg-[#A80D26] transition-colors"
                >
                  <span>{hero.primaryCta.label}</span>
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  to={hero.secondaryCta.to}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded text-sm font-medium border border-[#C5CBD3]/30 bg-[#111419]/90 text-[#F5F6F8] hover:border-[#C5CBD3]/65 transition-colors"
                >
                  <span>{hero.secondaryCta.label}</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ONE-SCREEN INTRO: Alternating left text / right panel */}
      <section className="py-24 md:py-32 border-t border-[#C5CBD3]/15 bg-[#07090C]">
        <div className="ase-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <Reveal from="left" className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C8102E]" aria-hidden="true" />
                <span className="type-mono text-[#C5CBD3]">{intro.kicker}</span>
              </div>
              <h2 className="type-h1 text-[#F5F6F8]">{intro.headline}</h2>
              <p className="type-body-lg text-[#8E929B]">{intro.body}</p>
              <div className="pt-2">
                <Link
                  to={intro.cta.to}
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#F5F6F8] hover:text-[#C5CBD3] transition-colors border-b border-[#C8102E] pb-1"
                >
                  <span>{intro.cta.label}</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </Reveal>

            <Reveal from="right" delay={0.1} className="lg:col-span-6">
              <div className="metal-card rounded-lg p-6 md:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-[#C5CBD3]/15 pb-4">
                  <span className="type-mono text-[#C5CBD3]">SYSTEM // OVERVIEW</span>
                  <span className="type-mono text-[#8E929B]">NMIT BENGALURU</span>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  {intro.highlights.map((item) => (
                    <div
                      key={item.label}
                      className="p-4 rounded border border-[#C5CBD3]/12 bg-[#07090C]/70 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                    >
                      <div>
                        <span className="type-mono text-[#8E929B] block">{item.label}</span>
                        <span className="font-display text-lg font-semibold text-[#F5F6F8]">
                          {item.value}
                        </span>
                      </div>
                      <span className="text-xs text-[#8E929B]">{item.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3 TEASER CARDS: Swap reveal direction */}
      <section className="py-24 md:py-28 border-t border-[#C5CBD3]/15 surface-brushed">
        <div className="ase-container space-y-12">
          <Reveal from="right" className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C8102E]" aria-hidden="true" />
                <span className="type-mono text-[#C5CBD3]">{teasersKicker}</span>
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
                    <div className="flex items-center justify-between">
                      <span className="type-mono text-[#8E929B]">[ {card.index} ]</span>
                      <span className="type-mono text-[#C5CBD3]">{card.kicker}</span>
                    </div>
                    <h3 className="type-h3 text-[#F5F6F8] group-hover:text-white">
                      {card.title}
                    </h3>
                    <p className="type-body text-[#8E929B]">{card.summary}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#C5CBD3]/12 text-sm font-medium text-[#F5F6F8]">
                    <span>{card.ctaLabel}</span>
                    <span
                      aria-hidden="true"
                      className="text-[#C8102E] group-hover:translate-x-1 transition-transform"
                    >
                      →
                    </span>
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
