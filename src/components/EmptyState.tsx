import { SearchX } from 'lucide-react'

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <SearchX size={48} className="text-secondary-muted" />
      <h3 className="mt-4 text-lg font-semibold text-primary-black">
        No matching inspection record found.
      </h3>
      <p className="mt-1 text-sm text-secondary-muted">
        Try adjusting your search or filters.
      </p>
    </div>
  )
}
