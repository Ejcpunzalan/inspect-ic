import InspecticIcon from './InspecticIcon'

export default function Header() {
  return (
    <header className="bg-black border-b border-white/[0.06]">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <InspecticIcon size={22} className="text-primary-red" />
          <div className="flex items-baseline gap-2">
            <h1 className="text-lg font-bold tracking-wide text-white">INSPECTIC</h1>
            <span className="hidden rounded-full bg-primary-red/15 px-2 py-0.5 text-[11px] font-semibold tracking-wider text-primary-red/90 sm:inline-block">
              DASHBOARD
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-white/40">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-status-pass" />
            All systems nominal
          </div>
        </div>
      </div>
      <div className="h-[1px] bg-gradient-to-r from-primary-red/60 via-primary-red/30 to-transparent" />
    </header>
  )
}
