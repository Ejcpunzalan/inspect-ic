import inspectionData from './data/inspectionData.json'
import type { InspectionRecord } from './types'

const data = inspectionData as InspectionRecord[]

function App() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-primary-black text-primary-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-wide">INSPECTIC</span>
          <span className="text-xs text-secondary-muted uppercase tracking-widest">Inspection Dashboard</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <p className="text-secondary">Project scaffolded. Ready for Phase 1.</p>
        <p className="text-sm text-secondary-muted mt-2">{data.length} records loaded.</p>
      </main>
    </div>
  )
}

export default App
