import { motion } from 'framer-motion'
import { SearchX } from 'lucide-react'

export default function EmptyState() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center rounded-[20px] bg-white/[0.05] backdrop-blur-md border border-white/[0.08] py-24"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/[0.08]">
        <SearchX size={28} className="text-white/30" />
      </div>
      <h3 className="mt-5 text-base font-semibold text-white">No matching records</h3>
      <p className="mt-1 text-sm text-white/50">
        Adjust your search or filters to find what you&apos;re looking for.
      </p>
    </motion.div>
  )
}
