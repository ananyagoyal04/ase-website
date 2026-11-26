import type { ComponentType } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Calendar,
  CheckCircle2,
  Cloud,
  Compass,
  Cpu,
  ExternalLink,
  FolderGit2,
  Globe,
  Handshake,
  Layers,
  Mail,
  MapPin,
  Menu,
  Minus,
  Network,
  Plus,
  Server,
  Shield,
  Sparkles,
  Terminal,
  Users,
  Workflow,
  X,
} from 'lucide-react';
import {
  SiCplusplus,
  SiDocker,
  SiFastapi,
  SiFigma,
  SiGithub,
  SiGithubactions,
  SiGo,
  SiGoogleforms,
  SiGooglesheets,
  SiInstagram,
  SiKubernetes,
  SiLinux,
  SiMqtt,
  SiNextdotjs,
  SiNotion,
  SiOnnx,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiReact,
  SiRust,
  SiTailwindcss,
  SiTerraform,
  SiTypescript,
  SiWireshark,
} from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa';

export type IconName =
  | 'arrow-right'
  | 'arrow-up-right'
  | 'award'
  | 'calendar'
  | 'check'
  | 'cloud'
  | 'compass'
  | 'cpu'
  | 'external-link'
  | 'folder-git'
  | 'globe'
  | 'handshake'
  | 'layers'
  | 'mail'
  | 'map-pin'
  | 'menu'
  | 'minus'
  | 'network'
  | 'plus'
  | 'server'
  | 'shield'
  | 'sparkles'
  | 'terminal'
  | 'users'
  | 'workflow'
  | 'x'
  | 'github'
  | 'linkedin'
  | 'instagram'
  | 'figma'
  | 'notion'
  | 'google-sheets'
  | 'google-forms'
  | 'go'
  | 'rust'
  | 'postgresql'
  | 'docker'
  | 'python'
  | 'pytorch'
  | 'onnx'
  | 'fastapi'
  | 'typescript'
  | 'react'
  | 'nextjs'
  | 'tailwind'
  | 'linux'
  | 'kubernetes'
  | 'terraform'
  | 'github-actions'
  | 'cplusplus'
  | 'wireshark'
  | 'mqtt';

const LUCIDE_ICONS: Partial<Record<IconName, ComponentType<{ className?: string; strokeWidth?: number }>>> = {
  'arrow-right': ArrowRight,
  'arrow-up-right': ArrowUpRight,
  award: Award,
  calendar: Calendar,
  check: CheckCircle2,
  cloud: Cloud,
  compass: Compass,
  cpu: Cpu,
  'external-link': ExternalLink,
  'folder-git': FolderGit2,
  globe: Globe,
  handshake: Handshake,
  layers: Layers,
  mail: Mail,
  'map-pin': MapPin,
  menu: Menu,
  minus: Minus,
  network: Network,
  plus: Plus,
  server: Server,
  shield: Shield,
  sparkles: Sparkles,
  terminal: Terminal,
  users: Users,
  workflow: Workflow,
  x: X,
};

const BRAND_ICONS: Partial<Record<IconName, ComponentType<{ className?: string }>>> = {
  github: SiGithub,
  linkedin: FaLinkedinIn,
  instagram: SiInstagram,
  figma: SiFigma,
  notion: SiNotion,
  'google-sheets': SiGooglesheets,
  'google-forms': SiGoogleforms,
  go: SiGo,
  rust: SiRust,
  postgresql: SiPostgresql,
  docker: SiDocker,
  python: SiPython,
  pytorch: SiPytorch,
  onnx: SiOnnx,
  fastapi: SiFastapi,
  typescript: SiTypescript,
  react: SiReact,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  linux: SiLinux,
  kubernetes: SiKubernetes,
  terraform: SiTerraform,
  'github-actions': SiGithubactions,
  cplusplus: SiCplusplus,
  wireshark: SiWireshark,
  mqtt: SiMqtt,
};

const TOOL_LABEL_TO_ICON: Record<string, IconName> = {
  Go: 'go',
  Rust: 'rust',
  PostgreSQL: 'postgresql',
  Docker: 'docker',
  Python: 'python',
  PyTorch: 'pytorch',
  ONNX: 'onnx',
  FastAPI: 'fastapi',
  TypeScript: 'typescript',
  React: 'react',
  'Next.js': 'nextjs',
  Tailwind: 'tailwind',
  Linux: 'linux',
  Kubernetes: 'kubernetes',
  Terraform: 'terraform',
  'GitHub Actions': 'github-actions',
  'C / C++': 'cplusplus',
  'C++': 'cplusplus',
  Wireshark: 'wireshark',
  ESP32: 'cpu',
  'Burp Suite': 'shield',
  MQTT: 'mqtt',
  'REST / RPC': 'network',
  'GPU / Containers': 'docker',
  'Python / APIs': 'python',
  'CI/CD': 'github-actions',
  Protocols: 'network',
  GitHub: 'github',
  Figma: 'figma',
  Notion: 'notion',
  'Google Sheets': 'google-sheets',
  'Google Forms': 'google-forms',
};

export function resolveToolIcon(toolName: string): IconName {
  return TOOL_LABEL_TO_ICON[toolName] ?? 'terminal';
}

interface IconProps {
  name: IconName;
  className?: string;
}

export function Icon({ name, className = 'w-4 h-4' }: IconProps) {
  const BrandIcon = BRAND_ICONS[name];
  if (BrandIcon) {
    return <BrandIcon className={className} aria-hidden="true" />;
  }

  const LucideIcon = LUCIDE_ICONS[name] ?? Terminal;
  return <LucideIcon className={className} strokeWidth={1.5} aria-hidden="true" />;
}
