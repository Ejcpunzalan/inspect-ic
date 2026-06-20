import { motion } from 'framer-motion'
import type { InspectionRecord } from '../types'
import InspectionCard from './InspectionCard'
import EmptyState from './EmptyState'

interface InspectionListProps {
  records: InspectionRecord[]
  onSelect: (record: InspectionRecord) => void
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
}

export default function InspectionList({ records, onSelect }: InspectionListProps) {
  if (records.length === 0) return <EmptyState />

  return (
    <motion.div
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {records.map((record) => (
        <motion.div key={record.id} variants={item}>
          <InspectionCard
            record={record}
            onClick={() => onSelect(record)}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}
