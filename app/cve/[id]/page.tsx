import Link from "next/link";
import { notFound } from "next/navigation";
import { FALLBACK_VULNERABILITIES } from "@/lib/fallback-data";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function CveDetailPage({ params }: { params: { id: string } }) {
  const vuln = FALLBACK_VULNERABILITIES.find((v) => v.id === params.id);
  if (!vuln) notFound();

  return (
    <div className="space-y-6 font-mono text-xs">
      <Link href="/" className="inline-flex items-center text-brand hover:underline">
        <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Threat Board
      </Link>

      <div className="bg-white border border-border rounded-lg p-6">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-2 py-0.5 rounded text-xs font-mono bg-amber-50 text-amber-800 border border-amber-200">
            Seed
          </span>
          <span className="px-2 py-0.5 rounded text-xs font-mono bg-red-100 text-danger font-bold">
            KEV Listed
          </span>
          <span className="px-2 py-0.5 rounded text-xs font-mono bg-slate-100 text-slate-800">
            Remediation Due: {vuln.dueDate}
          </span>
        </div>
        <h1 className="text-2xl font-display font-extrabold text-text">{vuln.id}</h1>
        <p className="text-sm text-text-muted mt-2 leading-relaxed">{vuln.description}</p>
      </div>

      <div className="bg-white border border-border rounded-lg p-6">
        <h2 className="text-base font-display font-bold text-text mb-3">
          Isolated Issuer Scores (Never Blended)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {vuln.scores.map((sc) => (
            <div key={sc.id} className="p-4 bg-bg-subtle rounded border border-border space-y-1">
              <span className="text-text-muted block text-[11px]">{sc.issuer}</span>
              <div className="text-xl font-bold font-mono text-text num-tabular">
                {sc.metric === "epss" ? `${(sc.value * 100).toFixed(1)}%` : sc.value.toFixed(1)}
              </div>
              <span className="text-[10px] text-text-faint block">{sc.vector || "Probability metric"}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-border rounded-lg p-6">
        <h2 className="text-base font-display font-bold text-text mb-3">
          Exploitation Status Transitions (Append-Only)
        </h2>
        <div className="space-y-3">
          {vuln.statuses.map((st) => (
            <div key={st.id} className="p-3 bg-bg-subtle rounded border border-border flex justify-between items-center">
              <div>
                <strong className="text-text block uppercase">{st.status.replace("_", " ")}</strong>
                <span className="text-text-muted text-[11px]">{st.notes}</span>
              </div>
              <a href={st.evidenceUrl} target="_blank" rel="noreferrer" className="text-brand hover:underline">
                evidence source
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
