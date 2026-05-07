import { formatCurrency } from '@/lib/currency'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { TenderFunnelChart } from '@/components/charts/TenderFunnelChart'
import { SAMPLE_TENDERS } from '@/lib/sample-data'

const STAGES = [
  { key: 'PROSPECT', label: 'Prospect', color: '#9BA3AB' },
  { key: 'QUALIFIED', label: 'Qualified', color: '#C9A227' },
  { key: 'TENDER_PREP', label: 'Tender Prep', color: '#F59E0B' },
  { key: 'SUBMITTED', label: 'Submitted', color: '#2563EB' },
  { key: 'SHORTLISTED', label: 'Shortlisted', color: '#16A34A' },
] as const

function tVariant(s: string): 'neutral' | 'warning' | 'progress' | 'cleared' | 'blocked' {
  const m: Record<string, 'neutral' | 'warning' | 'progress' | 'cleared' | 'blocked'> = {
    PROSPECT: 'neutral', QUALIFIED: 'warning', TENDER_PREP: 'warning',
    SUBMITTED: 'progress', SHORTLISTED: 'progress', WON: 'cleared', LOST: 'blocked',
  }
  return m[s] ?? 'neutral'
}

const won = SAMPLE_TENDERS.filter((t) => t.status === 'WON')
const lost = SAMPLE_TENDERS.filter((t) => t.status === 'LOST')
const winRate = won.length + lost.length > 0 ? Math.round((won.length / (won.length + lost.length)) * 100) : 0
const pipelineValue = SAMPLE_TENDERS.filter((t) => !['WON','LOST'].includes(t.status)).reduce((a, t) => a + t.estimatedValueJMD, 0)
const activeTenders = SAMPLE_TENDERS.filter((t) => !['WON','LOST'].includes(t.status)).length

const funnelData = STAGES.map((s) => ({
  stage: s.label,
  count: SAMPLE_TENDERS.filter((t) => t.status === s.key).length,
  color: s.color,
}))

export default function TenderPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-obsidian tracking-tight uppercase">Tender Pipeline</h1>
        <div className="h-0.5 w-10 bg-gold mt-2 mb-1" />
        <p className="text-sm text-concrete">Business development — prospect to awarded contract</p>
      </div>

      {/* Stats + Funnel chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Pipeline Value', value: formatCurrency(pipelineValue, 'JMD', { compact: true }), color: 'text-obsidian' },
            { label: 'Active Tenders', value: activeTenders.toString(), color: 'text-progress' },
            { label: 'Win Rate', value: `${winRate}%`, color: 'text-cleared' },
            { label: 'Won This Year', value: won.length.toString(), color: 'text-cleared' },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-[#D4D1CB] bg-white px-4 py-3">
              <p className="text-[10px] text-concrete uppercase tracking-wider">{s.label}</p>
              <p className={`text-xl font-mono font-semibold tabular-nums mt-0.5 ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-0.5 h-4 bg-gold rounded-full shrink-0" />
            <h2 className="text-xs font-semibold text-concrete uppercase tracking-widest">Stage Count</h2>
          </div>
          <div className="rounded-lg border border-[#D4D1CB] bg-white p-3">
            <TenderFunnelChart data={funnelData} />
          </div>
        </div>
      </div>

      {/* Kanban board */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-0.5 h-4 bg-gold rounded-full shrink-0" />
          <h2 className="text-xs font-semibold text-concrete uppercase tracking-widest">Kanban Board</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-3">
          {STAGES.map((stage) => {
            const cards = SAMPLE_TENDERS.filter((t) => t.status === stage.key)
            const stageValue = cards.reduce((a, t) => a + t.estimatedValueJMD, 0)
            return (
              <div key={stage.key} className="flex-shrink-0 w-56">
                <div className="flex items-center justify-between mb-2 px-1">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: stage.color }} />
                    <span className="text-[11px] font-semibold text-obsidian uppercase tracking-wide">{stage.label}</span>
                  </div>
                  <span className="text-[10px] font-mono text-concrete">{cards.length}</span>
                </div>
                {stageValue > 0 && (
                  <p className="text-[10px] text-concrete font-mono px-1 mb-2">{formatCurrency(stageValue, 'JMD', { compact: true })}</p>
                )}
                <div className="space-y-2">
                  {cards.map((t) => (
                    <div key={t.id} className="rounded-lg border border-[#D4D1CB] bg-white p-3" style={{ borderTopWidth: '2px', borderTopColor: stage.color }}>
                      <p className="text-xs font-medium text-obsidian leading-snug">{t.projectName}</p>
                      <p className="text-[10px] text-concrete mt-0.5 truncate">{t.client}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[11px] font-mono font-semibold text-obsidian tabular-nums">
                          {formatCurrency(t.estimatedValueJMD, 'JMD', { compact: true })}
                        </span>
                        <span className="text-[10px] font-mono text-concrete">{t.winProbabilityPct}% win</span>
                      </div>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-charcoal text-limestone text-[9px] font-medium">
                          {t.pmInitials}
                        </span>
                      </div>
                    </div>
                  ))}
                  {cards.length === 0 && (
                    <div className="rounded-lg border border-dashed border-[#D4D1CB] p-4 text-center">
                      <p className="text-[10px] text-concrete">Empty</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
          {/* Won / Lost column */}
          <div className="flex-shrink-0 w-56">
            <div className="flex items-center gap-1.5 mb-2 px-1">
              <div className="h-2 w-2 rounded-full bg-cleared" />
              <span className="text-[11px] font-semibold text-obsidian uppercase tracking-wide">Won / Lost</span>
            </div>
            <div className="space-y-2">
              {SAMPLE_TENDERS.filter((t) => ['WON','LOST'].includes(t.status)).map((t) => (
                <div key={t.id} className={`rounded-lg border bg-white p-3 ${t.status === 'WON' ? 'border-cleared/40' : 'border-[#D4D1CB]'}`}>
                  <p className={`text-xs font-medium leading-snug ${t.status === 'WON' ? 'text-cleared' : 'text-concrete'}`}>{t.projectName}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-[11px] font-mono tabular-nums text-obsidian">{formatCurrency(t.estimatedValueJMD, 'JMD', { compact: true })}</span>
                    <StatusBadge variant={t.status === 'WON' ? 'cleared' : 'blocked'} label={t.status} dot={false} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
