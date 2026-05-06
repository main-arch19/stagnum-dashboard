'use client'

import { Bell, Search, LogOut, ChevronDown } from 'lucide-react'
import { signOut } from 'next-auth/react'

type Props = {
  title?: string
  userName: string
  userRole: string
}

const ROLE_LABELS: Record<string, string> = {
  FOUNDER:      'Founder / Principal',
  PM:           'Project Manager',
  QS:           'QS / Estimator',
  SUPERVISOR:   'Site Supervisor',
  ADMIN:        'Admin / Bookkeeper',
  SUBCONTRACTOR:'Subcontractor',
}

export function TopNav({ title, userName, userRole }: Props) {
  return (
    <header className="fixed left-60 right-0 top-0 z-30 flex h-14 items-center justify-between border-b border-[#D4D1CB] bg-limestone/95 backdrop-blur-sm px-6">
      {/* Left: page title */}
      <div className="flex items-center gap-2">
        {title && (
          <h1 className="text-sm font-semibold text-obsidian tracking-wide">{title}</h1>
        )}
      </div>

      {/* Center: global search */}
      <div className="relative hidden md:flex w-72">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-concrete pointer-events-none" />
        <input
          type="search"
          placeholder="Search projects, clients, invoices…"
          className="w-full rounded border border-[#D4D1CB] bg-white py-1.5 pl-8 pr-3 text-xs text-obsidian placeholder:text-concrete outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors"
        />
      </div>

      {/* Right: notifications + user */}
      <div className="flex items-center gap-3">
        <button className="group relative flex h-8 w-8 items-center justify-center rounded hover:bg-obsidian/8 transition-colors">
          <Bell size={15} className="text-steel group-hover:text-gold transition-colors" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-blocked" />
        </button>

        <div className="flex items-center gap-2 rounded px-2 py-1 hover:bg-limestone transition-colors cursor-pointer">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-obsidian">
            <span className="text-limestone text-[10px] font-medium">
              {userName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-medium text-obsidian leading-none">{userName}</p>
            <p className="text-[10px] text-concrete leading-none mt-0.5">{ROLE_LABELS[userRole] ?? userRole}</p>
          </div>
          <ChevronDown size={12} className="text-concrete" />
        </div>

        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex h-8 w-8 items-center justify-center rounded hover:bg-limestone transition-colors"
          title="Sign out"
        >
          <LogOut size={14} className="text-steel" />
        </button>
      </div>
    </header>
  )
}
