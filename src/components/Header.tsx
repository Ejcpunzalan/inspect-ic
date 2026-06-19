export default function Header() {
  return (
    <header className="bg-primary-black text-primary-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            className="text-primary-red"
          >
            <rect x="6" y="6" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
            <rect x="10" y="10" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M16 6V2M16 30V26M6 16H2M30 16H26M8 8L5 5M24 8L27 5M8 24L5 27M24 24L27 27"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <div>
            <h1 className="text-xl font-bold tracking-wide">INSPECTIC</h1>
            <p className="text-xs tracking-widest text-secondary-muted uppercase">Inspection Dashboard</p>
          </div>
        </div>
      </div>
      <div className="h-1 bg-primary-red" />
    </header>
  )
}
