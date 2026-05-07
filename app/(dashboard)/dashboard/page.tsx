import { auth } from '@/lib/auth'
import { FolderKanban, DollarSign, AlertTriangle, Clock, TrendingUp, ShieldAlert, ChevronRight, Lock, Unlock } from 'lucide-react'
import { formatCurrency } from '@/lib/currency'
import { StatusBadge, projectStageVariant, projectStageLabel } from '@/components/shared/StatusBadge'
import { ProjectStageBar } from '@/components/charts/ProjectStageBar'
import { SAMPLE_PROJECTS, SAMPLE_ACTIVITY } from '@/lib/sample-data'

function KPICard({
  label, value, sub, icon: Icon, color = 'text-obsidian', accent = 'kpi-accent-gold',
}: {
  label: string; value: string | number; sub?: string; icon: React.ElementType; color?: string; accent?: string
}) {
  return (
    <div className={`rounded-lg border border-[#D4D1CB] bg-white p-5 flex items-start gap-3 ${accent}`} style={{ borderTopWidth: '2px' }}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-limestone">
        <Icon size={17} className={color} />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] text-concrete uppercase tracking-wider font-medium">{label}</p>
        <p className={`text-2xl font-mono font-semibold tabular-nums leading-tight mt-0.5 ${color}`}>{value}</p>
        {sub && <p className="text-[11px] text-concrete mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

const activityDotColor: Record<string, string> = {
  gate: '#16A34A', invoice: '#2563EB', po: '#9BA3AB', approval: '#F59E0B', rate: '#9BA3AB',
}

const stageChartData = [
  { stage: 'Construction', valueJMD: 48_500_000, color: '#2563EB' },
  { stage: 'Handover', valueJMD: 124_800_000, color: '#C9A227' },
  { stage: 'Procurement', valueJMD: 87_200_000, color: '#16A34A' },
  { stage: 'Awaiting Dep.', valueJMD: 62_300_000, color: '#F59E0B' },
  { stage: 'Quoting', valueJMD: 34_700_000, color: '#9BA3AB' },
  { stage: 'On Hold', valueJMD: 18_900_000, color: '#DC2626' },
]

export default async function DashboardPage() {
  const session = await auth().catch(() => null)
  const role = (session?.user as { role?: string })?.role ?? 'FOUNDER'

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-obsidian tracking-tight uppercase">Operations Overview</h1>
        <div className="h-0.5 w-10 bg-gold mt-2 mb-1" />
        <p className="text-sm text-concrete">
          {new Date().toLocaleDateString('en-JM', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <KPICard label="Active Projects" value="7" sub="Across 5 stages" icon={FolderKanban} color="text-progress" accent="kpi-accent-progress" />
        <KPICard label="Total Contract Value" value="J$385.8M" sub="All active projects" icon={TrendingUp} color="text-cleared" accent="kpi-accent-cleared" />
        <KPICard label="Outstanding Invoices" value="3" sub="J$73.4M awaiting payment" icon={DollarSign} color="text-warning" accent="kpi-accent-warning" />
        <KPICard label="Overdue Payments" value="J$14.4M" sub="1 invoice past due" icon={AlertTriangle} color="text-blocked" accent="kpi-accent-blocked" />
        <KPICard label="Gates Locked" value="2" sub="Awaiting conditions" icon={ShieldAlert} color="text-warning" accent="kpi-accent-warning" />
        <KPICard label="Pending Approvals" value="4" sub="Awaiting Founder decision" icon={Clock} color="text-progress" accent="kpi-accent-progress" />
      </div>

      {/* Projects at a Glance + Stage chart */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Projects table */}
        <div className="lg:col-span-3">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-0.5 h-4 bg-gold rounded-full shrink-0" />
            <h2 className="text-xs font-semibold text-concrete uppercase tracking-widest">Projects at a Glance</h2>
          </div>
          <div className="rounded-lg border border-[#D4D1CB] bg-white overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-limestone border-b border-[#D4D1CB]">
                <tr>
                  {['Project', 'Client', 'Stage', 'Contract Value', 'Gates'].map((h) => (
                    <th key={h} className="px-3 py-2 text-left text-[10px] font-semibold text-concrete uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D4D1CB]">
                {SAMPLE_PROJECTS.slice(0, 5).map((p) => {
                  const gatesUnlocked = Object.values(p.gates).filter(Boolean).length
                  return (
                    <tr key={p.id} className="hover:bg-limestone transition-colors">
                      <td className="px-3 py-2.5 font-mono text-[11px] text-gold font-semibold">{p.number}</td>
                      <td className="px-3 py-2.5 text-obsidian truncate max-w-[120px]">{p.client}</td>
                      <td className="px-3 py-2.5">
                        <StatusBadge variant={projectStageVariant(p.stage)} label={projectStageLabel(p.stage)} />
                      </td>
                      <td className="px-3 py-2.5 font-mono tabular-nums text-obsidian text-right">
                        {formatCurrency(p.contractValueJMD, 'JMD', { compact: true })}
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-0.5">
                          {Object.entries(p.gates).map(([k, v]) => (
                            <span key={k} className={v ? 'gate-unlocked' : 'gate-locked'}>
                              {v ? <Unlock size={9} /> : <Lock size={9} />}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="px-3 py-2 border-t border-[#D4D1CB] bg-limestone flex justify-end">
              <a href="/projects" className="text-[11px] text-gold flex items-center gap-0.5 hover:underline">
                View all projects <ChevronRight size={11} />
              </a>
            </div>
          </div>
        </div>

        {/* Stage bar chart */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-0.5 h-4 bg-gold rounded-full shrink-0" />
            <h2 className="text-xs font-semibold text-concrete uppercase tracking-widest">Contract Value by Stage</h2>
          </div>
          <div className="rounded-lg border border-[#D4D1CB] bg-white p-4 h-[calc(100%-32px)]">
            <ProjectStageBar data={stageChartData} />
          </div>
        </div>
      </div>

      {/* Recent Activity + Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Activity feed */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-0.5 h-4 bg-gold rounded-full shrink-0" />
            <h2 className="text-xs font-semibold text-concrete uppercase tracking-widest">Recent Activity</h2>
          </div>
          <div className="rounded-lg border border-[#D4D1CB] bg-white p-4 space-y-3">
            {SAMPLE_ACTIVITY.map((item, i) => (
              <div key={item.id} className="flex items-start gap-3">
                <div className="relative mt-1">
                  <span
                    className="block h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: activityDotColor[item.type] }}
                  />
                  {i < SAMPLE_ACTIVITY.length - 1 && (
                    <span className="absolute top-3 left-[3px] block w-px h-6 bg-[#D4D1CB]" />
                  )}
                </div>
                <div className="flex-1 min-w-0 pb-3">
                  <p className="text-xs text-obsidian leading-snug">{item.description}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-mono text-gold">{item.project}</span>
                    <span className="text-[10px] text-concrete">{item.timeAgo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick access */}
        <div className="lg:col-span-3">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-0.5 h-4 bg-gold rounded-full shrink-0" />
            <h2 className="text-xs font-semibold text-concrete uppercase tracking-widest">Quick Access</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'View Projects', href: '/projects', desc: 'Active construction pipeline' },
              { label: 'Rates Library', href: '/rates', desc: 'Master BOQ rates database' },
              { label: 'Finance', href: '/finance', desc: 'Invoices & cash flow' },
              { label: 'Tender Pipeline', href: '/tender', desc: 'BD & proposals kanban' },
              { label: 'QA / QC', href: '/qc', desc: 'Checklists & inspections' },
              { label: 'Approvals', href: '/approvals', desc: 'Pending Founder decisions' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group rounded-lg border border-[#D4D1CB] bg-white p-3 hover:border-gold/50 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-obsidian group-hover:text-gold transition-colors">{item.label}</p>
                  <ChevronRight size={14} className="text-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-150 shrink-0" />
                </div>
                <p className="text-xs text-concrete mt-0.5">{item.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
