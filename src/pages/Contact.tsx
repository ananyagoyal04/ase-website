import { useState, type FormEvent } from 'react';
import { siteContent } from '../data/content';
import { Icon } from '../components/Icon';
import { Reveal } from '../components/Reveal';

export default function Contact() {
  const { kicker, subtitle, email, address, socials } = siteContent.contact;

  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [topic, setTopic] = useState('Joining a Domain Pod');
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `ASE Contact — ${topic}`;
    const body = [
      `Name: ${name}`,
      `Email: ${senderEmail}`,
      `Topic: ${topic}`,
      '',
      message,
    ].join('\n');

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatusMessage(`Draft prepared for ${email}.`);
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
              Start a <span className="font-script-accent text-[#C8102E]">conversation</span>.
            </h1>
            <p className="type-body-lg text-[#C5CBD3]">{subtitle}</p>
          </Reveal>
        </div>
      </section>

      {/* Contact Channels + Composer */}
      <section className="py-16 md:py-24">
        <div className="ase-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <Reveal from="left" className="lg:col-span-5 space-y-6">
              <div className="metal-card rounded-lg p-6 space-y-3">
                <span className="inline-flex items-center gap-2 type-label text-[#C5CBD3]/80">
                  <Icon name="mail" className="w-4 h-4 text-[#C5CBD3]" />
                  <span>DIRECT EMAIL</span>
                </span>
                <a
                  href={`mailto:${email}`}
                  className="block font-display text-lg font-semibold text-[#F5F6F8] hover:text-[#C8102E] transition-colors break-all"
                >
                  {email}
                </a>
              </div>

              <div className="metal-card rounded-lg p-6 space-y-3">
                <span className="inline-flex items-center gap-2 type-label text-[#C5CBD3]/80">
                  <Icon name="map-pin" className="w-4 h-4 text-[#C5CBD3]" />
                  <span>CAMPUS LOCATION</span>
                </span>
                <p className="type-body text-[#C5CBD3]">{address}</p>
              </div>

              <div className="metal-card rounded-lg p-6 space-y-4">
                <span className="type-label text-[#C5CBD3]/80 block">CHANNELS</span>
                <ul className="space-y-3">
                  {socials.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`ASE on ${social.label}`}
                        className="inline-flex items-center gap-3 text-base text-[#F5F6F8] hover:text-[#C8102E] group transition-colors"
                      >
                        <span className="h-8 w-8 rounded border border-[#C5CBD3]/25 bg-[#07090C]/75 flex items-center justify-center text-[#C5CBD3] group-hover:text-[#C8102E] group-hover:border-[#C8102E]/60 transition-colors">
                          <Icon name={social.icon} className="w-4 h-4" />
                        </span>
                        <span>{social.label}</span>
                        <Icon
                          name="arrow-up-right"
                          className="w-4 h-4 text-[#C5CBD3] group-hover:text-[#C8102E] transition-colors"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal from="right" delay={0.08} className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                className="metal-card rounded-lg p-6 md:p-8 space-y-6"
                aria-labelledby="contact-form-heading"
              >
                <div className="flex items-center justify-between border-b border-[#C5CBD3]/15 pb-4">
                  <h2 id="contact-form-heading" className="type-h3 text-[#F5F6F8]">
                    Send a Message
                  </h2>
                  <span className="type-label text-[#C5CBD3]/80">NMIT BENGALURU</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="type-label text-[#C5CBD3] block">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      className="w-full px-3.5 py-2.5 rounded border border-[#C5CBD3]/25 bg-[#07090C]/75 text-base text-[#F5F6F8] placeholder:text-[#C5CBD3]/55"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="type-label text-[#C5CBD3] block">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 rounded border border-[#C5CBD3]/25 bg-[#07090C]/75 text-base text-[#F5F6F8] placeholder:text-[#C5CBD3]/55"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-topic" className="type-label text-[#C5CBD3] block">
                    Topic
                  </label>
                  <select
                    id="contact-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded border border-[#C5CBD3]/25 bg-[#07090C]/90 text-base text-[#F5F6F8]"
                  >
                    <option value="Joining a Domain Pod">Joining a Domain Pod</option>
                    <option value="Project Collaboration">Project Collaboration</option>
                    <option value="Event / Speaker Query">Event / Speaker Query</option>
                    <option value="General Enquiry">General Enquiry</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-message" className="type-label text-[#C5CBD3] block">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can ASE help?"
                    className="w-full px-3.5 py-2.5 rounded border border-[#C5CBD3]/25 bg-[#07090C]/75 text-base text-[#F5F6F8] placeholder:text-[#C5CBD3]/55"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-bold bg-[#C8102E] text-[#F5F6F8] hover:bg-[#A80D26] transition-colors"
                  >
                    <span>Compose Email</span>
                    <Icon name="arrow-right" className="w-4 h-4 text-[#F5F6F8]" />
                  </button>
                  <span className="type-label text-[#C5CBD3]/75">OPENS DEFAULT MAIL CLIENT</span>
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
