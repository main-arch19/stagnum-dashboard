'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

type DataPoint = { stage: string; count: number; color: string }

type Props = { data: DataPoint[] }

export function TenderFunnelChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={120}>
      <BarChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
        <XAxis dataKey="stage" tick={{ fontSize: 9, fill: '#9BA3AB' }} axisLine={false} tickLine={false} />
        <YAxis hide />
        <Tooltip
          formatter={(v: number) => [v, 'Tenders']}
          contentStyle={{ background: '#fff', border: '1px solid #D4D1CB', borderRadius: 6, fontSize: 11 }}
          labelStyle={{ color: '#141414', fontWeight: 600, fontSize: 11 }}
          cursor={{ fill: '#F2F0EB' }}
        />
        <Bar dataKey="count" radius={[3, 3, 0, 0]} maxBarSize={28}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
