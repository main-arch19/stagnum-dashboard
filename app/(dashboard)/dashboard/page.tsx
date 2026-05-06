import { auth } from '@/lib/auth'
import {
  FolderKanban,
  DollarSign,
  AlertTriangle,
  Clock,
  TrendingUp,
  ShieldAlert,
  ChevronRight,
} from 'lucide-react'
import { formatCurrency } from '@/lib/currency'

function KPICard({
  label,
  value,
  sub,
  icon: Icon,
  color = 'text-obsidian',
  accent = 'kpi-accent-gold',
}: {
  label: string
  value: string | number
  sub?: string
  icon: React.ElementType
  color?: string
  accent?: string
}) {
  return (
    <div
      className={`rounded-lg border border-[#D4D1CB] bg-white p-5 flex items-start gap-3 ${accent}`}
      style={{ borderTopWidth: '2px' }}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-limestone">
        <Icon size={17} className={color} />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] text-concrete uppercase tracking-wider font-medium">{label}</p>
        <p className={`text-2xl font-mono font-semibold tabular-nums leading-tight mt-0.5 ${color}`}>
          {value}
        </p>
        {sub && <p className="text-[11px] text-concrete mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

export default async function DashboardPage() {
  const session = await auth()
  const role = (session?.user as { role: string })?.role

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
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
        <KPICard
          label="Active Projects"
          value="—"
          sub="Connect database to see live data"
          icon={FolderKanban}
          color="text-progress"
          accent="kpi-accent-progress"
        />
        <KPICard
          label="Total Contract Value"
          value="J$—"
          sub="Across all active projects"
          icon={TrendingUp}
          color="text-cleared"
          accent="kpi-accent-cleared"
        />
        <KPICard
          label="Outstanding Invoices"
          value="—"
          sub="Awaiting payment"
          icon={DollarSign}
          color="text-warning"
          accent="kpi-accent-warning"
        />
        <KPICard
          label="Overdue Payments"
          value="—"
          sub="Past due date"
          icon={AlertTriangle}
          color="text-blocked"
          accent="kpi-accent-blocked"
        />
        <KPICard
          label="Gates Locked"
          value="—"
          sub="Projects awaiting conditions"
          icon={ShieldAlert}
          color="text-warning"
          accent="kpi-accent-warning"
        />
        <KPICard
          label="Pending Approvals"
          value="—"
          sub="Awaiting decision"
          icon={Clock}
          color="text-progress"
          accent="kpi-accent-progress"
        />
      </div>

      {/* Setup notice */}
      <div className="rounded-lg border border-gold/30 bg-gold/5 p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle size={16} className="text-gold mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-obsidian">Database not yet connected</p>
            <p className="text-xs text-steel mt-1 leading-relaxed">
              Copy <code className="font-mono bg-limestone px-1 rounded text-[11px]">.env.example</code> to{' '}
              <code className="font-mono bg-limestone px-1 rounded text-[11px]">.env.local</code>, add your{' '}
              <code className="font-mono bg-limestone px-1 rounded text-[11px]">DATABASE_URL</code>, then run{' '}
              <code className="font-mono bg-limestone px-1 rounded text-[11px]">npm run db:migrate</code> and{' '}
              <code className="font-mono bg-limestone px-1 rounded text-[11px]">npm run db:seed</code> to
              initialise with test data.
            </p>
          </div>
        </div>
      </div>

      {/* Quick links grid */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-0.5 h-4 bg-gold rounded-full shrink-0" />
          <h2 className="text-xs font-semibold text-concrete uppercase tracking-widest">Quick Access</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {[
            { label: 'View Projects', href: '/projects', desc: 'Active construction pipeline' },
            { label: 'Rates Library', href: '/rates', desc: 'Master BOQ rates database' },
            { label: 'Finance', href: '/finance', desc: 'Invoices & cash flow' },
            { label: 'Tender Pipeline', href: '/tender', desc: 'BD & proposals kanban' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group rounded-lg border border-[#D4D1CB] bg-white p-3 hover:border-gold/50 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-obsidian group-hover:text-gold transition-colors">
                  {item.label}
                </p>
                <ChevronRight
                  size={14}
                  className="text-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-150 shrink-0"
                />
              </div>
              <p className="text-xs text-concrete mt-0.5">{item.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
