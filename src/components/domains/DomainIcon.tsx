import { siteContent } from '../../data/content';
import { Icon, type IconName } from '../Icon';

interface DomainIconProps {
  domainId: string;
  className?: string;
}

const DOMAIN_FALLBACK_ICON: Record<string, IconName> = {
  'systems-backend': 'server',
  'ai-ml': 'cpu',
  'web-product': 'globe',
  'cloud-devops': 'cloud',
  'security-embedded': 'shield',
};

export function DomainIcon({ domainId, className = 'w-5 h-5' }: DomainIconProps) {
  const matched = siteContent.domains.items.find((d) => d.id === domainId);
  const iconName: IconName = matched?.icon ?? DOMAIN_FALLBACK_ICON[domainId] ?? 'terminal';
  return <Icon name={iconName} className={className} />;
}
