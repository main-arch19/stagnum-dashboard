'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { StatusBadge } from '@/components/shared/StatusBadge'
import type { SampleAsset } from '@/lib/sample-data'

const TABS = [
  { key: 'EQUIPMENT', label: 'Equipment' },
  { key: 'DRONE', label: 'Drones' },
  { key: 'VEHICLE', label: 'Vehicles' },
] as const

function maintenanceVariant(status: string) {
  const map: Record<string, 'cleared' | 'warning' | 'blocked'> = {
    COMPLETED: 'cleared', DUE: 'warning', OVERDUE: 'blocked',
  }
  return map[status] ?? 'neutral' as 'cleared'
}

type Props = { assets: SampleAsset[] }

export function AssetTabs({ assets }: Props) {
  const [activeType, setActiveType] = useState<'EQUIPMENT' | 'DRONE' | 'VEHICLE'>('EQUIPMENT')

  const filtered = assets.filter((a) => a.type === activeType)

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-0 border-b border-[#D4D1CB] mb-5">
        {TABS.map((t) => {
          const count = assets.filter((a) => a.type === t.key).length
          return (
            <button
              key={t.key}
              onClick={() => setActiveType(t.key)}
              className={cn(
                'flex items-center gap-1.5 px-5 py-2.5 text-xs font-medium transition-colors border-b-2 -mb-px',
                activeType === t.key ? 'border-gold text-obsidian' : 'border-transparent text-steel hover:text-obsidian'
              )}
            >
              {t.label}
              <span className={cn(
                'inline-flex items-center justify-center h-4 min-w-4 rounded-full text-[9px] font-mono px-1',
                activeType === t.key ? 'bg-gold/20 text-obsidian' : 'bg-limestone text-concrete'
              )}>{count}</span>
            </button>
          )
        })}
      </div>

      {/* Asset table */}
      <div className="rounded-lg border border-[#D4D1CB] overflow-hidden bg-white">
        <table className="w-full text-xs">
          <thead className="bg-limestone border-b border-[#D4D1CB]">
            <tr>
              {['Tag', 'Name', ...(activeType === 'DRONE' ? ['Flight Hours'] : []), 'Status', 'Last Maintenance', 'Next Due', 'Maint. Status', 'Notes'].map((h) => (
                <th key={h} className="px-3 py-2 text-left text-[10px] font-semibold text-concrete uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D4D1CB]">
            {filtered.map((a) => (
              <tr key={a.id} className="hover:bg-limestone transition-colors">
                <td className="px-3 py-2.5 font-mono text-[11px] text-gold">{a.tag}</td>
                <td className="px-3 py-2.5 text-obsidian font-medium">{a.name}</td>
                {activeType === 'DRONE' && (
                  <td className="px-3 py-2.5 font-mono tabular-nums text-obsidian">{a.flightHours ?? '—'} hrs</td>
                )}
                <td className="px-3 py-2.5">
                  <StatusBadge variant={a.status === 'ACTIVE' ? 'cleared' : 'neutral'} label={a.status} dot={false} />
                </td>
                <td className="px-3 py-2.5 text-steel">{a.lastMaintenance}</td>
                <td className="px-3 py-2.5 text-steel">{a.nextDue}</td>
                <td className="px-3 py-2.5">
                  <StatusBadge variant={maintenanceVariant(a.maintenanceStatus)} label={a.maintenanceStatus} />
                </td>
                <td className="px-3 py-2.5 text-concrete max-w-xs truncate">{a.notes ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
