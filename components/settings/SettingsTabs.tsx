'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { GCT_RATE, RATE_STALE_DAYS_WARNING, RATE_STALE_DAYS_CRITICAL, DEFAULT_DEPOSIT_PCT, GATE_OVERRIDE_MIN_REASON_CHARS, PROJECT_NUMBER_PREFIX } from '@/lib/constants'
import type { SampleTeamMember } from '@/lib/sample-data'

const ROLE_LABELS: Record<string, string> = {
  FOUNDER: 'Founder', PM: 'Project Manager', QS: 'QS / Estimator',
  SUPERVISOR: 'Site Supervisor', ADMIN: 'Administrator', SUBCONTRACTOR: 'Subcontractor',
}

function roleVariant(role: string): 'cleared' | 'progress' | 'warning' | 'neutral' | 'blocked' {
  const map: Record<string, 'cleared' | 'progress' | 'warning' | 'neutral' | 'blocked'> = {
    FOUNDER: 'cleared', PM: 'progress', QS: 'progress', SUPERVISOR: 'warning', ADMIN: 'neutral', SUBCONTRACTOR: 'neutral',
  }
  return map[role] ?? 'neutral'
}

const PROFILE = {
  name: 'Devon Stagnum', email: 'devon@stagnumeng.com', role: 'FOUNDER', phone: '+1 (876) 555-0182',
}

type Props = { team: SampleTeamMember[] }

export function SettingsTabs({ team }: Props) {
  const [tab, setTab] = useState<'profile' | 'team' | 'system'>('profile')

  const initials = PROFILE.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-0 border-b border-[#D4D1CB] mb-6">
        {(['profile', 'team', 'system'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'px-5 py-2.5 text-xs font-medium capitalize transition-colors border-b-2 -mb-px',
              tab === t ? 'border-gold text-obsidian' : 'border-transparent text-steel hover:text-obsidian'
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Profile tab */}
      {tab === 'profile' && (
        <div className="max-w-lg space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-charcoal border-2 border-gold/50 flex items-center justify-center">
              <span className="text-limestone text-lg font-semibold">{initials}</span>
            </div>
            <div>
              <p className="text-base font-semibold text-obsidian">{PROFILE.name}</p>
              <StatusBadge variant="cleared" label={ROLE_LABELS[PROFILE.role]} dot={false} />
            </div>
          </div>

          {/* Fields */}
          {[
            { label: 'Full Name', value: PROFILE.name },
            { label: 'Email Address', value: PROFILE.email },
            { label: 'Phone', value: PROFILE.phone },
            { label: 'Role', value: ROLE_LABELS[PROFILE.role] },
          ].map((f) => (
            <div key={f.label} className="border-b border-[#D4D1CB] pb-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-concrete mb-1">{f.label}</p>
              <p className="text-sm text-obsidian">{f.value}</p>
            </div>
          ))}

          <button className="px-4 py-2 rounded bg-obsidian text-limestone text-xs font-medium hover:bg-charcoal transition-colors">
            Edit Profile
          </button>
        </div>
      )}

      {/* Team tab */}
      {tab === 'team' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-concrete">{team.length} members</p>
            <button className="px-3 py-1.5 rounded border border-gold text-gold text-xs font-medium hover:bg-gold/5 transition-colors">
              + Invite Member
            </button>
          </div>
          <div className="rounded-lg border border-[#D4D1CB] overflow-hidden bg-white">
            <table className="w-full text-xs">
              <thead className="bg-limestone border-b border-[#D4D1CB]">
                <tr>
                  {['Name', 'Role', 'Email', 'Status', 'Last Login'].map((h) => (
                    <th key={h} className="px-3 py-2 text-left text-[10px] font-semibold text-concrete uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D4D1CB]">
                {team.map((u) => (
                  <tr key={u.id} className="hover:bg-limestone transition-colors">
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-charcoal flex items-center justify-center shrink-0">
                          <span className="text-limestone text-[9px] font-medium">
                            {u.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-obsidian font-medium">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5"><StatusBadge variant={roleVariant(u.role)} label={ROLE_LABELS[u.role] ?? u.role} dot={false} /></td>
                    <td className="px-3 py-2.5 text-steel">{u.email}</td>
                    <td className="px-3 py-2.5">
                      <StatusBadge variant={u.isActive ? 'cleared' : 'blocked'} label={u.isActive ? 'Active' : 'Inactive'} dot />
                    </td>
                    <td className="px-3 py-2.5 text-steel">{u.lastLogin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* System tab */}
      {tab === 'system' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          {[
            { label: 'GCT Rate', value: `${(GCT_RATE * 100).toFixed(0)}%` },
            { label: 'Default Deposit', value: `${(DEFAULT_DEPOSIT_PCT * 100).toFixed(0)}%` },
            { label: 'Exchange Rate', value: '1 USD = J$155.50' },
            { label: 'Project Prefix', value: PROJECT_NUMBER_PREFIX },
            { label: 'Rate Stale Warning', value: `${RATE_STALE_DAYS_WARNING} days` },
            { label: 'Rate Stale Critical', value: `${RATE_STALE_DAYS_CRITICAL} days` },
            { label: 'Gate Override Min. Reason', value: `${GATE_OVERRIDE_MIN_REASON_CHARS} characters` },
            { label: 'Auth Status', value: 'Bypass active (preview mode)' },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-[#D4D1CB] bg-white p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-concrete mb-1">{item.label}</p>
              <p className="text-sm font-mono text-obsidian">{item.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
