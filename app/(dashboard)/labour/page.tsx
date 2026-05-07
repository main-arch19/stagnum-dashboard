import { formatCurrency } from '@/lib/currency'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { LabourCalendar } from '@/components/labour/LabourCalendar'
import { SAMPLE_WORKERS } from '@/lib/sample-data'
import { Users } from 'lucide-react'

const totalCost = SAMPLE_WORKERS.reduce((a, w) => a + w.dailyRateJMD * w.daysScheduled, 0)
const avgDaily = SAMPLE_WORKERS.reduce((a, w) => a + w.dailyRateJMD, 0) / SAMPLE_WORKERS.length
const budgetJMD = 4_200_000
const budgetPct = Math.round((totalCost / budgetJMD) * 100)

const projectGroups = [
  { number: 'STG-2026-001', name: 'Pemberton Residence', spend: 0, budget: 1_800_000, color: '#C9A227' },
  { number: 'STG-2026-002', name: 'Half Moon Hotel', spend: 0, budget: 1_600_000, color: '#2563EB' },
  { number: 'STG-2026-003', name: 'Kingston Complex', spend: 0, budget: 800_000, color: '#16A34A' },
].map((pg) => {
  const workers = SAMPLE_WORKERS.filter((w) => w.projectNumber === pg.number)
  const spend = workers.reduce((a, w) => a + w.dailyRateJMD * w.daysScheduled, 0)
  return { ...pg, spend, pct: Math.round((spend / pg.budget) * 100) }
})

export default function LabourPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-obsidian tracking-tight uppercase">Labour</h1>
        <div className="h-0.5 w-10 bg-gold mt-2 mb-1" />
        <p className="text-sm text-concrete">Workforce scheduling, roster, and cost tracking — Week of May 4, 2026</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Workers This Week', value: SAMPLE_WORKERS.length.toString(), sub: `${SAMPLE_WORKERS.filter((w) => w.type === 'Direct').length} direct · ${SAMPLE_WORKERS.filter((w) => w.type === 'Subcontractor').length} sub`, color: 'text-progress', accent: 'kpi-accent-progress' },
          { label: 'Total Labour Cost', value: formatCurrency(totalCost, 'JMD', { compact: true }), sub: 'Week of May 4', color: 'text-obsidian', accent: 'kpi-accent-gold' },
          { label: 'Cost vs Budget', value: `${budgetPct}%`, sub: budgetPct > 100 ? 'Over budget' : 'Within budget', color: budgetPct > 100 ? 'text-blocked' : 'text-cleared', accent: budgetPct > 100 ? 'kpi-accent-blocked' : 'kpi-accent-cleared' },
        ].map((c) => (
          <div key={c.label} className={`rounded-lg border border-[#D4D1CB] bg-white p-5 flex items-start gap-3 ${c.accent}`} style={{ borderTopWidth: '2px' }}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-limestone">
              <Users size={17} className={c.color} />
            </div>
            <div>
              <p className="text-[11px] text-concrete uppercase tracking-wider font-medium">{c.label}</p>
              <p className={`text-2xl font-mono font-semibold tabular-nums leading-tight mt-0.5 ${c.color}`}>{c.value}</p>
              {c.sub && <p className="text-[11px] text-concrete mt-0.5">{c.sub}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Calendar */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-0.5 h-4 bg-gold rounded-full shrink-0" />
          <h2 className="text-xs font-semibold text-concrete uppercase tracking-widest">Weekly Schedule</h2>
        </div>
        <LabourCalendar workers={SAMPLE_WORKERS} />
      </div>

      {/* Worker roster + Cost vs Budget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roster table */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-0.5 h-4 bg-gold rounded-full shrink-0" />
            <h2 className="text-xs font-semibold text-concrete uppercase tracking-widest">Worker Roster</h2>
          </div>
          <div className="rounded-lg border border-[#D4D1CB] bg-white overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-limestone border-b border-[#D4D1CB]">
                <tr>
                  {['Name', 'Trade', 'Type', 'Project', 'Days', 'Daily Rate', 'Total'].map((h) => (
                    <th key={h} className="px-3 py-2 text-left text-[10px] font-semibold text-concrete uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D4D1CB]">
                {SAMPLE_WORKERS.map((w) => (
                  <tr key={w.id} className="hover:bg-limestone transition-colors">
                    <td className="px-3 py-2.5 text-obsidian font-medium">{w.name}</td>
                    <td className="px-3 py-2.5 text-steel">{w.trade}</td>
                    <td className="px-3 py-2.5">
                      <StatusBadge
                        variant={w.type === 'Direct' ? 'progress' : 'neutral'}
                        label={w.type}
                        dot={false}
                      />
                    </td>
                    <td className="px-3 py-2.5 font-mono text-[11px]" style={{ color: w.projectColor }}>
                      {w.projectNumber.replace('STG-2026-', 'P')}
                    </td>
                    <td className="px-3 py-2.5 font-mono tabular-nums text-center text-steel">{w.daysScheduled}</td>
                    <td className="px-3 py-2.5 font-mono tabular-nums text-right text-obsidian">{formatCurrency(w.dailyRateJMD, 'JMD')}</td>
                    <td className="px-3 py-2.5 font-mono tabular-nums text-right text-obsidian font-medium">{formatCurrency(w.dailyRateJMD * w.daysScheduled, 'JMD', { compact: true })}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t-2 border-[#D4D1CB] bg-limestone">
                <tr>
                  <td colSpan={6} className="px-3 py-2 text-right text-[10px] font-semibold text-concrete uppercase tracking-wider">Total</td>
                  <td className="px-3 py-2 text-right font-mono tabular-nums font-semibold text-obsidian">{formatCurrency(totalCost, 'JMD', { compact: true })}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Cost vs Budget */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-0.5 h-4 bg-gold rounded-full shrink-0" />
            <h2 className="text-xs font-semibold text-concrete uppercase tracking-widest">Cost vs Budget</h2>
          </div>
          <div className="rounded-lg border border-[#D4D1CB] bg-white p-4 space-y-4">
            {projectGroups.map((pg) => (
              <div key={pg.number}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: pg.color }} />
                    <span className="text-[11px] text-obsidian font-medium">{pg.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-concrete">{pg.pct}%</span>
                </div>
                {/* Spend bar */}
                <div className="h-2 bg-limestone rounded-full overflow-hidden mb-0.5">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${Math.min(pg.pct, 100)}%`, backgroundColor: pg.pct > 100 ? '#DC2626' : pg.color }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-concrete">
                  <span>{formatCurrency(pg.spend, 'JMD', { compact: true })} spent</span>
                  <span>{formatCurrency(pg.budget, 'JMD', { compact: true })} budget</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
