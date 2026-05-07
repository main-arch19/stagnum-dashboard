'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/currency'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Star, AlertTriangle } from 'lucide-react'
import type { SamplePO, SampleSupplier } from '@/lib/sample-data'

const PO_STATUS_PIPELINE = [
  { key: 'DRAFT', label: 'Draft' },
  { key: 'ISSUED', label: 'Issued' },
  { key: 'PARTIAL_DELIVERY', label: 'Partial Delivery' },
  { key: 'DELIVERED', label: 'Delivered' },
]

function poVariant(status: string) {
  const map: Record<string, 'neutral' | 'progress' | 'warning' | 'cleared'> = {
    DRAFT: 'neutral', ISSUED: 'progress', PARTIAL_DELIVERY: 'warning', DELIVERED: 'cleared',
  }
  return map[status] ?? 'neutral'
}

function poLabel(status: string) {
  return status.replace(/_/g, ' ')
}

type Props = { pos: SamplePO[]; suppliers: SampleSupplier[] }

export function ProcurementTabs({ pos, suppliers }: Props) {
  const [tab, setTab] = useState<'pos' | 'suppliers'>('pos')

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-0 border-b border-[#D4D1CB] mb-6">
        {(['pos', 'suppliers'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'px-5 py-2.5 text-xs font-medium transition-colors border-b-2 -mb-px',
              tab === t ? 'border-gold text-obsidian' : 'border-transparent text-steel hover:text-obsidian'
            )}
          >
            {t === 'pos' ? 'Purchase Orders' : 'Suppliers'}
          </button>
        ))}
      </div>

      {tab === 'pos' && (
        <div className="space-y-5">
          {/* Gate lock notice */}
          <div className="rounded-lg border border-warning/40 bg-warning/5 px-4 py-3 flex items-start gap-2.5">
            <AlertTriangle size={14} className="text-warning mt-0.5 shrink-0" />
            <p className="text-xs text-steel leading-relaxed">
              <span className="font-semibold text-obsidian">Procurement Gate:</span> PO issuance for <span className="font-medium">STG-2026-004</span> and <span className="font-medium">STG-2026-005</span> is blocked until the client deposit is cleared.
            </p>
          </div>

          {/* Status pipeline strip */}
          <div className="flex gap-2">
            {PO_STATUS_PIPELINE.map((s) => {
              const count = pos.filter((p) => p.status === s.key).length
              return (
                <div key={s.key} className={cn(
                  'flex-1 rounded border px-3 py-2 text-center',
                  count > 0 ? 'border-gold/40 bg-gold/5' : 'border-[#D4D1CB] bg-white'
                )}>
                  <p className="text-lg font-mono font-semibold text-obsidian tabular-nums">{count}</p>
                  <p className="text-[10px] text-concrete mt-0.5">{s.label}</p>
                </div>
              )
            })}
          </div>

          {/* PO table */}
          <div className="rounded-lg border border-[#D4D1CB] overflow-hidden bg-white">
            <table className="w-full text-xs">
              <thead className="bg-limestone border-b border-[#D4D1CB]">
                <tr>
                  {['PO #', 'Supplier', 'Project', 'Items', 'Value (JMD)', 'Status', 'Issued', 'Delivery'].map((h) => (
                    <th key={h} className="px-3 py-2 text-left text-[10px] font-semibold text-concrete uppercase tracking-wider first:rounded-tl-lg">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D4D1CB]">
                {pos.map((po) => (
                  <tr key={po.id} className="hover:bg-limestone transition-colors">
                    <td className="px-3 py-2 font-mono text-[11px] text-gold">{po.number}</td>
                    <td className="px-3 py-2 text-obsidian">{po.supplierName}</td>
                    <td className="px-3 py-2 font-mono text-steel text-[11px]">{po.projectNumber}</td>
                    <td className="px-3 py-2 text-center text-steel">{po.items}</td>
                    <td className="px-3 py-2 text-right font-mono tabular-nums text-obsidian">{formatCurrency(po.valueJMD, 'JMD')}</td>
                    <td className="px-3 py-2"><StatusBadge variant={poVariant(po.status)} label={poLabel(po.status)} /></td>
                    <td className="px-3 py-2 text-steel">{po.issuedDate}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-1.5">
                        <div className="flex-1 h-1.5 bg-limestone rounded-full overflow-hidden w-16">
                          <div className="h-full bg-cleared rounded-full" style={{ width: `${po.deliveryPct}%` }} />
                        </div>
                        <span className="text-[10px] font-mono text-steel w-7 text-right">{po.deliveryPct}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'suppliers' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {suppliers.map((s) => (
            <div key={s.id} className="rounded-lg border border-[#D4D1CB] bg-white p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-sm font-semibold text-obsidian leading-snug">{s.name}</p>
                <span className="shrink-0 flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={11} className={i < s.rating ? 'text-gold fill-gold' : 'text-concrete'} />
                  ))}
                </span>
              </div>
              <p className="text-xs text-steel">{s.specialty}</p>
              <p className="text-xs text-concrete mt-0.5">Contact: {s.contact}</p>
              <div className="mt-3 pt-3 border-t border-[#D4D1CB] flex items-center justify-between">
                <span className="text-[10px] text-concrete uppercase tracking-wider">Active POs</span>
                <span className="text-sm font-mono font-semibold text-obsidian tabular-nums">{s.activePOs}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
