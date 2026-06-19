import { useMemo } from 'react'
import inspectionData from './data/inspectionData.json'
import type { InspectionRecord } from './types'
import { getStats } from './utils/filterSort'
import Header from './components/Header'
import StatsBar from './components/StatsBar'

const data = inspectionData as InspectionRecord[]

function App() {
  const stats = useMemo(() => getStats(data), [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6">
        <StatsBar
          total={stats.total}
          passCount={stats.passCount}
          failCount={stats.failCount}
          reviewCount={stats.reviewCount}
        />
      </main>
    </div>
  )
}

export default App
