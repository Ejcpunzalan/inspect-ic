export interface ChatMessageType {
  id: string
  role: 'user' | 'bot'
  text: string
  timestamp: number
}

export interface RecordSummary {
  id: number
  partNumber: string
  manufacturer: string
  lotNumber: string
  dateCode: string
  status: string
  confidence: number
  barcodeText: string
  ocrText: string
  remarks: string
}

export interface ChatContext {
  selectedRecord: RecordSummary | null
  filteredStats: { total: number; passCount: number; failCount: number; reviewCount: number }
  allStats: { total: number; passCount: number; failCount: number; reviewCount: number }
  allRecords: RecordSummary[]
}
