'use client'

import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/currency'
import type { SampleRate, SampleRateCategory } from '@/lib/sample-data'
import { RATE_STALE_DAYS_WARNING, RATE_STALE_DAYS_CRITICAL } from '@/lib/constants'

type Props = {
  categories: SampleRateCategory[]
  rates: SampleRate[]
}

export function RatesExplorer({ categories, rates }: Props) {
  const [activeCat, setActiveCat] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return rates.filter((r) => {
      const matchCat = activeCat ? r.categoryId === activeCat : true
      const q = search.toLowerCase()
      const matchSearch = !q || r.code.toLowerCase().includes(q) || r.description.toLowerCase().includes(q) || r.unit.toLowerCase().includes(q)
      return matchCat && matchSearch
    })
  }, [rates, activeCat, search])

  return (
    <div className="flex h-full">
      {/* Category sidebar */}
      <aside className="w-52 shrink-0 border-r border-[#D4D1CB] bg-white">
        <div className="p-3 border-b border-[#D4D1CB]">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-concrete">Categories</p>
        </div>
        <ul>
          <li>
            <button
              onClick={() => setActiveCat(null)}
              className={cn(
                'w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors',
                activeCat === null ? 'bg-limestone text-obsidian font-semibold border-l-2 border-gold' : 'text-steel hover:bg-limestone'
              )}
            >
              <span>All Rates</span>
              <span className="text-[10px] font-mono text-concrete">{rates.length}</span>
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => setActiveCat(cat.id === activeCat ? null : cat.id)}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors',
                  activeCat === cat.id ? 'bg-limestone text-obsidian font-semibold border-l-2 border-gold' : 'text-steel hover:bg-limestone'
                )}
              >
                <span>{cat.name}</span>
                <span className="text-[10px] font-mono text-concrete">{cat.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Table panel */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Search bar */}
        <div className="flex items-center gap-2 p-3 border-b border-[#D4D1CB] bg-white">
          <Search size={14} className="text-concrete shrink-0" />
          <input
            type="text"
            placeholder="Search code, description, unit…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-xs bg-transparent outline-none placeholder:text-concrete text-obsidian"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-[10px] text-concrete hover:text-steel">Clear</button>
          )}
        </div>

        {/* Rates table */}
        <div className="flex-1 overflow-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Search size={28} className="text-concrete mb-3" />
              <p className="text-sm text-steel font-medium">No rates found</p>
              <p className="text-xs text-concrete mt-1">Try adjusting your search or category filter</p>
            </div>
          ) : (
            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-limestone border-b border-[#D4D1CB] z-10">
                <tr>
                  <th className="text-left px-3 py-2 text-[10px] font-semibold text-concrete uppercase tracking-wider w-20">Code</th>
                  <th className="text-left px-3 py-2 text-[10px] font-semibold text-concrete uppercase tracking-wider">Description</th>
                  <th className="text-left px-3 py-2 text-[10px] font-semibold text-concrete uppercase tracking-wider w-16">Unit</th>
                  <th className="text-right px-3 py-2 text-[10px] font-semibold text-concrete uppercase tracking-wider w-28">Rate (JMD)</th>
                  <th className="text-right px-3 py-2 text-[10px] font-semibold text-concrete uppercase tracking-wider w-28">Rate (USD)</th>
                  <th className="text-center px-3 py-2 text-[10px] font-semibold text-concrete uppercase tracking-wider w-10">Ver</th>
                  <th className="text-center px-3 py-2 text-[10px] font-semibold text-concrete uppercase tracking-wider w-8"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D4D1CB] bg-white">
                {filtered.map((r) => {
                  const stale = r.staleDays >= RATE_STALE_DAYS_CRITICAL ? 'critical' : r.staleDays >= RATE_STALE_DAYS_WARNING ? 'warn' : 'ok'
                  return (
                    <tr key={r.id} className="hover:bg-limestone transition-colors">
                      <td className="px-3 py-2 font-mono text-[11px] text-steel">{r.code}</td>
                      <td className="px-3 py-2 text-obsidian leading-snug">{r.description}</td>
                      <td className="px-3 py-2 text-steel">{r.unit}</td>
                      <td className="px-3 py-2 text-right font-mono tabular-nums text-obsidian">
                        {r.rateJMD > 0 ? formatCurrency(r.rateJMD, 'JMD') : '—'}
                      </td>
                      <td className="px-3 py-2 text-right font-mono tabular-nums text-steel">
                        {r.rateUSD > 0 ? `US$${r.rateUSD.toLocaleString()}` : '—'}
                      </td>
                      <td className="px-3 py-2 text-center">
                        <span className="inline-flex items-center justify-center h-4 min-w-4 rounded-full bg-limestone border border-[#D4D1CB] text-[9px] font-mono text-steel">
                          v{r.version}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-center">
                        {stale !== 'ok' && (
                          <span
                            title={`Rate last updated ${r.staleDays}d ago`}
                            className={cn(
                              'inline-block h-2 w-2 rounded-full',
                              stale === 'critical' ? 'bg-blocked' : 'bg-warning'
                            )}
                          />
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
        <div className="border-t border-[#D4D1CB] bg-white px-3 py-1.5 flex items-center justify-between">
          <p className="text-[10px] text-concrete">{filtered.length} of {rates.length} rates</p>
          <div className="flex items-center gap-3 text-[10px] text-concrete">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-warning inline-block" /> Stale (&gt;90 days)</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blocked inline-block" /> Critical (&gt;180 days)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
