interface FilterBarProps {
  statusValue: 'ALL' | 'PASS' | 'FAIL' | 'REVIEW'
  onStatusChange: (value: 'ALL' | 'PASS' | 'FAIL' | 'REVIEW') => void
  manufacturerValue: string
  onManufacturerChange: (value: string) => void
  manufacturers: string[]
}

const statusOptions: { label: string; value: 'ALL' | 'PASS' | 'FAIL' | 'REVIEW' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'PASS', value: 'PASS' },
  { label: 'FAIL', value: 'FAIL' },
  { label: 'REVIEW', value: 'REVIEW' },
]

export default function FilterBar({
  statusValue,
  onStatusChange,
  manufacturerValue,
  onManufacturerChange,
  manufacturers,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex rounded-lg border border-secondary-muted/30 overflow-hidden">
        {statusOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onStatusChange(opt.value)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              statusValue === opt.value
                ? 'bg-primary-red text-white'
                : 'bg-white text-secondary hover:bg-gray-50'
            } ${opt.value === 'ALL' ? 'rounded-l-lg' : ''} ${
              opt.value === 'REVIEW' ? 'rounded-r-lg' : ''
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <select
        value={manufacturerValue}
        onChange={(e) => onManufacturerChange(e.target.value)}
        className="rounded-lg border border-secondary-muted/30 bg-white px-3 py-2 text-sm text-secondary outline-none focus:border-primary-red focus:ring-1 focus:ring-primary-red"
      >
        <option value="ALL">All Manufacturers</option>
        {manufacturers.map((mfr) => (
          <option key={mfr} value={mfr}>
            {mfr}
          </option>
        ))}
      </select>
    </div>
  )
}
