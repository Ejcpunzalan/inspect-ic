import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
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
import BackgroundCanvas from './components/BackgroundCanvas'
import ChatBot from './components/ChatBot/ChatBot'

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

  const filteredStats = useMemo(() => getStats(filteredData), [filteredData])
  const allStats = useMemo(() => getStats(data), [])
  const manufacturers = useMemo(() => getUniqueManufacturers(data), [])

  const mapRecord = (r: InspectionRecord) => ({
    id: r.id,
    partNumber: r.partNumber,
    manufacturer: r.manufacturer,
    lotNumber: r.lotNumber,
    dateCode: r.dateCode,
    status: r.status,
    confidence: r.confidence,
    barcodeText: r.barcodeText,
    ocrText: r.ocrText,
    remarks: r.remarks,
  })

  return (
    <div className="min-h-screen">
      <BackgroundCanvas />

      <div className="relative z-10">
        <Header />

        <main className="mx-auto max-w-7xl space-y-4 px-4 py-5">
          <StatsBar
            total={filteredStats.total}
            passCount={filteredStats.passCount}
            failCount={filteredStats.failCount}
            reviewCount={filteredStats.reviewCount}
          />

          <motion.div
            className="relative z-30 rounded-[20px] bg-white/[0.05] backdrop-blur-md border border-white/[0.08] p-3 overflow-visible"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24, delay: 0.35 }}
          >
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex-1 min-w-[220px]">
                <SearchBar value={searchTerm} onChange={setSearchTerm} />
              </div>
              <div className="flex items-center gap-2">
                <FilterBar
                  statusValue={statusFilter}
                  onStatusChange={setStatusFilter}
                  manufacturerValue={manufacturerFilter}
                  onManufacturerChange={setManufacturerFilter}
                  manufacturers={manufacturers}
                />
                <SortControl value={sortOrder} onChange={setSortOrder} />
              </div>
            </div>
          </motion.div>

          <div className="flex items-center justify-between">
            <p className="text-xs text-white/40">
              Showing{' '}
              <span className="font-semibold text-white/70">{filteredData.length}</span> of{' '}
              <span className="font-semibold text-white/70">{data.length}</span> records
            </p>
          </div>

          <InspectionList records={filteredData} onSelect={setSelectedRecord} />

          <DetailPanel record={selectedRecord} onClose={() => setSelectedRecord(null)} />
        </main>
      </div>

      <ChatBot
        context={{
          selectedRecord: selectedRecord ? mapRecord(selectedRecord) : null,
          filteredStats,
          allStats,
          allRecords: data.map(mapRecord),
        }}
      />
    </div>
  )
}

export default App
