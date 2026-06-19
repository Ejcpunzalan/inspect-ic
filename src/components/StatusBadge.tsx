interface StatusBadgeProps {
  status: 'PASS' | 'FAIL' | 'REVIEW'
}

const styles: Record<string, string> = {
  PASS: 'bg-status-pass/10 text-status-pass border-status-pass/20',
  FAIL: 'bg-status-fail/10 text-status-fail border-status-fail/20',
  REVIEW: 'bg-status-review/10 text-status-review border-status-review/20',
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  )
}
