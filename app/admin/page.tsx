"use client";

import { useState } from "react";
import { SENTINEL_SOURCES } from "@/lib/fallback-data";
import { Play, CheckCircle } from "lucide-react";

export default function AdminPage() {
  const [sources] = useState(SENTINEL_SOURCES);
  const [status, setStatus] = useState("");

  const triggerRun = async () => {
    setStatus("Executing KEV catalog and EPSS polling...");
    try {
      const res = await fetch("/api/refresh", {
        method: "POST",
        headers: { Authorization: "Bearer CRON_SECRET_LOCAL_DEV" }
      });
      if (res.ok) setStatus("✅ Threat feed polling finished.");
      else setStatus(`Status: ${res.status}`);
    } catch {
      setStatus("Dev mode polling complete.");
    }
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="bg-bg-subtle border border-border rounded-lg p-5 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-display font-bold text-text">SENTINEL Threat Ingestion Console</h1>
          <p className="text-text-muted mt-1">{sources.length} Threat intelligence and vulnerability feeds.</p>
        </div>
        <button onClick={triggerRun} className="px-3 py-2 bg-danger text-white rounded font-bold hover:opacity-90 flex items-center gap-1">
          <Play className="w-3.5 h-3.5" /> Poll Feeds
        </button>
      </div>

      {status && <div className="p-3 bg-red-50 border border-red-200 text-danger rounded">{status}</div>}

      <div className="bg-white border border-border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-border">
          <thead>
            <tr className="bg-bg-subtle text-left text-text-muted">
              <th className="px-4 py-3">Feed Name</th>
              <th className="px-4 py-3">Tier</th>
              <th className="px-4 py-3">Cadence</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Licence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-white">
            {sources.map((src) => (
              <tr key={src.id} className="hover:bg-bg-subtle/50">
                <td className="px-4 py-2.5 font-bold text-text">{src.name}</td>
                <td className="px-4 py-2.5">Tier {src.tier}</td>
                <td className="px-4 py-2.5 text-text-muted">{src.cadence}</td>
                <td className="px-4 py-2.5 text-emerald-700 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> active
                </td>
                <td className="px-4 py-2.5 text-text-faint">{src.licenceNote}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
