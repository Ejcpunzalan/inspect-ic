import { AlertTriangle } from 'lucide-react'

interface ConfidenceBadgeProps {
  score: number
}

export default function ConfidenceBadge({ score }: ConfidenceBadgeProps) {
  const isLow = score < 80

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        isLow
          ? 'bg-red-50 text-red-700'
          : 'bg-gray-50 text-secondary'
      }`}
    >
      {isLow && <AlertTriangle size={12} />}
      {score}%
    </span>
  )
}
