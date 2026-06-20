import { motion } from 'framer-motion'

interface AnimatedStatusBadgeProps {
  status: 'PASS' | 'FAIL' | 'REVIEW'
}

const config: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  PASS: {
    bg: 'bg-status-pass/[0.12]',
    text: 'text-status-pass',
    border: 'border-status-pass/20',
    dot: 'bg-status-pass',
  },
  FAIL: {
    bg: 'bg-status-fail/[0.12]',
    text: 'text-status-fail',
    border: 'border-status-fail/20',
    dot: 'bg-status-fail',
  },
  REVIEW: {
    bg: 'bg-status-review/[0.12]',
    text: 'text-status-review',
    border: 'border-status-review/20',
    dot: 'bg-status-review',
  },
}

export default function AnimatedStatusBadge({ status }: AnimatedStatusBadgeProps) {
  const c = config[status]

  return (
    <motion.span
      className={`inline-flex items-center gap-1.5 rounded-[8px] border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${c.bg} ${c.text} ${c.border}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      <motion.span
        className={`inline-block h-1.5 w-1.5 rounded-full ${c.dot}`}
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      {status}
    </motion.span>
  )
}
