interface PhaseStubProps {
  kicker: string;
  title: string;
  phaseNote: string;
}

export function PhaseStub({ kicker, title, phaseNote }: PhaseStubProps) {
  return (
    <section className="py-24 md:py-32">
      <div className="ase-container">
        <div className="metal-card rounded-lg p-8 md:p-12 max-w-3xl space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C8102E]" aria-hidden="true" />
            <span className="type-mono text-[#C5CBD3]">{kicker}</span>
          </div>
          <h1 className="type-h1 text-[#F5F6F8]">{title}</h1>
          <p className="type-body text-[#8E929B]">{phaseNote}</p>
        </div>
      </div>
    </section>
  );
}
