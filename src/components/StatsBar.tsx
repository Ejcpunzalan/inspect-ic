import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, AlertTriangle, ClipboardList } from 'lucide-react'
import StatCard from './StatCard'

interface StatsBarProps {
  total: number
  passCount: number
  failCount: number
  reviewCount: number
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
}

export default function StatsBar({ total, passCount, failCount, reviewCount }: StatsBarProps) {
  return (
    <motion.div
      className="grid grid-cols-2 gap-4 lg:grid-cols-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <StatCard
          label="Total Records"
          count={total}
          total={total}
          icon={<ClipboardList size={20} />}
          accentClass="text-white"
          iconBgClass="bg-white/[0.10]"
          progressBgClass="bg-white/20"
        />
      </motion.div>
      <motion.div variants={item}>
        <StatCard
          label="Passed"
          count={passCount}
          total={total}
          icon={<CheckCircle2 size={20} />}
          accentClass="text-status-pass"
          iconBgClass="bg-status-pass/[0.12]"
          progressBgClass="bg-status-pass"
        />
      </motion.div>
      <motion.div variants={item}>
        <StatCard
          label="Failed"
          count={failCount}
          total={total}
          icon={<XCircle size={20} />}
          accentClass="text-status-fail"
          iconBgClass="bg-status-fail/[0.12]"
          progressBgClass="bg-status-fail"
        />
      </motion.div>
      <motion.div variants={item}>
        <StatCard
          label="Review"
          count={reviewCount}
          total={total}
          icon={<AlertTriangle size={20} />}
          accentClass="text-status-review"
          iconBgClass="bg-status-review/[0.12]"
          progressBgClass="bg-status-review"
        />
      </motion.div>
    </motion.div>
  )
}
