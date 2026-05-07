import { formatCurrency } from '@/lib/currency'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { CashFlowChart } from '@/components/charts/CashFlowChart'
import { ReceivablesAging } from '@/components/charts/ReceivablesAging'
import { SAMPLE_INVOICES, SAMPLE_CASHFLOW, SAMPLE_WIP, SAMPLE_AGING } from '@/lib/sample-data'
import { DollarSign, TrendingUp, AlertTriangle, Clock, ChevronRight } from 'lucide-react'

function invVariant(s: string): 'cleared' | 'progress' | 'warning' | 'blocked' | 'neutral' {
  const m: Record<string, 'cleared' | 'progress' | 'warning' | 'blocked' | 'neutral'> = {
    PAID: 'cleared', SENT: 'progress', PARTIAL: 'warning', DRAFT: 'neutral', OVERDUE: 'blocked',
  }
  return m[s] ?? 'neutral'
}

export default function FinancePage() {
  const totalInvoiced = SAMPLE_INVOICES.reduce((a, i) => a + i.totalJMD, 0)
  const collected = SAMPLE_INVOICES.filter((i) => i.status === 'PAID').reduce((a, i) => a + i.totalJMD, 0)
  const outstanding = SAMPLE_INVOICES.filter((i) => ['SENT', 'PARTIAL'].includes(i.status)).reduce((a, i) => a + i.totalJMD, 0)
  const overdue = SAMPLE_INVOICES.filter((i) => i.status === 'OVERDUE').reduce((a, i) => a + i.totalJMD, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-obsidian tracking-tight uppercase">Finance & Invoicing</h1>
        <div className="h-0.5 w-10 bg-gold mt-2 mb-1" />
        <p className="text-sm text-concrete">Cash flow, WIP analysis, invoicing, and receivables — GCT 15% inclusive</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Invoiced', value: formatCurrency(totalInvoiced, 'JMD', { compact: true }), icon: TrendingUp, color: 'text-obsidian', accent: 'kpi-accent-gold' },
          { label: 'Collected', value: formatCurrency(collected, 'JMD', { compact: true }), icon: DollarSign, color: 'text-cleared', accent: 'kpi-accent-cleared' },
          { label: 'Outstanding', value: formatCurrency(outstanding, 'JMD', { compact: true }), icon: Clock, color: 'text-warning', accent: 'kpi-accent-warning' },
          { label: 'Overdue', value: formatCurrency(overdue, 'JMD', { compact: true }), icon: AlertTriangle, color: 'text-blocked', accent: 'kpi-accent-blocked' },
        ].map((c) => (
          <div key={c.label} className={`rounded-lg border border-[#D4D1CB] bg-white p-5 flex items-start gap-3 ${c.accent}`} style={{ borderTopWidth: '2px' }}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-limestone">
              <c.icon size={17} className={c.color} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-concrete uppercase tracking-wider font-medium">{c.label}</p>
              <p className={`text-xl font-mono font-semibold tabular-nums leading-tight mt-0.5 ${c.color}`}>{c.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-0.5 h-4 bg-gold rounded-full shrink-0" />
            <h2 className="text-xs font-semibold text-concrete uppercase tracking-widest">Cash Flow — Last 6 Months (JMD)</h2>
          </div>
          <div className="rounded-lg border border-[#D4D1CB] bg-white p-4">
            <CashFlowChart data={SAMPLE_CASHFLOW} />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-0.5 h-4 bg-gold rounded-full shrink-0" />
            <h2 className="text-xs font-semibold text-concrete uppercase tracking-widest">Receivables Aging</h2>
          </div>
          <div className="rounded-lg border border-[#D4D1CB] bg-white p-4">
            <ReceivablesAging data={SAMPLE_AGING} />
            <div className="mt-3 border-t border-[#D4D1CB] pt-3 space-y-1">
              {SAMPLE_AGING.map((a) => (
                <div key={a.label} className="flex items-center justify-between text-[10px]">
                  <span className="text-steel">{a.label}</span>
                  <span className="font-mono tabular-nums text-obsidian">{formatCurrency(a.amountJMD, 'JMD', { compact: true })}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* WIP Table */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-0.5 h-4 bg-gold rounded-full shrink-0" />
          <h2 className="text-xs font-semibold text-concrete uppercase tracking-widest">Work In Progress (WIP)</h2>
        </div>
        <div className="rounded-lg border border-[#D4D1CB] bg-white overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-limestone border-b border-[#D4D1CB]">
              <tr>
                {['Project', 'Contract Value', 'Billed to Date', '% Billed', 'Earned Value', 'Variance'].map((h) => (
                  <th key={h} className="px-3 py-2 text-left text-[10px] font-semibold text-concrete uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D4D1CB]">
              {SAMPLE_WIP.map((w) => {
                const billedPct = Math.round((w.billedJMD / w.contractValueJMD) * 100)
                const variance = w.earnedValueJMD - w.billedJMD
                return (
                  <tr key={w.projectNumber} className="hover:bg-limestone transition-colors">
                    <td className="px-3 py-2.5">
                      <p className="font-mono text-[11px] text-gold">{w.projectNumber}</p>
                      <p className="text-obsidian text-[11px] mt-0.5">{w.projectName}</p>
                    </td>
                    <td className="px-3 py-2.5 font-mono tabular-nums text-obsidian text-right">{formatCurrency(w.contractValueJMD, 'JMD', { compact: true })}</td>
                    <td className="px-3 py-2.5 font-mono tabular-nums text-obsidian text-right">{formatCurrency(w.billedJMD, 'JMD', { compact: true })}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className="flex-1 h-1.5 bg-limestone rounded-full overflow-hidden w-16">
                          <div className="h-full rounded-full bg-progress" style={{ width: `${billedPct}%` }} />
                        </div>
                        <span className="font-mono text-[10px] text-steel w-8 text-right">{billedPct}%</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 font-mono tabular-nums text-obsidian text-right">{formatCurrency(w.earnedValueJMD, 'JMD', { compact: true })}</td>
                    <td className={`px-3 py-2.5 font-mono tabular-nums text-right font-semibold ${variance >= 0 ? 'text-cleared' : 'text-blocked'}`}>
                      {variance >= 0 ? '+' : ''}{formatCurrency(variance, 'JMD', { compact: true })}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoices table */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-0.5 h-4 bg-gold rounded-full shrink-0" />
          <h2 className="text-xs font-semibold text-concrete uppercase tracking-widest">Invoices</h2>
        </div>
        <div className="rounded-lg border border-[#D4D1CB] bg-white overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-limestone border-b border-[#D4D1CB]">
              <tr>
                {['Invoice #', 'Project', 'Client', 'Total (incl. GCT)', 'Status', 'Due Date', 'Paid', ''].map((h) => (
                  <th key={h} className="px-3 py-2 text-left text-[10px] font-semibold text-concrete uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D4D1CB]">
              {SAMPLE_INVOICES.map((inv) => (
                <tr key={inv.id} className="hover:bg-limestone transition-colors group">
                  <td className="px-3 py-2.5 font-mono text-[11px] text-gold font-semibold">{inv.number}</td>
                  <td className="px-3 py-2.5 font-mono text-[11px] text-steel">{inv.projectNumber}</td>
                  <td className="px-3 py-2.5 text-obsidian max-w-[140px] truncate">{inv.client}</td>
                  <td className="px-3 py-2.5 font-mono tabular-nums text-obsidian text-right">{formatCurrency(inv.totalJMD, 'JMD', { compact: true })}</td>
                  <td className="px-3 py-2.5"><StatusBadge variant={invVariant(inv.status)} label={inv.status} /></td>
                  <td className={`px-3 py-2.5 ${inv.status === 'OVERDUE' ? 'text-blocked font-medium' : 'text-steel'}`}>{inv.dueDate}</td>
                  <td className="px-3 py-2.5 text-steel">{inv.paidDate ?? '—'}</td>
                  <td className="px-3 py-2.5">
                    <ChevronRight size={13} className="text-concrete opacity-0 group-hover:opacity-100 transition-opacity" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
