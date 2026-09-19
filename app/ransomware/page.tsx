import { FALLBACK_RANSOMWARE_CLAIMS } from "@/lib/fallback-data";

export default function RansomwarePage() {
  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="bg-bg-subtle border border-border rounded-lg p-5">
        <h1 className="text-xl font-display font-bold text-text">Extortion & Ransomware Leak-Site Claims</h1>
        <p className="text-text-muted mt-1">
          Claims listed directly by extortion groups. These figures measure public leak behavior and disclosure tempo, not confirmed compromised entities.
        </p>
      </div>

      <div className="bg-white border border-border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-border">
          <thead>
            <tr className="bg-bg-subtle text-left text-text-muted">
              <th className="px-4 py-3">Claimed Date</th>
              <th className="px-4 py-3">Criminal Group</th>
              <th className="px-4 py-3">Claimed Victim Entity</th>
              <th className="px-4 py-3">Sector</th>
              <th className="px-4 py-3">Country</th>
              <th className="px-4 py-3">Verification Qualifier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-white">
            {FALLBACK_RANSOMWARE_CLAIMS.map((c) => (
              <tr key={c.id} className="hover:bg-bg-subtle/50">
                <td className="px-4 py-2.5 text-text-muted">{c.claimedAt.slice(0, 10)}</td>
                <td className="px-4 py-2.5 font-bold text-danger">{c.group}</td>
                <td className="px-4 py-2.5 text-text">{c.victimName}</td>
                <td className="px-4 py-2.5 text-text-muted">{c.sector}</td>
                <td className="px-4 py-2.5 text-text-muted">{c.country}</td>
                <td className="px-4 py-2.5">
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-100 text-amber-900 font-bold">
                    CLAIMED BY GROUP
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
