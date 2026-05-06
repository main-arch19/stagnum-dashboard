'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  FolderKanban,
  Calculator,
  FileText,
  ShoppingCart,
  Users,
  ClipboardCheck,
  DollarSign,
  BarChart2,
  Wrench,
  Leaf,
  Bell,
  Settings,
} from 'lucide-react'

type NavItem = {
  href: string
  label: string
  icon: React.ElementType
  roles: string[]
  badge?: number
}

const NAV_ITEMS: NavItem[] = [
  { href: '/dashboard',  label: 'Dashboard',       icon: LayoutDashboard, roles: ['FOUNDER','PM','QS','SUPERVISOR','ADMIN','SUBCONTRACTOR'] },
  { href: '/projects',   label: 'Projects',         icon: FolderKanban,    roles: ['FOUNDER','PM','SUPERVISOR'] },
  { href: '/rates',      label: 'Rates Library',    icon: Calculator,      roles: ['FOUNDER','QS'] },
  { href: '/quotations', label: 'Quotations',       icon: FileText,        roles: ['FOUNDER','PM','QS','ADMIN'] },
  { href: '/procurement',label: 'Procurement',      icon: ShoppingCart,    roles: ['FOUNDER','PM'] },
  { href: '/labour',     label: 'Labour',           icon: Users,           roles: ['FOUNDER','PM','SUPERVISOR'] },
  { href: '/qc',         label: 'QA / QC',          icon: ClipboardCheck,  roles: ['FOUNDER','PM','SUPERVISOR'] },
  { href: '/finance',    label: 'Finance',          icon: DollarSign,      roles: ['FOUNDER','ADMIN'] },
  { href: '/tender',     label: 'Tender Pipeline',  icon: BarChart2,       roles: ['FOUNDER','PM','QS'] },
  { href: '/assets',     label: 'Assets',           icon: Wrench,          roles: ['FOUNDER','ADMIN'] },
  { href: '/sustainable',label: 'Sustainable',      icon: Leaf,            roles: ['FOUNDER','PM','QS'] },
  { href: '/approvals',  label: 'Approvals',        icon: Bell,            roles: ['FOUNDER'] },
  { href: '/settings',   label: 'Settings',         icon: Settings,        roles: ['FOUNDER','ADMIN'] },
]

type Props = {
  userRole: string
  userName: string
  userEmail: string
}

export function Sidebar({ userRole, userName, userEmail }: Props) {
  const pathname = usePathname()

  const visibleItems = NAV_ITEMS.filter((item) => item.roles.includes(userRole))

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-60 flex flex-col bg-obsidian border-r border-charcoal">
      {/* Logo */}
      <div className="flex h-14 items-center gap-3 px-4 border-b border-charcoal">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.jpg"
          alt="Stagnum"
          className="h-8 w-8 object-contain shrink-0"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
        <div>
          <p className="text-limestone text-sm font-semibold leading-none tracking-wide">STAGNUM</p>
          <p className="text-concrete text-[10px] leading-none mt-0.5 tracking-widest uppercase">Operations</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        <p className="px-1 mb-2 text-[9px] font-semibold tracking-[0.15em] uppercase text-concrete/50 select-none">
          Navigation
        </p>
        <ul className="space-y-0.5">
          {visibleItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'group flex items-center gap-3 rounded px-3 py-2 text-sm transition-colors',
                    isActive
                      ? 'border-l-2 border-l-gold bg-charcoal/40 text-gold font-medium pl-[10px]'
                      : 'text-concrete hover:bg-charcoal hover:text-limestone'
                  )}
                >
                  <Icon
                    size={15}
                    className={cn(
                      'shrink-0 transition-colors',
                      isActive ? 'text-gold' : 'text-steel group-hover:text-limestone'
                    )}
                  />
                  <span className="flex-1 leading-none">{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-obsidian tabular-nums">
                      {item.badge > 99 ? '99+' : item.badge}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User info */}
      <div className="border-t border-charcoal p-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-charcoal border border-steel ring-1 ring-gold/30">
            <span className="text-limestone text-xs font-medium">
              {userName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-limestone text-xs font-medium truncate leading-none">{userName}</p>
            <p className="text-concrete text-[10px] truncate leading-none mt-0.5">
              {userRole.replace('_', ' ')}
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
