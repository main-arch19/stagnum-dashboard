import { RatesExplorer } from '@/components/rates/RatesExplorer'
import { SAMPLE_RATES, SAMPLE_RATE_CATEGORIES } from '@/lib/sample-data'

export default function RatesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-obsidian tracking-tight uppercase">Rates Library</h1>
        <div className="h-0.5 w-10 bg-gold mt-2 mb-1" />
        <p className="text-sm text-concrete">Master BOQ rates database — all categories, versions, and staleness indicators</p>
      </div>

      {/* Summary pills */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-[#D4D1CB] bg-white px-4 py-2">
          <span className="text-lg font-mono font-semibold text-obsidian tabular-nums">{SAMPLE_RATES.length}</span>
          <span className="text-xs text-concrete">Total Rates</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-[#D4D1CB] bg-white px-4 py-2">
          <span className="text-lg font-mono font-semibold text-warning tabular-nums">
            {SAMPLE_RATES.filter((r) => r.staleDays >= 90 && r.staleDays < 180).length}
          </span>
          <span className="text-xs text-concrete">Stale (&gt;90d)</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-[#D4D1CB] bg-white px-4 py-2">
          <span className="text-lg font-mono font-semibold text-blocked tabular-nums">
            {SAMPLE_RATES.filter((r) => r.staleDays >= 180).length}
          </span>
          <span className="text-xs text-concrete">Critical (&gt;180d)</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-[#D4D1CB] bg-white px-4 py-2">
          <span className="text-lg font-mono font-semibold text-obsidian tabular-nums">{SAMPLE_RATE_CATEGORIES.length}</span>
          <span className="text-xs text-concrete">Categories</span>
        </div>
      </div>

      {/* Two-panel explorer */}
      <div className="rounded-lg border border-[#D4D1CB] overflow-hidden bg-white" style={{ minHeight: 540 }}>
        <RatesExplorer categories={SAMPLE_RATE_CATEGORIES} rates={SAMPLE_RATES} />
      </div>
    </div>
  )
}
