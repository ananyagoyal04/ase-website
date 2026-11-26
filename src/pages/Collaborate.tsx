import { useState, type FormEvent } from 'react';
import { siteContent } from '../data/content';
import { Icon } from '../components/Icon';
import { Reveal } from '../components/Reveal';

export default function Collaborate() {
  const {
    kicker,
    subtitle,
    waysToPartner,
    studentValue,
    enquiryEmail,
    enquirySubject,
  } = siteContent.collaborate;

  const [orgName, setOrgName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [track, setTrack] = useState<string>(waysToPartner[0].title);
  const [notes, setNotes] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const directMailto = `mailto:${enquiryEmail}?subject=${encodeURIComponent(enquirySubject)}`;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `${enquirySubject} — ${orgName || 'Partner Enquiry'}`;
    const body = [
      `Organisation: ${orgName}`,
      `Contact Email: ${contactEmail}`,
      `Partnership Track: ${track}`,
      '',
      'Brief:',
      notes,
    ].join('\n');

    const href = `mailto:${enquiryEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setStatusMessage(
      `Prepared sponsor enquiry email to ${enquiryEmail}. If your mail client did not open automatically, use the direct mailto link above.`
    );
  };

  return (
    <div className="bg-transparent">
      {/* Page Header */}
      <section className="py-16 md:py-24 border-b border-[#C5CBD3]/20">
        <div className="ase-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <Reveal from="left" className="lg:col-span-8 space-y-5">
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C8102E]" aria-hidden="true" />
                <span className="type-label text-[#C5CBD3]">{kicker}</span>
              </div>
              <h1 className="type-h1 text-[#F5F6F8]">
                Partner with high-velocity student{' '}
                <span className="font-script-accent text-[#C8102E]">engineers</span>.
              </h1>
              <p className="type-body-lg text-[#C5CBD3] max-w-2xl">{subtitle}</p>
            </Reveal>

            <Reveal from="right" delay={0.08} className="lg:col-span-4 lg:flex lg:justify-end">
              <a
                href={directMailto}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded text-sm font-bold bg-[#C8102E] text-[#F5F6F8] hover:bg-[#A80D26] transition-colors"
              >
                <Icon name="handshake" className="w-4 h-4 text-[#F5F6F8]" />
                <span>Sponsor enquiry</span>
                <Icon name="arrow-up-right" className="w-4 h-4 text-[#F5F6F8]" />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Ways to Partner */}
      <section className="py-16 md:py-24 surface-brushed border-b border-[#C5CBD3]/20">
        <div className="ase-container space-y-12">
          <Reveal from="right" className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C8102E]" aria-hidden="true" />
              <span className="type-label text-[#C5CBD3]">// PARTNERSHIP TRACKS</span>
            </div>
            <h2 className="type-h2 text-[#F5F6F8]">Ways to collaborate with ASE</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {waysToPartner.map((item, idx) => (
              <Reveal
                key={item.code}
                from={idx % 2 === 0 ? 'left' : 'right'}
                delay={idx * 0.08}
                className="h-full"
              >
                <article className="metal-card rounded-lg p-6 md:p-7 h-full flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <span className="type-label text-[#C5CBD3]/80">[ {item.code} ]</span>
                    <h3 className="type-h3 text-[#F5F6F8]">{item.title}</h3>
                    <p className="type-body text-[#C5CBD3]/85">{item.description}</p>
                  </div>
                  <div className="hairline-titanium" />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What Students Offer + Sponsor Enquiry Form */}
      <section className="py-16 md:py-24">
        <div className="ase-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <Reveal from="left" className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C8102E]" aria-hidden="true" />
                  <span className="type-label text-[#C5CBD3]">// WHAT STUDENTS OFFER</span>
                </div>
                <h2 className="type-h2 text-[#F5F6F8]">Execution, visibility, and talent</h2>
              </div>

              <ul className="space-y-4">
                {studentValue.map((point, idx) => (
                  <li
                    key={point}
                    className="p-4 rounded border border-[#C5CBD3]/20 bg-[#111419]/80 flex items-start gap-3"
                  >
                    <span className="type-label text-[#C8102E] pt-0.5 inline-flex items-center gap-1.5 shrink-0">
                      <Icon name="check" className="w-4 h-4 text-[#C5CBD3]" />
                      <span>0{idx + 1}</span>
                    </span>
                    <span className="type-body text-[#C5CBD3]">{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal from="right" delay={0.08} className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                className="metal-card rounded-lg p-6 md:p-8 space-y-6"
                aria-labelledby="sponsor-form-heading"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#C5CBD3]/15 pb-4">
                  <h2 id="sponsor-form-heading" className="type-h3 text-[#F5F6F8]">
                    Sponsor Enquiry
                  </h2>
                  <span className="inline-flex items-center gap-1.5 type-label text-[#C5CBD3]/80">
                    <Icon name="mail" className="w-3.5 h-3.5 text-[#C5CBD3]" />
                    <span>{enquiryEmail}</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="collab-org" className="type-label text-[#C5CBD3] block">
                      Organisation
                    </label>
                    <input
                      id="collab-org"
                      type="text"
                      required
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="Company or community name"
                      className="w-full px-3.5 py-2.5 rounded border border-[#C5CBD3]/25 bg-[#07090C]/75 text-base text-[#F5F6F8] placeholder:text-[#C5CBD3]/55"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="collab-email" className="type-label text-[#C5CBD3] block">
                      Work Email
                    </label>
                    <input
                      id="collab-email"
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="you@organisation.com"
                      className="w-full px-3.5 py-2.5 rounded border border-[#C5CBD3]/25 bg-[#07090C]/75 text-base text-[#F5F6F8] placeholder:text-[#C5CBD3]/55"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="collab-track" className="type-label text-[#C5CBD3] block">
                    Collaboration Track
                  </label>
                  <select
                    id="collab-track"
                    value={track}
                    onChange={(e) => setTrack(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded border border-[#C5CBD3]/25 bg-[#07090C]/90 text-base text-[#F5F6F8]"
                  >
                    {waysToPartner.map((item) => (
                      <option key={item.code} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="collab-notes" className="type-label text-[#C5CBD3] block">
                    Brief / Proposal
                  </label>
                  <textarea
                    id="collab-notes"
                    rows={4}
                    required
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Share your goals, timeline, or event sponsorship focus."
                    className="w-full px-3.5 py-2.5 rounded border border-[#C5CBD3]/25 bg-[#07090C]/75 text-base text-[#F5F6F8] placeholder:text-[#C5CBD3]/55"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-bold bg-[#C8102E] text-[#F5F6F8] hover:bg-[#A80D26] transition-colors"
                  >
                    <span>Send Sponsor Enquiry</span>
                    <Icon name="arrow-right" className="w-4 h-4 text-[#F5F6F8]" />
                  </button>
                  <a
                    href={directMailto}
                    className="inline-flex items-center gap-1.5 type-label text-[#C5CBD3] hover:text-[#C8102E] transition-colors"
                  >
                    <span>Open Direct Mailto</span>
                    <Icon name="arrow-up-right" className="w-3.5 h-3.5" />
                  </a>
                </div>

                {statusMessage && (
                  <p
                    role="status"
                    className="p-3 rounded border border-[#C5CBD3]/25 bg-[#07090C]/75 text-sm text-[#C5CBD3]"
                  >
                    {statusMessage}
                  </p>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
