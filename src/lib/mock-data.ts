export type TicketPriority = "P1" | "P2" | "P3" | "P4";
export type TicketStatus = "New" | "In Progress" | "Waiting" | "Resolved" | "Escalated";

export interface Ticket {
  id: string;
  title: string;
  requester: string;
  device: string;
  platform: "Windows 11" | "Windows 10" | "macOS 14" | "macOS 13" | "iOS" | "Android" | "Network";
  category: "Access" | "Hardware" | "Software" | "Security" | "Networking";
  tier: 1 | 2;
  status: TicketStatus;
  priority: TicketPriority;
  integration: "ServiceNow" | "Jira" | "Freshservice";
  createdAt: string;
  slaBreached: boolean;
  updatedAt: string;
  description: string;
}

export interface Vulnerability {
  id: string;
  name: string;
  cve: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  affectedAssets: number;
  exposure: "External" | "Internal";
  remediationEta: string;
  owner: string;
  progress: number;
}

export interface Endpoint {
  id: string;
  owner: string;
  type: "Workstation" | "Laptop" | "Mobile" | "Server" | "Network";
  platform: string;
  location: string;
  lastSeen: string;
  health: "Healthy" | "Warning" | "Offline";
  vulnerabilities: number;
  patchLevel: number;
  encryption: boolean;
}

export interface Workflow {
  id: string;
  name: string;
  type: "Onboarding" | "Offboarding" | "Access Review";
  steps: string[];
  owner: string;
  averageDurationHours: number;
  automationRate: number;
}

export interface IntegrationStatus {
  tool: "ServiceNow" | "Jira" | "Freshservice";
  status: "Operational" | "Degraded" | "Offline";
  syncLatencyMinutes: number;
  incidentsSyncedToday: number;
  automationEnabled: boolean;
}

export const tickets: Ticket[] = [
  {
    id: "#INC-10422",
    title: "VPN connection drops when switching networks",
    requester: "Lydia Becker",
    device: "Dell Latitude 7440",
    platform: "Windows 11",
    category: "Networking",
    tier: 1,
    status: "In Progress",
    priority: "P2",
    integration: "ServiceNow",
    createdAt: "2024-07-02T12:30:00Z",
    slaBreached: false,
    updatedAt: "2024-07-02T18:10:00Z",
    description:
      "Remote sales user reports frequent VPN drops when switching between hotel Wi-Fi and LTE hotspot. Impacting CRM sync.",
  },
  {
    id: "#TASK-5098",
    title: "New hire provisioning: Priya Natarajan",
    requester: "HR Automation",
    device: "Jamf Enrollment",
    platform: "macOS 14",
    category: "Access",
    tier: 1,
    status: "Waiting",
    priority: "P3",
    integration: "Freshservice",
    createdAt: "2024-07-02T09:15:00Z",
    slaBreached: false,
    updatedAt: "2024-07-02T16:41:00Z",
    description:
      "Automated onboarding flow waiting for confirmation on Azure AD group assignment. Laptop already imaged via DEP.",
  },
  {
    id: "#INC-10411",
    title: "Impossible travel alert for privileged account",
    requester: "SOC Automation",
    device: "Azure AD",
    platform: "Windows 11",
    category: "Security",
    tier: 2,
    status: "Escalated",
    priority: "P1",
    integration: "ServiceNow",
    createdAt: "2024-07-01T22:05:00Z",
    slaBreached: false,
    updatedAt: "2024-07-02T05:12:00Z",
    description:
      "Privileged admin account logged in from Germany and Singapore within 10 minutes. MFA challenged, awaiting SOC response.",
  },
  {
    id: "#REQ-7774",
    title: "Access needed to Jira Engineering Projects",
    requester: "Nadia James",
    device: "Okta Self-Service",
    platform: "Windows 11",
    category: "Access",
    tier: 1,
    status: "New",
    priority: "P3",
    integration: "Jira",
    createdAt: "2024-07-02T15:55:00Z",
    slaBreached: false,
    updatedAt: "2024-07-02T15:55:00Z",
    description:
      "Product manager requests contributor access to ENG-JIRA projects with ability to manage sprints and transition tickets.",
  },
  {
    id: "#INC-10408",
    title: "Printer queue stuck on 4th floor Ricoh device",
    requester: "Facilities",
    device: "Ricoh MFP 4200",
    platform: "Network",
    category: "Hardware",
    tier: 1,
    status: "Resolved",
    priority: "P4",
    integration: "Freshservice",
    createdAt: "2024-07-01T13:10:00Z",
    slaBreached: false,
    updatedAt: "2024-07-02T09:14:00Z",
    description:
      "Printer queue halted due to corrupt driver update. Rolled back to last known good configuration via Intune policy.",
  },
  {
    id: "#INC-10424",
    title: "Data loss warning on marketing MacBook",
    requester: "Defender for Endpoint",
    device: "MacBook Pro 16\"",
    platform: "macOS 14",
    category: "Security",
    tier: 2,
    status: "In Progress",
    priority: "P1",
    integration: "ServiceNow",
    createdAt: "2024-07-02T04:45:00Z",
    slaBreached: true,
    updatedAt: "2024-07-02T07:31:00Z",
    description:
      "Endpoint DLP triggered on attempted upload of customer PII to unsanctioned SaaS. Device isolated via Intune.",
  },
];

export const vulnerabilities: Vulnerability[] = [
  {
    id: "VULN-9981",
    name: "MOVEit Transfer SQL Injection",
    cve: "CVE-2024-35952",
    severity: "Critical",
    affectedAssets: 14,
    exposure: "External",
    remediationEta: "2024-07-05",
    owner: "Alex Johnson",
    progress: 62,
  },
  {
    id: "VULN-9974",
    name: "SecureBoot Bypass BootKit",
    cve: "CVE-2024-11765",
    severity: "High",
    affectedAssets: 86,
    exposure: "Internal",
    remediationEta: "2024-07-12",
    owner: "Mia Chen",
    progress: 48,
  },
  {
    id: "VULN-9929",
    name: "Edge Browser Sandbox Escape",
    cve: "CVE-2024-07220",
    severity: "Medium",
    affectedAssets: 312,
    exposure: "External",
    remediationEta: "2024-07-18",
    owner: "SOC Automation",
    progress: 31,
  },
  {
    id: "VULN-9882",
    name: "Cisco IOS XE Privilege Escalation",
    cve: "CVE-2024-21698",
    severity: "High",
    affectedAssets: 9,
    exposure: "External",
    remediationEta: "2024-07-09",
    owner: "Network Engineering",
    progress: 74,
  },
];

export const endpoints: Endpoint[] = [
  {
    id: "WS-8821",
    owner: "Quinn Howard",
    type: "Laptop",
    platform: "Windows 11",
    location: "Austin HQ",
    lastSeen: "4 minutes ago",
    health: "Healthy",
    vulnerabilities: 0,
    patchLevel: 100,
    encryption: true,
  },
  {
    id: "MB-1140",
    owner: "Priya Natarajan",
    type: "Laptop",
    platform: "macOS 14",
    location: "Remote - Toronto",
    lastSeen: "2 hours ago",
    health: "Warning",
    vulnerabilities: 2,
    patchLevel: 84,
    encryption: true,
  },
  {
    id: "SRV-218",
    owner: "Analytics Platform",
    type: "Server",
    platform: "Windows Server 2022",
    location: "Azure East US",
    lastSeen: "Online",
    health: "Healthy",
    vulnerabilities: 1,
    patchLevel: 94,
    encryption: true,
  },
  {
    id: "FW-28",
    owner: "Corporate Edge Firewall",
    type: "Network",
    platform: "Palo Alto OS 11.1",
    location: "Data Center - Dallas",
    lastSeen: "12 minutes ago",
    health: "Warning",
    vulnerabilities: 3,
    patchLevel: 71,
    encryption: false,
  },
  {
    id: "PH-010",
    owner: "Field Sales Shared iPhone",
    type: "Mobile",
    platform: "iOS 17",
    location: "Remote - Denver",
    lastSeen: "58 minutes ago",
    health: "Healthy",
    vulnerabilities: 0,
    patchLevel: 96,
    encryption: true,
  },
];

export const workflows: Workflow[] = [
  {
    id: "WF-104",
    name: "Field Sales Onboarding",
    type: "Onboarding",
    steps: [
      "Provision Intune laptop & mobile profile",
      "Add to Sales Azure AD groups",
      "Pre-load CRM licenses and templates",
      "Grant access to regional file shares",
    ],
    owner: "IT Service Delivery",
    averageDurationHours: 5.5,
    automationRate: 86,
  },
  {
    id: "WF-099",
    name: "Privileged Access Offboarding",
    type: "Offboarding",
    steps: [
      "Revoke hardware tokens and FIDO keys",
      "Disable privileged AD groups",
      "Collect device encryption keys",
      "Archive mailbox and Teams history",
    ],
    owner: "Identity & Access",
    averageDurationHours: 2.1,
    automationRate: 92,
  },
  {
    id: "WF-081",
    name: "Quarterly SaaS Access Review",
    type: "Access Review",
    steps: [
      "Pull license utilization report",
      "Route to application owners",
      "Automate revocation of unused licenses",
      "Reconcile with ServiceNow CMDB",
    ],
    owner: "Governance",
    averageDurationHours: 16,
    automationRate: 64,
  },
];

export const integrations: IntegrationStatus[] = [
  {
    tool: "ServiceNow",
    status: "Operational",
    syncLatencyMinutes: 4,
    incidentsSyncedToday: 128,
    automationEnabled: true,
  },
  {
    tool: "Jira",
    status: "Operational",
    syncLatencyMinutes: 7,
    incidentsSyncedToday: 54,
    automationEnabled: true,
  },
  {
    tool: "Freshservice",
    status: "Degraded",
    syncLatencyMinutes: 18,
    incidentsSyncedToday: 87,
    automationEnabled: false,
  },
];

export const knowledgeBase = [
  {
    id: "KB0001321",
    title: "Resetting Duo MFA for remote workers",
    category: "Access",
    avgHandleMinutes: 4,
    lastUpdated: "2024-06-27",
  },
  {
    id: "KB0001194",
    title: "Resolving Intune Bitlocker Recovery prompts",
    category: "Security",
    avgHandleMinutes: 6,
    lastUpdated: "2024-05-30",
  },
  {
    id: "KB0001420",
    title: "Troubleshooting Outlook search indexing on Windows 11",
    category: "Software",
    avgHandleMinutes: 9,
    lastUpdated: "2024-06-14",
  },
];

export const slaTargets = {
  responseMinutes: {
    P1: 15,
    P2: 30,
    P3: 120,
    P4: 240,
  },
  resolutionHours: {
    P1: 4,
    P2: 8,
    P3: 24,
    P4: 48,
  },
};

export const performanceTrend = [
  { label: "Mon", ticketsResolved: 34, vulnerabilitiesClosed: 8, automationRuns: 22 },
  { label: "Tue", ticketsResolved: 41, vulnerabilitiesClosed: 6, automationRuns: 18 },
  { label: "Wed", ticketsResolved: 29, vulnerabilitiesClosed: 11, automationRuns: 25 },
  { label: "Thu", ticketsResolved: 46, vulnerabilitiesClosed: 9, automationRuns: 31 },
  { label: "Fri", ticketsResolved: 38, vulnerabilitiesClosed: 7, automationRuns: 28 },
];
