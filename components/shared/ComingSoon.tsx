import { Construction } from 'lucide-react'

type Props = {
  module: string
  description?: string
}

export function ComingSoon({ module, description }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#D4D1CB] bg-white">
        <Construction size={24} className="text-gold" />
      </div>
      <div className="text-center">
        <h2 className="text-lg font-semibold text-obsidian">{module}</h2>
        <p className="text-sm text-concrete mt-1 max-w-sm">
          {description ?? 'This module is being built in the next implementation phase. Check back soon.'}
        </p>
      </div>
      <div className="flex items-center gap-1.5 rounded border border-gold/30 bg-gold/5 px-3 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
        <span className="text-xs font-mono text-gold/80">Phase in progress</span>
      </div>
    </div>
  )
}
