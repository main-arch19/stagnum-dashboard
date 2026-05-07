import { formatCurrency } from '@/lib/currency'
import { StatusBadge, projectStageVariant, projectStageLabel } from '@/components/shared/StatusBadge'
import { ProjectStageBar } from '@/components/charts/ProjectStageBar'
import { SAMPLE_PROJECTS } from '@/lib/sample-data'
import { Lock, Unlock, ChevronRight, CheckCircle2, Circle } from 'lucide-react'

const STAGE_ORDER = ['ENQUIRY','QUOTING','AWAITING_SIGNATURE','AWAITING_DEPOSIT','MOBILIZATION','PROCUREMENT','CONSTRUCTION','HANDOVER','CLOSEOUT','CLOSED']

function stagePct(stage: string) {
  const idx = STAGE_ORDER.indexOf(stage)
  if (idx < 0) return 0
  return Math.round((idx / (STAGE_ORDER.length - 1)) * 100)
}

const stageColors: Record<string, string> = {
  CONSTRUCTION: '#2563EB', HANDOVER: '#C9A227', PROCUREMENT: '#16A34A',
  AWAITING_DEPOSIT: '#F59E0B', QUOTING: '#9BA3AB', ON_HOLD: '#DC2626', ENQUIRY: '#9BA3AB',
}

const chartData = SAMPLE_PROJECTS
  .filter((p) => !['ON_HOLD', 'CLOSED'].includes(p.stage))
  .map((p) => ({
    stage: projectStageLabel(p.stage),
    valueJMD: p.contractValueJMD,
    color: stageColors[p.stage] ?? '#9BA3AB',
  }))

export default function ProjectsPage() {
  const total = SAMPLE_PROJECTS.length
  const active = SAMPLE_PROJECTS.filter((p) => !['ON_HOLD','CLOSED','CANCELLED'].includes(p.stage)).length
  const onHold = SAMPLE_PROJECTS.filter((p) => p.stage === 'ON_HOLD').length
  const closed = SAMPLE_PROJECTS.filter((p) => p.stage === 'CLOSED').length
  const totalValue = SAMPLE_PROJECTS.reduce((a, p) => a + p.contractValueJMD, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-obsidian tracking-tight uppercase">Projects</h1>
        <div className="h-0.5 w-10 bg-gold mt-2 mb-1" />
        <p className="text-sm text-concrete">Construction pipeline — all active and archived projects</p>
      </div>

      {/* Summary pills */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: 'Total Projects', value: total, color: 'text-obsidian' },
          { label: 'Active', value: active, color: 'text-progress' },
          { label: 'On Hold', value: onHold, color: 'text-blocked' },
          { label: 'Closed', value: closed, color: 'text-cleared' },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-2.5 rounded-lg border border-[#D4D1CB] bg-white px-4 py-2.5">
            <span className={`text-xl font-mono font-semibold tabular-nums ${s.color}`}>{s.value}</span>
            <span className="text-xs text-concrete">{s.label}</span>
          </div>
        ))}
        <div className="flex items-center gap-2.5 rounded-lg border border-[#D4D1CB] bg-white px-4 py-2.5">
          <span className="text-xl font-mono font-semibold tabular-nums text-cleared">
            {formatCurrency(totalValue, 'JMD', { compact: true })}
          </span>
          <span className="text-xs text-concrete">Total Value</span>
        </div>
      </div>

      {/* Table + Chart */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Project table */}
        <div className="xl:col-span-3 rounded-lg border border-[#D4D1CB] bg-white overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-limestone border-b border-[#D4D1CB]">
              <tr>
                {['Project #', 'Client', 'Stage', 'Contract Value', 'Dep.', 'Gates', 'PM', 'Progress', ''].map((h) => (
                  <th key={h} className="px-3 py-2 text-left text-[10px] font-semibold text-concrete uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D4D1CB]">
              {SAMPLE_PROJECTS.map((p) => {
                const pct = stagePct(p.stage)
                return (
                  <tr key={p.id} className="hover:bg-limestone transition-colors group">
                    <td className="px-3 py-2.5 font-mono text-[11px] text-gold font-semibold whitespace-nowrap">{p.number}</td>
                    <td className="px-3 py-2.5 text-obsidian max-w-[110px] truncate">{p.client}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <StatusBadge variant={projectStageVariant(p.stage)} label={projectStageLabel(p.stage)} />
                    </td>
                    <td className="px-3 py-2.5 font-mono tabular-nums text-obsidian text-right whitespace-nowrap">
                      {formatCurrency(p.contractValueJMD, 'JMD', { compact: true })}
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      {p.depositCleared
                        ? <CheckCircle2 size={13} className="text-cleared mx-auto" />
                        : <Circle size={13} className="text-concrete mx-auto" />}
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-0.5">
                        {Object.entries(p.gates).map(([k, v]) => (
                          <span key={k} className={v ? 'gate-unlocked' : 'gate-locked'}>
                            {v ? <Unlock size={9} /> : <Lock size={9} />}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-charcoal text-limestone text-[9px] font-medium">
                        {p.pmInitials}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 w-24">
                      <div className="flex items-center gap-1.5">
                        <div className="flex-1 h-1.5 bg-limestone rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: stageColors[p.stage] ?? '#9BA3AB' }} />
                        </div>
                        <span className="text-[10px] font-mono text-concrete w-6 text-right">{pct}%</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <ChevronRight size={13} className="text-concrete opacity-0 group-hover:opacity-100 transition-opacity" />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Stage bar chart */}
        <div className="xl:col-span-2">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-0.5 h-4 bg-gold rounded-full shrink-0" />
            <h2 className="text-xs font-semibold text-concrete uppercase tracking-widest">Contract Value by Stage</h2>
          </div>
          <div className="rounded-lg border border-[#D4D1CB] bg-white p-4">
            <ProjectStageBar data={chartData} />
            <div className="mt-3 border-t border-[#D4D1CB] pt-3 space-y-1.5">
              {chartData.map((d) => (
                <div key={d.stage} className="flex items-center justify-between text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                    <span className="text-steel">{d.stage}</span>
                  </div>
                  <span className="font-mono tabular-nums text-obsidian">{formatCurrency(d.valueJMD, 'JMD', { compact: true })}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
