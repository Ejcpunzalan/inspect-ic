interface StatusBadgeProps {
  status: 'PASS' | 'FAIL' | 'REVIEW'
}

const styles: Record<string, string> = {
  PASS: 'bg-green-50 text-status-pass border-status-pass/15',
  FAIL: 'bg-red-50 text-status-fail border-status-fail/15',
  REVIEW: 'bg-amber-50 text-status-review border-status-review/15',
}

const dots: Record<string, string> = {
  PASS: 'bg-status-pass',
  FAIL: 'bg-status-fail',
  REVIEW: 'bg-status-review',
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${styles[status]}`}
    >
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${dots[status]}`} />
      {status}
    </span>
  )
}
