import { Link } from 'react-router-dom';
import { siteContent } from '../data/content';
import { Reveal } from '../components/Reveal';

export default function About() {
  const { kicker, headline, story, whatWeDo, values } = siteContent.about;

  return (
    <div className="bg-[#07090C]">
      {/* Header + Story */}
      <section className="py-16 md:py-24 border-b border-[#C5CBD3]/15">
        <div className="ase-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <Reveal from="left" className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C8102E]" aria-hidden="true" />
                <span className="type-mono text-[#C5CBD3]">{kicker}</span>
              </div>
              <h1 className="type-h1 text-[#F5F6F8]">{headline}</h1>
            </Reveal>

            <Reveal from="right" delay={0.08} className="lg:col-span-6">
              <div className="metal-card rounded-lg p-6 md:p-8 space-y-5">
                <div className="flex items-center justify-between border-b border-[#C5CBD3]/15 pb-3">
                  <span className="type-mono text-[#C5CBD3]">ORIGIN // NMIT BENGALURU</span>
                  <span className="type-mono text-[#8E929B]">EST. COLLECTIVE</span>
                </div>
                <p className="type-body-lg text-[#C5CBD3]">{story}</p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <Link
                    to="/domains"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-medium bg-[#C8102E] text-[#F5F6F8] hover:bg-[#A80D26] transition-colors"
                  >
                    <span>Explore Domains</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                  <Link
                    to="/team"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-medium border border-[#C5CBD3]/25 bg-[#07090C] text-[#F5F6F8] hover:border-[#C5CBD3]/60 transition-colors"
                  >
                    <span>Meet the Team</span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What ASE Does (Swap direction: header right, cards left/right) */}
      <section className="py-16 md:py-24 surface-brushed border-b border-[#C5CBD3]/15">
        <div className="ase-container space-y-12">
          <Reveal from="right" className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C8102E]" aria-hidden="true" />
              <span className="type-mono text-[#C5CBD3]">// WHAT ASE DOES</span>
            </div>
            <h2 className="type-h2 text-[#F5F6F8]">How student builders operate inside ASE</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whatWeDo.map((item, idx) => (
              <Reveal
                key={item.code}
                from={idx % 2 === 0 ? 'left' : 'right'}
                delay={idx * 0.08}
                className="h-full"
              >
                <article className="metal-card rounded-lg p-6 md:p-7 h-full flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <span className="type-mono text-[#8E929B]">[ {item.code} ]</span>
                    <h3 className="type-h3 text-[#F5F6F8]">{item.title}</h3>
                    <p className="type-body text-[#8E929B]">{item.description}</p>
                  </div>
                  <div className="hairline-titanium" />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="ase-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <Reveal from="left" className="lg:col-span-4 space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C8102E]" aria-hidden="true" />
                <span className="type-mono text-[#C5CBD3]">// CORE VALUES</span>
              </div>
              <h2 className="type-h2 text-[#F5F6F8]">Principles that guide our builds</h2>
            </Reveal>

            <Reveal from="right" delay={0.08} className="lg:col-span-8 space-y-4">
              {values.map((val, idx) => (
                <div
                  key={val.title}
                  className="metal-card rounded-lg p-6 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6"
                >
                  <span className="type-mono text-[#C8102E] shrink-0 pt-1">
                    0{idx + 1}
                  </span>
                  <div className="space-y-1.5">
                    <h3 className="type-h3 text-[#F5F6F8]">{val.title}</h3>
                    <p className="type-body text-[#8E929B]">{val.detail}</p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
