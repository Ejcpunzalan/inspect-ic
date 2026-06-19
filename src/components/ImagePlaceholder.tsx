import { Cpu } from 'lucide-react'

export default function ImagePlaceholder() {
  return (
    <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-gray-100">
      <Cpu size={32} className="text-secondary-muted" />
    </div>
  )
}
