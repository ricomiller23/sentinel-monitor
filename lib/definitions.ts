import { VulnerabilityScore } from "./scoring";

export interface ExploitationStatus {
  id: string;
  cve: string;
  status: "unknown" | "poc_public" | "exploited_in_wild" | "kev_listed" | "ransomware_linked" | "patched";
  evidenceUrl: string;
  sourceId: string;
  authorityName: string;
  observedAt: string;
  notes?: string;
}

export interface Vulnerability {
  id: string; // CVE-YYYY-NNNNN
  description: string;
  cwe: string[];
  vendor?: string;
  product?: string;
  publishedAt?: string;
  lastModifiedAt?: string;
  dueDate?: string;
  requiredAction?: string;
  scores: VulnerabilityScore[];
  statuses: ExploitationStatus[];
  isSeed: boolean;
}

export interface RansomwareClaim {
  id: string;
  group: string;
  victimName: string;
  sector?: string;
  country?: string;
  claimedAt: string;
  sourceUrl: string;
  isSelfClaim: boolean; // Always true
}

export interface Advisory {
  id: string;
  sourceId: string;
  title: string;
  url: string;
  publishedAt: string;
  severitySelfReported?: string;
  dueDate?: string;
  affectedProducts: string[];
}
