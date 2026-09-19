export default function MethodPage() {
  return (
    <div className="space-y-6 max-w-4xl font-mono text-xs leading-relaxed">
      <div className="bg-bg-subtle border border-border rounded-lg p-5">
        <h1 className="text-xl font-display font-bold text-text">SENTINEL Threat Scoring Methodology</h1>
        <p className="text-text-muted mt-1">
          Why CVSS, EPSS, and KEV must never be blended into a synthetic composite score.
        </p>
      </div>

      <div className="bg-white border border-border rounded-lg p-6 space-y-4">
        <h2 className="text-sm font-display font-bold text-text uppercase">1. Severity vs Probability vs Active Exploitation</h2>
        <p className="text-text-muted">
          CVSS measures theoretical severity assuming vulnerability exploitation. EPSS estimates empirical probability of exploitation attempts in the next 30 days based on machine learning over threat telemetry. CISA KEV records verified, confirmed exploitation in the wild. A CVSS 9.8 with 0.1% EPSS and zero KEV listing poses an entirely different operational priority than a CVSS 7.2 vulnerability actively leveraged in ransomware campaigns.
        </p>

        <h2 className="text-sm font-display font-bold text-text uppercase mt-4">2. Mandatory Issuer Attribution</h2>
        <p className="text-text-muted">
          Different research groups score vulnerabilities differently. Every score in SENTINEL strictly renders its issuing authority (e.g. NVD, Microsoft, Palo Alto Networks, or FIRST).
        </p>

        <h2 className="text-sm font-display font-bold text-text uppercase mt-4">3. Ransomware Disclosures as Publication Behavior</h2>
        <p className="text-text-muted">
          Victims posted on extortion leak sites reflect the publishing and negotiation strategies of criminal syndicates. Fluctuations in monthly volume often reflect backend site outages or batch leak dumps rather than shifts in net incident volume.
        </p>
      </div>
    </div>
  );
}
