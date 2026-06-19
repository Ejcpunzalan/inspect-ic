import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'

interface SortControlProps {
  value: 'none' | 'asc' | 'desc'
  onChange: (value: 'none' | 'asc' | 'desc') => void
}

const next: Record<string, 'none' | 'asc' | 'desc'> = {
  none: 'desc',
  desc: 'asc',
  asc: 'none',
}

const icons: Record<string, React.ReactNode> = {
  none: <ArrowUpDown size={16} />,
  desc: <ArrowDown size={16} />,
  asc: <ArrowUp size={16} />,
}

const labels: Record<string, string> = {
  none: 'Sort',
  desc: 'Highest',
  asc: 'Lowest',
}

export default function SortControl({ value, onChange }: SortControlProps) {
  return (
    <button
      onClick={() => onChange(next[value])}
      className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm transition-colors active:scale-95 ${
        value === 'none'
          ? 'border-secondary-muted/30 bg-white text-secondary hover:bg-gray-50'
          : 'border-primary-red/30 bg-red-50 text-primary-red'
      }`}
    >
      {icons[value]}
      <span className="font-medium">{labels[value]}</span>
    </button>
  )
}
