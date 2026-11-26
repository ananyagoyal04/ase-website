import { useState } from 'react';
import { siteContent, type DomainItem } from '../data/content';
import { Reveal } from '../components/Reveal';
import { DomainMap } from '../components/domains/DomainMap';
import { SingularityDrop } from '../components/domains/SingularityDrop';
import { DomainDetailDrawer } from '../components/domains/DomainDetailDrawer';

export default function Domains() {
  const { kicker, headline, subtitle } = siteContent.domains;
  const [selectedDomain, setSelectedDomain] = useState<DomainItem | null>(null);

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

      {/* Signature Interaction 1: Domain Map */}
      <section className="py-16 md:py-24">
        <div className="ase-container">
          <Reveal from="right">
            <DomainMap
              selectedDomainId={selectedDomain?.id ?? null}
              onSelectDomain={(domain) => setSelectedDomain(domain)}
            />
          </Reveal>
        </div>
      </section>

      {/* Signature Interaction 2: Singularity */}
      <section className="py-16 md:py-24 border-t border-[#C5CBD3]/15 surface-brushed">
        <div className="ase-container">
          <Reveal from="left">
            <SingularityDrop
              activeDomainId={selectedDomain?.id ?? null}
              onCaptureDomain={(domain) => setSelectedDomain(domain)}
            />
          </Reveal>
        </div>
      </section>

      {/* Shared Side Panel / Mobile Bottom Sheet */}
      <DomainDetailDrawer
        domain={selectedDomain}
        onClose={() => setSelectedDomain(null)}
      />
    </div>
  );
}
