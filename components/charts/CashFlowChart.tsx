'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import type { CashFlowMonth } from '@/lib/sample-data'

function fmt(v: number) {
  if (v >= 1_000_000) return `J$${(v / 1_000_000).toFixed(1)}M`
  if (v >= 1_000) return `J$${(v / 1_000).toFixed(0)}K`
  return `J$${v}`
}

type Props = { data: CashFlowMonth[] }

export function CashFlowChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 4, right: 16, bottom: 0, left: 8 }}>
        <defs>
          <linearGradient id="received" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#16A34A" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="outstanding" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#D4D1CB" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9BA3AB' }} axisLine={false} tickLine={false} />
        <YAxis tickFormatter={fmt} tick={{ fontSize: 10, fill: '#9BA3AB' }} axisLine={false} tickLine={false} width={54} />
        <Tooltip
          formatter={(value: number, name: string) => [fmt(value), name === 'received' ? 'Received' : 'Outstanding']}
          contentStyle={{ background: '#fff', border: '1px solid #D4D1CB', borderRadius: 6, fontSize: 12 }}
          labelStyle={{ color: '#141414', fontWeight: 600 }}
        />
        <Legend
          formatter={(v) => v === 'received' ? 'Received' : 'Outstanding'}
          wrapperStyle={{ fontSize: 11, color: '#5C6670' }}
        />
        <Area type="monotone" dataKey="received" stroke="#16A34A" strokeWidth={2} fill="url(#received)" />
        <Area type="monotone" dataKey="outstanding" stroke="#F59E0B" strokeWidth={2} fill="url(#outstanding)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
