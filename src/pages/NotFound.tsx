import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';

export default function NotFound() {
  return (
    <section className="py-24 md:py-32 bg-transparent">
      <div className="ase-container">
        <div className="metal-card rounded-lg p-8 md:p-12 max-w-2xl space-y-5">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C8102E]" aria-hidden="true" />
            <span className="type-label text-[#C5CBD3]">// 404 NOT FOUND</span>
          </div>
          <h1 className="type-h1 text-[#F5F6F8]">Route outside telemetry</h1>
          <p className="type-body text-[#C5CBD3]/85">
            The page you requested could not be located on ASE.
          </p>
          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-3 rounded text-sm font-bold bg-[#C8102E] text-[#F5F6F8] hover:bg-[#A80D26] transition-colors"
            >
              <span>Return Home</span>
              <Icon name="arrow-right" className="w-4 h-4 text-[#F5F6F8]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
