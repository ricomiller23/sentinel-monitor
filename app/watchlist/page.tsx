export default function WatchlistPage() {
  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="bg-bg-subtle border border-border rounded-lg p-5">
        <h1 className="text-xl font-display font-bold text-text">Local Product Watchlist</h1>
        <p className="text-text-muted mt-1">Stored strictly in local browser state. Zero remote profiling or credentials.</p>
      </div>
      <div className="bg-white border border-border rounded-lg p-8 text-center text-text-muted">
        No monitored products configured yet. Add vendor/product strings on CVE cards.
      </div>
    </div>
  );
}
