import { cn } from '@/lib/utils'

type StatusVariant = 'blocked' | 'warning' | 'cleared' | 'progress' | 'neutral'

const VARIANT_CLASSES: Record<StatusVariant, string> = {
  blocked:  'badge-blocked',
  warning:  'badge-warning',
  cleared:  'badge-cleared',
  progress: 'badge-progress',
  neutral:  'badge-neutral',
}

type Props = {
  variant: StatusVariant
  label: string
  className?: string
  dot?: boolean
}

export function StatusBadge({ variant, label, className, dot = true }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-xs font-medium border',
        VARIANT_CLASSES[variant],
        className
      )}
    >
      {dot && (
        <span
          className={cn('h-1.5 w-1.5 rounded-full', {
            'bg-blocked':  variant === 'blocked',
            'bg-warning':  variant === 'warning',
            'bg-cleared':  variant === 'cleared',
            'bg-progress': variant === 'progress',
            'bg-concrete': variant === 'neutral',
          })}
        />
      )}
      {label}
    </span>
  )
}

export function projectStageVariant(stage: string): StatusVariant {
  const map: Record<string, StatusVariant> = {
    ENQUIRY: 'neutral',
    QUOTING: 'neutral',
    AWAITING_SIGNATURE: 'warning',
    AWAITING_DEPOSIT: 'warning',
    MOBILIZATION: 'progress',
    PROCUREMENT: 'progress',
    CONSTRUCTION: 'progress',
    HANDOVER: 'warning',
    CLOSEOUT: 'warning',
    CLOSED: 'cleared',
    ON_HOLD: 'blocked',
    CANCELLED: 'blocked',
  }
  return map[stage] ?? 'neutral'
}

export function projectStageLabel(stage: string): string {
  return stage.replace(/_/g, ' ')
}
