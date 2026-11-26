import { siteContent } from '../data/content';
import { Reveal } from '../components/Reveal';

function getInitials(name: string): string {
  const cleaned = name.replace(/\[PLACEHOLDER:\s*|\]/gi, '').trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'AS';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export default function Team() {
  const { kicker, headline, subtitle, members } = siteContent.team;

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

      {/* Core Team Grid */}
      <section className="py-16 md:py-24">
        <div className="ase-container space-y-8">
          <Reveal from="right" className="flex items-center justify-between border-b border-[#C5CBD3]/15 pb-4">
            <span className="type-mono text-[#C5CBD3]">CORE DIRECTORY</span>
            <span className="type-mono text-[#8E929B]">{members.length} LEADS</span>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {members.map((member, idx) => (
              <Reveal
                key={member.id}
                from={idx % 2 === 0 ? 'left' : 'right'}
                delay={idx * 0.06}
                className="h-full"
              >
                <article className="metal-card rounded-lg p-6 h-full flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <div
                        aria-hidden="true"
                        className="h-12 w-12 rounded border border-[#C5CBD3]/25 bg-[#07090C] flex items-center justify-center font-mono text-sm font-semibold text-[#F5F6F8]"
                      >
                        {getInitials(member.name)}
                      </div>
                      <span className="px-2.5 py-1 rounded border border-[#C5CBD3]/20 bg-[#07090C] font-mono text-[10px] uppercase tracking-wider text-[#C5CBD3]">
                        {member.domain}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h2 className="type-h3 text-[#F5F6F8]">{member.name}</h2>
                      <p className="font-mono text-xs text-[#C8102E] uppercase tracking-wider">
                        {member.role}
                      </p>
                    </div>

                    <p className="type-body text-[#8E929B]">{member.bio}</p>
                  </div>

                  <div className="pt-4 border-t border-[#C5CBD3]/12 flex flex-wrap gap-3">
                    {member.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-[#C5CBD3] hover:text-[#F5F6F8] transition-colors"
                      >
                        <span>{link.label}</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
