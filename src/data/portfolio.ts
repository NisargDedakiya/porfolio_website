export interface Skill {
  name: string;
  level: number; // percentage or skill level 1-100
  status: "Armed" | "Compiling" | "Ready" | "Active";
  subskills: string[];
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  technologies: string[];
  features: string[];
  impact: string;
  githubUrl?: string;
  liveUrl?: string;
  status: "Operational" | "Beta" | "Development" | "Planned";
  role: string;
  image: string;
  metrics?: { label: string; value: string }[];
  securityFocus?: string;
  screenshots?: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  verificationUrl?: string;
  badgeType: "offensive" | "defensive" | "general";
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  status: "completed" | "active" | "planned";
}

export interface BlogPost {
  id: string;
  title: string;
  category: "CTF Writeups" | "Security Research" | "Learning Notes" | "Tool Reviews";
  date: string;
  readTime: string;
  snippet: string;
  views: number;
}

export const personalInfo = {
  name: "Nisarg Dedakiya",
  roles: [
    "Cybersecurity Student",
    "Bug Bounty Hunter",
    "Digital Forensics Enthusiast",
    "Security Tool Builder",
    "Future Security Researcher"
  ],
  tagline: "Securing Digital Systems Through Research, Automation, and Continuous Learning",
  about: {
    bio: "I am a B.Tech CSE student specializing in cybersecurity. My journey is fueled by a passion for understanding how systems break and, more importantly, how to defend them. I spend my time hunting for vulnerabilities in web applications, building security automation tools, and digging into digital forensics to solve security incidents.",
    education: "B.Tech in Computer Science & Engineering (B.Tech CSE Student)",
    goal: "To become a professional security researcher and contribute to protecting global digital infrastructures through proactive security and automation.",
    interests: [
      "Cybersecurity",
      "Bug Bounty Hunting",
      "Digital Forensics",
      "Security Automation",
      "AI for Security"
    ]
  },
  contacts: {
    github: "https://github.com/NisargDedakiya",
    linkedin: "https://www.linkedin.com/in/nisarg-dedakiya",
    x: "https://x.com/Nisarg_Dedakiya",
    hackerone: "https://hackerone.com/sharingansec",
    bugcrowd: "https://bugcrowd.com/SharinganSec",
    email: "nisargdedakiya@example.com",
    resume: "#"
  }
};

export const skillsData: SkillCategory[] = [
  {
    title: "Reconnaissance",
    skills: [
      { name: "Nmap", level: 80, status: "Ready", subskills: ["Port Scanning", "NSE Scripting", "OS Detection", "Network Mapping"] },
      { name: "Subfinder", level: 85, status: "Active", subskills: ["Passive Enumeration", "API Integration", "Wildcard Filtering"] },
      { name: "Amass", level: 75, status: "Compiling", subskills: ["DNS Enumeration", "ASN Mapping", "Graph Data Sync"] },
      { name: "Asset Discovery", level: 90, status: "Armed", subskills: ["Permutation Scanning", "Active Probing", "Port Correlation"] }
    ]
  },
  {
    title: "Web Exploitation",
    skills: [
      { name: "Burp Suite", level: 90, status: "Active", subskills: ["Interception", "Request Repeater/Intruder", "Collaborator OOB", "JWT Audits"] },
      { name: "OWASP Testing", level: 88, status: "Armed", subskills: ["OWASP Top 10", "Business Logic Testing", "Input Sanitization", "Auth Bypass"] },
      { name: "Authentication Testing", level: 85, status: "Active", subskills: ["OAuth Flow Auditing", "JWT Validation Checks", "Session Fixation"] },
      { name: "API Security", level: 82, status: "Ready", subskills: ["REST/GraphQL Audits", "Mass Assignment Tests", "Rate Limit Probing"] }
    ]
  },
  {
    title: "Security Engineering",
    skills: [
      { name: "Python", level: 88, status: "Active", subskills: ["Security Scripting", "Exploit Prototyping", "Automation Tools"] },
      { name: "React", level: 80, status: "Ready", subskills: ["Secure SPA Architecture", "Input Sanitization", "CSP Compliance"] },
      { name: "Node.js", level: 78, status: "Ready", subskills: ["Secure Routing", "Middleware Auth", "JWT Generation", "Helmet Configs"] },
      { name: "Firebase", level: 72, status: "Ready", subskills: ["Database Security Rules", "Auth Services", "Serverless Configs"] }
    ]
  },
  {
    title: "Digital Forensics",
    skills: [
      { name: "Log Analysis", level: 75, status: "Ready", subskills: ["EVTX Event Logs Parsing", "Log Correlation", "Timeline Generation"] },
      { name: "Evidence Collection", level: 70, status: "Compiling", subskills: ["Disk Imaging", "Registry Hive Extraction", "Memory Acquisition"] },
      { name: "Incident Investigation", level: 80, status: "Active", subskills: ["IoC Threat Hunting", "Post-Breach Containment", "Volatility Analysis"] }
    ]
  }
];

export const projectsData: Project[] = [
  {
    id: "dnm-hunter",
    name: "Operation DNM Hunter",
    tagline: "Build AI-assisted reconnaissance framework.",
    problem: "Modern bug bounty recon involves running dozens of tools manually, generating messy data that is hard to filter, track, and correlate. Testers miss critical exposures due to tool fatigue and slow reaction times to newly deployed subdomains.",
    solution: "Developed DNM Hunter, an automated framework that aggregates subdomains, ports, and headers from various engines, uses customized heuristics to filter anomalies, and leverages AI model parsing to identify high-probability attack vectors.",
    technologies: ["Python", "FastAPI", "AI", "Docker", "Go", "PostgreSQL"],
    features: [
      "Subdomain monitoring and automatic delta analysis alerts via Discord",
      "Dynamic visual graphs representing system dependencies",
      "AI-driven suggestion engine to recommend target-specific exploits",
      "Automated mass-recon module with built-in rate-limiting and rotating proxies"
    ],
    impact: "Automated 80% of initial reconnaissance, successfully discovering 3 critical sub-domain takeover vectors and 15+ high/medium severity exposures across several active bug bounty scopes.",
    githubUrl: "https://github.com/nisargdedakiya/dnm-hunter",
    status: "Operational",
    role: "Lead Developer & Security Researcher",
    image: "/images/projects/dnm-hunter.png",
    securityFocus: "Attack Surface Management & Recon Automation",
    metrics: [
      { label: "Recon Automation", value: "80%" },
      { label: "Critical Takeovers", value: "3 Found" },
      { label: "Alert Latency", value: "< 2 min" }
    ]
  },
  {
    id: "huntkit",
    name: "Operation HuntKit",
    tagline: "AI-Powered Bug Bounty Companion App (React Native + Claude AI)",
    problem: "Bug hunters face high cognitive load switching between program scopes, terminal tools, note-taking apps, and severity calculators on the fly. This fragmented workflow slows down analysis and leads to missed vulnerability opportunities, especially when away from a main workstation.",
    solution: "Designed and built HuntKit, a professional offline-first Android companion app that integrates Claude AI to analyze program scopes in 30 seconds. The app automatically generates attack paths, prioritized todo lists, custom tool stacks with real commands, and a 5-phase bug hunting framework with 41 auto-seeded tasks.",
    technologies: ["React Native", "Expo SDK 54", "Claude AI API", "AsyncStorage", "EAS Build", "React Navigation"],
    features: [
      "AI Scope Analyzer: Paste any Bugcrowd/HackerOne program scope to get a complete exploit plan and prioritized todo list in 30 seconds",
      "5-Phase Framework Checklist: 41 auto-seeded tasks per target (Recon → Scanning → Vuln Discovery → Exploitation → Reporting)",
      "Findings Tracker & CVSS Calculator: Track findings with CVSS v3.1 calculator, custom status flow, and screenshot attachments for PoC",
      "Tactical Reference & SOC Compliance: 40+ command reference with one-tap clipboard copy and an X-Bug-Bounty header generator"
    ],
    impact: "Successfully built, packaged via EAS Build, and installed on personal Android device. Used daily for active hunting on Bugcrowd and HackerOne to streamline scope analysis and export formatted bug reports.",
    status: "Operational",
    role: "Solo Developer & Security Researcher",
    image: "/images/projects/huntkit.png",
    securityFocus: "AI-Assisted Security & Mobile Vulnerability Hunting",
    metrics: [
      { label: "Max Bounty Mapped", value: "$100,000" },
      { label: "SOC Compliant Header", value: "X-Bug-Bounty" },
      { label: "Seeded Framework", value: "41 Tasks" }
    ],
    screenshots: [
      "/images/projects/huntkit-target.jpg",
      "/images/projects/huntkit-settings.jpg",
      "/images/projects/huntkit-ai-analyzer.jpg",
      "/images/projects/huntkit-add-target.jpg",
      "/images/projects/huntkit-analytics.jpg"
    ]
  }
];

export const certificationsData: Certification[] = [
  {
    name: "Certified Ethical Hacker (CEH) Practice",
    issuer: "EC-Council",
    date: "2025",
    verificationUrl: "https://www.eccouncil.org",
    badgeType: "offensive"
  },
  {
    name: "TryHackMe - Top 1% Rank Profile",
    issuer: "TryHackMe",
    date: "2025",
    verificationUrl: "https://tryhackme.com/p/nisargdedakiya",
    badgeType: "offensive"
  },
  {
    name: "Hack The Box - Pro Hacker Rank",
    issuer: "Hack The Box",
    date: "2025",
    verificationUrl: "https://hackthebox.eu",
    badgeType: "offensive"
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "NPTEL",
    date: "2024",
    verificationUrl: "https://nptel.ac.in",
    badgeType: "general"
  },
  {
    name: "Google Cybersecurity Professional",
    issuer: "Coursera",
    date: "2024",
    verificationUrl: "https://coursera.org",
    badgeType: "defensive"
  }
];

export const learningTimeline: TimelineEvent[] = [
  {
    year: "2024",
    title: "Cybersecurity Initiation",
    description: "Discovered security fundamentals, set up tactical Linux research environments, and studied MITRE ATT&CK concepts.",
    status: "completed"
  },
  {
    year: "2025",
    title: "CTFs and Labs",
    description: "Focused on Hack The Box, TryHackMe (reached Top 1% rank), and tested public Web Application scopes for Bug Bounty programs.",
    status: "completed"
  },
  {
    year: "2026",
    title: "Bug Bounty Research",
    description: "Targeted web application testing, scripting custom recon automation (DNM Hunter), and participating in bug bounty platforms.",
    status: "active"
  },
  {
    year: "2027",
    title: "Advanced Security Tool Development",
    description: "Creating defensive and offensive toolkits, reverse engineering malware, and building automated security analysis pipelines.",
    status: "planned"
  },
  {
    year: "2028",
    title: "Professional Security Career",
    description: "Aiming to transition into a Red Team Operator / Security Consultant role, conducting infrastructure audits and penetration tests.",
    status: "planned"
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: "dnm-hunter-deep-dive",
    title: "Automating Subdomain Recon: Building DNM Hunter",
    category: "Security Research",
    date: "June 2026",
    readTime: "6 min read",
    snippet: "Reconnaissance is the most critical stage of bug hunting. In this article, I discuss how I engineered a dynamic tracking tool that monitors subdomain deltas and updates Discord on the go.",
    views: 312
  },
  {
    id: "thm-advent-of-cyber",
    title: "Reflecting on Advent of Cyber: Key Takeaways",
    category: "Learning Notes",
    date: "January 2026",
    readTime: "4 min read",
    snippet: "Analyzing the diverse challenges of the Advent of Cyber CTF room. Notes on active directory attacks, cloud log parsing, and reversing web cookies.",
    views: 185
  },
  {
    id: "forensics-windows-evtx",
    title: "Digital Forensics 101: Parsing Windows EVTX Logs",
    category: "CTF Writeups",
    date: "November 2025",
    readTime: "8 min read",
    snippet: "A practical walkthrough on hunting lateral movement inside Windows Event Logs using PowerShell and custom Python parser logs after a mock system breach.",
    views: 240
  },
  {
    id: "burpsuite-tips",
    title: "Unlocking Burp Suite Pro features with Automation Scripts",
    category: "Tool Reviews",
    date: "August 2025",
    readTime: "5 min read",
    snippet: "Reviewing my top custom macros and extensions that streamline security testing of complex single page applications (SPAs) and token refreshing states.",
    views: 450
  }
];

export interface BugBountyPlatform {
  name: "HackerOne" | "Bugcrowd";
  username: string;
  profileUrl: string;
  programsParticipated: number;
  researchFocus: string;
  findingsCount: number;
  achievements: string[];
  points?: number; // point placeholder for future expansion
}

export interface SecurityWriteup {
  title: string;
  link: string;
  date: string;
  description: string;
}

export interface CVEContribution {
  id: string;
  description: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  date: string;
  link?: string;
}

export interface ResearchPublication {
  title: string;
  publisher: string;
  date: string;
  description: string;
  link?: string;
}

// Global data structures for future integration
export const bugBountyPlatforms: BugBountyPlatform[] = [
  {
    name: "HackerOne",
    username: "sharingansec",
    profileUrl: "https://hackerone.com/sharingansec",
    programsParticipated: 12,
    researchFocus: "Web Applications / API Security",
    findingsCount: 14,
    achievements: ["Top 100 Indian Hackers", "Signal Verified", "First Blood"]
  },
  {
    name: "Bugcrowd",
    username: "SharinganSec",
    profileUrl: "https://bugcrowd.com/SharinganSec",
    programsParticipated: 8,
    researchFocus: "Mobile Applications / Business Logic",
    findingsCount: 10,
    achievements: ["P2 Exploit Submissions", "Active Hunter Badge", "Vetted Researcher"]
  }
];

export const cveContributions: CVEContribution[] = [];
export const researchPublications: ResearchPublication[] = [];
