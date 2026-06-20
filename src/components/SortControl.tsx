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
  none: <ArrowUpDown size={14} />,
  desc: <ArrowDown size={14} />,
  asc: <ArrowUp size={14} />,
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
      className={`flex items-center gap-1.5 rounded-[12px] border px-3.5 py-2 text-[12px] font-semibold transition-all duration-200 active:scale-95 ${
        value === 'none'
          ? 'bg-white/[0.05] border-white/[0.10] text-white/60 hover:bg-white/[0.06]'
          : 'bg-primary-red/15 border-primary-red/25 text-primary-red/90'
      }`}
    >
      {icons[value]}
      <span>{labels[value]}</span>
    </button>
  )
}
