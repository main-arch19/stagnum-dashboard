'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, AlertTriangle, Clock } from 'lucide-react'
import { formatCurrency } from '@/lib/currency'

type KPIItem = {
  label: string
  value: string
  trend?: 'up' | 'down' | 'warn' | 'neutral'
  raw?: number
}

// Sample KPIs — replaced by SSE stream once /api/sse/kpi is wired
const PLACEHOLDER_KPIS: KPIItem[] = [
  { label: 'Active Projects', value: '7', trend: 'up' },
  { label: 'Contract Value (JMD)', value: 'J$385.8M', trend: 'up' },
  { label: 'Outstanding Invoices', value: '3 invoices', trend: 'warn' },
  { label: 'Overdue Payments', value: 'J$14.4M', trend: 'down' },
  { label: 'Gates Locked', value: '2', trend: 'warn' },
  { label: 'Pending Approvals', value: '4 items', trend: 'warn' },
  { label: 'Stale Rates', value: '8 rates', trend: 'warn' },
]

export function KPITicker() {
  const [kpis, setKpis] = useState<KPIItem[]>(PLACEHOLDER_KPIS)
  const [offset, setOffset] = useState(0)

  // Scroll animation
  useEffect(() => {
    const frame = setInterval(() => {
      setOffset((prev) => {
        const next = prev - 1
        const totalWidth = kpis.length * 240
        return next < -totalWidth ? 0 : next
      })
    }, 24)
    return () => clearInterval(frame)
  }, [kpis.length])

  const TrendIcon = ({ trend }: { trend?: string }) => {
    if (trend === 'up')   return <TrendingUp  size={11} className="text-cleared" />
    if (trend === 'down') return <TrendingDown size={11} className="text-blocked" />
    if (trend === 'warn') return <AlertTriangle size={11} className="text-warning" />
    return <Clock size={11} className="text-concrete" />
  }

  return (
    <div className="fixed bottom-0 left-60 right-0 z-30 h-8 overflow-hidden border-t border-charcoal bg-obsidian flex items-center">
      {/* Label */}
      <div className="shrink-0 flex items-center gap-2 border-r border-charcoal px-3 h-full">
        <span className="text-gold text-[10px] font-mono font-semibold tracking-widest uppercase">KPI</span>
      </div>

      {/* Scrolling ticker */}
      <div className="flex-1 overflow-hidden relative">
        <div
          className="flex items-center gap-0 whitespace-nowrap"
          style={{ transform: `translateX(${offset}px)`, transition: 'none' }}
        >
          {[...kpis, ...kpis].map((kpi, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-2 px-4 border-r border-charcoal h-8"
              style={{ minWidth: 240 }}
            >
              <TrendIcon trend={kpi.trend} />
              <span className="text-concrete text-[10px] tracking-wide">{kpi.label}:</span>
              <span className="text-limestone text-[10px] font-mono font-medium tabular-nums">
                {kpi.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Live dot */}
      <div className="shrink-0 flex items-center gap-1.5 px-3 border-l border-charcoal h-full">
        <span className="h-1.5 w-1.5 rounded-full bg-cleared animate-pulse" />
        <span className="text-[10px] text-concrete font-mono">LIVE</span>
      </div>
    </div>
  )
}
