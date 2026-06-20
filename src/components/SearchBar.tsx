import { Search, X } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative group">
      <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 transition-colors duration-200 group-focus-within:text-primary-red" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search parts, manufacturers, lots..."
        className="w-full rounded-[12px] bg-white/[0.05] border border-white/[0.10] py-2.5 pl-10 pr-9 text-sm text-white outline-none placeholder:text-white/30 transition-all duration-200 focus:border-primary-red/40 focus:bg-white/[0.07] focus:shadow-[0_0_0_3px_rgba(200,58,38,0.15)]"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-white/40 transition-colors duration-200 hover:bg-white/10 hover:text-white/70"
        >
          <X size={15} />
        </button>
      )}
    </div>
  )
}
