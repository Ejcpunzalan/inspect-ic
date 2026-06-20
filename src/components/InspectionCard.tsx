import { motion } from 'framer-motion'
import type { InspectionRecord } from '../types'
import AnimatedStatusBadge from './AnimatedStatusBadge'
import ConfidenceBadge from './ConfidenceBadge'
import ImagePlaceholder from './ImagePlaceholder'

interface InspectionCardProps {
  record: InspectionRecord
  onClick: () => void
}

const accentBorders: Record<string, string> = {
  PASS: 'border-l-[3px] border-l-status-pass',
  FAIL: 'border-l-[3px] border-l-status-fail',
  REVIEW: 'border-l-[3px] border-l-status-review',
}

export default function InspectionCard({ record, onClick }: InspectionCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className={`group cursor-pointer rounded-[20px] bg-white/[0.05] backdrop-blur-md border border-white/[0.08] transition-shadow duration-300 ${accentBorders[record.status]}`}
      whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="p-5">
        <div className="flex gap-3">
          <ImagePlaceholder />
          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <AnimatedStatusBadge status={record.status} />
            </div>
            <div>
              <p className="font-semibold text-white text-sm leading-snug">
                {record.partNumber}
              </p>
              <p className="text-[12px] text-white/60 mt-0.5">{record.manufacturer}</p>
            </div>
            <div className="flex items-center gap-x-3 gap-y-1 flex-wrap">
              <div className="flex items-center gap-2 text-[11px] text-white/40">
                <span className="font-mono">{record.lotNumber}</span>
                <span className="inline-block h-1 w-1 rounded-full bg-white/20" />
                <span>DC {record.dateCode}</span>
              </div>
              <ConfidenceBadge score={record.confidence} status={record.status} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
