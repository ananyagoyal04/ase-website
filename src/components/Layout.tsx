import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Lenis from 'lenis';
import { siteContent } from '../data/content';
import { ScrollProgress } from './ScrollProgress';

export function Layout() {
  const location = useLocation();
  const [menuPathname, setMenuPathname] = useState<string | null>(null);
  const mobileMenuOpen = menuPathname === location.pathname;
  const prefersReducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scrolling when reduced motion is off
  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  // Smooth anchor scrolling & route scroll reset
  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target instanceof HTMLElement) {
        if (lenisRef.current && !prefersReducedMotion) {
          lenisRef.current.scrollTo(target, { offset: -80 });
        } else {
          target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        }
        return;
      }
    }

    if (lenisRef.current && !prefersReducedMotion) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash, prefersReducedMotion]);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuPathname(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-dvh flex flex-col bg-[#07090C] text-[#F5F6F8]">
      {/* Skip to content for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#C8102E] focus:text-[#F5F6F8] focus:text-sm focus:font-medium focus:rounded"
      >
        Skip to main content
      </a>

      {/* Fixed Header + Scroll Progress */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#07090C]/92 border-b border-[#C5CBD3]/15">
        <div className="ase-container h-16 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-3 group focus-visible:outline-none"
            aria-label="ASE NMIT Bengaluru Home"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded border border-[#C5CBD3]/30 bg-[#111419] font-mono text-xs font-semibold tracking-wider text-[#F5F6F8] group-hover:border-[#C5CBD3]/60 transition-colors">
              ASE
            </span>
            <div className="flex flex-col leading-none">
              <span className="font-display text-sm font-semibold tracking-tight text-[#F5F6F8]">
                ASE · NMIT
              </span>
              <span className="font-mono text-[10px] tracking-[0.1em] text-[#8E929B] uppercase">
                Bengaluru
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
            {siteContent.navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  [
                    'relative px-3 py-2 text-sm font-medium transition-colors rounded',
                    isActive
                      ? 'text-[#F5F6F8]'
                      : 'text-[#8E929B] hover:text-[#F5F6F8]',
                  ].join(' ')
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3 bottom-1 h-[2px] bg-[#C8102E]"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Right CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/collaborate"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-mono tracking-wider uppercase bg-[#C8102E] text-[#F5F6F8] hover:bg-[#A80D26] transition-colors"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#F5F6F8]" aria-hidden="true" />
              Partner
            </Link>

            <button
              type="button"
              onClick={() =>
                setMenuPathname((prev) =>
                  prev === location.pathname ? null : location.pathname
                )
              }
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded border border-[#C5CBD3]/25 bg-[#111419] text-[#F5F6F8] hover:border-[#C5CBD3]/50 transition-colors"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
              >
                {mobileMenuOpen ? (
                  <path
                    d="M4 4L14 14M14 4L4 14"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M2.5 5H15.5M2.5 9H15.5M2.5 13H15.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Thin Crimson Scroll Progress Bar under Navbar */}
        <ScrollProgress />

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              id="mobile-nav-drawer"
              aria-label="Mobile navigation"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="lg:hidden border-t border-[#C5CBD3]/15 bg-[#07090C]"
            >
              <div className="ase-container py-4 flex flex-col gap-1">
                {siteContent.navigation.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    onClick={() => setMenuPathname(null)}
                    className={({ isActive }) =>
                      [
                        'flex items-center justify-between px-3 py-3 rounded text-sm font-medium border transition-colors',
                        isActive
                          ? 'bg-[#111419] border-[#C8102E]/60 text-[#F5F6F8]'
                          : 'border-transparent text-[#8E929B] hover:text-[#F5F6F8] hover:bg-[#111419]/60',
                      ].join(' ')
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span>{item.label}</span>
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 rounded-full bg-[#C8102E]"
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content with Animated Page Transitions */}
      <main id="main-content" className="flex-1 pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#C5CBD3]/15 bg-[#07090C]">
        <div className="ase-container py-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-[#C8102E]" aria-hidden="true" />
                <span className="font-display text-base font-semibold tracking-tight text-[#F5F6F8]">
                  {siteContent.brand.fullName}
                </span>
              </div>
              <p className="type-body text-[#8E929B] max-w-sm">
                {siteContent.brand.tagline}
              </p>
              <p className="type-mono text-[#8E929B]">{siteContent.brand.location}</p>
            </div>

            <div className="md:col-span-4 space-y-3">
              <h2 className="type-mono text-[#C5CBD3]">Navigation</h2>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                {siteContent.navigation.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-[#8E929B] hover:text-[#F5F6F8] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h2 className="type-mono text-[#C5CBD3]">Connect</h2>
              <ul className="space-y-2 text-sm">
                {siteContent.contact.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[#8E929B] hover:text-[#F5F6F8] transition-colors"
                    >
                      <span>{social.label}</span>
                      <span aria-hidden="true" className="text-xs">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${siteContent.contact.email}`}
                    className="text-[#8E929B] hover:text-[#F5F6F8] transition-colors"
                  >
                    {siteContent.contact.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="hairline-titanium my-10" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#8E929B] font-mono">
            <span>{siteContent.brand.copyright}</span>
            <span>NMIT · BENGALURU</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
