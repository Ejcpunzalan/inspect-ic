import { motion } from 'framer-motion'

interface StatCardProps {
  label: string
  count: number
  total: number
  icon: React.ReactNode
  accentClass: string
  iconBgClass: string
  progressBgClass: string
}

export default function StatCard({ label, count, total, icon, accentClass, iconBgClass, progressBgClass }: StatCardProps) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0

  return (
    <motion.div
      className="group relative overflow-hidden rounded-[20px] bg-white/[0.05] backdrop-blur-md border border-white/[0.08] transition-shadow duration-300"
      whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className={`rounded-[12px] p-2.5 ${iconBgClass}`}>
            <div className={accentClass}>{icon}</div>
          </div>
          <span className="text-[11px] font-semibold text-white/40">{pct}%</span>
        </div>
        <p className="text-[28px] font-bold tracking-tight text-white">{count}</p>
        <p className="text-[12px] font-medium text-white/50 mt-0.5">{label}</p>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
          <motion.div
            className={`h-full rounded-full ${progressBgClass}`}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.div>
  )
}
