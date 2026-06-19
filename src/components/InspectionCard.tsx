import type { InspectionRecord } from '../types'
import StatusBadge from './StatusBadge'
import ConfidenceBadge from './ConfidenceBadge'
import ImagePlaceholder from './ImagePlaceholder'

interface InspectionCardProps {
  record: InspectionRecord
  onClick: () => void
}

export default function InspectionCard({ record, onClick }: InspectionCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-lg border border-secondary-muted/20 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99]"
    >
      <div className="flex gap-4">
        <ImagePlaceholder />
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <StatusBadge status={record.status} />
            <ConfidenceBadge score={record.confidence} />
          </div>
          <p className="font-semibold text-primary-black truncate">{record.partNumber}</p>
          <p className="text-sm text-secondary">{record.manufacturer}</p>
          <p className="text-xs text-secondary-muted">
            {record.lotNumber} · {record.dateCode}
          </p>
        </div>
      </div>
    </div>
  )
}
