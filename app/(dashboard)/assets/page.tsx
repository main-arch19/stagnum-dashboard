import { AssetTabs } from '@/components/assets/AssetTabs'
import { SAMPLE_ASSETS } from '@/lib/sample-data'
import { Wrench, AlertTriangle, Wind } from 'lucide-react'

const totalAssets = SAMPLE_ASSETS.length
const maintenanceDue = SAMPLE_ASSETS.filter((a) => ['DUE','OVERDUE'].includes(a.maintenanceStatus)).length
const totalFlightHrs = SAMPLE_ASSETS.filter((a) => a.type === 'DRONE').reduce((s, a) => s + (a.flightHours ?? 0), 0)

const upcoming = [...SAMPLE_ASSETS]
  .sort((a, b) => a.nextDue.localeCompare(b.nextDue))
  .slice(0, 5)

function daysUntil(date: string) {
  const diff = new Date(date).getTime() - new Date('2026-05-06').getTime()
  return Math.round(diff / (1000 * 60 * 60 * 24))
}

export default function AssetsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-obsidian tracking-tight uppercase">Assets & Equipment</h1>
        <div className="h-0.5 w-10 bg-gold mt-2 mb-1" />
        <p className="text-sm text-concrete">Asset register — equipment, drones, and vehicles with maintenance tracking</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Assets', value: totalAssets.toString(), icon: Wrench, color: 'text-obsidian', accent: 'kpi-accent-gold' },
          { label: 'Maintenance Due / Overdue', value: maintenanceDue.toString(), icon: AlertTriangle, color: maintenanceDue > 0 ? 'text-blocked' : 'text-cleared', accent: maintenanceDue > 0 ? 'kpi-accent-blocked' : 'kpi-accent-cleared' },
          { label: 'Drone Flight Hours', value: `${totalFlightHrs} hrs`, icon: Wind, color: 'text-progress', accent: 'kpi-accent-progress' },
        ].map((c) => (
          <div key={c.label} className={`rounded-lg border border-[#D4D1CB] bg-white p-5 flex items-start gap-3 ${c.accent}`} style={{ borderTopWidth: '2px' }}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-limestone">
              <c.icon size={17} className={c.color} />
            </div>
            <div>
              <p className="text-[11px] text-concrete uppercase tracking-wider font-medium">{c.label}</p>
              <p className={`text-2xl font-mono font-semibold tabular-nums leading-tight mt-0.5 ${c.color}`}>{c.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main content: Tabs + Upcoming maintenance */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          <AssetTabs assets={SAMPLE_ASSETS} />
        </div>

        {/* Upcoming maintenance */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-0.5 h-4 bg-gold rounded-full shrink-0" />
            <h2 className="text-xs font-semibold text-concrete uppercase tracking-widest">Upcoming Maintenance</h2>
          </div>
          <div className="space-y-2">
            {upcoming.map((a) => {
              const days = daysUntil(a.nextDue)
              const urgency = days < 0 ? 'text-blocked' : days <= 14 ? 'text-warning' : 'text-cleared'
              return (
                <div key={a.id} className="rounded-lg border border-[#D4D1CB] bg-white p-3">
                  <p className="text-xs font-medium text-obsidian leading-snug">{a.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] font-mono text-concrete">{a.nextDue}</span>
                    <span className={`text-[10px] font-mono font-semibold ${urgency}`}>
                      {days < 0 ? `${Math.abs(days)}d overdue` : days === 0 ? 'Today' : `${days}d`}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
