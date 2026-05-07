import { StatusBadge } from '@/components/shared/StatusBadge'
import { SAMPLE_QC_CHECKLISTS, SAMPLE_PUNCH_LIST, SAMPLE_INSPECTIONS } from '@/lib/sample-data'
import { CheckCircle2, XCircle, Clock, MapPin, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

function ItemIcon({ status }: { status: string }) {
  if (status === 'PASSED') return <CheckCircle2 size={14} className="text-cleared shrink-0" />
  if (status === 'FAILED') return <XCircle size={14} className="text-blocked shrink-0" />
  return <Clock size={14} className="text-concrete shrink-0" />
}

function itemVariant(s: string): 'cleared' | 'blocked' | 'neutral' {
  return s === 'PASSED' ? 'cleared' : s === 'FAILED' ? 'blocked' : 'neutral'
}

function inspVariant(s: string): 'cleared' | 'progress' | 'warning' {
  const m: Record<string, 'cleared' | 'progress' | 'warning'> = { APPROVED: 'cleared', REVIEWED: 'progress', SUBMITTED: 'warning' }
  return m[s] ?? 'neutral' as 'cleared'
}

function ProgressRing({ pct }: { pct: number }) {
  const r = 18
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ
  const color = pct === 100 ? '#16A34A' : pct > 50 ? '#F59E0B' : '#DC2626'
  return (
    <svg width={44} height={44} className="shrink-0">
      <circle cx={22} cy={22} r={r} fill="none" stroke="#F2F0EB" strokeWidth={4} />
      <circle cx={22} cy={22} r={r} fill="none" stroke={color} strokeWidth={4}
        strokeDasharray={circ} strokeDashoffset={offset}
        transform="rotate(-90 22 22)" strokeLinecap="round" />
      <text x={22} y={26} textAnchor="middle" fontSize={9} fontFamily="monospace" fill="#141414">{pct}%</text>
    </svg>
  )
}

export default function QCPage() {
  const allItems = SAMPLE_QC_CHECKLISTS.flatMap((c) => c.items)
  const passed = allItems.filter((i) => i.status === 'PASSED').length
  const complete = SAMPLE_QC_CHECKLISTS.filter((c) => c.isComplete).length
  const punchOpen = SAMPLE_PUNCH_LIST.filter((i) => !i.resolved).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-obsidian tracking-tight uppercase">QA / QC & Handover</h1>
        <div className="h-0.5 w-10 bg-gold mt-2 mb-1" />
        <p className="text-sm text-concrete">Stage checklists, punch lists, and field inspections</p>
      </div>

      {/* Summary pills */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: 'Checklists Complete', value: `${complete}/${SAMPLE_QC_CHECKLISTS.length}`, color: complete === SAMPLE_QC_CHECKLISTS.length ? 'text-cleared' : 'text-warning' },
          { label: 'Items Passed', value: `${passed}/${allItems.length}`, color: 'text-cleared' },
          { label: 'Punch List Open', value: punchOpen.toString(), color: punchOpen > 0 ? 'text-blocked' : 'text-cleared' },
          { label: 'Inspections', value: SAMPLE_INSPECTIONS.length.toString(), color: 'text-progress' },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-2.5 rounded-lg border border-[#D4D1CB] bg-white px-4 py-2.5">
            <span className={`text-xl font-mono font-semibold tabular-nums ${s.color}`}>{s.value}</span>
            <span className="text-xs text-concrete">{s.label}</span>
          </div>
        ))}
      </div>

      {/* QC Checklists (native accordion) */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-0.5 h-4 bg-gold rounded-full shrink-0" />
          <h2 className="text-xs font-semibold text-concrete uppercase tracking-widest">QC Checklists</h2>
        </div>
        <div className="space-y-3">
          {SAMPLE_QC_CHECKLISTS.map((cl) => {
            const clPassed = cl.items.filter((i) => i.status === 'PASSED').length
            const pct = Math.round((clPassed / cl.items.length) * 100)
            return (
              <details key={cl.id} className="rounded-lg border border-[#D4D1CB] bg-white group" open={!cl.isComplete}>
                <summary className="flex items-center gap-3 px-4 py-3 cursor-pointer select-none list-none">
                  <ProgressRing pct={pct} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-obsidian font-mono">{cl.projectNumber}</p>
                    <p className="text-sm font-medium text-obsidian">{cl.title}</p>
                    <p className="text-[10px] text-concrete mt-0.5">{clPassed}/{cl.items.length} items complete</p>
                  </div>
                  <StatusBadge variant={cl.isComplete ? 'cleared' : 'warning'} label={cl.isComplete ? 'Complete' : 'In Progress'} />
                </summary>
                <div className="border-t border-[#D4D1CB]">
                  <table className="w-full text-xs">
                    <tbody className="divide-y divide-[#D4D1CB]">
                      {cl.items.map((item) => (
                        <tr key={item.id} className="hover:bg-limestone transition-colors">
                          <td className="px-4 py-2.5 w-6"><ItemIcon status={item.status} /></td>
                          <td className="px-3 py-2.5 text-obsidian">{item.description}</td>
                          <td className="px-3 py-2.5">
                            <StatusBadge variant={itemVariant(item.status)} label={item.status} dot />
                          </td>
                          <td className="px-3 py-2.5 text-concrete text-[10px]">{item.inspector}</td>
                          <td className="px-3 py-2.5 text-steel text-[10px]">{item.date ?? '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            )
          })}
        </div>
      </div>

      {/* Punch List + Inspections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Punch list */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-0.5 h-4 bg-gold rounded-full shrink-0" />
            <h2 className="text-xs font-semibold text-concrete uppercase tracking-widest">Punch List</h2>
          </div>
          <div className="rounded-lg border border-[#D4D1CB] bg-white overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-limestone border-b border-[#D4D1CB]">
                <tr>
                  {['#', 'Project', 'Description', 'Assigned To', 'Status'].map((h) => (
                    <th key={h} className="px-3 py-2 text-left text-[10px] font-semibold text-concrete uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D4D1CB]">
                {SAMPLE_PUNCH_LIST.map((p) => (
                  <tr key={p.id} className="hover:bg-limestone transition-colors">
                    <td className="px-3 py-2.5 font-mono text-[11px] text-concrete">{p.id}</td>
                    <td className="px-3 py-2.5 font-mono text-[11px] text-gold">{p.projectNumber.replace('STG-2026-', 'P')}</td>
                    <td className="px-3 py-2.5 text-obsidian leading-snug max-w-[200px]">{p.description}</td>
                    <td className="px-3 py-2.5 text-steel">{p.assignedTo}</td>
                    <td className="px-3 py-2.5">
                      <StatusBadge variant={p.resolved ? 'cleared' : 'blocked'} label={p.resolved ? 'Resolved' : 'Open'} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent inspections */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-0.5 h-4 bg-gold rounded-full shrink-0" />
            <h2 className="text-xs font-semibold text-concrete uppercase tracking-widest">Recent Inspections</h2>
          </div>
          <div className="space-y-2">
            {SAMPLE_INSPECTIONS.map((ins) => (
              <div key={ins.id} className="rounded-lg border border-[#D4D1CB] bg-white p-3 flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-limestone">
                  <FileText size={14} className="text-steel" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-medium text-obsidian">{ins.inspector}</p>
                    <StatusBadge variant={inspVariant(ins.status)} label={ins.status} dot />
                  </div>
                  <p className="text-[11px] font-mono text-gold mt-0.5">{ins.project}</p>
                  <div className="flex items-center gap-3 mt-1 text-[10px] text-concrete">
                    <span>{ins.date}</span>
                    <span className="flex items-center gap-0.5">
                      <MapPin size={9} /> {ins.lat}, {ins.lng}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
