'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import type { AgingBucket } from '@/lib/sample-data'

function fmt(v: number) {
  if (v >= 1_000_000) return `J$${(v / 1_000_000).toFixed(1)}M`
  return `J$${(v / 1_000).toFixed(0)}K`
}

const COLORS = ['#16A34A', '#F59E0B', '#EA580C', '#DC2626']

type Props = { data: AgingBucket[] }

export function ReceivablesAging({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={140}>
      <BarChart data={data} layout="vertical" margin={{ top: 0, right: 24, bottom: 0, left: 8 }}>
        <XAxis type="number" tickFormatter={fmt} tick={{ fontSize: 10, fill: '#9BA3AB' }} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="label" tick={{ fontSize: 10, fill: '#5C6670' }} axisLine={false} tickLine={false} width={76} />
        <Tooltip
          formatter={(v: number) => [fmt(v), 'Receivable']}
          contentStyle={{ background: '#fff', border: '1px solid #D4D1CB', borderRadius: 6, fontSize: 12 }}
          labelStyle={{ color: '#141414', fontWeight: 600 }}
          cursor={{ fill: '#F2F0EB' }}
        />
        <Bar dataKey="amountJMD" radius={[0, 4, 4, 0]} maxBarSize={18}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
