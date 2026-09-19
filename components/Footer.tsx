export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-subtle mt-16 py-8 text-xs text-text-muted font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p>
            <strong>SENTINEL</strong> — What is being exploited right now — and what changed today.
          </p>
          <div className="flex items-center space-x-3 text-[11px]">
            <span>Light Theme Invariant</span>
            <span>•</span>
            <span>CVSS != EPSS != KEV</span>
            <span>•</span>
            <span>Zero Weaponised Exploits</span>
          </div>
        </div>
        <p className="text-text-faint text-[11px] leading-relaxed">
          <strong>Mandatory Non-Advice & Metadata Policy:</strong> Severity (CVSS), exploitation probability (EPSS), and confirmed exploitation (KEV) are three different operational questions. This product does not combine them. Ransomware figures measure public publication behavior on extortion sites, not total attack volume. No exploit code or weaponised details are published.
        </p>
      </div>
    </footer>
  );
}
