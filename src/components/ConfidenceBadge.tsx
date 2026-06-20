interface ConfidenceBadgeProps {
  score: number
  status: 'PASS' | 'FAIL' | 'REVIEW'
}

const barColors: Record<string, string> = {
  PASS: 'bg-status-pass',
  FAIL: 'bg-status-fail',
  REVIEW: 'bg-status-review',
}

const textColors: Record<string, string> = {
  PASS: 'text-status-pass',
  FAIL: 'text-status-fail',
  REVIEW: 'text-status-review',
}

export default function ConfidenceBadge({ score, status }: ConfidenceBadgeProps) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      <div className="h-1.5 w-12 overflow-hidden rounded-full bg-white/[0.10]">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColors[status]}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className={`text-[11px] font-semibold ${textColors[status]}`}>
        {score}%
      </span>
    </div>
  )
}
