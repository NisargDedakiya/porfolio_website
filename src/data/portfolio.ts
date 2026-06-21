export interface Skill {
  name: string;
  level: number; // percentage or skill level 1-100
  status: "Armed" | "Compiling" | "Ready" | "Active";
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
      { name: "Nmap", level: 80, status: "Ready" },
      { name: "Subfinder", level: 85, status: "Active" },
      { name: "Amass", level: 75, status: "Compiling" },
      { name: "Asset Discovery", level: 90, status: "Armed" }
    ]
  },
  {
    title: "Web Exploitation",
    skills: [
      { name: "Burp Suite", level: 90, status: "Active" },
      { name: "OWASP Testing", level: 88, status: "Armed" },
      { name: "Authentication Testing", level: 85, status: "Active" },
      { name: "API Security", level: 82, status: "Ready" }
    ]
  },
  {
    title: "Security Engineering",
    skills: [
      { name: "Python", level: 88, status: "Active" },
      { name: "React", level: 80, status: "Ready" },
      { name: "Node.js", level: 78, status: "Ready" },
      { name: "Firebase", level: 72, status: "Ready" }
    ]
  },
  {
    title: "Digital Forensics",
    skills: [
      { name: "Log Analysis", level: 75, status: "Ready" },
      { name: "Evidence Collection", level: 70, status: "Compiling" },
      { name: "Incident Investigation", level: 80, status: "Active" }
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
    image: "/images/projects/dnm-hunter.png"
  },
  {
    id: "battleos",
    name: "Operation BattleOS",
    tagline: "Create esports tournament SaaS platform.",
    problem: "Organizing regional eSports tournaments is plagued by manual registration, player profile manipulation, unverified score reports, and slow matchmaking coordination.",
    solution: "Designed and implemented BattleOS, a high-performance tournament management SaaS that automates team matching, verifies user gaming handles in real-time, and generates secure bracket states.",
    technologies: ["React", "Node.js", "Firebase", "Express", "Tailwind CSS"],
    features: [
      "Automated double-elimination and round-robin bracket generation",
      "Real-time game telemetry matching and anti-cheat confirmation indicators",
      "Secure payment checkout integration for tournament registration fees",
      "Sub-second live updates of brackets using WebSockets/Firestore listeners"
    ],
    impact: "Currently powers over 50 regional tournaments, orchestrating matches for 10,000+ active players with zero downtime and a 90% reduction in admin overhead.",
    githubUrl: "https://github.com/nisargdedakiya/battleos",
    status: "Beta",
    role: "Lead Full-Stack Developer",
    image: "/images/projects/battleos.png"
  },
  {
    id: "forensicdump-analyzer",
    name: "Operation ForensicDump Analyzer",
    tagline: "Automated Incident Forensics Parsing Utility.",
    problem: "When a host is compromised, security teams face massive system dumps. Correlating system logs, registry activity, and memory traces manually delays response times by hours.",
    solution: "Building a lightweight desktop & CLI tool that accepts standard forensic file exports, parses event files, generates unified CSV timelines, and highlights known Indicators of Compromise (IoC).",
    technologies: ["Python", "Rust", "SQLite", "Electron"],
    features: [
      "Instant indexing and parsing of Windows Event Logs (EVTX)",
      "Volatile memory image parsing via volatility core hooks",
      "Timeline visualization mapping processes against network traffic spikes"
    ],
    impact: "Under active development to streamline incident response parsing from hours to less than three minutes.",
    githubUrl: "https://github.com/nisargdedakiya/forensidump-analyzer",
    status: "Development",
    role: "Security Tool Builder",
    image: "/images/projects/forensicdump.png"
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
