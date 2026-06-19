import { useState, useMemo } from 'react'
import inspectionData from './data/inspectionData.json'
import type { InspectionRecord } from './types'
import {
  getStats,
  getUniqueManufacturers,
  filterBySearch,
  filterByStatus,
  filterByManufacturer,
  sortByConfidence,
} from './utils/filterSort'
import Header from './components/Header'
import StatsBar from './components/StatsBar'
import SearchBar from './components/SearchBar'
import FilterBar from './components/FilterBar'
import SortControl from './components/SortControl'
import InspectionList from './components/InspectionList'
import DetailPanel from './components/DetailPanel'

const data = inspectionData as InspectionRecord[]

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PASS' | 'FAIL' | 'REVIEW'>('ALL')
  const [manufacturerFilter, setManufacturerFilter] = useState('ALL')
  const [sortOrder, setSortOrder] = useState<'none' | 'asc' | 'desc'>('none')
  const [selectedRecord, setSelectedRecord] = useState<InspectionRecord | null>(null)

  const filteredData = useMemo(() => {
    let result = data
    result = filterBySearch(result, searchTerm)
    result = filterByStatus(result, statusFilter)
    result = filterByManufacturer(result, manufacturerFilter)
    result = sortByConfidence(result, sortOrder)
    return result
  }, [searchTerm, statusFilter, manufacturerFilter, sortOrder])

  const stats = useMemo(() => getStats(filteredData), [filteredData])
  const manufacturers = useMemo(() => getUniqueManufacturers(data), [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto max-w-7xl space-y-5 px-4 py-6">
        <StatsBar
          total={stats.total}
          passCount={stats.passCount}
          failCount={stats.failCount}
          reviewCount={stats.reviewCount}
        />

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[260px]">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>
          <FilterBar
            statusValue={statusFilter}
            onStatusChange={setStatusFilter}
            manufacturerValue={manufacturerFilter}
            onManufacturerChange={setManufacturerFilter}
            manufacturers={manufacturers}
          />
          <SortControl value={sortOrder} onChange={setSortOrder} />
        </div>

        <p className="text-sm text-secondary-muted">
          Showing {filteredData.length} of {data.length} records
        </p>

        <InspectionList
          records={filteredData}
          onSelect={setSelectedRecord}
        />

        <DetailPanel
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
        />
      </main>
    </div>
  )
}

export default App
