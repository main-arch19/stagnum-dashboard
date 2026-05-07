'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

type DataPoint = { stage: string; valueJMD: number; color: string }

function fmt(v: number) {
  if (v >= 1_000_000) return `J$${(v / 1_000_000).toFixed(0)}M`
  return `J$${(v / 1_000).toFixed(0)}K`
}

type Props = { data: DataPoint[] }

export function ProjectStageBar({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#D4D1CB" horizontal={false} />
        <XAxis type="number" tickFormatter={fmt} tick={{ fontSize: 10, fill: '#9BA3AB' }} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="stage" tick={{ fontSize: 10, fill: '#5C6670' }} axisLine={false} tickLine={false} width={90} />
        <Tooltip
          formatter={(v: number) => [fmt(v), 'Contract Value']}
          contentStyle={{ background: '#fff', border: '1px solid #D4D1CB', borderRadius: 6, fontSize: 12 }}
          labelStyle={{ color: '#141414', fontWeight: 600 }}
          cursor={{ fill: '#F2F0EB' }}
        />
        <Bar dataKey="valueJMD" radius={[0, 4, 4, 0]} maxBarSize={18}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
