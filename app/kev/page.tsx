import { FALLBACK_VULNERABILITIES } from "@/lib/fallback-data";
import Link from "next/link";

export default function KevCatalogPage() {
  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="bg-bg-subtle border border-border rounded-lg p-5">
        <h1 className="text-xl font-display font-bold text-text">CISA Known Exploited Vulnerabilities (KEV)</h1>
        <p className="text-text-muted mt-1">
          Federal remediation binding directives and confirmed in-the-wild exploitation.
        </p>
      </div>

      <div className="bg-white border border-border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-border">
          <thead>
            <tr className="bg-bg-subtle text-left text-text-muted">
              <th className="px-4 py-3">CVE ID</th>
              <th className="px-4 py-3">Vendor / Product</th>
              <th className="px-4 py-3">Required Action</th>
              <th className="px-4 py-3">Federal Due Date</th>
              <th className="px-4 py-3">Ransomware Use</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-white">
            {FALLBACK_VULNERABILITIES.map((v) => (
              <tr key={v.id} className="hover:bg-bg-subtle/50">
                <td className="px-4 py-3 font-bold text-brand">
                  <Link href={`/cve/${v.id}`}>{v.id}</Link>
                </td>
                <td className="px-4 py-3 text-text">{v.vendor} {v.product}</td>
                <td className="px-4 py-3 text-text-muted max-w-xs truncate">{v.requiredAction}</td>
                <td className="px-4 py-3 font-semibold text-danger">{v.dueDate}</td>
                <td className="px-4 py-3">
                  {v.statuses.some(s => s.status === "ransomware_linked") ? (
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-100 text-danger font-bold">
                      KNOWN
                    </span>
                  ) : (
                    <span className="text-text-faint">None Reported</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
