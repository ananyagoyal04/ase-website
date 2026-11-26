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
