interface DomainIconProps {
  domainId: string;
  className?: string;
}

export function DomainIcon({ domainId, className = 'w-5 h-5' }: DomainIconProps) {
  switch (domainId) {
    case 'systems-backend':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <rect x="3" y="4" width="18" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="3" y="14" width="18" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="7" cy="7" r="1" fill="currentColor" />
          <circle cx="7" cy="17" r="1" fill="currentColor" />
          <path d="M12 10V14" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case 'ai-ml':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <circle cx="12" cy="5" r="2.2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="5" cy="17" r="2.2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="19" cy="17" r="2.2" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M10.7 6.9L6.3 15.1M13.3 6.9L17.7 15.1M7.2 17H16.8"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      );
    case 'web-product':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 9H21M9 9V20" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case 'cloud-devops':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M7 18H17.5C19.43 18 21 16.43 21 14.5C21 12.71 19.65 11.24 17.91 11.03C17.45 7.9 14.76 5.5 11.5 5.5C8.1 5.5 5.31 8.11 5.03 11.44C3.31 11.88 2 13.44 2 15.3C2 16.79 3.21 18 4.7 18H7Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M9.5 14L12 11.5L14.5 14M12 11.5V16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'security-embedded':
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M12 3L19 6V11.5C19 16.1 16.05 19.95 12 21C7.95 19.95 5 16.1 5 11.5V6L12 3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="11.5" r="2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
  }
}
