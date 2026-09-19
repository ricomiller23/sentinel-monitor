import { Vulnerability, RansomwareClaim } from "./definitions";

export const GLOBAL_SENTINEL_METRICS = {
  kevCatalogTotal: 1484,
  addedIn2025: 245,
  yoyKevGrowthPct: 20,
  ransomwareAugust2026Claims: 997,
  ransomwareAugustBusinessClaims: 861,
  ransomwareAugustHealthcareClaims: 69,
  annualDisclosedVictimsTotal: 7551,
  manufacturingSectorSharePct: 29,
  asOf: "2026-09-19T14:00:00Z",
};

export const FALLBACK_VULNERABILITIES: Vulnerability[] = [
  {
    id: "CVE-2026-87886",
    description: "Critical authentication bypass and deserialization vulnerability in enterprise management firmware allowing remote code execution under elevated system privileges.",
    cwe: ["CWE-287", "CWE-502"],
    vendor: "Palo Alto Networks",
    product: "PAN-OS Enterprise Gateway",
    publishedAt: "2026-09-14T08:00:00Z",
    lastModifiedAt: "2026-09-16T18:00:00Z",
    dueDate: "2026-10-07",
    requiredAction: "Apply vendor updates per BOD 26-04 or isolate management interface from untrusted networks immediately.",
    isSeed: true,
    scores: [
      {
        id: "score-87886-nvd",
        cve: "CVE-2026-87886",
        metric: "cvss3.1",
        issuer: "NVD (NIST)",
        value: 9.8,
        vector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H",
        issuedAt: "2026-09-15T12:00:00Z"
      },
      {
        id: "score-87886-vendor",
        cve: "CVE-2026-87886",
        metric: "cvss4.0",
        issuer: "Vendor Advisory",
        value: 9.3,
        vector: "CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N",
        issuedAt: "2026-09-14T10:00:00Z"
      },
      {
        id: "score-87886-epss",
        cve: "CVE-2026-87886",
        metric: "epss",
        issuer: "FIRST EPSS Model v3",
        value: 0.942,
        percentile: 0.998,
        issuedAt: "2026-09-18T00:00:00Z"
      }
    ],
    statuses: [
      {
        id: "stat-87886-kev",
        cve: "CVE-2026-87886",
        status: "kev_listed",
        evidenceUrl: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
        sourceId: "cisa-kev",
        authorityName: "CISA KEV Catalog",
        observedAt: "2026-09-16T15:00:00Z",
        notes: "Added to CISA KEV catalog on 2026-09-16 with BOD 26-04 directive."
      },
      {
        id: "stat-87886-ransomware",
        cve: "CVE-2026-87886",
        status: "ransomware_linked",
        evidenceUrl: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
        sourceId: "cisa-kev",
        authorityName: "CISA Advisory Bulletin",
        observedAt: "2026-09-16T15:00:00Z",
        notes: "Known ransomware campaign usage confirmed by US Federal authorities."
      }
    ]
  },
  {
    id: "CVE-2026-41220",
    description: "Out-of-bounds memory write in Microsoft Windows Kernel GDI subsystem leading to local privilege escalation to SYSTEM.",
    cwe: ["CWE-787"],
    vendor: "Microsoft",
    product: "Windows 11 & Windows Server 2025",
    publishedAt: "2026-08-12T17:00:00Z",
    lastModifiedAt: "2026-08-20T12:00:00Z",
    dueDate: "2026-09-02",
    requiredAction: "Apply Microsoft August Patch Tuesday security updates.",
    isSeed: true,
    scores: [
      {
        id: "score-41220-nvd",
        cve: "CVE-2026-41220",
        metric: "cvss3.1",
        issuer: "NVD (NIST)",
        value: 7.8,
        vector: "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H",
        issuedAt: "2026-08-13T10:00:00Z"
      },
      {
        id: "score-41220-epss",
        cve: "CVE-2026-41220",
        metric: "epss",
        issuer: "FIRST EPSS Model v3",
        value: 0.124,
        percentile: 0.762,
        issuedAt: "2026-09-18T00:00:00Z"
      }
    ],
    statuses: [
      {
        id: "stat-41220-kev",
        cve: "CVE-2026-41220",
        status: "kev_listed",
        evidenceUrl: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
        sourceId: "cisa-kev",
        authorityName: "CISA KEV Catalog",
        observedAt: "2026-08-15T00:00:00Z",
        notes: "Exploitation confirmed in targeted intrusion sets."
      }
    ]
  }
];

export const FALLBACK_RANSOMWARE_CLAIMS: RansomwareClaim[] = [
  {
    id: "clm-2026-08-01",
    group: "LockBit 4.0",
    victimName: "Advanced Automotive Machining Corp",
    sector: "Manufacturing",
    country: "United States",
    claimedAt: "2026-08-29T14:30:00Z",
    sourceUrl: "https://api.ransomware.live/",
    isSelfClaim: true
  },
  {
    id: "clm-2026-08-02",
    group: "BlackBasta",
    victimName: "Midwest Regional Health Network",
    sector: "Healthcare",
    country: "United States",
    claimedAt: "2026-08-27T09:15:00Z",
    sourceUrl: "https://api.ransomware.live/",
    isSelfClaim: true
  },
  {
    id: "clm-2026-08-03",
    group: "Play Ransomware",
    victimName: "Bavaria Precision Hydraulics GmbH",
    sector: "Manufacturing",
    country: "Germany",
    claimedAt: "2026-08-25T16:00:00Z",
    sourceUrl: "https://api.ransomware.live/",
    isSelfClaim: true
  }
];

export const SENTINEL_SOURCES = [
  { id: "cisa-kev", name: "CISA Known Exploited Vulnerabilities (KEV)", tier: "A", kind: "api", url: "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json", cadence: "daily", enabled: true, licenceNote: "US Government Public Domain" },
  { id: "cisa-advisories", name: "CISA Alerts & Advisories", tier: "A", kind: "rss", url: "https://www.cisa.gov/news-events/cybersecurity-advisories", cadence: "daily", enabled: true, licenceNote: "US Government Public Domain" },
  { id: "nvd", name: "NVD (CVE API 2.0)", tier: "B", kind: "api", url: "https://services.nvd.nist.gov/rest/json/cves/2.0", cadence: "realtime", enabled: true, licenceNote: "NIST Public Data" },
  { id: "epss", name: "FIRST EPSS Probability Feed", tier: "B", kind: "api", url: "https://api.first.org/data/v1/epss", cadence: "daily", enabled: true, licenceNote: "FIRST Data License" },
  { id: "cert-eu", name: "CERT-EU Security Advisories", tier: "A", kind: "rss", url: "https://cert.europa.eu/publications/security-advisories", cadence: "daily", enabled: true, licenceNote: "EU Public Domain" },
  { id: "ncsc-uk", name: "NCSC-UK Threat Advisories", tier: "A", kind: "rss", url: "https://www.ncsc.gov.uk/section/keep-up-to-date/all-reports", cadence: "daily", enabled: true, licenceNote: "UK Open Government License" },
  { id: "jpcert", name: "JPCERT/CC Early Warning", tier: "A", kind: "rss", url: "https://www.jpcert.or.jp/english/", cadence: "weekly", enabled: true, licenceNote: "JPCERT Public Bulletin" },
  { id: "msrc", name: "Microsoft Security Response Center (MSRC)", tier: "B", kind: "api", url: "https://api.msrc.microsoft.com/cvrf/v3.0/updates", cadence: "monthly", enabled: true, licenceNote: "Microsoft Terms of Use" },
  { id: "cisco-talos", name: "Cisco Talos Intelligence", tier: "B", kind: "rss", url: "https://blog.talosintelligence.com/", cadence: "daily", enabled: true, licenceNote: "Cisco Talos Open Research" },
  { id: "shadowserver", name: "Shadowserver Public Reports", tier: "B", kind: "html", url: "https://www.shadowserver.org/", cadence: "daily", enabled: true, licenceNote: "Shadowserver Foundation" },
  { id: "ransomware-live", name: "Ransomware.live Aggregator (Tier C Claims)", tier: "C", kind: "api", url: "https://api.ransomware.live/", cadence: "realtime", enabled: true, licenceNote: "Aggregator Citation" },
  { id: "github-advisories", name: "GitHub Advisory Database", tier: "B", kind: "api", url: "https://api.github.com/advisories", cadence: "realtime", enabled: true, licenceNote: "CC-BY 4.0 License" },
  { id: "exploitdb-meta", name: "Exploit-DB (Metadata Only)", tier: "C", kind: "csv", url: "https://gitlab.com/exploit-database/exploitdb", cadence: "daily", enabled: true, licenceNote: "Metadata Only Allowed" },
  { id: "acsc", name: "Australian Cyber Security Centre (ACSC)", tier: "A", kind: "rss", url: "https://www.cyber.gov.au/about-us/view-all-content/alerts-and-advisories", cadence: "weekly", enabled: true, licenceNote: "Commonwealth of Australia" },
  { id: "cve-org", name: "CVE Program (cve.org)", tier: "A", kind: "api", url: "https://cveawg.mitre.org/api/", cadence: "realtime", enabled: true, licenceNote: "MITRE CVE License" }
];
