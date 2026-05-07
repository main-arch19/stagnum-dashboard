import { ProcurementTabs } from '@/components/procurement/ProcurementTabs'
import { SAMPLE_POS, SAMPLE_SUPPLIERS } from '@/lib/sample-data'
import { formatCurrency } from '@/lib/currency'

const totalPOValue = SAMPLE_POS.reduce((a, p) => a + p.valueJMD, 0)
const deliveredValue = SAMPLE_POS.filter((p) => p.status === 'DELIVERED').reduce((a, p) => a + p.valueJMD, 0)

export default function ProcurementPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-obsidian tracking-tight uppercase">Procurement</h1>
        <div className="h-0.5 w-10 bg-gold mt-2 mb-1" />
        <p className="text-sm text-concrete">Purchase orders and supplier management with gate enforcement</p>
      </div>

      {/* KPI pills */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: 'Total POs', value: SAMPLE_POS.length, color: 'text-obsidian' },
          { label: 'Active Suppliers', value: SAMPLE_SUPPLIERS.length, color: 'text-progress' },
          { label: 'Total PO Value', value: formatCurrency(totalPOValue, 'JMD', { compact: true }), color: 'text-obsidian' },
          { label: 'Delivered Value', value: formatCurrency(deliveredValue, 'JMD', { compact: true }), color: 'text-cleared' },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-2.5 rounded-lg border border-[#D4D1CB] bg-white px-4 py-2.5">
            <span className={`text-lg font-mono font-semibold tabular-nums ${s.color}`}>{s.value}</span>
            <span className="text-xs text-concrete">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <ProcurementTabs pos={SAMPLE_POS} suppliers={SAMPLE_SUPPLIERS} />
    </div>
  )
}
