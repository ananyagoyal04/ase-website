export interface NavItem {
  label: string;
  to: string;
}

export interface TeaserCard {
  id: string;
  index: string;
  kicker: string;
  title: string;
  summary: string;
  ctaLabel: string;
  to: string;
}

export interface DomainItem {
  id: string;
  code: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  skills: string[];
  tools: string[];
  /** Normalized coordinates (0..100) for the Domain Map SVG graph */
  position: { x: number; y: number };
  featuredFocus: string;
}

export interface DomainConnection {
  from: string;
  to: string;
  marker: string;
}

export interface ProjectItem {
  id: string;
  code: string;
  title: string;
  domain: string;
  status: string;
  summary: string;
  description: string;
  stack: string[];
  links: { label: string; url: string }[];
}

export interface EventItem {
  id: string;
  category: string;
  title: string;
  dateLabel: string;
  status: 'upcoming' | 'past';
  summary: string;
  details: string;
  location: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  domain: string;
  bio: string;
  links: { label: string; url: string }[];
}

export const siteContent = {
  brand: {
    name: 'ASE',
    fullName: 'Advanced Software Engineering',
    institution: 'NMIT Bengaluru',
    heroKicker: 'ASE · NMIT BENGALURU',
    tagline: "We imagine. We engineer. We build what's next.",
    copyright: '© 2026 ASE · NMIT Bengaluru. [PLACEHOLDER: Update legal/club notice]',
    location: 'Nitte Meenakshi Institute of Technology, Bengaluru',
  },

  navigation: [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Domains', to: '/domains' },
    { label: 'Projects', to: '/projects' },
    { label: 'Events', to: '/events' },
    { label: 'Team', to: '/team' },
    { label: 'Collaborate', to: '/collaborate' },
    { label: 'Contact', to: '/contact' },
  ] satisfies NavItem[],

  home: {
    hero: {
      kicker: 'ASE · NMIT BENGALURU',
      headline: "We imagine. We engineer. We build what's next.",
      subtext:
        'The flagship student engineering collective at NMIT Bengaluru—uniting curious builders across systems, AI, and product craft.',
      primaryCta: { label: 'Explore Domains', to: '/domains' },
      secondaryCta: { label: 'Collaborate with us', to: '/collaborate' },
      videoMp4: '/media/ase-eagle.mp4',
      poster: '/media/eagle-poster.jpeg',
    },
    intro: {
      kicker: '// 01 ENGINEERING CULTURE',
      headline: "We don't just study technology. We build what comes next.",
      body: 'At ASE, student engineers move beyond coursework into production systems, applied research, and collaborative shipping. Every cohort is structured around real engineering disciplines, peer code reviews, and hands-on builds.',
      highlights: [
        {
          label: 'DISCIPLINE',
          value: '[PLACEHOLDER: Focus Areas]',
          note: 'Cross-functional engineering pods',
        },
        {
          label: 'CADENCE',
          value: '[PLACEHOLDER: Build Cycles]',
          note: 'Weekly reviews, sprints & showcases',
        },
        {
          label: 'COMMUNITY',
          value: '[PLACEHOLDER: Cohort Size]',
          note: 'Open to builders across NMIT',
        },
      ],
      cta: { label: 'Read our story', to: '/about' },
    },
    teasersKicker: '// 02 EXPLORE ASE',
    teasersTitle: 'Where to start',
    teasers: [
      {
        id: 'domains',
        index: '01',
        kicker: 'INTERACTIVE ARCHITECTURE',
        title: 'Engineering Domains',
        summary:
          'Navigate the connected disciplines powering ASE—explore shared toolchains on the Domain Map or pull a track into the Singularity core.',
        ctaLabel: 'Explore Domains',
        to: '/domains',
      },
      {
        id: 'projects',
        index: '02',
        kicker: 'SHIPPED WORK',
        title: 'Student Projects',
        summary:
          'Inspect open builds, technical prototypes, and software systems engineered by ASE members. [PLACEHOLDER: Add project highlights]',
        ctaLabel: 'View Projects',
        to: '/projects',
      },
      {
        id: 'collaborate',
        index: '03',
        kicker: 'INDUSTRY & SPONSORS',
        title: 'Collaborate with ASE',
        summary:
          'Partner with NMIT Bengaluru’s largest tech collective on workshops, problem statements, mentorship, and flagship technical events.',
        ctaLabel: 'Partner With Us',
        to: '/collaborate',
      },
    ] satisfies TeaserCard[],
  },

  about: {
    kicker: '// ABOUT ASE',
    headline: 'Built by curiosity. Defined by what we ship.',
    story:
      '[PLACEHOLDER: Replace with ASE’s founding story at NMIT Bengaluru—how the club started, its evolution into the largest student engineering collective on campus, and its mission.]',
    whatWeDo: [
      {
        code: '01',
        title: 'Applied Engineering Pods',
        description:
          '[PLACEHOLDER: Describe how members collaborate in domain teams to build software, tooling, and research prototypes.]',
      },
      {
        code: '02',
        title: 'Technical Workshops & Sprints',
        description:
          '[PLACEHOLDER: Describe hands-on peer-led sessions, architecture deep-dives, and build weekends.]',
      },
      {
        code: '03',
        title: 'Industry & Open-Source Bridge',
        description:
          '[PLACEHOLDER: Describe how ASE connects student talent with real engineering challenges and external mentors.]',
      },
    ],
    values: [
      {
        title: 'First-Principles Rigor',
        detail: '[PLACEHOLDER: Value description about understanding systems deeply rather than copying templates.]',
      },
      {
        title: 'Bias to Ship',
        detail: '[PLACEHOLDER: Value description about turning ideas into working, tested artifacts.]',
      },
      {
        title: 'Open Mentorship',
        detail: '[PLACEHOLDER: Value description about senior builders mentoring incoming cohorts.]',
      },
    ],
  },

  domains: {
    kicker: '// ENGINEERING DOMAINS',
    headline: 'Connected disciplines. One engineering core.',
    subtitle:
      'Every domain at ASE shares foundational tools and interfaces with the others. Inspect the constellation map or test a domain inside the Singularity.',
    items: [
      {
        id: 'systems-backend',
        code: 'DOM-01',
        name: 'Systems & Backend Engineering',
        shortName: 'Systems',
        tagline: '[PLACEHOLDER: Distributed services, APIs, and reliability]',
        description:
          '[PLACEHOLDER: Describe the Systems & Backend track at ASE—APIs, databases, distributed architecture, and performance engineering.]',
        skills: ['API Architecture', 'Concurrency', 'Data Modeling', 'Observability'],
        tools: ['Go', 'Rust', 'PostgreSQL', 'Docker'],
        position: { x: 24, y: 26 },
        featuredFocus: '[PLACEHOLDER: Core backend & infrastructure builds]',
      },
      {
        id: 'ai-ml',
        code: 'DOM-02',
        name: 'Applied AI & Machine Learning',
        shortName: 'AI / ML',
        tagline: '[PLACEHOLDER: Model engineering, inference, and evaluation]',
        description:
          '[PLACEHOLDER: Describe the AI & ML track at ASE—applied models, RAG pipelines, computer vision, and reproducible experimentation.]',
        skills: ['Model Evaluation', 'Data Pipelines', 'Inference Optimization', 'Computer Vision'],
        tools: ['Python', 'PyTorch', 'ONNX', 'FastAPI'],
        position: { x: 74, y: 24 },
        featuredFocus: '[PLACEHOLDER: Applied ML & inference tooling]',
      },
      {
        id: 'web-product',
        code: 'DOM-03',
        name: 'Web & Product Engineering',
        shortName: 'Web & UI',
        tagline: '[PLACEHOLDER: Precision interfaces and full-stack web apps]',
        description:
          '[PLACEHOLDER: Describe the Web & Product track—accessible design systems, interactive frontends, and resilient full-stack delivery.]',
        skills: ['Design Systems', 'State Architecture', 'Web Performance', 'Accessibility'],
        tools: ['TypeScript', 'React', 'Next.js', 'Tailwind'],
        position: { x: 20, y: 72 },
        featuredFocus: '[PLACEHOLDER: Interactive web platforms & tooling]',
      },
      {
        id: 'cloud-devops',
        code: 'DOM-04',
        name: 'Cloud & Infrastructure',
        shortName: 'Cloud / Ops',
        tagline: '[PLACEHOLDER: CI/CD automation, containers, and deployment]',
        description:
          '[PLACEHOLDER: Describe the Cloud & DevOps track—container orchestration, automated pipelines, and resilient deployment workflows.]',
        skills: ['CI/CD Pipelines', 'Containerization', 'Linux Internals', 'IaC'],
        tools: ['Linux', 'Kubernetes', 'Terraform', 'GitHub Actions'],
        position: { x: 52, y: 50 },
        featuredFocus: '[PLACEHOLDER: Club deployment & lab infrastructure]',
      },
      {
        id: 'security-embedded',
        code: 'DOM-05',
        name: 'Security & Embedded Systems',
        shortName: 'Security',
        tagline: '[PLACEHOLDER: AppSec, hardware interfaces, and edge compute]',
        description:
          '[PLACEHOLDER: Describe Security & Embedded—threat modeling, firmware fundamentals, and hardware-software integration.]',
        skills: ['Threat Modeling', 'Network Analysis', 'Firmware', 'CTF Engineering'],
        tools: ['C / C++', 'Wireshark', 'ESP32', 'Burp Suite'],
        position: { x: 78, y: 74 },
        featuredFocus: '[PLACEHOLDER: Security audits & edge prototypes]',
      },
    ] satisfies DomainItem[],
    connections: [
      { from: 'systems-backend', to: 'cloud-devops', marker: 'Docker' },
      { from: 'systems-backend', to: 'web-product', marker: 'REST / RPC' },
      { from: 'ai-ml', to: 'cloud-devops', marker: 'GPU / Containers' },
      { from: 'ai-ml', to: 'systems-backend', marker: 'Python / APIs' },
      { from: 'web-product', to: 'cloud-devops', marker: 'CI/CD' },
      { from: 'cloud-devops', to: 'security-embedded', marker: 'Linux' },
      { from: 'systems-backend', to: 'security-embedded', marker: 'Protocols' },
    ] satisfies DomainConnection[],
  },

  projects: {
    kicker: '// PROJECT ARCHIVE',
    headline: 'Systems engineered by students.',
    subtitle:
      '[PLACEHOLDER: Replace with verified ASE member projects. Filter by domain or expand any card for architecture notes.]',
    items: [
      {
        id: 'proj-01',
        code: 'PRJ-01',
        title: '[PLACEHOLDER: Campus Compute Scheduler]',
        domain: 'Systems',
        status: '[PLACEHOLDER: Active]',
        summary: '[PLACEHOLDER: Short one-line summary of what this project solves.]',
        description:
          '[PLACEHOLDER: Full technical description—architecture choices, engineering challenges solved, and what the team learned.]',
        stack: ['Go', 'PostgreSQL', 'Docker'],
        links: [{ label: 'Repository [PLACEHOLDER]', url: 'https://github.com' }],
      },
      {
        id: 'proj-02',
        code: 'PRJ-02',
        title: '[PLACEHOLDER: Vision Inspection Pipeline]',
        domain: 'AI / ML',
        status: '[PLACEHOLDER: Prototype]',
        summary: '[PLACEHOLDER: Short one-line summary of the ML/CV workflow.]',
        description:
          '[PLACEHOLDER: Full technical description—dataset pipeline, model architecture, and latency benchmarks.]',
        stack: ['Python', 'PyTorch', 'FastAPI'],
        links: [{ label: 'Repository [PLACEHOLDER]', url: 'https://github.com' }],
      },
      {
        id: 'proj-03',
        code: 'PRJ-03',
        title: '[PLACEHOLDER: ASE Portal & Event Engine]',
        domain: 'Web & UI',
        status: '[PLACEHOLDER: Shipped]',
        summary: '[PLACEHOLDER: Short one-line summary of the web application.]',
        description:
          '[PLACEHOLDER: Full technical description—frontend architecture, design tokens, and deployment setup.]',
        stack: ['TypeScript', 'React', 'Tailwind'],
        links: [{ label: 'Repository [PLACEHOLDER]', url: 'https://github.com' }],
      },
      {
        id: 'proj-04',
        code: 'PRJ-04',
        title: '[PLACEHOLDER: Telemetry Edge Node]',
        domain: 'Security',
        status: '[PLACEHOLDER: R&D]',
        summary: '[PLACEHOLDER: Short one-line summary of the embedded/security build.]',
        description:
          '[PLACEHOLDER: Full technical description—protocol design, hardware interface, and verification.]',
        stack: ['C++', 'Linux', 'MQTT'],
        links: [{ label: 'Repository [PLACEHOLDER]', url: 'https://github.com' }],
      },
    ] satisfies ProjectItem[],
  },

  events: {
    kicker: '// EVENTS & TIMELINE',
    headline: 'Sprints, talks, and flagship builds.',
    subtitle:
      '[PLACEHOLDER: Replace with real ASE event dates, venues at NMIT, and summaries.]',
    items: [
      {
        id: 'evt-01',
        category: 'UPCOMING',
        title: '[PLACEHOLDER: Upcoming Flagship Hackathon / Sprint]',
        dateLabel: '[PLACEHOLDER: Month YYYY]',
        status: 'upcoming',
        summary: '[PLACEHOLDER: Brief overview of the upcoming event.]',
        details:
          '[PLACEHOLDER: Schedule, problem tracks, eligibility, and registration instructions for NMIT students.]',
        location: '[PLACEHOLDER: NMIT Bengaluru Auditorium / Lab]',
      },
      {
        id: 'evt-02',
        category: 'WORKSHOP',
        title: '[PLACEHOLDER: Systems & Architecture Workshop]',
        dateLabel: '[PLACEHOLDER: Month YYYY]',
        status: 'upcoming',
        summary: '[PLACEHOLDER: Hands-on engineering session led by ASE leads.]',
        details: '[PLACEHOLDER: Prerequisites, tools covered, and seat details.]',
        location: '[PLACEHOLDER: CSE Seminar Hall, NMIT]',
      },
      {
        id: 'evt-03',
        category: 'PAST FLAGSHIP',
        title: '[PLACEHOLDER: Past Flagship Event]',
        dateLabel: '[PLACEHOLDER: Previous Semester]',
        status: 'past',
        summary: '[PLACEHOLDER: Recap of an earlier ASE flagship event or showcase.]',
        details: '[PLACEHOLDER: Highlights, participating teams, and project outcomes.]',
        location: 'NMIT Bengaluru',
      },
    ] satisfies EventItem[],
  },

  team: {
    kicker: '// CORE TEAM',
    headline: 'The builders steering ASE.',
    subtitle:
      '[PLACEHOLDER: Replace with verified core team members, roles, and profile links for the current academic year.]',
    members: [
      {
        id: 'tm-01',
        name: '[PLACEHOLDER: Member Name 01]',
        role: '[PLACEHOLDER: President / Lead]',
        domain: 'Systems',
        bio: '[PLACEHOLDER: Short 1-line engineering bio or focus area.]',
        links: [{ label: 'GitHub', url: 'https://github.com' }],
      },
      {
        id: 'tm-02',
        name: '[PLACEHOLDER: Member Name 02]',
        role: '[PLACEHOLDER: Technical Lead]',
        domain: 'AI / ML',
        bio: '[PLACEHOLDER: Short 1-line engineering bio or focus area.]',
        links: [{ label: 'LinkedIn', url: 'https://linkedin.com' }],
      },
      {
        id: 'tm-03',
        name: '[PLACEHOLDER: Member Name 03]',
        role: '[PLACEHOLDER: Design & Web Lead]',
        domain: 'Web & UI',
        bio: '[PLACEHOLDER: Short 1-line engineering bio or focus area.]',
        links: [{ label: 'GitHub', url: 'https://github.com' }],
      },
      {
        id: 'tm-04',
        name: '[PLACEHOLDER: Member Name 04]',
        role: '[PLACEHOLDER: Cloud & Ops Lead]',
        domain: 'Cloud / Ops',
        bio: '[PLACEHOLDER: Short 1-line engineering bio or focus area.]',
        links: [{ label: 'GitHub', url: 'https://github.com' }],
      },
    ] satisfies TeamMember[],
  },

  collaborate: {
    kicker: '// INDUSTRY & SPONSORS',
    headline: 'Partner with high-velocity student engineers.',
    subtitle:
      'Collaborate with ASE at NMIT Bengaluru through technical sponsorships, live engineering challenges, mentorship, and campus showcases.',
    waysToPartner: [
      {
        code: '01',
        title: 'Event & Hackathon Sponsorship',
        description:
          '[PLACEHOLDER: Sponsor flagship hackathons, engineering sprints, or hardware/cloud credits for student builders.]',
      },
      {
        code: '02',
        title: 'Problem Statements & R&D',
        description:
          '[PLACEHOLDER: Bring real engineering briefs to ASE domain pods for semester-long prototype development.]',
      },
      {
        code: '03',
        title: 'Tech Talks & Mentorship',
        description:
          '[PLACEHOLDER: Host architecture reviews, guest engineering sessions, or career workshops on campus.]',
      },
    ],
    studentValue: [
      '[PLACEHOLDER: Access to vetted student builders across Systems, AI/ML, Web, Cloud, and Security]',
      '[PLACEHOLDER: Direct campus visibility at NMIT Bengaluru technical events]',
      '[PLACEHOLDER: Structured project handoffs, clean documentation, and open-source deliverables]',
    ],
    enquiryEmail: 'ase-partnerships@example.edu',
    enquirySubject: 'ASE NMIT Bengaluru — Collaboration / Sponsor Enquiry',
  },

  contact: {
    kicker: '// CONTACT ASE',
    headline: 'Start a conversation.',
    subtitle:
      'Questions about joining a domain pod, collaborating on a project, or partnering with ASE at NMIT Bengaluru? Reach out directly.',
    email: 'ase@example.edu',
    address: 'Department / Club Hub [PLACEHOLDER], NMIT, Yelahanka, Bengaluru 560064',
    socials: [
      { label: 'GitHub [PLACEHOLDER]', url: 'https://github.com' },
      { label: 'LinkedIn [PLACEHOLDER]', url: 'https://linkedin.com' },
      { label: 'Instagram [PLACEHOLDER]', url: 'https://instagram.com' },
    ],
  },
} as const;
