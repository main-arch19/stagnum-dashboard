import { SAMPLE_SUSTAINABLE } from '@/lib/sample-data'
import { Leaf, Sun, Droplets, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

function systemIcon(type: string) {
  if (type === 'SOLAR') return Sun
  if (type === 'RAINWATER') return Droplets
  return Zap
}

function systemColor(type: string): string {
  return type === 'SOLAR' ? '#C9A227' : type === 'RAINWATER' ? '#2563EB' : '#5C6670'
}

function systemLabel(type: string) {
  return type === 'ENERGY_AUDIT' ? 'Energy Audit' : type.charAt(0) + type.slice(1).toLowerCase()
}

function scoreColor(score: number) {
  if (score >= 80) return { bar: 'bg-cleared', text: 'text-cleared' }
  if (score >= 60) return { bar: 'bg-warning', text: 'text-warning' }
  return { bar: 'bg-blocked', text: 'text-blocked' }
}

const totalSolarKw = SAMPLE_SUSTAINABLE.filter((s) => s.systemType === 'SOLAR').reduce((a, s) => a + (s.capacityKw ?? 0), 0)
const totalPanels = SAMPLE_SUSTAINABLE.filter((s) => s.systemType === 'SOLAR').reduce((a, s) => a + (s.panelCount ?? 0), 0)
const avgScore = Math.round(SAMPLE_SUSTAINABLE.filter((s) => s.auditScore !== null).reduce((a, s) => a + (s.auditScore ?? 0), 0) / SAMPLE_SUSTAINABLE.filter((s) => s.auditScore !== null).length)

export default function SustainablePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-obsidian tracking-tight uppercase">Sustainable Systems</h1>
        <div className="h-0.5 w-10 bg-gold mt-2 mb-1" />
        <p className="text-sm text-concrete">Solar, rainwater, wind, and energy audit systems across all projects</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Solar Capacity', value: `${totalSolarKw} kW`, icon: Sun, color: 'text-gold' },
          { label: 'Total Solar Panels', value: totalPanels.toString(), icon: Sun, color: 'text-gold' },
          { label: 'Systems Monitored', value: SAMPLE_SUSTAINABLE.length.toString(), icon: Leaf, color: 'text-cleared' },
          { label: 'Avg Audit Score', value: `${avgScore}/100`, icon: Zap, color: avgScore >= 80 ? 'text-cleared' : avgScore >= 60 ? 'text-warning' : 'text-blocked' },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-[#D4D1CB] bg-white p-4 flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-limestone">
              <s.icon size={15} className={s.color} />
            </div>
            <div>
              <p className="text-[10px] text-concrete uppercase tracking-wider">{s.label}</p>
              <p className={`text-xl font-mono font-semibold tabular-nums ${s.color}`}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* System cards grid */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-0.5 h-4 bg-gold rounded-full shrink-0" />
          <h2 className="text-xs font-semibold text-concrete uppercase tracking-widest">Systems by Project</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SAMPLE_SUSTAINABLE.map((sys) => {
            const Icon = systemIcon(sys.systemType)
            const color = systemColor(sys.systemType)
            const sc = sys.auditScore !== null ? scoreColor(sys.auditScore) : null
            return (
              <div key={sys.id} className="rounded-lg border border-[#D4D1CB] bg-white p-4" style={{ borderTopWidth: '2px', borderTopColor: color }}>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <p className="text-[11px] font-mono text-gold">{sys.projectNumber}</p>
                    <p className="text-sm font-medium text-obsidian leading-snug mt-0.5">{sys.projectName}</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold border" style={{ color, borderColor: color + '66', backgroundColor: color + '11' }}>
                    <Icon size={10} />
                    <span>{systemLabel(sys.systemType)}</span>
                  </div>
                </div>

                {/* Specs */}
                {sys.capacityKw && (
                  <div className="flex gap-4 mb-3">
                    <div>
                      <p className="text-[10px] text-concrete uppercase tracking-wider">Capacity</p>
                      <p className="text-sm font-mono font-semibold text-obsidian">{sys.capacityKw} kW</p>
                    </div>
                    {sys.panelCount && (
                      <div>
                        <p className="text-[10px] text-concrete uppercase tracking-wider">Panels</p>
                        <p className="text-sm font-mono font-semibold text-obsidian">{sys.panelCount}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Audit score */}
                {sys.auditScore !== null && sc && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[10px] text-concrete uppercase tracking-wider">Audit Score</p>
                      <span className={`text-[11px] font-mono font-semibold ${sc.text}`}>{sys.auditScore}/100</span>
                    </div>
                    <div className="h-2 bg-limestone rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${sc.bar}`} style={{ width: `${sys.auditScore}%` }} />
                    </div>
                  </div>
                )}

                {/* Dates */}
                <div className="flex items-center justify-between text-[10px] text-concrete border-t border-[#D4D1CB] pt-2 mt-2">
                  <span>Installed: {sys.installedDate}</span>
                  {sys.lastAuditDate && <span>Audited: {sys.lastAuditDate}</span>}
                </div>

                {/* Notes */}
                <p className="text-[10px] text-steel mt-1.5 leading-relaxed">{sys.notes}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Environmental impact strip */}
      <div className="rounded-lg border border-cleared/30 bg-cleared/5 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Leaf size={14} className="text-cleared" />
          <p className="text-xs font-semibold text-obsidian">Estimated Environmental Impact</p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {[
            { label: 'kWh Generated (YTD)', value: '84,200 kWh' },
            { label: 'CO₂ Offset (YTD)', value: '42.1 tonnes' },
            { label: 'Rainwater Collected (YTD)', value: '18,400 L' },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-[10px] text-concrete uppercase tracking-wider">{item.label}</p>
              <p className="text-lg font-mono font-semibold text-cleared mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
