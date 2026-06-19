import type { InspectionRecord } from '../types'
import InspectionCard from './InspectionCard'
import EmptyState from './EmptyState'

interface InspectionListProps {
  records: InspectionRecord[]
  onSelect: (record: InspectionRecord) => void
}

export default function InspectionList({ records, onSelect }: InspectionListProps) {
  if (records.length === 0) return <EmptyState />

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {records.map((record) => (
        <InspectionCard
          key={record.id}
          record={record}
          onClick={() => onSelect(record)}
        />
      ))}
    </div>
  )
}
