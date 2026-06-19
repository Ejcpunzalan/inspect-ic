import { Search, X } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-muted" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by part number, manufacturer, lot number, or OCR text..."
        className="w-full rounded-lg border border-secondary-muted/30 bg-white py-2.5 pl-10 pr-10 text-sm text-primary-black outline-none placeholder:text-secondary-muted transition-shadow focus:border-primary-red focus:ring-1 focus:ring-primary-red"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-muted hover:text-primary-black"
        >
          <X size={18} />
        </button>
      )}
    </div>
  )
}
