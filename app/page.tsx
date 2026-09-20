import { CyberThreatMap } from "@/components/CyberThreatMap";
import Link from "next/link";
import { GLOBAL_SENTINEL_METRICS, FALLBACK_VULNERABILITIES } from "@/lib/fallback-data";
import { AlertTriangle, ShieldCheck, ChevronRight, ExternalLink, Skull } from "lucide-react";

export default function SentinelBoardPage() {
  return (
    <div className="space-y-8 font-mono text-xs">
      {/* Metric Counters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-border rounded-lg shadow-sm">
          <span className="text-text-muted text-[11px] block">CISA KEV Total</span>
          <div className="text-2xl font-bold font-mono text-text num-tabular mt-1">
            {GLOBAL_SENTINEL_METRICS.kevCatalogTotal.toLocaleString()}
          </div>
          <span className="text-[10px] text-text-faint">+245 added in 2025 (+20% YoY)</span>
        </div>

        <div className="p-4 bg-white border border-border rounded-lg shadow-sm">
          <span className="text-text-muted text-[11px] block">Ransomware Claims (August)</span>
          <div className="text-2xl font-bold font-mono text-danger num-tabular mt-1">
            {GLOBAL_SENTINEL_METRICS.ransomwareAugust2026Claims.toLocaleString()}
          </div>
          <span className="text-[10px] text-text-faint">861 commercial • 69 healthcare</span>
        </div>

        <div className="p-4 bg-white border border-border rounded-lg shadow-sm">
          <span className="text-text-muted text-[11px] block">Annual Extortion Victims</span>
          <div className="text-2xl font-bold font-mono text-text num-tabular mt-1">
            {GLOBAL_SENTINEL_METRICS.annualDisclosedVictimsTotal.toLocaleString()}
          </div>
          <span className="text-[10px] text-text-faint">+24.9% YoY tracked volume</span>
        </div>

        <div className="p-4 bg-white border border-border rounded-lg shadow-sm">
          <span className="text-text-muted text-[11px] block">Top Targeted Sector</span>
          <div className="text-2xl font-bold font-mono text-amber-700 mt-1">
            Manufacturing
          </div>
          <span className="text-[10px] text-text-faint">29% of all disclosed victims</span>
        </div>
      </div>

      {/* Strict Invariant Warning */}
      <div className="border-l-4 border-danger bg-red-50/40 p-4 rounded-r-md text-red-950 leading-relaxed">
        <strong>Scoring Isolation Invariant:</strong> Severity (CVSS), probability of exploitation (EPSS), and confirmed active exploitation (CISA KEV) are three separate metrics. This monitor does not combine them into a composite score.
      </div>

      <CyberThreatMap />

      {/* What Changed Today */}
      <div className="space-y-4">
        <h2 className="text-lg font-display font-bold text-text flex items-center justify-between">
          <span>Active Exploitation Catalog Additions</span>
          <span className="text-xs font-mono text-text-muted font-normal">Sorted by federal remediation deadline</span>
        </h2>

        <div className="grid grid-cols-1 gap-5">
          {FALLBACK_VULNERABILITIES.map((vuln) => (
            <div key={vuln.id} className="bg-white border border-border rounded-lg p-6 hover:border-danger/40 transition-shadow shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      Seed
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-red-100 text-danger border border-red-200">
                      KEV Listed
                    </span>
                    {vuln.statuses.some(s => s.status === "ransomware_linked") && (
                      <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-purple-100 text-purple-800 border border-purple-200 flex items-center gap-1">
                        <Skull className="w-3.5 h-3.5" /> Ransomware Linked
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded text-xs font-mono bg-slate-100 text-slate-800">
                      Due: {vuln.dueDate}
                    </span>
                  </div>
                  <h3 className="text-lg font-display font-bold text-text hover:text-danger">
                    <Link href={`/cve/${vuln.id}`}>{vuln.id} — {vuln.vendor} {vuln.product}</Link>
                  </h3>
                </div>

                <Link
                  href={`/cve/${vuln.id}`}
                  className="p-2 rounded-md bg-bg-subtle hover:bg-danger hover:text-white text-text-muted transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>

              <p className="text-text-muted text-xs my-3 leading-relaxed">
                {vuln.description}
              </p>

              {/* Explicit Separated Scores (Zero Blending) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-border">
                {vuln.scores.map((sc) => (
                  <div key={sc.id} className="p-3 bg-bg-subtle rounded border border-border">
                    <span className="text-text-muted text-[10px] block">{sc.issuer} ({sc.metric.toUpperCase()})</span>
                    <strong className="text-text font-bold text-sm num-tabular block mt-0.5">
                      {sc.metric === "epss" ? `${(sc.value * 100).toFixed(1)}% prob.` : sc.value.toFixed(1)}
                    </strong>
                    {sc.percentile !== undefined && (
                      <span className="text-[10px] text-text-faint">({(sc.percentile * 100).toFixed(1)}th percentile)</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-3 text-[11px] text-text-faint flex justify-between items-center">
                <span>Action: {vuln.requiredAction}</span>
                <Link href={`/cve/${vuln.id}`} className="text-brand hover:underline">
                  Full transition history
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
