import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

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
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const selectedLabel = manufacturerValue === 'ALL' ? 'All Manufacturers' : manufacturerValue

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex overflow-hidden rounded-[12px] bg-white/[0.05] border border-white/[0.10]">
        {statusOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onStatusChange(opt.value)}
            className={`px-3.5 py-2 text-[12px] font-semibold transition-all duration-200 active:scale-95 ${
              statusValue === opt.value
                ? 'bg-black text-white'
                : 'text-white/60 hover:bg-white/[0.06]'
            } first:border-r last:border-l border-white/[0.06] first:rounded-l-[12px] last:rounded-r-[12px]`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 rounded-[12px] bg-white/[0.05] border border-white/[0.10] px-3.5 py-2 text-[12px] font-semibold text-white/70 outline-none transition-all duration-200 hover:bg-white/[0.06] focus:border-primary-red/40 focus:shadow-[0_0_0_3px_rgba(200,58,38,0.15)]"
        >
          <span>{selectedLabel}</span>
          <ChevronDown size={14} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>

        {open && (
          <div className="absolute right-0 top-full mt-1.5 z-[9999] min-w-[180px] rounded-[12px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.3)] border border-secondary-muted/10 py-1">
            <button
              onClick={() => {
                onManufacturerChange('ALL')
                setOpen(false)
              }}
              className={`w-full px-3.5 py-2 text-left text-[12px] font-semibold transition-all duration-200 cursor-pointer ${
                manufacturerValue === 'ALL'
                  ? 'bg-primary-red/10 text-primary-red'
                  : 'text-secondary hover:bg-[#F5F5F5]'
              }`}
            >
              All Manufacturers
            </button>
            {manufacturers.map((mfr) => (
              <button
                key={mfr}
                onClick={() => {
                  onManufacturerChange(mfr)
                  setOpen(false)
                }}
                className={`w-full px-3.5 py-2 text-left text-[12px] font-semibold transition-all duration-200 cursor-pointer ${
                  manufacturerValue === mfr
                    ? 'bg-primary-red/10 text-primary-red'
                    : 'text-secondary hover:bg-[#F5F5F5]'
                }`}
              >
                {mfr}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
