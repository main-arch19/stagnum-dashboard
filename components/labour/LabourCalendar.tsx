'use client'

import { cn } from '@/lib/utils'
import type { SampleWorker } from '@/lib/sample-data'

const DAYS = ['Mon 04', 'Tue 05', 'Wed 06', 'Thu 07', 'Fri 08', 'Sat 09']
const DAY_KEYS = ['2026-05-04', '2026-05-05', '2026-05-06', '2026-05-07', '2026-05-08', '2026-05-09']

type Props = { workers: SampleWorker[] }

export function LabourCalendar({ workers }: Props) {
  return (
    <div className="rounded-lg border border-[#D4D1CB] bg-white overflow-hidden">
      {/* Header */}
      <div className="grid border-b border-[#D4D1CB] bg-limestone" style={{ gridTemplateColumns: '120px repeat(6, 1fr)' }}>
        <div className="px-3 py-2 border-r border-[#D4D1CB]">
          <p className="text-[10px] font-semibold text-concrete uppercase tracking-wider">Worker</p>
          <p className="text-[9px] text-concrete">Week of May 4</p>
        </div>
        {DAYS.map((d) => (
          <div key={d} className="px-2 py-2 border-r border-[#D4D1CB] last:border-r-0 text-center">
            <p className="text-[10px] font-semibold text-obsidian">{d}</p>
            <p className="text-[9px] text-concrete">May 2026</p>
          </div>
        ))}
      </div>

      {/* Rows */}
      <div className="divide-y divide-[#D4D1CB]">
        {workers.map((w) => (
          <div
            key={w.id}
            className="grid hover:bg-limestone/50 transition-colors"
            style={{ gridTemplateColumns: '120px repeat(6, 1fr)' }}
          >
            {/* Worker name */}
            <div className="px-3 py-2 border-r border-[#D4D1CB] flex flex-col justify-center min-h-[44px]">
              <p className="text-xs font-medium text-obsidian leading-tight truncate">{w.name}</p>
              <p className="text-[10px] text-concrete truncate">{w.trade}</p>
            </div>

            {/* Day cells */}
            {DAY_KEYS.map((day) => {
              const isWorking = day >= w.startDate && day <= w.endDate
              return (
                <div key={day} className="px-1 py-1.5 border-r border-[#D4D1CB] last:border-r-0 flex items-center justify-center min-h-[44px]">
                  {isWorking && (
                    <div
                      className="w-full rounded px-1.5 py-1 text-center"
                      style={{ backgroundColor: w.projectColor + '22', borderLeft: `3px solid ${w.projectColor}` }}
                    >
                      <p className="text-[9px] font-medium leading-tight truncate" style={{ color: w.projectColor === '#C9A227' ? '#92740E' : w.projectColor }}>
                        {w.projectNumber.replace('STG-2026-', 'P')}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 px-3 py-2 border-t border-[#D4D1CB] bg-limestone">
        {[
          { number: 'STG-2026-001', color: '#C9A227', label: 'Pemberton Residence' },
          { number: 'STG-2026-002', color: '#2563EB', label: 'Half Moon Hotel' },
          { number: 'STG-2026-003', color: '#16A34A', label: 'Kingston Complex' },
        ].map((p) => (
          <div key={p.number} className="flex items-center gap-1.5">
            <div className="h-3 w-1 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-[10px] text-steel">{p.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
