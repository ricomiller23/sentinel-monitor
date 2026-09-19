import { describe, it, expect } from "vitest";
import { assertNoBlendedScore, validateScoreIssuer, ScoringMismatchError } from "../lib/scoring";
import { FALLBACK_VULNERABILITIES, FALLBACK_RANSOMWARE_CLAIMS } from "../lib/fallback-data";

describe("SENTINEL — Scoring & Invariant Tests", () => {
  it("strictly blocks combining CVSS and EPSS into a blended score", () => {
    const vuln = FALLBACK_VULNERABILITIES[0];
    expect(() => assertNoBlendedScore(vuln.scores)).toThrow(ScoringMismatchError);
  });

  it("strictly enforces named issuer on every vulnerability score", () => {
    expect(() => validateScoreIssuer({ metric: "cvss3.1", issuer: "" })).toThrow(ScoringMismatchError);
    expect(() => validateScoreIssuer({ metric: "cvss3.1", issuer: "NVD (NIST)" })).not.toThrow();
  });

  it("verifies ransomware victim claims are explicitly tagged isSelfClaim: true", () => {
    expect(FALLBACK_RANSOMWARE_CLAIMS.every(c => c.isSelfClaim === true)).toBe(true);
  });
});
