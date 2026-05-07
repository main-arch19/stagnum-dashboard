import { formatCurrency } from '@/lib/currency'
import { SAMPLE_APPROVALS } from '@/lib/sample-data'
import { AlertTriangle, ShieldAlert, FileText } from 'lucide-react'

const variations = SAMPLE_APPROVALS.filter((a) => a.type === 'VARIATION')
const gateOverrides = SAMPLE_APPROVALS.filter((a) => a.type === 'GATE_OVERRIDE')
const quotations = SAMPLE_APPROVALS.filter((a) => a.type === 'QUOTATION')

function InitialsBadge({ initials }: { initials: string }) {
  return (
    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-charcoal text-limestone text-xs font-medium">
      {initials}
    </span>
  )
}

export default function ApprovalsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-obsidian tracking-tight uppercase">Approvals</h1>
        <div className="h-0.5 w-10 bg-gold mt-2 mb-1" />
        <p className="text-sm text-concrete">Founder approval queue — variations, gate overrides, and quotation sign-offs</p>
      </div>

      {/* Type count chips */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: 'Variations Pending', count: variations.length, color: 'text-warning' },
          { label: 'Gate Override Requests', count: gateOverrides.length, color: 'text-blocked' },
          { label: 'Quotation Sign-offs', count: quotations.length, color: 'text-progress' },
          { label: 'Total Pending', count: SAMPLE_APPROVALS.length, color: 'text-obsidian' },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-2.5 rounded-lg border border-[#D4D1CB] bg-white px-4 py-2.5">
            <span className={`text-xl font-mono font-semibold tabular-nums ${s.color}`}>{s.count}</span>
            <span className="text-xs text-concrete">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Group A — Variations */}
      {variations.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3 px-1 py-1.5 rounded-md bg-warning/10 border border-warning/30">
            <AlertTriangle size={13} className="text-warning shrink-0" />
            <span className="text-xs font-semibold text-obsidian">Variation Approvals</span>
            <span className="ml-auto text-[10px] font-mono text-warning">{variations.length} pending</span>
          </div>
          <div className="space-y-3">
            {variations.map((a) => {
              if (a.type !== 'VARIATION') return null
              return (
                <div key={a.id} className="rounded-lg border border-[#D4D1CB] bg-white p-4">
                  <div className="flex items-start gap-3">
                    <InitialsBadge initials={a.requestedByInitials} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <span className="text-[11px] font-mono text-gold font-semibold">{a.ref}</span>
                          <span className="mx-2 text-concrete">·</span>
                          <span className="text-[11px] font-mono text-steel">{a.project}</span>
                        </div>
                        <span className="text-[10px] text-concrete">{a.date}</span>
                      </div>
                      <p className="text-xs text-obsidian mt-1 leading-snug">{a.description}</p>
                      <p className="text-xs font-mono font-semibold text-obsidian mt-1 tabular-nums">
                        {formatCurrency(a.valueJMD, 'JMD')} variation value
                      </p>
                      <p className="text-[10px] text-concrete mt-0.5">Requested by {a.requestedBy}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3 pt-3 border-t border-[#D4D1CB]">
                    <button className="px-4 py-1.5 rounded border border-gold text-gold text-xs font-medium hover:bg-gold/5 transition-colors">Approve</button>
                    <button className="px-4 py-1.5 rounded border border-blocked/40 text-blocked text-xs font-medium hover:bg-blocked/5 transition-colors">Reject</button>
                    <button className="ml-auto px-3 py-1.5 text-xs text-steel hover:text-obsidian transition-colors">View Details</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Group B — Gate Overrides */}
      {gateOverrides.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3 px-1 py-1.5 rounded-md bg-blocked/10 border border-blocked/30">
            <ShieldAlert size={13} className="text-blocked shrink-0" />
            <span className="text-xs font-semibold text-obsidian">Gate Override Requests</span>
            <span className="ml-auto text-[10px] font-mono text-blocked">{gateOverrides.length} pending</span>
          </div>
          <div className="space-y-3">
            {gateOverrides.map((a) => {
              if (a.type !== 'GATE_OVERRIDE') return null
              return (
                <div key={a.id} className="rounded-lg border border-blocked/20 bg-white p-4">
                  <div className="flex items-start gap-3">
                    <InitialsBadge initials={a.requestedByInitials} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <span className="text-xs font-semibold text-blocked">{a.gate} GATE</span>
                          <span className="mx-2 text-concrete">·</span>
                          <span className="text-[11px] font-mono text-steel">{a.project}</span>
                        </div>
                        <span className="text-[10px] text-concrete">{a.date}</span>
                      </div>
                      <p className="text-xs text-obsidian mt-1.5 leading-relaxed bg-limestone rounded px-2 py-1.5 font-mono text-[11px]">
                        &ldquo;{a.reason}&rdquo;
                      </p>
                      <p className="text-[10px] text-concrete mt-1">Requested by {a.requestedBy}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3 pt-3 border-t border-[#D4D1CB]">
                    <button className="px-4 py-1.5 rounded border border-gold text-gold text-xs font-medium hover:bg-gold/5 transition-colors">Override Gate</button>
                    <button className="px-4 py-1.5 rounded border border-[#D4D1CB] text-steel text-xs font-medium hover:bg-limestone transition-colors">Deny</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Group C — Quotation Sign-offs */}
      {quotations.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3 px-1 py-1.5 rounded-md bg-progress/10 border border-progress/30">
            <FileText size={13} className="text-progress shrink-0" />
            <span className="text-xs font-semibold text-obsidian">Quotation Sign-offs</span>
            <span className="ml-auto text-[10px] font-mono text-progress">{quotations.length} pending</span>
          </div>
          <div className="space-y-3">
            {quotations.map((a) => {
              if (a.type !== 'QUOTATION') return null
              return (
                <div key={a.id} className="rounded-lg border border-[#D4D1CB] bg-white p-4">
                  <div className="flex items-start gap-3">
                    <InitialsBadge initials={a.requestedByInitials} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <span className="text-[11px] font-mono text-gold font-semibold">{a.quoteNumber}</span>
                          <span className="mx-2 text-concrete">·</span>
                          <span className="text-xs text-obsidian">{a.client}</span>
                        </div>
                        <span className="text-[10px] text-concrete">{a.date}</span>
                      </div>
                      <p className="text-xs font-mono font-semibold text-obsidian mt-1 tabular-nums">
                        {formatCurrency(a.valueJMD, 'JMD', { compact: true })} — {a.project}
                      </p>
                      <p className="text-[10px] text-concrete mt-0.5">Submitted by {a.requestedBy}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3 pt-3 border-t border-[#D4D1CB]">
                    <button className="px-4 py-1.5 rounded border border-gold text-gold text-xs font-medium hover:bg-gold/5 transition-colors">Sign Off</button>
                    <button className="px-4 py-1.5 rounded border border-blocked/40 text-blocked text-xs font-medium hover:bg-blocked/5 transition-colors">Reject</button>
                    <button className="ml-auto px-3 py-1.5 text-xs text-steel hover:text-obsidian transition-colors">View PDF</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
