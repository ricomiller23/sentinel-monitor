export class ScoringMismatchError extends Error {
  constructor(message: string) {
    super(`[SENTINEL SCORING VIOLATION] ${message}`);
    this.name = "ScoringMismatchError";
  }
}

export type ScoreMetric = "cvss3.1" | "cvss4.0" | "epss" | "ssvc" | "vendor_rating";

export interface VulnerabilityScore {
  id: string;
  cve: string;
  metric: ScoreMetric;
  issuer: string; // REQUIRED — there is no default issuer
  value: number;
  vector?: string;
  percentile?: number; // EPSS only (e.g. 0.94 => 94th percentile)
  issuedAt: string;
}

/**
 * STRICT NO BLENDED SCORE GUARD:
 * Severity (CVSS), Probability (EPSS), and Confirmed Exploitation (KEV)
 * measure fundamentally distinct security dimensions.
 * Any attempt to combine or multiply them into a single "risk score" throws!
 */
export function assertNoBlendedScore(scores: VulnerabilityScore[]): never {
  throw new ScoringMismatchError(
    "Severity (CVSS), exploitation probability (EPSS), and confirmed exploitation (KEV) are three different operational questions. Collapsing them into a single blended 'risk score' is strictly forbidden."
  );
}

export function validateScoreIssuer(score: Partial<VulnerabilityScore>): void {
  if (!score.issuer || score.issuer.trim() === "") {
    throw new ScoringMismatchError("A score cannot be constructed without an explicit named issuer.");
  }
  if (!score.metric) {
    throw new ScoringMismatchError("A score must specify its metric standard (e.g. cvss3.1, cvss4.0, epss).");
  }
}
