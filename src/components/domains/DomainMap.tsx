import { useMemo, useState } from 'react';
import { siteContent, type DomainItem } from '../../data/content';
import { Icon, resolveToolIcon } from '../Icon';
import { DomainIcon } from './DomainIcon';

interface DomainMapProps {
  selectedDomainId: string | null;
  onSelectDomain: (domain: DomainItem) => void;
}

const VIEWBOX_W = 1000;
const VIEWBOX_H = 540;

export function DomainMap({ selectedDomainId, onSelectDomain }: DomainMapProps) {
  const { items, connections } = siteContent.domains;
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeId = hoveredId ?? selectedDomainId;

  const domainById = useMemo(() => {
    const map = new Map<string, DomainItem>();
    items.forEach((d) => map.set(d.id, d));
    return map;
  }, [items]);

  const connectedIds = useMemo(() => {
    if (!activeId) return null;
    const set = new Set<string>([activeId]);
    connections.forEach((edge) => {
      if (edge.from === activeId) set.add(edge.to);
      if (edge.to === activeId) set.add(edge.from);
    });
    return set;
  }, [activeId, connections]);

  const toCoords = (pos: { x: number; y: number }) => ({
    cx: (pos.x / 100) * VIEWBOX_W,
    cy: (pos.y / 100) * VIEWBOX_H,
  });

  return (
    <div className="metal-card rounded-lg p-4 sm:p-6 md:p-8 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#C5CBD3]/15 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C8102E]" aria-hidden="true" />
            <span className="type-label text-[#C5CBD3]">INTERACTION 01 // DOMAIN MAP</span>
          </div>
          <p className="text-sm text-[#C5CBD3]/85">
            Hover or focus a node to trace shared tooling. Select any domain to inspect its stack.
          </p>
        </div>
        <span className="type-label text-[#C5CBD3]/80 shrink-0">
          {items.length} NODES · {connections.length} LINKS
        </span>
      </div>

      {/* Desktop / Tablet SVG Constellation */}
      <div className="hidden md:block relative rounded border border-[#C5CBD3]/15 bg-[#07090C]/70 overflow-hidden">
        <svg
          viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
          className="w-full h-auto block select-none"
          role="region"
          aria-label="ASE Engineering Domain Constellation Map"
        >
          {/* Subtle architectural grid lines */}
          <defs>
            <pattern id="ase-map-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="rgba(197, 203, 211, 0.05)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width={VIEWBOX_W} height={VIEWBOX_H} fill="url(#ase-map-grid)" />

          {/* Edges + Diamond Tool Markers */}
          {connections.map((edge) => {
            const source = domainById.get(edge.from);
            const target = domainById.get(edge.to);
            if (!source || !target) return null;

            const p1 = toCoords(source.position);
            const p2 = toCoords(target.position);
            const mx = (p1.cx + p2.cx) / 2;
            const my = (p1.cy + p2.cy) / 2;

            const isEdgeHighlighted =
              activeId !== null && (edge.from === activeId || edge.to === activeId);
            const isDimmed = activeId !== null && !isEdgeHighlighted;

            return (
              <g
                key={`${edge.from}-${edge.to}`}
                style={{
                  opacity: isDimmed ? 0.16 : 1,
                  transition: 'opacity 220ms ease-out',
                }}
              >
                <line
                  x1={p1.cx}
                  y1={p1.cy}
                  x2={p2.cx}
                  y2={p2.cy}
                  stroke={isEdgeHighlighted ? '#C8102E' : 'rgba(197, 203, 211, 0.28)'}
                  strokeWidth={isEdgeHighlighted ? 1.8 : 1.1}
                  strokeDasharray={isEdgeHighlighted ? undefined : '4 4'}
                />

                {/* Diamond Marker at midpoint */}
                <polygon
                  points={`${mx},${my - 6} ${mx + 6},${my} ${mx},${my + 6} ${mx - 6},${my}`}
                  fill={isEdgeHighlighted ? '#C8102E' : '#111419'}
                  stroke={isEdgeHighlighted ? '#F5F6F8' : '#C5CBD3'}
                  strokeWidth="1"
                />

                {/* Shared Skill / Tool Label */}
                <g transform={`translate(${mx}, ${my + 18})`}>
                  <rect
                    x={-(edge.marker.length * 3.6 + 10)}
                    y="-9"
                    width={edge.marker.length * 7.2 + 20}
                    height="18"
                    rx="3"
                    fill="#07090C"
                    stroke={isEdgeHighlighted ? 'rgba(200, 16, 46, 0.7)' : 'rgba(197, 203, 211, 0.22)'}
                    strokeWidth="0.9"
                  />
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={isEdgeHighlighted ? '#F5F6F8' : '#C5CBD3'}
                    fontSize="10"
                    fontFamily="Tinos, Times New Roman, serif"
                    fontWeight="700"
                    letterSpacing="0.07em"
                  >
                    {edge.marker.toUpperCase()}
                  </text>
                </g>
              </g>
            );
          })}

          {/* Circular Domain Nodes */}
          {items.map((domain) => {
            const { cx, cy } = toCoords(domain.position);
            const isActive = activeId === domain.id;
            const isConnected = connectedIds ? connectedIds.has(domain.id) : true;

            return (
              <g
                key={domain.id}
                transform={`translate(${cx}, ${cy})`}
                role="button"
                tabIndex={0}
                aria-label={`Inspect ${domain.name}`}
                onClick={() => onSelectDomain(domain)}
                onMouseEnter={() => setHoveredId(domain.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(domain.id)}
                onBlur={() => setHoveredId(null)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectDomain(domain);
                  }
                }}
                className="cursor-pointer focus:outline-none"
                style={{
                  opacity: isConnected ? 1 : 0.22,
                  transition: 'opacity 220ms ease-out',
                }}
              >
                {/* Outer orbit ring */}
                <circle
                  r={isActive ? 46 : 40}
                  fill="none"
                  stroke={isActive ? '#C8102E' : 'rgba(197, 203, 211, 0.24)'}
                  strokeWidth={isActive ? 1.5 : 1}
                  style={{ transition: 'all 220ms ease-out' }}
                />

                {/* Core circular node */}
                <circle
                  r="33"
                  fill={isActive ? '#171B22' : '#111419'}
                  stroke={isActive ? '#F5F6F8' : '#C5CBD3'}
                  strokeWidth={isActive ? 1.6 : 1.1}
                />

                {/* Code label */}
                <text
                  y="-7"
                  textAnchor="middle"
                  fill={isActive ? '#C8102E' : '#C5CBD3'}
                  fontSize="10"
                  fontFamily="Tinos, Times New Roman, serif"
                  fontWeight="700"
                  letterSpacing="0.09em"
                >
                  {domain.code}
                </text>

                {/* Short name */}
                <text
                  y="11"
                  textAnchor="middle"
                  fill="#F5F6F8"
                  fontSize="12.5"
                  fontFamily="Playfair Display, Georgia, serif"
                  fontWeight="700"
                >
                  {domain.shortName}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Shared Tooling Legend with Brand Icons */}
        <div className="px-5 py-3.5 border-t border-[#C5CBD3]/15 bg-[#111419]/80 flex flex-wrap items-center justify-between gap-3">
          <span className="type-label text-[#C5CBD3]/80">SHARED TOOLING LINKS</span>
          <div className="flex flex-wrap items-center gap-2">
            {connections.map((link) => (
              <span
                key={`${link.from}-${link.to}-legend`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#C5CBD3]/20 bg-[#07090C]/75 text-xs text-[#C5CBD3]"
              >
                <Icon name={resolveToolIcon(link.marker)} className="w-3.5 h-3.5 text-[#C5CBD3]" />
                <span>{link.marker}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Responsive Constellation List + Mini Topology */}
      <div className="md:hidden space-y-3">
        {items.map((domain) => {
          const links = connections.filter(
            (c) => c.from === domain.id || c.to === domain.id
          );
          const isSelected = selectedDomainId === domain.id;

          return (
            <button
              key={domain.id}
              type="button"
              onClick={() => onSelectDomain(domain)}
              className={[
                'w-full text-left p-4 rounded border transition-colors flex flex-col gap-3 group',
                isSelected
                  ? 'border-[#C8102E] bg-[#171B22]/90'
                  : 'border-[#C5CBD3]/20 bg-[#07090C]/75 hover:border-[#C5CBD3]/45',
              ].join(' ')}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="h-9 w-9 rounded-full border border-[#C5CBD3]/30 bg-[#111419]/85 flex items-center justify-center text-[#C5CBD3] group-hover:text-[#C8102E] transition-colors">
                    <DomainIcon domainId={domain.id} className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="type-label text-[#C5CBD3]/80 block">{domain.code}</span>
                    <span className="font-display text-base font-bold text-[#F5F6F8]">
                      {domain.name}
                    </span>
                  </div>
                </div>
                <Icon
                  name="arrow-right"
                  className="w-4 h-4 text-[#C5CBD3] group-hover:text-[#C8102E] transition-colors"
                />
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {links.map((link) => (
                  <span
                    key={`${link.from}-${link.to}`}
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-[#C5CBD3]/15 bg-[#111419]/85 type-label text-[#C5CBD3]/85"
                  >
                    <Icon name={resolveToolIcon(link.marker)} className="w-3 h-3 text-[#C5CBD3]" />
                    <span>{link.marker}</span>
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
