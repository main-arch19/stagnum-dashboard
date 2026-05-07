import { formatCurrency } from '@/lib/currency'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { SAMPLE_QUOTATIONS } from '@/lib/sample-data'
import { ChevronRight, FileText, Send, CheckCircle2 } from 'lucide-react'

function qVariant(s: string): 'neutral' | 'progress' | 'cleared' | 'blocked' {
  const m: Record<string, 'neutral' | 'progress' | 'cleared' | 'blocked'> = {
    DRAFT: 'neutral', SENT: 'progress', SIGNED: 'cleared', SUPERSEDED: 'blocked',
  }
  return m[s] ?? 'neutral'
}

export default function QuotationsPage() {
  const draft = SAMPLE_QUOTATIONS.filter((q) => q.status === 'DRAFT')
  const sent = SAMPLE_QUOTATIONS.filter((q) => q.status === 'SENT')
  const signed = SAMPLE_QUOTATIONS.filter((q) => q.status === 'SIGNED')
  const totalValue = SAMPLE_QUOTATIONS.filter((q) => q.status !== 'SUPERSEDED').reduce((a, q) => a + q.totalJMD, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-obsidian tracking-tight uppercase">Quotations</h1>
        <div className="h-0.5 w-10 bg-gold mt-2 mb-1" />
        <p className="text-sm text-concrete">All project quotations — draft, sent, and signed</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Draft', value: draft.length, Icon: FileText, color: 'text-concrete', accent: 'kpi-accent-gold' },
          { label: 'Sent', value: sent.length, Icon: Send, color: 'text-progress', accent: 'kpi-accent-progress' },
          { label: 'Signed', value: signed.length, Icon: CheckCircle2, color: 'text-cleared', accent: 'kpi-accent-cleared' },
        ].map((s) => (
          <div key={s.label} className={`rounded-lg border border-[#D4D1CB] bg-white p-4 flex items-center gap-3 ${s.accent}`} style={{ borderTopWidth: '2px' }}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-limestone">
              <s.Icon size={15} className={s.color} />
            </div>
            <div>
              <p className="text-[10px] text-concrete uppercase tracking-wider">{s.label}</p>
              <p className={`text-2xl font-mono font-semibold tabular-nums ${s.color}`}>{s.value}</p>
            </div>
          </div>
        ))}
        <div className="rounded-lg border border-[#D4D1CB] bg-white p-4 flex items-center gap-3 kpi-accent-gold" style={{ borderTopWidth: '2px' }}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-limestone">
            <span className="text-gold text-xs font-bold">J$</span>
          </div>
          <div>
            <p className="text-[10px] text-concrete uppercase tracking-wider">Pipeline Value</p>
            <p className="text-xl font-mono font-semibold tabular-nums text-gold">{formatCurrency(totalValue, 'JMD', { compact: true })}</p>
          </div>
        </div>
      </div>

      {/* Lifecycle strip */}
      <div className="flex items-stretch rounded-lg border border-[#D4D1CB] overflow-hidden bg-white divide-x divide-[#D4D1CB]">
        {[
          { label: 'Draft', count: draft.length, color: 'text-concrete' },
          { label: 'Sent', count: sent.length, color: 'text-progress' },
          { label: 'Signed', count: signed.length, color: 'text-cleared' },
        ].map((step) => (
          <div key={step.label} className="flex-1 flex items-center justify-center gap-3 py-3 px-4">
            <span className={`text-2xl font-mono font-semibold tabular-nums ${step.color}`}>{step.count}</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-concrete">{step.label}</span>
          </div>
        ))}
      </div>

      {/* Quotations table */}
      <div className="rounded-lg border border-[#D4D1CB] bg-white overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-limestone border-b border-[#D4D1CB]">
            <tr>
              {['Quote #', 'Project', 'Client', 'Total (JMD)', 'Status', 'Issued', 'Signed', ''].map((h) => (
                <th key={h} className="px-3 py-2 text-left text-[10px] font-semibold text-concrete uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D4D1CB]">
            {SAMPLE_QUOTATIONS.map((q) => (
              <tr key={q.id} className="hover:bg-limestone transition-colors group">
                <td className="px-3 py-2.5 font-mono text-[11px] text-gold font-semibold">{q.number}</td>
                <td className="px-3 py-2.5 font-mono text-[11px] text-steel">{q.projectNumber}</td>
                <td className="px-3 py-2.5 text-obsidian max-w-[160px] truncate">{q.client}</td>
                <td className="px-3 py-2.5 text-right font-mono tabular-nums text-obsidian">{formatCurrency(q.totalJMD, 'JMD', { compact: true })}</td>
                <td className="px-3 py-2.5"><StatusBadge variant={qVariant(q.status)} label={q.status} /></td>
                <td className="px-3 py-2.5 text-steel">{q.issued}</td>
                <td className="px-3 py-2.5 text-steel">{q.signed ?? '—'}</td>
                <td className="px-3 py-2.5">
                  <ChevronRight size={13} className="text-concrete opacity-0 group-hover:opacity-100 transition-opacity" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
