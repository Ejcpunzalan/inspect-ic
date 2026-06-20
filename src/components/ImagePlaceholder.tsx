import InspecticIcon from './InspecticIcon'

export default function ImagePlaceholder() {
  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] bg-primary-red shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]">
      <InspecticIcon size={22} className="text-primary-white/50" />
    </div>
  )
}
